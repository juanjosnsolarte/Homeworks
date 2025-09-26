import { useState } from "react";

const nowLocal = () => {
  const d = new Date();
  d.setSeconds(0, 0);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const initial = { name: "", amount: "", datetime: nowLocal() };

export default function PersonForm({ onEnqueue }) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const name = form.name.trim();
    const amount = Number(form.amount);
    if (!name || !form.amount.toString().trim()) return "Todos los campos son obligatorios.";
    if (!Number.isFinite(amount) || amount <= 0) return "El monto debe ser un número positivo.";
    if (amount > 10_000_000) return "Monto máximo permitido: 10.000.000.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);

    const createdAt = form.datetime ? new Date(form.datetime).getTime() : Date.now();

    const result = onEnqueue?.({
      name: form.name.trim(),
      amount: Number(form.amount),
      createdAt, 
    });

    if (result?.ok) {
      setError("");
      setForm(initial);
    } else if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Nueva Persona</h2>

      <div className="field">
        <label>Nombre</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Juan Pérez"
        />
      </div>

      <div className="field">
        <label>Monto a retirar</label>
        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="200000"
          inputMode="numeric"
        />
      </div>

      {error && <p className="error">{error}</p>}
      <button type="submit">Encolar (enqueue)</button>
    </form>
  );
}
