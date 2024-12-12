import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ActorsPage from './pages/ActorsPage';
import HomePage from './pages/HomePage';
import Footer from './components/Footer/Footer';
import SingleActorPage from './pages/SingleActorPage';
import SingleMoviePage from './pages/SingleMoviePage';
import MoviesPage from './pages/MoviesPage';
import GenresPage from './pages/GenresPage';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/actors" element={<ActorsPage />} />
                <Route path="/actor/:actorId" element={<SingleActorPage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/movie/:movieId" element={<SingleMoviePage />} />
                <Route path="/genres/:genreId" element={<GenresPage />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
