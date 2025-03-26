'use client'
import { motion } from "framer-motion";
import { useState } from "react";

const matches = [
  { id: 1, teams: ["Team A", "Team B"], winner: "Team A" },
  { id: 2, teams: ["Team C", "Team D"], winner: "Team C" },
  { id: 3, teams: ["Team A", "Team C"], winner: "Team A" },
];

const Match = ({ teams, winner }) => {
  return (
    <motion.div
      className="p-4 border rounded-lg shadow-lg bg-white text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>{teams[0]}</div>
      <div className="font-bold text-green-600">VS</div>
      <div>{teams[1]}</div>
      <div className="mt-2 text-sm text-gray-500">Winner: {winner}</div>
    </motion.div>
  );
};

const TournamentTree = ({ matches }) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      {matches.map((match) => (
        <Match key={match.id} teams={match.teams} winner={match.winner} />
      ))}
    </div>
  );
};

export default function TournamentPige() {
  const [showArrows, setShowArrows] = useState(false);

  const toggleArrows = () => {
    setShowArrows(!showArrows);
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 justify-top min-h-screen text-white p-4">
      <button
        onClick={toggleArrows}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        {showArrows ? "Hide Arrows" : "Show Arrows"}
      </button>
      <div className="flex flex-row justify-around items-center h-[50vh] w-[100vw] bg-cyan-400">
        <div className="flex flex-col items-center justify-around h-3/4 w-1/4 bg-red-400">
          <h1>Gruppe 1</h1>
          <div className="flex justify-center items-center h-1/6 w-full bg-emerald-400">
            Team 1
          </div>
          <div className="flex justify-center items-center h-1/6 w-full bg-emerald-400">
            Team 2
          </div>
          <div className="flex justify-center items-center h-1/6 w-full bg-emerald-400">
            Team 3
          </div>
          <div className="flex justify-center items-center h-1/6 w-full bg-emerald-400">
            Team 4
          </div>
        </div>
        <h1 className="text-5xl">Beerpong 2025</h1>
        <div className="flex flex-col items-center justify-around h-3/4 w-1/4 bg-red-400">
          <h1>Gruppe 2</h1>
          <div className="flex justify-center items-center h-1/6 w-full bg-emerald-400">
            Team 5
          </div>
          <div className="flex justify-center items-center h-1/6 w-full bg-emerald-400">
            Team 6
          </div>
          <div className="flex justify-center items-center h-1/6 w-full bg-emerald-400">
            Team 7
          </div>
          <div className="flex justify-center items-center h-1/6 w-full bg-emerald-400">
            Team 8
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-around items-center h-[50vh] w-[100vw] bg-blue-400">
        <div className="flex flex-col justify-around items-center h-3/4 w-1/4 bg-red-400">
          <h1 className="h-1/12 flex items-center justify-center bg-orange-200 w-full gap-4"> Viertel Finale </h1>
          <div className="flex flex-col justify-center items-center h-1/2 bg-orange-300 w-full gap-4">
            <div className="flex justify-center items-center h-2/6 bg-cyan-400 w-full">
              Team 1
            </div>
            <div className="flex justify-center items-center h-2/6 bg-cyan-400 w-full">
              Team 5
            </div>
          </div>
          <div className="flex flex-col justify-center items-center h-1/2 bg-orange-400 w-full gap-4">
            <div className="flex justify-center items-center h-2/6 bg-cyan-400 w-full">
              Team 2
            </div>
            <div className="flex justify-center items-center h-2/6 bg-cyan-400 w-full">
              Team 6
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-around items-center h-3/4 w-1/4 bg-red-400">
          <h1 className="h-1/12 flex items-center justify-center bg-orange-200 w-full gap-4"> Halb Finale </h1>
          <div className="flex flex-col justify-around items-center h-11/12 w-full bg-orange-300">
            <div className="flex justify-center items-center h-1/6 w-full bg-emerald-400">
              Team 1
            </div>
            <div className="flex justify-center items-center h-1/6 w-full bg-emerald-400">
              Team 6
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center h-3/4 w-1/4 bg-red-400">
          <h1 className="h-1/12 flex items-center justify-center bg-orange-200 w-full gap-4"> Finale </h1>
          <div className="flex flex-col justify-around items-center h-11/12 w-full bg-orange-300">
            <div className="flex justify-center items-center h-1/6 w-full bg-green-400">
              Team 1
            </div>
          </div>
        </div>
      </div>
      {showArrows && (
        <div className="arrows">
          {/* Hier können Sie Ihre Pfeile hinzufügen */}
          <div className="arrow" style={{ position: 'absolute', top: '100px', left: '200px', width: '100px', height: '2px', background: 'black' }}></div>
          {/* Weitere Pfeile */}
        </div>
      )}
    </div>
  );
}