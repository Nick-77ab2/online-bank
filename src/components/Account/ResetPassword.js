import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createToken, resetUserPassword } from '../../services/newApiService';
import './ResetPassword.css';
export const ResetPassword = () => {

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('token');
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [issue, setIssue] = useState('');

    const displayIssue = (response) => {
        setIssue(response);
        
    }
    const passwordReset = async (username) => {
        try {
            const response = await createToken(username);
            if (response === "Successfully sent email") {
                console.log('Password reset successful:', response);
                displayIssue('Check your email for password reset link.');
            } else {
                displayIssue(response);
            }
        } catch (err) {
            console.error('Error resetting password:', err);
        }
    }

    const checkPassword = (password1, password2) => {
        if (password.indexOf(" ") !== -1) {
            return false;
          }
         
          // for digits from 0 to 9
          let count = 0;
          for (let i = 0; i <= 9; i++) {
            if (password.indexOf(i) !== -1) {
              count = 1;
            }
          }
          if (count === 0) {
            return false;
          }
         
          // for special characters
          if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return false;
          }
         
          // for capital letters
          count = 0;
          for (let i = 65; i <= 90; i++) {
            if (password.indexOf(String.fromCharCode(i)) !== -1) {
              count = 1;
            }
          }
          if (count === 0) {
            return false;
          }
         
          // for small letters
          count = 0;
          for (let i = 97; i <= 122; i++) {
            if (password.indexOf(String.fromCharCode(i)) !== -1) {
              count = 1;
            }
          }
          if (count === 0) {
            return false;
          }
         
          // if all conditions fail
          if (password1!==password2)
            return false;
          return true;
        }

    const resetPassword = async (token, password) => {
        try {
            const response = await resetUserPassword(token, password);
            if (response === "Password updated") {
                console.log('Password reset successful:', response);
                navigate('/');
            } else {
                displayIssue(response);
            }
        } catch (err) {
            console.error('Error resetting password:', err);
        }
    }

    return (
        <div className="reset-password-container">
            <h1>Reset Password</h1>
            {token===null && <div>
                <input type="email" placeholder="Email" value = {username} onChange={(e) => setUsername(e.target.value)}/>
                <button type="submit" onClick={() =>{passwordReset(username)}}>Reset Password</button>
            </div>}
            {token!=null && <div>
                <input type="password" placeholder="New Password" value= {password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm Password"value= {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button type="submit"  onClick={() =>{if(checkPassword(password, confirmPassword)){ resetPassword(token, password)} else{ displayIssue("password must be at least 8 characters, contain an upper, lower, and special character. Both passwords must match.")} }}>Save Password</button>
            </div>}
            <div className='issue'>{issue}</div>
        </div>

    );
}