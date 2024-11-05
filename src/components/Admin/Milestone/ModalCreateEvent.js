

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
        let data = await postCreateEvent(title, valueOpen, valueClose, imageTitle, contentMarkdown, contentHTML,
            map, address,view
        );
        if (data && data.code === 201) {
            toast.success(data.message);
            handleClose();
            await props.fetchListEvent();
        }
        if (data && data.code !== 201) {
            toast.error(data.message)
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
                            <textarea className="form-control" rows="3"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            ></textarea>
                        </div>
                        {/* <div className="mb-3">
                            <label className="form-label">Description: </label>
                            <textarea className="form-control" rows="3"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            ></textarea>
                        </div> */}
                        <div className="mb-3 col-5">
                            <label className="form-label">Open time: </label>
                            <TimePicker onChange={setValueOpen} value={valueOpen} />
                        </div>
                        <div className="mb-3 col-5">
                            <label className="form-label">Close time: </label>
                            <TimePicker onChange={setValueClose} value={valueClose} />
                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">Image title: </label>
                            <input className="form-control" type='file'
                                onChange={(event) => setImageTitle(event.target.files[0])}
                            ></input>
                        </div>
                        {/* <div className="mb-3 col-6">
                            <label className="form-label">Image title: </label>
                            <input className="form-control" type='file' multiple="multiple"
                                onChange={(event) => setImageTitle(Array.from(event.target.files))}
                            ></input>
                        </div> */}
                        {/* <div className="mb-3 col-6">
                            <label className="form-label">Image content: </label>
                            <input className="form-control" type='file' multiple="multiple"
                                onChange={(event) => setImageContent(Array.from(event.target.files))}
                            ></input>
                        </div> */}
                        {/* <div className="mb-3">
                            <label className="form-label">Content article: </label>
                            <textarea className="form-control" rows="3"
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                            ></textarea>
                        </div> */}
                        <div className='mb-3 col-12'>
                            <label className="form-label">Event venue:</label>
                            <input type='text' placeholder='VD: 136 Xuân Thủy, Cầu Giấy, Hà Nội' className="form-control"
                            value={address}
                            onChange={(event)=> setAddress(event.target.value)}
                            ></input>
                        </div>
                        <div className='mb-3 col-12'>
                            <label className="form-label">{`Location on map: `}<span style={{color: "red"}}>Note remove: </span><b>style="border:0;"</b></label>
                            <textarea className="form-control" rows="5" 
                            placeholder='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.880517355801!2d105.78079297503172!3d21.037466280614062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab355cc2239b%3A0x9ae247114fb38da3!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBTxrAgUGjhuqFtIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1728296212431!5m2!1svi!2s" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                                value={map}
                                onChange={(event) => setMap(event.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                        </div>
                        <div>

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