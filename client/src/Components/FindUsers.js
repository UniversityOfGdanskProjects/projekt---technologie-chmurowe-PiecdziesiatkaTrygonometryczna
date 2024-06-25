import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FindUsers = () => {
    const [searchCriteria, setSearchCriteria] = useState({
        email: '',
    });
    const [searchResults, setSearchResults] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const searchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3003/search-users', {
                params: { ...searchCriteria },
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3003/users-db');
            setAllUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGrantAdmin = async (email) => {
        try {
            await axios.put('http://localhost:3003/grant-admin', { email });
            getAllUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRevokeAdmin = async (email) => {
        try {
            await axios.put('http://localhost:3003/revoke-admin', { email });
            getAllUsers();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div>
            <h2>Wyszukaj użytkowników</h2>

            <label>Email:</label>
            <input
                type="text"
                value={searchCriteria.email}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, email: e.target.value })}
            />

            <button onClick={searchUsers}>Szukaj</button>

            <div>
                <h2>Wyniki:</h2>
                <ul>
                    {searchResults.map((user) => (
                        <li key={user._id}>
                            {user.is_admin && <span>👑</span>} {user.email}
                            {user.is_admin ? (
                                <button onClick={() => handleRevokeAdmin(user.email)}>Zabierz Admina</button>
                            ) : (
                                <button onClick={() => handleGrantAdmin(user.email)}>Przydziel Admina</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Wszyscy użytkownicy:</h2>
                <ul>
                    {allUsers.map((user) => (
                        <li key={user._id}>
                            {user.is_admin && <span>👑</span>} {user.email}
                            {user.is_admin ? (
                                <button onClick={() => handleRevokeAdmin(user.email)}>Zabierz Admina</button>
                            ) : (
                                <button onClick={() => handleGrantAdmin(user.email)}>Przydziel Admina</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FindUsers;
