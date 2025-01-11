import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import "@vibe/core/tokens";
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { AppNav } from './cmps/AppNav.jsx'
import { Board } from './pages/Board.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
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
    )
}


