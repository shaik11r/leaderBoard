import React, { useState } from "react";
import { easeIn, motion } from "framer-motion";
import { Link } from "react-router-dom";
const TeamBoard = () => {
  const [teamA, setTeamA] = useState(parseInt(localStorage.getItem("teamA")) || 0);
  const [teamB, setTeamB] = useState(parseInt(localStorage.getItem("teamB")) || 0);

  const handleClickA = () => {
    const newTeamAScore = teamA + 1;
    setTeamA(newTeamAScore);
    localStorage.setItem("teamA", newTeamAScore);
    console.log(teamA);
  };
  const handleClickB = () => {
    const newTeamBScore = teamB + 1;
    setTeamB(newTeamBScore);
    localStorage.setItem("teamB", newTeamBScore);
    console.log(teamB);
  };
  const handleCleanup = () => {
    setTeamA(0);
    setTeamB(0);
    localStorage.setItem("teamA", 0);
    localStorage.setItem("teamB", 0);
  };
  return (
    <motion.div
      initial={{ y: 20, opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}>
      <div className=" m-11 font-mono text-center">
        <h1 className="text-2xl p-3 mb-3">Team ScoreBoard💯</h1>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="my-10 rounded border border-red-500 p-2 mx-3 text-xl">
            Back🔙
          </motion.button>
        </Link>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ ease: "easeOut", duration: 0.2 }}
          className="my-10 rounded border border-red-500 p-2 text-xl"
          onClick={handleCleanup}>
          CleanStats🧹
        </motion.button>
      </div>
      <div className="grid place-items-center grid-cols-2 font-mono ">
        <div className="m-3">
          <h1 className="text-xl mb-3 text-red-600">Team 1</h1>
          <p>
            You belong to team 1 if your name starts with:
            <br />
            <p className="text-xl">A, C, E, G, I, K, M, O, Q, S, U, W, Y</p>
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="my-5 border border-purple-600 p-3 rounded text-xl"
            onClick={handleClickA}>
            {`Score-${teamA} 🛺`}
          </motion.button>
        </div>
        <div className="m-3">
          <h1 className="text-xl mb-3 text-blue-600">Team 2</h1>
          <p>
            You belong to team 2 if your name starts with: <br />
            <p className="text-xl"> B, D, F, H, J, L, N, P, R, T, V, X, Z</p>
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="my-5 border border-green-600 p-3 rounded text-xl"
            onClick={handleClickB}>
            {`Score-${teamB} 🚗`}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamBoard;
