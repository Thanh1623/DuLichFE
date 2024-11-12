import { useEffect, useState } from "react";
import ModalCreateFood from "./ModalCreateFood";
import { getAllFoods, getAllFoodsPaginate } from "../../../Service/apiServices";
import TableFoodAdmin from "./TableFoodAdmin";
import ModalDeleteFood from "./ModalDeleteFood";
import ModalUpdateFood from "./ModalUpdateFood";
import { searchFood } from "../../../Service/userService";


const ManageFoods = () => {

    const LIMIT = 3;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listFoods, setListFoods] = useState([]);

    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);

    useEffect(() => {
        // fetchListFood()
        fetchListFoodsWithPaginate(1)
    }, [])
    useEffect(() => {
        if (inputSearch === '') {
            fetchListFoodsWithPaginate(1);
            setSearch(false);
        }
    }, [inputSearch])

    const fetchListFood = async () => {
        // let res = await getAllFoods();
        // if (res && res.code === 201) {
        //     setListFoods(res.result)
        // }
    }

    const handleSearchFood = async (page) => {
        if (inputSearch) {
            let res = await searchFood(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListFoods(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
            }
        }
        if (!inputSearch) {
            setSearch(false);
            fetchListFoodsWithPaginate(1)
        }
    }

    const fetchListFoodsWithPaginate = async (page) => {
        let res = await getAllFoodsPaginate(page, LIMIT);
        if (res.code === 201) {
            setListFoods(res.result);
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
                <ModalCreateFood
                    fetchListFood={fetchListFood}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListFoodsWithPaginate={fetchListFoodsWithPaginate}
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
                            onClick={() => handleSearchFood()}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <TableFoodAdmin
                        listFoods={listFoods}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListFoodsWithPaginate={fetchListFoodsWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        search={search}
                        handleSearchFood={handleSearchFood}
                    />
                </div>
                <ModalDeleteFood
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListFood={fetchListFood}
                    fetchListFoodsWithPaginate={fetchListFoodsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateFood
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListFood={fetchListFood}
                    resetUpdateData={resetUpdateData}
                    fetchListFoodsWithPaginate={fetchListFoodsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    search={search}
                    handleSearchFood={handleSearchFood}
                />
            </div>
        </>
    )
}

export default ManageFoods;