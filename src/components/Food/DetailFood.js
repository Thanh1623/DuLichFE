import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './DetailFood.scss';
import { FaHome } from "react-icons/fa";
import { deleteReview, getFoodById, getReviewFoods, putReview } from "../../Service/userService";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postReview } from "../../Service/apiServices";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ReactPaginate from "react-paginate";
import ListGroup from 'react-bootstrap/ListGroup';



const DetailFood = (props) => {

    const role = useSelector(state => state.user.account.role);
    const idUser = useSelector(state => state.user.account.idUser);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const params = useParams();
    const location = useLocation();
    const [detailFood, setDetailFood] = useState({});
    const idFood = params.id;
    const navigate = useNavigate();

    const [value, setValue] = useState(5);
    const [contentReview, setContentReview] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [listReviewFoods, setListReviewFoods] = useState('');
    const [userSend, setUserSend] = useState(false);
    const [answer, setAnswer] = useState(false);
    const [idAnswer, setIdAnswer] = useState('');
    const [contentUpdate, setContentUpdate] = useState('');

    useEffect(() => {
        fetchDetailFoodById();
        fetchReviewFoods(1);
    }, [])
    useEffect(() => {
        fetchReviewFoods(1)
    }, [userSend])

    const fetchDetailFoodById = async () => {
        let data = await getFoodById(idFood);
        if (data && data.code === 201) {
            setDetailFood(data.result)
        }

    }
    const fetchReviewFoods = async (page) => {
        let data = await getReviewFoods(page, 5, idFood);
        if (data && data.code === 201) {
            setListReviewFoods(data.result);
            setPageCount(data.totalpage);
        }

    }
    const convertToDate = (isoTimestamp) => {
        let date = new Date(isoTimestamp);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return `${year}-${month}-${dt}`;
    };

    const handleSubmitReview = async () => {
        let res = await postReview({
            cuisines_id: detailFood.cuisines_id,
            content_question: contentReview,
            rating: value
        })
        if (res && res.code === 201) {
            toast.success(res.message);
            setContentReview('');
            setValue(5)
            setUserSend(!userSend)
            setCurrentPage(1)
        }
        if (res && res.code !== 201) {
            toast.error(res.message)
        }
    }
    const handlePageClick = (event) => {
        fetchReviewFoods(+event.selected + 1)
        setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };

    const handleAnswerReview = (item) => {
        setAnswer(!answer);
        setIdAnswer(item.review_id)
    }
    useEffect(() => {
        setAnswer(true)
    }, [idAnswer]);

    const handleUpdateReview = async (idReview) => {
        if (!contentUpdate) {
            toast.error('Phản hồi trống');
            return;
        }
        let res = await putReview(idReview, {
            content_answer: contentUpdate
        })
        if (res && res.code === 201) {
            toast.success(res.message);
            setContentUpdate('');
            fetchReviewFoods(currentPage);
        }
        if (res && res.code !== 201) {
            toast.error(res.message)
        }

    }
    const handleDeleteReview = async (idReview) => {
        let res = await deleteReview(idReview);
        if (res && res.code === 201) {
            toast.success(res.message);
            fetchReviewFoods(1);
            setCurrentPage(1)
        }
        if (res && res.code !== 201) {
            toast.error(res.message);
        }
    }

    console.log(detailFood)

    return (
        <>
            <div className="detail-food-container container">

                <div className="detail-food-home">
                    <FaHome className="home"
                        onClick={() => navigate('/')}
                    /> <span className="text-food" onClick={() => navigate('/food')}>&nbsp;&lt;Ẩm thực</span>
                </div>
                <div className="detail-food-title">
                    {detailFood.title}
                </div>
                <hr />
                <div className="detail-food-time">
                    {detailFood.opening_hours} to {detailFood.closing_time}
                </div>
                <div className="detail-food-description">
                    <div className="DesImg" dangerouslySetInnerHTML={{ __html: detailFood.ContentHTML }}>
                    </div>
                </div>
                <div className="detail-food-description">
                    <div dangerouslySetInnerHTML={{ __html: detailFood.map }}>
                    </div>
                </div>

                <div className="detail-food-date">
                    {convertToDate(detailFood.created_at)}
                </div>

                <div className="Review">
                    <div>
                        Đánh giá:
                    </div>
                    <div>
                        <div>
                            <ListGroup>
                                {
                                    listReviewFoods && listReviewFoods.length > 0 &&
                                    listReviewFoods.map((item, index) => {
                                        return (
                                            <ListGroup.Item key={`review-food-${index}`}>
                                                <div style={{ fontSize: '18px', fontWeight: '600' }}>
                                                    {item.user_name}:
                                                </div>
                                                <Box sx={{ '& > legend': { mt: 0 }, display: 'flex' }}>
                                                    <Box sx={{ mr: 2 }}>{item.review_content_question}</Box>
                                                    <Rating
                                                        name="simple-controlled"
                                                        value={item.rating}
                                                        readOnly
                                                    />
                                                    <Box sx={{ ml: 2 }}>{convertToDate(item.review_created_at)}</Box>
                                                </Box>
                                                {
                                                    item.review_content_answer !== 'Chờ phản hồi' &&
                                                    <div>
                                                        Admin: {item.review_content_answer}
                                                    </div>
                                                }
                                                {
                                                    role === 'admin' && isAuthenticated === true &&
                                                    <div>
                                                        <button type="button" style={{ border: 'none', background: 'none', color: 'blue' }}
                                                            onClick={() => handleAnswerReview(item)}
                                                        >Trả lời</button>
                                                        <button type="button" style={{ border: 'none', background: 'none', color: 'red' }}
                                                            onClick={() => handleDeleteReview(item.review_id)}
                                                        >Xóa</button>
                                                    </div>

                                                }
                                                {
                                                    role === 'user' && isAuthenticated === true && idUser === item.user_id &&
                                                    <button type="button" style={{ border: 'none', background: 'none', color: 'red' }}
                                                        onClick={() => handleDeleteReview(item.review_id)}
                                                    >Xóa</button>
                                                }

                                                {
                                                    answer === true && idAnswer === item.review_id &&
                                                    <div className="input-group mt-0">
                                                        <input type="search" className="form-control rounded" placeholder="Phản hồi đánh giá" aria-label="Search" aria-describedby="search-addon"
                                                            onChange={(event) => setContentUpdate(event.target.value)}
                                                            value={contentUpdate}
                                                        />

                                                        <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init
                                                            onClick={() => handleUpdateReview(item.review_id)}
                                                        >Gửi</button>
                                                    </div>
                                                }
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </div>
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
                    </div>

                    <div className="input-group mt-5">
                        <input type="search" className="form-control rounded" placeholder="Đánh giá của bạn" aria-label="Search" aria-describedby="search-addon"
                            onChange={(event) => setContentReview(event.target.value)}
                            value={contentReview}
                        />

                        <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init
                            onClick={() => handleSubmitReview()}
                        >Gửi</button>
                    </div>
                    <Box sx={{ '& > legend': { mt: 0 } }}>
                        <Typography component="legend">Controlled</Typography>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </Box>
                </div>
            </div>
        </>
    )
}

export default DetailFood;