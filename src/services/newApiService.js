import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/authentication`,
            {
                username: username,
                password: password
            });
        console.log('Successfully contacted backend. Obtained response: ', response.data);
        const token = response.data;
        localStorage.setItem('token', token);
        return token;
    } catch (error) {
        console.error('Login failed:', error);
        if(error.message==="Request failed with status code 401")
            return "Wrong email or password, please try again."; 
        return null;
    }
}

export const setUser = async (name, username, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, 
            { name: name, 
              username: username,
              password: password 
            });
        console.log('Successfully contacted backend. Obtained response: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to save user', error);
        throw error;
    }
    
}

export const deposit = async (username, amount) => {
    try {
        const response = await axios.post(`${API_URL}/api/bank/addbalance/${username}`, {
            amount: amount
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Successfully contacted backend. Obtained response: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to deposit', error);
        throw error;
    }
}

export const withdraw = async (username, amount) => {
    try {
        const response = await axios.post(`${API_URL}/api/bank/removebalance/${username}`, {
            amount: amount
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Successfully contacted backend. Obtained response: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to withdraw', error);
        throw error;
    }
}