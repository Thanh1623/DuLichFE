import { useEffect, useState } from "react";
import { getAllFoods, getAllHomeStay, getAllHomeStayPaginate } from "../../../Service/apiServices";
import ModalCreateHomeStay from "./ModalCreateHome";
import TableHomeStayAdmin from "./TableHomeAdmin";
import ModalDeleteHomeStay from "./ModalDeleteHome";
import ModalUpdateHomeStay from "./ModalUpdateHome";


const ManageHomeStay = () => {

    const LIMIT = 6;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listHomeStay, setListHomeStay] = useState([]);

    useEffect(() => {
        // fetchListHomeStay()
        fetchListHomesWithPaginate(1);
    }, [])

    const fetchListHomeStay = async () => {
        // let res = await getAllHomeStay();
        // if (res && res.code === 201) {
        //     setListHomeStay(res.result)
        // }
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
                <div>
                    <TableHomeStayAdmin
                        listHomeStay={listHomeStay}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListHomesWithPaginate={fetchListHomesWithPaginate}
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
                />
            </div>
        </>
    )
}

export default ManageHomeStay;