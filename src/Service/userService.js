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

// FEEDBACK
const feedBackWeb = (data) => {
    return axios.post(`/api/feedback`, { ...data })
}


export {
    postRegister, postLogin, postForgotPassword, postResetPassword,
    getNewsById, getEventById, getFoodById, getDiscoverById,
    feedBackWeb, searchDiscover
}