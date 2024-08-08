import React, { useState } from 'react';
import { handleLogin } from '../Login';
import { handleRegister } from '../Register';
import './LoginSignup.css';


import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import user_icon from '../Assets/person.png';

export const LoginSignup = () => {

    const [action,setAction] = useState("Login");
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const switchToSignup = () => {
        setAction("Sign Up");
        setName('');
        setUsername('');
        setPassword('');
    }
    const switchToLogin = () => {
        setAction("Login");
        setName('');
        setUsername('');
        setPassword('');
    }

  return (
    <div className ='container'>
        <div className = "header">
            <div className = "text">{action}</div>
            <div className = "underline"></div>
        </div>
        <div className ="inputs">
            {action==="Login"? null :<div className='input'>
                <img src={user_icon} alt=""/>
                <input type="text" placeholder="Name" value = {name} onChange={(e) => setName(e.target.value)}/>
            </div>}
            <div className='input'>
                <img src={email_icon} alt=""/>
                <input type="email" placeholder='Email Address' value = {username} onChange={(e) => setUsername(e.target.value)}/>
            </div> 
            <div className='input'>
                <img src={password_icon} alt=""/>
                <input type="password" placeholder='Password' value= {password} onChange={(e) => setPassword(e.target.value)}/>
            </div> 
        </div>
        <div className='continue'>
            {action==="Sign Up"?<div className='continue' onClick={() => handleRegister(name, username, password)}>Register</div>:<div className='continue' onClick={() => handleLogin(username, password)}>Login</div>}
        </div>
        {action==="Sign Up"? null :<div className='forgot-password'>Forgot Password?<span>Click Here!</span></div>}
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={switchToSignup}>Sign Up Page</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={switchToLogin}>Login Page</div>
        </div>
    </div>
  )
}
