import '../styles/home.css';

const Footer = () => {
    const isLoggedIn = Boolean(localStorage.getItem("token"));
    return (
        <footer className="footer">
            <div className="footer-content">

                <div className="footer-grid">

                    <div className="footer-section">
                        <h2 className="footer-title">🎬 Binge Mate</h2>
                        <p className="footer-text">
                            A personal series tracker and review app inspired by
                            modern streaming platforms.
                        </p>
                        <p className="footer-sub">
                            Track • Review • Remember
                        </p>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-heading">Quick Links</h3>
                        <a href="#/">Home</a>
                        <a href="#/about">About</a>
                        {isLoggedIn && (
                            <>
                            <a href="#/diary">Diary</a>
                            <a href="#/watchlist">Watchlist</a>
                            <a href="#/addSeries">Add Series</a>
                            </>
                        )}
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-heading">Contact</h3>
                        <p>📧 guruprasadgdr1@gmail.com</p>
                        <a href="https://github.com/Guru1316" target="_blank">🔗 GitHub</a>
                        <a href="https://www.linkedin.com/in/guruprasad-k-713994314/" target="_blank">
                            🔗 LinkedIn
                        </a>
                    </div>

                </div>

                <p className="footer-copy">
                    © {new Date().getFullYear()} Binge Mate • Built during MERN Internship
                </p>

            </div>
        </footer>
    );
};

export default Footer;