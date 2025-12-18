import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/home.css'
import '../styles/series.css'
import API from '../utils/api'

const Diary = () => {
    const navigate = useNavigate()
    const [diary, setDiary] = useState([])
    const [loading, setLoading] = useState(true)

    const imageBaseUrl = "https://image.tmdb.org/t/p/w500"

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("Please login first!")
            navigate("/")
            return
        }
        fetchDiary()
        // eslint-disable-next-line
    }, [])

    const fetchDiary = async () => {
        try {
            setLoading(true)
            const res = await API.get('/diary')
            if (res.data.status === "Success") {
                setDiary(res.data.data)
            }
        } catch {
            alert("Failed to load diary")
        } finally {
            setLoading(false)
        }
    }

    const deleteEntry = async (id) => {
        if (!window.confirm("Delete this diary entry?")) return
        try {
            await API.delete(`/diary/${id}`)
            setDiary(prev => prev.filter(e => e._id !== id))
        } catch {
            alert("Failed to delete entry")
        }
    }

    const clearDiary = async () => {
        if (!window.confirm("Clear entire diary?")) return
        try {
            await API.delete('/diary')
            setDiary([])
        } catch {
            alert("Failed to clear diary")
        }
    }

    if (loading) return <div className="home">Loading...</div>

    return (
        <div className="home">
            <button onClick={() => navigate(-1)} className="back-btn">
                {"<"}---- Back
            </button>

            <div className="title-flex">
                <h1 className="section-title">My Diary</h1>
                {diary.length > 0 && (
                    <button onClick={clearDiary} className="clear-btn">
                        Clear All
                    </button>
                )}
            </div>

            {diary.length > 0 ? (
                <div className="series1">
                    {diary.map(entry => (
                        <div className="ds" key={entry._id}>
                            <div className="di">
                                <img
                                    src={`${imageBaseUrl}${entry.series.poster_path}`}
                                    alt={entry.series.name}
                                    className="dim"
                                    onClick={() =>
                                        navigate(`/series/${entry.series._id}`)
                                    }
                                />
                            </div>

                            <div className="dc">
                                <h2 className="dhh">{entry.series.name}</h2>

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
                                    <strong>Review:</strong><br />
                                    {entry.review}
                                </p>

                                <div className="action-buttons">
                                    <button
                                        className="btn edit-btn"
                                        onClick={() =>
                                            navigate(`/reviews/edit/${entry._id}`)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn danger-btn"
                                        onClick={() => deleteEntry(entry._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="home empty">
                    <h1>Your Diary is Empty</h1>
                </div>
            )}
        </div>
    )
}

export default Diary