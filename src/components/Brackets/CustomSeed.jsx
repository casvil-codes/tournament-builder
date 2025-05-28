import { Seed, SeedItem, SeedTeam } from "react-brackets";
import "./Brackets.css";

export const CustomSeed = ({ seed }) => {
  const homeTeam = seed.teams[0];
  const awayTeam = seed.teams[1];

  return (
    <Seed style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam
            style={{
              backgroundColor: homeTeam.score > awayTeam.score && "#d1b966",
            }}
          >
            <div>{homeTeam.name ? homeTeam.name : "----"}</div>
            <div>{homeTeam.score}</div>
          </SeedTeam>
          <SeedTeam
            style={{
              backgroundColor: homeTeam.score < awayTeam.score && "#d1b966",
            }}
          >
            <div>{awayTeam.name ? awayTeam.name : "----"}</div>
            <div>{awayTeam.score}</div>
          </SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};
