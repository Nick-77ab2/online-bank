import { setUser } from '../services/newApiService';

export const handleRegister = async (name, username, password) => {
        try{
            const response = await setUser(name, username, password);
        } catch (err) {
        console.error('Error Registering:', err);
        }
    }
export default handleRegister;