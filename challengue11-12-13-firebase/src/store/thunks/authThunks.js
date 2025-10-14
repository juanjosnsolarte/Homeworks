import { auth, googleProvider } from '../../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { checkingCredentials, login, logout } from '../slices/authSlice';

// Registro con email/password
export const startRegisterWithEmailPassword = ({ email, password, displayName }) =>
  async (dispatch) => {
    try {
      dispatch(checkingCredentials());
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) await updateProfile(resp.user, { displayName });
      dispatch(login({
        uid: resp.user.uid,
        email: resp.user.email,
        displayName: resp.user.displayName || displayName || null,
      }));
    } catch (err) {
      dispatch(logout(err.message));
    }
  };

// Login con email/password
export const startLoginWithEmailPassword = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(checkingCredentials());
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    dispatch(login({ uid: user.uid, email: user.email, displayName: user.displayName || null }));
  } catch (err) {
    dispatch(logout(err.message));
  }
};

// Login con Google (usando el link permitido)
export const startGoogleSignIn = () => async (dispatch) => {
  try {
    dispatch(checkingCredentials());
    const { user } = await signInWithPopup(auth, googleProvider);
    dispatch(login({ uid: user.uid, email: user.email, displayName: user.displayName || null }));
  } catch (err) {
    dispatch(logout(err.message));
  }
};

// Logout
export const startLogout = () => async (dispatch) => {
  await signOut(auth);
  dispatch(logout());
};
