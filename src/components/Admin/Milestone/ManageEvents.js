import { useEffect, useState } from "react";
import ModalCreateEvent from "./ModalCreateEvent";
import { getAllEvents, getAllEventsPaginate, searchEvents } from "../../../Service/apiServices";
import TableEventAdmin from "./TableEventAdmin";
import ModalDeleteEvent from "./ModalDeleteEvent";
import ModalUpdateEvent from "./ModalUpdateEvent";
import ReactDOM from 'react-dom';
import ModalViewEvent from "./ModalViewEvent";
import { toast } from "react-toastify";



const ManageEvents = () => {

    const LIMIT = 3;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const [dataView, setDataView] = useState({});

    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [listEvents, setListEvents] = useState([]);

    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);

    useEffect(() => {
        // fetchListEvent();
        fetchListEventsWithPaginate(1);
    }, [])
    useEffect(() => {
        if (inputSearch === '') {
            fetchListEventsWithPaginate(1);
            setSearch(false);
            setCurrentPage(1);
        }
    }, [inputSearch])

    const fetchListEvent = async () => {
        // let res = await getAllEvents();
        // if (res && res.code === 201) {
        //     setListEvents(res.result)
        // }
    }
    const handleSearchEvent = async (page) => {
        if (inputSearch) {
            let res = await searchEvents(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListEvents(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
            }
            if (res && res.code !== 201) {
                setListEvents(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
                toast.error(res.message)
            }
        }
        if (!inputSearch) {
            setSearch(false);
            fetchListEventsWithPaginate(1);
            setCurrentPage(1);
        }
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
    const handleClickBtnView = (user) => {
        setShowModalView(true);
        setDataView(user);
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
                            onClick={() => handleSearchEvent()}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <TableEventAdmin
                        listEvents={listEvents}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        handleClickBtnView={handleClickBtnView}
                        fetchListEventsWithPaginate={fetchListEventsWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        search={search}
                        handleSearchEvent={handleSearchEvent}
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
                    search={search}
                    handleSearchEvent={handleSearchEvent}
                />
                <ModalViewEvent
                    show={showModalView}
                    setShow={setShowModalView}
                    dataView={dataView}
                    fetchListEvent={fetchListEvent}
                    resetUpdateData={resetUpdateData}
                    fetchListEventsWithPaginate={fetchListEventsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    search={search}
                    handleSearchEvent={handleSearchEvent}
                />
            </div>
        </>
    )
}

export default ManageEvents;