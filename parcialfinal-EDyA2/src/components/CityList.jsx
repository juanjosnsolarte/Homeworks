import { useState } from "react";

const CityList = ({
  cities,
  adjacency,
  selectedCity,
  onSelectCity,
  onDeleteCity,
  onConnectCities,
}) => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");

  const handleConnect = (e) => {
    e.preventDefault();
    if (!fromCity || !toCity) return;
    onConnectCities(fromCity, toCity);
    setFromCity("");
    setToCity("");
  };

  return (
    <>
      <div className="card">
        {cities.length === 0 ? (
          <p className="empty-state">No hay ciudades en la red.</p>
        ) : (
          <ul className="city-list">
            {cities.map((name) => (
              <li key={name} className="city-item">
                <button
                  className={
                    "city-name-btn" +
                    (selectedCity === name ? " city-name-btn--active" : "")
                  }
                  onClick={() => onSelectCity(name)}
                >
                  {name}
                </button>
                <button
                  className="danger-btn"
                  onClick={() => onDeleteCity(name)}
                >
                  Eliminar
                </button>
                <div className="city-neighbors">
                  <span>Conectada con: </span>
                  {adjacency[name] && adjacency[name].size > 0 ? (
                    <span>
                      {Array.from(adjacency[name]).join(", ")}
                    </span>
                  ) : (
                    <span>—</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cities.length >= 2 && (
        <form className="card form" onSubmit={handleConnect}>
          <h3>Conectar ciudades</h3>
          <div className="form-row">
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              <option value="">Desde...</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
            >
              <option value="">Hasta...</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Agregar conexión</button>
        </form>
      )}
    </>
  );
};

export default CityList;
