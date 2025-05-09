import React, { useState } from 'react'
import './addproduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image,setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        brand:"samsung",
        price:"",
        ram:"",
        storage:"",
        fcam:"",
        rcam:"",
        display:"",
        battery:"",
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) => {
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const Add_Product = async ()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image)

        await fetch('http://localhost:5000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then((data)=>{responseData=data});

        if(responseData.success){
            product.image= responseData.image_url;
            console.log(product);
            await fetch('http://localhost:5000/addproduct',{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(product),
            }).then((res)=>res.json()).then((data)=>{
                data.success?alert('product Added'):alert('Operation failed')
            })
        }
    };


    return(
        <div className='add-product'>
            <div className='addproduct-itemfield'>
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type Here'/>
            </div>
            <div className='addproduct-itemfield'>
                <p>Price</p>
                <input value={productDetails.price} onChange={changeHandler} type="text" name="price" placeholder='Type here'/>
            </div>
            <div className='addproduct-memory'>
                <div className='addproduct-itemfield'>
                    <p>RAM</p>
                    <input value={productDetails.ram} onChange={changeHandler} type="text" name="ram" placeholder='Type here'/>
                </div>
                <div className='addproduct-itemfield'>
                    <p>Storage Capacity</p>
                    <input value={productDetails.storage} onChange={changeHandler} type="text" name="storage" placeholder='Type here'/>
                </div>
            </div>
            <div className='addproduct-camera'>
                <div className='addproduct-itemfield'>
                    <p>Front Camera</p>
                    <input value={productDetails.fcam} onChange={changeHandler} type="text" name="fcam" placeholder='Type here'/>
                </div>
                <div className='addproduct-itemfield'>
                    <p>Rear Camera</p>
                    <input value={productDetails.rcam} onChange={changeHandler} type="text" name="rcam" placeholder='Type here'/>
                </div>
            </div>
            <div className='addproduct-display'>
                <div className='addproduct-itemfield'>
                    <p>Display Size</p>
                    <input value={productDetails.display} onChange={changeHandler} type="text" name="display" placeholder='Type here'/>
                </div>
                <div className='addproduct-itemfield'>
                    <p>Battery Capacity</p>
                    <input value={productDetails.battery} onChange={changeHandler} type="text" name="battery" placeholder='Type here'/>
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <p>Product Brand</p>
                <select value={productDetails.brand} onChange={changeHandler} name="brand" className='addproduct-selector'>
                    <option value='samsung'>Samsung</option>
                    <option value='apple'>Apple</option>
                    <option value='xiaomi'>Xiaomi</option>
                    <option value='sony'>Sony</option>
                    <option value='vivo'>Vivo</option>
                </select>
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor='file-input'>
                    <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type='file' name="image" id='file-input' hidden/>  
            </div>
            <button onClick={() =>{Add_Product()}} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct