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


const ManageShopping = () => {

    const LIMIT = 6;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listShops, setListShops] = useState([]);

    useEffect(() => {
        // fetchListShop();
        fetchListShoppingWithPaginate(1);
    }, [])

    const fetchListShop = async () => {
        // let res = await getAllShopping();
        // if (res && res.code === 201) {
        //     setListShops(res.result)
        // }
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
                <div>
                    <TableShoppingAdmin
                        listShops={listShops}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListShoppingWithPaginate={fetchListShoppingWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
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
                />
            </div>
        </>
    )
}

export default ManageShopping;