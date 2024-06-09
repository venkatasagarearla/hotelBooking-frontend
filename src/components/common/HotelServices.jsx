import React from "react";
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils,FaWifi } from "react-icons/fa";
import { Container } from "react-bootstrap";
import {Row,Col} from "react-bootstrap";
import Header from "./Header";
import { Card } from "react-bootstrap";
const HotelService=()=>{
   return(
    <>
    <Container className="mb-2">
        <Header title={"Our Service"}/>
        <Row>
            <h4 className="text-center">Service at<span className="hotel-color">StayIn</span> Hotel
            <span className="gap-2">
                <FaClock/>-24-Hour Front Desk
            </span>
            </h4>
        </Row>
        <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
        <Col>
        <Card>
           <Card.Body>
            <Card.Title className="hotel-color">
            <FaWifi/> Wifi
            </Card.Title>
            <Card.Text>Stay coonected with high-speed internet</Card.Text>
            </Card.Body> 
        </Card>
        </Col>
        <Col>
        <Card>
           <Card.Body>
            <Card.Title className="hotel-color">
            <FaUtensils/> BreakFast
            </Card.Title>
            <Card.Text>Start your day with a delicious breakfast buffet</Card.Text>
            </Card.Body> 
        </Card>
        </Col>
        <Col>
        <Card>
           <Card.Body>
            <Card.Title className="hotel-color">
            <FaTshirt/> BreakFast
            </Card.Title>
            <Card.Text>Keep your clothes clean and fresh with our laundry service</Card.Text>
            </Card.Body> 
        </Card>
        </Col>
        <Col>
        <Card>
           <Card.Body>
            <Card.Title className="hotel-color">
            <FaCocktail/> Mini-bar
            </Card.Title>
            <Card.Text>Enjoy a refreshing drink or snack from our in-room mini-bar</Card.Text>
            </Card.Body> 
        </Card>
        </Col>
        <Col>
        <Card>
           <Card.Body>
            <Card.Title className="hotel-color">
            <FaParking/> Parking
            </Card.Title>
            <Card.Text>Park your car conveviently</Card.Text>
            </Card.Body> 
        </Card>
        </Col>
        <Col>
        <Card>
           <Card.Body>
            <Card.Title className="hotel-color">
            <FaSnowflake/>Air-conditioning 
            </Card.Title>
            <Card.Text>Park your car conveviently</Card.Text>
            </Card.Body> 
        </Card>
        </Col>
        </Row>
       
    </Container>

    </>
   )
}
export default  HotelService
