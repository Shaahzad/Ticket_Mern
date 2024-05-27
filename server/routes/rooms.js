import express from "express"
import {verifyAdmin} from "../utils/verifytoken.js"
import { createRoom, deleteRoom, getRoom, getallRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js"

const router = express.Router()

//create
router.post("/:hotelid", verifyAdmin, createRoom)
//update
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id",  updateRoomAvailability)

//delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

//get
router.get("/:id", getRoom)

//getall
router.get("/", getallRoom)


export default router