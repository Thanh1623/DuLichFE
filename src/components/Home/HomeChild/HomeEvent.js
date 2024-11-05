import { useEffect, useState } from 'react';
import './HomeEvent.scss'
import { getAllEvents, getAllNews } from '../../../Service/apiServices';
import { useNavigate } from 'react-router-dom';

const HomeEvent = () => {

    const [listNews, setListNews] = useState([]);
    const [listEvents, setListEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchListNews();
        fetchListEvents();
    }, [])

    const fetchListNews = async () => {
        let data = await getAllNews();
        if (data) {
            setListNews(data.result)
        }
    }
    const fetchListEvents = async () => {
        let data = await getAllEvents();
        if (data && data.code === 201) {
            setListEvents(data.result)
        }
    }

    const convertToDate = (isoTimestamp) => {
        let date = new Date(isoTimestamp);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return `${year}-${month}-${dt}`;
    };


    const handleDetailNews = (news) => {
        navigate(`/news/${news.news_id}`,
            { state: { listNewsDetail: news } })

    }
    const handleDetailEvents = (event) => {
        navigate(`/events/${event.event_id}`,
            { state: { listNewsDetail: event } })

    }

    console.log('listEvents: ', listEvents);


    return (
        <div className="event-news">
            <div className="news-container col-xs-12 col-xl-8">
                <div className="title-news">
                    Tin tức
                </div>

                <div className="news-content">
                    <div className="content-up">
                        {
                            listNews && listNews.length > 0 &&
                            listNews.map((item, index) => {
                                if (index < 6) {
                                    return (
                                        <div key={`news-${index}`} className="content"
                                            onClick={() => handleDetailNews(item)}>
                                            <div className="image">
                                                <img src="http://dulichhp.ebizoffice.vn/Uploads/news/3341.jpg" />
                                            </div>
                                            <div className="info">
                                                <div className="title">
                                                    {item.title}
                                                </div>
                                                <div className="time">
                                                    {convertToDate(item.created_at)}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            })
                        }
                    </div>
                    <div className="content-down">
                    </div>
                </div>
            </div>
            <div className='event-container'>
                <div className="title-event">
                    Sự kiện
                </div>
                <div className="event-content col-xs-12 col-xl-4">
                    {
                        listEvents && listEvents.length > 0 &&
                        listEvents.map((item, index) => {
                            if (index < 6) {
                                return (
                                    <div className="content" key={`event-${index}`}
                                        onClick={() => handleDetailEvents(item)}
                                    >
                                        <div className="stt">
                                            {index + 1}
                                        </div>
                                        <div className="info">
                                            <div className="title">
                                                {item.title}
                                            </div>
                                            <div className="time">
                                                {(item.opening_hours_event)} to {(item.closing_time_event)}
                                            </div>
                                            {/* <div className="date">
                                                Sự kiện đang diễn ra
                                            </div> */}
                                        </div>
                                    </div>
                                )
                            }

                        })
                    }
                </div>

            </div>
        </div>
    )
}
export default HomeEvent;