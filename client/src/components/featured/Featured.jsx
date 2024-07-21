import useFetch from "../../fetch/usefetch"
import "./feature.css"
const Featured = () => {

const {data,error,loading} = useFetch("https://ticket-mern-back.vercel.app/api/hotels/countbyCity?cities=karachi,lahore,islamabad")
console.log(data)



  return (
    <div className='featured'>
      {loading ? "loading please" :
<>
<div className="featureditem">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsJTf-bcAVzE9JwE_vgv8sdCZi5wrO0v-5w&s" alt="" className="featuredimg" />
    <div className="featuretitles">
    <h1>Karachi</h1>
    <h2>{data[0]} Property</h2>
    </div>
</div>
<div className="featureditem">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsJTf-bcAVzE9JwE_vgv8sdCZi5wrO0v-5w&s" alt="" className="featuredimg" />
    <div className="featuretitles">
    <h1>lahore</h1>
    <h2>{data[1]} Property</h2>
    </div>
</div>
<div className="featureditem">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsJTf-bcAVzE9JwE_vgv8sdCZi5wrO0v-5w&s" alt="" className="featuredimg" />
    <div className="featuretitles">
    <h1>islamabad</h1>
    <h2>{data[2]} Property</h2>
    </div>
</div>
</>   }
    </div>
  )
}

export default Featured