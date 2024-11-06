import { useEffect, useState } from "react";
import { getAllFoods, getAllTours, getAllToursPaginate } from "../../../Service/apiServices";
import ModalCreateTour from "./ModalCreateTour";
import TableTourAdmin from "./TableTourAdmin";
import ModalDeleteTour from "./ModalDeleteTour";
import ModalUpdateTour from "./ModalUpdateTour";




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

    useEffect(() => {
        // fetchListTours();
        fetchListToursWithPaginate(1);
    }, [])

    const fetchListTours = async () => {
        // let res = await getAllTours();
        // if (res && res.code === 201) {
        //     setListTours(res.result)
        // }
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
                <div>
                    <TableTourAdmin
                        listTours={listTours}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListToursWithPaginate={fetchListToursWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
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
                />
            </div>
        </>
    )
}

export default ManageTour;