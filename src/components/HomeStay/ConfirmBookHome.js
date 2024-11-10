import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { ConfirmBookHomeUser, ConfirmBookTourUser } from '../../Service/userService';
import thanks from '../../assets/chucmung.gif';
import { useNavigate } from 'react-router-dom';

const ConfirmBookHome = (props) => {
    const { show, setShow, location } = props;
    const idHome = location?.state?.listDetailHome?.homestay_id;
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const handleConfirmBooking = async () => {
        let data = await ConfirmBookHomeUser({
            homestay_id: idHome
        });
        if (data && data.code === 201) {
            toast.success(data.message);
            setSuccess(true);

        }
        if (data && data.code !== 201) {
            toast.error(data.message);
            setSuccess(false)
        }
    }

    return (
        <>
            {
                success === false ?
                    <Modal show={show} onHide={handleClose} backdrop='static' autoFocus='true' centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm book HomeStay</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: '18px' }}>
                            {/* <div>
                        We will contact you within 5 minutes.
                    </div>
                    <div>
                        Thank you for trusting and booking my company's tour!!!
                    </div> */}
                            <div>To book this HomeStay, please make sure your information such as phone number and email are correct.</div>


                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => handleConfirmBooking()}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    :
                    <Modal show={show} onHide={() => navigate('/discover')} backdrop='static' autoFocus='true' centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Thank you</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: '18px' }}>
                            <div>
                                <img src={thanks} />
                            </div>
                            <div>
                                We will contact you within 5 minutes.
                            </div>
                            <div>
                                Thank you for trusting and booking my company's HomeStay!!!
                            </div>


                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => navigate('/discover')}>
                                Close
                            </Button>
                            {/* <Button variant="primary" onClick={() => handleConfirmBooking()}>
                                Confirm
                            </Button> */}
                        </Modal.Footer>
                    </Modal>
            }

        </>
    );
}

export default ConfirmBookHome;