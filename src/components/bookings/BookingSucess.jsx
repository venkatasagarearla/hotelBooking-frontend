import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../common/Header";
const BookingSucess=()=>{
    const location=useLocation()
    const message=location.state?.message
    const error=location.state?.error
    return(
        <div className='container'>
         <Header title=" Booking Success"/>
         <div className="mt-5">
           {message ?(
            <div>
                <h3 className="text-sucess">Booking sucess</h3>
                <p className="text-sucess">{message}</p>
            </div>
           ):(
            <div>

             <h3 className="text-danger">Booking  failed</h3>
              <p className="text-sucess">{error}</p>
              </div>
           )}
         </div>
        </div>
    )
}
export default BookingSucess
