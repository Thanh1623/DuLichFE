import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { deleteApiAnswerAdmin, deleteApiDownAnswerAdmin, deleteQuesAdmin, getAllQuestionsAdmin, getApiAnswerAdmin, getApiDownAnswerAdmin, getApiQuestionsAdmin, getSearchDownAnswerAdmin, postApiAnswerAdmin, postApiDownAnswerAdmin, postQuesAdmin, putApiAnswerAdmin, putApiDownAnswerAdmin, putQuesAdmin } from '../../../Service/apiServices';
import ReactPaginate from "react-paginate";
import { toast } from 'react-toastify';
import Select from 'react-select';

const SuggestDownAnswer = () => {
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const [idUpdateDownAnswer, setIdUpdateDownAnswer] = useState('')

    const [listDownAnswer, setListDownAnswer] = useState([]);
    const [contentDownAnswer, setContentDownAnswer] = useState('');
    const [contentUpdate, setContentUpdate] = useState('');

    const [listAnswer, setListAnswer] = useState([]);

    const [idQues, setIdQues] = useState('');

    const [selectedOption, setSelectedOption] = useState(null);

    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);

    const options = [];
    obj = {}

    for (var i = 0; i < listAnswer.length; i++) {
        var obj = {};

        obj['value'] = listAnswer[i].answer_id;
        obj['label'] = listAnswer[i].answer_id;
        options.push(obj);
    }
    useEffect(() => {
        getAllDownAnswer(1);
        getAllAnswer(1);
    }, [])

    useEffect(() => {
        if (inputSearch === '') {
            getAllDownAnswer(1);
            // getAllQues(1);
            setSearch(false);
            setCurrentPage(1);
        }
    }, [inputSearch])
    const handleSearchDownAnswer = async (page) => {
        if (inputSearch) {
            let res = await getSearchDownAnswerAdmin(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListDownAnswer(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
                // setCurrentPage(1);
            }
        }
        if (!inputSearch) {
            setSearch(false);
            getAllDownAnswer(1);
            setCurrentPage(1);
        }
    }

    const getAllDownAnswer = async (page) => {
        let data = await getApiDownAnswerAdmin(page, 3);
        if (data && data.code === 201) {
            setListDownAnswer(data.result);
            setPageCount(data.totalpage);
        }
        if (data && data.code !== 201) {
            setListDownAnswer([]);
        }
    }
    const getAllAnswer = async (page) => {
        let data = await getApiAnswerAdmin(page, 1000);
        if (data && data.code === 201) {
            setListAnswer(data.result);
        }
        if (data && data.code !== 201) {
            setListAnswer([]);
        }
    }
    const handleCreateDownAnswer = async () => {
        if (!contentDownAnswer) {
            toast.error('Not Invalid')
            return;
        }
        if (selectedOption === null) {
            toast.error('Not Invalid')
            return;
        }
        let res = await postApiDownAnswerAdmin({
            answer_id: selectedOption.value,
            downanswer_text: contentDownAnswer
        })
        if (res && res.code === 201) {
            toast.success(res.message);
            getAllDownAnswer(1);
            setContentDownAnswer('');
            setSelectedOption(null);
            setCurrentPage(1)
        }
        if (res && res.code !== 201) {
            toast.error(res.message);
        }
    }
    const handleDeleteDownAnswer = async (item) => {
        let res = await deleteApiDownAnswerAdmin(item.downanswer_id);
        if (res && res.code === 201) {
            toast.success(res.message);
            getAllDownAnswer(1);
            setCurrentPage(1)
        }
        if (res && res.code !== 201) {
            toast.success(res.message)
        }
    }
    const handleAddQues = () => {
        setShowAdd(!showAdd)
    }
    const handleUpdateDownAnswer = (item) => {
        setShowUpdate(true);
        setIdUpdateDownAnswer(item.downanswer_id);
        setContentUpdate(item.downanswer_text);
        setSelectedOption({ value: item.answer_id, label: item.answer_id });
    }
    const handleConfirmUpdateDownAnswer = async () => {
        let res = await putApiDownAnswerAdmin(idUpdateDownAnswer, {
            answer_id: selectedOption.value,
            downanswer_text: contentUpdate
        })
        if (res && res.code === 201) {
            toast.success(res.message);
            if (inputSearch) {
                handleSearchDownAnswer(currentPage);
            }
            if (!inputSearch) {
                getAllDownAnswer(currentPage);
            }
            setShowUpdate(false);
            setContentUpdate('');
            setSelectedOption(null)
        }
        if (res && res.code !== 201) {
            toast.error(res.message);
        }
    }
    const handlePageClick = (event) => {

        if (!search) {
            getAllDownAnswer(+event.selected + 1)
            setCurrentPage(+event.selected + 1);
        }
        if (search) {
            handleSearchDownAnswer(+event.selected + 1);
            setCurrentPage(+event.selected + 1);
        }

        // // props.fetchListToursWithPaginate(+event.selected + 1)
        // // props.setCurrentPage(+event.selected + 1);
        // console.log(`User requested page number ${event.selected}`);
    };
    console.log('selectedOption: ', selectedOption);
    const colourStyles = {
        menuList: styles => ({
            ...styles,
            background: 'papayawhip'
        }),
        option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            background: isFocused
                ? 'hsla(291, 64%, 42%, 0.5)'
                : isSelected
                    ? 'hsla(291, 64%, 42%, 1)'
                    : undefined,
            zIndex: 1
        }),
        menu: base => ({
            ...base,
            zIndex: 100
        })
    }
    return (
        // <Accordion>
        <Accordion.Item eventKey="2">
            <Accordion.Header>Suggest Down Answer #3</Accordion.Header>
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
                            onClick={() => handleSearchDownAnswer()}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <button className='btn btn-primary' onClick={() => handleAddQues()}>
                    Thêm câu trả lời cho phần 3 gợi ý
                </button>
                {
                    showAdd === true &&
                    <div className="input-group mt-2 d-flex gap-1">
                        <input type="search" className="form-control rounded " placeholder="Câu hỏi" aria-label="Search" aria-describedby="search-addon"
                            onChange={(event) => setContentDownAnswer(event.target.value)}
                            value={contentDownAnswer}
                        />
                        <div className="App">
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                value={selectedOption}
                                options={options}
                                styles={colourStyles}
                            />
                        </div>
                        <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init
                            onClick={() => handleCreateDownAnswer()}
                        >Add</button>
                    </div>
                }
                <hr />
                {
                    listDownAnswer && listDownAnswer.length > 0 &&
                    listDownAnswer.map((item, index) => {
                        return (
                            <div key={`answer-admin-${index}`}>
                                <div className="input-group mt-2 d-flex gap-1" >
                                    <span class="input-group-text" id="basic-addon1">{item.downanswer_id}</span>
                                    <input type="search" className="form-control rounded " placeholder="Phản hồi đánh giá" aria-label="Search" aria-describedby="search-addon"
                                        disabled
                                        // onChange={(event) => setContentUpdate(event.target.value)}
                                        value={item.downanswer_text}
                                    />
                                    <span class="input-group-text" id="basic-addon1">ID Answer: {item.answer_id}</span>
                                    <button type="button" className="btn btn-outline-success" data-mdb-ripple-init
                                        onClick={() => handleUpdateDownAnswer(item)}
                                    >Update</button>

                                    <button type="button" className="btn btn-outline-danger" data-mdb-ripple-init
                                        onClick={() => handleDeleteDownAnswer(item)}
                                    >Delete</button>
                                </div>
                                {
                                    showUpdate === true && idUpdateDownAnswer === item.downanswer_id &&
                                    <div className="input-group mt-2 d-flex gap-1">
                                        <input type="search" className="form-control rounded " placeholder="Câu hỏi" aria-label="Search" aria-describedby="search-addon"
                                            onChange={(event) => setContentUpdate(event.target.value)}
                                            value={contentUpdate}
                                        />
                                        <div className="App">
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={setSelectedOption}
                                                value={selectedOption}
                                                options={options}
                                                styles={colourStyles}
                                            />
                                        </div>
                                        <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init
                                            onClick={() => handleConfirmUpdateDownAnswer()}
                                        >Confirm Update</button>
                                    </div>
                                }
                            </div>
                        )
                    })
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
        // </Accordion>
    )
}

export default SuggestDownAnswer;


