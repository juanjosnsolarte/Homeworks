import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startRegister } from '../store/thunks/thunks'
import { Navigate, Link } from 'react-router-dom'

export default function Register() {
  const dispatch = useDispatch()
  const { status } = useSelector(s => s.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  if (status === 'authenticated') return <Navigate to="/app/posts" replace />

  const onSubmit = async (e) => {
    e.preventDefault()
    await dispatch(startRegister({ email, password, displayName }))
  }

  return (
    <form onSubmit={onSubmit} style={{ display:'grid', gap:8, maxWidth:320, margin:'24px auto' }}>
      <h2>Registro</h2>
      <input placeholder="nombre" value={displayName} onChange={e=>setDisplayName(e.target.value)} />
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Crear cuenta</button>
      <small>¿Ya tienes cuenta? <Link to="/login">Ingresar</Link></small>
    </form>
  )
}
