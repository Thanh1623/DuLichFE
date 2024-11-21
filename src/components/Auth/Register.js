import { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { postRegister } from '../../Service/userService';

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");

    const [isShowPassword, setIsShowPassword] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const validatePhone = (value) => {
        // if (value.replace(/\D/g, '').length >= 8 && value.replace(/\D/g, '').length <= 13) {
        //     if (value.includes(' ')) {
        //         return false;
        //     }
        //     return true
        // }
        // else {
        //     return false
        // }
        return /^\d{8,13}$/.test(value);
    }
    const handleRegister = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        const isValidPhone = validatePhone(phone);
        console.log(isValidPhone)
        if (!isValidEmail) {
            toast.error('Invalid email')
            return;
        }
        if (!isValidPhone) {
            toast.error('Invalid phone')
            return;
        }

        if (!password) {
            toast.error('Invalid password')
            return;
        }
        if (!username) {
            toast.error('Invalid username')
            return;
        }
        if (!fullName) {
            toast.error('Invalid full name')
            return;
        }

        // submit apis
        let data = await postRegister({
            user_name: username,
            full_name: fullName,
            email: email,
            password: password,
            phone: phone,
        });
        if (data && +data.code === 201) {
            toast.success(data.message);
            navigate('/login')
        }

        if (data && +data.code !== 201) {
            toast.error(data.message);
        }
        console.log(data)

    }
    return (
        <div className="register-container">
            <div className='header'>
                <span> Bạn đã có tài khoản?</span>
                <button onClick={() => navigate('/login')}>Đăng nhập</button>
            </div>
            <div className='title col-4 mx-auto'>
                TravelBaba
            </div>
            <div className='welcome col-4 mx-auto'>
                Bắt đầu hành trình của bạn?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email (*)</label>
                    <input
                        type={"email"}
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Số điện thoại (*)</label>
                    <input
                        className="form-control"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </div>
                <div className='form-group pass-group'>
                    <label>Mật khẩu: (*)</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    {isShowPassword ?
                        <span className="icons-eye"
                            onClick={() => setIsShowPassword(false)}>
                            <VscEye />
                        </span>
                        :
                        <span className="icons-eye"
                            onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <div className='form-group'>
                    <label>Tên người dùng:(*)</label>
                    <input
                        type={"text"}
                        className="form-control"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Họ và tên:(*)</label>
                    <input
                        type={"text"}
                        className="form-control"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                </div>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleRegister()}
                    >Tạo tài khoản miễn phí của tôi</button>
                </div>
                <div className='text-center'>
                    <span className="back" onClick={() => { navigate('/') }}>
                        &#60;&#60; Đi đến trang chủ
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Register;