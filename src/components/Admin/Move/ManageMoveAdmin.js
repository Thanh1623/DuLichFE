import { useEffect, useState } from "react";
import { getAllFoods, getAllMovePaginate, getAllShopping, getAllShoppingPaginate, searchMove } from "../../../Service/apiServices";

import { searchShopping } from "../../../Service/userService";
import ModalCreateMove from "./ModalCreateMove";
import TableMove from "./TableMove";
import ModalDeleteMove from './ModalDeleteMove'
import ModalUpdateMove from './ModalUpdateMove';
import ModalViewMove from './ModalViewMove';



const ManageMove = () => {

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

    const [listMove, setListMove] = useState([]);

    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);

    useEffect(() => {
        // fetchListShop();
        fetchListMoveWithPaginate(1);
    }, [])
    useEffect(() => {
        if (inputSearch === '') {
            fetchListMoveWithPaginate(1);
            setSearch(false);
            setCurrentPage(1);
        }
    }, [inputSearch])

    const fetchListShop = async () => {
        // let res = await getAllShopping();
        // if (res && res.code === 201) {
        //     setListMove(res.result)
        // }
    }
    const handleSearchMove = async (page) => {
        if (inputSearch) {
            let res = await searchMove(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListMove(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
            }
        }
        if (!inputSearch) {
            setSearch(false);
            fetchListMoveWithPaginate(1);
            setCurrentPage(1);
        }
    }

    const fetchListMoveWithPaginate = async (page) => {
        let res = await getAllMovePaginate(page, LIMIT);
        if (res.code === 201) {
            setListMove(res.result);
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
                    Manage Shopping
                </div>
                <ModalCreateMove
                    fetchListShop={fetchListShop}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListMoveWithPaginate={fetchListMoveWithPaginate}
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
                            onClick={() => handleSearchMove()}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <TableMove
                        listMove={listMove}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        handleClickBtnView={handleClickBtnView}
                        fetchListMoveWithPaginate={fetchListMoveWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        search={search}
                        handleSearchMove={handleSearchMove}
                    />
                </div>
                <ModalDeleteMove
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListShop={fetchListShop}
                    fetchListMoveWithPaginate={fetchListMoveWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateMove
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListShop={fetchListShop}
                    resetUpdateData={resetUpdateData}
                    fetchListMoveWithPaginate={fetchListMoveWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    search={search}
                    handleSearchMove={handleSearchMove}
                />
                <ModalViewMove
                    show={showModalView}
                    setShow={setShowModalView}
                    dataView={dataView}
                    fetchListShop={fetchListShop}
                    resetUpdateData={resetUpdateData}
                    fetchListMoveWithPaginate={fetchListMoveWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    search={search}
                    handleSearchMove={handleSearchMove}
                />
            </div>
        </>
    )
}

export default ManageMove;