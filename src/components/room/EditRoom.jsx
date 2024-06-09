// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { getRoomById, updateRoom } from "../utils/ApiFunctions";
// import { Link, useParams } from "react-router-dom"

// const EditRoom=()=>{
 
//         const[room,setRoom]=useState({
//             photo:"",
//             roomType :"",
//             roomPrice:""
    
//         })
//         const[imagePreview,setImagePreview]=useState("")
//         const[successMessage,setSucessMessage]=useState("")
//         const[errorMessage,setErrorMessage]=useState("")
//         const { roomId } = useParams()
//         const handleImageChange=(e)=>{
//             const selectedImage=e.target.files[0]
//             setRoom({...room,photo:selectedImage})
//             setImagePreview(URL.createObjectURL(selectedImage))

//         }
//         const handleInputChange=(event)=>{
//             const{name,value}=event.target
//             setRoom({...room,[name]: value})
//         }
//         // By including fetchRoom() inside the useEffect hook, you're subscribing to changes in the roomId and fetching the corresponding room data whenever it changes. This keeps your component in sync with the current roomId and ensures that the UI reflects the correct room details
//         useEffect(()=>{
//             const fetchRoom=async()=>{
//                 try{
//                 const roomData=await getRoomById(roomId)
//                 console.log(roomData)
//                 setRoom(roomData)
//                 setImagePreview(roomData.photo)
//                 }catch(error){
//                     console.error(error)
//                 }
//             }
//             fetchRoom()
//         },[roomId])
//         const handleSubmit=async(e)=>{
//             e.preventDefault()
//            try {
//                  const response=await updateRoom(roomId,room)
//                  if(response.status===200){
//                     setSucessMessage("Room updated sucessfully")
//                     const updatedRoomData=await getRoomById(roomId)
//                     setRoom(updatedRoomData)
//                     setImagePreview(updatedRoomData.photo)
//                     setErrorMessage("")
//                  }else{
//                     setErrorMessage("Error updating room")
//                  }
//             }
//             catch(error){
//                 console.error(error)
//                 setErrorMessage(error.message)
//             }
//         }
//     return(<div className="container mt-5 mb-5">
//     <h3 className="text-center mb-5 mt-5">Edit Room</h3>
//     <div className="row justify-content-center">
//         <div className="col-md-8 col-lg-6">
//             {successMessage && (
//                 <div className="alert alert-success" role="alert">
//                     {successMessage}
//                 </div>
//             )}
//             {errorMessage && (
//                 <div className="alert alert-danger" role="alert">
//                     {errorMessage}
//                 </div>
//             )}
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="roomType" className="form-label hotel-color">
//                         Room Type
//                     </label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="roomType"
//                         name="roomType"
//                         value={room.roomType}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="roomPrice" className="form-label hotel-color">
//                         Room Price
//                     </label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="roomPrice"
//                         name="roomPrice"
//                         value={room.roomPrice}
//                         onChange={handleInputChange}
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="photo" className="form-label hotel-color">
//                         Photo
//                     </label>
//                     <input
//                         required
//                         type="file"
//                         className="form-control"
//                         id="photo"
//                         name="photo"
//                         onChange={handleImageChange}
//                     />
//                     {imagePreview && (
//                         <img
//                             src={`data:image/jpeg;base64,${imagePreview}`}
//                             alt="Room preview"
//                             style={{ maxWidth: "400px", maxHeight: "400" }}
//                             className="mt-3"
//                         />
//                     )}
//                 </div>
//                 <div className="d-grid gap-2 d-md-flex mt-2">
//                     <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
//                         back
//                     </Link>
//                     <button type="submit" className="btn btn-outline-warning">
//                         Edit Room
//                     </button>
//                 </div>
//             </form>
//         </div>
//     </div>
// </div>
// )
       
    
// }
// export default EditRoom
import React, { useEffect, useState } from "react"
import { getRoomById, updateRoom } from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditRoom = () => {
	const [room, setRoom] = useState({
		photo: "",
		roomType: "",
		roomPrice: ""
	})

	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { roomId } = useParams()

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setRoom({ ...room, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleInputChange = (event) => {
		// const { name, value } = event.target
		// setRoom({ ...room, [name]: value })
		setRoom({ ...room, [event.target.name]: event.target.value });
	}

	// useEffect(() => {
	// 	const fetchRoom = async () => {
	// 		try {
	// 			const roomData = await getRoomById(roomId)
	// 			setRoom(roomData)
	// 			setImagePreview(roomData.photo)
	// 		} catch (error) {
	// 			console.error(error)
	// 		}
	// 	}

	// 	fetchRoom()
	// }, [roomId])
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId);
                if (roomData) {
                    // console.log("Hiiiiiiiiiiiiiiiiii")
                    setRoom(roomData)
                    if (roomData.photo) {
                        setImagePreview(roomData.photo);
                    } else {
                        console.error("Room photo is missing");
                    }
                } else {
                    console.error("Room data is null or undefined");
                }
            } catch (error) {
                console.error(error);
            }

        //     try{
        //         const roomData = await getRoomById(roomId);
        //         setRoom({
        //             // id:roomData.id,
        //             roomType:roomData.roomType,
        //             roomPrice:roomData.roomPrice,
        //             photo:roomData.photo
        //         });
        //     }catch(error){
        //        console.error(error)
        //     }
        };
    
        fetchRoom();
    }, [roomId]);
    

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await updateRoom(roomId, room)
			if (response.status === 200) {
				setSuccessMessage("Room updated successfully!")
				const updatedRoomData = await getRoomById(roomId)
				setRoom(updatedRoomData)
				setImagePreview(updatedRoomData.photo)
				setErrorMessage("")
			} else {
				setErrorMessage("Error updating room")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	return (
		<div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit Room</h3>
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					{successMessage && (
						<div className="alert alert-success" role="alert">
							{successMessage}
						</div>
					)}
					{errorMessage && (
						<div className="alert alert-danger" role="alert">
							{errorMessage}
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="roomType" className="form-label hotel-color">
								Room Type
							</label>
							<input
								type="text"
								className="form-control"
								id="roomType"
								name="roomType"
								value={room.roomType}
								onChange={handleInputChange}
                                // onChange={(e)=>setRoom({ ...room, roomType: e.target.value })}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="roomPrice" className="form-label hotel-color">
								Room Price
							</label>
							<input
								type="number"
								className="form-control"
								id="roomPrice"
								name="roomPrice"
								value={room.roomPrice}
								onChange={handleInputChange}
                                // onChange={(e)=>setRoom({ ...room, roomPrice: e.target.value })}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="photo" className="form-label hotel-color">
								Photo
							</label>
							<input
								required
								type="file"
								className="form-control"
								id="photo"
								name="photo"
								onChange={handleImageChange}
                                // onChange={(e)=>setRoom({ ...room, photo: e.target.files[0] })}
							/>
							{imagePreview && (
								<img
									src={`data:image/jpeg;base64,${imagePreview}`}
									alt="Room preview"
									style={{ maxWidth: "400px", maxHeight: "400" }}
									className="mt-3"
								/>
							)}
						</div>
						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
								back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Room
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default EditRoom