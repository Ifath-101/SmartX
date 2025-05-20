import React from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick'
import { Container, Row, Col } from 'reactstrap';
import ava01 from '../Assets/ava-1.jpg';
import ava02 from '../Assets/ava-2.jpg';
import ava03 from '../Assets/ava-3.jpg';

const Testimonials = () => {
    const settings= {
        dots:true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
                breakpoint: 992,
                settings: {
                    slidesToShow:2,
                    slidesToScroll:1,
                    infinite:true,
                    dots:true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow:1,
                    slidesToScroll:1,
                },
            },
        ]
    }
    return (<>
        <Container className="my-1 text-center">
      <Row>
        <Col>
          <h2 className="display-5 fw-bold text-dark">
            What Our Customers Say
          </h2>
          <p className="text-muted">
            Hear from real users who love our service.
          </p>
        </Col>
      </Row>
    </Container>
    <div className='px-5 px-md-5'>
        <Slider {...settings} className='mb-5'>
            <div className='testimonial py-4 px-3'>
                <p>"At first, I was hesitant to buy a phone online, but this store completely changed my perception. The ordering process was seamless, and their support team answered all my questions patiently. When the phone arrived, it looked brand new and worked perfectly. It's reassuring to know there are trustworthy online retailers out there."
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava01} className='w-25 h-25 rounded-2' alt=" " />
                    <div>
                        <h6 className='mb-0 mt-3'>John Doe</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className='testimonial py-4 px-3'>
                <p>"I recently purchased an iPhone 14 Pro from this store, and I couldn’t be happier with my experience. The website was easy to navigate, the price was better than what I found elsewhere, and my order arrived the very next day, carefully packaged. Everything was brand new and exactly as described. It’s rare to find such reliable service these days—highly recommended!"
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava02} className='w-25 h-25 rounded-2' alt=" " />
                    <div>
                        <h6 className='mb-0 mt-3'>Lia Frankin</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className='testimonial py-4 px-3'>
                <p>"I’ve ordered phones online before, but this was by far the smoothest and most satisfying experience. I bought a Samsung Galaxy S24 at a great discount, and not only was it delivered quickly, but it also came with a valid warranty. The customer support team even followed up to make sure I was happy with my purchase. I’ll definitely be back for future upgrades!"
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava03} className='w-25 h-25 rounded-2' alt=" " />
                    <div>
                        <h6 className='mb-0 mt-3'>John Doe</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className='testimonial py-4 px-3'>
                <p>"At first, I was hesitant to buy a phone online, but this store completely changed my perception. The ordering process was seamless, and their support team answered all my questions patiently. When the phone arrived, it looked brand new and worked perfectly. It's reassuring to know there are trustworthy online retailers out there."
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava02} className='w-25 h-25 rounded-2' alt=" " />
                    <div>
                        <h6 className='mb-0 mt-3'>Lia Frankin</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
        </Slider>
    </div>
    </>
    )
}

export default Testimonials;
