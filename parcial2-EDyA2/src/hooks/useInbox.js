import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

export default function useInbox() {
  const { email } = useSelector(s => s.auth)
  const [inbox, setInbox] = useState([])

  useEffect(() => {
    if (!email) return
    const q = query(
      collection(db, 'dms'),
      where('toEmail', '==', email)
    )
    const unsub = onSnapshot(q, (snap) => {
      const arr = []
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }))
      arr.sort((a,b) => (b.deliveredAt || 0) - (a.deliveredAt || 0))
      setInbox(arr)
    })
    return () => unsub()
  }, [email])

  return inbox
}
