import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import './App.css'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import { RootState } from './redux/store';

function App() {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={currentUser ? <Home /> : <SignIn />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
