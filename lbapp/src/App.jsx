import { Route, Routes } from "react-router-dom";
import LeaderBoard from "./LeaderBoard";
import TeamBoard from "./TeamBoard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LeaderBoard />}></Route>
        <Route path="/team" element={<TeamBoard />}></Route>
      </Routes>
    </>
  );
}
export default App;
