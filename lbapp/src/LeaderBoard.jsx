import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
function LeaderBoard() {
  const [name, setName] = useState("");
  const [points, setPoints] = useState(null);
  const [todayLeaderBoard, setTodayLeaderBoard] = useState(
    JSON.parse(localStorage.getItem("todayLeaderBoard")) || []
  );
  const [leaderBoard, setLeaderBoard] = useState(
    JSON.parse(localStorage.getItem("allTimeLeaderBoard")) || []
  );
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("today");
  const [isEdit, setisEdit] = useState(null);

  useEffect(() => {
    const sortLeaderBoardxy = JSON.parse(localStorage.getItem("todayLeaderBoard"));
    setTodayLeaderBoard(sortLeaderBoardxy ? sortLeaderBoard(todayLeaderBoard) : []);
    const sortLeaderBoardxyz = JSON.parse(localStorage.getItem("allTimeLeaderBoard"));
    setLeaderBoard(sortLeaderBoardxyz ? sortLeaderBoard(leaderBoard) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("todayLeaderBoard", JSON.stringify(todayLeaderBoard));
    localStorage.setItem("allTimeLeaderBoard", JSON.stringify(leaderBoard));
  }, [todayLeaderBoard, leaderBoard]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const existingTodayEntry = todayLeaderBoard.find((entry) => entry.name === name);
      if (existingTodayEntry) {
        const updateTodayLeaderBoard = todayLeaderBoard.map((entry) =>
          entry.name === name ? { ...entry, points: entry.points + parseInt(points) } : entry
        );
        const sortLeaderBoardx = sortLeaderBoard(updateTodayLeaderBoard);
        setTodayLeaderBoard(sortLeaderBoardx, () => {
          localStorage.setItem("todayLeaderBoard", JSON.stringify(todayLeaderBoard));
        });
      } else {
        setTodayLeaderBoard((prev) =>
          sortLeaderBoard([...prev, { name: name, points: parseInt(points) }])
        );
        localStorage.setItem("todayLeaderBoard", JSON.stringify(todayLeaderBoard));
      }

      const existingalltime = leaderBoard.find((entry) => entry.name === name);
      if (existingalltime) {
        const updateLeaderBoard = leaderBoard.map((entry) =>
          entry.name === name ? { ...entry, points: entry.points + parseInt(points) } : entry
        );
        const sortLeaderBoardall = sortLeaderBoard(updateLeaderBoard);
        setLeaderBoard(sortLeaderBoardall, () => {
          localStorage.setItem("allTimeLeaderBoard", JSON.stringify(leaderBoard));
        });
      } else {
        setLeaderBoard((prev) =>
          sortLeaderBoard([...prev, { name: name, points: parseInt(points) }])
        );
        localStorage.setItem("allTimeLeaderBoard", JSON.stringify(leaderBoard));
      }
      setPoints(null);
      setName("");
    }
  };
  const handleEdit = (entry) => {
    setName(entry.name);
    setPoints(entry.points);
    setisEdit(entry);
  };

  const clearStatsfun = () => {
    localStorage.removeItem("todayLeaderBoard");
    setName("");
    setPoints("");
    setTodayLeaderBoard([]);
  };
  const clearStatsfunAllTime = () => {
    localStorage.removeItem("allTimeLeaderBoard");
    setLeaderBoard([]);
  };
  const sortLeaderBoard = (lb) => {
    return lb.sort((a, b) => b.points - a.points);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name) {
      errors.name = "name is required";
      isValid = false;
    }
    if (points == 0) {
      errors.points = "points cant be zero";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const container = {
    hidden: { opacity: 1, scale: 0, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.3,
      },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
      }}>
      <div className="m-11 font-mono text-center">
        <h1 className="text-2xl p-3 mb-3">LeaderBoard🎯</h1>
        <div className="text-xl">
          <motion.button
            whileTap={{ scale: 0.9, rotate: 20 }}
            className={`m-2 ${activeTab === "today" ? "border border-purple-700 p-1 rounded" : ""}`}
            onClick={() => setActiveTab("today")}>
            Today
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9, rotate: -20 }}
            onClick={() => setActiveTab("all-time")}
            className={`m-2 ${
              activeTab === "today" ? "" : "border border-purple-700 p-1 rounded"
            }`}>
            AllTime
          </motion.button>
          <Link to="/team">TeamScoreBoard</Link>
        </div>
        <form onSubmit={handleSubmit} className="mb-5 forsmallScreens ">
          <input
            type="text"
            placeholder="enter name"
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase())}
            className="m-3 w-[200px] bg-black p-2"
            required
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          <input
            type="number"
            placeholder="enter points"
            value={points}
            min={0}
            max={100}
            onChange={(e) => setPoints(e.target.value)}
            className="m-3 w-[200px] bg-black p-2"
            required
          />
          {errors.points && <p className="text-red-500 text-xs italic">{errors.points}</p>}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="smallscreen border border-purple-700 rounded-lg p-2">
            Submit
          </motion.button>
        </form>
        {activeTab === "today" ? (
          <AnimatePresence>
            <motion.ul
              className="grid place-items-center"
              variants={container}
              initial="hidden"
              animate="visible">
              {todayLeaderBoard?.map((entry, index) => (
                <motion.li
                  key={`${entry.name}-${entry.points}`}
                  className={`flex sms justify-between items-center w-[60%] border rounded border-purple-500 mb-3 p-4 item
           ${
             index === 0
               ? "bg-yellow-400 text-xl text-black"
               : index === 1
               ? "bg-green-700"
               : index === 2
               ? "bg-orange-700"
               : ""
           }`}
                  variants={item}>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 0.4 }}>
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : ""}
                    {entry.name}
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 0.4 }}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ ease: "easeOut", duration: 0.2 }}
                      className="smallscreen border border-purple-700 rounded-lg px-1 py-1 mr-5"
                      onClick={() => handleEdit(entry)}>
                      Edit
                    </motion.button>
                    {entry.points}
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
            <button className="mt-5 border border-red-500 rounded-lg p-2" onClick={clearStatsfun}>
              clearStats🧹
            </button>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <motion.ul
              className="grid place-items-center"
              variants={container}
              initial="hidden"
              animate="visible">
              {leaderBoard?.map((entry, index) => (
                <motion.li
                  key={`${entry.name}-${entry.points}`}
                  className={`flex sms justify-between w-[60%] border rounded border-purple-500 mb-3 p-4 item
           ${
             index === 0
               ? "bg-yellow-400 text-xl text-black"
               : index === 1
               ? "bg-green-700"
               : index === 2
               ? "bg-orange-700"
               : ""
           }`}
                  variants={item}>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 0.4 }}>
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : ""}
                    {entry.name}
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 0.4 }}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ ease: "easeOut", duration: 0.2 }}
                      className="smallscreen border border-purple-700 rounded-lg px-1 py-1 mr-5"
                      onClick={() => handleEdit(entry)}>
                      Edit
                    </motion.button>
                    {entry.points}
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
            <button
              className="mt-5 border border-red-500 rounded-lg p-2"
              onClick={clearStatsfunAllTime}>
              clearStats🧹
            </button>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}

export default LeaderBoard;
