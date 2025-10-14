import { rtdb } from '../../firebase/config';
import { ref, push, onValue, off } from 'firebase/database';
import { setMessages } from '../slices/realtimeSlice';

const chatRef = ref(rtdb, 'mychat'); 

export const startListeningMessages = () => (dispatch) => {
  const handler = (snapshot) => {
    const data = snapshot.val() || {};
    const list = Object.entries(data).map(([id, m]) => ({ id, ...m }));
    dispatch(setMessages(list.sort((a,b)=>a.timestamp-b.timestamp)));
  };
  onValue(chatRef, handler);
};

export const sendMessage = (text, uid='me') => async () => {
  if (!text.trim()) return;
  await push(chatRef, { uid, text, timestamp: Date.now() });
};
