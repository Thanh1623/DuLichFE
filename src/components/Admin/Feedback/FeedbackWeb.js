import { useEffect, useState } from "react";
import { getFeedbackWeb, getFeedbackWebPaginate } from "../../../Service/apiServices";
import ModalViewFeed from "./ModalFeedWeb";
import ReactPaginate from "react-paginate";



const FeedbackWeb = () => {

    const LIMIT = 6;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalViewFeedWeb, setShowModalViewFeedWeb] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listFeedbackWeb, setListFeedbackWeb] = useState([]);
    const [dataView, setDataView] = useState({})

    useEffect(() => {
        fetchListFeedbackWeb(1)
    }, [])

    const fetchListFeedbackWeb = async (page) => {
        let res = await getFeedbackWebPaginate(page, LIMIT);
        if (res && res.code === 201) {
            setListFeedbackWeb(res.result);
            setPageCount(res.totalpage);
        }
    }

    const handlePageClick = (event) => {
        fetchListFeedbackWeb(+event.selected + 1)
        setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };

    const handleClickBtnView = (feedback) => {
        setDataView(feedback);
        setShowModalViewFeedWeb(true);

    }

    return (
        <>
            <div className="admin-food-container container">
                <div className="title">
                    Feedback Website
                </div>
                <table className="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Feedback</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listFeedbackWeb && listFeedbackWeb.length > 0
                                ?
                                listFeedbackWeb.map((item, index) => {
                                    return (
                                        <tr key={`table-fb-${index}`}>
                                            <td>{item.feedback_id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.content}</td>
                                            <td>
                                                <button className="btn btn-primary mx-1 my-1"
                                                    onClick={() => handleClickBtnView(item)}
                                                >View</button>
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
            <ModalViewFeed
                dataView={dataView}
                setShow={setShowModalViewFeedWeb}
                show={showModalViewFeedWeb}
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

export default FeedbackWeb;