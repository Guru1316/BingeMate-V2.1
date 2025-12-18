import '../styles/series.css';
import '../styles/seriesForm.css';
import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import API from '../utils/api';

const Reviews = () => {
    const { data } = useOutletContext();
    const { seriesId } = useParams();
    const navigate = useNavigate();

    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

    const seriesData = data.find(series => series._id === seriesId);

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(5);
    const [watchDate, setWatchDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first!");
            navigate("/");
        }
    }, [navigate]);

    if (!seriesData) {
        return <h1>Loading...</h1>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const diaryEntry = {
                seriesId: seriesData._id,
                rating: Number(rating),
                review,
                watchedOn: watchDate
            };

            await API.post('/diary', diaryEntry);

            alert("Logged to Diary successfully!");
            navigate("/diary");
        } 
        catch (error) {
            console.error(error);

            if (error.response?.status === 400) {
                alert(error.response.data.message || "Already logged in diary");
            } 
            else if (error.response?.status === 401) {
                alert("Session expired. Please login again.");
                navigate("/");
            } 
            else {
                alert("Failed to save diary entry");
            }
        }
    };

    return (
        <div className="series">
            <button onClick={() => navigate(-1)} className="back-btn">
                {"<"}---- Back
            </button>

            <div className="content-container">
                <div className="series-card1">
                    <img
                        src={`${imageBaseUrl}${seriesData.poster_path}`}
                        alt={seriesData.name}
                    />
                    <h3 style={{ textAlign: "center" }}>
                        {seriesData.name}
                    </h3>
                </div>

                <div className="series-details">
                    <div className="forms">
                        <h1 className="title">I Watched…</h1>

                        <form onSubmit={handleSubmit}>
                            <label>Date Watched</label>
                            <input
                                type="date"
                                value={watchDate}
                                onChange={(e) => setWatchDate(e.target.value)}
                                required
                            />

                            <label>Rating (1–5)</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                step="0.5"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                required
                            />

                            <label>Review</label>
                            <textarea
                                rows={4}
                                placeholder="Write your review..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required
                            />

                            <button className="submitButton" type="submit">
                                Save to Diary
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;