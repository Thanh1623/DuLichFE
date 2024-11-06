import './HomeExtension.scss';
import VR360 from '../../../assets/VR360.png'
import intro from '../../../assets/intro.jpg';
import background from '../../../assets/background.jpg';

const HomeExtension = (props) => {
    return (
        <div className='extension-container' style={{ overflowX: "hidden" }}>
            <div className='bg' style={{ width: "100vw", height: "80vh", overflow: "hidden", maxWidth: "100vw" }}>
                <img src={background} style={{ width: "100%", height: "100%", objectFit: "cover", loading:"lazy" }} />
            </div>

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
    )
}
export default HomeExtension;