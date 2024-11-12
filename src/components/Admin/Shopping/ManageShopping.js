import { useEffect, useState } from "react";
import ModalCreateFood from "./ModalCreateShopping";
import { getAllFoods, getAllShopping, getAllShoppingPaginate } from "../../../Service/apiServices";
import TableFoodAdmin from "./TableShoppingAdmin";
import ModalDeleteFood from "./ModalDeleteShopping";
import ModalUpdateFood from "./ModalUpdateShopping";
import ModalCreateShopping from "./ModalCreateShopping";
import ModalDeleteShopping from "./ModalDeleteShopping";
import ModalUpdateShopping from "./ModalUpdateShopping";
import TableShoppingAdmin from "./TableShoppingAdmin";
import { searchShopping } from "../../../Service/userService";


const ManageShopping = () => {

    const LIMIT = 3;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listShops, setListShops] = useState([]);

    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);

    useEffect(() => {
        // fetchListShop();
        fetchListShoppingWithPaginate(1);
    }, [])
    useEffect(() => {
        if (inputSearch === '') {
            fetchListShoppingWithPaginate(1);
            setSearch(false);
        }
    }, [inputSearch])

    const fetchListShop = async () => {
        // let res = await getAllShopping();
        // if (res && res.code === 201) {
        //     setListShops(res.result)
        // }
    }
    const handleSearchShop = async (page) => {
        if (inputSearch) {
            let res = await searchShopping(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListShops(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
            }
        }
        if (!inputSearch) {
            setSearch(false);
            fetchListShoppingWithPaginate(1)
        }
    }

    const fetchListShoppingWithPaginate = async (page) => {
        let res = await getAllShoppingPaginate(page, LIMIT);
        if (res.code === 201) {
            setListShops(res.result);
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
                    Manage Food
                </div>
                <ModalCreateShopping
                    fetchListShop={fetchListShop}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListShoppingWithPaginate={fetchListShoppingWithPaginate}
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
                            onClick={() => handleSearchShop()}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <TableShoppingAdmin
                        listShops={listShops}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListShoppingWithPaginate={fetchListShoppingWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        search={search}
                        handleSearchShop={handleSearchShop}
                    />
                </div>
                <ModalDeleteShopping
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListShop={fetchListShop}
                    fetchListShoppingWithPaginate={fetchListShoppingWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateShopping
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListShop={fetchListShop}
                    resetUpdateData={resetUpdateData}
                    fetchListShoppingWithPaginate={fetchListShoppingWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    search={search}
                    handleSearchShop={handleSearchShop}
                />
            </div>
        </>
    )
}

export default ManageShopping;