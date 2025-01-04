import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'

import { UserDetails } from './cmps/UserDetails.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { Explore } from './pages/Explore.jsx'
import { Settings } from './pages/Settings.jsx'
import { SavedList } from './cmps/SavedList.jsx'
import { TaggedList } from './cmps/TaggedList.jsx'
import { ReelList } from './cmps/ReelList.jsx'
import { Post } from './cmps/Post.jsx'
import { Story } from './cmps/Story.jsx'
import { Reel } from './cmps/Reel.jsx'
import { AccountIndex } from './pages/AccountIndex.jsx'
import { StoryIndexModal } from './pages/StoryIndexModal.jsx'
import { PostList } from './cmps/PostList.jsx'
import { Direct } from './pages/DirectIndex.jsx'
import { Inbox } from './cmps/Inbox.jsx'
import { Conversation } from './cmps/Conversation.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />
            <main>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path='accounts' element={<AccountIndex />} >
                        <Route path="emailsignup" element={<Signup />} />
                        <Route path="login" element={<Login />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                    <Route path="/:userName" element={<UserDetails />}>
                        <Route path='posts' element={<PostList />} />
                        <Route path='posts' element={<PostList />} />
                        <Route path='reels' element={<ReelList />} />
                        <Route path='saved' element={<SavedList />} />
                        <Route path='tagged' element={<TaggedList />} />
                    </Route>
                    <Route path="explore" element={<Explore />} />
                    <Route path='p/:postId' element={<Post />} />
                    <Route path='p/:reelId' element={<Reel />} />
                    <Route path='reels/:reelId' element={<Reel />} />
                    <Route path='stories' element={<StoryIndexModal />}>
                        <Route path='/:userName/:storyId' element={<Story />} />
                        <Route path='/highlights/:highlightId'  element={<Story />} />
                    </Route>
                    <Route path='direct' element={<Direct />}>
                        <Route path='inbox' element={<Inbox />} />
                        <Route path='/t/:inboxId' element={<Conversation />}/>
                    </Route>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


