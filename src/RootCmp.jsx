
import ExternalHomePage from "./pages/ExternalHomePage"
import { Navigate, Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import "@vibe/core/tokens"
import { AppHeader } from './cmps/AppHeader'

import { AppFooter } from './cmps/AppFooter'
import { AppNav } from './cmps/AppNav'
import { Board } from './pages/Board'

export function RootCmp() {
    const isAuthenticated = true;
    if (isAuthenticated) return <AuthenticatedRoutes />
    else return <UnauthenticatedRoutes />
}

const AuthenticatedRoutes = () => {
    return <div className="main-container">
        <AppHeader />
        <AppNav />
        <main>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/board' element={<Board />} />
                <Route path='/board/:boardId' />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </main>
        <AppFooter />
    </div>
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


