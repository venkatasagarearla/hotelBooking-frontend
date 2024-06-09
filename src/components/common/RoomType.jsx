import React,{useEffect, useState} from "react";
import { getRoomTypes } from "../utils/ApiFunctions";
const RoomTypeSelector =({handleRoomInputchange, newRoom})=>{
    //room type state varaible
    const[roomTypes,setRoomTypes]=useState([""])
    //if we are adding a different room type which is not exsiting type then we can add new room Type
    const[showNewRoomTypeInput,setShowNewRoomTypeInput]=useState(false)
    const[newRoomType,setNewRoomType]=useState("")
    useEffect(()=>{
        getRoomTypes().then((data)=>{
            setRoomTypes(data)
        })
    },[])
    const handleNewRoomTypeInputchange=(e)=>{
        setNewRoomType(e.target.value)
    }
    const handleAddNewRoomType=()=>{
        if(newRoomType!==""){
            setRoomTypes([...roomTypes,newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }
    return(
        <>
			{roomTypes.length > 0 && (
				<div>
					<select
						required
						className="form-select"
						name="roomType"
						onChange={(e) => {
							if (e.target.value === "Add New") {
								setShowNewRoomTypeInput(true)
							} else {
								handleRoomInputchange(e)
							}
						}}
						value={newRoom.roomType}>
						<option value="">Select a room type</option>
						<option value={"Add New"}>Add New</option>
						{roomTypes.map((type, index) => (
							<option key={index} value={type}>
								{type}
							</option>
						))}
					</select>
					{showNewRoomTypeInput && (
						<div className="mt-2">
							<div className="input-group">
								<input
									type="text"
									className="form-control"
									placeholder="Enter New Room Type"
									value={newRoomType}
									onChange={handleNewRoomTypeInputchange}
								/>
								<button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
									Add
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</>
    )
}
export default RoomTypeSelector