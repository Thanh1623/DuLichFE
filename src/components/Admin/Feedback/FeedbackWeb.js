import { useEffect, useState } from "react";
import { getFeedbackWeb } from "../../../Service/apiServices";



const FeedbackWeb = () => {

    const LIMIT_USER = 6;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listFeedbackWeb, setListFeedbackWeb] = useState([]);
    const [dataView, setDataView] = useState({})

    useEffect(() => {
        fetchListFeedbackWeb()
    }, [])

    const fetchListFeedbackWeb = async () => {
        let res = await getFeedbackWeb();
        if (res) {
            setListFeedbackWeb(res);
        }
    }

    const handleClickBtnView = (feedback) => {
        setDataView(feedback)
    }

    return (
        <>
            <div className="admin-food-container">
                <div className="title">
                    Manage Food
                </div>
                <table className="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Feedback</th>
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
                                            <td>{item.content}</td>
                                            <td>
                                                <button className="btn btn-info mx-1 my-1"
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
        </>
    )
}

export default FeedbackWeb;