import { useState } from "react";

const CityForm = ({ onAddCity }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCity(name);
    setName("");
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <label>Nombre de ciudad</label>
      <input
        type="text"
        placeholder="Ej: Cali"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Agregar ciudad</button>
    </form>
  );
};

export default CityForm;
