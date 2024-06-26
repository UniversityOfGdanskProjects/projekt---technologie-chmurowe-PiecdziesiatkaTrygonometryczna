import { useState } from "react";
import "./Game.css";

const Game = () => {
  const [gameId, setGameId] = useState(null);
  const [message, setMessage] = useState('');

  const deleteAllGames = async () => {
    try {
      const response = await fetch('http://localhost:3003/delete-all-games', {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.text();
        setMessage(data);
      } else {
        console.error('Failed to delete all games');
      }
    } catch (error) {
      console.error('Failed to delete all games', error);
    }
  };

  const createGame = async () => {
    const response = await fetch('http://localhost:3003/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "owner": "",
        "player1": "",
        "player2": "",
        "places_of_x": [],
        "places_of_y": [],
        "is_over": "value",
        "player_won": null
      })
    });

    const data = await response.json();
    console.log('Game ID:', gameId);

    setGameId(data._id);
  };

  return (
    <div>
      <button onClick={createGame}>Utwórz grę</button>
      {gameId && <h1>{gameId}</h1>}
      <button onClick={deleteAllGames}>Usuń wszystkie gry</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Game;