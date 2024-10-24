import { useEffect, useState } from "react";
import ModalCreateFood from "./ModalCreateShopping";
import { getAllFoods, getAllShopping } from "../../../Service/apiServices";
import TableFoodAdmin from "./TableShoppingAdmin";
import ModalDeleteFood from "./ModalDeleteShopping";
import ModalUpdateFood from "./ModalUpdateShopping";
import ModalCreateShopping from "./ModalCreateShopping";
import ModalDeleteShopping from "./ModalDeleteShopping";
import ModalUpdateShopping from "./ModalUpdateShopping";
import TableShoppingAdmin from "./TableShoppingAdmin";


const ManageShopping = () => {

    const LIMIT_USER = 6;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listShops, setListShops] = useState([]);

    useEffect(() => {
        fetchListShop()
    }, [])

    const fetchListShop = async () => {
        let res = await getAllShopping();
        if (res && res.code === 201) {
            setListShops(res.result)
        }
    }

    const fetchListUsersWithPaginate = async (page) => {
        // let res = await getUserWithPaginate(page, LIMIT_USER);
        // if (res.EC === 0) {
        //     setListUsers(res.DT.users)
        //     setPageCount(res.DT.totalPages)
        // }
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
            <div className="admin-food-container">
                <div className="title">
                    Manage Food
                </div>
                <ModalCreateShopping />
                <div>
                    <TableShoppingAdmin
                        listShops={listShops}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
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
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateShopping
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListShop={fetchListShop}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    )
}

export default ManageShopping;