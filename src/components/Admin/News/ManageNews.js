import { FcPlus } from "react-icons/fc";
import ModalCreateNew from "./ModalCreateNew";
import ModalUpdateNew from "./ModalUpdateNew";
import { useEffect, useState } from "react";
import TableEventAdmin from "../Milestone/TableEventAdmin";
import ModalDeleteEvent from "../Milestone/ModalDeleteEvent";
import { getAllNews, getAllNewsPaginate, searchNews } from "../../../Service/apiServices";
import TableNewAdmin from "./TableNewAdmin";
import ModalDeleteNew from "./ModalDeleteNew";
import ModalViewNew from "./ModalViewNews";
import { toast } from "react-toastify";

const ManageNews = (props) => {
    const LIMIT = 3;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const [dataView, setDataView] = useState({});


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listNews, setListNews] = useState([]);

    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);

    useEffect(() => {
        fetchListNew();
        fetchListNewsWithPaginate(1)
    }, [])
    useEffect(() => {
        if (inputSearch === '') {
            fetchListNewsWithPaginate(1);
            setSearch(false);
            setCurrentPage(1);
        }
    }, [inputSearch])

    const fetchListNew = async () => {
        // let res = await getAllNews();
        // if (res && res.code === 201) {
        //     setListNews(res.result)
        // }
    }

    const handleSearchNews = async (page) => {
        if (inputSearch) {
            let res = await searchNews(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListNews(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
            }
            if (res && res.code !== 201) {
                setListNews(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
                toast.error(res.message)
            }
        }
        if (!inputSearch) {
            setSearch(false);
            fetchListNewsWithPaginate(1)
            setCurrentPage(1);
        }
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
    const handleClickBtnView = (user) => {
        setShowModalView(true);
        setDataView(user);
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
                <div className="d-flex justify-content-end mb-3">
                    <div className="input-group" style={{ maxWidth: '300px', border: '1px solid #3b71ca', borderRadius: '5px' }}>
                        <div className="form-outline" data-mdb-input-init>

                            <input id="search-input" type="search" className="form-control"
                                value={inputSearch}
                                onChange={(event) => setInputSearch(event.target.value)}
                            />
                            <label className="form-label" htmlFor="form1">Search</label>

                        </div>
                        <button id="search-button" type="button" className="btn btn-primary"
                            onClick={() => handleSearchNews()}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <TableNewAdmin
                        listNews={listNews}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        handleClickBtnView={handleClickBtnView}
                        fetchListNewsWithPaginate={fetchListNewsWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        search={search}
                        handleSearchNews={handleSearchNews}
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
                    search={search}
                    handleSearchNews={handleSearchNews}
                />
                <ModalViewNew
                    show={showModalView}
                    setShow={setShowModalView}
                    dataView={dataView}
                    fetchListNew={fetchListNew}
                    resetUpdateData={resetUpdateData}
                    fetchListNewsWithPaginate={fetchListNewsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    search={search}
                    handleSearchNews={handleSearchNews}
                />
            </div>
        </>
    )
}


export default ManageNews;