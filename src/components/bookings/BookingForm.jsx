import React from "react";
import { useState } from "react";
import { bookRoom, getRoomById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Navigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import BookingSummary from "./BookingSummary";
import { useEffect } from "react";
const BookingForm = () => {
   
  const [isvalidated, setIsvalidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: "",
    numOfChildren: ""
   
  });
  const [roomInfo, setroominfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });
  const { roomId } = useParams();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("")
  };
  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate,"days");
    const price = roomPrice ? roomPrice : 0
    const paymentPerDay=price * diffInDays;
    console.log(paymentPerDay)
    return paymentPerDay
    // return diffInDays * price
  };
  const isGuestvalid = () => {
    const adultCount = parseInt(booking.numOfAdults);
    const childrenCount = parseInt(booking.numOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

//   const isCheckOutDateValid = () => {
//     //check out date must be after the check in date or the same date as check in date but should not be before checkin date
//     if (
//       !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
//     ) {
//       setErrorMessage("check out date must come before check-in date");
//       return false;
//     } else {
//       setErrorMessage("")
//       return true
//     }
//   };
 
const isCheckOutDateValid = () => {
    if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
        setErrorMessage("hello world")
        return false
    } else {
        setErrorMessage("")
        return true
    }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestvalid() ||
      !isCheckOutDateValid()
    ) {
      // to stop the form submission if any one of the above condition is false
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setIsvalidated(true);
  };
  const handleBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setIsSubmitted(true);
      //naviagting to home page after roombooking sucessfully
      navigate("/booking-sucess", { state: { message: confirmationCode } });
    } catch (error) {
      setErrorMessage(error);
      //if booking failed navigating to the home page
      const errorMessage = error.message
      console.log(errorMessage)
      navigate("/booking-sucess", { state: { error: errorMessage } });
    }
  };
 
  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body mt-5">
            <h4 className="card card-title">Reserve Room</h4>
            <Form noValidate validated={isvalidated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="guestName">Full Name:</Form.Label>

                <Form.Control
                  required
                  type="text"
                  id="guestFullName"
                  value={booking.guestFullName}
                  name="guestFullName"
                  placeholder="Enter your full name"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your Email
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="guestEmail">Email:</Form.Label>

                <Form.Control
                  required
                  type="email"
                  id="guestEmail"
                  value={booking.guestEmail}
                  name="guestEmail"
                  placeholder="Enter your Email"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your Email
                </Form.Control.Feedback>
              </Form.Group>
              <fieldset style={{ border: "2px" }}>
                <legend>Loding period</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="Check-In date">
                      Check-In date:
                    </Form.Label>

                    <Form.Control
                      required
                      type="Date"
                      id="check-In Date"
                      value={booking.checkInDate}
                      name="checkInDate"
                      placeholder="check-In Date"
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a check-In date:
                    </Form.Control.Feedback>
                  </div>

                  <div className="col-6">
                    <Form.Label htmlFor="Check-out date">
                      Check-out date:
                    </Form.Label>

                    <Form.Control
                      required
                      type="Date"
                      id="check-out Date"
                      value={booking.checkOutDate}
                      name="checkOutDate"
                      placeholder="check-out Date"
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select check-out date:
                    </Form.Control.Feedback>
                  </div>
                  {errorMessage && (
                    <p className="error-message text-danger">{errorMessage}</p>
                  )}
                </div>
              </fieldset>
              <fieldset>
                <legend>
                    Number of Guests
                </legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="numberOfAdults">
                     Adults:
                    </Form.Label>

                    <Form.Control
                      required
                      type="number"
                      id="numOfAdults"
                      value={booking.numOfAdults}
                      name="numOfAdults"
                      placeholder="0"
                      min={1}
                      onChange={handleInputChange}
                     
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select at least 1 adult
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-6">
                    <Form.Label htmlFor="numOfChildren">
                     Childrens:
                    </Form.Label>

                    <Form.Control
                      required
                      type="number"
                      id="numOfChildren"
                      value={booking.numOfChildren}
                      name="numOfChildren"
                      placeholder="0"
        
                      onChange={handleInputChange}
                     
                    />
                    
                  </div>
                  </div>
                  {/* hi */}
                  <div>
                   
                  </div>
              </fieldset>
              <div className="form-group mt-2 mb-2">
                     <button type="submit" className="btn btn-hotel">Continue</button>
              </div>
            </Form>
          </div>
          </div>
          <div className="col-md-4">
           {(isSubmitted &&(<BookingSummary 
           booking={booking}
           payment={calculatePayment()}
           isFormvalid={isvalidated}
           onConfirm={handleBooking}
            />)
            )}
            
          </div>
        </div>
      </div>
    </>
  );
};
export default BookingForm;
