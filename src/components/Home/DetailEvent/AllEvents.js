import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWalking } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import bistro from '../../../assets/bistro.jpg'
import { getAllTours } from "../../../Service/apiServices";

const AllEvents = () => {
    const [listDiscoverUser, setListDiscoverUser] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllDiscoverUser()
    }, [])

    const fetchAllDiscoverUser = async () => {
        let data = await getAllTours();
        if (data && data.code === 201) {
            setListDiscoverUser(data.result)
        }
    }
    return (
        <div className="discover-container container">
            <div className="header-discover">
                <div>Trang chủ</div>
                <div className='text-success'>Kết quả: {listDiscoverUser.length}</div>
            </div>
            <div className='food-content-right'>
                {
                    listDiscoverUser && listDiscoverUser.length > 0 &&
                    listDiscoverUser.map((item, index) => {
                        return (
                            <div className="card mb-3 content-right " key={`discover-${index}`}>
                                <div className="row g-0" >
                                    <div className="col-md-4">
                                        <img src={bistro} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8 content"
                                        onClick={() => navigate(`/discover/${item.tour_id}`)}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text"> <FaMapMarkedAlt /> {item.address}</p>
                                            <p className="card-text"> <FaWalking /> {item.vehicle}</p>
                                            <p className="card-text text-end">
                                                <small className="text-muted text-time">
                                                    {item.price}$ for {item.members} members
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