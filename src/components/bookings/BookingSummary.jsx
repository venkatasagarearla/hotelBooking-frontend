import React from "react";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
const BookingSummary = ({ booking, payment, isFormvalid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, "Days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();
  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };
  
  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-sucess");
    }
  }, [isBookingConfirmed, navigate]);
  console.log(booking.numOfAdults)
  console.log(booking.numOfChildren)
  return (
    <div className="card card-body mt-8">
      <h4>Reservation summary</h4>
      <p>
        FullName:<strong>{booking.guestFullName}</strong>
      </p>

      <p>
        Email:<strong>{booking.guestEmail}</strong>
      </p>

      <p>
        Check-In Date:
        <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
      </p>
      <p>
        Check-out Date:
        <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
      </p>
      <p>
        Number of Days:<strong>{numberOfDays}</strong>
      </p>
      {/* <div>
        <h5>Number of Guests</h5>
        <strong>
          Adult{booking.NumofAdults > 1 ? "s" : ""}:{booking.NumofAdults}
          
        </strong>
        <strong>Children :{booking.NumOfChildren}</strong>
        
      </div> */}
       <div>
					<h5 className="hotel-color">Number of Guest</h5>
					<strong>
						Adult{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}
					</strong>
					<strong>
						<p>Children : {booking.numOfChildren}</p>
					</strong>
				</div>

      {payment > 0 ? (
        <>
          <p>
         
            Total Payment:<strong>${payment}</strong>
          </p>
          {isFormvalid && !isBookingConfirmed ? (
            //when button is clicked we are going to handle the handleConfirmBooking then we are going to trigger the handle booking in BookingForm
            <Button variant="success" onClick={handleConfirmBooking}>
              {isProcessingPayment ? (
                <>
                  <span
                    className="sppiner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Booking Confirmed,redirecting to payment....
                </>
              ) : (
                "Confirmed booking and proceed to payment"
              )}
            </Button>
          ) : isBookingConfirmed ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary">
                <span className="sr-only">Loading....</span>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <p className="text-danger">
          {" "}
          Check-out date must be after check-in date hello world
        </p>
      )}
    </div>
  );
};
export default BookingSummary;
