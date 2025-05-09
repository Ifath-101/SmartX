import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import Productdisplay from '../Components/Productdisplay/Productdisplay';
import RelatedProducts from '../Components/RelatedProducts/Relatedproduct';

const Product = () => {
    const {all_product} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e)=> e.id === Number(productId));
    return (
        <div>
            <Breadcrum product={product}/>
            <Productdisplay product={product} />
            <RelatedProducts brand={product.brand} />
        </div>
    )
}
export default Product