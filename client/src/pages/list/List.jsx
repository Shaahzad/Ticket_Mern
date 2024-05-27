import React, { useState } from 'react'
import Header from '../../components/header/Header'
import Navbar from "../../components/navbar/Navbar"
import "./list.css"
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import Searchitem from '../../components/searchitem/Searchitem'
import useFetch from "../../fetch/usefetch.js"

const List = () => {
  const location = useLocation()
  const [Destination,setDestination] = useState(location.state.Destination)
  const [dates,setdates] = useState(location.state.dates)
  const [options,setoptions] = useState(location.state.options)
  const [opencalender,setopencalender] = useState(false)
  const [min,setmin] = useState(undefined)
  const [max,setmax] = useState(undefined)
  let api;
  
 if(min === undefined && max === undefined){
  api = `http://localhost:9000/api/hotels?city=${Destination}`
 }else{
  api = `http://localhost:9000/api/hotels?city=${Destination}&min=${min}&max=${max}`
 }
 const {data,error,loading,refetch} = useFetch(api)

const handelclick = ()=>{
  refetch()
}
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listwrapper">
          <div className="listsearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsitem">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={Destination}/>
            </div>
            <div className="lsitem">
              <label htmlFor="">Check-In date</label>
              <span onClick={()=> setopencalender(!opencalender)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to 
            ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
            {opencalender && 
            < DateRange
            editableDateInputs={true}
            onChange={item => setdates([item.selection])}
            minDate={new Date()}
            ranges={dates}
            />
            }
            </div>
            <div className="lsitem">
              <label htmlFor="">Options</label>
              <div className="isoptions">
              <div className="lsoptionitem">
                <span className="isoptiontext">
                  Min Price <small>per night</small>
                </span>
                <input type="number" onChange={e=>setmin(e.target.value)} className='isoptioninput' />
              </div>
              <div className="lsoptionitem">
                <span className="isoptiontext">
                  Max Price <small>per night</small>
                </span>
                <input type="number" onChange={e=>setmax(e.target.value)} className='isoptioninput' />
              </div>
              <div className="lsoptionitem">
                <span className="isoptiontext">
                  Adult 
                </span>
                <input type="number" min={1} className='isoptioninput' placeholder={options.adult}/>
              </div>
              <div className="lsoptionitem">
                <span className="isoptiontext">
                  Children 
                </span>
                <input type="number" min={0} className='isoptioninput' placeholder={options.children}/>
              </div>
              <div className="lsoptionitem">
                <span className="isoptiontext">
                  Room 
                </span>
                <input type="number" min={1} className='isoptioninput' placeholder={options.room}/>
              </div>
              </div>
            </div>
            <button onClick={handelclick}>Search</button>
          </div>
          <div className="listResult">
{loading ? "loading" : <>
{data.map(item=>(
<Searchitem key={item._id} item={item} />
))}

</>}           

          </div>
        </div>
      </div>
    </div>
  )
}

export default List