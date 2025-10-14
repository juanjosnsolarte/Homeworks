import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startListeningMessages } from '../../store/thunks/realtimeThunks';

export default function ChatMe() {
  const dispatch = useDispatch();
  const { messages } = useSelector((s)=>s.realtime);
  const [text, setText] = useState('');

  useEffect(() => {
    const stop = dispatch(startListeningMessages());
    return () => { if (typeof stop === 'function') stop(); };
  }, [dispatch]);

  const onSend = (e) => {
    e.preventDefault();
    dispatch(sendMessage(text));
    setText('');
  };

  return (
    <div className="card chat">
      <h2>Chat en tiempo real</h2>

      <div className="chat-box">
        {messages.map(m => (
          <div key={m.id} className={`bubble ${m.uid==='me' ? 'me' : ''}`}>
            <b>me:</b> {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={onSend} className="row">
        <input className="input" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Escribe..."/>
        <button className="btn primary btn-sm">Enviar</button>
      </form>
    </div>
  );
}
