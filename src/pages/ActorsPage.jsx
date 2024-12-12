import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ActorsPage.css'; 

const API_BASEURL = 'https://api.themoviedb.org/3';
const API_KEY = 'a04268d7932b9b6360e6b4d42fd27509';
const IMAGE_BASEURL = 'https://image.tmdb.org/t/p/w500';

const ActorsPage = () => {
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularActors = async () => {
            try {
                const response = await axios.get(`${API_BASEURL}/person/popular`, {
                    params: {
                        api_key: API_KEY,
                        page: 1
                    }
                });
                setActors(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching actors:', error);
                setLoading(false);
            }
        };

        fetchPopularActors();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Actors</h1>
            <div className="actors-grid">
                {actors.map(actor => (
                    <div key={actor.id} className="actor">
                        <div className="actor-img">
                            {actor.profile_path && (
                                <img
                                    src={`${IMAGE_BASEURL}${actor.profile_path}`}
                                    alt={actor.name}
                                />
                            )}
                        </div>
                        <div className="actor-details">
                            <h2>
                                <Link to={`/actor/${actor.id}`}>{actor.name}</Link>
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActorsPage;
