import React from 'react'
import "./featureproperty.css"
import useFetch from '../../fetch/usefetch'
const Featureproperty = () => {

    const {data,error,loading} = useFetch("https://ticket-mern-back.vercel.app/api/hotels?featured=true&limit=4")

  return (
    <div className='fp'>
        {loading ? "loading" : <>
        {data.map((Item)=>(
                    <div className="fpitem" key={Item._id}>
                    <img src={Item.photos} alt="" className="fpimg" />
                    <span className="fpname">{Item.name}</span>
                    <span className="fpcity">{Item.city}</span>
                    <span className="fpprice">starting from {Item.cheapestprice}</span>
                    {Item.rating && <div className="fprating">
                        <button>{Item.rating}</button>
                        <span>Excellent</span>
                    </div>}
                </div>      
        ))}
</>
}
    </div>
  )
}

export default Featureproperty