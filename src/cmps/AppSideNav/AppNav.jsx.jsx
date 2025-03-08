import { Icon, IconButton } from "@vibe/core";
import { DropdownChevronLeft, DropdownChevronRight, NavigationChevronLeft, NavigationChevronRight } from "@vibe/icons";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BoardNav } from "./BoardNav/BoardsNav";
import { FavoritesNav } from "./FavoriteNav";
import { MainNav } from "./MainNav";



export function AppNav() {
    const boards = useSelector(storeState => storeState.boardModule.boards);
    const navigate = useNavigate();
    const location = useLocation();

    const [isSearch, setIsSearch] = useState(false);
    const [isMinimize, setIsMinimize] = useState(false);
    const [isHovered, setIsHovered] = useState(false);


    const innerSidebarRef = useRef(null);
    const sidebarRef = useRef(null);
    const searchRef = useRef(null);
    const isResizing = useRef(false);

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsSearch(false);
        } else {
            setIsSearch(true);
        }
    };

    useEffect(() => {        
        if (isSearch) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearch,isMinimize]);

    const handleMouseDown = () => {
        isResizing.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (isResizing.current) {
            const newWidth = e.clientX;
            const minWidth = 250;
            const maxWidth = 580;

            // Enforce min and max width constraints
            if (newWidth >= minWidth && newWidth <= maxWidth) {
                sidebarRef.current.style.width = `${newWidth}px`
                innerSidebarRef.current.style.width = `${newWidth}px`
            }
        }
    };

    const handleMouseUp = (e) => {
        isResizing.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseEnter = () => {
        if (isMinimize) {
          setIsHovered(true);
        }
      };
    
      const handleMouseLeave = () => {
        if (isMinimize) {
          setIsHovered(false);
        }
      };

    const handleNavigate = (path) => {
        navigate(path);
    };

    function toggleMinimize(){
        setIsMinimize(!isMinimize)
        setIsHovered(false)
    }

    const minimizedSideStyle = {

    }

    return (
        <section className="app-nav" ref={sidebarRef}>
            {isMinimize &&
            <nav
            className={`nav-close ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
            <IconButton 
                    className="minimize-btn minimize-close"
                    icon={DropdownChevronRight}
                    onClick={() => toggleMinimize()}
                />
            </nav>}
            {<nav
            className={`nav ${isMinimize ? 'minimize' : ''} ${isHovered ? 'hovered' : ''}`}
            ref={innerSidebarRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
                <IconButton 
                    className="minimize-btn"
                    icon={DropdownChevronLeft}
                    onClick={() => toggleMinimize()}
                />
                <MainNav location={location} handleNavigate={handleNavigate} />
                <FavoritesNav />
                <BoardNav
                    boards={boards}
                    location={location}
                    handleNavigate={handleNavigate}
                    isSearch={isSearch}
                    setIsSearch={setIsSearch}
                    searchRef={searchRef}
                />
            </nav>}

            <div className="resize-bar" onMouseDown={handleMouseDown}></div>
        </section>
    );
}
