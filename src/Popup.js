import React from "react";
import "./Popup.css";
export const Popup = ({ text, closePopup }) => {
    return (
        <div className="popup-container">
            <div className="popup-body">
                <h1>Hey!</h1>
                <h3>{text}</h3>
                <button onClick={closePopup}>Change Availabilities</button>
            </div>
        </div>
    );
};