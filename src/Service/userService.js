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
// DISCOVER
const getDiscoverById = (idDiscover) => {
    return axios.get(`/api/tours/${idDiscover}`)
}
const searchDiscover = (data) => {
    return axios.post(`/api/tours/search`, {...data})
}

// SHOPPING
const getShoppingById = (idShopping) => {
    return axios.get(`/api/shopping_centers/${idShopping}`)
}

// HOME
const getHomeById = (idHome) => {
    return axios.get(`/api/homestays/${idHome}`)
}


// FEEDBACK
const feedBackWeb = (data) => {
    return axios.post(`/api/feedback`, { ...data })
}


// BOOK TOUR
const ConfirmBookTourUser = (data) => {
    return axios.post(`/api/bookings/`, { ...data })
}


export {
    postRegister, postLogin, postForgotPassword, postResetPassword,
    getNewsById, getEventById, getFoodById, getDiscoverById,
    feedBackWeb, searchDiscover, getShoppingById, ConfirmBookTourUser,
    getHomeById
}