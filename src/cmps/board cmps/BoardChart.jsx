import { useEffect, useRef, useState, useCallback } from "react";
import Chart from 'chart.js/auto';
import { boardService } from "../../services/board/board.service.local";
import { Bullets, Minimize, Chart as ChartIcon, Graph } from "@vibe/icons";
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
const useFullScreen = (chartInstanceRef) => {
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
                const isClickOutsideContent = !contentRef.current.contains(e.target) && 
                                              containerRef.current.contains(e.target);
                if (isClickOutsideContent) {
                    setIsFullScreen(false);
                }
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        if (isFullScreen) {
            document.addEventListener('mousedown', handleOutsideClick);
            document.body.classList.add('chart-fullscreen');
        } else {
            document.body.classList.remove('chart-fullscreen');
        }
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleOutsideClick);
            document.body.classList.remove('chart-fullscreen');
        };
    }, [isFullScreen]);
    
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
const useDropdownMenu = () => {
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
    
    return { isMenuOpen, toggleMenu, closeMenu, menuRef, buttonRef };
};

// Main component
export function BoardChart({ board }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    
    // State for chart type with localStorage persistence
    const [chartType, setChartType] = useState(() => {
        return localStorage.getItem('chartType') || 'bar';
    });
    
    // Custom hooks for functionality
    const { chartHeight, handleResizeStart } = useChartResizing(chartInstance);
    const { isFullScreen, toggleFullScreen, containerRef, contentRef } = useFullScreen(chartInstance);
    const { isMenuOpen, toggleMenu, closeMenu, menuRef, buttonRef } = useDropdownMenu();

    // Save chart type to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('chartType', chartType);
    }, [chartType]);

    // Initialize and update chart
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
    }, [board, chartType, isFullScreen]);
    
    // Toggle chart type between bar and pie
    const toggleChartType = useCallback(() => {
        setChartType(prevType => prevType === 'bar' ? 'pie' : 'bar');
        closeMenu();
    }, [closeMenu]);
    
    // Handle fullscreen toggle from menu
    const handleFullScreenToggle = useCallback(() => {
        toggleFullScreen();
        closeMenu();
    }, [toggleFullScreen, closeMenu]);
    
    return (
        <section 
            className={`board-chart ${isFullScreen ? 'fullscreen' : ''}`} 
            ref={containerRef}
        >
            <div className="board-chart-content" ref={contentRef}>
                <div className="chart-header">
                    <h3 className="chart-title">{chartType === 'bar' ? 'Bar Chart' : 'Pie Chart'}</h3>
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
                                <div 
                                    className="menu-item"
                                    onClick={toggleChartType}
                                >
                                    <span className="menu-icon">
                                        <Icon icon={chartType === 'bar' ? ChartIcon : Graph} />
                                    </span>
                                    <span className="menu-label">
                                        {chartType === 'bar' ? 'Switch to Pie Chart' : 'Switch to Bar Chart'}
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
                        padding: chartType === 'pie' ? '20px' : '0px'
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
        </section>
    );
}