import React, { useEffect, useState } from "react";

import { useTournament } from "../../hooks/useTournament/useTournament";
import { EditTournament } from "../../components/EditTournament/EditTournament";
import { EditPlayers } from "../../components/EditPlayers";
import "./Admin.css";
import { EditResults } from "../../components/EditResults";
import { Home } from "../../views/Home/Home";

export const Admin = () => {
  const { loading, tournament } = useTournament();
  const [activeSection, setActiveSection] = useState("edit-tournament");

  if (loading) return null;

  const setCurrentSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="admin-panel">
      <nav className="admin-nav">
        <button
          className={`admin-nav-button ${
            activeSection === "edit-tournament" ? "active" : ""
          }`}
          onClick={() => setCurrentSection("edit-tournament")}
        >
          Editar torneig
        </button>
        <button
          className={`admin-nav-button ${
            activeSection === "edit-players" ? "active" : ""
          }`}
          onClick={() => setCurrentSection("edit-players")}
        >
          Editar jugadors
        </button>
        <button
          className={`admin-nav-button ${
            activeSection === "edit-results" ? "active" : ""
          }`}
          onClick={() => setCurrentSection("edit-results")}
        >
          Editar resultats
        </button>
        <button
          className={`admin-nav-button ${
            activeSection === "user-view" ? "active" : ""
          }`}
          onClick={() => setCurrentSection("user-view")}
        >
          Vista usuari
        </button>
      </nav>

      <div className="admin-panel-content">
        {activeSection === "edit-tournament" && <EditTournament />}
        {activeSection === "edit-players" && <EditPlayers />}
        {activeSection === "edit-results" && <EditResults />}
        {activeSection === "user-view" && <Home />}
      </div>
    </div>
  );
};
