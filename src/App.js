import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Account } from './Account';
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
            <Routes>
                <Route path = "/account" element = {<Account/>}/>
                <Route path = "/" element = {<LoginSignup />}/>
            </Routes>
            <footer> Created by Nick Pelletier, 2024</footer>
            <footer>v0.1 Dev</footer>
        </div>
    );
}

export default App;
