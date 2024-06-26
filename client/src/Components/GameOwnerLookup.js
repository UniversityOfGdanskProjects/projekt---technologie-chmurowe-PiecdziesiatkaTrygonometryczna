import React, { useState } from 'react';

const GameOwnerLookup = () => {
  const [gameId, setGameId] = useState('');
  const [owner, setOwner] = useState('');
  const [error, setError] = useState('');

  const lookupOwner = async () => {
    try {
      const response = await fetch(`http://localhost:3003/api/games/${gameId}/owner`);
      const data = await response.json();

      if (response.ok) {
        setOwner(`Owner: ${data.owner}`);
        setError('');
      } else {
        setOwner('');
        setError('Game not found');
      }
    } catch (error) {
      console.error(error);
      setOwner('');
      setError('Server error');
    }
  };

  return (
    <div>
      <h1>Wyszukaj właściciela gry</h1>

      <form>
        <label htmlFor="gameId">Game ID:</label>
        <input
          type="text"
          id="gameId"
          name="gameId"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          required
        />
        <button type="button" onClick={lookupOwner}>
          Wyszukaj
        </button>
      </form>

      <div>
        <h2>Właściciel gry:</h2>
        <p>{owner}</p>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default GameOwnerLookup;
