import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import DatePicker from "react-datepicker";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { IoIosCalendar } from "react-icons/io";
import { postCreateNew } from '../../../Service/apiServices';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalCreateNew = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [startDate, setStartDate] = useState(new Date());

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [image, setImage] = useState('');

    const handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        setContentHTML(html);
        setContent(text);
    }
    const formatDate = (date) => {
        if (!date) return ""; // Kiểm tra nếu date là null
        return date.toISOString().split("T")[0]; // Chuyển đổi sang YYYY-MM-DD
    };
    const handleCreateEvent = async () => {
        let data = await postCreateNew(title, image, content, contentHTML);
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
                Add new news
            </Button>

            <Modal show={show} onHide={handleClose} size='xl' autoFocus='true' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Create new News</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 row'>
                        
                        <div class="mb-3">
                            <label class="form-label">Title</label>
                            <textarea class="form-control" rows="3"
                                onChange={(event)=> setTitle(event.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3 col-12">
                            <label className="form-label">Image title: </label>
                            <input className="form-control" type='file'
                                onChange={(event) => setImage(event.target.files[0])}
                            ></input>
                        </div>
                        {/* <div class="mb-3 col-6">
                            <label class="form-label">Time of writing: </label>
                            <DatePicker disabled showIcon icon={<IoIosCalendar />} selected={startDate} onChange={(date) => setStartDate(formatDate(date))} />
                        </div> */}
                        <div>
                            <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateEvent}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCreateNew;