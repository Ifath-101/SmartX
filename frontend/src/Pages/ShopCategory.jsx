import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_arrow from '../Components/Assets/dropdown_arrow.png'
import Item from '../Components/Items/Item'

const ShopCategory = (props) => {
    const {all_product} = useContext(ShopContext)
    return(
        <div className='shop-category'>
            <div className='shopcategory-indexSort'>
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className='shopcategory-sort'>
                    Sort by <img src={dropdown_arrow} alt="" />
                </div>
            </div>
            <div className='shopcategory-products'>
                {all_product.map((item,i)=>{
                    if(props.brand===item. brand){
                        return <Item key={i} id={item.id} name={item.name} image={item.image} brand={item.brand} price={item.price} ram={item.ram} storage={item.storage} fcam={item.fcam} rcam={item.rcam} display={item.display} battery={item.battery}/>
                    }
                    else{
                        return null;
                    }
                })}
            </div>
            <div className='shopcategory-loadmore'>
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory