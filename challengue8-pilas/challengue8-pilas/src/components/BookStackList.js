export default function BookStackList({ books }) {
  if (!books?.length) {
    return <p className="muted">La pila está vacía.</p>;
  }

  return (
    <div className="stack">
      {books.map((b, idx) => (
        <article key={b.isbn + "-" + idx} className="book">
          <header>
            <strong>{b.name}</strong>
            <span className="badge">ISBN: {b.isbn}</span>
          </header>
          <p>
            <span className="tag">Autor:</span> {b.author}
          </p>
          <p>
            <span className="tag">Editorial:</span> {b.editorial}
          </p>
        </article>
      ))}
    </div>
  );
}
