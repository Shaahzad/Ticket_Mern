import React, { useContext, useState } from 'react'
import "./header.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBed, faCalendarDay, faCalendarDays, faCar, faPerson, faPlane, faTaxi} from "@fortawesome/free-solid-svg-icons"
import {DateRange} from "react-date-range"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import { useNavigate} from "react-router-dom"
import { searchContext } from '../../context/Searchcontext'
import { AuthContext } from '../../context/Authcontext'




const Header = ({type}) => {
  const navigate = useNavigate()
  const [Destination,setDestination] = useState("")
  const [open,setopen] = useState(false)
  const [dates, setdates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
const [openoption,setopenoption] = useState(false)
const [options,setoptions] = useState({
  adult:1,
  children: 0,
  room: 1
})
const {dispatch} = useContext(searchContext)

const Handelsearch = ()=>{
  dispatch({type: "NEW_SEARCH", payload: {Destination,dates,options}})
navigate("/hotels", {state:{Destination,dates,options}})
}

const handeloption = (name,operation)=>{
setoptions(prev=>{
  return{
    ...prev,
    [name]: operation === "i" ? options[name] + 1 : options[name] - 1
  }
})
}

const {user} = useContext(AuthContext)



  return (
    <div className='header'>
      <div className={type === "list" ? "headercontainer listmode" : "headercontainer"}>
        <div className="headerlist">
            <div className="headerlistitem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
            </div>
            <div className="headerlistitem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
            </div>
            <div className="headerlistitem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
            </div>
            <div className="headerlistitem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
            </div>
            <div className="headerlistitem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxi</span>
            </div>
        </div>
        {type !== "list" && 
     <>   
        <h1 className="headertitle">A lifetime of Discounts? It's Genius</h1>
        <p className="headerdesc">
          Get Rewarded For your travel - unlock instant savings of 10% or more with a free booking
          account
        </p>
{     !user &&   <button className='headerbtn'>Sign in / Register</button>}
        <div className="headersearch">
          <div className="headersearchitem">
            <FontAwesomeIcon icon={faBed} className='headerIcon'/>
            <input type="text" placeholder='where are you going?' onChange={e=>setDestination(e.target.value)} className='headersearchinput'/>
          </div>
          <div className="headersearchitem">
            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
            <span onClick={()=> setopen(!open)} className='headersearchtext'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to 
            ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
            {open && 
            < DateRange
  editableDateInputs={true}
  onChange={item => setdates([item.selection])}
  moveRangeOnFirstSelection={false}
  minDate={new Date()}
  ranges={dates}
  className='date'
/>
            }
          </div>
          <div className="headersearchitem">
            <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
            
            <span onClick={()=> setopenoption(!openoption)} className='headersearchtext'>{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
          
            { openoption && <div className="options">
              <div className="optionitem">
                <span className="optiontext">Adult</span>
                <div className="optioncounter">
                <button  disabled={options.adult <= 1}
                className="optioncounterbutton" onClick={()=>handeloption("adult","d")}>-</button>
                <span className="optioncounternumber">{options.adult}</span>
                <button  className="optioncounterbutton" onClick={()=>handeloption("adult","i")}>+</button>
                </div>
              </div>
              <div className="optionitem">
                <span className="optiontext">Children</span>
                <div className="optioncounter">
                <button  disabled={options.children <= 1}
                className="optioncounterbutton" onClick={()=>handeloption("children","d")}>-</button>
                <span className="optioncounternumber">{options.children}</span>
                <button className="optioncounterbutton" onClick={()=>handeloption("children","i")}>+</button>
                </div>
              </div>
              <div className="optionitem">
                <span className="optiontext">Room</span>
                <div className="optioncounter">
                <button  disabled={options.room <= 1}
                className="optioncounterbutton" onClick={()=>handeloption("room","d")}>-</button>
                <span className="optioncounternumber">{options.room}</span>
                <button className="optioncounterbutton" onClick={()=>handeloption("room","i")}>+</button>
                </div>
              </div>
            </div>
            }
          </div>
          <div className="headersearchitem">
            <button className='headerbtn' onClick={Handelsearch}>Search</button>
          </div>
        </div>
        </>
        }
      </div>
    </div>
  )
}

export default Header