import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import EditAccount from './EditAccount';
import FindUsers from './FindUsers';
import GameOwnerLookup from './GameOwnerLookup';
import GameBoard from './Gameboard';
import EditCoordinates from './EditCoordinates';
import DeleteCoordinateForm from './DeleteCoordinateFrom';
import Chat from './Chat';

const Dashboard = ({ onLogout, isLoggedIn }) => {

  
    const navigate = useNavigate();
    const [userId, setUserId] = useState(Cookies.get('userId'));
    const [isAdmin, setIsAdmin] = useState(Cookies.get('isAdmin') === 'true');

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    const cookieUserId = Cookies.get('userId');
    const cookieIsAdmin = Cookies.get('isAdmin') === 'true';

    useEffect(() => {
        setUserId(cookieUserId);
        setIsAdmin(cookieIsAdmin);
        console.log('Aktualnie zalogowany użytkownik ID:', userId);
        console.log('isAdmin:', isAdmin);
    }, [cookieUserId, cookieIsAdmin, userId, isAdmin]);

    const ws = useRef(null);

    useEffect(() => {
      ws.current = new WebSocket('ws://localhost:8080');
  
      ws.current.onmessage = (event) => {
        alert(event.data);
      };
  
      return () => {
        ws.current.close();
      };
    }, []);
  
    const handleAdminBroadcast = () => {
      if (ws.current && isAdmin) {
        ws.current.send('Komunikat od admina do wszystkich użytkowników');
      }
    };
  

  return (
      <div>
        <h1>Dashboard</h1>
        {isAdmin && (
      <>
        <Link to="/edit-account">Edytuj konto</Link>
        <br/>
        <Link to="/search-users">Wyszukaj użytkowników</Link>
        <br/>
        <Link to="/game-owner-lookup">Wyszukaj właścicieli gier</Link>
        <br/>
        <Link to="/edit-coordinates">Edytuj plansze</Link>
        <br/>
        <Link to="/delete-coordinate-from">Usuń pionki</Link>
        <br/>
        <Link to="/game">Zarządzanie grami</Link>
        <br/>
        <button onClick={handleAdminBroadcast}>Wyślij komunikat do wszystkich użytkowników</button>
        <br/>
      </>
    )}

        <Link to="/gameboard">Gra</Link>
        <br/>
        <Link to="/chat">Chat</Link>
        <br/>

        <button onClick={handleLogout}>Wyloguj się</button>
  
        <Routes>
      <Route path="/edit-account" element={<EditAccount />} />
      <Route path="/search-users" element={<FindUsers />} />
      <Route path="/game-owner-lookup" element={<GameOwnerLookup />} />
      <Route path="/edit-coordinates" element={<EditCoordinates />} />
      <Route path="/gameboard" element={<GameBoard />} />
      <Route path="/delete-coordinate-from" element={<DeleteCoordinateForm />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
      </div>
    );
  };
  
  export default Dashboard;