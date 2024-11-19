import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './components/Home/HomePage'
import Introduce from './components/Introduce/Introduce'
import App from "./App";
import Login from "./components/Auth/Login";
import Register from './components/Auth/Register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./components/Admin/Admin";
import ManageUser from "./components/Admin/Content/ManageUser";
import Discover from "./components/Discover/Discover";
import AdminIntroduce from "./components/Admin/Content/AdminIntroduce";
import ManageNews from "./components/Admin/News/ManageNews";
import ManageEvents from "./components/Admin/Milestone/ManageEvents";
import Food from "./components/Food/Food";
import ManageFoods from "./components/Admin/FoodAdmin/ManageFoods";
import ManageTour from "./components/Admin/TourAdmin/ManageTour";
import ManageShopping from "./components/Admin/Shopping/ManageShopping";
import ManageHomeStay from "./components/Admin/HomeStayAdmin/ManageHomeStay";
import DetailNews from "./components/Home/DetailNews/DetailNews";
import DetailEvent from "./components/Home/DetailEvent/DetailEvent";
import DetailFood from "./components/Food/DetailFood";
import DetailDiscover from "./components/Discover/DetailDiscover";
import BookTour from "./components/Discover/BookTour";
import ManageBookingHome from "./components/Admin/BookingAdmin/HomeStay/ManageBookingHome";
import ManageBookingTour from "./components/Admin/BookingAdmin/Tours/ManageBookingTour";
import ForgotPassword from "./components/Auth/ForgotPassword";
import AllEvents from "./components/Home/DetailEvent/AllEvents";
import { useSelector } from "react-redux";
import FeedbackWeb from "./components/Admin/Feedback/FeedbackWeb";
import Shopping from "./components/Shopping/Shopping";
import DetailShopping from "./components/Shopping/DetailShopping";
import AllNews from "./components/Home/DetailNews/AllNews";
import HomeStayUser from "./components/HomeStay/HomeStayUser";
import DetailHome from "./components/HomeStay/DetailHome";
import BookHome from "./components/HomeStay/BookHome";
import ChangePass from "./components/Auth/ChangePass";
import ManageMove from "./components/Admin/Move/ManageMoveAdmin";
import Move from "./components/MoveUser/Move";
import DetailMove from "./components/MoveUser/DetailMove";
import Suggest from "./components/Suggest/Suggest";
import SuggestQues from "./components/Admin/Suggest/SuggestQues";
import Profile from "./components/Auth/Profile";

const Layout = (props) => {
    const role = useSelector(state => state.user.account.role);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="introduce" element={<Introduce />} />
                    <Route path="discover" element={<Discover />} />
                    <Route path="shopping" element={<Shopping />} />
                    <Route path="homeStay" element={<HomeStayUser />} />
                    <Route path="food" element={<Food />} />
                    <Route path="move" element={<Move />} />
                    <Route path="allEvents" element={<AllEvents />} />
                    <Route path="allNews" element={<AllNews />} />
                    <Route path="suggest" element={<Suggest />} />
                    <Route path="/news/:id" element={<DetailNews />} />
                    <Route path="/events/:id" element={<DetailEvent />} />
                    <Route path="/food/:id" element={<DetailFood />} />
                    <Route path="/discover/:id" element={<DetailDiscover />} />
                    <Route path="/shopping/:id" element={<DetailShopping />} />
                    <Route path="/homeStay/:id" element={<DetailHome />} />
                    <Route path="/move/:id" element={<DetailMove />} />
                    <Route path="changePassword" element={<ChangePass />} />
                    <Route path="profile" element={<Profile />} />

                    <Route path="/bookingTour" element={<BookTour />} />
                    <Route path="/bookingHome" element={<BookHome />} />
                </Route>



                <Route path="/login" element={<Login />} />
                <Route path="/all-events" element={<AllEvents />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                {
                    <Route path="/admin" element={<Admin />}>
                        <Route index element={<AdminIntroduce />} />
                        <Route path="manage-users" element={<ManageUser />} />
                        <Route path="manage-news" element={<ManageNews />} />
                        <Route path="manage-events" element={<ManageEvents />} />
                        <Route path="manage-foods" element={<ManageFoods />} />
                        <Route path="manage-tours" element={<ManageTour />} />
                        <Route path="manage-shops" element={<ManageShopping />} />
                        <Route path="manage-homestays" element={<ManageHomeStay />} />
                        <Route path="manage-move" element={<ManageMove />} />
                        <Route path="manage-suggest" element={<SuggestQues />} />
                        <Route path="manage-booking-home" element={<ManageBookingHome />} />
                        <Route path="manage-booking-tour" element={<ManageBookingTour />} />
                        <Route path="manage-booking-tour" element={<ManageBookingTour />} />
                        <Route path="admin-feedback" element={<FeedbackWeb />} />
                    </Route>

                }


            </Routes>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
export default Layout;