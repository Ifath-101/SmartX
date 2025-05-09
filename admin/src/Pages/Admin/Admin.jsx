import React from 'react'
import './Admin.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import AddProduct from '../../Component/Addproduct/Addproduct.jsx'
import Sidebar from '../../Component/Sidebar/Sidebar.jsx'
import ListProduct from '../../Component/Listproduct/Listproduct.jsx'

const Admin = () => {
    return (
        <div className='admin'>
            <Sidebar/>
            <Routes>
                <Route path="/" element={<Navigate to="addproduct" replace />} />
                <Route path='/addproduct' element={<AddProduct/>}/>
                <Route path='/listproduct' element={<ListProduct/>}/>
            </Routes>
        </div>
    )
}

export default Admin