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

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="introduce" element={<Introduce />} />
                    <Route path="discover" element={<Discover />} />
                    <Route path="planning" element={<Introduce />} />
                    <Route path="extension" element={<Introduce />} />
                    <Route path="food" element={<Food />} />
                </Route>
                <Route path="/news/:id" element={<DetailNews />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<AdminIntroduce />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-news" element={<ManageNews />} />
                    <Route path="manage-events" element={<ManageEvents />} />
                    <Route path="manage-foods" element={<ManageFoods />} />
                    <Route path="manage-tours" element={<ManageTour />} />
                    <Route path="manage-shops" element={<ManageShopping />} />
                    <Route path="manage-homestays" element={<ManageHomeStay />} />
                </Route>

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