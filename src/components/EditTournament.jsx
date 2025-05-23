import React, { useEffect, useState } from "react";

import { useTournament } from "../hooks/useTournament/useTournament";

export const EditTournament = () => {
  const { loading, tournament, setTournamentConfig } = useTournament();
  const [name, setName] = useState("");
  const [numPlayers, setNumPlayers] = useState(null);

  useEffect(() => {
    if (!tournament) return () => {};
    setName(tournament.name);
    setNumPlayers(tournament.numPlayers);
  }, [tournament]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tournamentData = {
      name,
      numPlayers,
    };

    await setTournamentConfig(tournamentData);
  };

  if (loading || !tournament) return null;

  return (
    <div>
      <h2>Editar Torneo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del torneo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Número de jugadores</label>
          <select
            value={numPlayers}
            onChange={(e) => setNumPlayers(Number(e.target.value))}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
          </select>
        </div>

        <button type="submit">Actualizar torneo</button>
      </form>
    </div>
  );
};
