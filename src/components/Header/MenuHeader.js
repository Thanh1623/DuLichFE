
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
                        <MenuItem onClick={() => navigate('/login')}>
                            Giới thiệu
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/login')}>
                            Tin tức
                        </MenuItem>
                        <MenuItem>
                            Sự kiện
                        </MenuItem>
                    </div>
                    <div className='up-travel'>
                        <div className='title'>
                            Du lịch
                        </div>
                        <MenuItem onClick={() => navigate('/login')}>
                            Lưu trú
                        </MenuItem>
                        <MenuItem>
                            Khám phá
                        </MenuItem>
                        <MenuItem>
                            Ẩm thực
                        </MenuItem>
                    </div>
                    <div className='up-category'>
                        <div className='title'>
                            Danh mục
                        </div>
                        <MenuItem onClick={() => navigate('/login')}>
                            Trung tâm mua sắm, giải trí
                        </MenuItem>
                        <MenuItem>
                            Khám phá
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/food')}>
                            Ẩm thực
                        </MenuItem>
                    </div>
                </div>
                <hr />
                <div className='menuheader-content-down d-flex'>
                    <div className='down-contact'>
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
                    </div>
                    <div className='down-netwwork'>
                        <div className='title'>
                            Mạng xã hội
                        </div>
                        <MenuItem onClick={() => navigate('/login')}>
                            Facebook
                        </MenuItem>
                        <MenuItem>
                            Instagram
                        </MenuItem>
                        <MenuItem>
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