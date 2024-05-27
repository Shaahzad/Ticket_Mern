import express from "express"
import { deleteUser, getUser, getallUser, updateUser } from "../controllers/user.js"
import { verifyAdmin, verifytoken, verifyuser } from "../utils/verifytoken.js"

const router = express.Router()
//update
router.put("/:id", verifyuser, updateUser)

//delete
router.delete("/:id", verifyuser, deleteUser)

//get
router.get("/:id", verifyuser, getUser)

//getall
router.get("/", verifyAdmin, getallUser)


export default router