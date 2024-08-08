import { getUser } from '../services/newApiService';

export const handleLogin = async (username, password) => {
    try {
        const response = await getUser(username, password);
        console.log('Login Successful:', response);
    } catch (err) {
        console.error('Error logging in:', err);
    }
}

export default handleLogin;