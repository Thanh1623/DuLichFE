import { useEffect, useState } from "react";
import ModalCreateEvent from "./ModalCreateEvent";
import { getAllEvents } from "../../../Service/apiServices";
import TableEventAdmin from "./TableEventAdmin";
import ModalDeleteEvent from "./ModalDeleteEvent";
import ModalUpdateEvent from "./ModalUpdateEvent";



const ManageEvents = () => {

    const LIMIT_USER = 6;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listEvents, setListEvents] = useState([]);

    useEffect(() => {
        fetchListEvent()
    }, [])

    const fetchListEvent = async () => {
        let res = await getAllEvents();
        if (res && res.code === 201) {
            setListEvents(res.result)
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
            <div className="manage-event-container " >
                <div className="title">
                    Manage Event
                </div>
                <ModalCreateEvent />
                <div>
                    <TableEventAdmin
                        listEvents={listEvents}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalDeleteEvent
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListEvent={fetchListEvent}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateEvent
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListEvent={fetchListEvent}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    )
}

export default ManageEvents;