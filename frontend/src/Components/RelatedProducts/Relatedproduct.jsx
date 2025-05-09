import React, {useContext} from "react";
import './Relatedproduct.css'
import Item from "../Items/Item";
import { ShopContext } from '../../Context/ShopContext'

const RelatedProducts = (props) => {
    const {all_product} = useContext(ShopContext)
    const {brand} = props;
    const relatedItems = all_product
        .filter(item => item.brand === brand)
        .slice(0, 4);
    return (
        <div className="relatedproducts">
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproducts-item">
            {relatedItems.map((item,i)=>{
                return(
                    <Item key={i} id={item.id} name={item.name} image={item.image} brand={item.brand} price={item.price} ram={item.ram} storage={item.storage} fcam={item.fcam} rcam={item.rcam} display={item.display} battery={item.battery}/>
            )})}
            </div>
        </div>
    )
}

export default RelatedProducts