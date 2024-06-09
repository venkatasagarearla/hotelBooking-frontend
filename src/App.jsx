import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
// import ExistingRooms from "./components/room/ExistingRooms"
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Home from "./components/home/Home"
// import EditRoom from "./components/room/EditRoom"
import AddRoom from "./components/room/AddRoom"
import ExistingRoom from "./components/room/ExistingRoom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/home/Home"
import EditRoom from "./components/room/EditRoom"
import { getRoomById } from "./components/utils/ApiFunctions"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import RoomListing from "./components/room/RoomListing"
import Admin from "./components/admin/Admin"
import Checkout from "./components/bookings/Checkout"
import BookingSucess from "./components/bookings/BookingSucess"
import Bookings from "./components/bookings/ExistingBookings"
import FindBooking from "./components/bookings/FindBooking"
// import { BrowserRouter  as Router, Routes,Route } from "react-router-dom"

function App() {
  return(
  <>
  <main>
    <Router>
      <NavBar/>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/rooms/add/new-room" element={<AddRoom/>}></Route>
        <Route path="/edit-room/:roomId"element={<EditRoom/>} />
        {/* <Route path="rooms/roomgetById/:roomId" element={<getRoomById/>}></Route> */}
        <Route path="/existing-rooms"element={<ExistingRoom/>} />
        <Route path="/browse-all-rooms"element={<RoomListing/>} />
        <Route path="/book-room/:roomId"element={<Checkout/>} />
        <Route path="/admin"element={<Admin/>} />
        <Route path="/booking-sucess" element={<BookingSucess/>}/>
        <Route path="/existing-bookings" element={<Bookings/>}/>
        <Route path="/find-booking" element={<FindBooking />}/>
      </Routes>
    </Router>
    <Footer/>
  </main>
  {/* <AddRoom/>
  <ExistingRoom/> */}
  </>
  )
}

export default App
