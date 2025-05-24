import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off , update} from "firebase/database";
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
      const tournament = ref(db, `/`);
      const players = Object.fromEntries(
        Array.from({ length: tournamentData.numPlayers }, (_, i) => {
          const slot = String.fromCharCode(65 + i); // 65 = 'A'
          return [slot, ""];
        })
      );
      await update(tournament, {Tournament: { Players: players, name: tournamentData.name, numPlayers: tournamentData.numPlayers }});
    } catch (error) {
      console.error("Failed to update match score:", error);
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


  return { loading, tournament, setTournamentConfig, setPlayersConfig };
}
