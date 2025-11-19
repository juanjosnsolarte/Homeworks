import { useState } from "react";
import { CityNetwork } from "./structures/CityNetwork";
import CityForm from "./components/CityForm";
import CityList from "./components/CityList";
import CityDetail from "./components/CityDetail";
import GraphView from "./components/GraphView";

const App = () => {
  const [network] = useState(() => new CityNetwork());

  const [version, setVersion] = useState(0);
  const [selectedCity, setSelectedCity] = useState(null);

  const forceUpdate = () => setVersion((v) => v + 1);

  const handleAddCity = (name) => {
    network.addCity(name);
    forceUpdate();
  };

  const handleDeleteCity = (name) => {
    network.deleteCity(name);
    if (selectedCity === name) {
      setSelectedCity(null);
    }
    forceUpdate();
  };

  const handleSelectCity = (name) => {
    setSelectedCity(name);
  };

  const handleConnectCities = (from, to) => {
    if (!from || !to) {
      alert("Debes seleccionar las dos ciudades para crear la conexión.");
      return;
    }

    if (from === to) {
      alert("No se puede conectar una ciudad consigo misma.");
      return;
    }

    const fromAdj = network.adjacency[from];
    if (fromAdj && fromAdj.has(to)) {
      alert("No se pudo realizar la conexión porque ya existe.");
      return;
    }

    network.connectCities(from, to);
    forceUpdate();
  };

  const handleAddRootZone = (cityName, zoneName) => {
    network.addRootZone(cityName, zoneName);
    forceUpdate();
  };

  const handleAddSubZone = (cityName, parentId, zoneName) => {
    network.addSubZone(cityName, parentId, zoneName);
    forceUpdate();
  };

  const handleEditZone = (cityName, zoneId, newName) => {
    network.editZone(cityName, zoneId, newName);
    forceUpdate();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Red de Ciudades y Zonas Verdes</h1>
      </header>

      <main className="main-layout">
        <section className="panel panel-left">
          <h2>Ciudades</h2>
          <CityForm onAddCity={handleAddCity} />

          <CityList
            key={version} 
            cities={network.cities}
            adjacency={network.adjacency}
            selectedCity={selectedCity}
            onSelectCity={handleSelectCity}
            onDeleteCity={handleDeleteCity}
            onConnectCities={handleConnectCities}
          />
        </section>

        <section className="panel panel-right">
          <h2>Detalle de Ciudad</h2>
          {selectedCity ? (
            <CityDetail
              key={selectedCity} 
              cityName={selectedCity}
              network={network}
              onAddRootZone={handleAddRootZone}
              onAddSubZone={handleAddSubZone}
              onEditZone={handleEditZone}
            />
          ) : (
            <p className="empty-state">
              Selecciona una ciudad para administrar sus zonas verdes.
            </p>
          )}
        </section>
      </main>

      <section className="graph-section">
        <GraphView network={network} />
      </section>
    </div>
  );
};

export default App;
