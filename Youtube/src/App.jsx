
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Video from './Pages/Video'
import { useState } from 'react'

function App() {
const [sidebar,setSidebar]= useState(true);
  return (
    <>
      <Navbar setSidebar={setSidebar}/>   
      <Routes>
      <Route path='/' element={<Home sidebar={sidebar}/>}/>
        <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
      </Routes>
    </>
  )
}

export default App
