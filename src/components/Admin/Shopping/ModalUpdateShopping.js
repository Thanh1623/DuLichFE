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
        // validate
        // const isValidEmail = validateEmail(email);
        // if (!isValidEmail) {
        //     toast.error('Invalid email')
        //     return;
        // }

        // let data = await putUsers(dataUpdate.user_id, {
        //     user_name: username,
        //     full_name: fullName,
        //     email: email,
        //     phone: phone,
        //     role: role
        // })
        // if (data && data.code === 201) {
        //     toast.success(data.message);
        //     handleClose();
        // await props.fetchListUsers()
        // props.setCurrentPage(1);
        // await props.fetchListUsersWithPaginate(props.currentPage)
        // }
        // if (data && data.code !== 201) {
        //     toast.error(data.message)
        // }
        // call api
        let data = await putShopping(dataUpdate.shopping_center_id, title, address, contentHTML, contentMarkdown,
            valueClose, valueOpen, type, image, map)
        if (data && data.code === 201) {
            toast.success(data.message);
            handleClose();
            await props.fetchListShop()
            // props.setCurrentPage(1);
            // await props.fetchListUsersWithPaginate(props.currentPage)
        }
        if (data && data.code !== 201) {
            toast.error(data.message)
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
                            <label className="form-label">Title:</label>
                            <textarea className="form-control" rows="1"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address:</label>
                            <textarea className="form-control" rows="3"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            ></textarea>
                        </div>
                        <div className='mb-3 col-12'>
                            <label className="form-label">{`Location on map: `}<span style={{ color: "red" }}>Note remove: </span><b>style="border:0;"</b></label>
                            <textarea className="form-control" rows="5"
                                placeholder='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.880517355801!2d105.78079297503172!3d21.037466280614062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab355cc2239b%3A0x9ae247114fb38da3!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBTxrAgUGjhuqFtIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1728296212431!5m2!1svi!2s" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                                value={map}
                                onChange={(event) => setMap(event.target.value)}
                            ></textarea>
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
                            <MdEditor style={{ height: '500px' }} value={contentMarkdown} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
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