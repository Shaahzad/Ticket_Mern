import React from 'react'
import "./propertylist.css"
import useFetch from '../../fetch/usefetch'
const Propertylist = () => {

    const {data,error,loading} = useFetch("https://ticket-mern-back.vercel.app/api/hotels/countbyType")
 
    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsJTf-bcAVzE9JwE_vgv8sdCZi5wrO0v-5w&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsJTf-bcAVzE9JwE_vgv8sdCZi5wrO0v-5w&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsJTf-bcAVzE9JwE_vgv8sdCZi5wrO0v-5w&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsJTf-bcAVzE9JwE_vgv8sdCZi5wrO0v-5w&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsJTf-bcAVzE9JwE_vgv8sdCZi5wrO0v-5w&s"
    ]

  return (
    <div className='plist'>
        {loading ? "loading" :
        <>
    {data && images.map((img,i)=>(
        <div className="plistitem" key={i}>
        <img src={img} alt="" className='plistimg'/>
        <div className="plisttitle">
            <h1>{data[i]?.type}</h1>
            <h2>{data[i]?.count} {data[i]?.type}</h2>
        </div>
    </div>
    ))}
    </>
    }
        </div>  
  )
}

export default Propertylist