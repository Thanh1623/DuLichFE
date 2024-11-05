import { useState } from 'react';
import './HomeComment.scss';
import Accordion from 'react-bootstrap/Accordion';
import { useSelector } from 'react-redux';
import { feedBackWeb } from '../../../Service/userService';
import { ToastContainer, toast } from 'react-toastify';

const HomeComment = (props) => {

    const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const idUser = useSelector(state => state.user.account.idUser);


    const handleFeedBackWeb = async () => {
        if (!content) {
            toast.error('Invalid content');
            return;
        }
        let data = await feedBackWeb({
            user_id: idUser,
            content: content
        })
        if (data && data.message === 'Add feedback Successful') {
            toast.success(data.message);
            setName('');
            setEmail('');
            setContent('');
        }
        else {
            toast.error(data.message)
        }
    }


    return (
        <div className='comment-container container'>
            <div className='reflection-body'>
                <div className='title-reflection'>
                    PHẢN ÁNH - GÓP Ý
                </div>
                <div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Họ tên</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Email/số điện thoại</label>
                        <input type="text" className="form-control" id="exampleInputPassword1"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Nội dung</label>
                        <input type="text" className="form-control" id="exampleInputPassword1"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary"
                        onClick={() => handleFeedBackWeb()}
                    >Gửi</button>
                </div>
            </div>
            <div className='faq-body'>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Nên đặt tour khi nào?</Accordion.Header>
                        <Accordion.Body>
                            Thời điểm tuyệt vời nhất để bạn đặt tour đó là khi bạn đã sẵn sàng cho chuyến du lịch của mình, tham khảo giá của các công ty du lịch lữ hành, và lựa chọn một công ty du lịch uy tín để chuyến bay của bạn thuận lợi và an toàn nhất.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Nên làm gì khi hành lý bị trễ?</Accordion.Header>
                        <Accordion.Body>
                            Khi bạn đã đến sân bay mà hành lý vẫn chưa đến băng chuyền, việc đầu tiên bạn nên làm đó là liên hệ với nhân viên hàng không, họ sẽ giúp bạn kiểm tra mã hành lý và giúp bạn lấy lại hành lý của mình.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Nên đặt khách sạn trước bao lâu?</Accordion.Header>
                        <Accordion.Body>
                            Khuyên bạn nên đặt phòng khách sạn ngay sau khi bạn đã chốt được lịch cho chuyến đi của mình. Bạn có thể đặt phòng trực tiếp với khách sạn, hoặc có thể nhờ đến những công ty du lịch lữ hành để nhận được mức giá tốt nhất. Không nên đặt phòng khách sạn ngay trước hôm bạn đi, sẽ rất khó để chọn được một phòng tốt và được hưởng mức giá ưu đãi từ phía khách sạn.                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Tạo lịch trình cá nhân như thế nào?</Accordion.Header>
                        <Accordion.Body>
                            Bước 1: Xác định số lượng thành viên đi du lịch.
                            Bước 2: Lựa chọn địa điểm du lịch.
                            Bước 3: Lựa chọn loại hình du lịch.
                            Bước 4: Lựa chọn thời điểm du lịch.
                            Bước 5: Dự trù về ngân sách.
                            Bước 6: Tìm hiểu book phòng du lịch, vé máy bay (nếu cần)
                            Bước 7: Lên lịch trình các điểm đến cần khám phá
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Du lịch ở Hải Phòng những điểm nào chi phí không cao?</Accordion.Header>
                        <Accordion.Body>
                            Khi bạn đã đến sân bay mà hành lý vẫn chưa đến băng chuyền, việc đầu tiên bạn nên làm đó là liên hệ với nhân viên hàng không, họ sẽ giúp bạn kiểm tra mã hành lý và giúp bạn lấy lại hành lý của mình.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

        </div>
    )
}

export default HomeComment;