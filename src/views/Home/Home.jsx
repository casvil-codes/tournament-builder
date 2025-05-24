import { useTournament } from "../../hooks/useTournament/useTournament";

export const Home = () => {
  const { tournament, loading } = useTournament();

  if (loading) return null;
  console.log(tournament);
  return (
    <div>
      <h1>{tournament.name}</h1>
      <span>{tournament.numPlayers} jugadors</span>
      <br />
      <br />
      <br />
      <div>
        <div className="Round1">
          <h4>Round 1</h4>
          {Object.entries(tournament.Matches.Round1).map(([key, value]) => (
            <div key={key}>
              {Object.entries(value).map(([kkey, val]) => (
                <div key={kkey}>
                  <span>{tournament.Players[kkey]} - </span>
                  <span>{val}</span>
                </div>
              ))}
              <br />
            </div>
          ))}
        </div>
        <div className="Round2">
          <h4>Round 2</h4>
          {Object.entries(tournament.Matches.Round2).map(([key, value]) => (
            <div key={key}>
              {Object.entries(value).map(([kkey, val]) => (
                <div key={kkey}>
                  <span>{tournament.Players[kkey]} - </span>
                  <span>{val}</span>
                </div>
              ))}
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
