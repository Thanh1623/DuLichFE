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
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />}>
                    {/* <Route index element={<DashBoard />} /> */}
                    <Route path="manage-users" element={<ManageUser />} />
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