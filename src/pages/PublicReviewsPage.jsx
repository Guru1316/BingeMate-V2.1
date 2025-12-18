import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import "../styles/series.css";
import API from "../utils/api";

const PublicReviews = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

    useEffect(() => {
        fetchPublicReviews();
         
    }, []);

    const fetchPublicReviews = async () => {
        try {
            setLoading(true);
            const response = await API.get("/diary/public");

            if (response.data.status === "Success") {
                const validReviews = response.data.data.filter(
                    (entry) => entry.series
                );
                setReviews(validReviews);
            }
        } catch (error) {
            console.error("Error fetching public reviews:", error);
            alert("Failed to load public reviews");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="home">Loading...</div>;
    }

    return (
        <div className="home">
            <button onClick={() => navigate(-1)} className="back-btn">
                {"<"}---- Back
            </button>

            <h1 className="section-title">Public Reviews</h1>

            {reviews.length > 0 ? (
                <div className="series1">
                    {reviews.map((entry) => {
                        const userName =
                            entry.user?.email?.split("@")[0] || "Anonymous";

                        return (
                            <div className="ds" key={entry._id}>
                                <div className="di">
                                    <img
                                        onClick={() =>
                                            navigate(`/series/${entry.series._id}`)
                                        }
                                        src={`${imageBaseUrl}${entry.series.poster_path}`}
                                        alt={entry.series.name}
                                        className="dim"
                                    />
                                </div>

                                <div className="dc">
                                    <h2 className="dhh">
                                        {entry.series.name}
                                    </h2>

                                    <p className="dpw">
                                        Reviewed by:{" "}
                                        <strong>{userName}</strong>
                                    </p>

                                    <p className="dpw">
                                        Watched on:{" "}
                                        <strong>
                                            {new Date(entry.watchedOn).toLocaleDateString()}
                                        </strong>
                                    </p>

                                    <p className="dpr">
                                        Rating:{" "}
                                        <strong>{entry.rating} ⭐</strong>
                                    </p>

                                    <p className="dpre">
                                        <strong>Review:</strong>
                                        <br />
                                        {entry.review}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="home empty">
                    <h1>No Public Reviews Yet</h1>
                    <p>Be the first one to log a series 🎬</p>
                </div>
            )}
        </div>
    );
};

export default PublicReviews;