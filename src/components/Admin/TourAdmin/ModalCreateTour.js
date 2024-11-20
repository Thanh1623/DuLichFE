import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import DatePicker from "react-datepicker";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { IoIosCalendar } from "react-icons/io";
import TimePicker from 'react-time-picker';
import { toast } from 'react-toastify';
import { postCreateFood, postCreateTour } from '../../../Service/apiServices';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalCreateTour = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [previewImage, setPreviewImage] = useState('');
    const [startDateOpen, setStartDateOpen] = useState(new Date());
    const [price, setPrice] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [image, setImage] = useState('');
    const [members, setMembers] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    // Validate function
    const validate = () => {
        const errors = {};

        // Validate Title
        if (!title) {
            errors.title = 'Title is required';
        }

        // Validate Address
        if (!address) {
            errors.address = 'Address is required';
        }

        // Validate Price
        if (!price) {
            errors.price = 'Price is required';
        }

        // Validate Members
        if (!members) {
            errors.members = 'Members count is required';
        }

        // Validate Vehicle
        if (!vehicle) {
            errors.vehicle = 'Vehicle is required';
        }

        // Validate Image
        if (!image) {
            errors.image = 'Image title is required';
        }

        // Validate Content (Markdown or HTML)
        if (!contentHTML || !contentMarkdown) {
            errors.content = 'Content is required';
        }

        return Object.keys(errors).length === 0 ? true : errors;
    };

    const resetValues = () => {
        setStartDateOpen(new Date());
        setPrice('');
        setVehicle('');
        setTitle('');
        setAddress('');
        setContentHTML('');
        setContentMarkdown('');
        setImage('');
        setMembers('');
        setValidationErrors({});
    };

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }

    const formatDate = (date) => {
        if (!date) return ""; // Kiểm tra nếu date là null
        return date.toISOString().split("T")[0]; // Chuyển đổi sang YYYY-MM-DD
    };

    const handleCreateFood = async () => {
        const validation = validate();

        if (validation === true) {
            let data = await postCreateTour(title, contentHTML, contentMarkdown, +price,
                address, vehicle, members, formatDate(startDateOpen), image);
            if (data && data.code === 201) {
                toast.success(data.message);
                handleClose();
                props.setCurrentPage(1);
                await props.fetchListToursWithPaginate(1);
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
                Add new Tours
            </Button>

            <Modal show={show} onHide={handleClose} size='xl' autoFocus='true' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Create new Tour</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 row'>
                        <div className="mb-3">
                            <label className="form-label">Title:</label>
                            <textarea className="form-control" rows="1"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            ></textarea>
                            {validationErrors.title && <span className="text-danger">{validationErrors.title}</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address:</label>
                            <textarea className="form-control" rows="1"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            ></textarea>
                            {validationErrors.address && <span className="text-danger">{validationErrors.address}</span>}
                        </div>
                        <div className="mb-3 col-5">
                            <label className="form-label">Price:</label>
                            <input className="form-control" type='number'
                                min="0"
                                value={price}
                                onChange={(event) => setPrice(+event.target.value)}
                            ></input>
                            {validationErrors.price && <span className="text-danger">{validationErrors.price}</span>}
                        </div>
                        <div className="mb-3 col-2">
                            <label className="form-label">Members:</label>
                            <input className="form-control" type='number'
                                step="1"
                                value={members}
                                onChange={(event) => setMembers(+event.target.value)}
                            ></input>
                            {validationErrors.members && <span className="text-danger">{validationErrors.members}</span>}
                        </div>
                        <div className="mb-3 col-5">
                            <label className="form-label">Vehicle:</label>
                            <input className="form-control" rows="1"
                                value={vehicle}
                                onChange={(event) => setVehicle(event.target.value)}
                            ></input>
                            {validationErrors.vehicle && <span className="text-danger">{validationErrors.vehicle}</span>}
                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">Start time: </label>
                            <DatePicker
                                showIcon
                                icon={<IoIosCalendar />}
                                minDate={new Date()}
                                selected={startDateOpen}
                                onChange={(date) => setStartDateOpen(date)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Title image: </label>
                            <input type='file'
                                accept="image/*" // Chỉ chấp nhận file ảnh
                                onChange={(event) => setImage(event.target.files[0])}
                            />
                            {validationErrors.image && <span className="text-danger">{validationErrors.image}</span>}
                        </div>
                        <div>
                            <MdEditor style={{ height: '500px' }} value={contentMarkdown} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                            {validationErrors.content && <span className="text-danger">{validationErrors.content}</span>}
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateFood}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCreateTour;