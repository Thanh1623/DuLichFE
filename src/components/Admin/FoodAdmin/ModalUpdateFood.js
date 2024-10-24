import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
// import { postCreateNewUser, putUpdateUser } from '../../../Service/apiService';
import _ from 'lodash';
import { putUsers } from '../../../Service/apiServices';
import DatePicker from "react-datepicker";
import { IoIosCalendar } from "react-icons/io";
import { Buffer } from 'buffer';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import TimePicker from 'react-time-picker';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalUpdateFood (props) {
    const { show, setShow } = props;
    const { dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
        props.resetUpdateData()
    };

    const [valueOpen, setValueOpen] = useState('10:00');
    const [valueClose, setValueClose] = useState('10:00');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [image, setImage] = useState('');



    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            console.log('dataUpdate: ', dataUpdate);
            setName(dataUpdate.title);
            setAddress(dataUpdate.address);
            setValueOpen(dataUpdate.opening_hours);
            setValueClose(dataUpdate.closing_time);
            setImage(dataUpdate.cuisines_image)            
        }
    }, [dataUpdate])


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
    const formatDate = (date) => {
        if (!date) return ""; // Kiểm tra nếu date là null
        return date.toISOString().split("T")[0]; // Chuyển đổi sang YYYY-MM-DD
    };
    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }

    const handleSubmitCreateUser = async () => {
        // validate
        // const isValidEmail = validateEmail(email);
        // if (!isValidEmail) {
        //     toast.error('Invalid email')
        //     return;
        // }

        // let data = await putUsers(dataUpdate.user_id, {
        //     user_name: username,
        //     full_name: fullName,
        //     email: email,
        //     phone: phone,
        //     role: role
        // })
        // if (data && data.code === 201) {
        //     toast.success(data.message);
        //     handleClose();
        // await props.fetchListUsers()
        // props.setCurrentPage(1);
        // await props.fetchListUsersWithPaginate(props.currentPage)
        // }
        // if (data && data.code !== 201) {
        //     toast.error(data.message)
        // }
        // call api
        // let data = await putUpdateUser(dataUpdate.id, username, role, image)
        // if (data && data.EC === 0) {
        //     toast.success(data.EM);
        //     handleClose();
        //     // await props.fetchListUsers()
        //     // props.setCurrentPage(1);
        //     await props.fetchListUsersWithPaginate(props.currentPage)
        // }
        // if (data && data.EC !== 0) {
        //     toast.error(data.EM)
        // }
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
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 row'>
                        <div className="mb-3">
                            <label className="form-label">Restaurant name:</label>
                            <textarea className="form-control" rows="1"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address:</label>
                            <textarea className="form-control" rows="3"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Title image: </label>
                            <input type='file'
                                onChange={(event) => setImage(event.target.files[0])}
                            />
                        </div>
                        <div className="mb-3 col-5">
                            <label className="form-label">Open time: </label>
                            <TimePicker onChange={setValueOpen} value={valueOpen} />
                        </div>
                        <div className="mb-3 col-5">
                            <label className="form-label">Close time: </label>
                            <TimePicker onChange={setValueClose} value={valueClose} />
                        </div>
                        <div>
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                        </div>
                    </div>
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

export default ModalUpdateFood;