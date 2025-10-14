import { db } from '../../firebase/config';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc
} from 'firebase/firestore';
import { setError, setItems, startLoading } from '../slices/firestoreSlice';

const colRef = collection(db, 'items'); // colección ejemplo

export const fetchItems = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const snap = await getDocs(colRef);
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    dispatch(setItems(list));
  } catch (e) { dispatch(setError(e.message)); }
};

export const addItem = (item) => async (dispatch) => {
  try {
    await addDoc(colRef, item);
    dispatch(fetchItems());
  } catch (e) { dispatch(setError(e.message)); }
};

export const updateItem = (id, partial) => async (dispatch) => {
  try {
    await updateDoc(doc(db, 'items', id), partial);
    dispatch(fetchItems());
  } catch (e) { dispatch(setError(e.message)); }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, 'items', id));
    dispatch(fetchItems());
  } catch (e) { dispatch(setError(e.message)); }
};
