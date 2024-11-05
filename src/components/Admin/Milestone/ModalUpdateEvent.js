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

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalUpdateEvent(props) {
    const { show, setShow } = props;
    const { dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
        props.resetUpdateData()
    };

    // const [startDateOpen, setStartDateOpen] = useState(new Date());
    // const [startDateClose, setStartDateClose] = useState(new Date());
    const [valueOpen, setValueOpen] = useState('');
    const [valueClose, setValueClose] = useState('');
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
        if (!_.isEmpty(dataUpdate)) {
            console.log('dataUpdate: ', dataUpdate);

            setContentMarkdown(dataUpdate.ContentMarkDown);
            setContentHTML(dataUpdate.ContentHTML);
            setTitle(dataUpdate.title);
            setAddress(dataUpdate.description);
            setMap(dataUpdate.content);
            setValueOpen(dataUpdate.opening_hours_event);
            setValueClose(dataUpdate.closing_time_event);

            setImageTitle(base64ToFile(`data:image/jpeg;base64,${dataUpdate.eventimg_url}`));


            setImageP(`data:image/jpeg;base64,${dataUpdate.eventimg_url}`);
            setDataImagePreview({
                url: `data:image/jpeg;base64,${dataUpdate.eventimg_url}`,
            })
        }
    }, [dataUpdate])
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

        let data = await putEvent(dataUpdate.event_id, title, valueOpen, valueClose, imageTitle, contentMarkdown, contentHTML,
            map, address, view
        )
        if (data && data.code === 201) {
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUsers()
            // props.setCurrentPage(1);
            // await props.fetchListUsersWithPaginate(props.currentPage);
            await props.fetchListEvent()
        }
        if (data && data.code !== 201) {
            toast.error(data.EM)
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
                            ></textarea>
                        </div>

                        {/* <div className="mb-3 col-6">
                            <label className="form-label">Start time: </label>
                            <DatePicker showIcon icon={<IoIosCalendar />} minDate={new Date()} selected={startDateOpen} onChange={(date) => setStartDateOpen(formatDate(date))} />
                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">End time: </label>
                            <DatePicker showIcon icon={<IoIosCalendar />} minDate={new Date()} selected={startDateClose} onChange={(date) => setStartDateClose(formatDate(date))} />
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
                                onChange={(event) => handleOnchangeFile(event)}
                            ></input>
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
                            ></input>
                        </div>
                        <div className='mb-3 col-12'>
                            <label className="form-label">{`Location on map: `}<span style={{ color: "red" }}>Note remove: </span><b>style="border:0;"</b></label>
                            <textarea className="form-control" rows="5"
                                placeholder='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.880517355801!2d105.78079297503172!3d21.037466280614062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab355cc2239b%3A0x9ae247114fb38da3!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBTxrAgUGjhuqFtIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1728296212431!5m2!1svi!2s" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                                value={map}
                                onChange={(event) => setMap(event.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} value={contentMarkdown} />
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
                    <Button variant="primary" onClick={() => handleSubmitUpdateEvent()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateEvent;