import { auth, db } from '../../firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import {
  doc, getDoc, setDoc,
  collection, addDoc
} from 'firebase/firestore'
import { login, logout, setChecking } from '../slices/authSlice'
import { setCloudState, dequeueDM, pushNotification, addPost } from '../slices/socialSlice'

export const startRegister = ({ email, password, displayName }) => async (dispatch) => {
  const creds = await createUserWithEmailAndPassword(auth, email, password)
  if (displayName) await updateProfile(creds.user, { displayName })
  dispatch(login({ uid: creds.user.uid, email, displayName: displayName || null }))
  const ref = doc(db, 'states', creds.user.uid)
  await setDoc(ref, { posts: [], notifications: [], dmQueue: [] }, { merge: true })
}

export const startLogin = ({ email, password }) => async (dispatch) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  dispatch(login({ uid: user.uid, email: user.email, displayName: user.displayName || null }))
}

export const startLogout = () => async (dispatch, getState) => {
  const { auth: a, social } = getState()
  if (a?.uid) {
    const ref = doc(db, 'states', a.uid)
    await setDoc(ref, {
      posts: social.posts,
      notifications: social.notifications,
      dmQueue: social.dmQueue,
    }, { merge: true })
  }
  await signOut(auth)
  dispatch(logout())
}

export const initAuthListener = () => (dispatch) => {
  dispatch(setChecking(true))
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      dispatch(logout())
      dispatch(setChecking(false))
      return
    }
    dispatch(login({ uid: user.uid, email: user.email, displayName: user.displayName || null }))
    const ref = doc(db, 'states', user.uid)
    const snap = await getDoc(ref)
    if (snap.exists()) {
      dispatch(setCloudState(snap.data()))
    } else {
      await setDoc(ref, { posts: [], notifications: [], dmQueue: [] })
      dispatch(setCloudState({ posts: [], notifications: [], dmQueue: [] }))
    }
    dispatch(setChecking(false))
  })
  return unsubscribe
}

export const saveStateToCloud = () => async (_dispatch, getState) => {
  const { auth: a, social } = getState()
  if (a.uid) {
    const ref = doc(db, 'states', a.uid)
    await setDoc(ref, {
      posts: social.posts,
      notifications: social.notifications,
      dmQueue: social.dmQueue,
    }, { merge: true })
  }
}

export const sendNextDM = () => async (dispatch, getState) => {
  const { auth: a, social } = getState()
  if (social.dmQueue.length === 0 || !a?.email) return

  const first = social.dmQueue[0] 

  await addDoc(collection(db, 'dms'), {
    toEmail: first.to,
    fromEmail: a.email,
    fromUid: a.uid,
    text: first.text,
    createdAt: first.createdAt,
    deliveredAt: Date.now(),
  })

  dispatch(dequeueDM())
  dispatch(pushNotification({
    id: crypto.randomUUID(),
    text: `Se envió un DM a ${first.to}`,
    createdAt: Date.now()
  }))

  await dispatch(saveStateToCloud())
}

export const publishPost = (post) => async (dispatch) => {
  dispatch(addPost(post))
  await addDoc(collection(db, 'posts'), post)
}
