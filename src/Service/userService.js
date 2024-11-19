import axios from "../utils/axiosCustomize";


// REGISTER

const postRegister = (data) => {
    return axios.post(`/api/auth/register`, { ...data })
}

// LOGIN
const postLogin = (data) => {
    return axios.post(`/api/auth/login`, { ...data })
}

// FORGOT PASSWORD
const postForgotPassword = (data) => {
    return axios.post(`/api/auth/forgot-password`, { ...data })
}
const postResetPassword = (data) => {
    return axios.post(`/api/auth/reset-password`, { ...data })
}

// NEWS
const getNewsById = (idNews) => {
    return axios.get(`/api/news/${idNews}`)
}

// EVENT
const getEventById = (idEvent) => {
    return axios.get(`/api/events/${idEvent}`)
}

// FOOD
const getFoodById = (idFood) => {
    return axios.get(`/api/cuisines/${idFood}`)
}

const searchFood = (page, limit, title) => {
    return axios.get(`/api/cuisines/search?limit=${limit}&page=${page}&title=${title}`)
}

// DISCOVER
const getDiscoverById = (idDiscover) => {
    return axios.get(`/api/tours/${idDiscover}`)
}
const searchDiscover = (page, limit, title) => {
    return axios.get(`/api/tours/search?limit=${limit}&page=${page}&title=${title}`)
}

// SHOPPING
const getShoppingById = (idShopping) => {
    return axios.get(`/api/shopping_centers/${idShopping}`)
}
const searchShopping = (page, limit, title) => {
    return axios.get(`/api/shopping_centers/search?limit=${limit}&page=${page}&title=${title}`)
}

// HOME
const getHomeById = (idHome) => {
    return axios.get(`/api/homestays/${idHome}`)
}
const searchHome = (page, limit, title) => {
    return axios.get(`/api/homestays/search?limit=${limit}&page=${page}&title=${title}`)
}

// MOVE
const searchMove = (page, limit, title) => {
    return axios.get(`/api/moves/search?limit=${limit}&page=${page}&title=${title}`)
}
const getMoveById = (idMove) => {
    return axios.get(`/api/moves/${idMove}`)
}
// FEEDBACK
const feedBackWeb = (data) => {
    return axios.post(`/api/feedback`, { ...data })
}


// BOOK TOUR
const ConfirmBookTourUser = (data) => {
    return axios.post(`/api/bookings/`, { ...data })
}
const ConfirmBookHomeUser = (data) => {
    return axios.post(`/api/bookings/`, { ...data })
}

// CHANGE PASSWORD USER
const ChangePasswordUser = (data) => {
    return axios.post(`/api/auth/change-password`, { ...data })
}

// GET REVIEW
const getReviewTours = (page, limit, idTour) => {
    return axios.get(`/api/reviews/tours/${idTour}?limit=${limit}&page=${page}`)
}
const getReviewFoods = (page, limit, idFood) => {
    return axios.get(`/api/reviews/cuisines/${idFood}?limit=${limit}&page=${page}`)
}
const getReviewEvent = (page, limit, idEvent) => {
    return axios.get(`/api/reviews/events/${idEvent}?limit=${limit}&page=${page}`)
}
const getReviewNews = (page, limit, idNews) => {
    return axios.get(`/api/reviews/news/${idNews}?limit=${limit}&page=${page}`)
}
const getReviewMoves = (page, limit, idMove) => {
    return axios.get(`/api/reviews/moves/${idMove}?limit=${limit}&page=${page}`)
}
const getReviewHomestay = (page, limit, idHome) => {
    return axios.get(`/api/reviews/homestays/${idHome}?limit=${limit}&page=${page}`)
}
const getReviewShopping = (page, limit, idShopping) => {
    return axios.get(`/api/reviews/shopping_centers/${idShopping}?limit=${limit}&page=${page}`)
}
const putReview = (idReview, data) => {
    return axios.put(`/api/reviews/${idReview}/answer`, { ...data })
}
const deleteReview = (idReview) => {
    return axios.delete(`/api/reviews/${idReview}`)
}



// SUGGEST
const getApiQuestions = () => {
    return axios.get(`/api/questions`);
}
const getApiAnswer = (idQues) => {
    return axios.get(`/api/questions/list/${idQues}`);
}
const getApiDownAnswer = (idAnswer) => {
    return axios.get(`/api/downanswers/${idAnswer}/list`);
}

// PROFILE
const getProfileUser = (idUser) => {
    return axios.get(`/api/users/${idUser}`);
}
const putProfileUser = (idUser, data) => {
    return axios.put(`/api/users/improveuser/${idUser}`, { ...data });
}



export {
    postRegister, postLogin, postForgotPassword, postResetPassword,
    getNewsById, getEventById, getFoodById, getDiscoverById,
    feedBackWeb, searchDiscover, getShoppingById, ConfirmBookTourUser,
    getHomeById, searchFood, searchHome, searchShopping, ConfirmBookHomeUser,
    ChangePasswordUser, getReviewTours, putReview, deleteReview, getReviewFoods,
    getReviewHomestay, searchMove, getMoveById, getReviewEvent, getReviewNews, getReviewShopping,
    getReviewMoves, getApiQuestions, getApiAnswer, getApiDownAnswer,
    getProfileUser, putProfileUser

}