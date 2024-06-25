import React, { useState } from 'react';

const DeleteCoordinateForm = () => {
  const [gameId, setGameId] = useState('');
  const [coordinateToDelete, setCoordinateToDelete] = useState('');
  const [coordinateType, setCoordinateType] = useState('');

  const handleDeleteCoordinate = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3003/api/games/${gameId}/delete-coordinate`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coordinateToDelete,
        coordinateType
      })
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleDeleteCoordinate}>
      <input type="text" placeholder="Game ID" value={gameId} onChange={(e) => setGameId(e.target.value)} required />
      <input type="text" placeholder="Pionek do usunięcia" value={coordinateToDelete} onChange={(e) => setCoordinateToDelete(e.target.value)} required />
      <select value={coordinateType} onChange={(e) => setCoordinateType(e.target.value)} required>
        <option value="">Gracz</option>
        <option value="x">X</option>
        <option value="y">O</option>
      </select>
      <button type="submit">Usuń pionek</button>
    </form>
  );
};

export default DeleteCoordinateForm;