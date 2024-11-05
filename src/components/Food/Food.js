import { useEffect, useState } from 'react';
import bistro from '../../assets/bistro.jpg';
import './Food.scss'
import { getAllFoods } from '../../Service/apiServices';
import { useNavigate } from 'react-router-dom';


const Food = (props) => {
    const [listFoodUser, setListFoodUser] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllFoodUser()
    }, [])

    const fetchAllFoodUser = async () => {
        let data = await getAllFoods();
        if (data && data.code === 201) {
            setListFoodUser(data.result)
        }
    }
    console.log(listFoodUser);

    return (
        <>
            <div className="food-container container">
                <div className="header-food">
                    <div>Trang chủ</div>
                    <div>Kết quả</div>
                </div>
                <div className="content-food">
                    <div className="list-group">
                        <div className="area list-group-item list-group-item-action">
                            <div className="title">
                                Khu vực
                            </div>
                            <div className="content-area">
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>
                        <div className="location area list-group-item list-group-item-action">
                            <div className="title-location">
                                Loại địa điểm
                            </div>
                            <div className="content-location">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Default checkbox
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label className="form-check-label" for="flexCheckChecked">
                                        Checked checkbox
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="type area list-group-item list-group-item-action">
                            <div className="title-location">
                                Loại hình du lịch
                            </div>
                            <div className="content-location">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Default checkbox
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label className="form-check-label" for="flexCheckChecked">
                                        Checked checkbox
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="FeeType area list-group-item list-group-item-action">
                            <div className="title-location">
                                Loại phí
                            </div>
                            <div className="content-location">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        Default checkbox
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label className="form-check-label" for="flexCheckChecked">
                                        Checked checkbox
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='food-content-right'>

                        {
                            listFoodUser && listFoodUser.length > 0 &&
                            listFoodUser.map((item, index) => {
                                return (
                                    <div className="card mb-3 content-right " key={`food-${index}`}>
                                        <div className="row g-0" >
                                            <div className="col-md-4">
                                                <img src={bistro} className="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div className="col-md-8 content" 
                                                onClick={() => navigate(`/food/${item.cuisines_id}`)}
                                            >
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <p className="card-text">{item.address}</p>
                                                    <p className="card-text text-end">
                                                        <small className="text-muted text-time">
                                                            {item.opening_hours} to {item.closing_time}
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
            </div>
        </>
    )
}
export default Food;