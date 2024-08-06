import { useState } from "react";

export const Login = () => {
    const [message, setMessage] = useState('Welcome visitor');
    return (
    <div>
    <h1>{message}</h1>
    <input type="text" placeholder="Username" />
    <input type="password" placeholder="Password" />
    <button onClick={() => setMessage('Thanks for logging in')}>Login</button>
    </div>
    );
}