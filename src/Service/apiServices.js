import axios from "../utils/axiosCustomize";

// USER ADMIN
const postCreateUser = (data) => {
    return axios.post(`/api/users`, { ...data })
}
const getAllUsersPaginate = (page, limit) => {
    return axios.get(`/api/users?limit=${limit}&page=${page}`)
}

const getAllUsers = () => {
    return axios.get(`/api/users`)
}

const putUsers = (idUser, data) => {
    return axios.put(`/api/users/${idUser}`, { ...data })
}
const deleteUsers = (idUser) => {
    return axios.delete(`/api/users/${idUser}`)
}


// EVENT ADMIN
const postCreateEvent = (title, valueOpen, valueClose, imageTitle, contentMarkdown, contentHTML,
    map, address, view) => {
    const data = new FormData();
    data.append('title', title);
    data.append('description', address);
    data.append('closing_time_event', valueClose);
    data.append('opening_hours_event', valueOpen);
    data.append('content', map);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('ContentHTML', contentHTML);
    data.append('views', view);
    data.append('event_image', imageTitle);
    data.append('content_image', imageTitle);

    // if (imageTitle instanceof File) {
    //     data.append('event_image', imageTitle); // Gửi file ảnh
    // } else if (Array.isArray(imageTitle)) {
    //     // Nếu có nhiều file, append từng file
    //     imageTitle.forEach((file, index) => {
    //         data.append(`event_image`, file);
    //     });
    // }

    // if (imageContent instanceof File) {
    //     data.append('content_image', imageContent); // Gửi file ảnh
    // } else if (Array.isArray(imageContent)) {
    //     // Nếu có nhiều file, append từng file
    //     imageContent.forEach((file, index) => {
    //         data.append(`content_image`, file);
    //     });
    // }
    return axios.post(`/api/events`, data,
        // {
        //     headers: {
        //         'Content-Type': 'multipart/form-data', // Đảm bảo headers đúng
        //     },
        // }
    )
}

const getAllEvents = () => {
    return axios.get(`/api/events`)
}

const searchEvents = (page, limit, title) => {
    return axios.get(`/api/events/search?limit=${limit}&page=${page}&title=${title}`)
}

const getAllEventsPaginate = (page, limit) => {
    return axios.get(`/api/events?limit=${limit}&page=${page}`)
}

const deleteEvent = (idEvent) => {
    return axios.delete(`/api/events/${idEvent}`)
}
const putEvent = (idEvent, title, valueOpen, valueClose, imageTitle, contentMarkdown, contentHTML,
    map, address, view) => {
    const data = new FormData();
    data.append('title', title);
    data.append('description', address);
    data.append('closing_time_event', valueClose);
    data.append('opening_hours_event', valueOpen);
    data.append('content', map);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('ContentHTML', contentHTML);
    data.append('views', view);
    data.append('event_image', imageTitle);
    data.append('content_image', imageTitle);
    return axios.put(`/api/events/${idEvent}`, data)
}



// NEWS ADMIN
const getAllNews = () => {
    return axios.get(`/api/news`)
}

const getAllNewsPaginate = (page, limit) => {
    return axios.get(`/api/news?limit=${limit}&page=${page}`)
}

const searchNews = (page, limit, title) => {
    return axios.get(`/api/news/search?limit=${limit}&page=${page}&title=${title}`)
}

const postCreateNew = (title, image, contentMarkdown, contentHTML, view) => {
    const data = new FormData();
    data.append('title', title);
    data.append('ContentHTML', contentHTML);
    data.append('news_image', image);
    data.append('content_image', image);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('content', title);
    data.append('description', title);
    data.append('views', view);

    return axios.post(`/api/news`, data)
}

const deleteNew = (idNew) => {
    return axios.delete(`/api/news/${idNew}`)
}

const putNews = (idNews, title, image, contentMarkdown, contentHTML) => {
    const data = new FormData();
    data.append('title', title);
    data.append('ContentHTML', contentHTML);
    data.append('news_image', image);
    data.append('content_image', image);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('content', title);
    data.append('description', title);

    return axios.put(`/api/news/${idNews}`, data)
}

// FOOD ADMIN

const getAllFoods = () => {
    return axios.get(`/api/cuisines`)
}

const getAllFoodsPaginate = (page, limit) => {
    return axios.get(`/api/cuisines?limit=${limit}&page=${page}`)
}

const postCreateFood = (name, address, contentHTML, contentMarkdown, valueOpen, valueClose, image, map) => {
    const data = new FormData();
    data.append('title', name);
    data.append('address', address);
    data.append('description', name);
    data.append('closing_time', valueClose);
    data.append('opening_hours', valueOpen);
    data.append('cuisines_image', image);
    data.append('content_image', image);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('ContentHTML', contentHTML);
    data.append('map', map);

    return axios.post(`/api/cuisines`, data)
}

const deleteFood = (idFood) => {
    return axios.delete(`/api/cuisines/${idFood}`)
}

const putFood = (idFood, name, address, contentHTML, contentMarkdown, valueOpen, valueClose, image, map) => {
    const data = new FormData();
    data.append('title', name);
    data.append('address', address);
    data.append('description', name);
    data.append('closing_time', valueClose);
    data.append('opening_hours', valueOpen);
    data.append('cuisines_image', image);
    data.append('content_image', image);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('ContentHTML', contentHTML);
    data.append('map', map);

    return axios.put(`/api/cuisines/${idFood}`, data)
}

// TOUR ADMIN

const getAllTours = () => {
    return axios.get(`/api/tours`)
}

const getAllToursPaginate = (page, limit) => {
    return axios.get(`/api/tours?limit=${limit}&page=${page}`)
}

const postCreateTour = (title, contentHTML, contentMarkdown, price,
    address, vehicle, members, startDateOpen, image) => {
    const data = new FormData();
    data.append('title', title);
    data.append('description', title);
    data.append('price', +price);
    data.append('address', address);
    data.append('vehicle', vehicle);
    data.append('members', +members);
    data.append('tour_date', startDateOpen);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('ContentHTML', contentHTML);
    data.append('tour_image', image);
    data.append('content_image1', image);
    data.append('content_image2', image);

    return axios.post(`/api/tours`, data)
}

const deleteTour = (idTour) => {
    return axios.delete(`/api/tours/${idTour}`)
}

const putTour = (idTour, title, contentHTML, contentMarkdown, price,
    address, vehicle, members, startDateOpen, image) => {
    const data = new FormData();
    data.append('title', title);
    data.append('description', title);
    data.append('price', +price);
    data.append('address', address);
    data.append('vehicle', vehicle);
    data.append('members', +members);
    data.append('tour_date', startDateOpen);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('ContentHTML', contentHTML);
    data.append('tour_image', image);
    data.append('content_image1', image);
    data.append('content_image2', image);

    return axios.put(`/api/tours/${idTour}`, data)
}

// SHOPPING ADMIN

const getAllShopping = () => {
    return axios.get(`/api/shopping_centers`)
}

const getAllShoppingPaginate = (page, limit) => {
    return axios.get(`/api/shopping_centers?limit=${limit}&page=${page}`)
}

const postCreateShopping = (title, address, contentHTML, contentMarkdown,
    valueClose, valueOpen, type, image, map) => {
    const data = new FormData();
    data.append('title', title);
    data.append('address', address);
    data.append('description', title);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('ContentHTML', contentHTML);
    data.append('closing_time', valueClose);
    data.append('opening_hours', valueOpen);
    data.append('type', type);
    data.append('map', map);
    data.append('shopping_center_image', image);
    data.append('content_image', image);

    return axios.post(`/api/shopping_centers`, data)
}


const deleteShopping = (idShop) => {
    return axios.delete(`/api/shopping_centers/${idShop}`)
}

const putShopping = (idShop, title, address, contentHTML, contentMarkdown,
    valueClose, valueOpen, type, image, map) => {
    const data = new FormData();
    data.append('title', title);
    data.append('address', address);
    data.append('description', title);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('ContentHTML', contentHTML);
    data.append('closing_time', valueClose);
    data.append('opening_hours', valueOpen);
    data.append('type', type);
    data.append('map', map);
    data.append('shopping_center_image', image);
    data.append('content_image', image);

    return axios.put(`/api/shopping_centers/${idShop}`, data)
}




// HOME STAY
const getAllHomeStay = () => {
    return axios.get(`/api/homestays`)
}

const getAllHomeStayPaginate = (page, limit) => {
    return axios.get(`/api/homestays?limit=${limit}&page=${page}`)
}

const postCreateHome = (title, address, price, type, contentHTML, contentMarkdown, image, map) => {
    const data = new FormData();
    data.append('title', title);
    data.append('address', address);
    data.append('price', price);
    data.append('ContentHTML', contentHTML);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('type_bed', type);
    data.append('description', type);
    data.append('room_title', type);
    data.append('homestay_image', image);
    data.append('content_image', image);
    data.append('map', map);

    return axios.post(`/api/homestays`, data)
}

const deleteHome = (idHome) => {
    return axios.delete(`/api/homestays/${idHome}`)
}

const putHome = (idHome, title, address, price, type, contentHTML, contentMarkdown, image, map) => {
    const data = new FormData();
    data.append('title', title);
    data.append('address', address);
    data.append('price', price);
    data.append('ContentHTML', contentHTML);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('type_bed', type);
    data.append('description', type);
    data.append('room_title', type);
    data.append('homestay_image', image);
    data.append('content_image', image);
    data.append('map', map);

    return axios.put(`/api/homestays/${idHome}`, data);
}

// FEEDBACK

const getFeedbackWebPaginate = (page, limit) => {
    return axios.get(`/api/feedback?limit=${limit}&page=${page}`)
}

// BOOK TOUR
const getBookTourHomePaginate = (page, limit) => {
    return axios.get(`/api/bookings?limit=${limit}&page=${page}`)
}
const UpdateBookTour = (data) => {
    return axios.put(`/api/bookings/admin/approvetours`, { ...data })
}
const UpdateBookHome = (data) => {
    return axios.put(`/api/bookings/admin/approvehomestays`, { ...data })
}
const TourPaginate = (page, limit) => {
    return axios.get(`/api/bookings/tours?limit=${limit}&page=${page}`)
}
const HomePaginate = (page, limit) => {
    return axios.get(`/api/bookings/homestays?limit=${limit}&page=${page}`)
}

// INTRO
const getIntro = () => {
    return axios.get(`/api/intro`)
}

const putIntro = (idIntro, data) => {
    return axios.put(`/api/intro/${idIntro}`, { ...data })
}

const postReview = (data) => {
    return axios.post(`/api/reviews/`, { ...data })
}

// MOVE
const getAllMovePaginate = (page, limit) => {
    return axios.get(`/api/moves?limit=${limit}&page=${page}`)
}

const searchMove = (page, limit, title) => {
    return axios.get(`/api/moves/search?limit=${limit}&page=${page}&title=${title}`)
}
const postCreateMove = (title, address, contentHTML, contentMarkdown, type, image, map) => {
    const data = new FormData();
    data.append('title', title);
    data.append('address', address);
    data.append('ContentHTML', contentHTML);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('type_vehicle', type);
    data.append('description', type);
    data.append('moves_image', image);
    data.append('content_image', image);
    data.append('map', map);

    return axios.post(`/api/moves`, data)
}

const deleteMove = (idMove) => {
    return axios.delete(`/api/moves/${idMove}`)
}

const putMove = (idMove, title, address, contentHTML, contentMarkdown, type, image, map) => {
    const data = new FormData();
    data.append('title', title);
    data.append('address', address);
    data.append('ContentHTML', contentHTML);
    data.append('ContentMarkDown', contentMarkdown);
    data.append('type_vehicle', type);
    data.append('description', type);
    data.append('moves_image', image);
    data.append('content_image', image);
    data.append('map', map);

    return axios.put(`/api/moves/${idMove}`, data)
}

// SUGGESt
const getAllQuestionsAdmin = () => {
    return axios.get(`/api/questions`);
}
const getApiQuestionsAdmin = (page, limit) => {
    return axios.get(`/api/questions?limit=${limit}&page=${page}`);
}
const getSearchQuestionsAdmin = (page, limit, input) => {
    return axios.get(`/api/questions/search?limit=${limit}&page=${page}&question_text=${input}`);
}
const postQuesAdmin = (data) => {
    return axios.post(`/api/questions`, { ...data });
}
const deleteQuesAdmin = (idQues) => {
    return axios.delete(`/api/questions/${idQues}`);
}
const putQuesAdmin = (idQues, data) => {
    return axios.put(`/api/questions/${idQues}`, { ...data });
}


//////
const getApiAnswerAdmin = (page, limit) => {
    return axios.get(`/api/answers?limit=${limit}&page=${page}`);
}
const getSearchAnswerAdmin = (page, limit, input) => {
    return axios.get(`/api/answers/search?limit=${limit}&page=${page}&answer_text=${input}`);
}
const postApiAnswerAdmin = (data) => {
    return axios.post(`/api/answers`, { ...data });
}
const deleteApiAnswerAdmin = (idAnswer) => {
    return axios.delete(`/api/answers/${idAnswer}`);
}
const putApiAnswerAdmin = (idAnswer, data) => {
    return axios.put(`/api/answers/${idAnswer}`, { ...data });
}


///////
const getApiDownAnswerAdmin = (page, limit) => {
    return axios.get(`/api/downanswers?limit=${limit}&page=${page}`);
}
const getSearchDownAnswerAdmin = (page, limit, input) => {
    return axios.get(`/api/downanswers/search?limit=${limit}&page=${page}&downanswer_text=${input}`);
}
const postApiDownAnswerAdmin = (data) => {
    return axios.post(`/api/downanswers`, { ...data });
}
const putApiDownAnswerAdmin = (idDownAnswer, data) => {
    return axios.put(`/api/downanswers/${idDownAnswer}`, { ...data });
}
const deleteApiDownAnswerAdmin = (idDownAnswer) => {
    return axios.delete(`/api/downanswers/${idDownAnswer}`);
}



export {
    postCreateUser, getAllUsers, putUsers, deleteUsers, getAllUsersPaginate,
    postCreateEvent, getAllEvents, deleteEvent, putEvent, getAllEventsPaginate, searchEvents,
    getAllNews, postCreateNew, deleteNew, putNews, getAllNewsPaginate, searchNews,
    getAllFoods, postCreateFood, deleteFood, putFood, getAllFoodsPaginate,
    getAllTours, postCreateTour, deleteTour, putTour, getAllToursPaginate,
    getAllShopping, postCreateShopping, deleteShopping, putShopping, getAllShoppingPaginate,
    getAllHomeStay, postCreateHome, deleteHome, putHome, getAllHomeStayPaginate,
    getFeedbackWebPaginate,
    getBookTourHomePaginate, UpdateBookTour, TourPaginate, HomePaginate, UpdateBookHome,
    getIntro, putIntro,
    postReview,
    getAllMovePaginate, postCreateMove, deleteMove, putMove, searchMove,
    getApiQuestionsAdmin, postQuesAdmin, deleteQuesAdmin, putQuesAdmin, getAllQuestionsAdmin,
    getApiAnswerAdmin, postApiAnswerAdmin, deleteApiAnswerAdmin, putApiAnswerAdmin,
    getApiDownAnswerAdmin, postApiDownAnswerAdmin, putApiDownAnswerAdmin, deleteApiDownAnswerAdmin,
    getSearchQuestionsAdmin, getSearchAnswerAdmin, getSearchDownAnswerAdmin

}