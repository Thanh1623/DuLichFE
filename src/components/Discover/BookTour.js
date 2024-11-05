import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import './BookTour.scss'

const BookTour = () => {
    const location = useLocation();
    // const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const email = useSelector(state => state.user.account.email);
    const fullName = useSelector(state => state.user.account.full_name);
    const phone = useSelector(state => state.user.account.phone);
    console.log(location);

    return (
        <div className="book-tour-container container">
            <form className="row">
                <fieldset disabled className="col-6">
                    <legend>Tour information: </legend>
                    <div class="mb-3">
                        <label class="form-label">Address:</label>
                        <input type="text" class="form-control" placeholder={`${location?.state?.listDetailDiscover.address}`} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Price:</label>
                        <input type="text" class="form-control" placeholder={`${location?.state?.listDetailDiscover.price}$ for ${location?.state?.listDetailDiscover.members} members`} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Vehicle:</label>
                        <input type="text" class="form-control" placeholder={`${location?.state?.listDetailDiscover.vehicle}`} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Date:</label>
                        <input type="text" class="form-control" placeholder={`${location?.state?.listDetailDiscover.tour_date}`} />
                    </div>
                </fieldset>
                <fieldset disabled className="col-6">
                    <legend>Customer information: </legend>
                    <div class="mb-3">
                        <label class="form-label">Email:</label>
                        <input type="text" class="form-control" placeholder={`${email}`} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Full name:</label>
                        <input type="text" class="form-control" placeholder={`${fullName}`} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Phone number:</label>
                        <input type="text" class="form-control" placeholder={`${phone}`} />
                    </div>
                </fieldset>
            </form>
            <div>
                <button className="btn btn-primary">Send request</button>
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