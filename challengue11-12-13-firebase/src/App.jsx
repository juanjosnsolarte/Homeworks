import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LogoutButton from './components/Auth/LogoutButton';
import Crud from './components/Firestore/Crud';
import ChatMe from './components/Realtime/ChatMe';
import { useSelector } from 'react-redux';

export default function App() {
  const { status, displayName } = useSelector((s) => s.auth);
  const isAuth = status === 'authenticated';

  return (
    <div className="app">
      <div className="header">
        <div className="brand">
          <h1 className="title">Challengue 11 - 12 - 13 — Firebase</h1>
        </div>

        <div className="space-between">
          {isAuth && (
            <>
              {displayName && <span className="badge">Hola, {displayName}</span>}
              <LogoutButton />
            </>
          )}
        </div>
      </div>

      <div className="grid">
        {!isAuth ? (
          <>
            <section className="card">
              <Register />
            </section>

            <section className="card">
              <Login />
            </section>
          </>
        ) : (
          <>
            <section className="card">
              <Crud />
            </section>

            <section className="card chat">
              <ChatMe />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
