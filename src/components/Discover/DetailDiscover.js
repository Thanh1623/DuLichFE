import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './DetailDiscover.scss';
import { FaHome } from "react-icons/fa";
import { getDiscoverById, getFoodById } from "../../Service/userService";


const DetailDiscover = (props) => {

    const params = useParams();
    const location = useLocation();
    const [detailDiscover, setDetailDiscover] = useState({});
    const idDiscover = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        fetchDetailDiscoverById();
    }, [])

    const fetchDetailDiscoverById = async () => {
        let data = await getDiscoverById(idDiscover);
        if (data && data.code === 201) {
            setDetailDiscover(data.result)
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
        navigate('/bookingTour', { state: { listDetailDiscover: detailDiscover } })
    }

    console.log(detailDiscover)

    return (
        <>
            <div className="detail-discover-container container">

                <div className="detail-discover-home">
                    <FaHome className="home"
                        onClick={() => navigate('/')}
                    /> <span className="text-discover" onClick={() => navigate('/discover')}>&nbsp;&lt;Khám phá</span>
                </div>
                <div className="detail-discover-title">
                    {detailDiscover.title}
                </div>
                <hr />
                <div className="detail-discover-time">
                    {detailDiscover.price}$ for {detailDiscover.members} members
                </div>
                <div className="detail-discover-description">
                    <div className="DesImg" dangerouslySetInnerHTML={{ __html: detailDiscover.description, height: '100px' }}>
                    </div>
                </div>
                <div className="detail-discover-date">
                    {convertToDate(detailDiscover.created_at)}
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

export default DetailDiscover;