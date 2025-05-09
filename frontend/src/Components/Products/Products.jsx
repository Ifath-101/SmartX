import React, { useContext } from 'react'
import './Products.css'
import { ShopContext } from '../../Context/ShopContext.jsx'
import Item from '../Items/Item.jsx'

const Products = () => {
    const {all_product} = useContext(ShopContext)
    const home_product = all_product
        .slice(0,12);

    return(
    <div>
        <div className='products'>
            <h1>TOP PRODUCTS</h1>
            <hr />
            <div className='products-item'>
                {home_product.map((item,i)=>{
                    return(
                        <Item key={i} id={item.id} name={item.name} image={item.image} brand={item.brand} price={item.price} ram={item.ram} storage={item.storage} fcam={item.fcam} rcam={item.rcam} display={item.display} battery={item.battery}/>
                    )
                })}
            </div>
        </div>
        <div className='loadmore'>
            Explore More
        </div>
    </div>
    )
}

export default Products