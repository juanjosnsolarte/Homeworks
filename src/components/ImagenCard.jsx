import React from 'react'


export default function ImageCard({ image }) {
const { id, title, url } = image
return (
<article className="img-card">
<img src={url} alt={title} loading="lazy" />
<div className="img-body">
<h3 title={title}>{title}</h3>
<p className="muted">ID: {id}</p>
<a className="link" href={`https://picsum.photos/id/${id}`} target="_blank" rel="noreferrer">
Ver fuente
</a>
</div>
</article>
)
}
