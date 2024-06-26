import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isLogin) {
      const response = await axios.post('http://localhost:3003/login', { email, password });
      if (response.status === 200) {
        console.log('Zalogowano:', response.data);
        onLogin(response.data.token, response.data.userId, response.data.isAdmin);
        navigate('/dashboard');
      } else {
        console.error('Błąd logowania:', response.data);
      }
    } else {
      const response = await axios.post('http://localhost:3003/signup', { email, password });
      const { token, userId } = response.data;
      console.log('Zarejestrowano:', token, userId);
    }
  } catch (error) {
    console.error('Błąd:', error.response.data);
  }
};

  return (
    <div>
      <h1>{isLogin ? 'Logowanie' : 'Rejestracja'}</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Hasło:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">{isLogin ? 'Zaloguj się' : 'Zarejestruj się'}</button>
      </form>

      <p>
        {isLogin ? 'Nie masz jeszcze konta?' : 'Masz już konto?'}
        <span onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: 'blue', marginLeft: '5px' }}>
          {isLogin ? 'Zarejestruj się' : 'Zaloguj się'}
        </span>
      </p>
    </div>
  );
};

export default Login;
