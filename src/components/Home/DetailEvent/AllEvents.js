import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaWalking } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import bistro from '../../../assets/bistro.jpg'
import { getAllEvents, getAllEventsPaginate, getAllTours } from "../../../Service/apiServices";
import './AllEvents.scss';
import ReactPaginate from "react-paginate";
import { searchEvent } from "../../../Service/userService";
import { toast } from "react-toastify";


const AllEvents = () => {
    const [listAllEvent, setListAllEvent] = useState([]);
    const navigate = useNavigate();
    const LIMIT = 3;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);

    useEffect(() => {
        fetchAllEvent(1)
    }, [])
    useEffect(() => {
        if (inputSearch === '') {
            fetchAllEvent(1);
            setSearch(false);
            setCurrentPage(1)
        }
    }, [inputSearch])

    const fetchAllEvent = async (page) => {
        let data = await getAllEventsPaginate(page, LIMIT);
        if (data && data.code === 201) {
            setListAllEvent(data.result);
            setPageCount(data.totalpage);
        }
    }
    const handlePageClick = (event) => {
        if (!search) {
            fetchAllEvent(+event.selected + 1);
        }
        if (search) {
            handleSearchEvent(+event.selected + 1)
        }

        setCurrentPage(+event.selected + 1);
    };
    const handleSearchEvent = async (page) => {
        if (inputSearch) {
            let res = await searchEvent(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListAllEvent(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
            }
            if (res && res.code !== 201) {
                setListAllEvent(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
                toast.error(res.message);
            }
        }
        if (!inputSearch) {
            setSearch(false);
            fetchAllEvent(1);
            setCurrentPage(1)
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
        <div className="event-all-container container">
            <div className="header-event-all pt-3 pb-3">
                <FaHome className="home" style={{ cursor: 'pointer', fontSize: '26px' }}
                    onClick={() => navigate('/')} />
                <div>Kết quả: {listAllEvent !== undefined ? listAllEvent.length : 0}</div>
            </div>
            <div className="list-group" style={{ maxWidth: '360px' }}>
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
                            onClick={() => handleSearchEvent()}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className='event-content-right'>
                {
                    listAllEvent && listAllEvent.length > 0 ?
                        listAllEvent.map((item, index) => {
                            return (
                                <div className="card mb-3 content-right " key={`event-all-${index}`}>
                                    <div className="row g-0" >
                                        <div className="col-md-4">
                                            <img src={`data:image/jpeg;base64,${item.eventimg_url}`} className="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div className="col-md-8 content"
                                            onClick={() => navigate(`/events/${item.event_id}`)}
                                        >
                                            <div className="card-body">
                                                <h5 className="card-title">{item.title}</h5>
                                                <p className="card-text"> <FaMapMarkedAlt /> {item.description}</p>
                                                {/* <p className="card-text"> <FaWalking /> {item.vehicle}</p> */}
                                                <p className="card-text text-end">
                                                    <small className="text-muted text-time">
                                                        {`${convertToDate(item.opening_hours_event)} đến ${convertToDate(item.closing_time_event)}`}
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
    )
}
export default AllEvents;