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
    const [members, setMembers] = useState(2);

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }

    const formatDate = (date) => {
        if (!date) return ""; // Kiểm tra nếu date là null
        return date.toISOString().split("T")[0]; // Chuyển đổi sang YYYY-MM-DD
    }; 

    const handleCreateFood = async () => {
        let data = await postCreateTour(title, contentHTML, +price, address, vehicle, members, startDateOpen, image);
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
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address:</label>
                            <textarea className="form-control" rows="1"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">Price:</label>
                            <input className="form-control" rows="1" type='number'
                                value={price}
                                onChange={(event) => setPrice(+event.target.value)}
                            ></input>
                        </div>
                        
                        <div className="mb-3 col-6">
                            <label className="form-label">Vehicle:</label>
                            <input className="form-control" rows="1"
                                value={vehicle}
                                onChange={(event) => setVehicle(event.target.value)}
                            ></input>
                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">Start time: </label>
                            <DatePicker showIcon icon={<IoIosCalendar />} minDate={new Date()} selected={startDateOpen} onChange={(date) => setStartDateOpen(formatDate(date))} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Title image: </label>
                            <input type='file'
                                onChange={(event) => setImage(event.target.files[0])}
                            />
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

export default ModalCreateTour;