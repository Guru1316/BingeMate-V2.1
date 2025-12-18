import '../styles/home.css';

const AboutPage = () => {
    return (
        <div className="home">

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

            <h1 className="section-title">About the Project</h1>

            <div className="about-box">
                <p>
                    <strong>BingeMate</strong> is a dynamic web application built for TV series
                    enthusiasts. It allows users to browse top series, manage a personal
                    watchlist, log their viewing history with ratings and reviews, and
                    maintain a digital diary of everything they watch.
                </p>

                <p>
                    Built using <strong>React.js (Vite)</strong>, the application features a
                    custom local authentication system and persists all user data using
                    <strong> LocalStorage</strong>. Each user has isolated data, ensuring a
                    personalized experience.
                </p>

                <p>
                    The UI follows a dark, cinematic design inspired by modern streaming
                    platforms, providing a clean and distraction-free viewing experience.
                </p>
            </div>

            <h1 className="section-title">Key Features</h1>

            <div className="about-box">
                <ul>
                    <li>🏠 Dynamic home page with curated TV series</li>
                    <li>🔐 Custom authentication with multi-user support</li>
                    <li>📝 Viewing diary with ratings, reviews, and watched dates</li>
                    <li>📺 Smart watchlist for planned shows</li>
                    <li>➕ Add new series dynamically</li>
                    <li>📱 Fully responsive dark-themed UI</li>
                </ul>
            </div>

            <h1 className="section-title">Tech Stack</h1>

            <div className="about-box">
                <ul>
                    <li><strong>Frontend:</strong> React.js (v19), Vite</li>
                    <li><strong>Routing:</strong> React Router v6 (HashRouter)</li>
                    <li><strong>State:</strong> React Hooks</li>
                    <li><strong>Storage:</strong> Browser LocalStorage</li>
                    <li><strong>Styling:</strong> CSS3 (Flexbox & Grid)</li>
                    <li><strong>Deployment:</strong> GitHub Pages</li>
                </ul>
            </div>

            <h1 className="section-title">Acknowledgements</h1>

            <div className="about-box">
                <p>
                    Mentor: <span className="highlight">Siddharth Sharma</span>
                </p>
                <p>
                    Special thanks for guidance on project structuring, practical
                    application design, and mentorship throughout the MERN internship.
                </p>
            </div>

            <h1 className="section-title">Author</h1>

            <div className="about-box">
                <p><strong className='highlight'>Guruprasad</strong></p>
                <p>GitHub: @Guru1316</p>
                <p>Built during my MERN Stack Internship</p>
            </div>

        </div>
    );
};

export default AboutPage;