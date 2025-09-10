import React, { useEffect, useMemo } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import ImageForm from './components/ImagenForm.jsx'
import Search from './components/Search.jsx'
import ImageCard from './components/ImagenCard.jsx'
import './App.css';


export default function App() {
const [images, setImages] = useLocalStorage('images', [])
const [search, setSearch] = useLocalStorage('search', '')


const filtered = useMemo(() => {
const q = (search || '').toLowerCase()
return images.filter(img => img.title.toLowerCase().includes(q))
}, [images, search])


useEffect(() => {
if (!localStorage.getItem('__parcial_help_shown')) {
console.log('Tip: agrega imágenes con IDs válidos de picsum (p. ej., 10, 100, 237).')
localStorage.setItem('__parcial_help_shown', '1')
}
}, [])


const handleAddImage = ({ id, title }) => {
const numericId = Number(id)
const newImage = {
id: numericId,
title: title.trim(),
url: `https://picsum.photos/id/${numericId}/200/300`,
}
setImages([...images, newImage])
window.location.reload()
}


const handleSearch = (query) => {
setSearch(query)
window.location.reload()
}


return (
<div className="container">
<header className="header">
<h1>Galería de Imágenes</h1>
</header>


<section className="controls">
<ImageForm onAdd={handleAddImage} />
<Search defaultValue={search} onSearch={handleSearch} />
</section>


<section className="grid">
{filtered.length === 0 ? (
<p className="empty">No hay imágenes para mostrar. ¡Agrega una con el formulario o ajusta la búsqueda!</p>
) : (
filtered.map((img) => (
<ImageCard key={`${img.id}-${img.title}`} image={img} />
))
)}
</section>

</div>
)
}