import { createSlice } from '@reduxjs/toolkit';

const firestoreSlice = createSlice({
  name: 'firestore',
  initialState: { loading:false, items:[], error:null },
  reducers: {
    startLoading: (s)=>{s.loading=true; s.error=null;},
    setItems: (s,{payload})=>{s.loading=false; s.items=payload;},
    setError: (s,{payload})=>{s.loading=false; s.error=payload;},
  }
});

export const { startLoading, setItems, setError } = firestoreSlice.actions;
export default firestoreSlice.reducer;
