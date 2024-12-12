import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const API_BASEURL = 'https://api.themoviedb.org/3';
const API_KEY = 'a04268d7932b9b6360e6b4d42fd27509';
const IMAGE_BASEURL = 'https://image.tmdb.org/t/p/w500';

const GenresPage = () => {
    const { genreId } = useParams();
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            try {
                const movieResponse = await axios.get(`${API_BASEURL}/discover/movie`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US',
                        with_genres: genreId,
                        page: 1
                    }
                });

                const genreResponse = await axios.get(`${API_BASEURL}/genre/movie/list`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US'
                    }
                });

                const genres = genreResponse.data.genres;
                const genre = genres.find(g => g.id.toString() === genreId);
                setGenreName(genre ? genre.name : 'Unknown Genre');

                setMovies(movieResponse.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
                setLoading(false);
            }
        };

        fetchMoviesByGenre();
    }, [genreId]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1>{genreName}</h1>
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

export default GenresPage;
