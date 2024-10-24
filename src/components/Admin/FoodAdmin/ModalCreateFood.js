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

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }
    
    const handleCreateFood = async () => {
        let data = await postCreateFood(name, address, contentHTML, valueOpen, valueClose, image);
        if (data && data.code === 201) {
            toast.success(data.message);
            handleClose();
        }
        if (data && data.code !== 201) {
            toast.error(data.message)
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
                    <Button variant="primary" onClick={handleCreateFood}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCreateFood;