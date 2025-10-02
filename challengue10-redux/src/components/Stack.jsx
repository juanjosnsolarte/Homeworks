import { useDispatch, useSelector } from 'react-redux';
import { push, pop, clear } from '../store/slices/stackSlice.js';
import { useState } from 'react';

export default function Stack() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.stack.items); // base → ... → tope
  const top = items.length ? items[items.length-1] : null;
  const [value, setValue] = useState('');

  const handlePush = (e) => {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    dispatch(push({ value: v, createdAt: Date.now() }));
    setValue('');
  };

  // Mostrar base arriba (1, 2, 3...)
  const list = items;

  return (
    <section className="card">
      <h2>Stack (Redux)</h2>

      <form onSubmit={handlePush} className="field">
        <label>Nuevo elemento</label>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="ej: Elemento X"
        />
        <div className="actions">
          <button type="submit">Push</button>
          <button type="button" onClick={() => dispatch(pop())} disabled={!items.length}>
            Pop
          </button>
          <button type="button" onClick={() => dispatch(clear())} disabled={!items.length}>
            Clear
          </button>
        </div>
      </form>

      <div className="card" style={{ marginTop: 12 }}>
        <h3>Peek (tope)</h3>
        {top ? (
          <p className="muted">
            <strong>{top.value}</strong>
          </p>
        ) : (
          <p className="muted">Sin tope.</p>
        )}
      </div>

      <h3 style={{ marginTop: 16 }}>Pila (tope arriba)</h3>
      <div className="stack">
        {list.length === 0 ? (
          <p className="muted">La pila está vacía.</p>
        ) : (
          list.map((el, i) => (
            <article key={(el.createdAt ?? i) + '-' + i} className="book">
              <header>
                <strong>{el.value}</strong>
                <span className="badge">#{i + 1}</span>
              </header>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
