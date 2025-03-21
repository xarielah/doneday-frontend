import { useEffect, useRef, useState, useCallback } from "react";
import Chart from 'chart.js/auto';
import { boardService } from "../../services/board/board.service.local";
import { Bullets, Minimize } from "@vibe/icons";
import { IconButton, Icon } from "@vibe/core";

// Custom hook for chart resizing functionality
const useChartResizing = (chartInstanceRef) => {
    const [chartHeight, setChartHeight] = useState(() => {
        return localStorage.getItem('chartHeight') ? 
            parseInt(localStorage.getItem('chartHeight')) : 250;
    });
    
    const resizeHandlerRef = useRef({
        isResizing: false,
        startHeight: 0,
        startPos: 0
    });
    
    // Save height to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('chartHeight', chartHeight.toString());
    }, [chartHeight]);
    
    const handleResizeStart = useCallback((e) => {
        e.preventDefault();
        const handler = resizeHandlerRef.current;
        
        handler.isResizing = true;
        handler.startHeight = chartHeight;
        handler.startPos = e.clientY;
        document.body.classList.add('is-resizing');
        
        const handleMouseMove = (evt) => {
            if (!handler.isResizing) return;
            
            const deltaY = evt.clientY - handler.startPos;
            const newHeight = Math.max(150, handler.startHeight + deltaY);
            
            setChartHeight(newHeight);
            
            if (chartInstanceRef.current) {
                chartInstanceRef.current.resize();
            }
        };
        
        const handleMouseUp = () => {
            handler.isResizing = false;
            document.body.classList.remove('is-resizing');
            
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp, { once: true });
    }, [chartHeight]);
    
    return { chartHeight, handleResizeStart };
};

// Custom hook for fullscreen functionality
const useFullScreen = (chartInstanceRef, chartType = 'main') => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isFullScreen) {
                setIsFullScreen(false);
            }
        };
        
        const handleOutsideClick = (e) => {
            if (isFullScreen && containerRef.current && contentRef.current) {
                const isClickOutsideContent = !contentRef.current.contains(e.target) && containerRef.current.contains(e.target);
                if (isClickOutsideContent) {
                    setIsFullScreen(false);
                }
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        if (isFullScreen) {
            document.addEventListener('mousedown', handleOutsideClick);
            document.body.classList.add(`chart-fullscreen-${chartType}`);
        } else {
            document.body.classList.remove(`chart-fullscreen-${chartType}`);
        }
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleOutsideClick);
            document.body.classList.remove(`chart-fullscreen-${chartType}`);
        };
    }, [isFullScreen, chartType]);
    
    const toggleFullScreen = useCallback(() => {
        setIsFullScreen(prev => !prev);
        
        // Wait for the DOM to update before resizing the chart
        setTimeout(() => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.resize();
            }
        }, 100);
    }, []);
    
    return { isFullScreen, toggleFullScreen, containerRef, contentRef };
};

// Custom hook for dropdown menu
const useDropdownMenu = (id = 'main') => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);
    
    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);
    
    return { isMenuOpen, toggleMenu, closeMenu, menuRef, buttonRef, menuId: id };
};

// Main component
export function BoardChart({ board }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const pieChartRef = useRef(null);
    const pieChartInstance = useRef(null);
    const memberChartRef = useRef(null);
    const memberChartInstance = useRef(null);
    
    // Use bar chart type for the main chart
    const chartType = 'bar';
    
    // Custom hooks for main chart
    const { chartHeight, handleResizeStart } = useChartResizing(chartInstance);
    const { isFullScreen, toggleFullScreen, containerRef, contentRef } = useFullScreen(chartInstance, 'main');
    const { isMenuOpen, toggleMenu, closeMenu, menuRef, buttonRef } = useDropdownMenu('main');
    
    // Custom hooks for pie chart
    const pieResizeRef = useRef({
        isResizing: false,
        startHeight: 0,
        startPos: 0
    });
    const [pieChartHeight, setPieChartHeight] = useState(200);
    const { 
        isFullScreen: isPieFullScreen, 
        toggleFullScreen: togglePieFullScreen, 
        containerRef: pieContainerRef, 
        contentRef: pieContentRef 
    } = useFullScreen(pieChartInstance, 'pie');
    const { 
        isMenuOpen: isPieMenuOpen, 
        toggleMenu: togglePieMenu, 
        closeMenu: closePieMenu, 
        menuRef: pieMenuRef, 
        buttonRef: pieButtonRef 
    } = useDropdownMenu('pie');

    // Custom hooks for member chart
    const memberResizeRef = useRef({
        isResizing: false,
        startHeight: 0,
        startPos: 0
    });
    const [memberChartHeight, setMemberChartHeight] = useState(200);
    const { 
        isFullScreen: isMemberFullScreen, 
        toggleFullScreen: toggleMemberFullScreen, 
        containerRef: memberContainerRef, 
        contentRef: memberContentRef 
    } = useFullScreen(memberChartInstance, 'member');
    const { 
        isMenuOpen: isMemberMenuOpen, 
        toggleMenu: toggleMemberMenu, 
        closeMenu: closeMemberMenu, 
        menuRef: memberMenuRef, 
        buttonRef: memberButtonRef 
    } = useDropdownMenu('member');

    // Initialize and update main chart
    useEffect(() => {
        if (!chartRef.current || !board) return;
        
        // Get chart data from board service
        const chartData = boardService.getChartDataFromBoard(board);
        
        // Clean up previous chart instance
        if (chartInstance.current) {
            chartInstance.current.destroy();
            chartInstance.current = null;
        }
        
        // Reset canvas to clear any remnants
        const canvas = chartRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Small delay to ensure DOM updates complete before creating new chart
        setTimeout(() => {
            // Safety check in case component unmounted during timeout
            if (!chartRef.current) return;
            
            // Create new chart with config from service (passing chart type)
            const newCtx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(newCtx, boardService.getChartConfig(chartData, chartType));
            
            // Resize the chart
            if (chartInstance.current) {
                chartInstance.current.resize();
            }
        }, 50);
        
        // Cleanup on unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [board, isFullScreen]);
    
    // Initialize and update pie chart in mini-charts
    useEffect(() => {
        if (!pieChartRef.current || !board) return;
        
        // Get chart data from board service
        const chartData = boardService.getChartDataFromBoard(board);
        
        // Clean up previous chart instance
        if (pieChartInstance.current) {
            pieChartInstance.current.destroy();
            pieChartInstance.current = null;
        }
        
        // Reset canvas to clear any remnants
        const canvas = pieChartRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Small delay to ensure DOM updates complete before creating new chart
        setTimeout(() => {
            // Safety check in case component unmounted during timeout
            if (!pieChartRef.current) return;
            
            // Create new pie chart
            const newCtx = pieChartRef.current.getContext('2d');
            pieChartInstance.current = new Chart(newCtx, boardService.getChartConfig(chartData, 'pie'));
            
            // Resize the chart
            if (pieChartInstance.current) {
                pieChartInstance.current.resize();
            }
        }, 50);
        
        // Cleanup on unmount
        return () => {
            if (pieChartInstance.current) {
                pieChartInstance.current.destroy();
                pieChartInstance.current = null;
            }
        };
    }, [board, isPieFullScreen]);
    
    // Initialize and update member chart
    useEffect(() => {
        if (!memberChartRef.current || !board) return;
        
        // Get member distribution data
        const memberData = boardService.getMemberTaskDistribution(board);
        
        // Clean up previous chart instance
        if (memberChartInstance.current) {
            memberChartInstance.current.destroy();
            memberChartInstance.current = null;
        }
        
        // Reset canvas to clear any remnants
        const canvas = memberChartRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Small delay to ensure DOM updates complete before creating new chart
        setTimeout(() => {
            // Safety check in case component unmounted during timeout
            if (!memberChartRef.current) return;
            
            // Create new member chart
            const newCtx = memberChartRef.current.getContext('2d');
            memberChartInstance.current = new Chart(newCtx, boardService.getMemberChartConfig(memberData));
            
            // Resize the chart
            if (memberChartInstance.current) {
                memberChartInstance.current.resize();
            }
        }, 50);
        
        // Cleanup on unmount
        return () => {
            if (memberChartInstance.current) {
                memberChartInstance.current.destroy();
                memberChartInstance.current = null;
            }
        };
    }, [board, isMemberFullScreen]);
    
    // Handle fullscreen toggle from menu
    const handleFullScreenToggle = useCallback(() => {
        toggleFullScreen();
        closeMenu();
    }, [toggleFullScreen, closeMenu]);
    
    // Handle pie chart fullscreen toggle
    const handlePieFullScreenToggle = useCallback(() => {
        togglePieFullScreen();
        closePieMenu();
    }, [togglePieFullScreen, closePieMenu]);
    
    // Handle member chart fullscreen toggle
    const handleMemberFullScreenToggle = useCallback(() => {
        toggleMemberFullScreen();
        closeMemberMenu();
    }, [toggleMemberFullScreen, closeMemberMenu]);
    
    // Handle pie chart resize
    const handlePieResizeStart = useCallback((e) => {
        e.preventDefault();
        const handler = pieResizeRef.current;
        
        handler.isResizing = true;
        handler.startHeight = pieChartHeight;
        handler.startPos = e.clientY;
        document.body.classList.add('is-resizing');
        
        const handleMouseMove = (evt) => {
            if (!handler.isResizing) return;
            
            const deltaY = evt.clientY - handler.startPos;
            const newHeight = Math.max(150, handler.startHeight + deltaY);
            
            setPieChartHeight(newHeight);
            
            if (pieChartInstance.current) {
                pieChartInstance.current.resize();
            }
        };
        
        const handleMouseUp = () => {
            handler.isResizing = false;
            document.body.classList.remove('is-resizing');
            
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp, { once: true });
    }, [pieChartHeight]);
    
    // Handle member chart resize
    const handleMemberResizeStart = useCallback((e) => {
        e.preventDefault();
        const handler = memberResizeRef.current;
        
        handler.isResizing = true;
        handler.startHeight = memberChartHeight;
        handler.startPos = e.clientY;
        document.body.classList.add('is-resizing');
        
        const handleMouseMove = (evt) => {
            if (!handler.isResizing) return;
            
            const deltaY = evt.clientY - handler.startPos;
            const newHeight = Math.max(150, handler.startHeight + deltaY);
            
            setMemberChartHeight(newHeight);
            
            if (memberChartInstance.current) {
                memberChartInstance.current.resize();
            }
        };
        
        const handleMouseUp = () => {
            handler.isResizing = false;
            document.body.classList.remove('is-resizing');
            
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp, { once: true });
    }, [memberChartHeight]);
    
    return (
        <section 
            className={`board-chart ${isFullScreen ? 'fullscreen' : ''}`} 
            ref={containerRef}
        >
            <div className="board-chart-content" ref={contentRef}>
                <div className="chart-header">
                    <h3 className="chart-title">Bar Chart</h3>
                    <div className="menu-container">
                        <div ref={buttonRef}>
                            <IconButton
                                className="filter-button"
                                ariaLabel="More Options"
                                icon={Bullets}
                                onClick={toggleMenu}
                            />
                        </div>
                        
                        {isMenuOpen && (
                            <div className="dropdown-menu" ref={menuRef}>
                                <div 
                                    className="menu-item"
                                    onClick={handleFullScreenToggle}
                                >
                                    <span className="menu-icon">
                                        <Icon icon={Minimize} />
                                    </span>
                                    <span className="menu-label">
                                        {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div 
                    className="chart-container" 
                    style={{ 
                        height: isFullScreen ? '100%' : `${chartHeight}px`,
                        position: 'relative',
                        padding: '0px'
                    }}
                >
                    <canvas 
                        ref={chartRef}
                        style={{ 
                            maxWidth: '100%',
                            margin: '0 auto',
                            display: 'block'
                        }} 
                    />
                </div>
                {!isFullScreen && (
                    <div 
                        className="resize-handle" 
                        title="Resize chart"
                        onMouseDown={handleResizeStart}
                    ></div>
                )}
            </div>
            <div className="mini-charts">
                <div className={`chart pie-chart-container ${isPieFullScreen ? 'fullscreen' : ''}`} ref={pieContainerRef}>
                    <div className="mini-chart-content" ref={pieContentRef}>
                        <div className="chart-header">
                            <h3 className="chart-title">Pie Chart</h3>
                            <div className="menu-container">
                                <div ref={pieButtonRef}>
                                    <IconButton
                                        className="filter-button"
                                        ariaLabel="More Options"
                                        icon={Bullets}
                                        onClick={togglePieMenu}
                                    />
                                </div>
                                
                                {isPieMenuOpen && (
                                    <div className="dropdown-menu" ref={pieMenuRef}>
                                        <div 
                                            className="menu-item"
                                            onClick={handlePieFullScreenToggle}
                                        >
                                            <span className="menu-icon">
                                                <Icon icon={Minimize} />
                                            </span>
                                            <span className="menu-label">
                                                {isPieFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div 
                            className="chart-container" 
                            style={{ 
                                height: isPieFullScreen ? '100%' : `${pieChartHeight}px`,
                                position: 'relative',
                                padding: '20px'
                            }}
                        >
                            <canvas 
                                ref={pieChartRef}
                                style={{ 
                                    maxWidth: '100%',
                                    margin: '0 auto',
                                    display: 'block'
                                }} 
                            />
                        </div>
                        {!isPieFullScreen && (
                            <div 
                                className="resize-handle" 
                                title="Resize chart"
                                onMouseDown={handlePieResizeStart}
                            ></div>
                        )}
                    </div>
                </div>
                <div className={`chart member-chart-container ${isMemberFullScreen ? 'fullscreen' : ''}`} ref={memberContainerRef}>
                    <div className="mini-chart-content" ref={memberContentRef}>
                        <div className="chart-header">
                            <h3 className="chart-title">Member Task Distribution</h3>
                            <div className="menu-container">
                                <div ref={memberButtonRef}>
                                    <IconButton
                                        className="filter-button"
                                        ariaLabel="More Options"
                                        icon={Bullets}
                                        onClick={toggleMemberMenu}
                                    />
                                </div>
                                
                                {isMemberMenuOpen && (
                                    <div className="dropdown-menu" ref={memberMenuRef}>
                                        <div 
                                            className="menu-item"
                                            onClick={handleMemberFullScreenToggle}
                                        >
                                            <span className="menu-icon">
                                                <Icon icon={Minimize} />
                                            </span>
                                            <span className="menu-label">
                                                {isMemberFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div 
                            className="chart-container" 
                            style={{ 
                                height: isMemberFullScreen ? '100%' : `${memberChartHeight}px`,
                                position: 'relative',
                                padding: '20px'
                            }}
                        >
                            <canvas 
                                ref={memberChartRef}
                                style={{ 
                                    maxWidth: '100%',
                                    margin: '0 auto',
                                    display: 'block'
                                }} 
                            />
                        </div>
                        {!isMemberFullScreen && (
                            <div 
                                className="resize-handle" 
                                title="Resize chart"
                                onMouseDown={handleMemberResizeStart}
                            ></div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}