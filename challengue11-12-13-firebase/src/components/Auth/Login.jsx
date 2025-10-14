import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoginWithEmailPassword, startGoogleSignIn } from '../../store/thunks/authThunks';

export default function Login() {
  const dispatch = useDispatch();
  const { status, errorMessage, displayName } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ email: '', password: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginWithEmailPassword(form));
  };

    return (
    <div className="stack-md">
        <form onSubmit={onSubmit} className="form">
        <h2>Login</h2>
        <div className="row">
            <input className="input" placeholder="Email" value={form.email}
                onChange={(e)=>setForm({...form,email:e.target.value})}/>
            <input className="input" placeholder="Password" type="password" value={form.password}
                onChange={(e)=>setForm({...form,password:e.target.value})}/>
            <button className="btn primary btn-sm" disabled={status==='checking'}>Ingresar</button>
        </div>
        </form>

        <button className="btn primary btn-sm" onClick={()=>dispatch(startGoogleSignIn())}
                disabled={status==='checking'}>
        Ingresar con Google
        </button>

        {displayName && <p className="badge">Hola, {displayName}</p>}
        {errorMessage && <p className="helper" style={{color:'#ffffffff'}}>{errorMessage}</p>}
    </div>
    );
}
