import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { deleteApiAnswerAdmin, deleteQuesAdmin, getAllQuestionsAdmin, getApiAnswerAdmin, getApiQuestionsAdmin, getSearchAnswerAdmin, postApiAnswerAdmin, postQuesAdmin, putApiAnswerAdmin, putQuesAdmin } from '../../../Service/apiServices';
import ReactPaginate from "react-paginate";
import { toast } from 'react-toastify';
import Select from 'react-select';

const SuggestAnswer = () => {
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const [idUpdateAnswer, setIdUpdateAnswer] = useState('')

    const [listAnswer, setListAnswer] = useState([]);
    const [contentAnswer, setContentAnswer] = useState('');
    const [contentUpdate, setContentUpdate] = useState('');

    const [listQues, setListQues] = useState([]);

    const [idQues, setIdQues] = useState('');

    const [selectedOption, setSelectedOption] = useState(null);

    const [inputSearch, setInputSearch] = useState('');
    const [search, setSearch] = useState(false);


    const options = [];
    obj = {}

    for (var i = 0; i < listQues.length; i++) {
        var obj = {};

        obj['value'] = listQues[i].question_id;
        obj['label'] = listQues[i].question_id;
        options.push(obj);
    }
    useEffect(() => {
        getAllAnswer(1);
        getAllQues(1);
    }, [])
    useEffect(() => {
        if (inputSearch === '') {
            getAllAnswer(1);
            // getAllQues(1);
            setSearch(false);
            setCurrentPage(1);
        }
    }, [inputSearch])

    const handleSearchAnswer = async (page) => {
        if (inputSearch) {
            let res = await getSearchAnswerAdmin(page, 3, inputSearch)
            if (res && res.code === 201) {
                setListAnswer(res.result)
                setSearch(true);
                setPageCount(res.totalpage);
                // setCurrentPage(1);
            }
        }
        if (!inputSearch) {
            setSearch(false);
            getAllAnswer(1);
            setCurrentPage(1);
        }
    }

    const getAllAnswer = async (page) => {
        let data = await getApiAnswerAdmin(page, 3);
        if (data && data.code === 201) {
            setListAnswer(data.result);
            setPageCount(data.totalpage);
        }
        if (data && data.code !== 201) {
            setListAnswer([]);
        }
    }
    const getAllQues = async (page) => {
        let data = await getApiQuestionsAdmin(page, 1000);
        if (data && data.code === 201) {
            setListQues(data.result);
        }
        if (data && data.code !== 201) {
            setListQues([]);
        }
    }
    const handleCreateAnswer = async () => {
        if (!contentAnswer) {
            toast.error('Not Invalid')
            return;
        }
        if (selectedOption === null) {
            toast.error('Not Invalid')
            return;
        }
        let res = await postApiAnswerAdmin({
            question_id: selectedOption.value,
            answer_text: contentAnswer
        })
        if (res && res.code === 201) {
            toast.success(res.message);
            getAllAnswer(1);
            setContentAnswer('');
            setSelectedOption(null);
            setCurrentPage(1)
        }
        if (res && res.code !== 201) {
            toast.error(res.message);
        }
    }
    const handleDeleteAnswer = async (item) => {
        let res = await deleteApiAnswerAdmin(item.answer_id);
        if (res && res.code === 201) {
            toast.success(res.message);
            getAllAnswer(1);
            setCurrentPage(1)
        }
        if (res && res.code !== 201) {
            toast.success(res.message)
        }
    }
    const handleAddQues = () => {
        setShowAdd(!showAdd)
    }
    const handleUpdateAnswer = (item) => {
        setShowUpdate(true);
        setIdUpdateAnswer(item.answer_id);
        setContentUpdate(item.answer_text);
        setSelectedOption({ value: item.question_id, label: item.question_id });
    }
    const handleConfirmUpdateAnswer = async () => {
        let res = await putApiAnswerAdmin(idUpdateAnswer, {
            question_id: selectedOption.value,
            answer_text: contentUpdate
        })
        if (res && res.code === 201) {
            toast.success(res.message);
            if (inputSearch) {
                handleSearchAnswer(currentPage);
            }
            if (!inputSearch) {
                getAllAnswer(currentPage);
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
            getAllAnswer(+event.selected + 1)
            setCurrentPage(+event.selected + 1);
        }
        if (search) {
            handleSearchAnswer(+event.selected + 1);
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
        <Accordion.Item eventKey="1">
            <Accordion.Header>Suggest Answer #2</Accordion.Header>
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
                            onClick={() => handleSearchAnswer()}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <button className='btn btn-primary' onClick={() => handleAddQues()}>
                    Thêm câu trả lời gợi ý
                </button>
                {
                    showAdd === true &&
                    <div className="input-group mt-2 d-flex gap-1">
                        <input type="search" className="form-control rounded " placeholder="Câu hỏi" aria-label="Search" aria-describedby="search-addon"
                            onChange={(event) => setContentAnswer(event.target.value)}
                            value={contentAnswer}
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
                            onClick={() => handleCreateAnswer()}
                        >Add</button>
                    </div>
                }
                <hr />
                {
                    listAnswer && listAnswer.length > 0 &&
                    listAnswer.map((item, index) => {
                        return (
                            <div key={`answer-admin-${index}`}>
                                <div className="input-group mt-2 d-flex gap-1" >
                                    <span class="input-group-text" id="basic-addon1">{item.answer_id}</span>
                                    <input type="search" className="form-control rounded " placeholder="Phản hồi đánh giá" aria-label="Search" aria-describedby="search-addon"
                                        disabled
                                        // onChange={(event) => setContentUpdate(event.target.value)}
                                        value={item.answer_text}
                                    />
                                    <span class="input-group-text" id="basic-addon1">ID Q: {item.question_id}</span>

                                    <button type="button" className="btn btn-outline-success" data-mdb-ripple-init
                                        onClick={() => handleUpdateAnswer(item)}
                                    >Update</button>

                                    <button type="button" className="btn btn-outline-danger" data-mdb-ripple-init
                                        onClick={() => handleDeleteAnswer(item)}
                                    >Delete</button>
                                </div>
                                {
                                    showUpdate === true && idUpdateAnswer === item.answer_id &&
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
                                            onClick={() => handleConfirmUpdateAnswer()}
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

export default SuggestAnswer;


