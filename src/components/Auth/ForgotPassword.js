import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { postForgotPassword, postResetPassword } from "../../Service/userService";
import { toast } from "react-toastify";


const ForgotPassword = () => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [codeEmail, setCodeEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [info, setInfo] = useState('');

    const handleConfirm = async () => {
        let data = await postForgotPassword({
            user_name: username,
            email: email
        })
        if (!username || !email) {
            toast.error('Invalid input');
            return;
        }
        if (data && data.code === 201) {
            setConfirm(true);
            setInfo(false);
        }
        else{
            toast.error('Error');
            setConfirm(false);
            setInfo(true);
        }
    }

    const handleReset = async() => {
        if (!username || !email || !newPassword) {
            toast.error('Invalid input');
            return;
        }
        let data = await postResetPassword({
            user_name: username,
            reset_code: codeEmail,
            new_password: newPassword
        })
        if (data && data.code === 201) {
            toast.success(data.message);
            navigate('/login');
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
                <button
                    onClick={() => navigate('/login')}
                >Login</button>
            </div>

            <div className='title col-4 mx-auto'>
                ThanhNguyen
            </div>
            <div className='welcome col-4 mx-auto' style={{ fontSize: '35px', fontWeight: '600' }}>
                Reset password
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>

            <div className='content-form col-4 mx-auto'>
                {
                    confirm === false &&
                    <div>
                        <div className='form-group'>
                            <label>Email: </label>
                            <input type='email' className='form-control'
                                value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>User name: </label>
                            <input type='text' className='form-control'
                                value={username} onChange={(event) => setUserName(event.target.value)}

                            />
                        </div>
                        <div>
                            <button className='btn btn-submit'
                                onClick={() => handleConfirm()}
                                disabled={isLoading}
                                style={{ cursor: 'pointer' }}
                            >
                                {
                                    isLoading === true && <TbFidgetSpinner className='loader-icon' />
                                }
                                <span>Confirm</span>
                            </button>
                        </div>

                    </div>
                }

                {
                    confirm === true &&
                    <div className=''>
                        <div className='form-group'>
                            <label>User name: </label>
                            <input type='text' className='form-control'
                                value={username} onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Code email: </label>
                            <input type='email' className='form-control'
                                value={codeEmail} onChange={(event) => setCodeEmail(event.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>New password: </label>
                            <input type='email' className='form-control'
                                    value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                        </div>
                        <div>
                            <button className='btn btn-submit'
                                onClick={() => handleReset()}
                                disabled={isLoading}
                                style={{ cursor: 'pointer' }}
                            >
                                {
                                    isLoading === true && <TbFidgetSpinner className='loader-icon' />
                                }
                                <span>Reset</span>
                            </button>
                        </div>
                    </div>
                }

                <div className='text-center' style={{ marginBottom: '36px' }}>
                    <span className='back' onClick={() => navigate('/')}>&#60;&#60; Go to Home</span>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;