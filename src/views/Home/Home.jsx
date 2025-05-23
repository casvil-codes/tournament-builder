import { useTournament } from "../../hooks/useTournament/useTournament";

export const Home = () => {
  const { tournament, loading } = useTournament();

  if (loading) return null;

  return <div>{tournament.name}</div>;
};
