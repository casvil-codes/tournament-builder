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

  return (
    <div>
      <div>
        <h2>Editar jugadores</h2>
        <form onSubmit={handleSubmit}>
          {Object.entries(tournament.Players).map(([key, value]) => (
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

          <button type="submit">Actualizar jugadores</button>
        </form>
      </div>
    </div>
  );
};
