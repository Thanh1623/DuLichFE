import { useEffect, useState } from "react";
import ModalCreateEvent from "./ModalCreateEvent";
import { getAllEvents, getAllEventsPaginate } from "../../../Service/apiServices";
import TableEventAdmin from "./TableEventAdmin";
import ModalDeleteEvent from "./ModalDeleteEvent";
import ModalUpdateEvent from "./ModalUpdateEvent";
import ReactDOM from 'react-dom';



const ManageEvents = () => {

    const LIMIT = 3;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);


    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listEvents, setListEvents] = useState([]);

    useEffect(() => {
        // fetchListEvent();
        fetchListEventsWithPaginate(1);
    }, [])

    const fetchListEvent = async () => {
        // let res = await getAllEvents();
        // if (res && res.code === 201) {
        //     setListEvents(res.result)
        // }
    }

    const fetchListEventsWithPaginate = async (page) => {
        let res = await getAllEventsPaginate(page, LIMIT);
        if (res.code === 201) {
            setListEvents(res.result);
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
            <div className="manage-event-container container" >
                <div className="title">
                    Manage Event
                </div>
                <ModalCreateEvent
                    fetchListEventsWithPaginate={fetchListEventsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <div>
                    <TableEventAdmin
                        listEvents={listEvents}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListEventsWithPaginate={fetchListEventsWithPaginate}
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
                    fetchListEventsWithPaginate={fetchListEventsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateEvent
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListEvent={fetchListEvent}
                    resetUpdateData={resetUpdateData}
                    fetchListEventsWithPaginate={fetchListEventsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    )
}

export default ManageEvents;