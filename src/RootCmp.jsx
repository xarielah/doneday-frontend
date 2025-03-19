
import "@vibe/core/tokens"
import { matchPath, Navigate, Route, Routes, useLocation } from 'react-router'
import { AppHeader } from './cmps/AppHeader'
import ExternalHomePage from "./pages/ExternalHomePage"
import { HomePage } from './pages/HomePage'

import { AppFooter } from './cmps/AppFooter'
import { AppNav } from "./cmps/AppSideNav/AppNav.jsx"
import SlidePanel from "./cmps/SlidePanel"
import { Board } from './pages/Board'
import { Chart } from "./pages/Chart.jsx"

export function RootCmp() {
    const isAuthenticated = true;
    if (isAuthenticated) return <AuthenticatedRoutes />
    else return <UnauthenticatedRoutes />
}

const AuthenticatedRoutes = () => {
    const { pathname } = useLocation()
    const match = matchPath('/board/:boardId/task/:taskId', pathname)
    const params = match?.params || {};

    return <div className="main-container">
        <AppHeader />
        <AppNav />
        <SlidePanel params={params} />
        <main className={`page-container ${location.pathname.includes('/chart') ? 'chart-page' : ''}`}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/board/:boardId' element={<Board />}>
                    <Route path="task/:taskId" element={<>asdasdasd</>} />
                </Route>
                <Route path="/board/:boardId/chart" element={<Chart />} />
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


