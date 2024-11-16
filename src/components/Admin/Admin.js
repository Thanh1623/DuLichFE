import './Admin.scss';
import SideBar from './SideBar'
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useDispatch, useSelector } from 'react-redux';
import { IoIosLogOut } from "react-icons/io";
import { doLogOut } from '../../redux/action/userAction';


const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const role = useSelector(state => state.user.account.role);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogOut = () => {
        dispatch(doLogOut());
        window.location.reload(true, navigate('/login'));
    }
    return (
        <>
            {
                isAuthenticated && role && role === 'admin' ?
                    <div className="admin-container">
                        <div className="admin-sidebar">
                            <SideBar collapsed={collapsed} />
                        </div>
                        <div className="admin-content">
                            <div className="admin-header d-flex justify-content-between">
                                <span>
                                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                                </span>
                                <span className='logout'>
                                    <IoIosLogOut onClick={() => handleLogOut()} />
                                </span>
                            </div>
                            <div className="admin-main">
                                <PerfectScrollbar>
                                    <Outlet />
                                </PerfectScrollbar>
                            </div>
                        </div>

                    </div>
                    :
                    <div className='text-xxl-center' style={{ fontSize: '45px' }}>
                        404 Not found
                    </div>
            }
        </>

    )
}

export default Admin;