import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import './BookTour.scss';
import { FaHandPointRight } from "react-icons/fa";
import { useState } from "react";
import ConfirmBookTour from "./ConfirmBookTour";

const BookTour = (props) => {
    const location = useLocation();
    // const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const email = useSelector(state => state.user.account.email);
    const fullName = useSelector(state => state.user.account.fullName);
    const phone = useSelector(state => state.user.account.phone);
    const username = useSelector(state => state.user.account.username);

    const [show, setShow] = useState(false);


    const handleSendRequest = () => {
        setShow(true);
    }

    return (
        <div className="book-tour-container container">
            <form className="row">
                <fieldset disabled className="col-6">
                    <legend>Tour information: </legend>
                    <div className="mb-3">
                        <label className="form-label">Address:</label>
                        <input type="text" className="form-control" placeholder={`${location?.state?.listDetailDiscover.address}`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price:</label>
                        <input type="text" className="form-control" placeholder={`${location?.state?.listDetailDiscover.price}$ for ${location?.state?.listDetailDiscover.members} members`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Vehicle:</label>
                        <input type="text" className="form-control" placeholder={`${location?.state?.listDetailDiscover.vehicle}`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Start date:</label>
                        <input type="text" className="form-control" placeholder={`${location?.state?.listDetailDiscover.tour_date}`} />
                    </div>
                </fieldset>
                <fieldset disabled className="col-6">
                    <legend>Customer information: </legend>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="text" className="form-control" placeholder={`${email}`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Full name:</label>
                        <input type="text" className="form-control" placeholder={`${fullName}`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone number:</label>
                        <input type="text" className="form-control" placeholder={`${phone}`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input type="text" className="form-control" placeholder={`${username}`} />
                    </div>
                </fieldset>
            </form>
            <div>
                <button className="btn btn-primary" onClick={() => handleSendRequest()}><FaHandPointRight style={{ fontSize: '26px' }} /> Send request</button>
            </div>
            <div>
                <ConfirmBookTour
                    setShow={setShow}
                    show={show}
                    location= {location}
                />
            </div>
            <div className="booking-tour-confirm">
                <div className="text-contact">
                    For fastest appointment, you can contact us 24/7 by:
                </div>
                <div className="text-contact">
                    Zalo: 0123456789 or <a href="https://zalo.me/0123456789">Click here</a>
                </div>
                <div className="text-contact">
                    Phone number: 0123456789
                </div>
            </div>
        </div>
    )
}

export default BookTour