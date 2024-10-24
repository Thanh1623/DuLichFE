import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getNewsById } from "../../../Service/userService";
import './DetailEvent.scss';
import { FaHome } from "react-icons/fa";


const DetailEvent = (props) => {

    const params = useParams();
    const location = useLocation();
    const [detailNews, setDetailNews] = useState({});
    const idNews = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        fetchDetailNewsById();
    }, [])

    const fetchDetailNewsById = async () => {
        let data = await getNewsById(idNews);
        if (data) {
            setDetailNews(data)
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


    return (
        <div className="detail-news-container container">
            <div className="detail-news-home">
                <FaHome className="home"
                    onClick={() => navigate('/')}
                />
            </div>
            <div className="detail-news-title">
                {detailNews.title}
            </div>
            <hr />
            <div className="detail-news-description">
                <div className="DesImg" dangerouslySetInnerHTML={{ __html: detailNews.description, height: '100px' }}>
                </div>
            </div>
            <div className="detail-news-date">
                {convertToDate(detailNews.created_at)}
            </div>
        </div>
    )
}

export default DetailEvent;