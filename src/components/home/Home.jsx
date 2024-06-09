import React from "react";
import MainHeader from "../layout/MainHeader";
import Parallax from "../common/Parallax";
import HotelService from "../common/HotelServices";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";
const Home=()=>{
    return(
    <section>
        <MainHeader/>

        <section className="container">
      <RoomSearch/>
        <RoomCarousel/>
        <Parallax/>
        <HotelService/>
          <Parallax/>
          <RoomCarousel/>
        </section>
    </section>
    )
    
}
export default  Home