import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deposit, transfer, withdraw } from '../../services/newApiService';
import './Account.css';

export const Account = () => {
    const [userDeposit, setUserDeposit] = useState('');
    const [userWithdraw, setUserWithdraw] = useState('');
    const [userTransfer, setUserTransfer] = useState('');
    const [issue, setIssue] = useState('');
    const [user, setUser] = useState(null);
    const [toUser, setToUser] = useState('');
    const [balance, setBalance] = useState('');
    const [account, setAccount] = useState(null);

    const navigate = useNavigate();
    const formatter = useMemo (() => {
        return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    },[]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const parsedUser = JSON.parse(atob(base64));
            setUser(parsedUser);
            setAccount(parsedUser['Account:']);
            const rawBalance = parsedUser['Account:'].balance;
            setBalance(formatter.format(rawBalance));
        }
    }, [formatter]);

    const displayIssue = (response) => {
        setIssue(response);
    };

    const handleDeposit = async (username, amount) => {
        var with2Decimals = amount.match(/^-?\d+(?:\.\d{0,2})?/)[0];
        if (!isNaN(amount) && !isNaN(parseFloat(amount)) && parseFloat(with2Decimals) !== 0) {
            displayIssue('');
            try {
                const response = await deposit(username, with2Decimals);
                updateBalance(response); // Update balance after deposit
            } catch (err) {
                console.error('Error depositing:', err);
            }
        } else {
            console.log("Invalid input. Please enter a valid number.");
            displayIssue("Invalid input. Please enter a valid number.");
        }
    };

    const handleWithdraw = async (username, amount) => {
        var with2Decimals = amount.match(/^-?\d+(?:\.\d{0,2})?/)[0];
        var numBal = balance.replace('$','');
        console.log(numBal, with2Decimals);
        if (!isNaN(amount) && !isNaN(parseFloat(amount)) && parseFloat(with2Decimals) !== 0 && parseFloat(with2Decimals)<=parseFloat(numBal)) {
            displayIssue('');
            try {
                const response = await withdraw(username, with2Decimals);
                updateBalance(response); // Update balance after withdrawal
            } catch (err) {
                console.error('Error withdrawing:', err);
            }
        } else {
            console.log("Invalid input. Please enter a valid number.");
            displayIssue("Invalid input. Please enter a valid number.");
        }
    };

    const handleTransfer = async (fromUser, toUser, amount) => {
        var with2Decimals = amount.match(/^-?\d+(?:\.\d{0,2})?/)[0];
        var numBal = balance.replace('$','');
        if (!isNaN(amount) && !isNaN(parseFloat(amount)) && parseFloat(with2Decimals) !== 0 && parseFloat(with2Decimals)<=parseFloat(numBal) && fromUser !== toUser) {
            displayIssue('');
            try {
                const response = await transfer(fromUser, toUser, with2Decimals);
                updateBalance(response); // Update balance after transfer
            } catch (err) {
                console.error('Error transferring:', err);
                displayIssue("There was an issue transferring. Make sure you have the amount you want to transfer and that the user exists.");
            }
        } else {
            console.log("Invalid input. Please enter a valid number.");
            displayIssue("Invalid input. Please enter a valid amount and a valid email that is not your own.");
        }
    };
    const updateBalance = (amt) => {
        const rawBalance = parseFloat(amt); // Store the balance as a raw number
        const formattedBalance = formatter.format(rawBalance); // Format the balance for display
    
        setBalance(formattedBalance); // Update the display balance
    
        setAccount(prevAccount => {
            const updatedAccount = {
                ...prevAccount,
                balance: rawBalance // Store the raw number in the account object
            };
    
            const updatedUser = {
                ...user,
                'Account:': updatedAccount
            };
    
            const token = localStorage.getItem('token');
            if (token) {
                const base64Header = token.split('.')[0];
                const base64Payload = btoa(JSON.stringify(updatedUser));
                const newToken = `${base64Header}.${base64Payload}.${token.split('.')[2]}`;
    
                localStorage.setItem('token', newToken);
                setUser(updatedUser);
            } else {
                console.error("Token is missing from localStorage");
            }
    
            return updatedAccount;
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (!user || !account) {
        return <div>Loading...</div>;
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
                <div className='input'>
                    <input className='textinput' placeholder='Enter amount to Deposit' value={userDeposit} onChange={(e) => setUserDeposit(e.target.value)} />
                    <button className='button' onClick={() => { handleDeposit(account.accid, userDeposit); }}>Deposit</button>
                </div>
                <div className='input'>
                    <input className='textinput' placeholder='Enter amount to Withdraw' value={userWithdraw} onChange={(e) => setUserWithdraw(e.target.value)} />
                    <button className='button' onClick={() => { handleWithdraw(account.accid, userWithdraw); }}>Withdraw</button>
                </div>
            </div>
            <div className='texts'>Transfer to:</div>
            <div className='input'>
                <input className='textinput' placeholder='Enter email of user' value={toUser} onChange={(e) => setToUser(e.target.value)} />
                <input className='textInput' placeholder='Enter amount to Transfer' value={userTransfer} onChange={(e) => setUserTransfer(e.target.value)} />
                <button className='button' onClick={() => { handleTransfer(account.accid, toUser, userTransfer); }}>Transfer</button>
            </div>
            <div className='issue'>{issue}</div>
        </div>
    );
};