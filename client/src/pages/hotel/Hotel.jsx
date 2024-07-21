import React, { useContext, useState } from 'react'
import "./hotel.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import Maillist from "../../components/mailist/maillist"
import Footer from "../../components/footer/footer"
import useFetch from "../../fetch/usefetch.js"
import {  useLocation, useNavigate } from 'react-router-dom'
import { searchContext } from '../../context/Searchcontext'
import { AuthContext } from '../../context/Authcontext.jsx'
import Reserve from '../../components/reserve/Reserve.jsx'
const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [slideNumber, setslideNumber] = useState(0)
  const [open,setopen] = useState(false)
  const [openmodal,setopenmodal] = useState(false)

  const {data,loading,error,} = useFetch(`https://ticket-mern-back.vercel.app/api/hotels/find/${id}`)

  const {dates,options} = useContext(searchContext)
  console.log(options)
   console.log(dates)
  const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000
  function dayDifference(date1,date2){
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime())
    const diffDays = Math.ceil(timeDiff/MILLISECONDS_PER_DAY)
    return diffDays
  }
 const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate)
  const handelopen = (i)=>{
    setslideNumber(i)
    setopen(true)
    }
    const handelarrow = (Direction) =>{
  let newslideNumber;
      if(Direction === "L"){
        newslideNumber = slideNumber === 0 ? 5 : slideNumber - 1
      }else{
        newslideNumber = slideNumber === 5 ? 0 : slideNumber + 1
      }
      setslideNumber(newslideNumber)
    }
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const handelclick = ()=>{
      if(user){
        setopenmodal(true)
    }else{
      navigate("/login")
    }
    }
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
     {loading ? "loading" :  <div className="hotelContainer">
{  open &&   <div className="slider">
  <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={()=>setopen(!open)}/>
  <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={()=>handelarrow("L")}/>
  <div className="sliderwrapper">
    <img src={data.photos[slideNumber]} alt="" className="sliderimg" />
  </div>
  <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={()=>handelarrow("R")}/>
</div> }       
 <div className="hotelWrapper">
          <button className="booknow">Reserve or Book Now!</button>
          <h1 className="hoteltitle">{data.name}</h1>
          <div className="hoteladdress">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>{data.location}</span>
          </div>
          <span className="hotelDistance">
            Excellent Location - {data.distance} from center
          </span>
          <span className="hotelpricehighlight">
            Book a Stay over ${data.cheapestprice} at this property and get a free airport taxi
          </span>
          <div className="hotelimages">
            {data.photos?.map((photos,i)=>(
<div className="photoWrapper">
  <img onClick={()=>handelopen(i)} src={photos} alt="" className="hotelimg" />
</div>
  ))}
          </div>
          <div className="hoteldetail">
            <div className="hotelDetailtext">
              <h1 className="hotelDeatilTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
              </div>
              <div className="hotelDetailprice">
              <h1 className="hotelrightTitle">perfect For a {days}-night stay</h1>
              <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, ducimus!</span>
              <h2><b>${days * data.cheapestprice * options.room}</b> ({days} nights)</h2>
              <button onClick={handelclick}>Reserve or Book Now!</button>
              </div>
          </div>
        </div>
        <Maillist/>
        <Footer/>
      </div>
      }
       {openmodal && <Reserve setopenmodal={setopenmodal} hotelId={id}/>}
    </div>
  )
}

export default Hotel