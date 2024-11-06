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
import { postCreateFood } from '../../../Service/apiServices';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalCreateFood = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [previewImage, setPreviewImage] = useState('');
    const [valueOpen, setValueOpen] = useState('10:00');
    const [valueClose, setValueClose] = useState('10:00');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [image, setImage] = useState('');
    const [map, setMap] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const resetValues = () => {
        setValueOpen('10:00');
        setValueClose('10:00');
        setName('');
        setAddress('');
        setContentHTML('');
        setContentMarkdown('');
        setImage('');
        setMap('');
        setValidationErrors({});
    };
    
    const validate = () => {
        const errors = {};

        if (!name) {
            errors.name = 'Restaurant name is required';
        }

        if (!address) {
            errors.address = 'Address is required';
        }

        if (!map) {
            errors.map = 'Location on map is required';
        }

        if (!image) {
            errors.image = 'Image is required';
        }

        if (!valueOpen) {
            errors.valueOpen = 'Open time is required';
        }

        if (!valueClose) {
            errors.valueClose = 'Close time is required';
        } 
        // else if (valueClose <= valueOpen) {
        //     errors.valueClose = 'Close time must be later than open time';
        // }

        if (!contentHTML || !contentMarkdown) {
            errors.content = 'Content is required';
        }

        return Object.keys(errors).length === 0 ? true : errors;
    };

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }

    const handleCreateFood = async () => {

        const validation = validate();

        if (validation === true) {
            let data = await postCreateFood(name, address, contentHTML, contentMarkdown, valueOpen, valueClose, image, map);
            if (data && data.code === 201) {
                toast.success(data.message);
                handleClose();
                props.setCurrentPage(1);
                await props.fetchListFoodsWithPaginate(1);
                resetValues();
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
                Add new Foods
            </Button>

            <Modal show={show} onHide={handleClose} size='xl' autoFocus='true' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Create new Food</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 row'>
                        <div className="mb-3">
                            <label className="form-label">Restaurant name:</label>
                            <textarea className="form-control" rows="1"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            ></textarea>
                            {validationErrors.name && <span className="text-danger">{validationErrors.name}</span>}
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
                            <label className="form-label">Title image: </label>
                            <input type='file'
                                onChange={(event) => setImage(event.target.files[0])}
                            />
                            {validationErrors.image && <span className="text-danger">{validationErrors.image}</span>}
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

export default ModalCreateFood;