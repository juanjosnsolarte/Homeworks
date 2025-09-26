import { useEffect, useRef, useState } from "react";
import PersonForm from "./components/PersonForm";
import ATMQueueList from "./components/ATMQueueList";
import { Queue } from "./lib/Queue";
import "./index.css";

export default function App() {
  const queueRef = useRef(new Queue());
  const [snapshot, setSnapshot] = useState([]);
  const [front, setFront] = useState(null);
  const [size, setSize] = useState(0);
  const seeded = useRef(false);

  useEffect(() => {
    if (seeded.current) return;
    const mock = [
      { name: "Ana", amount: 180000, createdAt: Date.now() - 60000 },
      { name: "Carlos", amount: 250000, createdAt: Date.now() - 50000 },
      { name: "Luisa", amount: 120000, createdAt: Date.now() - 40000 },
    ];
    mock.forEach((p) => queueRef.current.enqueue(p));
    refresh();
    seeded.current = true;
  }, []);

  const refresh = () => {
    setSnapshot(queueRef.current.toArrayFrontFirst());
    setFront(queueRef.current.peek());
    setSize(queueRef.current.size());
  };

  const handleEnqueue = (person) => {
    queueRef.current.enqueue(person);
    refresh();
    return { ok: true };
  };

  const handleDequeue = () => {
    if (queueRef.current.isEmpty()) return;
    queueRef.current.dequeue();
    refresh();
  };

  const handlePeek = () => setFront(queueRef.current.peek());
  const handleClear = () => { queueRef.current.clear(); refresh(); };

  return (
    <main className="container">
      <header className="topbar">
        <h1>Cola del Cajero</h1>
        <div className="stats">
          <span>Tamaño: {size}</span>
          <span>¿Vacía?: {queueRef.current.isEmpty() ? "Sí" : "No"}</span>
        </div>
      </header>

      <section className="grid">
        <div>
          <PersonForm onEnqueue={handleEnqueue} />

          <div className="actions card">
            <button onClick={handlePeek} disabled={queueRef.current.isEmpty()}>
              Peek (ver frente)
            </button>
            <button onClick={handleDequeue} disabled={queueRef.current.isEmpty()}>
              Dequeue (atender frente)
            </button>
            <button onClick={handleClear} disabled={queueRef.current.isEmpty()}>
              Vaciar cola
            </button>
          </div>

          <div className="card">
            <h3>Frente actual (peek)</h3>
            {front ? (
              <div className="peek">
                <strong>{front.name}</strong>
                <span className="badge">
                  {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(front.amount)}
                </span>
              </div>
            ) : (
              <p className="muted">Sin frente (cola vacía).</p>
            )}
          </div>
        </div>

        <div>
          <h2>Cola (frente arriba)</h2>
          <ATMQueueList people={snapshot} />
        </div>
      </section>
    </main>
  );
}
