
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getBookTourHomePaginate, HomePaginate } from "../../../../Service/apiServices";
import ModalBookHome from "./ModalBookHome";



const ManageBookingHome = () => {

    const LIMIT = 6;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalViewFeedWeb, setShowModalViewFeedWeb] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listBookTour, setListBookTour] = useState([]);
    const [dataView, setDataView] = useState({})

    useEffect(() => {
        fetchListBookHome(1)
    }, [])

    const fetchListBookHome = async (page) => {
        let res = await HomePaginate(page, LIMIT);
        if (res && res.code === 201) {
            setListBookTour(res.result);
            setPageCount(res.totalpage);
        }
    }

    const handlePageClick = (event) => {
        fetchListBookHome(+event.selected + 1)
        setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };

    const handleClickBtnView = (feedback) => {
        setDataUpdate(feedback);
        setShowModalViewFeedWeb(true);

    }
    console.log(listBookTour)

    return (
        <>
            <div className="admin-food-container container">
                <div className="title">
                    Book Home
                </div>
                <table className="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Name home</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listBookTour && listBookTour.length > 0
                                ?
                                listBookTour.map((item, index) => {
                                    return (
                                        <tr key={`table-bookHome-${index}`}>
                                            <td>{item.booking_id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.homestay_name}</td>
                                            <td>{item.status_homestay}</td>
                                            <td>
                                                <button className="btn btn-outline-success mx-1 my-1"
                                                    onClick={() => handleClickBtnView(item)}
                                                >Update</button>
                                            </td>
                                        </tr>
                                    )

                                })
                                :
                                <tr>
                                    <td colSpan="5">Not found data</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
            <ModalBookHome
                dataUpdate={dataUpdate}
                setShow={setShowModalViewFeedWeb}
                show={showModalViewFeedWeb}
                fetchListBookHome={fetchListBookHome}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
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
        </>
    )
}

export default ManageBookingHome;

