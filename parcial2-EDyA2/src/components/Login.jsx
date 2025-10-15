import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogin } from '../store/thunks/thunks'
import { Navigate, Link } from 'react-router-dom'

export default function Login() {
  const dispatch = useDispatch()
  const { status } = useSelector(s => s.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (status === 'authenticated') return <Navigate to="/app/posts" replace />

  const onSubmit = async (e) => {
    e.preventDefault()
    await dispatch(startLogin({ email, password }))
  }

  return (
    <form onSubmit={onSubmit} style={{ display:'grid', gap:8, maxWidth:320, margin:'24px auto' }}>
      <h2>Ingresar</h2>
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Entrar</button>
      <small>¿No tienes cuenta? <Link to="/register">Regístrate</Link></small>
    </form>
  )
}
