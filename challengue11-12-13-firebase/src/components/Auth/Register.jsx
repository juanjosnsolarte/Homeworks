import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithEmailPassword } from '../../store/thunks/authThunks';

export default function Register() {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ displayName: '', email: '', password: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startRegisterWithEmailPassword(form));
  };

    return (
    <form onSubmit={onSubmit} className="form">
        <h2>Registro</h2>
        <input className="input" placeholder="Nombre" value={form.displayName}
            onChange={(e)=>setForm({...form,displayName:e.target.value})}/>
        <input className="input" placeholder="Email" value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input className="input" placeholder="Password" type="password" value={form.password}
            onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button className="btn primary" disabled={status==='checking'}>Crear cuenta</button>
        {errorMessage && <p className="helper" style={{color:'#f7f7f7ff'}}>{errorMessage}</p>}
    </form>
    );
}
