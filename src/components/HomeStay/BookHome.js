import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import './BookHome.scss';
import { FaHandPointRight } from "react-icons/fa";
import { useState } from "react";
import ConfirmBookHome from "./ConfirmBookHome";
import { toast } from "react-toastify";

const BookHome = (props) => {
    const location = useLocation();
    // const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const email = useSelector(state => state.user.account.email);
    const fullName = useSelector(state => state.user.account.fullName);
    const phone = useSelector(state => state.user.account.phone);
    const username = useSelector(state => state.user.account.username);

    const [show, setShow] = useState(false);


    const handleSendRequest = () => {
        if (+location?.state?.listDetailHome.type_bed === 0) {
            toast.error('Hết phòng')
        }
        else {
            setShow(true);
        }
    }

    const typeRoom = +location?.state?.listDetailHome.type_bed === 0 ? 'Hết phòng' : 'Còn phòng';

    console.log(location)
    return (
        <div className="book-tour-container container">
            <form className="row">
                <fieldset disabled className="col-6">
                    <legend>Home information: </legend>
                    <div className="mb-3">
                        <label className="form-label">Address:</label>
                        <input type="text" className="form-control" placeholder={`${location?.state?.listDetailHome.address}`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price:</label>
                        <input type="text" className="form-control" placeholder={`${location?.state?.listDetailHome.price}$ for 1 day`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Status_room:</label>
                        <input type="text" className="form-control" placeholder={typeRoom} />
                    </div>
                    {/* <div className="mb-3">
                        <label className="form-label">Start date:</label>
                        <input type="text" className="form-control" placeholder={`${location?.state?.listDetailHome.tour_date}`} />
                    </div> */}
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
                    {/* <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input type="text" className="form-control" placeholder={`${username}`} />
                    </div> */}
                </fieldset>
            </form>
            <div>
                <button className="btn btn-primary" onClick={() => handleSendRequest()}><FaHandPointRight style={{ fontSize: '26px' }} /> Send request</button>
            </div>

            <div>
                <ConfirmBookHome
                    setShow={setShow}
                    show={show}
                    location={location}
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

export default BookHome