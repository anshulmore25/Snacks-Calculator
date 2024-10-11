// ProgressBar.js
import React from 'react';
import './ProgressBar.css'; // Create a CSS file for styling

const ProgressBar = ({ progress }) => {
    return (
        <div className="progress-bar-container">
            <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
