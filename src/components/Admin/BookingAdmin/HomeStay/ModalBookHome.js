import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import _ from 'lodash';

import MarkdownIt from 'markdown-it';
import { UpdateBookHome, UpdateBookTour } from '../../../../Service/apiServices';


const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalBookHome(props) {
    const { show, setShow } = props;
    const { dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
    };

    const [content, setContent] = useState('');
    const [type, setType] = useState('Đã duyệt');

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            console.log('dataUpdate: ', dataUpdate);
        }
    }, [dataUpdate])

    const handleSubmitUpdateStatus = async () => {
        let data = await UpdateBookHome({
            booking_id: dataUpdate.booking_id,
            status_homestay: type
        })
        if (data && data.code === 201) {
            toast.success(data.message);
            handleClose();
            await props.fetchListBookHome(props.currentPage);
        }
        if (data && data.code !== 201) {
            toast.error(data.message)
        }
    }
    const typeRoom = +dataUpdate.homestay_type_bed === 0 ? 'Hết phòng' : 'Còn phòng';

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
                    <Modal.Title>Update status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row">
                        <fieldset disabled className="col-6">
                            <legend>Tour information: </legend>
                            <div className="mb-3">
                                <label className="form-label">Name tour:</label>
                                <input type="text" className="form-control" placeholder={`${dataUpdate.homestay_name}`} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price:</label>
                                <input type="text" className="form-control" placeholder={`${dataUpdate.homstay_price}$ for 1 day`} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Status_HomeStay:</label>
                                <input type="text" className="form-control" placeholder={typeRoom} />
                            </div>
                            {/* <div className="mb-3">
                                <label className="form-label">Start date:</label>
                                <input type="text" className="form-control" placeholder={`${dataUpdate.tour_date}`} />
                            </div> */}

                        </fieldset>
                        <fieldset disabled className="col-6">
                            <legend>Customer information: </legend>
                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <input type="text" className="form-control" placeholder={`${dataUpdate.email}`} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Full name:</label>
                                <input type="text" className="form-control" placeholder={`${dataUpdate.full_name}`} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone number:</label>
                                <input type="text" className="form-control" placeholder={`${dataUpdate.phone}`} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Username:</label>
                                <input type="text" className="form-control" placeholder={`${dataUpdate.user_name}`} />
                            </div>
                        </fieldset>
                        <div className="col-md-4">
                            <label className="form-label">Status</label>
                            <select className="form-select"
                                value={type}
                                onChange={(event) => setType(event.target.value)}
                            >
                                <option value='Đã duyệt'>Approved</option>
                                <option value='Không duyệt'>Not approved</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateStatus()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalBookHome;