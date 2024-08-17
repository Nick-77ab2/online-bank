import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Verify() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    const response = await axios.post('http://localhost:8080/api/verify', { token });
                    if (response.status === 200) {
                        alert('Email verified successfully!');
                        navigate('/?action=Login'); // Redirect to LoginSignup with Login action
                    } else {
                        alert('Verification failed. Invalid or expired token.');
                        navigate('/'); // Redirect to the home page if verification fails
                    }
                } catch (error) {
                    alert('Verification failed. Invalid or expired token.');
                    navigate('/'); // Redirect to the home page if verification fails
                }
            } else {
                alert('Token is missing.');
                navigate('/'); // Redirect to the home page if token is missing
            }
        };

        verifyToken();
    }, [token, navigate]);

    return (
        <div>
            Verifying...
        </div>
    );
}

export default Verify;