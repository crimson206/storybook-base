import { useState } from 'react'
import viteLogo from '/vite.svg'
import Welcome from './stories/Welcome'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Welcome/>
    </div>
  )
}

export default App