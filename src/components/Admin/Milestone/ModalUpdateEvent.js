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

function ModalUpdateEvent(props) {
    const { show, setShow } = props;
    const { dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
        props.resetUpdateData()
    };

    const [startDateOpen, setStartDateOpen] = useState(new Date());
    const [startDateClose, setStartDateClose] = useState(new Date());

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageTitle, setImageTitle] = useState([]);
    const [imageContent, setImageContent] = useState([]);
    const [imageP, setImageP] = useState('');
    const [content, setContent] = useState('');

    const arrayBuffer = new Uint8Array(dataUpdate.content_image).buffer;
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            console.log('dataUpdate: ', dataUpdate);

            setContent(dataUpdate.content);
            setDescription(dataUpdate.description);
            setTitle(dataUpdate.title);
            setImageTitle(dataUpdate.event_image);
            // const base64 = Buffer.from(dataUpdate.content_image,
            //     "binary").toString("base64");
            // if (dataUpdate.content_image && dataUpdate.content_image.data) {
            //     const base64 = Buffer.from(dataUpdate.content_image.data,
            //         "binary").toString("base64");

            //     setImageP(`data:image/jpeg;base64,${base64}`);
            // }

            setStartDateOpen(dataUpdate.opening_hours_event);
            setStartDateClose(dataUpdate.closing_time_event);
            // console.log('imgP', base64);

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
                            <label className="form-label">Title: </label>
                            <textarea className="form-control" rows="3"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description: </label>
                            <textarea className="form-control" rows="3"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">Start time: </label>
                            <DatePicker showIcon icon={<IoIosCalendar />} minDate={new Date()} selected={startDateOpen} onChange={(date) => setStartDateOpen(formatDate(date))} />
                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">End time: </label>
                            <DatePicker showIcon icon={<IoIosCalendar />} minDate={new Date()} selected={startDateClose} onChange={(date) => setStartDateClose(formatDate(date))} />
                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">Image title: </label>
                            <input className="form-control" type='file' multiple="multiple"
                                onChange={(event) => setImageTitle(Array.from(event.target.files))}
                            ></input>
                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">Image content: </label>
                            <input className="form-control" type='file' multiple="multiple"
                                onChange={(event) => setImageContent(Array.from(event.target.files))}
                            ></input>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Content article: </label>
                            <textarea className="form-control" rows="3"
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                            ></textarea>
                        </div>

                        <div className='col-12' style={{height: '150px', width: '150px', border: '1px solid'}}>
                            <img src={imageP} style={{ maxHeight: '100%', maxWidth: '100%' }} alt="Uploaded" />
                        </div>
                        {/* <div className='mb-3 col-12'>
                            <label className="form-label">Event venue:</label>
                            <input type='text' placeholder='VD: 136 Xuân Thủy, Cầu Giấy, Hà Nội' className="form-control" ></input>
                        </div>
                        <div className='mb-3 col-12'>
                            <label className="form-label">{`Location on map: `}<span style={{color: "red"}}>Note remove: </span><b>style="border:0;"</b></label>
                            <textarea className="form-control" rows="5" placeholder='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.880517355801!2d105.78079297503172!3d21.037466280614062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab355cc2239b%3A0x9ae247114fb38da3!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBTxrAgUGjhuqFtIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1728296212431!5m2!1svi!2s" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'></textarea>
                        </div> */}
                        {/* <div>
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                        </div> */}
                        <div>

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

export default ModalUpdateEvent;