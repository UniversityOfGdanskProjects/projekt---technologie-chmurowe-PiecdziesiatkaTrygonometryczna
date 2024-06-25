import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Game from './Components/Game';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import EditAccount from './Components/EditAccount';
import FindUsers from './Components/FindUsers';
import GameOwnerLookup from './Components/GameOwnerLookup';
import GameBoard from './Components/Gameboard';
import EditCoordinates from './Components/EditCoordinates';
import DeleteCoordinateForm from './Components/DeleteCoordinateFrom';
import Chat from './Components/Chat';






function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const LoginButton = () => {
    const location = useLocation();

    if (location.pathname === '/') {
      return (
        <Link to="/login">
          <button style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'red',
            backgroundImage: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)',
            color: 'white',
            border: 'none',
            fontSize: '2em',
            cursor: 'pointer'
          }}>
            Siema
          </button>
        </Link>
      );
    }

    return null;
  };


  const handleLogin = (token, userId, isAdmin) => {
    Cookies.set('token', token);
    Cookies.set('userId', userId);
    Cookies.set('isAdmin', isAdmin);
    setIsLoggedIn(true);
    setUserId(userId);
  };


  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };


  const isAdmin = Cookies.get('isAdmin') === 'true';


  return (
    <Router>
      <div>
        <LoginButton />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} isLoggedIn={isLoggedIn} userId={userId} isAdmin={isAdmin} /> : null} />
          <Route path="/gameboard" element={isLoggedIn ? <GameBoard /> : <GameBoard />} />
          <Route path="/edit-account" element={isLoggedIn && isAdmin ? <EditAccount /> : null} />
          <Route path="/search-users" element={isLoggedIn && isAdmin ? <FindUsers /> : null} />
          <Route path="/game-owner-lookup" element={isLoggedIn && isAdmin ? <GameOwnerLookup /> : null} />
          <Route path="/edit-coordinates" element={isLoggedIn && isAdmin ? <EditCoordinates /> : null} />
          <Route path="/delete-coordinate-from" element={isLoggedIn && isAdmin ? <DeleteCoordinateForm /> : null} />
          <Route path="/game" element={isLoggedIn && isAdmin ? <Game onLogout={handleLogout} /> : null} />
          <Route path="/chat" element={isLoggedIn ? <Chat userId={userId} /> : null} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
