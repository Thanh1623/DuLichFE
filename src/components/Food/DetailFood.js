import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './DetailFood.scss';
import { FaHome } from "react-icons/fa";
import { getFoodById } from "../../Service/userService";
import Header from "../Header/Header";


const DetailFood = (props) => {

    const params = useParams();
    const location = useLocation();
    const [detailFood, setDetailFood] = useState({});
    const idFood = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        fetchDetailFoodById();
    }, [])

    const fetchDetailFoodById = async () => {
        let data = await getFoodById(idFood);
        if (data && data.code === 201) {
            setDetailFood(data.result)
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

    console.log(detailFood)

    return (
        <>
            <div className="detail-food-container container">

                <div className="detail-food-home">
                    <FaHome className="home"
                        onClick={() => navigate('/')}
                    />
                </div>
                <div className="detail-food-title">
                    {detailFood.title}
                </div>
                <hr />
                <div className="detail-food-time">
                    {detailFood.opening_hours} to {detailFood.closing_time}
                </div>
                <div className="detail-food-description">
                    <div className="DesImg" dangerouslySetInnerHTML={{ __html: detailFood.description}}>
                    </div>
                </div>
                <div className="detail-food-description">
                    <div dangerouslySetInnerHTML={{ __html: detailFood.map }}>
                    </div>
                </div>

                <div className="detail-food-date">
                    {convertToDate(detailFood.created_at)}
                </div>
            </div>
        </>
    )
}

export default DetailFood;