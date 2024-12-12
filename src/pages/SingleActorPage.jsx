import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SingleActorPage.css'; 

const API_BASEURL = 'https://api.themoviedb.org/3';
const API_KEY = 'a04268d7932b9b6360e6b4d42fd27509';
const IMAGE_BASEURL = 'https://image.tmdb.org/t/p/w500';

const SingleActorPage = () => {
    const { actorId } = useParams();
    const [actor, setActor] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActorDetails = async () => {
            try {
                const actorResponse = await axios.get(`${API_BASEURL}/person/${actorId}`, {
                    params: {
                        api_key: API_KEY
                    }
                });
                
                const moviesResponse = await axios.get(`${API_BASEURL}/person/${actorId}/movie_credits`, {
                    params: {
                        api_key: API_KEY
                    }
                });

                setActor(actorResponse.data);
                setMovies(moviesResponse.data.cast);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching actor details:', error);
                setError('Failed to fetch actor details. Please try again later.');
                setLoading(false);
            }
        };

        fetchActorDetails();
    }, [actorId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!actor) {
        return <div>Actor not found</div>;
    }

    return (
        <div className="actor-container">
            <div className="actor-header">
                {actor.profile_path && (
                    <img
                        src={`${IMAGE_BASEURL}${actor.profile_path}`}
                        alt={actor.name}
                        className="actor-profile-img"
                    />
                )}
                <div className="actor-info">
                    <h1>{actor.name}</h1>
                    <p><strong>Gender:</strong> {actor.gender === 1 ? 'Female' : 'Male'}</p>
                    <p><strong>Popularity:</strong> {actor.popularity}</p>
                    <p><strong>Birthday:</strong> {actor.birthday}</p>
                    <p><strong>Biography:</strong> {actor.biography || 'No biography available.'}</p>
                </div>
            </div>
            {movies.length > 0 && (
                <div className="actor-movies">
                    <h2>Movies Participated in</h2>
                    <div className="movies-grid">
                        {movies.map(movie => (
                            <div key={movie.id} className="movie">
                                {movie.poster_path && (
                                    <img
                                        src={`${IMAGE_BASEURL}${movie.poster_path}`}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                )}
                                <h3>{movie.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleActorPage;

