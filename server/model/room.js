
import express from "express"
import mongoose from "mongoose"

const Roomschema = new mongoose.Schema({
    Title:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    maxPeople:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    roomNumber:[{number: Number, unavailableDates: {type: [Date]}}]
},{timestamps: true})

export default mongoose.model("Room", Roomschema)