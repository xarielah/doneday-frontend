import { Icon } from "@vibe/core";
import { NavigationChevronLeft } from "@vibe/icons";
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
    }, [isSearch]);

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

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <section className="app-nav" ref={sidebarRef}>
            <nav className="nav" ref={innerSidebarRef}>
                <Icon
                    className="minimize-btn"
                    icon={NavigationChevronLeft}
                    onClick={() => setIsMinimize(!isMinimize)}
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
            </nav>

            <div className="resize-bar" onMouseDown={handleMouseDown}></div>
        </section>
    );
}
