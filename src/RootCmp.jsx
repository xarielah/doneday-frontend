import "@vibe/core/tokens"
import { Navigate, Route, Routes } from 'react-router'
import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { AppNav } from './cmps/AppNav'
import { Board } from './pages/Board'
import ExternalHomePage from "./pages/ExternalHomePage"
import { HomePage } from './pages/HomePage'

export function RootCmp() {
    const isAuthenticated = false;
    if (isAuthenticated) return <AuthenticatedRoutes />
    else return <UnauthenticatedRoutes />
}

const AuthenticatedRoutes = () => {
    return <div className="main-container">
        <AppHeader />
        <AppNav />
        <main>
            <Routes>
                <Route path="" element={<HomePage />} />
                <Route path='board' element={<Board />} />
                <Route path='board/:boardId' />
            </Routes>
        </main>
        <AppFooter />
    </div>
}

const UnauthenticatedRoutes = () => {
    return <div className="external-main-container">
        <Routes>
            <Route path="" element={<ExternalHomePage />} />
            <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
    </div>
}


