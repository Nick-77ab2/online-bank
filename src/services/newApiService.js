import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/authentication`,
            {
                username: username,
                password: password
            });
        const token = response.data;
        localStorage.setItem('token', token);
        return token;
    } catch (error) {
        console.error('Login failed:', error);
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
        console.log('User created successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to save user', error);
        throw error;
    }
    
}