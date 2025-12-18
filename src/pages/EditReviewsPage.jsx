import '../styles/series.css'
import '../styles/seriesForm.css'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../utils/api'

const EditReviews = () => {
    const { id } = useParams() 
    const navigate = useNavigate()

    const imageBaseUrl = "https://image.tmdb.org/t/p/w500"

    const [series, setSeries] = useState(null)
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(5)
    const [watchDate, setWatchDate] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("Please login first!")
            navigate("/")
            return
        }

        fetchDiaryEntry()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchDiaryEntry = async () => {
        try {
            const response = await API.get(`/diary/${id}`)
            const entry = response.data.data

            setSeries(entry.series)
            setReview(entry.review)
            setRating(entry.rating)
            setWatchDate(entry.watchedOn.split("T")[0])
        } catch (error) {
            console.error(error)
            alert("Failed to load diary entry")
            navigate("/diary")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await API.put(`/diary/${id}`, {
                rating: Number(rating),
                review,
                watchedOn: watchDate
            })

            alert("Review updated successfully!")
            navigate("/diary")
        } catch (error) {
            console.error(error)
            alert("Failed to update review")
        }
    }

    if (!series) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="series">
            <button onClick={() => navigate(-1)} className="back-btn">
                {"<"}---- Back
            </button>

            <div className="content-container">
                <div className="series-card1">
                    <img
                        src={`${imageBaseUrl}${series.poster_path}`}
                        alt={series.name}
                    />
                    <h3 style={{ textAlign: "center" }}>
                        {series.name}
                    </h3>
                </div>

                <div className="series-details">
                    <div className="forms">
                        <h1 className="title">Edit Review</h1>

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
                                placeholder="Edit your review..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required
                            />

                            <button className="submitButton" type="submit">
                                Update Review
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditReviews