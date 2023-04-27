import { useEffect, useState } from 'react'
import HotKeyApp from './hotKey'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // useEffect(() => {

  // }, [])
  return (
    <div>
      <HotKeyApp></HotKeyApp>
    </div>
  )
}

export default App
