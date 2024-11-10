import { useEffect, useState } from 'react';
import bistro from '../../assets/bistro.jpg';
import './Food.scss'
import { getAllFoods, getAllFoodsPaginate } from '../../Service/apiServices';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { searchFood } from '../../Service/userService';


const Food = (props) => {
    const [listFoodUser, setListFoodUser] = useState([]);
    const navigate = useNavigate();
    const LIMIT = 3;

    const [pageCount, setPageCount] = useState(0);
    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);

    useEffect(() => {
        fetchAllFoodUser(1)
    }, [])

    useEffect(() => {
        if (inputSearch === '') {
            fetchAllFoodUser(1);
            setSearch(false);
        }
    }, [inputSearch])

    const fetchAllFoodUser = async (page) => {
        let data = await getAllFoodsPaginate(page, LIMIT);
        if (data && data.code === 201) {
            setListFoodUser(data.result);
            setPageCount(data.totalpage);
        }
    }
    const handlePageClick = (event) => {

        if (!search) {
            fetchAllFoodUser(+event.selected + 1);
        }
        if (search) {
            handleSearchFood(+event.selected + 1)
        }

        // setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };
    const handleSearchFood = async (page) => {
        if (inputSearch) {
            let res = await searchFood(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListFoodUser(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
            }
        }
        if (!inputSearch) {
            setSearch(false);
            fetchAllFoodUser(1)
        }
    }

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
                        <div className="FeeType list-group-item list-group-item-action">
                            <div className="input-group">
                                <div className="form-outline" data-mdb-input-init>
                                    <input id="search-input" type="search" className="form-control"
                                        value={inputSearch}
                                        onChange={(event) => setInputSearch(event.target.value)}
                                    />
                                    <label className="form-label" for="form1">Search</label>
                                </div>
                                <button id="search-button" type="button" className="btn btn-primary"
                                    onClick={() => handleSearchFood()}
                                >
                                    <i className="fas fa-search"></i>
                                </button>
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
                                                <img src={`data:image/jpeg;base64,${item.cuisines_image_base64}`} className="img-fluid rounded-start" alt="..." />
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
                        <div className="user-pagination">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            // forcePage={currentPage - 1}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Food;