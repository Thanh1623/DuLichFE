

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import DatePicker from "react-datepicker";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { IoIosCalendar } from "react-icons/io";
import { postCreateEvent } from '../../../Service/apiServices';
import { toast } from 'react-toastify';
import TimePicker from 'react-time-picker';

const mdParser = new MarkdownIt(/* Markdown-it options */);


const ModalCreateEvent = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [startDateOpen, setStartDateOpen] = useState(new Date());
    // const [startDateClose, setStartDateClose] = useState(new Date());
    const [valueOpen, setValueOpen] = useState('10:00');
    const [valueClose, setValueClose] = useState('10:00');

    const [title, setTitle] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [view, setView] = useState('100');
    const [map, setMap] = useState('');
    const [address, setAddress] = useState('');

    const [validationErrors, setValidationErrors] = useState({});

    const validate = () => {
        const errors = {};

        if (!title) {
            errors.title = 'Title is required';
        }

        if (!valueOpen) {
            errors.valueOpen = 'Open time is required';
        }

        if (!valueClose) {
            errors.valueClose = 'Close time is required';
        }

        if (!imageTitle) {
            errors.imageTitle = 'Image title is required';
        }

        if (!address) {
            errors.address = 'Address is required';
        }

        if (!map) {
            errors.map = 'Location on map is required';
        }

        if (!contentHTML || !contentMarkdown) {
            errors.content = 'Content is required';
        }

        return Object.keys(errors).length === 0 ? true : errors;
    };

    const resetValues = () => {
        setValueOpen('10:00');
        setValueClose('10:00');
        setTitle('');
        setImageTitle('');
        setContentHTML('');
        setContentMarkdown('');
        setView('100');
        setMap('');
        setAddress('');
        setValidationErrors({});
    };


    const handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        setContentHTML(html);
        setContentMarkdown(text);
    }
    const formatDate = (date) => {
        if (!date) return ""; // Kiểm tra nếu date là null
        return date.toISOString().split("T")[0]; // Chuyển đổi sang YYYY-MM-DD
    };

    const handleCreateEvent = async () => {
        const validation = validate();

        if (validation === true) {
            let data = await postCreateEvent(title, valueOpen, valueClose, imageTitle, contentMarkdown, contentHTML,
                map, address, view
            );
            if (data && data.code === 201) {
                toast.success(data.message);
                handleClose();
                props.setCurrentPage(1);
                await props.fetchListEventsWithPaginate(1);
                resetValues()
            }
            if (data && data.code !== 201) {
                toast.error(data.message)
            }
        } else {
            setValidationErrors(validation);
        }

    }
    return (
        <>
            <Button variant="primary" onClick={handleShow} className='mt-3 mx-3'>
                <FcPlus />
                Add new event
            </Button>

            <Modal show={show} onHide={handleClose} size='xl' autoFocus='true' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Create new Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 row'>
                        <div className="mb-3">
                            <label className="form-label">Title: </label>
                            <textarea className="form-control" rows="1"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            ></textarea>
                            {validationErrors.title && <span className="text-danger">{validationErrors.title}</span>}
                        </div>
                        <div className="mb-3 col-5">
                            <label className="form-label">Open time: </label>
                            <TimePicker onChange={setValueOpen} value={valueOpen} />
                            {validationErrors.valueOpen && <span className="text-danger">{validationErrors.valueOpen}</span>}
                        </div>
                        <div className="mb-3 col-5">
                            <label className="form-label">Close time: </label>
                            <TimePicker onChange={setValueClose} value={valueClose} />
                            {validationErrors.valueClose && <span className="text-danger">{validationErrors.valueClose}</span>}
                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">Image title: </label>
                            <input className="form-control" type='file'
                                accept="image/*" // Chỉ chấp nhận file ảnh
                                onChange={(event) => setImageTitle(event.target.files[0])}
                            />
                            {validationErrors.imageTitle && <span className="text-danger">{validationErrors.imageTitle}</span>}
                        </div>
                        <div className='mb-3 col-12'>
                            <label className="form-label">Event venue:</label>
                            <input type='text' placeholder='VD: 136 Xuân Thủy, Cầu Giấy, Hà Nội' className="form-control"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                            {validationErrors.address && <span className="text-danger">{validationErrors.address}</span>}
                        </div>
                        <div className='mb-3 col-12'>
                            <label className="form-label">Location on map:</label>
                            <textarea className="form-control" rows="2"
                                value={map}
                                onChange={(event) => setMap(event.target.value)}
                            ></textarea>
                            {validationErrors.map && <span className="text-danger">{validationErrors.map}</span>}
                        </div>
                        <div>
                            <MdEditor style={{ height: '300px' }} renderHTML={(text) => mdParser.render(text)} onChange={handleEditorChange} />
                            {validationErrors.content && <span className="text-danger">{validationErrors.content}</span>}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleCreateEvent()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCreateEvent;