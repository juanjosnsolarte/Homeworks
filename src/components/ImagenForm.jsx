import React, { useState } from 'react'

export default function ImageForm({ onAdd }) {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const numericId = Number(id)
    if (!title.trim()) {
      setError('El título es obligatorio.')
      return
    }
    if (!Number.isInteger(numericId) || numericId < 0) {
      setError('El ID debe ser un número entero ≥ 0.')
      return
    }

    onAdd({ id: numericId, title })
  }

  const handleClear = () => {
    setId('')
    setTitle('')
    setError('')
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Agregar imagen</h2>

      <div className="form-row">
        <label htmlFor="img-id">ID</label>
        <input
          id="img-id"
          type="number"
          placeholder="Ej: 10"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="img-title">Título</label>
        <input
          id="img-title"
          type="text"
          placeholder="Ej: Montaña"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="actions">
        <button type="submit">Agregar y refrescar</button>
        <button type="button" className="secondary" onClick={handleClear}>
          Limpiar
        </button>
      </div>    
    </form>
  )
}
