

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import DatePicker from "react-datepicker";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { IoIosCalendar } from "react-icons/io";
import _ from 'lodash';
import { putNews } from '../../../Service/apiServices';
import { toast } from 'react-toastify';
import Lightbox from "react-awesome-lightbox";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalUpdateNew = (props) => {
    const { show, setShow } = props;
    const { dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
        props.resetUpdateData()
    };

    const [title, setTitle] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [image, setImage] = useState('');

    const [imageP, setImageP] = useState('');
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({});

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
        // if (!startDate) {
        //     errors.startDate = 'Time of writing is required';
        // }

        // Validate Content
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

            setContentMarkdown(dataUpdate.ContentMarkDown);
            setContentHTML(dataUpdate.ContentHTML);
            setTitle(dataUpdate.title);

            setImage(base64ToFile(`data:image/jpeg;base64,${dataUpdate.news_image_base64}`));


            setImageP(`data:image/jpeg;base64,${dataUpdate.news_image_base64}`);
            setDataImagePreview({
                url: `data:image/jpeg;base64,${dataUpdate.news_image_base64}`,
            })

        }
    }, [dataUpdate])

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }
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

    const handleUpdateNews = async () => {
        const validation = validate();

        if (validation === true) {
            let data = await putNews(dataUpdate.news_id, title, image, contentMarkdown, contentHTML);
            if (data && data.code === 201) {
                toast.success(data.message);
                handleClose();
                await props.fetchListNewsWithPaginate(props.currentPage);
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
            <Modal show={show} onHide={handleClose} size='xl' autoFocus='true' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Update a News</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 row'>

                        <div class="mb-3">
                            <label class="form-label">Title</label>
                            <textarea class="form-control" rows="3"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            ></textarea>
                            {validationErrors.title && <span className="text-danger">{validationErrors.title}</span>}

                        </div>
                        <div className="mb-3 col-12">
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


                        {/* <div class="mb-3 col-6">
                            <label class="form-label">Time of writing: </label>
                            <DatePicker disabled showIcon icon={<IoIosCalendar />} selected={startDate} onChange={(date) => setStartDate(formatDate(date))} />
                        </div> */}
                        <div>
                            <MdEditor style={{ height: '300px' }}
                                value={contentMarkdown}
                                renderHTML={text => mdParser.render(text)}
                                onChange={handleEditorChange} />
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
                    <Button variant="primary" onClick={handleUpdateNews}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdateNew;