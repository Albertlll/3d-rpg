import { useState } from 'react'
import './App.css'
import Arena from './components /pages/arena'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-full h-full'>
        <Arena/>
      </div>
    </>
  )
}

export default App
