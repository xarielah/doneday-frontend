import { IconButton } from "@vibe/core"
import { DropdownChevronLeft, DropdownChevronRight } from "@vibe/icons"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { BoardNav } from "./BoardNav/BoardsNav"
import { FavoritesNav } from "./FavoriteNav"
import { MainNav } from "./MainNav"

export function AppNav() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const navigate = useNavigate()
    const location = useLocation()

    const [isSearch, setIsSearch] = useState(false)
    const [isMinimize, setIsMinimize] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const innerSidebarRef = useRef(null)
    const sidebarRef = useRef(null)
    const searchRef = useRef(null)
    const isResizing = useRef(false)

    // Only set isSearch to false when clicking outside the search area
    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsSearch(false)
        }
    }

    // Only depend on isSearch so the effect doesn't run on every isMinimize change
    useEffect(() => {
        if (isSearch) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isSearch])

    useEffect(() => {
        if (sidebarRef.current && innerSidebarRef.current) {
            sidebarRef.current.style.width = innerSidebarRef.current.style.width || 200
            innerSidebarRef.current.style.width = sidebarRef.current.style.width || 200
        }
    }, [])

    const handleMouseDown = () => {
        isResizing.current = true
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseMove = (e) => {
        if (isResizing.current) {
            const newWidth = e.clientX || 200
            const minWidth = 200
            const maxWidth = 580

            if (newWidth >= minWidth && newWidth <= maxWidth) {
                sidebarRef.current.style.width = `${newWidth}px`
                innerSidebarRef.current.style.width = `${newWidth}px`
            }
        }
    }

    const handleMouseUp = () => {
        isResizing.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    const handleNavigate = (path) => {
        navigate(path)
    }

    function toggleMinimize() {
        if (!isMinimize) {
            sidebarRef.current.style.width = "30px"
        } else {
            sidebarRef.current.style.width = innerSidebarRef.current.style.width
        }
        setIsMinimize(!isMinimize)
        setIsHovered(false)
        innerSidebarRef.current.style.width = `${newWidth}px`
    }


    return (
        <section className="app-nav" ref={sidebarRef}>
            {isMinimize && (
                <nav
                    className={`nav-close $`}
                    onMouseEnter={(e) => e.target === e.currentTarget && setIsHovered(true)}
                    onMouseLeave={(e) => e.target === e.currentTarget && setIsHovered(false)}                >
                    <IconButton
                        className="minimize-btn minimize-close-btn"
                        icon={isMinimize ? DropdownChevronRight : DropdownChevronLeft}
                        onClick={toggleMinimize}
                    />
                </nav>
            )}
            {<nav
                className={`nav ${isMinimize ? 'minimize' : ''} ${isHovered ? 'hovered' : ''}`}
                ref={innerSidebarRef}
                onMouseEnter={(e) => setIsHovered(true)}
                onMouseLeave={(e) => setIsHovered(false)}
                onLoad={(e) => e.target.style.width = `${200 && e.clientX}px`}
                style={{ minWidth: '200px' }}
            >
                <IconButton
                    className={`minimize-btn ${isHovered && isMinimize ? 'hovered' : ''}`}
                    icon={isMinimize ? DropdownChevronRight : DropdownChevronLeft}
                    onClick={toggleMinimize}
                />
                <MainNav location={location} handleNavigate={handleNavigate} />
                <FavoritesNav />
                {boards && <BoardNav
                    boards={boards}
                    location={location}
                    handleNavigate={handleNavigate}
                    isSearch={isSearch}
                    setIsSearch={setIsSearch}
                    searchRef={searchRef}
                />}
            </nav>}
            <div className="resize-bar" onMouseDown={handleMouseDown}></div>
        </section>
    )
}
