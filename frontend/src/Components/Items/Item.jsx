import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
    return (
        <div className='item'>
            <Link to={`/product/${props.id}`} onClick={window.scrollTo(0,0)}>
            <img src={props.image} alt="" />
            <p>{props.name}</p>
            <div className='item-price'>
                RS {props.price}
            </div>
            </Link>
        </div>
    )
}

export default Item