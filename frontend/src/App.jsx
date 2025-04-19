import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/samsung' element={<ShopCategory category='samsung'/>}/>
        <Route path='/apple' element={<ShopCategory category='apple'/>}/>
        <Route path='/xiaomi' element={<ShopCategory category='xiaomi'/>}/>
        <Route path='/sony' element={<ShopCategory category='sony'/>}/>
        <Route path='/vivo' element={<ShopCategory category='vivo'/>}/>
       </Routes>
       <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
