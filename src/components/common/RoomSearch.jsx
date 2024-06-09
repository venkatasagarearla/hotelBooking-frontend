import React,{useState} from 'react'
import { getAvilableRooms } from '../utils/ApiFunctions'
import RoomSearchResult from './RoomSearchResult'
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import moment from "moment"
import RoomTypeSelector from './RoomType'
const RoomSearch = () => {
const[searchQuery,setSearchQuery]=useState({
    checkInDate :"",
    checkOutDate:"",
    roomType:""

})
 const[errorMessage,setErrorMessage]=useState("")
 const[availableRooms,setAvilableRooms]=useState([])
 const[isLoading,setIsLoading]=useState(false)
const handlesearch=(e)=>{
    e.preventDefault();
    const checkInDate=moment(searchQuery.checkInDate)
    const checkOutDate=moment(searchQuery.checkOutDate)
    if(!checkInDate.isValid() || ! checkOutDate.isValid()){
        setErrorMessage("please,enter valid date range")
        return
    }
    if(!checkOutDate.isSameOrAfter(checkInDate)){
        setErrorMessage("Check-in Date must come before check-out Date")
    }
    // reflects the UI that some background operation is happenning 
    setIsLoading(true)
    getAvilableRooms(searchQuery.checkInDate,searchQuery.checkOutDate,searchQuery.roomType).then((response)=>{
        console.log("hello")
        console.log(response.data)
        setAvilableRooms(response.data)
        setTimeout(()=>{
            //after 2sec settting the Isloading to false to remove loadind incator from UI,indicating data fetching process is complete
            setIsLoading(false)
        },2000)
    }).catch((error)=>{
        console.error(error)
    }).finally(()=>{
        //reagardless of fetching is sucessful or not removing the  Loading component
        setIsLoading(false)
    })
}
const handleInputChange=(e)=>{
    const{name,value}=e.target 
    setSearchQuery({ ...searchQuery, [name]: value })
    const checkIn=moment(searchQuery.checkInDate)
    const checkOut=moment(searchQuery.checkOutDate)
    if(checkIn.isValid() && checkOut.isValid()){
        setErrorMessage("")
    }
}
const ClearSearch =()=>{
    setSearchQuery({
       checkInDate : "",
       checkOutDate : "",
       roomType:""
    })
}
  return (
    <>
    <Container className="mt-5 mb-5 py-5 shadow">
        <Form onSubmit={handlesearch}>
            <Row className="justify-content-center">
                <Col xs={12} md={3}>
                    <Form.Group controlId="checkInDate">
                      <Form.Label>
                        Check-in date
                      </Form.Label>
                       <Form.Control type="date" 
                       name="checkInDate" 
                       value={searchQuery.checkInDate} 
                       onChange={handleInputChange} 
                       min={moment().format("YYYY-MM-DD")}/>
                    </Form.Group>
                </Col>

                <Col xs={12} md={3}>
                    <Form.Group controlId="checkOutDate">
                      <Form.Label>
                        Check-in date
                      </Form.Label>
                       <Form.Control type="date" 
                       name="checkOutDate" 
                       value={searchQuery.checkOutDate} 
                       onChange={handleInputChange} 
                       min={moment().format("YYYY-MM-DD")}/>
                    </Form.Group>
                </Col>
                 
                <Col xs={12} md={3}>
                    <Form.Group>
                      <Form.Label>
                        Room Type
                      </Form.Label>
                       <div className="d-flex">
                         <RoomTypeSelector
                         handleRoomInputchange={handleInputChange}
                         newRoom={searchQuery}/>
                         <Button varinat="secondary" type="submit">Search</Button>
                       </div>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
        { setIsLoading ?(
            <p>Finding available rooms...........</p>
        ):availableRooms ?(
            <RoomSearchResult results={availableRooms}
            onClearSearch={ClearSearch}/>
        ):(
            <p>No rooms avialble for the selected dates and room Type</p>
        )

        }
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </Container>
    </>
  )
}

export default RoomSearch