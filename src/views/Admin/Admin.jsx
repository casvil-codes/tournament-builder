import React, { useEffect, useState } from "react";

import { useTournament } from "../../hooks/useTournament/useTournament";
import { EditTournament } from "../../components/EditTournament/EditTournament";
import { EditPlayers } from "../../components/EditPlayers";
import { Home } from "../Home/Home";
import { EditResults } from "../../components/EditResults";

export const Admin = () => {
  const { loading, tournament } = useTournament();
  const [activeSection, setActiveSection] = useState("edit-tournament");

  if (loading) return null;

  const setCurrentSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <ul>
        <li onClick={() => setCurrentSection("edit-tournament")}>
          {activeSection === "edit-tournament" ? (
            <b>Editar torneig</b>
          ) : (
            "Editar torneig"
          )}
        </li>
        <li onClick={() => setCurrentSection("edit-players")}>
          {activeSection === "edit-players" ? (
            <b>edit-players</b>
          ) : (
            "edit-players"
          )}
        </li>
        <li onClick={() => setCurrentSection("edit-results")}>
          {activeSection === "edit-results" ? (
            <b>Editar resultats</b>
          ) : (
            "edit-results"
          )}
        </li>
        <li onClick={() => setCurrentSection("user-view")}>
          {activeSection === "user-view" ? <b>vista usuari</b> : "user-view"}
        </li>
      </ul>
      {activeSection === "edit-tournament" ? <EditTournament /> : null}
      {activeSection === "edit-players" ? <EditPlayers /> : null}
      {activeSection === "edit-results" ? <EditResults /> : null}
      {activeSection === "user-view" ? <Home /> : null}
    </div>
  );
};
