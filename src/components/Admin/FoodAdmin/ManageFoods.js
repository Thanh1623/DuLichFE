import { useEffect, useState } from "react";
import ModalCreateFood from "./ModalCreateFood";
import { getAllFoods } from "../../../Service/apiServices";
import TableFoodAdmin from "./TableFoodAdmin";
import ModalDeleteFood from "./ModalDeleteFood";
import ModalUpdateFood from "./ModalUpdateFood";


const ManageFoods = () => {

    const LIMIT_USER = 6;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listFoods, setListFoods] = useState([]);

    useEffect(() => {
        fetchListFood()
    }, [])

    const fetchListFood = async () => {
        let res = await getAllFoods();
        if (res && res.code === 201) {
            setListFoods(res.result)
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
                <ModalCreateFood 
                    fetchListFood={fetchListFood}
                />
                <div>
                    <TableFoodAdmin
                        listFoods={listFoods}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalDeleteFood
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListFood={fetchListFood}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateFood
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListFood={fetchListFood}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    )
}

export default ManageFoods;