import axios from 'axios';
//This is test code. Keeping here solely for memory
const API_URL = 'http://localhost:8080';
const USERNAME = 'user';
const PASSWORD = 'supersecretpassword';

const authHeader = `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`;

export const getMessages = async () => {
    try {
        const response = await axios.get(`${API_URL}/hello`, {
            headers: { Authorization: authHeader }
    });
    return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const saveMessage = async (content) => {
    try {
        const response = await axios.post(`${API_URL}/hello`, { content }, {
            headers: { Authorization: authHeader }
    });
        return response.data;
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
};