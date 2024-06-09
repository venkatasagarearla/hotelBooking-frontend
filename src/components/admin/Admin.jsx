import React from "react";
import { Link } from "react-router-dom";
const Admin=()=>{
    return(
        <div>
           <h2>Welcomem to Admin pannel</h2>
            <hr/>
            <Link to={"/rooms/add/new-room"}>
            Add new Room
            </Link>
            <br/>
            <Link to={"/existing-rooms"}>Manage Existing Rooms</Link>  <br/>
            <Link to={"/existing-bookings"}>Manage Existing Bookings</Link>  <br/>
        
    </div>
    )
    
}
export default Admin