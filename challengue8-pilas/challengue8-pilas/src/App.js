import { useEffect, useRef, useState } from "react";
import BookForm from "./components/BookForm";
import BookStackList from "./components/BookStackList";
import { Stack } from "./lib/Stack.js";
import "./index.css";

export default function App() {
  const stackRef = useRef(new Stack());
  const [snapshot, setSnapshot] = useState([]);
  const [top, setTop] = useState(null);
  const [size, setSize] = useState(0);
  const seeded = useRef(false); 

  useEffect(() => {
    if (seeded.current) return;
    const mock = [
      {
        name: "Clean Code",
        isbn: "9780132350884",
        author: "Robert C. Martin",
        editorial: "Prentice Hall",
      },
      {
        name: "The Pragmatic Programmer",
        isbn: "9780201616224",
        author: "Andrew Hunt, David Thomas",
        editorial: "Addison-Wesley",
      },
      {
        name: "Refactoring",
        isbn: "9780201485677",
        author: "Martin Fowler",
        editorial: "Addison-Wesley",
      },
    ];
    mock.forEach(b => stackRef.current.push(b));
    refresh();
    seeded.current = true;
  }, []);

  const refresh = () => {
    setSnapshot(stackRef.current.toArrayTopFirst());
    setTop(stackRef.current.peek());
    setSize(stackRef.current.size());
  };

  const handleAdd = (book) => {
    if (stackRef.current.existsByISBN(book.isbn)) {
      return { ok: false, error: "Ya existe un libro con ese ISBN." };
    }
    stackRef.current.push(book);
    refresh();
    return { ok: true };
  };

  const handlePop = () => {
    if (stackRef.current.isEmpty()) return;
    stackRef.current.pop();
    refresh();
  };

  const handlePeek = () => {
    setTop(stackRef.current.peek());
  };

  const handleClear = () => {
    stackRef.current.clear();
    refresh();
  };

  return (
    <main className="container">
      <header className="topbar">
        <h1>Stack de Libros</h1>
        <div className="stats">
          <span>Tamaño: {size}</span>
          <span>¿Vacía?: {stackRef.current.isEmpty() ? "Sí" : "No"}</span>
        </div>
      </header>

      <section className="grid">
        <div>
          <BookForm onAdd={handleAdd} />

          <div className="actions card">
            <button onClick={handlePeek} disabled={stackRef.current.isEmpty()}>
              Peek (ver tope)
            </button>
            <button onClick={handlePop} disabled={stackRef.current.isEmpty()}>
              Pop (sacar tope)
            </button>
            <button onClick={handleClear} disabled={stackRef.current.isEmpty()}>
              Vaciar pila
            </button>
          </div>

          <div className="card">
            <h3>Tope actual (peek)</h3>
            {top ? (
              <div className="peek">
                <strong>{top.name}</strong>
                <span className="badge">ISBN: {top.isbn}</span>
                <div className="peek-meta">
                  <span>{top.author}</span> · <span>{top.editorial}</span>
                </div>
              </div>
            ) : (
              <p className="muted">Sin tope (pila vacía).</p>
            )}
          </div>
        </div>

        <div>
          <h2>Pila (tope arriba)</h2>
          <BookStackList books={snapshot} />
        </div>
      </section>
    </main>
  );
}
