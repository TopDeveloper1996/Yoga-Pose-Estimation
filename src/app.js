import logo from "./logo.svg";
import "./app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MentorPage from "./pages/mentorPage";
import LearnerPage from "./pages/learnerPage";
import StatisticsPage from "./pages/statisticsPage";
import HomePage from "./pages/homePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/learner" element={<LearnerPage />} />
        <Route path="/statistic" element={<StatisticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
