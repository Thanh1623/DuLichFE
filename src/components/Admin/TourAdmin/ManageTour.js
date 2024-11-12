import { useEffect, useState } from "react";
import { getAllFoods, getAllTours, getAllToursPaginate } from "../../../Service/apiServices";
import ModalCreateTour from "./ModalCreateTour";
import TableTourAdmin from "./TableTourAdmin";
import ModalDeleteTour from "./ModalDeleteTour";
import ModalUpdateTour from "./ModalUpdateTour";
import { searchDiscover } from "../../../Service/userService";




const ManageTour = () => {

    const LIMIT = 3;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listTours, setListTours] = useState([]);

    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);

    useEffect(() => {
        // fetchListTours();
        fetchListToursWithPaginate(1);
    }, [])
    useEffect(() => {
        if (inputSearch === '') {
            fetchListToursWithPaginate(1);
            setSearch(false);
        }
    }, [inputSearch])

    const fetchListTours = async () => {
        // let res = await getAllTours();
        // if (res && res.code === 201) {
        //     setListTours(res.result)
        // }
    }

    const handleSearchTour = async (page) => {
        if (inputSearch) {
            let res = await searchDiscover(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListTours(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
            }
        }
        if (!inputSearch) {
            setSearch(false);
            fetchListToursWithPaginate(1)
        }
    }

    const fetchListToursWithPaginate = async (page) => {
        let res = await getAllToursPaginate(page, LIMIT);
        if (res.code === 201) {
            setListTours(res.result);
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
            <div className="admin-food-container container">
                <div className="title">
                    Manage Tour
                </div>
                <ModalCreateTour
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListToursWithPaginate={fetchListToursWithPaginate}
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
                            onClick={() => handleSearchTour()}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div>

                    <TableTourAdmin
                        listTours={listTours}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListToursWithPaginate={fetchListToursWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        search={search}
                        handleSearchTour={handleSearchTour}
                    />
                </div>
                <ModalDeleteTour
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListTours={fetchListTours}
                    fetchListToursWithPaginate={fetchListToursWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateTour
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListTours={fetchListTours}
                    resetUpdateData={resetUpdateData}
                    fetchListToursWithPaginate={fetchListToursWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    search={search}
                    handleSearchTour={handleSearchTour}
                />
            </div>
        </>
    )
}

export default ManageTour;