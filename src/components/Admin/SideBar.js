import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg1.png';
import { IoLogoReact } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import './SideBar.scss';
import { Link } from 'react-router-dom';
import { BiBookHeart } from "react-icons/bi";



const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <IoLogoReact size={'2em'} color={'00bfff'} />
                        <span>Thanh Nguyen</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        >
                            Introduce
                            <Link to={'/admin'} />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title='User'
                        >
                            <MenuItem >
                                Quản lý Users
                                <Link to={'/admin/manage-users'} />
                            </MenuItem>


                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<BiBookHeart />}
                            title='Booking'
                        >
                            <MenuItem>
                                Booking tour
                                <Link to={'/admin/manage-booking-home'} />
                            </MenuItem>
                            <MenuItem>
                                Booking tour
                                <Link to={'/admin/manage-booking-tour'} />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<BiBookHeart />}
                            title='Events-News'
                        >
                            <MenuItem>
                                Quản lý tin tức
                                <Link to={'/admin/manage-news'} />
                            </MenuItem>
                            <MenuItem>
                                <Link to={'/admin/manage-events'} />
                                Quản lý sự kiện
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<BiBookHeart />}
                            title='Service'
                        >
                            <MenuItem>
                                Ẩm thực
                                <Link to={'/admin/manage-foods'} />
                            </MenuItem>
                            <MenuItem>
                                Du lịch
                                <Link to={'/admin/manage-tours'} />
                            </MenuItem>
                            <MenuItem>
                                Mua sắm
                                <Link to={'/admin/manage-shops'} />
                            </MenuItem>
                            <MenuItem>
                                HomeStay
                                <Link to={'/admin/manage-homestays'} />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<BiBookHeart />}
                            title='Feed back'
                        >
                            <MenuItem>
                                  Feedback Web
                                <Link to={'/admin/admin-feedback'} />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            // href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Thanh Nguyen
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;