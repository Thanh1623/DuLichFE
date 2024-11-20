import { useEffect, useState } from 'react';
import bistro from '../../assets/bistro.jpg';
import './Move.scss'
import { getAllFoods, getAllFoodsPaginate, getAllMovePaginate } from '../../Service/apiServices';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { searchFood, searchMove } from '../../Service/userService';
import { toast } from 'react-toastify';


const Move = (props) => {
    const [listMoveUser, setListMoveUser] = useState([]);
    const navigate = useNavigate();
    const LIMIT = 3;
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(0);
    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);

    useEffect(() => {
        fetchAllMoveUser(1)
    }, [])

    useEffect(() => {
        if (inputSearch === '') {
            fetchAllMoveUser(1);
            setSearch(false);
            setCurrentPage(1)

        }
    }, [inputSearch])

    const fetchAllMoveUser = async (page) => {
        let data = await getAllMovePaginate(page, LIMIT);
        if (data && data.code === 201) {
            setListMoveUser(data.result);
            setPageCount(data.totalpage);
        }
    }
    const handlePageClick = (event) => {

        if (!search) {
            fetchAllMoveUser(+event.selected + 1);
        }
        if (search) {
            handleSearchMove(+event.selected + 1)
        }

        setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };
    const handleSearchMove = async (page) => {
        if (inputSearch) {
            let res = await searchMove(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListMoveUser(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
            }
            if (res && res.code !== 201) {
                setListMoveUser(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
                toast.error(res.message)
            }
        }
        if (!inputSearch) {
            setSearch(false);
            fetchAllMoveUser(1);
            setCurrentPage(1)

        }
    }

    return (
        <>
            <div className="move-container container">
                <div className="header-move">
                    <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Trang chủ</div>
                    <div>Kết quả: {listMoveUser !== undefined ? listMoveUser.length : 0}</div>
                </div>
                <div className="content-move">
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
                                    onClick={() => handleSearchMove()}
                                >
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='move-content-right'>

                        {
                            listMoveUser && listMoveUser.length > 0
                                ?
                                listMoveUser.map((item, index) => {
                                    return (
                                        <div className="card mb-3 content-right " key={`move-${index}`}>
                                            <div className="row g-0" >
                                                <div className="col-md-4">
                                                    <img src={`data:image/jpeg;base64,${item.moves_image_base64}`} className="img-fluid rounded-start" alt="..." />
                                                </div>
                                                <div className="col-md-8 content"
                                                    onClick={() => navigate(`/move/${item.moves_id}`)}
                                                >
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.title}</h5>
                                                        <p className="card-text">{item.address}</p>
                                                        <p className="card-text text-end">
                                                            <small className="text-muted text-time">
                                                                {item.type_vehicle}
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
        </>
    )
}
export default Move;