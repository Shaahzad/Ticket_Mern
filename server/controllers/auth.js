import User from "../model/user.js"
import bcrypt from "bcryptjs"
import {createError}  from "../utils/error.js"
import jwt from "jsonwebtoken"

export const register = async (req,res,next) =>{
try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
        const newuser = new User({
        ...req.body,
        password: hash
    })
    await newuser.save()
    res.status(200).json("user has been created")
} catch (error) {
    next(error)
}
}

export const login = async (req,res,next) =>{
    try {
      const user = await User.findOne({name: req.body.name})
      if(!user) return next(createError(404, "user not found"))

        const Ispassword = await bcrypt.compare(req.body.password,user.password)
        if(!Ispassword) return next(createError(400, "wrong password & username"))


     const token = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT)

            
            const {password,isAdmin,...otherDetails} = user._doc
            res.cookie("access_token",token,{
                httpOnly: true,
            }).status(200).json({details:{...otherDetails}, isAdmin})
    } catch (error) {
        next(error)
    }
    }