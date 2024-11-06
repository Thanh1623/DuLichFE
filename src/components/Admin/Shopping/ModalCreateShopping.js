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
import { postCreateFood, postCreateShopping } from '../../../Service/apiServices';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalCreateShopping = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [previewImage, setPreviewImage] = useState('');
    const [valueOpen, setValueOpen] = useState('10:00');
    const [valueClose, setValueClose] = useState('10:00');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [type, setType] = useState('Trung tâm thương mại');
    const [image, setImage] = useState('');
    const [map, setMap] = useState('');

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

        // Validate Image
        if (!image) {
            errors.image = 'Image title is required';
        }

        // Validate Location on map
        if (!map) {
            errors.map = 'Location on map is required';
        }

        // Validate Content (Markdown or HTML)
        if (!contentHTML || !contentMarkdown) {
            errors.content = 'Content is required';
        }

        return Object.keys(errors).length === 0 ? true : errors;
    };

    const resetValues = () => {
        setValueOpen('10:00');
        setValueClose('10:00');
        setTitle('');
        setAddress('');
        setContentHTML('');
        setContentMarkdown('');
        setType('Trung tâm thương mại');
        setImage('');
        setMap('');
        setValidationErrors({});
    };

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }

    const handleCreateFood = async () => {
        const validation = validate();

        if (validation === true) {
            let data = await postCreateShopping(title, address, contentHTML, contentMarkdown, valueClose, valueOpen, type, image, map);
            if (data && data.code === 201) {
                toast.success(data.message);
                handleClose();
                props.setCurrentPage(1);
                await props.fetchListShoppingWithPaginate(1);
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
                Add new Shopping
            </Button>

            <Modal show={show} onHide={handleClose} size='xl' autoFocus='true' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Create new Shopping</Modal.Title>
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
                            <textarea className="form-control" rows="3"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            ></textarea>
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
                        <div className="mb-3">
                            <label className="form-label">Title image: </label>
                            <input type='file'
                                onChange={(event) => setImage(event.target.files[0])}
                            />
                            {validationErrors.image && <span className="text-danger">{validationErrors.image}</span>}
                        </div>
                        <div className="mb-3 col-5">
                            <label className="form-label">Open time: </label>
                            <TimePicker onChange={setValueOpen} value={valueOpen} />
                        </div>
                        <div className="mb-3 col-5">
                            <label className="form-label">Close time: </label>
                            <TimePicker onChange={setValueClose} value={valueClose} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Type</label>
                            <select className="form-select"
                                value={type}
                                onChange={(event) => setType(event.target.value)}
                            >
                                <option value='Trung tâm thương mại'>Trung tâm thương mại</option>
                                <option value='Trung tâm giải trí'>Trung tâm giải trí</option>
                                <option value='Trung tâm mua sắm'>Trung tâm mua sắm</option>
                            </select>
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

export default ModalCreateShopping;