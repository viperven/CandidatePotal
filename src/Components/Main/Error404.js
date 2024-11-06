import React, { useEffect, useState } from "react";
import errimage from "../../assets/imgs/errimage.png";
import "../../assets/css/Errorpage.css";
import { Link } from "react-router-dom";

function Error404() {
  useEffect(() => {
    var getStyle = document.getElementsByTagName("body")[0];
    getStyle.style.paddingBottom = "0";
    getStyle.style.margin = "0";
    getStyle.style.padding = "0";
    getStyle.style.fontFamily = "'Tomorrow', sans-serif";
    getStyle.style.height = "100vh";
    getStyle.style.backgroundImage =
      "linear-gradient(to top, #2e1753, #1f1746, #131537, #0d1028, #050819)";
    getStyle.style.display = "flex";
    getStyle.style.justifyContent = "center";
    getStyle.style.alignItems = "center";
    getStyle.style.overflow = "hidden";
    var body = document.body;
    var createStarInterval;
    const stars = [];
    function createStar() {
      var right = Math.random() * 500;
      var top = Math.random() * window.innerHeight;
      var star = document.createElement("div");
      star.classList.add("star");
      body.appendChild(star);
      stars.push(star);

      function runStar() {
        //     if (right >= window.innerWidth) {
        //       star.remove();
        //     }
        //     right += 3;
        //     star.style.right = right + "px";
        //   }
        //   createStarInterval = setInterval(runStar, 10);
        //   star.style.top = top + "px";
        // }

        if (parseFloat(star.style.right) >= window.innerWidth) {
          star.remove();
          clearInterval(createStarInterval);
        } else {
          star.style.right = parseFloat(star.style.right) + 3 + "px";
        }
      }

      createStarInterval = setInterval(runStar, 10);
      star.style.top = top + "px";
    }

    // Start creating stars immediately
    createStar();
    // Create stars every 100 milliseconds
    // setInterval(createStar, 100);
    const starCreationInterval = setInterval(createStar, 100);
    // Clean up the interval when the component unmounts
    //     return () => clearInterval(createStarInterval);
    //   }, []);
    return () => {
      clearInterval(starCreationInterval);
      clearInterval(createStarInterval);
      stars.forEach((star) => star.remove());
      body.style.paddingBottom = "";
      body.style.margin = "";
      body.style.padding = "";
      body.style.fontFamily = "";
      body.style.height = "";
      body.style.backgroundImage = "";
      body.style.display = "";
      body.style.justifyContent = "";
      body.style.alignItems = "";
      body.style.overflow = "";
    };
  }, []);

  return (
    <div className="page-wrap d-flex flex-row align-items-center errbody ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">
              The page you are looking for was not found.
            </div>
            <a href="/" className="btn btn-link">
              Back to Home
            </a>
          </div>
          <div class="astronaut">
            <img src={errimage} alt="" class="src" />
          </div>
        </div>
        {/* <div className='errbody'>
                    <div class="errtext">
                        <div>ERROR</div>
                        <h1 className='errhead'>404</h1>
                        <hr />
                        <div>Page Not Found</div>
                    </div>
                   
                </div> */}
      </div>
    </div>
  );
}
export default Error404;
