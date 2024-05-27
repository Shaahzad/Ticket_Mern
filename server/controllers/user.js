import User from "../model/user.js"


    export const updateUser = async(req,res)=>{
        try {
            const updateuser = await User.findByIdAndUpdate(req.params.id, {$set : req.body},{new: true})
            res.status(200).json(updateuser)
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        }
    }

    export const deleteUser = async(req,res)=>{
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Hotel Deleted")
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        }
    }

    export const getUser = async(req,res)=>{
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Hotel Deleted")
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        }
    }

    export const getallUser = async(req,res,next)=>{
        try {
            const getalluser = await User.find()
            res.status(200).json(getalluser)
        } catch (error) {
            next(error)
        }
    }
