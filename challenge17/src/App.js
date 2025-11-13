import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SongListPage from './pages/SongListPage';
import HistoryPage from './pages/HistoryPage';

import styles from './styles/modules/App.module.scss';
import nav from './styles/modules/Nav.module.scss';
import './styles/globals.scss';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <Router>
      <nav className={nav.nav}>
        <ul>
          <li><Link to="/">Playlist</Link></li>
          <li><Link to="/history">Historial</Link></li>
          <li>
            <button onClick={toggleTheme} className={nav.themeBtn}>
              {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
            </button>
          </li>
        </ul>
      </nav>

      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<SongListPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
