import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { postCreateUser } from '../../../Service/apiServices';
// import { postCreateNewUser } from '../../../Service/apiService';

function ModalCreateUser(props) {
    const { show, setShow } = props;

    const handleClose = () => {
        setShow(false);
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('user');
        setFullName('');
        setPhone('');
    };

    // const [dataUser, setDataUser] = useState({
    //     user_name: '',
    //     full_name: '',
    //     email: '',
    //     password: '',
    //     phone: '',
    //     role: '',
    // });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user');
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [validationErrors, setValidationErrors] = useState({});


    // const handleUpLoadImage = (event) => {
    //     if (event.target && event.target.files && event.target.files[0]) {
    //         setPreviewImage(URL.createObjectURL(event.target.files[0]));
    //         setImage(event.target.files[0]);
    //     }
    //     else {
    //         // setPreviewImage('');
    //     }
    // }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const validate = () => {
        const errors = {};

        if (!email) {
            errors.email = 'Email is required';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (!username) {
            errors.username = 'Username is required';
        } else if (username.length < 3) {
            errors.username = 'Username must be at least 3 characters long';
        }

        if (!phone) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{8,13}$/.test(phone)) {
            errors.phone = 'Phone number is invalid';
        }

        if (!fullName) {
            errors.fullName = 'Full name is required';
        } else if (fullName.length < 3) {
            errors.fullName = 'Full name must be at least 3 characters long';
        }

        return Object.keys(errors).length === 0 ? true : errors;
    };


    const handleSubmitCreateUser = async () => {
        // validate
        const validation = validate();

        if (validation === true) {
            let data = await postCreateUser({
                user_name: username,
                full_name: fullName,
                email: email,
                password: password,
                phone: phone,
                role: role
            })
            if (data && data.code === 201) {
                toast.success(data.message);
                handleClose();
                await props.fetchListUsers()
            }
            if (data && data.code !== 201) {
                toast.error(data.message)
            }
        } else {
            // Hiển thị các lỗi
            setValidationErrors(validation);
            console.log(validation)
        }
        

    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label" >Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)} />
                            {validationErrors.email && <span className="text-danger">{validationErrors.email}</span>}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            {validationErrors.password && <span className="text-danger">{validationErrors.password}</span>}

                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            {validationErrors.username && <span className="text-danger">{validationErrors.username}</span>}

                        </div>
                        <div className="col-md-6">
                            <label className="form-label">FullName</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                            {validationErrors.fullName && <span className="text-danger">{validationErrors.fullName}</span>}

                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                            {validationErrors.phone && <span className="text-danger">{validationErrors.phone}</span>}

                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                            >
                                <option value='user'>USER</option>
                                <option value='admin'>ADMIN</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;