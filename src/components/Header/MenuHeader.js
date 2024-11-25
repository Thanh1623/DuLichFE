
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdMenu } from "react-icons/md";
import { MdMenuOpen } from "react-icons/md";
import './MenuHeader.scss'


const MenuHeader = (props) => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState(true);
    return (
        <Menu menuButton={
            <MenuButton onClick={() => setMenu(!menu)} style={{ border: 'none', background: 'none', fontSize: '25px' }} >
                {menu ? <MdMenu /> : <MdMenuOpen />}
            </MenuButton>
        } transition>
            <div className='menuheader-container'>
                <div className='menuheader-content-up d-flex'>
                    <div className='up-intro'>
                        <div className='title'>
                            Giới thiệu
                        </div>
                        <MenuItem onClick={() => navigate('/introduce')}>
                            Giới thiệu
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/allNews')}>
                            Tin tức
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/allEvents')}>
                            Sự kiện
                        </MenuItem>
                    </div>
                    <div className='up-travel'>
                        <div className='title'>
                            Du lịch
                        </div>
                        <MenuItem onClick={() => navigate('/homeStay')}>
                            Lưu trú
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/discover')}>
                            Khám phá
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/food')}>
                            Ẩm thực
                        </MenuItem>
                    </div>
                    <div className='up-category'>
                        <div className='title'>
                            Danh mục
                        </div>
                        <MenuItem onClick={() => navigate('/shopping')}>
                            Trung tâm mua sắm, giải trí
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/move')}>
                            Di chuyển
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/suggest')}>
                            Gợi ý thông minh
                        </MenuItem>
                    </div>
                </div>
                <hr />
                <div className='menuheader-content-down d-flex'>
                    {/* <div className='down-contact'>
                        <div className='title'>
                            Liên hệ
                        </div>
                        <MenuItem onClick={() => navigate('/login')}>
                            Liên hệ
                        </MenuItem>
                        <MenuItem>
                            Hỏi đáp
                        </MenuItem>
                        <MenuItem>
                            Danh bạ
                        </MenuItem>
                    </div> */}
                    <div className='down-netwwork'>
                        <div className='title'>
                            Mạng xã hội
                        </div>
                        <MenuItem onClick={() => { window.open('https://www.facebook.com/profile.php?id=61564989639710', '_blank'); }}>
                            Facebook
                        </MenuItem>
                        <MenuItem onClick={() => { window.open('https://zalo.me/0964710577', '_blank'); }}>
                            Zalo
                        </MenuItem>
                        <MenuItem>
                            Youtube
                        </MenuItem>
                        <MenuItem>
                            Tik Tok
                        </MenuItem>
                    </div>
                </div>
            </div>

        </Menu>
    );
}

export default MenuHeader;