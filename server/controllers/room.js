import Room from "../model/room.js"
import Hotel from "../model/hotel.js"
import {createError} from "../utils/error.js"


export const createRoom = async (req,res,next)=>{
const HotelId = req.params.hotelid
const newRoom = new Room(req.body)

try {
    const savedRoom = await newRoom.save()
    try {
await Hotel.findByIdAndUpdate(HotelId,{
    $push:{rooms: savedRoom._id}
})
    } catch (error) {
        next(error)
    }
    res.status(200).json(savedRoom)
} catch (error) {
    next(error)
}
}


export const updateRoom = async(req,res)=>{
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, {$set : req.body},{new: true})
        res.status(200).json(updateRoom)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}
export const updateRoomAvailability = async(req,res)=>{
    try {
        await Room.updateOne({"roomNumber._id": req.params.id},{
            $push: {
                "roomNumber.$.unavailableDates": req.body.dates
            }
        })
        res.status(200).json("Room status has been updated")
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

export const deleteRoom = async(req,res)=>{
    const HotelId = req.params.hotelid

    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(HotelId,{
                $pull:{rooms: req.params.id}
            })
                } catch (error) {
                    next(error)
                }
        res.status(200).json("Room Deleted")
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

export const getRoom = async(req,res)=>{
    try {
        await Room.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel Deleted")
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

export const getallRoom = async(req,res,next)=>{
    try {
        const getallroom = await Room.find()
        res.status(200).json(getallroom)
    } catch (error) {
        next(error)
    }
}
