import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
// import { postCreateNewUser, putUpdateUser } from '../../../Service/apiService';
import _, { update } from 'lodash';
import Lightbox from "react-awesome-lightbox";
import TimePicker from 'react-time-picker';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { putEvent } from '../../../Service/apiServices';
import DatePicker from "react-datepicker";
import { IoIosCalendar } from "react-icons/io";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalViewEvent(props) {
    const { show, setShow } = props;
    const { dataView } = props;

    const handleClose = () => {
        setShow(false);
        props.resetUpdateData()
    };

    const [startDateOpen, setStartDateOpen] = useState();
    const [startDateClose, setStartDateClose] = useState();
    // const [valueOpen, setValueOpen] = useState('');
    // const [valueClose, setValueClose] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [content, setContent] = useState('');
    const [map, setMap] = useState('');
    const [address, setAddress] = useState('');
    const [view, setView] = useState('100');

    const [imageP, setImageP] = useState('');
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({});

    const [validationErrors, setValidationErrors] = useState({});

    const validate = () => {
        const errors = {};

        if (!title) {
            errors.title = 'Title is required';
        }

        if (!startDateOpen) {
            errors.startDateOpen = 'Open time is required';
        }

        if (!startDateClose) {
            errors.startDateClose = 'Close time is required';
        }

        if (!imageTitle) {
            errors.imageTitle = 'Image title is required';
        }

        if (!address) {
            errors.address = 'Address is required';
        }

        if (!map) {
            errors.map = 'Location on map is required';
        }

        if (!contentHTML || !contentMarkdown) {
            errors.content = 'Content is required';
        }

        return Object.keys(errors).length === 0 ? true : errors;
    };

    function base64ToFile(base64String, fileName) {
        if (!base64String) {
            console.error("Chuỗi Base64 không hợp lệ hoặc không có giá trị.");
            return null;
        }

        const arr = base64String.split(',');
        if (arr.length < 2) {
            console.error("Chuỗi Base64 không đúng định dạng.");
            return null;
        }

        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) {
            console.error("Không tìm thấy loại MIME trong chuỗi Base64.");
            return null;
        }

        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], fileName, { type: mime });
    }

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            console.log('dataView: ', dataView);

            setContentMarkdown(dataView.ContentMarkDown);
            setContentHTML(dataView.ContentHTML);
            setTitle(dataView.title);
            setAddress(dataView.description);
            setMap(dataView.content);
            setStartDateOpen(dataView.opening_hours_event);
            setStartDateClose(dataView.closing_time_event);

            setImageTitle(base64ToFile(`data:image/jpeg;base64,${dataView.eventimg_url}`));


            setImageP(`data:image/jpeg;base64,${dataView.eventimg_url}`);
            setDataImagePreview({
                url: `data:image/jpeg;base64,${dataView.eventimg_url}`,
            })
        }
    }, [dataView])
    const handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        setContentHTML(html);
        setContentMarkdown(text);
    }

    // const handleUpLoadImage = (event) => {
    //     if (event.target && event.target.files && event.target.files[0]) {
    //         setPreviewImage(URL.createObjectURL(event.target.files[0]));
    //         setImage(event.target.files[0]);
    //     }
    //     else {
    //         // setPreviewImage('');
    //     }
    // }

    const formatDate = (date) => {
        if (!date) return ""; // Kiểm tra nếu date là null
        return date.toISOString().split("T")[0]; // Chuyển đổi sang YYYY-MM-DD
    };

    const handlePreviewImage = () => {
        setIsPreviewImage(true);
    }

    const handleOnchangeFile = async (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            // Tạo object URL và cập nhật trực tiếp
            const objectURL = URL.createObjectURL(file);
            setImageP(objectURL);
            setImageTitle(file);

            // Cập nhật preview ngay lập tức
            setDataImagePreview({
                url: objectURL,
            });
        }
    }


    const handleSubmitUpdateEvent = async () => {
        const validation = validate();

        if (validation === true) {
            let data = await putEvent(dataView.event_id, title, startDateOpen, startDateClose, imageTitle, contentMarkdown, contentHTML,
                map, address, view
            )
            if (data && data.code === 201) {
                toast.success(data.EM);
                handleClose();

                if (!props.search) {
                    await props.fetchListEventsWithPaginate(props.currentPage);
                }
                if (props.search) {
                    props.handleSearchEvent(props.currentPage);
                }
                // await props.fetchListEventsWithPaginate(props.currentPage);
            }
            if (data && data.code !== 201) {
                toast.error(data.EM)
            }
        } else {
            setValidationErrors(validation);
        }

    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 row'>
                        <div className="mb-3">
                            <label className="form-label">Title: </label>
                            <textarea className="form-control" rows="3"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                disabled
                            ></textarea>
                            {validationErrors.title && <span className="text-danger">{validationErrors.title}</span>}

                        </div>
                        <div className="mb-3 col-5">
                            <label className="form-label">Open time: </label>
                            <DatePicker
                                disabled
                                showIcon
                                icon={<IoIosCalendar />}
                                selected={startDateOpen} onChange={(date) => setStartDateOpen(date)} minDate={new Date()} />
                            {validationErrors.startDateOpen && <span className="text-danger">{validationErrors.startDateOpen}</span>}
                        </div>
                        <div className="mb-3 col-5">
                            <label className="form-label">Close time: </label>
                            <DatePicker
                                disabled
                                showIcon
                                icon={<IoIosCalendar />}
                                selected={startDateClose} onChange={(date) => setStartDateClose(date)} minDate={new Date()} />
                            {validationErrors.startDateClose && <span className="text-danger">{validationErrors.startDateClose}</span>}
                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">Image title: </label>
                            <input className="form-control" type='file'
                                onChange={(event) => handleOnchangeFile(event)}
                                disabled
                            ></input>
                            {validationErrors.imageTitle && <span className="text-danger">{validationErrors.imageTitle}</span>}

                        </div>
                        <div className='col-12' style={{ height: '250px', width: 'fit-content', border: '1px solid' }}>
                            <img src={imageP} style={{ maxHeight: '100%', maxWidth: '100%' }} alt="Uploaded"
                                onClick={() => handlePreviewImage()}
                            />
                        </div>
                        <div className='mb-3 col-12'>
                            <label className="form-label">Event venue:</label>
                            <input type='text' placeholder='VD: 136 Xuân Thủy, Cầu Giấy, Hà Nội' className="form-control"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                disabled
                            ></input>
                            {validationErrors.address && <span className="text-danger">{validationErrors.address}</span>}

                        </div>
                        <div className='mb-3 col-12'>
                            <label className="form-label">Location on map:</label>
                            <textarea className="form-control" rows="2"
                                value={map}
                                onChange={(event) => setMap(event.target.value)}
                                disabled
                            ></textarea>
                            {validationErrors.map && <span className="text-danger">{validationErrors.map}</span>}

                        </div>
                        <div>
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} value={contentMarkdown}
                                readOnly
                            />
                            {validationErrors.content && <span className="text-danger">{validationErrors.content}</span>}

                        </div>
                        <div>
                            {
                                isPreviewImage === true &&
                                <Lightbox
                                    image={dataImagePreview.url}
                                    onClose={() => setIsPreviewImage(false)}
                                ></Lightbox>
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleSubmitUpdateEvent()}>
                        Save
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewEvent;