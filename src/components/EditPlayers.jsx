import React, { useEffect, useState } from "react";

import { useTournament } from "../hooks/useTournament/useTournament";

export const EditPlayers = () => {
  const { loading, tournament, setPlayersConfig } = useTournament();
  const [players, setPlayers] = useState({});

  useEffect(() => {
    if (!tournament) return () => {};
    setPlayers(tournament.Players);
  }, [tournament]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await setPlayersConfig(players);
  };

  const handlePlayerChange = (key, value) => {
    setPlayers({ ...players, [key]: value });
  };

  if (loading || !tournament || !tournament.Players) return null;

  const shufflePlayerValues = () => {
    // Extraer los valores en un array
    const values = Object.values(players);

    // Función para mezclar un array usando el algoritmo de Fisher-Yates
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }

    // Crear un nuevo objeto con las keys originales y los valores mezclados
    const keys = Object.keys(players);
    const shuffledPlayers = {};
    keys.forEach((key, index) => {
      shuffledPlayers[key] = values[index];
    });

    setPlayers(shuffledPlayers);
  };

  return (
    <div>
      <div>
        <h2>Editar jugadores</h2>
        <form onSubmit={handleSubmit}>
          {Object.entries(players).map(([key, value]) => (
            <div key={key}>
              <label>Jugador {key}</label>
              <input
                type="text"
                value={players[key]}
                onChange={(e) => handlePlayerChange(key, e.target.value)}
                placeholder={`Nombre del jugador ${key}`}
              />
            </div>
          ))}
          <br />
          <button onClick={shufflePlayerValues}>Barreja jugadors</button>
          <br />
          <br />
          <button type="submit">Guardar canvis</button>
        </form>
      </div>
    </div>
  );
};
