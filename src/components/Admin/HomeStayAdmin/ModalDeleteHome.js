import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { deleteUser } from '../../../Service/apiService';
import { toast } from 'react-toastify';
import { deleteEvent, deleteFood, deleteHome, deleteUsers } from '../../../Service/apiServices'

const ModalDeleteHomeStay = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = async () => {
        let data = await deleteHome(dataDelete.homestay_id)
        if (data && data.message === 'Delete answers Successfull') {
            toast.success(data.message);
            await props.fetchListHomeStay();
            handleClose();
            // props.setCurrentPage(1);
            // await props.fetchListUsersWithPaginate(1)
        }
        if (data && data.message !== 'Delete answers Successfull') {
            toast.error(data.message);
            handleClose();
        }
    }
    console.log(dataDelete)
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete the user?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this event, title:
                    <b>{dataDelete && dataDelete.title ? dataDelete.title : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleSubmitDeleteUser()}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteHomeStay;