import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getJsonKey = async (email, password) => {
    try {
        const authHeader = `Basic ${btoa(`${email}:${password}`)}`;
        const response = await axios.get(`${API_URL}/hello`,
            { headers: { Authorization: authHeader } }
        );
        return response.data;
    } catch (error) {
        console.error('User does not exist', error);
        throw error;
    }
}

export const saveUser = async (name, email, password) => {
    
}