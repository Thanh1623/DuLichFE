import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuHeader from './MenuHeader';


const Header = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink to="/" className='navbar-brand'>Thanh Nguyen</NavLink>
                    <MenuHeader />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className='nav-link'>Trang chủ</NavLink>
                            <NavLink to="/introduce" className='nav-link'>Giới thiệu</NavLink>
                            <NavLink to="/discover" className='nav-link'>Khám phá</NavLink>
                            <NavLink to="/planning" className='nav-link'>Lập kế hoạch</NavLink>
                            <NavLink to="/extension" className='nav-link'>Tiện ích du lịch</NavLink>
                        </Nav>
                        <Nav>
                            <button className='btn-login'
                                onClick={() => navigate('/login')}
                            >Log in</button>
                            <button className='btn-signup'
                                onClick={() => navigate('/register')}
                            >Sign up</button>
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item >
                                    Login
                                </NavDropdown.Item>
                                <NavDropdown.Item >
                                    Log out
                                </NavDropdown.Item>
                                <NavDropdown.Item >
                                    Profile
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;