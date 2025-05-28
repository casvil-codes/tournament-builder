import { Bracket } from "react-brackets";

import { useTournament } from "../../hooks/useTournament/useTournament";
import { useEffect, useState } from "react";
import { CustomSeed } from "./CustomSeed";

export const Brackets = () => {
  const { tournament, transformMatchesToRounds, loading } = useTournament();
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    if (!tournament) return () => {};
    setRounds(transformMatchesToRounds(tournament.Matches));
  }, [tournament]);
  if (loading) return null;
  return (
    <Bracket
      rounds={rounds}
      renderSeedComponent={CustomSeed}
      bracketClassName="bracket"
    />
  );
};
