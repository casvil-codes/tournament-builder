import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off , update, remove} from "firebase/database";
import { app } from "../../firebase/config.js";

export function useTournament() {
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const tournamentRef = ref(db, 'Tournament');

    const unsubscribe = onValue(tournamentRef, (snapshot) => {
      setTournament(snapshot.val());
      setLoading(false);
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
      off(tournamentRef);
    };
  }, []);

  const setTournamentConfig = async (tournamentData) => {
    try {
        const db = getDatabase(app);
        const tournamentRef = ref(db, `/Tournament`);

        // Mantener jugadores existentes si hay, o crear nuevos
        const players = Array.from({ length: tournamentData.numPlayers })
            .reduce((acc, _, i) => {
                const slot = String.fromCharCode(65 + i);
                acc[slot] = tournament.Players?.[slot] || "";
                return acc;
            }, {});

        // Generar automáticamente los partidos de la primera ronda si no existen
        const matches = tournament.Matches || { Round1: [] };
        if (!tournament.Matches) {
            matches.Round1 = Object.keys(players)
                .map((player, index, arr) => {
                    return index % 2 === 0 && arr[index + 1]
                        ? { [player]: "0", [arr[index + 1]]: "0" }
                        : null;
                })
                .filter(match => match !== null);
        }

        // Guardar la configuración actualizada en Firebase
        await update(tournamentRef, {
          Players: players,
          name: tournamentData.name, // Se puede editar
          numPlayers: tournamentData.numPlayers, // Se puede editar
          Matches: matches // Mantiene los datos previos o crea nuevos
        });
    } catch (error) {
        console.error("Failed to update tournament configuration", error);
        throw error;
    }
};


  const deleteTournament = async () => {
    try {
        const db = getDatabase(app);
        const tournamentRef = ref(db, `/Tournament`);
        await remove(tournamentRef);
    } catch (error) {
        console.error("Failed to delete tournament", error);
        throw error;
    }
};

  const setPlayersConfig = async (players) => {
    try {
      const db = getDatabase(app);
      const tournament = ref(db, `Tournament`);

      await update(tournament, { Players: players });
    } catch (error) {
      console.error("Failed to update match score:", error);
      throw error;
    }
  };

  const setMatchesScore = async (matches) => {
    try {
      const db = getDatabase(app);
      const tournament = ref(db, `Tournament`);

      await update(tournament, { Matches: matches });
    } catch (error) {
      console.error("Failed to update match score:", error);
      throw error;
    }
  };

  const transformMatchesToRounds = (matches) => {
    const rounds = Object.keys(matches)
      .filter((key) => key.startsWith("Round"))
      .sort((a, b) => {
        // Ordenar por número de ronda
        const numA = parseInt(a.replace("Round", ""), 10);
        const numB = parseInt(b.replace("Round", ""), 10);
        return numA - numB;
      })
      .map((roundKey, roundIndex) => {
        const roundMatches = matches[roundKey];
  
        return {
          title: `Round ${roundIndex + 1}`,
          seeds: roundMatches.map((match, matchIndex) => {
            const players = Object.keys(match);
            return {
              id: matchIndex + 1,
              teams: players.map((playerId) => ({
                name: tournament.Players[playerId],
                score: Number(match[playerId]), // opcional, si quieres mostrar el score
              })),
            };
          }),
        };
      });
      console.log(rounds)
    return rounds;
  };
  


  return { loading, tournament, setTournamentConfig, setPlayersConfig, setMatchesScore, deleteTournament, transformMatchesToRounds };
}
