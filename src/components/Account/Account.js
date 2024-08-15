import React, { useState } from 'react';
import { deposit, withdraw } from '../../services/newApiService';
import './Account.css';

export const Account = () => {

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
    const parseJWT = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(atob(base64));
        }
        return null;
    }

    const user = parseJWT();
    console.log("Information in user: ",user);
    const account= user['Account:'];
    const [balance, setBalance] = useState(account.balance);
    const updateBalance = (amt) =>{
            setBalance(amt);
    }

    return (
        <div>
            <div className='user'>User: {user.Username}</div>
            <h1>Account Information</h1>
            <div className='Account'>
                <div>{account.accountType} account</div>
                <div>Current Balance: {balance}</div>
            </div>
            <div className='accountInteractions'>
                <button className='button' onClick={() => {handleDeposit(account.accid,50);}}>Deposit 50</button>
                <button className='button' onClick={() => {handleWithdraw(account.accid,25);}}>Withdraw 25</button>
            </div>
        </div>
    );
}