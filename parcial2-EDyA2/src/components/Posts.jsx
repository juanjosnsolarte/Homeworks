import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { pushNotification } from '../store/slices/socialSlice'
import { publishPost } from '../store/thunks/thunks'
import useAllPosts from '../hooks/useAllPosts'

export default function Posts() {
  const dispatch = useDispatch()
  const { displayName, email } = useSelector(s => s.auth)
  const allPosts = useAllPosts() 
  const [text, setText] = useState('')

  const onAdd = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    const post = {
      id: crypto.randomUUID(),
      text,
      author: displayName || email,
      createdAt: Date.now(),
    }
    await dispatch(publishPost(post))
    dispatch(pushNotification({
      id: crypto.randomUUID(),
      text: 'Nuevo post publicado',
      createdAt: Date.now()
    }))
    setText('')
  }

  return (
    <div>
      <h2>Publicaciones</h2>
      <form onSubmit={onAdd} style={{ display:'flex', gap:8, marginBottom:12 }}>
        <input
          placeholder="¿Qué estás pensando?"
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />
        <button>Publicar</button>
      </form>

      <ul style={{ display:'grid', gap:8 }}>
        {allPosts.map(p => (
          <li key={p.id} style={{ padding:12, border:'1px solid #ddd', borderRadius:8 }}>
            <strong>{p.author}</strong>
            <p style={{ margin:'6px 0' }}>{p.text}</p>
            <small>{new Date(p.createdAt).toLocaleString()}</small>
          </li>
        ))}
        {allPosts.length === 0 && <small>Aún no hay publicaciones.</small>}
      </ul>
    </div>
  )
}
