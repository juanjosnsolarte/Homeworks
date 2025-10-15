import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../store/thunks/thunks'

const styles = {
  bar: { display:'flex', gap:16, alignItems:'center', padding:'12px 16px', borderBottom:'1px solid #eee' },
  spacer: { flex:1 },
  badge: { background:'#111', color:'#fff', borderRadius:12, padding:'2px 8px', fontSize:12 }
}

export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { status, email } = useSelector(s => s.auth)
  const notificationsCount = useSelector(s => s.social.notifications.length)

  const onLogout = async () => {
    await dispatch(startLogout())
    navigate('/login')
  }

  return (
    <header style={styles.bar}>
      <strong>UAO Social</strong>
      <Link to="/app/posts">Publicaciones</Link>
      <Link to="/app/notifications">
        Notificaciones <span style={styles.badge}>{notificationsCount}</span>
      </Link>
      <Link to="/app/dm">Mensajes Directos</Link>
      <div style={styles.spacer} />
      {status === 'authenticated'
        ? (<>
            <span>{email}</span>
            <button onClick={onLogout}>Salir</button>
          </>)
        : (<>
            <Link to="/login">Ingresar</Link>
            <Link to="/register">Registro</Link>
          </>)
      }
    </header>
  )
}
