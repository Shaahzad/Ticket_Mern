import { useEffect, useState } from "react"
import axios from "axios"
const useFetch = (url)=>{
const [data,setdata] = useState([])
const [loading,setloading] = useState(false)
const [error,seterror] = useState(false)

useEffect(()=>{
const fetchData = async ()=>{
    setloading(true)
    try {
        const res = await axios.get(url)
        setdata(res.data)
    
    } catch (error) {
        seterror(error)
    }
    setloading(false)
}
fetchData()
},[url])

const refetch = async ()=>{
    setloading(true)
    try {
        const res = await axios.get(url)
        setdata(res.data)
    
    } catch (error) {
        seterror(error)
    }
    setloading(false)
}
return {data,loading,error,refetch}
}

export default useFetch