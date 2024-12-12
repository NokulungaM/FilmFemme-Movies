import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MoviesPage.css';

const API_BASEURL = 'https://api.themoviedb.org/3';
const API_KEY = 'a04268d7932b9b6360e6b4d42fd27509';
const IMAGE_BASEURL = 'https://image.tmdb.org/t/p/w500';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await axios.get(`${API_BASEURL}/movie/popular`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US',
                        page: 1
                    }
                });
                setMovies(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchPopularMovies();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Popular Movies</h1>
            {/* SearchMovie component has been removed */}
            <div className="movies-grid">
                {movies.map(movie => (
                    <div key={movie.id} className="movie">
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                src={`${IMAGE_BASEURL}${movie.poster_path}`}
                                alt={movie.title}
                                className="movie-poster"
                            />
                        </Link>
                        <div className="movie-details">
                            <h2>
                                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviesPage;
