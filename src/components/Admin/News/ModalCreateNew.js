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

    const [validationErrors, setValidationErrors] = useState({});

    const validate = () => {
        const errors = {};

        // Validate Title
        if (!title) {
            errors.title = 'Title is required';
        }

        // Validate Image
        if (!image) {
            errors.image = 'Image title is required';
        }

        // Validate Start Date
        if (!startDate) {
            errors.startDate = 'Time of writing is required';
        }

        // Validate Content
        if (!contentHTML || !contentMarkdown) {
            errors.content = 'Content is required';
        }

        return Object.keys(errors).length === 0 ? true : errors;
    };

    const resetValues = () => {
        setStartDate(new Date());
        setTitle('');
        setContentMarkdown('');
        setContentHTML('');
        setImage('');
        setView('100');
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
            let data = await postCreateNew(title, image, contentMarkdown, contentHTML, view);
            if (data && data.code === 201) {
                toast.success(data.message);
                handleClose();
                props.setCurrentPage(1);
                await props.fetchListNewsWithPaginate(1);
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
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            ></textarea>
                            {validationErrors.title && <span className="text-danger">{validationErrors.title}</span>}
                        </div>
                        <div className="mb-3 col-12">
                            <label className="form-label">Image title: </label>
                            <input className="form-control" type='file'
                                accept="image/*" // Chỉ chấp nhận file ảnh
                                onChange={(event) => setImage(event.target.files[0])}
                            />
                            {validationErrors.image && <span className="text-danger">{validationErrors.image}</span>}
                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">Time of writing: </label>
                            <DatePicker
                                disabled
                                showIcon
                                icon={<IoIosCalendar />}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                            {validationErrors.startDate && <span className="text-danger">{validationErrors.startDate}</span>}
                        </div>
                        <div>
                            <MdEditor
                                style={{ height: '300px' }}
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
                    <Button variant="primary" onClick={handleCreateEvent}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCreateNew;