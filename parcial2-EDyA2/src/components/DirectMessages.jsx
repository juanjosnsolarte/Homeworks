import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { enqueueDM } from '../store/slices/socialSlice'
import { saveStateToCloud, sendNextDM } from '../store/thunks/thunks'
import useInbox from '../hooks/useInbox'

export default function DirectMessages() {
  const dispatch = useDispatch()
  const dmQueue = useSelector(s => s.social.dmQueue)
  const inbox = useInbox() 

  const [to, setTo] = useState('')
  const [text, setText] = useState('')

  const onEnqueue = async (e) => {
    e.preventDefault()
    if (!to.trim() || !text.trim()) return
    dispatch(enqueueDM({ id: crypto.randomUUID(), to, text, createdAt: Date.now() }))
    setTo(''); setText('')
    await dispatch(saveStateToCloud())
  }

  const onDequeueSend = async () => {
    if (dmQueue.length === 0) return
    await dispatch(sendNextDM())
  }

  return (
    <div>
      <h2>Mensajes Directos</h2>

      <form onSubmit={onEnqueue} style={{ display:'grid', gap:8, maxWidth:420 }}>
        <input placeholder="Para (email del usuario)" value={to} onChange={e=>setTo(e.target.value)} />
        <input placeholder="Mensaje" value={text} onChange={e=>setText(e.target.value)} />
        <button>Agregar a la cola</button>
      </form>

      <div style={{ marginTop:16, display:'grid', gap:12 }}>
        <section>
          <h3>Cola pendiente</h3>
          <button onClick={onDequeueSend} disabled={dmQueue.length===0}>Enviar</button>
          <ul style={{ display:'grid', gap:6, marginTop:8 }}>
            {dmQueue.map(dm => (
              <li key={dm.id} style={{ border:'1px solid #ddd', borderRadius:8, padding:10 }}>
                <strong>Para: {dm.to}</strong>
                <p style={{ margin:'6px 0' }}>{dm.text}</p>
                <small>{new Date(dm.createdAt).toLocaleString()}</small>
              </li>
            ))}
            {dmQueue.length===0 && <small>No hay mensajes en cola.</small>}
          </ul>
        </section>

        <section>
          <h3>Bandeja de entrada</h3>
          <ul style={{ display:'grid', gap:6, marginTop:8 }}>
            {inbox.map(m => (
              <li key={m.id} style={{ border:'1px solid #ddd', borderRadius:8, padding:10 }}>
                <strong>De: {m.fromEmail}</strong>
                <p style={{ margin:'6px 0' }}>{m.text}</p>
                <small>Entregado: {new Date(m.deliveredAt).toLocaleString()}</small>
              </li>
            ))}
            {inbox.length===0 && <small>No tienes mensajes aún.</small>}
          </ul>
        </section>
      </div>
    </div>
  )
}
