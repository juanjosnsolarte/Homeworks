import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../store/slices/counterSlice.js';

export default function Counter() {
  const value = useSelector(s => s.counter.value);
  const dispatch = useDispatch();

  const handleIncrementBy = () => {
    const r = window.prompt('¿Cuánto deseas incrementar?', '1'); // pedir en pantalla
    if (r === null) return;
    const n = Number(r);
    if (Number.isFinite(n)) dispatch(incrementByAmount(n));
  };

  return (
    <section className="card">
      <h2>Counter (Redux)</h2>
      <p className="muted">Valor actual: <strong>{value}</strong></p>
      <div className="actions">
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={handleIncrementBy}>Increment by</button>
      </div>
    </section>
  );
}
