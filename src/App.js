import React from 'react';
import './App.css';
import BankName from './components/BankName';
import { LoginSignup } from './components/LoginSignup/LoginSignup';

function App() {
    return (
        <div className="App">
            <div className="App-logo">
            <BankName />
            </div>
            {/*<header className="App-header">
            <MessageComponent />
            </header>*/}
            <LoginSignup />
            {/*fun stuff to add*/}
            {/*<button onClick={handleLogin}>Login</button>*/}
            {/*<button onClick={handleLogout}>Logout</button>*/}
            {/*<button onClick={handleRegister}>Register</button>*/}
            {/*<button onClick={handleForgotPassword}>Forgot Password</button>*/}
            {/*<button onClick={handleResetPassword}>Reset Password</button>*/}
            {/*<button onClick={handleUpdateProfile}>Update Profile</button>*/}
            {/*<button onClick={handleChangePassword}>Change Password</button>*/}
            {/*<button onClick={handleViewTransactions}>View Transactions</button>*/}
            {/*<button onClick={handleDepositFunds}>Deposit Funds</button>*/}
            {/*<button onClick={handleWithdrawFunds}>Withdraw Funds</button>*/}
            {/*<button onClick={handleTransferFunds}>Transfer Funds</button>*/}
            {/*<button onClick={handleViewAccountDetails}>View Account</button>*/}
            <footer> Created by Nick Pelletier, 2024</footer>
            <footer>v0.1 Dev</footer>
        </div>
    );
}

export default App;
