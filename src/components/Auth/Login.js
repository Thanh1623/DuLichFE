import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postLogin } from '../../Service/userService';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { TbFidgetSpinner } from "react-icons/tb";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    function handleKeyPress(e) {
        var key = e.keyCode || e.which;
        if (key === 13 || key === "Enter") {
            handleLogin();
        }
    }
    const handleLogin = async () => {
        // validate
        if (!email) {
            toast.error('Invalid username')
        }
        if (!password) {
            toast.error('Invalid password')
        }

        // submit apis
        setIsLoading(true)
        let data = await postLogin({
            user_name: email,
            password: password
        });
        if (data && +data.code === 201) {
            dispatch(doLogin(data))
            toast.success(data.message);
            navigate('/');
            setIsLoading(false)
        }

        if (data && +data.code !== 201) {
            toast.error(data.message);
            setIsLoading(false)

        }
    }

    return (
        <div className="login-container">
            <div className='header'>
                <span>
                    Don't have an account yet?
                </span>
                <button
                    onClick={() => navigate('/register')}
                >Sign up</button>
            </div>

            <div className='title col-4 mx-auto'>
                ThanhNguyen
            </div>



            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>

            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Username</label>
                    <input type='' className='form-control'
                        value={email} onChange={(event) => setEmail(event.target.value)}
                        onKeyPress={(event) => handleKeyPress(event)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type='password' className='form-control'
                        value={password} onChange={(event) => setPassword(event.target.value)}
                        onKeyPress={(event) => handleKeyPress(event)}
                    />
                </div>
                <span className='forgot-password' style={{ cursor: 'pointer', color: 'blue' }} onClick={() => navigate('/forgot-password')}>Forgot password?</span>
                <div>
                    <button className='btn-submit'
                        onClick={() => handleLogin()}
                        disabled={isLoading}

                    >
                        {
                            isLoading === true && <TbFidgetSpinner className='loader-icon' />
                        }
                        <span>Login</span>
                    </button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => navigate('/')}>&#60;&#60; Go to Home</span>
                </div>
            </div>
        </div>
    )
}

export default Login;