import { createSlice } from '@reduxjs/toolkit'
import List from '../../structures/List'
import Stack from '../../structures/Stack'
import Queue from '../../structures/Queue'

const initialState = {
  posts: [],          // lista
  notifications: [],  // pila
  dmQueue: [],        // cola
  loadedFromCloud: false,
}

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    addPost: (state, { payload }) => {
      const list = List.fromArray(state.posts)
      list.addFirst(payload) 
      state.posts = list.toArray()
    },

    pushNotification: (state, { payload }) => {
      const st = Stack.fromArray(state.notifications)
      st.push(payload) 
      state.notifications = st.toArray()
    },
    popNotification: (state) => {
      const st = Stack.fromArray(state.notifications)
      st.pop()
      state.notifications = st.toArray()
    },

    enqueueDM: (state, { payload }) => {
      const q = Queue.fromArray(state.dmQueue)
      q.enqueue(payload)
      state.dmQueue = q.toArray()
    },
    dequeueDM: (state) => {
      const q = Queue.fromArray(state.dmQueue)
      q.dequeue()
      state.dmQueue = q.toArray()
    },

    setCloudState: (state, { payload }) => {
      state.posts = payload.posts || []
      state.notifications = payload.notifications || []
      state.dmQueue = payload.dmQueue || []
      state.loadedFromCloud = true
    },
  },
})

export const {
  addPost,
  pushNotification,
  popNotification,
  enqueueDM,
  dequeueDM,
  setCloudState,
} = socialSlice.actions

export default socialSlice.reducer
