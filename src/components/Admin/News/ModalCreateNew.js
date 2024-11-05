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
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [image, setImage] = useState('');
    const [view, setView] = useState('100');
    

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
        let data = await postCreateNew(title, image, contentMarkdown, contentHTML, view);
        if (data && data.code === 201) {
            toast.success(data.message);
            handleClose();
            await props.fetchListNew()
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

                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <textarea className="form-control" rows="3"
                                onChange={(event) => setTitle(event.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3 col-12">
                            <label className="form-label">Image title: </label>
                            <input className="form-control" type='file'
                                onChange={(event) => setImage(event.target.files[0])}
                            ></input>
                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">Time of writing: </label>
                            <DatePicker disabled showIcon icon={<IoIosCalendar />} selected={startDate} onChange={(date) => setStartDate(formatDate(date))} />
                        </div>
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