import "./reserve.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import useFetch from "../../fetch/usefetch.js"
import { searchContext } from "../../context/Searchcontext.jsx"
import axios from "axios"  // Import axios if it's not already
import {useNavigate} from "react-router-dom"

const Reserve = ({ setopenmodal, hotelId }) => {
    const [selectedRoom, setSelectedRoom] = useState([])
    const { data, loading, error } = useFetch(`https://ticket-mern-back.vercel.app/api/hotels/room/${hotelId}`)
    const { dates } = useContext(searchContext)

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        let date = new Date(start.getTime())
        let Dates = []

        while (date <= end) {
            Dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }

        return Dates
    }

const allDates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate)

const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => allDates.includes(new Date(date).getTime()))
    return !isFound
}
    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRoom(checked ? [...selectedRoom, value] : selectedRoom.filter(item => item !== value))
    }
const navigate = useNavigate()
    const handleClick = async () => {
        try {
            await Promise.all(selectedRoom.map((roomId) => {
                const res = axios.put(`https://ticket-mern-back.vercel.app/api/rooms/availability/${roomId}`, {dates: allDates})
                return res.data
            }))
            setopenmodal(false)
            alert("Rooms reserved successfully")
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="reserve">
            <div className="rcontainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rclose" onClick={() => setopenmodal(false)} />
                <span>Select your rooms</span>
                 { data.map((item) => (
                    <div className="rItem" key={item._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item?.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelectRooms">
                            {item.roomNumber.map((roomNumber) => (
                                <div className="room" key={roomNumber._id}>
                                    <label>{roomNumber.number}</label>
                                    <input type="checkbox" disabled={!isAvailable(roomNumber)} value={roomNumber._id} onChange={handleSelect} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">Reserve Now</button>
            </div>
        </div>
    )
}

export default Reserve
