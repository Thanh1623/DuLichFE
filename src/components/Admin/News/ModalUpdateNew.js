

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import DatePicker from "react-datepicker";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { IoIosCalendar } from "react-icons/io";
import _ from 'lodash';
var toBuffer = require('blob-to-buffer')

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalUpdateNew = (props) => {
    const { show, setShow } = props;
    const { dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
        props.resetUpdateData()
    };

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [image, setImage] = useState('');


    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            console.log('dataUpdate: ', dataUpdate);

            setContent(dataUpdate.content);
            setContentHTML(dataUpdate.description);
            setTitle(dataUpdate.title);
        }
    }, [dataUpdate])

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContent(text);
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
                        </div>
                        <div className="mb-3 col-12">
                            <label className="form-label">Image title: </label>
                            <input className="form-control" type='file'
                                onChange={(event) => setImage(event.target.files[0])}
                            ></input>
                        </div>
                        {/* <div class="mb-3 col-6">
                            <label class="form-label">Time of writing: </label>
                            <DatePicker disabled showIcon icon={<IoIosCalendar />} selected={startDate} onChange={(date) => setStartDate(formatDate(date))} />
                        </div> */}
                        <div>
                            <MdEditor style={{ height: '300px' }}
                                value={content}
                                renderHTML={text => mdParser.render(text)}
                                onChange={handleEditorChange} />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdateNew;