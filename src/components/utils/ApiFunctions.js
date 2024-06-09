import axios from "axios"
export const api=axios.create({
   baseURL:"http://localhost:8080" 
})

  async function addRoom(photo,roomType,roomPrice){
    const formData=new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

    const response= await api.post("/rooms/add/new-room",formData)
    if(response.status===201){
        return true
    }
    else{
        return false
    }
}
export default addRoom;
// this  function gets all room types from the data
export async function getRoomTypes(){
  try{
    const response=await api.get("/rooms/room/type")
    return response.data
  } catch(error){
    throw new Error("Error fetching room types")
  }
}
//to get all the rooms from our databases to frontend
export async function getAllRooms(){
  try{
    const result=await api.get("rooms/rooms/all-rooms")
    return result.data
  }
  catch(error){
    throw new Error("Error feching rooms")
  }
}
/* this functioon deletes a room by the Id*/
export async function deleteRoom(roomId){
  try{
    const result=await api.delete(`/rooms/delete/room/${roomId}`)
    return result.data
  }
  catch(error){
    throw new Error(`Error deleting room ${error.message}`)

  }
}
//function to update the room
export async function updateRoom(roomId,roomData){
  const formData=new FormData()
  formData.append("roomType",roomData.roomType)
  formData.append("roomPrice",roomData.roomPrice)
  formData.append("photo",roomData.photo)
  const response=await api.put(`/rooms/update/${roomId}`,formData)
  return response


}
//function to get the roomById by 
export async function getRoomById(roomId){
  try{
   const response=await api.get(`/rooms/roomgetById/${roomId}`)
   console.log(response)
   console.log("hello world")
   return response.data;
  }
  catch(error){
     throw new Error(`Error fetching room ${error.message}`)
  }
}
///book-room/:roomId
//This function saves a new booking to database/
export async function bookRoom(id,booking){
     try{
      const response=await api.post(`/booking/bookroom/${id}`,booking)
      return response.data
     }catch(error){
      if(error.response && error.response.data){
        throw new Error(error.response.data)

      }else{
        throw new Error(`Error boking room: ${error.message}`)
      }
     }
}
//This fucntion gets all booking from dataBase
export async function getAllBookings(){
   try{
    const response=await api.get("/booking/allBookings")
    return response.data
   }catch(error){
    throw new Error(`Error fetching bookinngs: ${error.message}`)
   }
}
//this function gets the  roombyconfirmationcode
export async function getBookingByConfirmationCode(bookingConfirmationCode){
 try{
  const response=await api.get(`/booking/confirmation/${bookingConfirmationCode}`)
  return response.data
 }catch(error){
   if(error.response && error.response.data){
    throw new Error(error.response.data)
   }
   else{
    throw new Error(`Error while getting room by confirmatiocode:${error.message}`)
   }
 }
}
//this function cancles the booking
export async function cancleBooking(bookingId){
try{
  const response=await api.delete(`/booking/${bookingId}/delete`)
  return response.data
}
catch(error){
throw new Error(`Error cancelling booking :${error.message}`)
}
}
// this function gets allthe  avilable rooms from the database with a given date and room type
 export async function getAvilableRooms(checkInDate,checkOutDate,roomType){
  try{
    const result= await api.get(`/available-rooms?checkInDate=${checkInDate}
    &checkOutDate=${checkOutDate}&roomType=${roomType}`)
    console.log(result.data)
    return result;
    
  }catch(error){
    throw new Error("Error while fetching the data")
  }
  
 }