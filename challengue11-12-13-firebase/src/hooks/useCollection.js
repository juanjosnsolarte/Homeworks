import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../store/thunks/firestoreThunks';

export const useCollection = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((s) => s.firestore);

  useEffect(() => { dispatch(fetchItems()); }, [dispatch]);

  return { items, loading, error, refetch: ()=>dispatch(fetchItems()) };
};