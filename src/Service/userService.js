import axios from "../utils/axiosCustomize";


// NEWS
const getNewsById = (idNews) => {
    return axios.get(`/api/news/${idNews}`)
}

// EVENT
const getEventById = (idEvent) => {
    return axios.get(`/api/events/${idEvent}`)
}

export {
    getNewsById,
    getEventById
}