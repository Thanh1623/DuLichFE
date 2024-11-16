import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
// import { postCreateNewUser, putUpdateUser } from '../../../Service/apiService';
import _ from 'lodash';
import { putTour, putUsers } from '../../../Service/apiServices';
import DatePicker from "react-datepicker";
import { IoIosCalendar } from "react-icons/io";
import { Buffer } from 'buffer';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import TimePicker from 'react-time-picker';
import Lightbox from "react-awesome-lightbox";


const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalViewTour(props) {
    const { show, setShow } = props;
    const { dataView } = props;

    const handleClose = () => {
        setShow(false);
        props.resetUpdateData()
    };

    const [startDateOpen, setStartDateOpen] = useState();
    const [price, setPrice] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [image, setImage] = useState('');
    const [members, setMembers] = useState('');

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

        // Validate Price
        if (!price) {
            errors.price = 'Price is required';
        }

        // Validate Members
        if (!members) {
            errors.members = 'Members count is required';
        }

        // Validate Vehicle
        if (!vehicle) {
            errors.vehicle = 'Vehicle is required';
        }

        // Validate Image
        if (!image) {
            errors.image = 'Image title is required';
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
        if (!_.isEmpty(dataView)) {
            console.log('dataView: ', dataView);
            setTitle(dataView.title);
            setAddress(dataView.address);
            setVehicle(dataView.vehicle);
            setPrice(+dataView.price);
            setMembers(+dataView.members);
            setContentHTML(dataView.ContentHTML);
            setContentMarkdown(dataView.ContentMarkDown);
            setStartDateOpen(dataView.tour_date);
            setImage(base64ToFile(`data:image/jpeg;base64,${dataView.tour_image_base64}`));




            setImageP(`data:image/jpeg;base64,${dataView.tour_image_base64}`);
            setDataImagePreview({
                url: `data:image/jpeg;base64,${dataView.tour_image_base64}`,
            })
            console.log(new Date())

        }
    }, [dataView])


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

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
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
            let data = await putTour(dataView.tour_id, title, contentHTML, contentMarkdown, price,
                address, vehicle, members, startDateOpen, image)
            if (data && data.code === 201) {
                toast.success(data.message);
                handleClose();

                if (!props.search) {
                    await props.fetchListToursWithPaginate(props.currentPage);
                }
                if (props.search) {
                    props.handleSearchTour(props.currentPage);
                }

                // await props.fetchListToursWithPaginate(props.currentPage);

                // props.setCurrentPage(1);
                // await props.fetchListUsersWithPaginate(props.currentPage)
            }
            if (data && data.code !== 201) {
                toast.error(data.message)
            }
        } else {
            setValidationErrors(validation);
        }
        // call api

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
                    <Modal.Title>View a Tour</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 row'>
                        <div className="mb-3">
                            <label className="form-label">Title:</label>
                            <textarea className="form-control" rows="1"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                disabled
                            ></textarea>
                            {validationErrors.title && <span className="text-danger">{validationErrors.title}</span>}

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address:</label>
                            <textarea className="form-control" rows="1"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                disabled
                            ></textarea>
                            {validationErrors.address && <span className="text-danger">{validationErrors.address}</span>}

                        </div>
                        <div className="mb-3 col-5">
                            <label className="form-label">Price:</label>
                            <input className="form-control" type='number'
                                value={price}
                                onChange={(event) => setPrice(+event.target.value)}
                                disabled
                            ></input>
                            {validationErrors.price && <span className="text-danger">{validationErrors.price}</span>}

                        </div>
                        <div className="mb-3 col-2">
                            <label className="form-label">Members:</label>
                            <input className="form-control" type='number'
                                value={members}
                                onChange={(event) => setMembers(+event.target.value)}
                                disabled
                            ></input>
                            {validationErrors.members && <span className="text-danger">{validationErrors.members}</span>}

                        </div>

                        <div className="mb-3 col-5">
                            <label className="form-label">Vehicle:</label>
                            <input className="form-control" rows="1"
                                value={vehicle}
                                onChange={(event) => setVehicle(event.target.value)}
                                disabled
                            ></input>
                            {validationErrors.vehicle && <span className="text-danger">{validationErrors.vehicle}</span>}

                        </div>
                        <div className="mb-3 col-6">
                            <label className="form-label">Start time: </label>
                            <DatePicker showIcon icon={<IoIosCalendar />} minDate={new Date()} selected={startDateOpen} onChange={(date) => setStartDateOpen(formatDate(date))} 
                                disabled
                            />
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
                        <div>
                            <MdEditor style={{ height: '500px' }}
                                value={contentMarkdown}
                                renderHTML={text => mdParser.render(text)}
                                onChange={handleEditorChange} 
                                readOnly/>
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

export default ModalViewTour;