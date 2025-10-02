import { createSlice } from '@reduxjs/toolkit';

const stackSlice = createSlice({
  name: 'stack',
  initialState: { items: [] }, // base → ... → tope
  reducers: {
    push: (state, { payload }) => { state.items.push(payload); },
    pop:  (state) => { if (state.items.length) state.items.pop(); },
    clear:(state) => { state.items = []; },
  },
});

export const { push, pop, clear } = stackSlice.actions;
export default stackSlice.reducer;
