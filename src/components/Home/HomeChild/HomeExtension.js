import './HomeExtension.scss';
import VR360 from '../../../assets/VR360.png'
import intro from '../../../assets/intro.jpg'

const HomeExtension = (props) => {
    return (
        <div className='extension-container container'>
            <div className='title-extension'>
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
            </div>
            <div className='extension-intro'>
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

            </div>
        </div>
    )
}
export default HomeExtension;