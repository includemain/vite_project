import { useEffect, useRef, useState } from 'react'
import HotKeyApp from './hotKey'
import HotKeyApp2 from './hotKey/index2'


import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      {
        count < 3 ? <HotKeyApp setCount={setCount} count={count}></HotKeyApp> : 
        <HotKeyApp2 setCount={setCount} count={count}></HotKeyApp2>
      }
    </div>
  )
}

export default App
