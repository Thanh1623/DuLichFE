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
const postCreateEvent = (title, description, imageContent,
    imageTitle, content, startDateClose, startDateOpen, view) => {
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('closing_time_event', startDateClose);
    data.append('opening_hours_event', startDateOpen);
    data.append('content', content);
    data.append('view', view);

    if (imageTitle instanceof File) {
        data.append('event_image', imageTitle); // Gửi file ảnh
    } else if (Array.isArray(imageTitle)) {
        // Nếu có nhiều file, append từng file
        imageTitle.forEach((file, index) => {
            data.append(`event_image`, file);
        });
    }

    if (imageContent instanceof File) {
        data.append('content_image', imageContent); // Gửi file ảnh
    } else if (Array.isArray(imageContent)) {
        // Nếu có nhiều file, append từng file
        imageContent.forEach((file, index) => {
            data.append(`content_image`, file);
        });
    }
    return axios.post(`/api/events`, data, {
        headers: {
            'Content-Type': 'multipart/form-data', // Đảm bảo headers đúng
        },
    })
}

const getAllEvents = () => {
    return axios.get(`/api/events`)
}

const deleteEvent = (idEvent) => {
    return axios.delete(`/api/events/${idEvent}`)
}


// NEWS ADMIN
const getAllNews = () => {
    return axios.get(`/api/news`)
}

const postCreateNew = (title, image, content, contentHTML) => {
    const data = new FormData();
    data.append('title', title);
    data.append('description', contentHTML);
    data.append('news_image', image);
    data.append('content_image', image);
    data.append('content', content);

    return axios.post(`/api/news`, data)
}

const deleteNew = (idNew) => {
    return axios.delete(`/api/news/${idNew}`)
}

// FOOD ADMIN

const getAllFoods = () => {
    return axios.get(`/api/cuisines`)
}

const postCreateFood = (title, address, description, opening_hours, closing_time,image) => {
    const data = new FormData();
    data.append('title', title);
    data.append('address', address);
    data.append('description', description);
    data.append('closing_time', closing_time);
    data.append('opening_hours', opening_hours);
    data.append('cuisines_image', image);
    data.append('content_image', image);

    return axios.post(`/api/cuisines`, data)
}

const deleteFood = (idFood) => {
    return axios.delete(`/api/cuisines/${idFood}`)
}

// TOUR ADMIN

const getAllTours = () => {
    return axios.get(`/api/tours`)
}

const postCreateTour = (title, contentHTML, price, address, vehicle, members, startDateOpen, image) => {
    const data = new FormData();
    data.append('title', title);
    data.append('description', contentHTML);
    data.append('price', +price);
    data.append('address', address);
    data.append('vehicle', vehicle);
    data.append('members', members);
    data.append('tour_date', startDateOpen);
    data.append('tour_image', image);
    data.append('content_image1', image);
    data.append('content_image2', image);

    return axios.post(`/api/tours`, data)
}

const deleteTour = (idTour) => {
    return axios.delete(`/api/tour/${idTour}`)
}

// SHOPPING ADMIN

const getAllShopping = () => {
    return axios.get(`/api/shopping_centers`)
}

const postCreateShopping = (title, address, contentHTML, valueClose, valueOpen, type, image) => {
    const data = new FormData();
    data.append('title', title);
    data.append('address', address);
    data.append('description', contentHTML);
    data.append('closing_time', valueClose);
    data.append('opening_hours', valueOpen);
    data.append('type', type);
    data.append('shopping_center_image', image);
    data.append('content_image', image);

    return axios.post(`/api/shopping_centers`, data)
}

const deleteShopping = (idShop) => {
    return axios.delete(`/api/shopping_centers/${idShop}`)
}

export {
    postCreateUser, getAllUsers, putUsers, deleteUsers,
    postCreateEvent, getAllEvents, deleteEvent,
    getAllNews, postCreateNew, deleteNew,
    getAllFoods, postCreateFood, deleteFood,
    getAllTours, postCreateTour, deleteTour,
    getAllShopping, postCreateShopping, deleteShopping
}