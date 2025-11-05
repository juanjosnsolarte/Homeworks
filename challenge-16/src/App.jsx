import { useMemo } from 'react';
import Graph3D from './components/Graph3D';
import CityResidents from './components/CityResidents';
import { buildSeedGraph } from './data/seed';
import './App.css';

export default function App() {
  const graph = useMemo(() => buildSeedGraph(), []);

  return (
    <main className="container">
      <header>
        <h1>Challenge 16</h1>
      </header>

      <Graph3D graph={graph} />
      <CityResidents graph={graph} />

    </main>
  );
}
