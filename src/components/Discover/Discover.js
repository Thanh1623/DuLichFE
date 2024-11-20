import { useNavigate } from 'react-router-dom';
import bistro from '../../assets/bistro.jpg'
import './Discover.scss'
import { useEffect, useState } from 'react';
import { getAllTours, getAllToursPaginate } from '../../Service/apiServices';
import { FaWalking } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { searchDiscover } from '../../Service/userService';
import ReactPaginate from "react-paginate";
import { toast } from 'react-toastify';

const Discover = () => {

    const [listDiscoverUser, setListDiscoverUser] = useState([]);
    const navigate = useNavigate();
    const LIMIT = 3;
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(0);
    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);


    useEffect(() => {
        fetchAllDiscoverUser(1)
    }, [])
    useEffect(() => {
        if (inputSearch === '') {
            fetchAllDiscoverUser(1);
            setSearch(false);
            setCurrentPage(1)
        }
    }, [inputSearch])

    const fetchAllDiscoverUser = async (page) => {
        let res = await getAllToursPaginate(page, LIMIT);
        if (res.code === 201) {
            setListDiscoverUser(res.result);
            setPageCount(res.totalpage);
        }
    }

    const handleSearchDiscover = async (page) => {
        if (inputSearch) {
            let res = await searchDiscover(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListDiscoverUser(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
            }
            if (res && res.code !== 201) {
                setListDiscoverUser(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
                toast.error(res.message)
            }
        }
        if (!inputSearch) {
            setSearch(false);
            fetchAllDiscoverUser(1)
            setCurrentPage(1)
        }
    }

    const handlePageClick = (event) => {

        if (!search) {
            fetchAllDiscoverUser(+event.selected + 1);
        }
        if (search) {
            handleSearchDiscover(+event.selected + 1)
        }

        setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };

    console.log(listDiscoverUser);

    return (
        <div className="discover-container container">
            <div className="header-discover">
                <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Trang chủ</div>
                <div>Kết quả: {listDiscoverUser !== undefined ? listDiscoverUser.length : 0}</div>

            </div>
            <div className="content-discover">
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
                                <label className="form-label" htmlFor="form1">Search</label>
                            </div>
                            <button id="search-button" type="button" className="btn btn-primary"
                                onClick={() => handleSearchDiscover()}
                            >
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='food-content-right'>
                    {
                        listDiscoverUser && listDiscoverUser.length > 0
                            ?
                            listDiscoverUser.map((item, index) => {
                                return (
                                    <div className="card mb-3 content-right " key={`discover-${index}`}>
                                        <div className="row g-0" >
                                            <div className="col-md-4">
                                                <img src={`data:image/jpeg;base64,${item.tour_image_base64}`} className="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div className="col-md-8 content"
                                                onClick={() => navigate(`/discover/${item.tour_id}`)}
                                            >
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <p className="card-text"> <FaMapMarkedAlt /> {item.address}</p>
                                                    <p className="card-text"> <FaWalking /> {item.vehicle}</p>
                                                    <p className="card-text text-end">
                                                        <small className="text-muted text-time">
                                                            {item.price}$ for {item.members} members
                                                        </small>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div>
                                <span>Không có dữ liệu</span>
                            </div>
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
                            forcePage={currentPage - 1}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Discover;