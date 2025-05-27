import { useTournament } from "../../hooks/useTournament/useTournament";
import "./Home.css";

export const Home = () => {
  const { tournament, loading } = useTournament();

  if (loading) return null;

  return (
    <div>
      <h1>{tournament?.name}</h1>
      <span>{tournament?.numPlayers} jugadors</span>
      <br />
      <br />
      <br />
      <div>
        <div className="Round1">
          <h4>Round 1</h4>
          {tournament?.Matches?.Round1 &&
            Object.entries(tournament.Matches.Round1).map(([key, match]) => {
              // Calcula el score máximo
              const maxScore = Math.max(
                ...Object.values(match).map((s) => Number(s))
              );
              return (
                <div key={key}>
                  {Object.entries(match).map(([playerId, score]) => {
                    const isWinner =
                      Number(score) === maxScore && Number(score) !== 0;
                    return (
                      <div key={playerId} className={isWinner ? "winner" : ""}>
                        <span>{tournament.Players[playerId]} - </span>
                        <span>{score}</span>
                      </div>
                    );
                  })}
                  <br />
                </div>
              );
            })}
        </div>
        <div className="Round2">
          <h4>Round 2</h4>
          {tournament?.Matches?.Round2 &&
            Object.entries(tournament.Matches.Round2).map(([key, match]) => {
              const maxScore = Math.max(
                ...Object.values(match).map((s) => Number(s))
              );
              return (
                <div key={key}>
                  {Object.entries(match).map(([playerId, score]) => {
                    const isWinner =
                      Number(score) === maxScore && Number(score) !== 0;
                    return (
                      <div key={playerId} className={isWinner ? "winner" : ""}>
                        <span>{tournament.Players[playerId]} - </span>
                        <span>{score}</span>
                      </div>
                    );
                  })}
                  <br />
                </div>
              );
            })}
        </div>
        <div className="Round3">
          <h4>Round 3</h4>
          {tournament?.Matches?.Round3 &&
            Object.entries(tournament.Matches.Round3).map(([key, match]) => {
              const maxScore = Math.max(
                ...Object.values(match).map((s) => Number(s))
              );
              return (
                <div key={key}>
                  {Object.entries(match).map(([playerId, score]) => {
                    const isWinner =
                      Number(score) === maxScore && Number(score) !== 0;
                    return (
                      <div key={playerId} className={isWinner ? "winner" : ""}>
                        <span>{tournament.Players[playerId]} - </span>
                        <span>{score}</span>
                      </div>
                    );
                  })}
                  <br />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
