import { useEffect, useState } from "react";
import { getApiAnswer, getApiDownAnswer, getApiQuestions } from "../../Service/userService";
import { SiVerizon } from "react-icons/si";


const Suggest = () => {
    const [listQues, setListQues] = useState([]);
    const [listAnswer, setListAnswer] = useState([]);
    const [listDownAnswer, setListDownAnswer] = useState([]);
    const [tickQues, setTickQues] = useState('');
    const [tickAnswer, setTickAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [showDownAnswer, setShowDownAnswer] = useState(false);



    useEffect(() => {
        fetchAllQues()
    }, [])

    useEffect(() => {
        setShowAnswer(false);
        setShowDownAnswer(false);
    }, [tickQues])
    useEffect(() => {
        setShowDownAnswer(false);
    }, [tickAnswer])

    const fetchAllQues = async () => {
        let data = await getApiQuestions();
        if (data && data.code === 200) {
            setListQues(data.result);
        }
    }
    const handleClickQues = (item) => {
        setTickQues(item.question_id);
    }
    const handleClickAnswer = (item) => {
        setTickAnswer(item.answer_id);
    }

    const handleSubmitQues = async () => {
        let data = await getApiAnswer(tickQues);
        if (data && data.code === 200) {
            setListAnswer(data.result);
            setShowAnswer(true)
        }
        if (data && data.code !== 200) {
            setListAnswer([]);
        }
    }
    const handleSubmitAnswer = async () => {
        let data = await getApiDownAnswer(tickAnswer);
        if (data && data.code === 201) {
            setListDownAnswer(data.result);
            setShowDownAnswer(true)
        }
        if (data && data.code !== 201) {
            setListDownAnswer([]);
        }
    }
    const handleSubmitEnd = () => {
        setTickQues('')
    }

    return (
        <div className="suggest-container container pt-5">
            <div className="mb-5" style={{ color: 'blue', fontSize: '28px', textAlign: 'center' }}>
                Gợi ý thông minh sẽ giúp bạn có 1 trải nghiệm Hà Nội thật ý nghĩa!
            </div>
            <div className="mb-2">
                Mời bạn chọn:
            </div>
            {

                listQues && listQues.length > 0 &&
                listQues.map((item, index) => {
                    return (
                        <div className="suggest-ques" key={`ques-${index}`}>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={() => handleClickQues(item)}>{item.question_text}</button>
                                {
                                    +tickQues === item.question_id &&
                                    <SiVerizon hidden={false} style={{ color: 'green', marginLeft: '5px' }} />
                                }
                            </div>
                        </div>
                    )
                })
            }
            <div className="mb-3">
                <button className="btn btn-outline-info" onClick={() => handleSubmitQues()}>Xác nhận</button>
            </div>
            {
                showAnswer === true &&
                <div>
                    <div className="mb-2">
                        Tiếp theo:
                    </div>
                    {

                        listAnswer && listAnswer.length > 0 &&
                        listAnswer.map((item, index) => {
                            return (
                                <div className="suggest-ques" key={`answer-${index}`}>
                                    <div className="mb-3">
                                        <button className="btn btn-primary" onClick={() => handleClickAnswer(item)}>{item.answer_text}</button>
                                        {
                                            +tickAnswer === item.answer_id &&
                                            <SiVerizon hidden={false} style={{ color: 'green', marginLeft: '5px' }} />
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="mb-3">
                        <button className="btn btn-outline-info" onClick={() => handleSubmitAnswer()}>Tiếp theo</button>
                    </div>
                </div>
            }
            {
                showDownAnswer === true &&
                <div>
                    <div className="mb-2">
                        Kết quả:
                    </div>
                    {

                        listDownAnswer && listDownAnswer.length > 0 &&
                        listDownAnswer.map((item, index) => {
                            return (
                                <div className="suggest-ques" key={`downAnswer-${index}`}>
                                    <div className="mb-3">
                                        <ul class="list-group">
                                            <li class="list-group-item list-group-item-primary">{item.downanswer_text}</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="mb-3">
                        <button className="btn btn-outline-info" onClick={() => handleSubmitEnd()}>Kết thúc</button>
                    </div>
                </div>
            }

        </div>
    )
}

export default Suggest;