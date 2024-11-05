import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getEventById, getNewsById } from "../../../Service/userService";
import './DetailEvent.scss';
import { FaHome } from "react-icons/fa";


const DetailEvent = (props) => {

    const params = useParams();
    const location = useLocation();
    const [detailEvent, setDetailEvent] = useState({});
    const idEvent = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        fetchDetailEventById();
    }, [])

    const fetchDetailEventById = async () => {
        let data = await getEventById(idEvent);
        if (data && data.code === 201) {
            setDetailEvent(data.result)
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

    console.log(detailEvent)

    return (
        <div className="detail-event-container container">
            <div className="detail-event-home">
                <FaHome className="home"
                    onClick={() => navigate('/')}
                />
            </div>
            <div className="detail-event-title">
                {detailEvent.title}
            </div>
            <hr />
            <div className="detail-event-description">
                <div className="DesImg" dangerouslySetInnerHTML={{ __html: detailEvent.description, height: '100px' }}>
                </div>
            </div>
            <div className="detail-event-date">
                {convertToDate(detailEvent.created_at)}
            </div>
        </div>
    )
}

export default DetailEvent;