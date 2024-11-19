import { useEffect, useState } from "react";
import { getIntro } from "../../Service/apiServices";
import './Introduce.scss'


const Introduce = (props) => {
    const [intro, setIntro] = useState('')
    useEffect(() => {
        fetchIntro()
    }, [])

    const fetchIntro = async () => {
        let data = await getIntro();
        if (data && data.code === 201) {
            setIntro(data.result[0].ContentHTML)
        }
    }
    return (
        <div className="detail-intro-description container">
            <div className="DesImg" dangerouslySetInnerHTML={{ __html: intro }}>
            </div>
        </div>
    )
}

export default Introduce;