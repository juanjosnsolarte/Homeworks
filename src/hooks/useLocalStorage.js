import { useEffect, useState } from 'react'


export function useLocalStorage(key, initialValue) {
const [value, setValue] = useState(() => {
try {
const item = localStorage.getItem(key)
return item ? JSON.parse(item) : initialValue
} catch (err) {
console.error('Error leyendo localStorage', key, err)
return initialValue
}
})


useEffect(() => {
try {
localStorage.setItem(key, JSON.stringify(value))
} catch (err) {
console.error('Error escribiendo localStorage', key, err)
}
}, [key, value])


return [value, setValue]
}