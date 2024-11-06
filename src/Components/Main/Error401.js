import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import errimage from '../../assets/imgs/errimage.png'
import '../../assets/css/Errorpage.css'

function Error401() {
    useEffect(() => {
        var getStyle = document.getElementsByTagName("body")[0];
        getStyle.style.paddingBottom = "0";
        getStyle.style.margin = "0";
        getStyle.style.padding = "0";
        getStyle.style.fontFamily = "'Tomorrow', sans-serif";
        getStyle.style.height = "100vh";
        getStyle.style.backgroundImage = "linear-gradient(to top, #2e1753, #1f1746, #131537, #0d1028, #050819)";
        getStyle.style.display = "flex";
        getStyle.style.justifyContent = "center";
        getStyle.style.alignItems = "center";
        getStyle.style.overflow = "hidden";
        var body = document.body;
        var createStarInterval;
        function createStar() {
            var right = Math.random() * 500;
            var top = Math.random() * window.innerHeight;
            var star = document.createElement('div');
            star.classList.add('star');
            body.appendChild(star);

            function runStar() {
                if (right >= window.innerWidth) {
                    star.remove();
                }
                right += 3;
                star.style.right = right + 'px';
            }
            createStarInterval = setInterval(runStar, 10);
            star.style.top = top + 'px';
        }
        // Start creating stars immediately
        createStar();
        // Create stars every 100 milliseconds
        setInterval(createStar, 100);

        // Clean up the interval when the component unmounts
        return () => clearInterval(createStarInterval);
    }, []);

    return (
        <div className="page-wrap d-flex flex-row align-items-center errbody">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <span className="display-1 d-block">401</span>
                        <div className="mb-4 lead">You dont have access to view this page</div>
                        <a href="/" className="btn btn-link">Back to Home</a>
                    </div>
                    <div class="astronaut">
                        <img src={errimage} alt="" class="src" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Error401;