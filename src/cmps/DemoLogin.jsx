import { useState } from "react"
import { socketService } from "../services/socket.service"
import { userService } from "../services/user/user.service.remote"

export default function DemoLogin() {
    const [input, setInput] = useState({ username: '', password: '' })

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        userService.login(input)
            .then(user => {
                socketService.emit('set-user-socket', user._id);
            })
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
                type="text"
                name="username"
                value={input.username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
            />
            <button type="submit">Login</button>
        </form>
    )
}   