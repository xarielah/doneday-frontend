import "@vibe/core/tokens"
import { Route, Routes } from 'react-router'
import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { AppNav } from './cmps/AppNav.jsx'
import { Board } from './pages/Board.jsx'
import { HomePage } from './pages/HomePage'

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <AppNav />
            {/* <UserMsg /> */}
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


