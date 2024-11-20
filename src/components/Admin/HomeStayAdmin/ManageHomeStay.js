import { useEffect, useState } from "react";
import { getAllFoods, getAllHomeStay, getAllHomeStayPaginate } from "../../../Service/apiServices";
import ModalCreateHomeStay from "./ModalCreateHome";
import TableHomeStayAdmin from "./TableHomeAdmin";
import ModalDeleteHomeStay from "./ModalDeleteHome";
import ModalUpdateHomeStay from "./ModalUpdateHome";
import { searchHome } from "../../../Service/userService";
import ModalViewHomeStay from "./ModalViewHome";
import { toast } from "react-toastify";


const ManageHomeStay = () => {

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

    const [listHomeStay, setListHomeStay] = useState([]);

    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);


    useEffect(() => {
        // fetchListHomeStay()
        fetchListHomesWithPaginate(1);
    }, [])
    useEffect(() => {
        if (inputSearch === '') {
            fetchListHomesWithPaginate(1);
            setSearch(false);
            setCurrentPage(1);
        }
    }, [inputSearch])

    const fetchListHomeStay = async () => {
        // let res = await getAllHomeStay();
        // if (res && res.code === 201) {
        //     setListHomeStay(res.result)
        // }
    }
    const handleSearchHome = async (page) => {
        if (inputSearch) {
            let res = await searchHome(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListHomeStay(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
            }
            if (res && res.code !== 201) {
                setListHomeStay(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
                toast.error(res.message)
            }
        }
        if (!inputSearch) {
            setSearch(false);
            fetchListHomesWithPaginate(1);
            setCurrentPage(1);
        }
    }

    const fetchListHomesWithPaginate = async (page) => {
        let res = await getAllHomeStayPaginate(page, LIMIT);
        if (res.code === 201) {
            setListHomeStay(res.result);
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
            <div className="admin-food-container container">
                <div className="title">
                    Manage Home Stay
                </div>
                <ModalCreateHomeStay
                    fetchListHomesWithPaginate={fetchListHomesWithPaginate}
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
                            onClick={() => handleSearchHome()}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <TableHomeStayAdmin
                        listHomeStay={listHomeStay}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        handleClickBtnView={handleClickBtnView}
                        fetchListHomesWithPaginate={fetchListHomesWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        search={search}
                        handleSearchHome={handleSearchHome}
                    />
                </div>
                <ModalDeleteHomeStay
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListHomeStay={fetchListHomeStay}
                    fetchListHomesWithPaginate={fetchListHomesWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateHomeStay
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListHomeStay={fetchListHomeStay}
                    resetUpdateData={resetUpdateData}
                    fetchListHomesWithPaginate={fetchListHomesWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    search={search}
                    handleSearchHome={handleSearchHome}
                />
                <ModalViewHomeStay
                    show={showModalView}
                    setShow={setShowModalView}
                    dataView={dataView}
                    fetchListHomeStay={fetchListHomeStay}
                    resetUpdateData={resetUpdateData}
                    fetchListHomesWithPaginate={fetchListHomesWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    search={search}
                    handleSearchHome={handleSearchHome}
                />
                
            </div>
        </>
    )
}

export default ManageHomeStay;