import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuHeader from './MenuHeader';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.svg';
import { CgUserList } from "react-icons/cg";
import { doLogOut } from '../../redux/action/userAction';


const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const handleLogin = () => {
        navigate('/login')
    }
    const handleLogOut = () => {
        dispatch(doLogOut());
        window.location.reload(true)
    }
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink to="/" className='navbar-brand'>
                        <img src={logo} style={{ maxWidth: '66px' }} />
                    </NavLink>
                    <MenuHeader />
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <CgUserList style={{ color: 'black', fontSize: '29px' }} />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className='nav-link'>Trang chủ</NavLink>
                            <NavLink to="/introduce" className='nav-link'>Giới thiệu</NavLink>
                            <NavLink to="/discover" className='nav-link'>Khám phá</NavLink>
                            <NavLink to="/shopping" className='nav-link'>Mua sắm và giải trí</NavLink>
                            <NavLink to="/homeStay" className='nav-link'>Nghỉ dưỡng</NavLink>
                        </Nav>
                        <Nav>
                            {isAuthenticated === false ?
                                <>
                                    <button className='btn-login'
                                        onClick={() => handleLogin()}
                                    >Log in</button>
                                    <button className='btn-signup'>Sign up</button>
                                </>
                                :
                                < NavDropdown title="Settings" id="basic-nav-dropdown">
                                    <NavDropdown.Item >
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogOut()}>
                                        Log out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;