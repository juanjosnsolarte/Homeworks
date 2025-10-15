import { useDispatch, useSelector } from 'react-redux'
import { popNotification } from '../store/slices/socialSlice'
import { saveStateToCloud } from '../store/thunks/thunks'

export default function Notifications() {
  const dispatch = useDispatch()
  const notifications = useSelector(s => s.social.notifications)

  const onPop = async () => {
    if (notifications.length === 0) return
    dispatch(popNotification())
    await dispatch(saveStateToCloud())
  }

  return (
    <div>
      <h2>Notificaciones</h2>
      <p>Tope: última notificación creada.</p>
      <button onClick={onPop} disabled={notifications.length === 0}>Quitar tope</button>

      <ol reversed style={{ display:'grid', gap:8, marginTop:12 }}>
        {notifications.map(n => (
          <li key={n.id} style={{ padding:10, border:'1px solid #ddd', borderRadius:8 }}>
            <div>{n.text}</div>
            <small>{new Date(n.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ol>
    </div>
  )
}
