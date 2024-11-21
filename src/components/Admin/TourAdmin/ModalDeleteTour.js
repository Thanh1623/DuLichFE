import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { deleteUser } from '../../../Service/apiService';
import { toast } from 'react-toastify';
import { deleteTour } from '../../../Service/apiServices'

const ModalDeleteTour = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = async () => {
        let data = await deleteTour(dataDelete.tour_id)
        if (data && data.code === 201) {
            toast.success(data.message);
            handleClose();
            props.setCurrentPage(1);
            await props.fetchListToursWithPaginate(1);
            // props.setCurrentPage(1);
            // await props.fetchListUsersWithPaginate(1)
        }
        if (data && data.code !== 201) {
            toast.error(data.message)
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
                    <Modal.Title>Confirm delete the tour?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this tour, title:
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

export default ModalDeleteTour;