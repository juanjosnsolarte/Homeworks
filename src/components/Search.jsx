import React, { useState } from 'react'


export default function Search({ defaultValue = '', onSearch }) {
const [q, setQ] = useState(defaultValue)


const handleSubmit = (e) => {
e.preventDefault()
onSearch(q)
}


const handleClear = () => {
setQ('')
onSearch('')
}


return (
<form className="card" onSubmit={handleSubmit}>
<h2>Buscar por título</h2>
<div className="search-row">
<input
id="q"
type="text"
placeholder="Escribe un título..."
value={q}
onChange={(e) => setQ(e.target.value)}
/>
<button type="submit" aria-label="Buscar" className="search-btn">🔍</button>
</div>
<div className="actions">
<button type="button" className="secondary" onClick={handleClear}>Quitar filtro</button>
</div>
</form>
)
}
