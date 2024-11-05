import axios from "../utils/axiosCustomize";

// USER ADMIN
const postCreateUser = (data) => {
    return axios.post(`/api/users`, { ...data })
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
const getFeedbackWeb = () => {
    return axios.get(`/api/feedback`);
}

export {
    postCreateUser, getAllUsers, putUsers, deleteUsers,
    postCreateEvent, getAllEvents, deleteEvent, putEvent,
    getAllNews, postCreateNew, deleteNew, putNews,
    getAllFoods, postCreateFood, deleteFood, putFood,
    getAllTours, postCreateTour, deleteTour, putTour,
    getAllShopping, postCreateShopping, deleteShopping, putShopping,
    getAllHomeStay, postCreateHome, deleteHome, putHome,
    getFeedbackWeb
}