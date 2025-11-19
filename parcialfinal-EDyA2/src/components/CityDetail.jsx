import { useEffect, useState } from "react";
import GreenZoneTreeView from "./GreenZoneTreeView";

const CityDetail = ({
  cityName,
  network,
  onAddRootZone,
  onAddSubZone,
  onEditZone,
}) => {
  const [newRootName, setNewRootName] = useState("");
  const [selectedRootId, setSelectedRootId] = useState(null);

  const [subZoneName, setSubZoneName] = useState("");
  const [parentId, setParentId] = useState("");
  const [editZoneId, setEditZoneId] = useState("");
  const [editZoneName, setEditZoneName] = useState("");

  const roots = network.getCityRoots
    ? network.getCityRoots(cityName)
    : [];

  const stats = network.getStats(cityName);

  useEffect(() => {
    setSelectedRootId(null);
  }, [cityName]);

  const effectiveRootId =
    selectedRootId && roots.some((r) => r.id === selectedRootId)
      ? selectedRootId
      : roots[0]?.id ?? null;

  const selectedRoot =
    roots.find((r) => r.id === effectiveRootId) || null;

  const nodesInSelectedRoot = (() => {
    const list = [];
    const collect = (node) => {
      if (!node) return;
      list.push(node);
      (node.children || []).forEach(collect);
    };
    if (selectedRoot) collect(selectedRoot);
    return list;
  })();

  const allNodes = (() => {
    const list = [];
    const collect = (node) => {
      if (!node) return;
      list.push(node);
      (node.children || []).forEach(collect);
    };
    (roots || []).forEach((root) => collect(root));
    return list;
  })();

  const handleAddRoot = (e) => {
    e.preventDefault();
    if (!newRootName.trim()) return;
    onAddRootZone(cityName, newRootName);
    setNewRootName("");
  };

  const handleAddSub = (e) => {
    e.preventDefault();
    if (!subZoneName.trim() || !parentId) return;
    onAddSubZone(cityName, Number(parentId), subZoneName);
    setSubZoneName("");
    setParentId("");
  };

  const handleEditZoneSubmit = (e) => {
    e.preventDefault();
    if (!editZoneName.trim() || !editZoneId) return;
    onEditZone(cityName, Number(editZoneId), editZoneName);
    setEditZoneId("");
    setEditZoneName("");
  };

  return (
    <div className="city-detail">
      <div className="card header-card">
        <h3>{cityName}</h3>
        <div className="stats-row">
          <div className="stat">
            <span className="stat-label">Total zonas verdes</span>
            <span className="stat-value">{stats.totalZones}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Altura máxima</span>
            <span className="stat-value">{stats.height}</span>
          </div>
        </div>
      </div>

      <form className="card form" onSubmit={handleAddRoot}>
        <h4>Crear zona principal</h4>
        <input
          type="text"
          placeholder="Ej: Parque Central"
          value={newRootName}
          onChange={(e) => setNewRootName(e.target.value)}
        />
        <button type="submit">Agregar zona principal</button>
      </form>

      {roots && roots.length > 0 && (
        <>
          <div className="card">
            <h4>Estructura de zonas verdes</h4>

            <div className="zone-tabs">
              {roots.map((root) => (
                <button
                  key={root.id}
                  type="button"
                  className={
                    "zone-tab" +
                    (effectiveRootId === root.id
                      ? " zone-tab--active"
                      : "")
                  }
                  onClick={() => setSelectedRootId(root.id)}
                >
                  #{root.id} {root.name}
                </button>
              ))}
            </div>

            {selectedRoot ? (
              <div className="zone-tree-wrapper">
                <GreenZoneTreeView node={selectedRoot} />
              </div>
            ) : (
              <p className="empty-state">
                Selecciona una zona principal para ver su estructura.
              </p>
            )}
          </div>

          {selectedRoot && (
            <>
              <form className="card form" onSubmit={handleAddSub}>
                <h4>Agregar subzona</h4>
                <div className="form-row">
                  <select
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                  >
                    <option value="">Zona padre...</option>
                    {nodesInSelectedRoot.map((n) => (
                      <option key={n.id} value={n.id}>
                        #{n.id} - {n.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Nombre subzona"
                    value={subZoneName}
                    onChange={(e) => setSubZoneName(e.target.value)}
                  />
                </div>
                <button type="submit">Agregar subzona</button>
              </form>

              <form
                className="card form"
                onSubmit={handleEditZoneSubmit}
              >
                <h4>Editar zona existente</h4>
                <div className="form-row">
                  <select
                    value={editZoneId}
                    onChange={(e) => setEditZoneId(e.target.value)}
                  >
                    <option value="">Zona a editar...</option>
                    {allNodes.map((n) => (
                      <option key={n.id} value={n.id}>
                        #{n.id} - {n.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Nuevo nombre"
                    value={editZoneName}
                    onChange={(e) => setEditZoneName(e.target.value)}
                  />
                </div>
                <button type="submit">Guardar cambios</button>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CityDetail;
