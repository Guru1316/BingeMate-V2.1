import { useNavigate } from "react-router-dom"

const SeriesCard = ({series}) => {
    const navigate = useNavigate();
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    
    return(
        <div className="series-card" onClick={() => navigate(`/series/${series._id}`)}>
            <div>
                <img src={`${imageBaseUrl}${series.poster_path}`} alt={series.name}/>
            </div>
            <h3>{series.name}</h3>
        </div>
    )
}

export default SeriesCard;