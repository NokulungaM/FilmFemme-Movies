import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css';

const API_BASEURL = 'https://api.themoviedb.org/3';
const API_KEY = 'a04268d7932b9b6360e6b4d42fd27509';
const IMAGE_BASEURL = 'https://image.tmdb.org/t/p/w500';

const categories = [
    { title: 'Top Rated', endpoint: 'top_rated' },
    { title: 'Popular', endpoint: 'popular' },
    { title: 'Now Playing', endpoint: 'now_playing' },
    { title: 'Upcoming', endpoint: 'upcoming' },
];

const HomePage = () => {
    const [movies, setMovies] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movieData = {};
                for (const category of categories) {
                    const response = await axios.get(
                        `${API_BASEURL}/movie/${category.endpoint}?api_key=${API_KEY}&language=en-US&page=1`
                    );
                    movieData[category.title] = response.data.results;
                }
                setMovies(movieData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const openTrailerModal = () => {
        window.open('https://youtu.be/r8pJt4dK_s4?si=KEG8DW9Fdc1PER-j', '_blank');
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-page">
            {/* Banner Image Section */}
            <div className="banner">
                <img src="/Banner1.png" alt="Banner Image" className="banner-image" />
                <div className="banner-content">
                    <button className="watch-trailer-button" onClick={openTrailerModal}>
                        Watch Trailer
                    </button>
                </div>
            </div>

            {/* Movie Sliders */}
            <div className="container">
                {categories.map((category) => (
                    <div key={category.title}>
                        <h2>{category.title}</h2>
                        <Slider {...settings}>
                            {movies[category.title] &&
                                movies[category.title].map((movie) => (
                                    <div key={movie.id} className="movie">
                                        <Link to={`/movie/${movie.id}`}>
                                            <img
                                                src={`${IMAGE_BASEURL}${movie.poster_path}`}
                                                alt={movie.title}
                                                className="movie-poster"
                                            />
                                        </Link>
                                    </div>
                                ))}
                        </Slider>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;


