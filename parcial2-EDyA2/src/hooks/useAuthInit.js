import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { initAuthListener } from '../store/thunks/thunks'

export default function useAuthInit() {
  const [checking, setChecking] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = dispatch(initAuthListener())
    const t = setTimeout(() => setChecking(false), 1500)
    return () => clearTimeout(t)
  }, [dispatch])

  return { checking }
}
