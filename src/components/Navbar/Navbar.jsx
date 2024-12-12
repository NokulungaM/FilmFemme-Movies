import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const API_BASEURL = 'https://api.themoviedb.org/3';
const API_KEY = 'a04268d7932b9b6360e6b4d42fd27509';

const Navbar = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`${API_BASEURL}/genre/movie/list`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US'
                    }
                });
                setGenres(response.data.genres);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching genres:', error);
                setError('Error fetching genres. Please try again later.');
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    const handleSearchInputChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
            const response = await axios.get(`${API_BASEURL}/search/movie`, {
                params: {
                    api_key: API_KEY,
                    language: 'en-US',
                    query: query
                }
            });
            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Error searching movies:', error);
            setSearchResults([]);
        }
    };

    const handleMovieSelect = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    if (loading) {
        return <div className="navbar-loading">Loading genres...</div>;
    }

    if (error) {
        return <div className="navbar-error">{error}</div>;
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src="/logo1.jpeg" alt="MovieApp Logo" className="navbar-logo-image" />
                </Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className="nav-links">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/actors" className="nav-links">
                            Actors
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/movies" className="nav-links">
                            Movies
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <span className="nav-links">
                            Genres
                        </span>
                        <ul className="dropdown-content">
                            {genres.map(genre => (
                                <li key={genre.id}>
                                    <Link to={`/genres/${genre.id}`} className="dropdown-link">
                                        {genre.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="nav-search-input"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        <ul className="dropdown-content">
                            {searchResults.map(movie => (
                                <li key={movie.id}>
                                    <button
                                        onClick={() => handleMovieSelect(movie.id)}
                                        className="dropdown-link"
                                    >
                                        {movie.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
