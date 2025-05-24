import { useTournament } from "../../hooks/useTournament/useTournament";

export const Home = () => {
  const { tournament, loading } = useTournament();

  if (loading || !tournament) return null;

  return <div>{tournament.name}</div>;
};
