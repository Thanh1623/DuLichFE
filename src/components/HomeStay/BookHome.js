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

    console.log(location);
    function formatNumberWithDots(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return (
        <div className="book-tour-container container">
            <form className="row">
                <fieldset disabled className="col-6">
                    <legend>Thông tin homestay: </legend>
                    <div className="mb-3">
                        <label className="form-label">Địa chỉ:</label>
                        <input type="text" className="form-control" placeholder={`${location?.state?.listDetailHome.address}`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Giá:</label>
                        <input type="text" className="form-control" placeholder={`${formatNumberWithDots(location?.state?.listDetailHome?.price)} VND cho 1 ngày`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Trạng thái:</label>
                        <input type="text" className="form-control" placeholder={typeRoom} />
                    </div>
                    {/* <div className="mb-3">
                        <label className="form-label">Start date:</label>
                        <input type="text" className="form-control" placeholder={`${location?.state?.listDetailHome.tour_date}`} />
                    </div> */}
                </fieldset>
                <fieldset disabled className="col-6">
                    <legend>Thông tin khách hàng: </legend>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="text" className="form-control" placeholder={`${email}`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Họ và tên:</label>
                        <input type="text" className="form-control" placeholder={`${fullName}`} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Số điện thoại:</label>
                        <input type="text" className="form-control" placeholder={`${phone}`} />
                    </div>
                    {/* <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input type="text" className="form-control" placeholder={`${username}`} />
                    </div> */}
                </fieldset>
            </form>
            <div>
                <button className="btn btn-primary" onClick={() => handleSendRequest()}><FaHandPointRight style={{ fontSize: '26px' }} /> Gửi yêu cầu</button>
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
                    Để đặt lịch hẹn nhanh nhất, bạn có thể liên hệ với chúng tôi 24/7 qua:
                </div>
                <div className="text-contact">
                    Zalo: 0123456789 or <a href="https://zalo.me/0964710577" target="_blank">Click vào đây</a>
                </div>
                <div className="text-contact">
                    Số điện thoại: 0123456789
                </div>
            </div>
        </div>
    )
}

export default BookHome