import React, { useEffect, useState } from "react";

import { useTournament } from "../../hooks/useTournament/useTournament";
import "./EditTournament.css";

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
    <div className="edit-tournament-container">
      <h2 className="edit-tournament-title">Editar Torneo</h2>
      <form onSubmit={handleSubmit} className="edit-tournament-form">
        <div>
          <label className="edit-tournament-label">Nombre del torneo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="edit-tournament-input"
          />
        </div>
        <div>
          <label className="edit-tournament-label">Número de jugadores</label>
          <select
            value={numPlayers}
            onChange={(e) => setNumPlayers(Number(e.target.value))}
            className="edit-tournament-select"
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
          </select>
        </div>
        <button type="submit" className="edit-tournament-button">
          Actualizar torneo
        </button>
      </form>
    </div>
  );
};
