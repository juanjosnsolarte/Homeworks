import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCollection } from '../../hooks/useCollection';
import { addItem, updateItem, deleteItem } from '../../store/thunks/firestoreThunks';

export default function Crud() {
  const dispatch = useDispatch();
  const { items, loading, error } = useCollection();
  const [text, setText] = useState('');

  const onAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addItem({ text, createdAt: Date.now() }));
    setText('');
  };

  return (
    <div className="crud">
      <h2>Base de Datos - Firebase</h2>
      <form onSubmit={onAdd}>
        <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="nuevo ítem"/>
        <button>Agregar</button>
      </form>

      {loading && <p>Cargando…</p>}
      {error && <p style={{color:'crimson'}}>{error}</p>}

      <ul>
        {items.map(it => (
          <li key={it.id}>
            <input
              defaultValue={it.text}
              onBlur={(e)=>dispatch(updateItem(it.id, { text: e.target.value }))}
            />
            <button onClick={()=>dispatch(deleteItem(it.id))}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
