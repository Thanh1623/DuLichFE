import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
// import { postCreateNewUser, putUpdateUser } from '../../../Service/apiService';
import _ from 'lodash';
import { putShopping, putUsers } from '../../../Service/apiServices';
import DatePicker from "react-datepicker";
import { IoIosCalendar } from "react-icons/io";
import { Buffer } from 'buffer';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import TimePicker from 'react-time-picker';
import Lightbox from "react-awesome-lightbox";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalUpdateShopping(props) {
    const { show, setShow } = props;
    const { dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
        props.resetUpdateData()
    };

    const [valueOpen, setValueOpen] = useState('');
    const [valueClose, setValueClose] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');
    const [map, setMap] = useState('');

    const [imageP, setImageP] = useState('');
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({});
    const [validationErrors, setValidationErrors] = useState({});

    // Validate function
    const validate = () => {
        const errors = {};

        // Validate Title
        if (!title) {
            errors.title = 'Title is required';
        }

        // Validate Address
        if (!address) {
            errors.address = 'Address is required';
        }

        // Validate Image
        if (!image) {
            errors.image = 'Image title is required';
        }

        // Validate Location on map
        if (!map) {
            errors.map = 'Location on map is required';
        }

        // Validate Content (Markdown or HTML)
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
        if (!_.isEmpty(dataUpdate)) {
            console.log('dataUpdate: ', dataUpdate);
            setTitle(dataUpdate.title);
            setValueOpen(dataUpdate.opening_hours);
            setValueClose(dataUpdate.closing_time);
            setAddress(dataUpdate.address);
            setContentHTML(dataUpdate.ContentHTML);
            setContentMarkdown(dataUpdate.ContentMarkDown);
            setType(dataUpdate.type);
            setMap(dataUpdate.map);

            setImage(base64ToFile(`data:image/jpeg;base64,${dataUpdate.shopping_center_image_base64}`));


            setImageP(`data:image/jpeg;base64,${dataUpdate.shopping_center_image_base64}`);
            setDataImagePreview({
                url: `data:image/jpeg;base64,${dataUpdate.shopping_center_image_base64}`,
            })

        }
    }, [dataUpdate])

    console.log(valueClose, valueOpen)

    // const handleUpLoadImage = (event) => {
    //     if (event.target && event.target.files && event.target.files[0]) {
    //         setPreviewImage(URL.createObjectURL(event.target.files[0]));
    //         setImage(event.target.files[0]);
    //     }
    //     else {
    //         // setPreviewImage('');
    //     }
    // }

    const handlePreviewImage = () => {
        setIsPreviewImage(true);
    }

    const handleOnchangeFile = async (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            // Tạo object URL và cập nhật trực tiếp
            const objectURL = URL.createObjectURL(file);
            setImageP(objectURL);
            setImage(file);

            // Cập nhật preview ngay lập tức
            setDataImagePreview({
                url: objectURL,
            });
        }
    }
    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }

    const handleSubmitCreateUser = async () => {
        const validation = validate();

        if (validation === true) {
            // call api
            let data = await putShopping(dataUpdate.shopping_center_id, title, address, contentHTML, contentMarkdown,
                valueClose, valueOpen, type, image, map)
            if (data && data.code === 201) {
                toast.success(data.message);
                handleClose();
                await props.fetchListShoppingWithPaginate(props.currentPage);
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
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a Shopping</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 row'>
                        <div className="mb-3">
                            <label className="form-label">Title:</label>
                            <textarea className="form-control" rows="1"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            ></textarea>
                            {validationErrors.title && <span className="text-danger">{validationErrors.title}</span>}

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address:</label>
                            <textarea className="form-control" rows="3"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            ></textarea>
                            {validationErrors.address && <span className="text-danger">{validationErrors.address}</span>}

                        </div>
                        <div className='mb-3 col-12'>
                            <label className="form-label">Location on map: </label>
                            <textarea className="form-control" rows="2"
                                value={map}
                                onChange={(event) => setMap(event.target.value)}
                            ></textarea>
                            {validationErrors.map && <span className="text-danger">{validationErrors.map}</span>}

                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">Image title: </label>
                            <input className="form-control" type='file'
                                onChange={(event) => handleOnchangeFile(event)}
                            ></input>
                            {validationErrors.image && <span className="text-danger">{validationErrors.image}</span>}

                        </div>
                        <div className='col-12' style={{ height: '250px', width: 'fit-content', border: '1px solid' }}>
                            <img src={imageP} style={{ maxHeight: '100%', maxWidth: '100%' }} alt="Uploaded"
                                onClick={() => handlePreviewImage()}
                            />
                        </div>
                        <div className='row mt-3'>
                            <div className="mb-3 col-5">
                                <label className="form-label">Open time: </label>
                                <TimePicker onChange={setValueOpen} value={valueOpen} />
                            </div>
                            <div className="mb-3 col-5">
                                <label className="form-label">Close time: </label>
                                <TimePicker onChange={setValueClose} value={valueClose} />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Type</label>
                            <select className="form-select"
                                value={type}
                                onChange={(event) => setType(event.target.value)}
                            >
                                <option value='Trung tâm thương mại'>Trung tâm thương mại</option>
                                <option value='Trung tâm giải trí'>Trung tâm giải trí</option>
                                <option value='Trung tâm mua sắm'>Trung tâm mua sắm</option>
                            </select>
                        </div>
                        <div>
                            <MdEditor style={{ height: '500px' }} 
                            value={contentMarkdown} 
                            renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
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
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateShopping;