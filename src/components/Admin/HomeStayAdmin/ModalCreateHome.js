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
import { postCreateFood, postCreateHome } from '../../../Service/apiServices';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalCreateHomeStay = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [previewImage, setPreviewImage] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('1');
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [image, setImage] = useState('');
    const [map, setMap] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const validate = () => {
        const errors = {};

        if (!title) {
            errors.title = 'Name is required';
        }

        if (!address) {
            errors.address = 'Address is required';
        }

        if (!map) {
            errors.map = 'Location on map is required';
        }

        if (!price) {
            errors.price = 'Price is required';
        } else if (isNaN(price) || price <= 0) {
            errors.price = 'Price must be a positive number';
        }

        if (!type) {
            errors.type = 'Type is required';
        }

        if (!image) {
            errors.image = 'Image is required';
        }

        if (!contentHTML || !contentMarkdown) {
            errors.content = 'Content is required';
        }

        return Object.keys(errors).length === 0 ? true : errors;
    };

    const resetValues = () => {
        setTitle('');
        setAddress('');
        setPrice('');
        setType('1');
        setContentHTML('');
        setContentMarkdown('');
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
            let data = await postCreateHome(title, address, price, type, contentHTML, contentMarkdown, image, map);
            if (data && data.code === 201) {
                toast.success(data.message);
                handleClose();
                props.setCurrentPage(1);
                await props.fetchListHomesWithPaginate(1);
                setValidationErrors({});
                resetValues();
            }
            if (data && data.code !== 201) {
                toast.error(data.message)
            }
        }

    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='mt-3 mx-3'>
                <FcPlus />
                Add new HomeStay
            </Button>

            <Modal show={show} onHide={handleClose} size='xl' autoFocus='true' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Create new HomeStay</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 row'>
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
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
                        <div className='mb-3 col-12'>
                            <label className="form-label">Location on map:</label>
                            <textarea className="form-control" rows="2"
                                value={map}
                                onChange={(event) => setMap(event.target.value)}
                            ></textarea>
                            {validationErrors.map && <span className="text-danger">{validationErrors.map}</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price:</label>
                            <input className="form-control" type='number'
                                min="0"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                            />
                            {validationErrors.price && <span className="text-danger">{validationErrors.price}</span>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Type</label>
                            <select className="form-select"
                                value={type}
                                onChange={(event) => setType(event.target.value)}
                            >
                                <option value='1'>Còn phòng</option>
                                <option value='0'>Hết phòng</option>
                            </select>
                            {validationErrors.type && <span className="text-danger">{validationErrors.type}</span>}
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
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={handleEditorChange}
                            />
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

export default ModalCreateHomeStay;