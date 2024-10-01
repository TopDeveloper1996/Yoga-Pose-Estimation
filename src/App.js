import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MentorPage from './page/mentorPage';
import LearnerPage from './page/learnerPage';
import StatisticsPage from './page/statisticsPage';
import HomePage from './page/homePage';


function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/mentor' element={<MentorPage />} />
          <Route path='/learner' element={<LearnerPage />} />
          <Route path='/statistic' element={<StatisticsPage />} />
        </Routes>
      </Router>
  );
}

export default App;
