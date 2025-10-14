import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/thunks/authThunks';

export default function LogoutButton() {
  const dispatch = useDispatch();
  return <button className="btn" onClick={()=>dispatch(startLogout())}>Salir</button>;
}