import { useEffect, useState } from "react";
import { getAllFoods } from "../../../Service/apiServices";
import ModalCreateHomeStay from "./ModalCreateHome";
import TableHomeStayAdmin from "./TableHomeAdmin";
import ModalDeleteHomeStay from "./ModalDeleteHome";
import ModalUpdateHomeStay from "./ModalUpdateHome";


const ManageHomeStay = () => {

    const LIMIT_USER = 6;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listHomeStay, setListHomeStay] = useState([]);

    useEffect(() => {
        fetchListHomeStay()
    }, [])

    const fetchListHomeStay = async () => {
        let res = await getAllFoods();
        if (res && res.code === 201) {
            setListHomeStay(res.result)
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
                <ModalCreateHomeStay />
                <div>
                    <TableHomeStayAdmin
                        listHomeStay={listHomeStay}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalDeleteHomeStay
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListHomeStay={fetchListHomeStay}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateHomeStay
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListHomeStay={fetchListHomeStay}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    )
}

export default ManageHomeStay;