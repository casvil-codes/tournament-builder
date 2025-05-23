import React, { useState } from "react";

import { useTournament } from "../../hooks/useTournament/useTournament";

export const Admin = () => {
  const { loading, tournament, setTournamentConfig } = useTournament();
  const [name, setName] = useState("");
  const [numPlayers, setNumPlayers] = useState(4);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tournamentData = {
      name,
      numPlayers,
    };

    await setTournamentConfig(tournamentData);
  };

  if (loading) return null;

  return (
    <div>
      {Object.keys(tournament.Players).map((player) => player)}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border rounded shadow space-y-4"
      >
        <h2 className="text-xl font-bold">Crear Torneo</h2>

        <div>
          <label className="block mb-1">Nombre del torneo</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Imagen (opcional)</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => setImage(e.target.files[0] || null)}
          />
        </div>

        <div>
          <label className="block mb-1">Número de jugadores</label>
          <select
            className="w-full p-2 border rounded"
            value={numPlayers}
            onChange={(e) => setNumPlayers(Number(e.target.value))}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Torneo
        </button>
      </form>
    </div>
  );
};
