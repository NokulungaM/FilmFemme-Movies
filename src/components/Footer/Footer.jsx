import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>© 2024 FilmFemme. Created by <span className="author">Nokulunga Msabala</span></p>
            <div className="social-icons">
                <h5>Nokulunga Msabala</h5>
                <a
                    href="https://github.com/NokulungaM"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                >
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a
                    href="https://www.linkedin.com/in/nokulunga-msabala-74756915b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                >
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                
            
                </a>
            </div>
        </footer>
    );
};

export default Footer;

