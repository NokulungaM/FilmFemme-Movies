import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASEURL = 'https://api.themoviedb.org/3';
const API_KEY = 'a04268d7932b9b6360e6b4d42fd27509'; 
const IMAGE_BASEURL = 'https://image.tmdb.org/t/p/w500';

const SearchMovie = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchMovies = async () => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`${API_BASEURL}/search/movie`, {
                params: {
                    api_key: API_KEY,
                    language: 'en-US',
                    query: searchQuery
                }
            });

            console.log('Fetched movies:', response.data.results); 
            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Error searching movies:', error);
            setError('Failed to fetch movies. Please try again later.');
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMovies();
    };

    return (
        <div className="search-movie">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="search-results">
                {searchResults.map(movie => (
                    <div key={movie.id} className="movie">
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                src={`${IMAGE_BASEURL}${movie.poster_path}`}
                                alt={movie.title}
                                className="movie-poster"
                            />
                        </Link>
                        <div className="movie-details">
                            <h3>{movie.title}</h3>
                            <p>{movie.release_date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchMovie;
