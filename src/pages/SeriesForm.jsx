import { useNavigate, useOutletContext } from 'react-router-dom';
import '../styles/seriesForm.css';
import { useForm } from 'react-hook-form';
import API from '../utils/api';
import { useEffect } from 'react';

const SeriesForm = () => {
    const { data, setData } = useOutletContext();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: "Stranger Things",
            poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
            backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
            vote_average: 8.6,
            vote_count: 16161,
            popularity: 185.5,
            first_air_date: "2016-07-15",
            original_language: "en",
            original_name: "Stranger Things",
            origin_country: "US, GB",
            genres: "Sci-Fi & Fantasy, Mystery, Drama",
            overview:
                "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl."
        }
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first!");
            navigate("/");
        }
    }, [navigate]);

    const onSubmitHandler = async (formData) => {
        try {
            const formattedData = {
                ...formData,
                origin_country: formData.origin_country
                    .split(",")
                    .map(e => e.trim()),
                genres: formData.genres
                    .split(",")
                    .map(e => e.trim())
            };

            const response = await API.post('/series', formattedData);

            if (response.data.status === "Success") {
                setData([...data, response.data.data]);

                alert("Series Added Successfully!");
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to add series");
        }
    };

    return (
        <div className="forms">
            <button onClick={() => navigate(-1)} className="back-btn">
                {"<"}---- Back
            </button>

            <h1 className="title">Add Series</h1>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <label>Name</label>
                <input {...register("name")} type="text" required />

                <label>Poster Path</label>
                <input {...register("poster_path")} type="text" required />

                <label>Backdrop Path</label>
                <input {...register("backdrop_path")} type="text" required />

                <label>Rating</label>
                <input {...register("vote_average")} type="number" step="0.1" required />

                <label>Vote Count</label>
                <input {...register("vote_count")} type="number" required />

                <label>Popularity</label>
                <input {...register("popularity")} type="number" step="0.1" required />

                <label>First Air Date</label>
                <input {...register("first_air_date")} type="date" required />

                <label>Original Language</label>
                <input {...register("original_language")} type="text" required />

                <label>Original Name</label>
                <input {...register("original_name")} type="text" required />

                <label>Origin Country</label>
                <input
                    {...register("origin_country")}
                    type="text"
                    placeholder="US, GB"
                    required
                />

                <label>Genres</label>
                <input
                    {...register("genres")}
                    type="text"
                    placeholder="Sci-Fi & Fantasy, Mystery"
                    required
                />

                <label>Overview</label>
                <textarea {...register("overview")} rows={4} required />

                <button className="submitButton" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SeriesForm;