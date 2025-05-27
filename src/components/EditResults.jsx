import React, { useEffect, useState } from "react";
import { useTournament } from "../hooks/useTournament/useTournament";

export const EditResults = () => {
  const { tournament, loading, setMatchesScore } = useTournament();
  const [matches, setMatches] = useState({});
  const [recalculateFrom, setRecalculateFrom] = useState(1);

  const getLastRoundNumber = (matches) => {
    const roundKeys = Object.keys(matches)
      .filter((key) => key.startsWith("Round"))
      .map((key) => parseInt(key.replace("Round", ""), 10))
      .filter((num) => !isNaN(num));

    return roundKeys.length ? Math.max(...roundKeys) : 0;
  };

  useEffect(() => {
    if (!tournament) return () => {};
    setMatches(tournament.Matches);
    setRecalculateFrom(getLastRoundNumber(tournament.Matches));
  }, [tournament]);

  const saveScore = async (e) => {
    e.preventDefault();

    const generateNextRound = (currentRound) => {
      console.log(currentRound);
      const formattedRound = Array.isArray(
        currentRound[`Round${recalculateFrom}`]
      )
        ? currentRound[`Round${recalculateFrom}`]
        : Object.values(currentRound[`Round${recalculateFrom}`]);

      const nextRoundMatches = formattedRound.reduce(
        (acc, match, index, arr) => {
          if (index % 2 === 0 && arr[index + 1]) {
            const winnerA = Object.entries(match).reduce((a, b) =>
              b[1] > a[1] ? b : a
            );
            const winnerB = Object.entries(arr[index + 1]).reduce((a, b) =>
              b[1] > a[1] ? b : a
            );
            if (winnerA[1] != 0 && winnerB[1] != 0) {
              acc.push({ [winnerA[0]]: "0", [winnerB[0]]: "0" });
            }
          }
          return acc;
        },
        []
      );
      return nextRoundMatches;
    };

    const nextRound = generateNextRound(matches);

    // Esperar a que el estado se actualice completamente antes de usarlo
    await new Promise((resolve) => {
      setMatches((prevMatches) => {
        // Crear una copia del estado anterior sin las rondas posteriores
        const updatedMatches = Object.keys(prevMatches).reduce((acc, key) => {
          const roundNumber = parseInt(key.replace("Round", ""), 10);

          // Conservar solo las rondas hasta recalculateFrom + 1
          if (roundNumber <= recalculateFrom + 1) {
            acc[key] = prevMatches[key];
          }

          return acc;
        }, {});

        // Agregar la nueva ronda recalculada
        updatedMatches[`Round${recalculateFrom + 1}`] = nextRound;

        resolve(updatedMatches);
        return updatedMatches;
      });
    }).then(async (updatedMatches) => {
      await setMatchesScore(updatedMatches); // Usa la versión ya actualizada de `matches`
    });
  };

  const handleScoreChange = (round, matchId, playerId, value) => {
    const roundNum = parseInt(round.replace("Round", ""), 10);
    if (roundNum < recalculateFrom) setRecalculateFrom(roundNum);
    setMatches((prev) => ({
      ...prev,
      [round]: {
        ...prev[round],
        [matchId]: {
          ...prev[round][matchId],
          [playerId]: value,
        },
      },
    }));
  };

  if (loading) return null;
  return (
    <div>
      <div>
        <h2>Editar Resultats</h2>
        <div className="Round1">
          <h4>Round 1</h4>
          {matches?.Round1 &&
            Object.entries(matches?.Round1).map(([key, value]) => (
              <div key={key}>
                {Object.entries(value).map(([kkey, val]) => (
                  <div key={kkey}>
                    <span>{tournament.Players[kkey]} - </span>
                    <input
                      type="text"
                      value={val || ""}
                      onChange={(e) =>
                        handleScoreChange("Round1", key, kkey, e.target.value)
                      }
                      placeholder={`Puntuacion`}
                    />
                  </div>
                ))}
                <br />
              </div>
            ))}
        </div>
        <div className="Round2">
          <h4>Round 2</h4>
          {matches?.Round2 &&
            Object.entries(matches?.Round2).map(([key, value]) => (
              <div key={key}>
                {Object.entries(value).map(([kkey, val]) => (
                  <div key={kkey}>
                    <span>{tournament.Players[kkey]} - </span>
                    <input
                      type="text"
                      value={val || ""}
                      onChange={(e) =>
                        handleScoreChange("Round2", key, kkey, e.target.value)
                      }
                      placeholder={`Puntuacion`}
                    />
                  </div>
                ))}
                <br />
              </div>
            ))}
        </div>
        <div className="Round3">
          <h4>Round 3</h4>
          {matches?.Round3 &&
            Object.entries(matches?.Round3).map(([key, value]) => (
              <div key={key}>
                {Object.entries(value).map(([kkey, val]) => (
                  <div key={kkey}>
                    <span>{tournament.Players[kkey]} - </span>
                    <input
                      type="text"
                      value={val || ""}
                      onChange={(e) =>
                        handleScoreChange("Round3", key, kkey, e.target.value)
                      }
                      placeholder={`Puntuacion`}
                    />
                  </div>
                ))}
                <br />
              </div>
            ))}
        </div>
        <button onClick={saveScore}>Guarda els canvis</button>
      </div>
    </div>
  );
};
