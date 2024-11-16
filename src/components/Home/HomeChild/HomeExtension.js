import './HomeExtension.scss';
import VR360 from '../../../assets/VR360.png'
import intro from '../../../assets/intro.jpg';
import background from '../../../assets/background.jpg';
import bg2 from '../../../assets/bg2.jpg';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';
import { getAllHomeStayPaginate, getAllToursPaginate } from '../../../Service/apiServices';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { FaMoneyCheckAlt } from "react-icons/fa";

const HomeExtension = (props) => {

    const [listTour, setListTour] = useState([]);
    const [listHome, setListHome] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        fetchPopularTour(1, 4);
        fetchPopularHome(1, 4)
    }, [])
    const fetchPopularTour = async () => {
        let data = await getAllToursPaginate(1, 4);
        if (data && data.code === 201) {
            setListTour(data.result)
        }
    }
    const fetchPopularHome = async () => {
        let data = await getAllHomeStayPaginate(1, 4);
        if (data && data.code === 201) {
            setListHome(data.result)
        }
    }
    console.log(listHome)

    return (
        <>
            <div className='extension-container' style={{ overflowX: "hidden" }}>
                {/* <div className='bg' style={{ width: "100vw", height: "80vh", overflow: "hidden", maxWidth: "100vw" }}>
                <img src={background} style={{ width: "100%", height: "100%", objectFit: "cover", loading: "lazy" }} />
            </div> */}

                <Carousel data-bs-theme="dark">
                    <Carousel.Item>
                        <img
                            className="d-block w-100 h-25"
                            src={background}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h5>Tôi yêu Hà Nội</h5>
                            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block  w-100 h-25"
                            src={bg2}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h5>Tôi yêu Hà Nội</h5>
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block  w-100 h-25"
                            src={background}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h5>Tôi yêu Hà Nội</h5>
                            {/* <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>




                {/* <div className='title-extension'>
                Tiện ích du lịch
            </div>
            <div className='extension-content'>
                <div className='extension-item'>
                    <div className='image'>
                        <img src={VR360} />
                    </div>
                    <div className='title-item'>
                        Cẩm nang du lịch
                    </div>
                </div>
                <div className='extension-item'>
                    <div className='image'>
                        <img src={VR360} />
                    </div>
                    <div className='title-item'>
                        Cẩm nang du lịch
                    </div>
                </div>
                <div className='extension-item'>
                    <div className='image'>
                        <img src={VR360} />
                    </div>
                    <div className='title-item'>
                        Cẩm nang du lịch
                    </div>
                </div>
                <div className='extension-item'>
                    <div className='image'>
                        <img src={VR360} />
                    </div>
                    <div className='title-item'>
                        Cẩm nang du lịch
                    </div>
                </div>
                <div className='extension-item'>
                    <div className='image'>
                        <img src={VR360} />
                    </div>
                    <div className='title-item'>
                        Cẩm nang du lịch
                    </div>
                </div>
            </div> */}
                {/* <div className='extension-intro'>
                <div className='intro-body'>
                    <img src={intro} className='img-intro' />
                    <div className='title-intro'>
                        Miếu chùa Bảo Hà
                    </div>
                </div>
                <div className='intro-body'>
                    <img src={intro} className='img-intro' />
                    <div className='title-intro'>
                        Miếu chùa Bảo Hà
                    </div>
                </div>
                <div className='intro-body'>
                    <img src={intro} className='img-intro' />
                    <div className='title-intro'>
                        Miếu chùa Bảo Hà
                    </div>
                </div>
                <div className='intro-body'>
                    <img src={intro} className='img-intro' />
                    <div className='title-intro'>
                        Miếu chùa Bảo Hà
                    </div>
                </div>
                <div className='intro-body'>
                    <img src={intro} className='img-intro' />
                    <div className='title-intro'>
                        Miếu chùa Bảo Hà
                    </div>
                </div>
                <div className='intro-body'>
                    <img src={intro} className='img-intro' />
                    <div className='title-intro'>
                        Miếu chùa Bảo Hà
                    </div>
                </div>

            </div> */}
            </div>
            <div className='tour-popular-container'>
                <div className='tour-popular'>
                    <div className='title-tour'>
                        Trải nghiệm Hà Nội
                    </div>
                    <div className='new-tour'>
                        Mới nhất
                    </div>
                </div>
                <div className='item-tour-popular d-flex flex-wrap'>
                    {
                        listTour && listTour.length > 0 &&
                        listTour.map((item, index) => {
                            return (
                                <Card style={{ width: '18rem' }} className='mx-3 my-3' key={`popular-tour-${index}`}>
                                    <Card.Img variant="top" src={`data:image/jpeg;base64,${item.tour_image_base64}`} />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            <FaMoneyCheckAlt /> {item.price}$ cho {item.members} thành viên
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => navigate(`/discover/${item.tour_id}`)}>Chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
            <div className='home-popular-container'>
                <div className='home-popular'>
                    <div className='title-home'>
                        Home Stay Hà Nội
                    </div>
                    <div className='new-home'>
                        Mới nhất
                    </div>
                </div>
                <div className='item-home-popular d-flex flex-wrap'>
                    {
                        listHome && listHome.length > 0 &&
                        listHome.map((item, index) => {
                            return (
                                <Card style={{ width: '18rem' }} className='mx-3 my-3' key={`popular-home-${index}`}>
                                    <Card.Img variant="top" src={`data:image/jpeg;base64,${item.homestay_image_base64}`} />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            <FaMoneyCheckAlt /> {item.price}$ cho 1 ngày
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => navigate(`/homeStay/${item.homestay_id}`)}>Chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default HomeExtension;