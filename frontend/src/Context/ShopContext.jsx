import React, {createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = () => {                          //Initializing a empty cart assuming there
    let cart= {};                                       //there are 300 products in the store
    for (let index=0; index < 300+1; index++){          //for each product id (0-300) the no of items initialized to 0
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product,setAll_product] = useState([]);
    const [cartItems,setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:5000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_product(data))

        if(localStorage.getItem('auth-token')){         // checks for a token in the browser’s localStorage
            fetch('http://localhost:5000/getcart',{     //If a user is logged in, there will be an auth-token saved
                method:'POST',                          //If yes → fetch the user's cart from the backend
                headers:{
                    Accept:'application/form-data',         // "I expect JSON back"
                    'auth-token':`${localStorage.getItem('auth-token')}`,           // "Here's my login token"
                    'Content-Type':'application/json',          // "I'm sending JSON"
                },
                body:"",                                       //sending a empty string
            }).then((response)=>response.json())            //converts the response into JSON
            .then((data)=>setCartItems(data));              //The parsed JSON is passed into setCartItems
        }
    },[])

    const addToCart = (itemId) =>{
        const token = localStorage.getItem('auth-token');
        if(!token) {
            alert("PLease log in to add items to your cart");
            return;
        }

        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));          //Gets the previous state from the existing cart and updates the count of the newly added item
        if(localStorage.getItem('auth-token')){                                    
            fetch('http://localhost:5000/addtocart',{
                method:'POST',                                          //Sends the added item details to the backend
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({"itemId":itemId}),                //This tells the backend: “Please add this item to the cart for the logged-in user.”
            })
            .then((response)=>response.json())              
            .then((data)=>console.log(data));
        }
    }
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:5000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product) => product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const getTotalCartItems= () => {
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+=cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;