import { Brackets } from "../../components/Brackets/Brackets";
import { useTournament } from "../../hooks/useTournament/useTournament";
import "./Home.css";

export const Home = () => {
  const { tournament, loading } = useTournament();

  if (loading) return null;

  return (
    <div className="home">
      <h1>{tournament?.name}</h1>
      <span>{tournament?.numPlayers} jugadors</span>
      <Brackets />
    </div>
  );
};
