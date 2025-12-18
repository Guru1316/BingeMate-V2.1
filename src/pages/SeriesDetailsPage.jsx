import '../styles/series.css'
import '../styles/home.css'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from '../utils/api'

const Series = () => {
    const { data } = useOutletContext()
    const { seriesId } = useParams()
    const navigate = useNavigate()

    const imageBaseUrl = "https://image.tmdb.org/t/p/original"
    const imageBaseUrl1 = "https://image.tmdb.org/t/p/w500"

    const seriesData = data.find(ele => ele._id === seriesId)

    const [reviews, setReviews] = useState([])
    const [loadingReviews, setLoadingReviews] = useState(true)

    useEffect(() => {
        fetchSeriesReviews()
        // eslint-disable-next-line
    }, [seriesId])

    const fetchSeriesReviews = async () => {
        try {
            setLoadingReviews(true)
            const res = await API.get(`/diary/series/${seriesId}`)
            if (res.data.status === "Success") {
                setReviews(res.data.data)
            }
        } catch (err) {
            console.error("Failed to load series reviews", err)
        } finally {
            setLoadingReviews(false)
        }
    }

    if (!seriesData) return <h1>Series Not Found</h1>

    const checkLogin = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("Please login first!")
            return false
        }
        return true
    }

    const addToWatchlist = async () => {
        if (!checkLogin()) return
        try {
            await API.post('/watchlist', { seriesId: seriesData._id })
            alert("Added to Watchlist!")
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            alert("Already in watchlist or failed")
        }
    }

    const handleLog = () => {
        if (!checkLogin()) return
        navigate(`/reviews/${seriesData._id}`)
    }

    return (
        <div className="series">
            <div className="gridContainer">
                <div>
                    <button onClick={() => navigate(-1)} className="back-btn">
                        {"<"}---- Back
                    </button>
                    <img
                        src={`${imageBaseUrl}${seriesData.backdrop_path}`}
                        alt={seriesData.name}
                    />
                </div>
            </div>

            <div className="content-container">
                <div className="series-card1">
                    <img
                        src={`${imageBaseUrl1}${seriesData.poster_path}`}
                        alt={seriesData.name}
                    />
                </div>

                <div className="series-details">
                    <h1>{seriesData.name}</h1>

                    <div className="meta-data">
                        <span>Rating: {seriesData.vote_average} ⭐</span>
                        <span> | </span>
                        <span>{seriesData.first_air_date}</span>
                        <span> | </span>
                        <span>{seriesData.original_language.toUpperCase()}</span>
                    </div>

                    <div className="genres-list">
                        {seriesData.genres.map((genre, index) => (
                            <span key={index} className="genre-badge">
                                {genre}
                            </span>
                        ))}
                    </div>

                    <h2>Overview</h2>
                    <p>{seriesData.overview}</p>
                </div>

                <div className="action-buttons">
                    <button onClick={addToWatchlist} className="btn watchlist-btn">
                        + Watchlist
                    </button>
                    <button onClick={handleLog} className="btn log-btn">
                        + Log
                    </button>
                </div>
            </div>

            <div className="home" style={{ marginTop: "40px" }}>
                <h1 className="section-title">Reviews</h1>

                {loadingReviews ? (
                    <p>Loading reviews...</p>
                ) : reviews.length > 0 ? (
                    <div className="series1">
                        {reviews.map(entry => {
                            const userName =
                                entry.user?.email?.split("@")[0] || "Anonymous"

                            return (
                                <div className="ds" key={entry._id}>
                                    <div className="dc">
                                        <h2 className="dhh">
                                            {userName}
                                        </h2>

                                        <p className="dpw">
                                            Watched on{" "}
                                            <strong>
                                                {new Date(entry.watchedOn).toLocaleDateString()}
                                            </strong>
                                        </p>

                                        <p className="dpr">
                                            Rating <strong>{entry.rating} ⭐</strong>
                                        </p>

                                        <p className="dpre">
                                            {entry.review}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p style={{ textAlign: "center" }}>
                        No reviews yet. Be the first to review this series 🎬
                    </p>
                )}
            </div>
        </div>
    )
}

export default Series