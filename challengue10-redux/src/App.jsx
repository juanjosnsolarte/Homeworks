import Counter from './components/Counter.jsx';
import Stack from './components/Stack.jsx';

export default function App() {
  return (
    <main className="container">
      <header className="topbar">
        <h1>Challenge 10 - Redux</h1>
      </header>

      <section className="grid">
        <div>
          <Counter />
        </div>
        <div>
          <Stack />
        </div>
      </section>
    </main>
  );
}
