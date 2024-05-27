import Hotel from "../model/hotel.js"
import Room from "../model/room.js"

export const createHotel = async (req,res,next)=>{
        const newHotel = new Hotel(req.body)
        try {
            const savedHotel = await newHotel.save()
            res.status(200).json(savedHotel)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    export const updateHotel = async(req,res)=>{
        try {
            const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set : req.body},{new: true})
            res.status(200).json(updateHotel)
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        }
    }

    export const deleteHotel = async(req,res)=>{
        try {
            await Hotel.findByIdAndDelete(req.params.id)
            res.status(200).json("Hotel Deleted")
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        }
    }

    export const getHotel = async(req,res)=>{
        try {
          const hotel = await Hotel.findById(req.params.id)
          if(!hotel){
            return res.status(400).json("Hotel not found")
          }
            res.status(200).json(hotel)
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        }
    }

    export const getallHotel = async (req, res, next) => {
        const { min, max,  limit ,...others } = req.query
        try {
            const query = { ...others }
            if (min !== undefined && max !== undefined) {
            query.cheapestPrice = { $gt: min, $lt: max }
            }
            const hotels = await Hotel.find(query).limit(limit)
            res.status(200).json(hotels)
        } catch (err) {
            next(err)
        }
    }
    export const countbyCity = async(req,res,next)=>{
        const cities = req.query.cities.split(",")
        try {
            const list = await Promise.all(cities.map(city=>{
                return Hotel.countDocuments({city:city})
            }))
            res.status(200).json(list)
        } catch (error) {
            next(error)
        }
    }


    export const countbyType = async(req,res,next)=>{
        try {
            const hotelcount = await  Hotel.countDocuments({type: "hotel"})
            const apartmentcount = await  Hotel.countDocuments({type:"apartment"})
            const resortCount = await  Hotel.countDocuments({type:"resort"})
            const villaCount = await  Hotel.countDocuments({type:"villa"})
            const cabinCount = await  Hotel.countDocuments({type:"cabin"})
res.status(200).json([
    {type:"hotel", count: hotelcount},
    {type:"apartment", count: apartmentcount},
    {type:"resort", count: resortCount},
    {type:"villa", count: villaCount},
    {type:"cabin", count: cabinCount}

])
        } catch (error) {
            next(error)
        }
    }

export const gethotelRoom = async (req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room=>{
          return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}


