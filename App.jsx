import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DiscordColorGenerator from './DiscordColorGenerator/discordcolorgenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <DiscordColorGenerator/>
    </>
  )
}

export default App
