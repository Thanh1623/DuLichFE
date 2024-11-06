import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './DetailShopping.scss';
import { FaHome } from "react-icons/fa";
import { getShoppingById } from "../../Service/userService";


const DetailShopping = (props) => {

    const params = useParams();
    const location = useLocation();
    const [detailShopping, setDetailShopping] = useState({});
    const idShopping = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        fetchDetailShoppingById();
    }, [])

    const fetchDetailShoppingById = async () => {
        let data = await getShoppingById(idShopping);
        if (data && data.code === 201) {
            setDetailShopping(data.result)
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
        navigate('/bookingTour', { state: { listDetailDiscover: detailShopping } })
    }

    console.log(detailShopping)

    return (
        <>
            <div className="detail-discover-container container">

                <div className="detail-discover-home">
                    <FaHome className="home"
                        onClick={() => navigate('/')}
                    /> <span className="text-discover" onClick={() => navigate('/shopping')}>&nbsp;&lt;Mua sắm và giải trí</span>
                </div>
                <div className="detail-discover-title">
                    {detailShopping.title}
                </div>
                <hr />
                <div className="detail-discover-time">
                    {detailShopping.type}
                </div>
                <div className="detail-discover-time">
                    {detailShopping.opening_hours} to {detailShopping.closing_time}
                </div>
                
                <div className="detail-discover-description">
                    <div className="DesImg" dangerouslySetInnerHTML={{ __html: detailShopping.ContentHTML, height: '100px' }}>
                    </div>
                </div>

                <div className="detail-discover-description">
                    <div dangerouslySetInnerHTML={{ __html: detailShopping.map}}>
                    </div>
                </div>
                
                <div className="detail-discover-date">
                    {convertToDate(detailShopping.created_at)}
                </div>
                {/* <div className="book-tour">
                    <button className="btn button"
                        onClick={() => handleBookTour()}
                    >Book tour</button>
                </div> */}
            </div>
        </>
    )
}

export default DetailShopping;