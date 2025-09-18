import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SongListPage from './pages/SongListPage';
import HistoryPage from './pages/HistoryPage';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Playlist</Link></li>
          <li><Link to="/history">Historial</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<SongListPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;