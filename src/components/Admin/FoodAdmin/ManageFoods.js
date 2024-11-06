import { useEffect, useState } from "react";
import ModalCreateFood from "./ModalCreateFood";
import { getAllFoods, getAllFoodsPaginate } from "../../../Service/apiServices";
import TableFoodAdmin from "./TableFoodAdmin";
import ModalDeleteFood from "./ModalDeleteFood";
import ModalUpdateFood from "./ModalUpdateFood";


const ManageFoods = () => {

    const LIMIT= 3;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listFoods, setListFoods] = useState([]);

    useEffect(() => {
        // fetchListFood()
        fetchListFoodsWithPaginate(1)
    }, [])

    const fetchListFood = async () => {
        // let res = await getAllFoods();
        // if (res && res.code === 201) {
        //     setListFoods(res.result)
        // }
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
                <div>
                    <TableFoodAdmin
                        listFoods={listFoods}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListFoodsWithPaginate={fetchListFoodsWithPaginate}
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
                />
            </div>
        </>
    )
}

export default ManageFoods;