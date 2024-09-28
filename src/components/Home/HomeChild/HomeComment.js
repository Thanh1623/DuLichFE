import './HomeComment.scss'

const HomeComment = (props) => {
    return(
        <div className='comment-container container'>
            <div className='reflection-body'>
                <div className='title-reflection'>
                    PHẢN ÁNH - GÓP Ý
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Họ tên</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Email/số điện thoại</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Nội dung</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Gửi</button>
                </form>
            </div>
            <div className='faq-body'>
                <div className='title-faq'>
                    HỎI ĐÁP
                </div>
                <div className="faq-content">
                    <div className="title-content">
                        <p>Nên đặt tour khi nào?</p>
                    </div>
                    <div className="title-content">
                        <p>Thời điểm tuyệt vời nhất để bạn đặt tour đó là khi bạn đã sẵn sàng cho chuyến du lịch của mình, tham khảo giá của các công ty du lịch lữ hành, và lựa chọn một công ty du lịch uy tín để chuyến bay của bạn thuận lợi và an toàn nhất.</p>
                    </div>
                </div>
                <div className="faq-content">
                    <div className="title-content">
                        <p>Nên đặt tour khi nào?</p>
                    </div>
                    <div className="title-content">
                        <p>Thời điểm tuyệt vời nhất để bạn đặt tour đó là khi bạn đã sẵn sàng cho chuyến du lịch của mình, tham khảo giá của các công ty du lịch lữ hành, và lựa chọn một công ty du lịch uy tín để chuyến bay của bạn thuận lợi và an toàn nhất.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeComment;