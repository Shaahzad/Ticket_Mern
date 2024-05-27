import React from 'react'
import "./searchitem.css"
import { Link } from 'react-router-dom'
const Searchitem = ({item}) => {
  return (
    <div className='searchitem'>
     <img src={item.photos[0]} alt="" className="siimg" />
     <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance} from center</span>
        <span className="sitaxiop">free airport taxi</span>
        <span className="sisubtitle">
            studio aparment with Air conditioning
        </span>
        <span className="sifeature">
          {item.desc}
        </span>
        <span className="sicancelop">Free Cancelation</span>
        <span className="sicancelopsubtitle">
            you can cancel later, so lock in this great price today!
        </span>
     </div>
     <div className="sidetail">
{    item.rating && <div className="siRating">
        <span>Excellent</span>
        <button>{item.rating}</button>
     </div>
}     <div className="siDeatilText">
        <span className="siprice">${item.cheapestprice}</span>
        <span className="siTaxop">Include taxes and Fees</span>
        <Link to={`/hotels/${item._id}`}>
        <button className='sicheckbutton'>See availability</button>
        </Link>
     </div>
     </div>
    </div>
  )
}

export default Searchitem