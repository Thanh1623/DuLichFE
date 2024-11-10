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

function ModalViewFeed(props) {
    const { show, setShow } = props;
    const { dataView } = props;

    const handleClose = () => {
        setShow(false);
    };

    const [content, setContent] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            console.log('dataView: ', dataView);
            setContent(dataView.content);
            setUser(`${dataView.email} - ${dataView.phone}`);
        }
    }, [dataView])


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
                    <Modal.Title>View feedback web</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 row'>
                        <div className="mb-3">
                            <label className="form-label">User:</label>
                            <textarea className="form-control" rows="1" disabled
                                value={user}
                            ></textarea>
                        </div>
                    </div>
                    <div className='col-12 row'>
                        <div className="mb-3">
                            <label className="form-label">Content:</label>
                            <textarea className="form-control" rows="1" disabled
                                value={content}
                            ></textarea>
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

export default ModalViewFeed;