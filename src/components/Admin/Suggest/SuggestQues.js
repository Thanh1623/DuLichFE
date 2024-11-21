import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { deleteQuesAdmin, getApiQuestionsAdmin, getSearchQuestionsAdmin, postQuesAdmin, putQuesAdmin } from '../../../Service/apiServices';
import ReactPaginate from "react-paginate";
import { toast } from 'react-toastify';
import SuggestAnswer from './SuggestAnswer';
import SuggestDownAnswer from './SuggestDownAnswer';

const SuggestQues = () => {
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const [idUpdateQues, setIdUpdateQues] = useState('')

    const [listQues, setListQues] = useState([]);
    const [contentQues, setContentQues] = useState('');
    const [contentUpdate, setContentUpdate] = useState('');

    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);

    const [dataAnswer, setDataAnswer] = useState([]);

    useEffect(() => {
        getAllQues(1);
    }, [])
    useEffect(() => {
        if (inputSearch === '') {
            getAllQues(1);
            setSearch(false);
            setCurrentPage(1);
        }
    }, [inputSearch])

    const handleSearchQues = async (page) => {
        if (inputSearch) {
            let res = await getSearchQuestionsAdmin(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListQues(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
                // setCurrentPage(1);
            }
            if (res && res.code !== 201) {
                setListQues(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
                toast.error(res.message)
            }
        }
        if (!inputSearch) {
            setSearch(false);
            getAllQues(1);
            setCurrentPage(1);
        }
    }

    const getAllQues = async (page) => {
        let data = await getApiQuestionsAdmin(page, 3);
        if (data && data.code === 201) {
            setListQues(data.result);
            setPageCount(data.totalpage);
        }
        if (data && data.code !== 201) {
            setListQues([]);
        }
    }
    const handleCreateQues = async () => {
        if (!contentQues) {
            toast.error('Not Invalid')
            return;
        }
        let res = await postQuesAdmin({
            question_text: contentQues
        })
        if (res && res.code === 201) {
            toast.success(res.message);
            getAllQues(1);
            setContentQues('');
            setCurrentPage(1)
        }
        if (res && res.code !== 201) {
            toast.error(res.message);
        }
    }
    const handleDeleteQues = async (item) => {
        let res = await deleteQuesAdmin(item.question_id);
        if (res && res.code === 201) {
            toast.success(res.message);
            getAllQues(1);
            setCurrentPage(1)
        }
        if (res && res.code !== 201) {
            toast.error(res.message)
        }
    }
    const handleAddQues = () => {
        setShowAdd(!showAdd)
    }
    const handleUpdateQues = (item) => {
        setShowUpdate(true);
        setIdUpdateQues(item.question_id);
        setContentUpdate(item.question_text);
    }
    const handleConfirmUpdateQues = async () => {
        let res = await putQuesAdmin(idUpdateQues, {
            question_text: contentUpdate
        })
        if (res && res.code === 201) {
            toast.success(res.message);
            if (inputSearch) {
                handleSearchQues(currentPage);
            }
            if (!inputSearch) {
                getAllQues(currentPage);
            }
            setShowUpdate(false);
            setContentUpdate('');
        }
        if (res && res.code !== 201) {
            toast.error(res.message);
        }
    }
    console.log('currentPage: ', currentPage)
    console.log('inputSearch: ', inputSearch)
    const handlePageClick = (event) => {

        if (!search) {
            getAllQues(+event.selected + 1)
            setCurrentPage(+event.selected + 1);
        }
        if (search) {
            handleSearchQues(+event.selected + 1);
            setCurrentPage(+event.selected + 1);
        }

        // props.fetchListToursWithPaginate(+event.selected + 1)
        // props.setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };

    const dataAnswerClick = (data) => {
        setDataAnswer(data);
    }

    return (
        <div className="suggest-admin-container container">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Suggest Question #1</Accordion.Header>
                    <Accordion.Body>
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
                                    onClick={() => handleSearchQues()}
                                >
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <button className='btn btn-primary' onClick={() => handleAddQues()}>
                            Add #1
                        </button>

                        {
                            showAdd === true &&
                            <div className="input-group mt-2 d-flex gap-1">
                                <input type="search" className="form-control rounded " placeholder="Câu hỏi" aria-label="Search" aria-describedby="search-addon"
                                    onChange={(event) => setContentQues(event.target.value)}
                                    value={contentQues}
                                />
                                <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init
                                    onClick={() => handleCreateQues()}
                                >Add</button>
                            </div>
                        }
                        <hr />
                        {
                            listQues && listQues.length > 0
                                ?
                                listQues.map((item, index) => {
                                    return (
                                        <div key={`ques-admin-${index}`}>
                                            <div className="input-group mt-2 d-flex gap-1" >
                                                <span class="input-group-text" id="basic-addon1">{item.question_id}</span>

                                                <input type="search" className="form-control rounded " placeholder="Phản hồi đánh giá" aria-label="Search" aria-describedby="search-addon"
                                                    disabled
                                                    // onChange={(event) => setContentUpdate(event.target.value)}
                                                    value={item.question_text}
                                                />

                                                <button type="button" className="btn btn-outline-success" data-mdb-ripple-init
                                                    onClick={() => handleUpdateQues(item)}
                                                >Update</button>

                                                <button type="button" className="btn btn-outline-danger" data-mdb-ripple-init
                                                    onClick={() => handleDeleteQues(item)}
                                                >Delete</button>
                                            </div>
                                            {
                                                showUpdate === true && idUpdateQues === item.question_id &&
                                                <div className="input-group mt-2 d-flex gap-1">
                                                    <input type="search" className="form-control rounded " placeholder="Câu hỏi" aria-label="Search" aria-describedby="search-addon"
                                                        onChange={(event) => setContentUpdate(event.target.value)}
                                                        value={contentUpdate}
                                                    />
                                                    <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init
                                                        onClick={() => handleConfirmUpdateQues()}
                                                    >Confirm Update</button>
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                                :
                                <div>
                                    <span>Không có dữ liệu</span>
                                </div>
                        }
                        <div className="user-pagination">
                            <ReactPaginate
                                nextLabel="Next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="< Previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                                forcePage={currentPage - 1}
                            />
                        </div>

                    </Accordion.Body>
                </Accordion.Item>
                <SuggestAnswer
                    listQues={listQues}
                    dataAnswerClick={dataAnswerClick}
                />
                <SuggestDownAnswer
                    dataAnswer={dataAnswer}
                />
            </Accordion>
        </div>
    )
}

export default SuggestQues;