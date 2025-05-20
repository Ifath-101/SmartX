import React from 'react'
import Products from '../Components/Products/Products'
import Slideshow from '../Components/SlideShow/SlideShow'
import Testimonials from '../Components/Testimonial/Testimonials'
import ServiceList from '../Components/ServiceCards/ServiceList'

const Home = () => {
    return (
        <div>
            <Slideshow/>
            <Products/>
            <ServiceList/>
            <Testimonials/>
        </div>
    )
}

export default Home