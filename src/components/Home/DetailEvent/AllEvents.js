import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaWalking } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import bistro from '../../../assets/bistro.jpg'
import { getAllEvents, getAllTours } from "../../../Service/apiServices";
import './AllEvents.scss';

const AllEvents = () => {
    const [listAllEvent, setListAllEvent] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllEvent()
    }, [])

    const fetchAllEvent = async () => {
        let data = await getAllEvents();
        if (data && data.code === 201) {
            setListAllEvent(data.result)
        }
    }
    return (
        <div className="event-all-container container">
            <div className="header-event-all pt-3 pb-3">
                <FaHome className="home" style={{cursor: 'pointer', fontSize: '26px'}}
                    onClick={() => navigate('/')}/>
                <div className='text-success'>Kết quả: {listAllEvent.length}</div>
            </div>
            <div className='event-content-right'>
                {
                    listAllEvent && listAllEvent.length > 0 &&
                    listAllEvent.map((item, index) => {
                        return (
                            <div className="card mb-3 content-right " key={`event-all-${index}`}>
                                <div className="row g-0" >
                                    <div className="col-md-4">
                                        <img src={`data:image/jpeg;base64,${item.eventimg_url}`} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8 content"
                                        onClick={() => navigate(`/events/${item.event_id}`)}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text"> <FaMapMarkedAlt /> {item.description}</p>
                                            {/* <p className="card-text"> <FaWalking /> {item.vehicle}</p> */}
                                            <p className="card-text text-end">
                                                <small className="text-muted text-time">
                                                    {item.opening_hours_event} to {item.closing_time_event}
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default AllEvents;