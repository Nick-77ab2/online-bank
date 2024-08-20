import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deposit, transfer, withdraw } from '../../services/newApiService';
import './Account.css';

export const Account = () => {

    const navigate = useNavigate();
    const handleDeposit = async (username, amount) => {
        try{
            const response = await deposit(username, amount);
            updateBalance(response); // Update balance after deposit
        } catch(err){
            console.error('Error depositing:', err);
        };
    }

    const handleWithdraw = async (username, amount) => {
        try{
            const response = await withdraw(username, amount);
            updateBalance(response); // Update balance after withdrawal
        } catch(err){
            console.error('Error withdrawing:', err);
        };
    }

    const handleTransfer = async (fromUser, toUser, amount) => {
        try{
            const response = await transfer(fromUser, toUser, amount);
            updateBalance(response); // Update balance after transfer
        } catch(err){
            console.error('Error transferring:', err);
        };
    }
    const parseJWT = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(atob(base64));
        }
        return null;
    }

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }


    const user = parseJWT();
    console.log("Information in user: ",user);
    const account= user['Account:'];
    const [balance, setBalance] = useState(account.balance);
    const [toUser, setUser] = useState('');
    const updateBalance = (amt) =>{
            setBalance(amt);
    }

    return (
        <div>
        <button className="logout" onClick={logout}>Logout</button>
            <div className='user'>User: {user.Username}</div>
            <h1>Account Information</h1>
            <div className='Account'>
                <div className='accounttext'>{account.accountType} account</div>
                <div>Current Balance: {balance}</div>
            </div>
            <div className='accountInteractions'>
                <button className='button' onClick={() => {handleDeposit(account.accid,50);}}>Deposit 50</button>
                <button className='button' onClick={() => {handleWithdraw(account.accid,25);}}>Withdraw 25</button>
            </div>
            <div className='texts'>Transfer to:</div>
            <div className='input'>
                <input className='textinput' placeholder='Enter email of user' value= {toUser} onChange={(e) => setUser(e.target.value)}/>
                <button className='button' onClick={() =>{handleTransfer(account.accid, toUser, 50);}}>Transfer 50</button>
            </div>
        </div>
    );
}