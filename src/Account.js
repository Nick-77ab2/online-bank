import React from 'react';

export const Account = () => {
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
    return (
        <div>
            <h1>Account Information</h1>
            {/* Add account information here */}
        </div>
    );
}