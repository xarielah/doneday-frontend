
import "@vibe/core/tokens"
import { matchPath, Navigate, Route, Routes, useLocation } from 'react-router'
import { AppHeader } from './cmps/AppHeader'
import ExternalHomePage from "./pages/ExternalHomePage"
import { HomePage } from './pages/HomePage'

import { useEffect } from "react"
import { AppFooter } from './cmps/AppFooter'
import { AppNav } from "./cmps/AppSideNav/AppNav.jsx"
import SlidePanel from "./cmps/SlidePanel"
import { Board } from './pages/Board'
import { socketService } from "./services/socket.service.js"
import { loadBoards } from "./store/actions/board.actions.js"

export function RootCmp() {
    const isAuthenticated = true;
    if (isAuthenticated) return <AuthenticatedRoutes />
    else return <UnauthenticatedRoutes />
}

const AuthenticatedRoutes = () => {
    const { pathname } = useLocation()
    const match = matchPath('/board/:boardId/task/:taskId', pathname)
    const params = match?.params || {};

    useEffect(() => {
        loadBoards();

        socketService.on('updated-board', data => {
            console.log('🚀 ~ file: RootCmp.jsx ~ line 19 ~ socketService.on ~ updated-board:', data)
        })

        socketService.on('deleted-board', data => {
            console.log('🚀 ~ file: RootCmp.jsx ~ line 19 ~ socketService.on ~ deleted-board:', data)
        })

        return () => {
            socketService.terminate();
        }
    }, [])

    return <div className="main-container">
        <AppHeader />
        <AppNav />
        <SlidePanel params={params} />
        <main className="page-container">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/board/:boardId' element={<Board />}>
                    <Route path="task/:taskId" element={<></>} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </main>
        <AppFooter />
    </div >
}

const UnauthenticatedRoutes = () => {
    return <div className="external-main-container">
        <Routes>
            <Route path="/" element={<ExternalHomePage />} />
            <Route path='*' element={<Navigate to="/" replace />} />
            <Route path='' element={<Navigate to="/" replace />} />
        </Routes>
    </div>
}


