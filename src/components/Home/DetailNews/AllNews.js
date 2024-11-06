import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaWalking } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import bistro from '../../../assets/bistro.jpg'
import { getAllEvents, getAllNews, getAllTours } from "../../../Service/apiServices";
import './AllNews.scss';

const AllNews = () => {
    const [listAllNews, setListAllNews] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllEvent()
    }, [])

    const fetchAllEvent = async () => {
        let data = await getAllNews();
        if (data && data.code === 201) {
            setListAllNews(data.result)
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
        <div className="news-all-container container">
            <div className="header-news-all pt-3 pb-3">
                <FaHome className="home" style={{ cursor: 'pointer', fontSize: '26px' }}
                    onClick={() => navigate('/')} />
                <div className='text-success'>Kết quả: {listAllNews.length}</div>
            </div>
            <div className='news-content-right'>
                {
                    listAllNews && listAllNews.length > 0 &&
                    listAllNews.map((item, index) => {
                        return (
                            <div className="card mb-3 content-right " key={`news-all-${index}`}>
                                <div className="row g-0" >
                                    <div className="col-md-4">
                                        <img src={`data:image/jpeg;base64,${item.news_image_base64}`} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8 content"
                                        onClick={() => navigate(`/news/${item.news_id}`)}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title">Title news: {item.title}</h5>
                                            {/* <p className="card-text"> <FaMapMarkedAlt /> {item.description}</p> */}
                                            {/* <p className="card-text"> <FaWalking /> {item.vehicle}</p> */}
                                            <p className="card-text text-end">
                                                <small className="text-muted text-time">
                                                    {convertToDate(item.created_at)}
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
export default AllNews;