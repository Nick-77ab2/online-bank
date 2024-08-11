import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, setUser } from '../../services/newApiService';
import './LoginSignup.css';


import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import user_icon from '../Assets/person.png';

export const LoginSignup = () => {

    const [action,setAction] = useState("Login");
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [issue, setIssue] = useState('');

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

    const displayIssue = (response) => {
        setIssue(response);
        
    }
    const navigate = useNavigate();
    const navigateUser= () => {
        navigate('/account', {replace: true});
    }
    const handleLogin = async (username, password) => {
        try {
            const response = await getUser(username, password);
            if(response==="Wrong email or password, please try again.")
            {
                displayIssue(response);
                LoginSignup.isLoggedIn=false;
            }
            else if(response!=null){
                console.log('Login Successful:', response);
                LoginSignup.isLoggedIn=true;
                displayIssue('');
                navigateUser();
            }
            else{
                console.log('returning false');
                LoginSignup.isLoggedIn=false;
            }
        } catch (err) {
            console.error('Error logging in:', err);
        }
    }
    const handleRegister = async (name, username, password) => {
        try{
            const response = await setUser(name, username, password);
            if(response==="success")
            {
                console.log('Registration Successful:', response);
                switchToLogin();
                displayIssue('');
            }
            else{
                displayIssue(response);
            }
        } catch (err) {
        console.error('Error Registering:', err);
        }
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
            {action==="Sign Up"?<div className='continue' onClick={() => {handleRegister(name, username, password);}}>Register</div>:<div className='continue' onClick={() => {handleLogin(username, password); }}>Login</div>}
        </div>
        {action==="Sign Up"? null :<div className='forgot-password'>Forgot Password?<span>Click Here!</span></div>}
        <div className='issue'>{issue}</div>
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={() =>{switchToSignup(); displayIssue('');}}>Sign Up Page</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={() =>{switchToLogin(); displayIssue('');}}>Login Page</div>
        </div>
    </div>
  )
}
