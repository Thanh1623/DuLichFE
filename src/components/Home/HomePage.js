import videoHomePage from '../../assets/hero.mp4'
import HomeComment from './HomeChild/HomeComment';
import HomeEvent from './HomeChild/HomeEvent';
import HomeExtension from './HomeChild/HomeExtension';

const HomePage = (props) => {
    return (
        <div className="home-container">
            <div>
                <HomeExtension />
            </div>
            <div>
                <HomeEvent />
            </div>
            <div>
                <HomeComment />
            </div>
        </div>
    )
}

export default HomePage;