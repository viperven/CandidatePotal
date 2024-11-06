import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../assets/css/developer.css';
import { AuthService } from '../Services/AuthService';

const CookiesPolicyAcceptContainer = () => {
    const navigate = useNavigate();
    const handleCookieClick = () => {
        AuthService.isCookiePolicyAcceptedForCurrentBrowser(true);
        document.getElementById("TW_box").style.display = "none";
    };
    const learnmoreClick = () => {
        navigate({
            pathname: "/privacycommitment"
        })
        document.getElementById("TW_box").style.display = "none";
    };
    const getCookiePolicyStyle = () => {
        if (AuthService.isCookiePolicyAcceptedForCurrentBrowser(false) === true) {
            return "none";
        } else {
            return "block";
        }
    }
    return (
        <div className='cookiesContainer' id='TW_box' style={{ "display": getCookiePolicyStyle() }}>
                <div className='cookiesText'>
                    <span>This website uses cookies to offer you a better Browsing Experience. By using our website, You agree to the use of Cookies</span>&nbsp;&nbsp;
                    <a className='C-button outl' style={{ cursor: "pointer" }} onClick={() => learnmoreClick()} >Learn More</a>&nbsp;&nbsp;&nbsp;
                    <button className='cookiesBtn' onClick={() => handleCookieClick()} >Accept Cookies!</button>
                </div>
        </div>
    );
};

export default CookiesPolicyAcceptContainer;
