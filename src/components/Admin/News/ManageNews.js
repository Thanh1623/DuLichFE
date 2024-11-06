import { FcPlus } from "react-icons/fc";
import ModalCreateNew from "./ModalCreateNew";
import ModalUpdateNew from "./ModalUpdateNew";
import { useEffect, useState } from "react";
import TableEventAdmin from "../Milestone/TableEventAdmin";
import ModalDeleteEvent from "../Milestone/ModalDeleteEvent";
import { getAllNews, getAllNewsPaginate } from "../../../Service/apiServices";
import TableNewAdmin from "./TableNewAdmin";
import ModalDeleteNew from "./ModalDeleteNew";

const ManageNews = (props) => {
    const LIMIT = 3;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listNews, setListNews] = useState([]);

    useEffect(() => {
        fetchListNew();
        fetchListNewsWithPaginate(1)
    }, [])

    const fetchListNew = async () => {
        // let res = await getAllNews();
        // if (res && res.code === 201) {
        //     setListNews(res.result)
        // }
    }

    const fetchListNewsWithPaginate = async (page) => {
        let res = await getAllNewsPaginate(page, LIMIT);
        if (res.code === 201) {
            setListNews(res.result);
            setPageCount(res.totalpage);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const resetUpdateData = () => {
        setDataUpdate({});
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }

    return (
        <>
            <div className="manage-news-container container">
                <div className="title">
                    Manage news
                </div>
                <ModalCreateNew
                    fetchListNewsWithPaginate={fetchListNewsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <div>
                    <TableNewAdmin
                        listNews={listNews}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListNewsWithPaginate={fetchListNewsWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalDeleteNew
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListNew={fetchListNew}
                    fetchListNewsWithPaginate={fetchListNewsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateNew
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListNew={fetchListNew}
                    resetUpdateData={resetUpdateData}
                    fetchListNewsWithPaginate={fetchListNewsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div> 
        </>
    )
}


export default ManageNews;