import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
// import { postCreateNewUser, putUpdateUser } from '../../../Service/apiService';
import _ from 'lodash';
import { putFood, putUsers } from '../../../Service/apiServices';
import DatePicker from "react-datepicker";
import { IoIosCalendar } from "react-icons/io";
import { Buffer } from 'buffer';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import TimePicker from 'react-time-picker';
import Lightbox from "react-awesome-lightbox";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalViewFood(props) {
    const { show, setShow } = props;
    const { dataView } = props;

    const handleClose = () => {
        setShow(false);
        props.resetUpdateData();
        setValidationErrors({});
    };

    const [valueOpen, setValueOpen] = useState('10:00');
    const [valueClose, setValueClose] = useState('10:00');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [image, setImage] = useState('');
    const [map, setMap] = useState('');


    const [imageP, setImageP] = useState('');
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({});

    const [validationErrors, setValidationErrors] = useState({});

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
            setName(dataView.title);
            setAddress(dataView.address);
            setValueOpen(dataView.opening_hours);
            setValueClose(dataView.closing_time);
            setImage(dataView.cuisines_image);
            setMap(dataView.map);
            setContentHTML(dataView.ContentHTML);
            setContentMarkdown(dataView.ContentMarkDown);
            setImage(base64ToFile(`data:image/jpeg;base64,${dataView.cuisines_image_base64}`));




            setImageP(`data:image/jpeg;base64,${dataView.cuisines_image_base64}`);
            setDataImagePreview({
                url: `data:image/jpeg;base64,${dataView.cuisines_image_base64}`,
            })
        }
    }, [dataView])

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
    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }

    const handleSubmitCreateUser = async () => {
        const validation = validate();

        if (validation === true) {
            let data = await putFood(dataView.cuisines_id, name, address, contentHTML, contentMarkdown, valueOpen, valueClose, image, map)
            if (data && data.code === 201) {
                toast.success(data.message);
                handleClose();
                if (!props.search) {
                    await props.fetchListFoodsWithPaginate(props.currentPage);
                }
                if (props.search) {
                    props.handleSearchFood(props.currentPage);
                }

                // await props.fetchListFoodsWithPaginate(props.currentPage);

                // props.setCurrentPage(1);
                // await props.fetchListUsersWithPaginate(props.currentPage);
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
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 row'>
                        <div className="mb-3">
                            <label className="form-label">Restaurant name:</label>
                            <textarea className="form-control" rows="1"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                disabled

                            ></textarea>
                            {validationErrors.name && <span className="text-danger">{validationErrors.name}</span>}

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address:</label>
                            <textarea className="form-control" rows="3"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                disabled

                            ></textarea>
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
                        <div className="mb-3">
                            <label className="form-label">Title image: </label>
                            <input type='file'
                                onChange={(event) => handleOnchangeFile(event)}
                                disabled

                            />
                            {validationErrors.image && <span className="text-danger">{validationErrors.image}</span>}

                        </div>
                        <div className='col-12' style={{ height: '250px', width: 'fit-content', border: '1px solid' }}>
                            <img src={imageP} style={{ maxHeight: '100%', maxWidth: '100%' }} alt="Uploaded"
                                onClick={() => handlePreviewImage()}
                            />
                        </div>
                        <div className='row mt-5'>
                            <div className="mb-3 col-5">
                                <label className="form-label">Open time: </label>
                                <TimePicker onChange={setValueOpen} value={valueOpen}
                                    disabled

                                />
                                {validationErrors.valueOpen && <span className="text-danger">{validationErrors.valueOpen}</span>}

                            </div>
                            <div className="mb-3 col-5">
                                <label className="form-label">Close time: </label>
                                <TimePicker onChange={setValueClose} value={valueClose}
                                    disabled

                                />
                                {validationErrors.valueClose && <span className="text-danger">{validationErrors.valueClose}</span>}

                            </div>
                        </div>

                        <div>
                            <MdEditor style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                value={contentMarkdown} onChange={handleEditorChange}
                                disabled
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
                    {/* <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewFood;