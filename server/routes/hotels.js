import express from "express"
import { countbyCity, countbyType, createHotel, deleteHotel, getHotel, getallHotel, gethotelRoom, updateHotel } from "../controllers/hotel.js"
import {verifyAdmin} from "../utils/verifytoken.js"

const router = express.Router()

//create
router.post("/", verifyAdmin, createHotel)
//update
router.put("/:id", verifyAdmin, updateHotel)

//delete
router.delete("/:id", verifyAdmin, deleteHotel)

//get
router.get("/find/:id", getHotel)

//getall
router.get("/", getallHotel)

router.get("/countbyCity", countbyCity)
router.get("/countbyType", countbyType)
router.get("/room/:id", gethotelRoom)



export default router