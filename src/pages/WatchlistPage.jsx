import { useState, useEffect } from 'react'
import SeriesCard from '../components/SeriesCard'
import '../styles/home.css'
import { useNavigate } from 'react-router-dom'
import API from '../utils/api'

const Watchlist = () => {
    const navigate = useNavigate()
    const [watchlist, setWatchlist] = useState([])
    const [loading, setLoading] = useState(true)

    const checkLogin = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("Please login first!")
            navigate("/")
            return false
        }
        return true
    }

    useEffect(() => {
        if (!checkLogin()) return
        fetchWatchlist()
        // eslint-disable-next-line
    }, [])

    const fetchWatchlist = async () => {
        try {
            setLoading(true)
            const res = await API.get('/watchlist')
            if (res.data.status === "Success") {
                setWatchlist(res.data.data)
            }
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            alert("Failed to load watchlist")
        } finally {
            setLoading(false)
        }
    }

    const removeFromWatchlist = async (seriesId) => {
        try {
            await API.delete(`/watchlist/${seriesId}`)
            setWatchlist(prev =>
                prev.filter(item => item._id !== seriesId)
            )
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            alert("Failed to remove from watchlist")
        }
    }

    const clearWatchlist = async () => {
        if (!window.confirm("Clear entire watchlist?")) return
        try {
            await API.delete('/watchlist')
            setWatchlist([])
        } catch {
            alert("Failed to clear watchlist")
        }
    }

    if (loading) return <div className="home">Loading...</div>

    return (
        <div className="home">
            <button onClick={() => navigate(-1)} className="back-btn">
                {"<"}---- Back
            </button>

            <div className="title-flex">
                <h1 className="section-title">My Watchlist</h1>
                {watchlist.length > 0 && (
                    <button onClick={clearWatchlist} className="clear-btn">
                        Clear All
                    </button>
                )}
            </div>

            {watchlist.length > 0 ? (
                <div className="series-grid">
                    {watchlist.map(series => (
                        <div key={series._id}>
                            <SeriesCard series={series} />
                            <button
                                className="btn danger-btn"
                                onClick={() => removeFromWatchlist(series._id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>Your Watchlist is Empty</h2>
                </div>
            )}
        </div>
    )
}

export default Watchlist