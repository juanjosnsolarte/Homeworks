function formatAmount(v) {
  try {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }).format(v);
  } catch {
    return v;
  }
}

function formatDate(t) {
  try {
    return new Intl.DateTimeFormat("es-CO", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(t));
  } catch {
    return "";
  }
}

export default function ATMQueueList({ people }) {
  if (!people?.length) return <p className="muted">La cola está vacía.</p>;

  return (
    <div className="stack">
      {people.map((p, i) => (
        <article key={(p.createdAt ?? i) + "-" + i} className="book">
          <header>
            <strong>{p.name}</strong>
            <span className="badge">{formatAmount(p.amount)}</span>
          </header>

          <p className="muted">
            Turno #{i + 1} • {formatDate(p.createdAt)}
          </p>
        </article>
      ))}
    </div>
  );
}
