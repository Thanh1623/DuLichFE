import { useNavigate } from 'react-router-dom';
import bistro from '../../assets/bistro.jpg'
// import './HomeStayUser.scss'
import { useEffect, useState } from 'react';
import { getAllHomeStayPaginate, getAllTours } from '../../Service/apiServices';
import { FaWalking } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { searchDiscover, searchHome } from '../../Service/userService';
import ReactPaginate from "react-paginate";
import './HomeStayUser.scss'


const HomeStayUser = () => {

    const [listHomesUser, setListHomesUser] = useState([]);
    const navigate = useNavigate();
    const LIMIT = 3;

    const [pageCount, setPageCount] = useState(0);

    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);


    useEffect(() => {
        fetchAllHomesUser(1)
    }, [])
    useEffect(() => {
        if (inputSearch === '') {
            fetchAllHomesUser(1);
            setSearch(false);
        }
    }, [inputSearch])

    const fetchAllHomesUser = async (page) => {
        let res = await getAllHomeStayPaginate(page, LIMIT);
        if (res.code === 201) {
            setListHomesUser(res.result);
            setPageCount(res.totalpage);
        }
    }

    const handleSearchHome = async (page) => {
        if (inputSearch) {
            let res = await searchHome(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListHomesUser(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
            }
        }
        if (!inputSearch) {
            setSearch(false);
            fetchAllHomesUser(1)
        }
    }

    const handlePageClick = (event) => {
        if (!search) {
            fetchAllHomesUser(+event.selected + 1);
        }
        if (search) {
            handleSearchHome(+event.selected + 1)
        }
        // setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };

    console.log(listHomesUser);

    return (
        <div className="home-container container">
            <div className="header-home">
                <div>Trang chủ</div>
                <div className='text-success'>Kết quả: {listHomesUser.length}</div>
            </div>
            <div className="content-home">
                <div className="list-group">
                    <button type="button" className="list-group-item list-group-item-action">A second item</button>
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
                    <div className="location list-group-item list-group-item-action">
                        <div className="title-location">
                            Loại địa điểm
                        </div>
                        <div className="content-location">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Checked checkbox
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="type list-group-item list-group-item-action">
                        <div className="title-location">
                            Loại hình du lịch
                        </div>
                        <div className="content-location">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Checked checkbox
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="FeeType list-group-item list-group-item-action">
                        <div className="title-location">
                            Loại phí
                        </div>
                        <div className="content-location">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
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
                                onClick={() => handleSearchHome()}
                            >
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='food-content-right'>
                    {
                        listHomesUser && listHomesUser.length > 0 &&
                        listHomesUser.map((item, index) => {
                            return (
                                <div className="card mb-3 content-right " key={`home-${index}`}>
                                    <div className="row g-0" >
                                        <div className="col-md-4">
                                            <img src={`data:image/jpeg;base64,${item.homestay_image_base64}`} className="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div className="col-md-8 content"
                                            onClick={() => navigate(`/homeStay/${item.homestay_id}`)}
                                        >
                                            <div className="card-body">
                                                <h5 className="card-title">{item.title}</h5>
                                                <p className="card-text"> <FaMapMarkedAlt /> {item.address}</p>
                                                <p className="card-text"> <FaWalking /> {+item.type_bed === 0 ? 'Hết phòng' : 'Còn phòng'}</p>
                                                <p className="card-text text-end">
                                                    <small className="text-muted text-time">
                                                        {item.price}$ for 1 day
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
    )
}

export default HomeStayUser;