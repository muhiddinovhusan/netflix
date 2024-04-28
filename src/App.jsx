import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify'
import RequiredAuth from './components/RequiredAuth'

const App = () => {
 
  
  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<RequiredAuth> <Home /></RequiredAuth>} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<RequiredAuth><Player /></RequiredAuth>} />
      </Routes>
    </div>
  )
}

export default App
