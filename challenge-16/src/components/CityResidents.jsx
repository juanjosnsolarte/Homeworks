import { useMemo, useState } from 'react';

export default function CityResidents({ graph }) {
  const cities = useMemo(() => graph.cities(), [graph]);
  const [city, setCity] = useState(cities[0] ?? '');
  const residents = useMemo(() => graph.residents(city), [graph, city]);

  return (
    <section className="panel">
      <h3>Habitantes por ciudad</h3>
      <div className="row">
        <label>Ciudad</label>
        <select value={city} onChange={e => setCity(e.target.value)}>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <ul className="list">
        {residents.map(p => (
          <li key={p.name}>
            <b>{p.name}</b> — {p.age} años
          </li>
        ))}
        {residents.length === 0 && <li>No hay habitantes</li>}
      </ul>
    </section>
  );
}
