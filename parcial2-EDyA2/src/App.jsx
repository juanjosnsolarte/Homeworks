import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Posts from './components/Posts'
import Notifications from './components/Notifications'
import DirectMessages from './components/DirectMessages'
import PrivateRoute from './router/PrivateRoute'
import useAuthInit from './hooks/useAuthInit'

export default function App() {
  const { checking } = useAuthInit()

  if (checking) {
    return <p style={{ padding: 24 }}>Cargando sesión...</p>
  }

  return (
    <>
      <Header />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/app/posts" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route path="/app/posts" element={<Posts />} />
            <Route path="/app/notifications" element={<Notifications />} />
            <Route path="/app/dm" element={<DirectMessages />} />
          </Route>

          <Route path="*" element={<p>404</p>} />
        </Routes>
      </div>
    </>
  )
}
