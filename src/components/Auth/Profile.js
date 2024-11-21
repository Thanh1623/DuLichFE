import { useEffect, useState } from "react";
import { getProfileUser, putProfileUser } from "../../Service/userService";
import { useDispatch, useSelector } from "react-redux";
import { putUsers } from "../../Service/apiServices";
import { toast } from "react-toastify";


const Profile = () => {

    const idUser = useSelector(state => state.user.account.idUser);

    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(true);

    // const dispatch = useDispatch();



    const validateForm = () => {
        const newErrors = {};

        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';

        if (!username) newErrors.username = 'Username is required';

        if (!fullName) newErrors.fullName = 'Full name is required';

        if (!phone) newErrors.phone = 'Phone number is required';
        else if (!/^\d{8,13}$/.test(phone)) newErrors.phone = 'Phone number must contain only digits';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Trả về `true` nếu không có lỗi
    };


    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        let data = await getProfileUser(idUser);
        if (data && data.code === 201) {
            setPhone(data.result.phone);
            setFullName(data.result.full_name);
            setEmail(data.result.email);
            setUsername(data.result.user_name);
        }
        if (data && data.code !== 201) {
            setPhone('');
            setFullName('');
            setEmail('');
            setUsername('');
        }
    }

    const handleUpdateProfile = async () => {
        if (validateForm()) {
            let res = await putProfileUser(idUser, {
                user_name: username,
                full_name: fullName,
                email: email,
                phone: phone,
            })
            if (res && res.code === 201) {
                toast.success(res.message)
            }
            if (res && res.code !== 201) {
                toast.error(res.message)
            }
        }
    }

    // useEffect(() => {
    //     setSubmit(false);
    // }, [phone, fullName, email, username])

    return (
        <>
            <div className="container">
                <div>
                    <div className="mb-3 pt-4">
                        <label htmlFor="exampleInputEmail1" className="div-label">Email: </label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="exampleInputEmail1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUsername1" className="form-label">Tên người dùng:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            id="exampleInputUsername1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <div className="text-danger">{errors.username}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputFullName1" className="form-label">Họ và tên:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                            id="exampleInputFullName1"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPhone1" className="form-label">Số điện thoại:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            id="exampleInputPhone1"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && <div className="text-danger">{errors.phone}</div>}
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handleUpdateProfile}
                // disabled={submit}
                >Gửi</button>
            </div>

        </>
    )
}

export default Profile;