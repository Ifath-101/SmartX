import React from "react";
import ServiceCard from "./ServiceCard";
import { Col, Row } from 'reactstrap';

import DelImg from '../Assets/truck-line.svg'
import WarImg from '../Assets/shield-user-line.svg'
import SerImg from '../Assets/service-line.svg'

const servicesData = [
    {
        imgUrl: DelImg,
        title: "Fast Delivery",
        desc: "We deliver products to your doorstep within 3 days.",
    },
    {
        imgUrl: WarImg,
        title: "Company Warranty",
        desc: "All products include one year company warranty.",
    },
    {
        imgUrl: SerImg,
        title: "Customer Service",
        desc: "Customer friendly staff.",
    },
]

const ServiceList = () => {
    return <>
    {<Row>
        {
            servicesData.map((item,index)=> <Col lg='4'  md="6" sm="12" key={index}>
            <ServiceCard item={item}/>
            </Col>)
        }
    </Row>
    }
    </>
};

export default ServiceList;