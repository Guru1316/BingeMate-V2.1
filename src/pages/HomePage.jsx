import { useOutletContext } from 'react-router-dom';
import '../styles/home.css';
import SeriesCard from '../components/SeriesCard';

const Home = () => {
    const { data } = useOutletContext();
    
    return(
        <div className='home'>
            <section className="hero">
                <div className="hero-left">
                    <img
                        src={`${import.meta.env.BASE_URL}image.png`}
                        alt="BingeMate Logo"
                        className="hero-logo"
                    />
                    <h1 className="hero-title">Binge <span className='mate'>Mate</span></h1>
                </div>

                <div className="hero-right">
                    <p>Your personal series companion.</p>
                    <p>Track what you watch.</p>
                    <p>Build your own binge diary.</p>
                </div>
            </section>
            <h1 className='section-title'>Top Series</h1>
            <div className='series-grid'>
                {data.map((series) => {
                    return(
                        <SeriesCard key={series._id} series={series}></SeriesCard>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;