import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './DetailHome.scss';
import { FaHome } from "react-icons/fa";
import { getDiscoverById, getFoodById, getHomeById } from "../../Service/userService";


const DetailHome = (props) => {

    const params = useParams();
    const location = useLocation();
    const [detailHome, setDetailHome] = useState({});
    const idHome = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        fetchDetailHomeById();
    }, [])

    const fetchDetailHomeById = async () => {
        let data = await getHomeById(idHome);
        if (data && data.code === 201) {
            setDetailHome(data.result)
        }

    }
    const convertToDate = (isoTimestamp) => {
        let date = new Date(isoTimestamp);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return `${year}-${month}-${dt}`;
    };

    const handleBookTour = () => {
        navigate('/bookingTour', { state: { listDetailDiscover: detailHome } })
    }

    console.log(detailHome)

    return (
        <>
            <div className="detail-discover-container container">

                <div className="detail-discover-home">
                    <FaHome className="home"
                        onClick={() => navigate('/')}
                    /> <span className="text-discover" onClick={() => navigate('/homeStay')}>&nbsp;&lt;Nghỉ Dưỡng</span>
                </div>
                <div className="detail-discover-title">
                    {detailHome.title}
                </div>
                <hr />
                <div className="detail-discover-time">
                    {detailHome.price}$ for 1 day
                </div>
                <div className="detail-discover-description">
                    <div className="DesImg" dangerouslySetInnerHTML={{ __html: detailHome.ContentHTML}}>
                    </div>
                </div>
                <div className="detail-discover-description">
                    <div dangerouslySetInnerHTML={{ __html: detailHome.map}}>
                    </div>
                </div>
                <div className="detail-discover-date">
                    {convertToDate(detailHome.created_at)}
                </div>
                <div className="book-tour">
                    <button className="btn button"
                        onClick={() => handleBookTour()}
                    >Book tour</button>
                </div>
            </div>
        </>
    )
}

export default DetailHome;