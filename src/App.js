import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Account } from './components/Account/Account';
import BankName from './components/BankName';
import { LoginSignup } from './components/LoginSignup/LoginSignup';
import Verify from './components/LoginSignup/Verify';

function App() {
    return (
        <div className="App">
            <div className="App-logo">
            <BankName />
            </div>
            {/*<header className="App-header">
            <MessageComponent />
            </header>*/}
            <Routes>
                <Route path = "/account" element = {<Account/>}/>
                <Route path = "/" element = {<LoginSignup />}/>
                <Route path = "/verify" element = {<Verify/>}/>
            </Routes>
            <footer> Created by Nick Pelletier, 2024</footer>
            <footer>v0.1 Dev</footer>
        </div>
    );
}

export default App;
