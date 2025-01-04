import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'

import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { Explore } from './pages/Explore.jsx'
import { Settings } from './pages/Settings.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />
            <main>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path='accounts'>
                        <Route path="emailsignup" element={<Signup />} />
                        <Route path="login" element={<Login />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                    <Route path="/:userName" element={<UserDetails />}>
                        <Route path='posts' />
                        <Route path='reels' />
                        <Route path='saved' />
                        <Route path='tagged' />
                    </Route>
                    <Route path="explore" element={<Explore />} />
                    <Route path='p/:postId' />
                    <Route path='p/:reelId' />
                    <Route path='reels/:reelId' />
                    <Route path='stories'>
                        <Route path='/:userName/:storyId' />
                        <Route path='/highlights/:highlightId' />
                    </Route>
                    <Route path='direct'>
                        <Route path='inbox' />
                        <Route path='/t/:inboxId' />
                    </Route>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


