import { useEffect, useState } from 'react'
import { db } from '../firebase/config' 
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

export default function useAllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc') 
    )
    const unsub = onSnapshot(q, (snap) => {
      const arr = []
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }))
      setPosts(arr)
    })
    return () => unsub()
  }, [])

  return posts
}
