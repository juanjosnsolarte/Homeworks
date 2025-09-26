import { useState } from "react";

const initialForm = { name: "", isbn: "", author: "", editorial: "" };

export default function BookForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { name, isbn, author, editorial } = form;
    if (!name.trim() || !isbn.trim() || !author.trim() || !editorial.trim()) {
      return "Todos los campos son obligatorios.";
    }
    // Valida longitud mínima ISBN (simple, sin meternos en formatos específicos)
    if (isbn.trim().length < 6) return "ISBN demasiado corto.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    const result = onAdd?.({
      name: form.name.trim(),
      isbn: form.isbn.trim(),
      author: form.author.trim(),
      editorial: form.editorial.trim(),
    });

    if (result?.ok) {
      setError("");
      setForm(initialForm);
    } else if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Nuevo Libro</h2>

      <div className="field">
        <label>Nombre</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Clean Code"
        />
      </div>

      <div className="field">
        <label>ISBN</label>
        <input
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="9780132350884"
        />
      </div>

      <div className="field">
        <label>Autor</label>
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Robert C. Martin"
        />
      </div>

      <div className="field">
        <label>Editorial</label>
        <input
          name="editorial"
          value={form.editorial}
          onChange={handleChange}
          placeholder="Prentice Hall"
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit">Agregar a la pila (push)</button>
    </form>
  );
}
