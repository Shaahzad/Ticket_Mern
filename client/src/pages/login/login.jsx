import { useContext, useState } from "react"
import {AuthContext} from "../../context/Authcontext"
import "./login.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [credentials,setcredentials] = useState({
        name: undefined,
        password: undefined
    })

const {loading,error,dispatch} = useContext(AuthContext)

const navigate = useNavigate()
const handelchange = (e)=>{
setcredentials((prev)=> ({...prev, [e.target.id] : e.target.value}))
}


const handelCLick = async (e)=>{
e.preventDefault()
dispatch({type: "LOGIN_START"})
try {
    const res = await axios.post("https://ticket-mern-back.vercel.app/api/auth/login", credentials,{withCredentials: true})
    console.log(res)
    dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
    navigate("/")
} catch (error) {
    dispatch({type: "LOGIN_FAILED", payload: error.response.data})
    console.log(error)
}
}

  return (
    <div className="login">
   <div className="lcontainer">
    <input type="text" id="name" onChange={handelchange} className="linput"  placeholder="username"/>
    <input type="password" id="password" onChange={handelchange} className="linput"  placeholder="password"/>
    <button disabled={loading} onClick={handelCLick} className="lbutton">login</button>
    {error && <span>{error.message}</span>}
   </div>
    </div>
  )
}

export default Login