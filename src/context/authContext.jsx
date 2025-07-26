import axios from 'axios';
import React, { useState, createContext, useContext, useEffect } from 'react';

const UserContext = createContext();

const authContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/verify', {
                    headers: {
                        "Authorization": `Bearer ${token}}`
                    }
                })
                console.log(response);
                
                if (response.data.success) {
                    setUser(response.data.user)
                }
                else {
                    setUser(null);
                    setLoading(false);
                }
            } catch (error) {
                setUser(null);

            } finally {
                setLoading(false);
            }
        }
        verifyUser();

    }, [])

    const Login = async (user) => {
        setUser(user)
    };
    const Logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    }

    return (
        <UserContext.Provider value={{ user, Login, Logout, loading }}>
            {children}
        </UserContext.Provider>
    );

}
export const useAuth = () => useContext(UserContext);
export default authContext;