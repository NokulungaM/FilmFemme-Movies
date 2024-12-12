import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SingleMoviePage.css';

const API_BASEURL = 'https://api.themoviedb.org/3';
const API_KEY = 'a04268d7932b9b6360e6b4d42fd27509';
const IMAGE_BASEURL = 'https://image.tmdb.org/t/p/w500';
const YOUTUBE_BASEURL = 'https://www.youtube.com/embed/';

const SingleMoviePage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieResponse = await axios.get(`${API_BASEURL}/movie/${movieId}`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US'
                    }
                });

                const creditsResponse = await axios.get(`${API_BASEURL}/movie/${movieId}/credits`, {
                    params: {
                        api_key: API_KEY
                    }
                });

                const relatedMoviesResponse = await axios.get(`${API_BASEURL}/movie/${movieId}/similar`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US',
                        page: 1
                    }
                });

                const trailerResponse = await axios.get(`${API_BASEURL}/movie/${movieId}/videos`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US'
                    }
                });

                const director = creditsResponse.data.crew.find(member => member.job === 'Director');
                const mainActors = creditsResponse.data.cast.slice(0, 5);

                setMovie({
                    ...movieResponse.data,
                    director: director ? director.name : 'N/A',
                    mainActors: mainActors
                });

                setRelatedMovies(relatedMoviesResponse.data.results);

                const trailerVideo = trailerResponse.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                setTrailer(trailerVideo ? trailerVideo.key : null);
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError('Failed to fetch movie details. Please try again later.');
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div className="movie-container">
            <div className="movie-header">
                {movie.poster_path && (
                    <img
                        src={`${IMAGE_BASEURL}${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-poster"
                    />
                )}
                <div className="movie-info">
                    <h1>{movie.title}</h1>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                    <p><strong>Language:</strong> {movie.original_language}</p>
                    <p><strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)</p>
                    <p><strong>Director:</strong> {movie.director}</p>
                    <p><strong>Overview:</strong> {movie.overview}</p>
                    <h2>Main Actors</h2>
                    <ul>
                        {movie.mainActors.map(actor => (
                            <li key={actor.id}>{actor.name} as {actor.character}</li>
                        ))}
                    </ul>
                    <h2>Production Companies</h2>
                    <ul>
                        {movie.production_companies.map(company => (
                            <li key={company.id}>
                                {company.logo_path && (
                                    <img
                                        src={`${IMAGE_BASEURL}${company.logo_path}`}
                                        alt={company.name}
                                        className="company-logo"
                                    />
                                )}
                                {company.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {trailer && (
                <div className="movie-trailer">
                    <h2>Trailer</h2>
                    <iframe
                        width="560"
                        height="315"
                        src={`${YOUTUBE_BASEURL}${trailer}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            <div className="related-movies">
                <h2>Related Movies</h2>
                <div className="movies-grid">
                    {relatedMovies.map(relatedMovie => (
                        <div key={relatedMovie.id} className="movie">
                            <img
                                src={`${IMAGE_BASEURL}${relatedMovie.poster_path}`}
                                alt={relatedMovie.title}
                                className="movie-poster"
                            />
                            <div className="movie-details">
                                <h3>{relatedMovie.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SingleMoviePage;
