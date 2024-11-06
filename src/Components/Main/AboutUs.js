import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import about from "../../assets/imgs/About-Us-_1_-1.avif";
import Carousel from "react-grid-carousel";
import one from "../../assets/imgs/app/01.svg";
import two from "../../assets/imgs/app/02.svg";
import three from "../../assets/imgs/app/03.svg";
import fore from "../../assets/imgs/app/04.svg";
import five from "../../assets/imgs/app/05.svg";
import six from "../../assets/imgs/app/06.svg";
import seven from "../../assets/imgs/app/07.svg";
import eight from "../../assets/imgs/app/08.svg";
import nine from "../../assets/imgs/app/09.svg";
import ten from "../../assets/imgs/app/10.svg";
import eleven from "../../assets/imgs/app/11.svg";
import twelve from "../../assets/imgs/app/12.svg";
import thirteen from "../../assets/imgs/app/13.svg";
import fourteen from "../../assets/imgs/app/14.svg";
import fifteen from "../../assets/imgs/app/15.svg";
import sixteen from "../../assets/imgs/app/16.svg";
import { Modal } from "react-bootstrap";
import HelmetForWeb from "../HelemtForWeb";
import leftArrowImage from "../../assets/imgs/left-arrow1.png";
import rightArrowImage from "../../assets/imgs/right-arrow1.png";
import { useTranslation } from "react-i18next";

function AboutUs() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = [
    one,
    two,
    three,
    fore,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifteen,
    sixteen,
  ];
  const handleShow = (index) => {
    setSelectedImageIndex(index);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedImageIndex(0);
  };

  const handlePrevClick = (index) => {
    if (index > 0) {
      setSelectedImageIndex(index - 1);
    } else {
      setSelectedImageIndex(index + (images.length - 1));
    }
  };

  const handleNextClick = (index) => {
    if (index < images.length - 1) {
      setSelectedImageIndex(index + 1);
    } else {
      setSelectedImageIndex(index - (images.length - 1));
    }
  };

  const arrowLeft = () => {
    return (
      <div
        style={{
          position: "absolute",
          left: "-50%",
          zIndex: "999",
          bottom: "50%",
        }}
      >
        <button
          style={{
            background: "rgba(0, 0, 0, 0)", // Transparent background
            border: "none", // No border
            borderRadius: "30px",
            cursor: "pointer",
          }}
          onClick={() => handlePrevClick(selectedImageIndex)}
        >
          <img
            src={leftArrowImage}
            alt="Right Arrow"
            style={{ width: "40px", height: "40px", opacity: "0.90" }}
          />
        </button>
      </div>
    );
  };

  const arrowRight = () => {
    return (
      <div
        style={{
          position: "absolute",
          right: "-50%",
          zIndex: "999",
          bottom: "50%",
        }}
      >
        <button
          style={{
            background: "rgba(0, 0, 0, 0)", // Transparent background
            border: "none", // No border
            borderRadius: "30px",
            cursor: "pointer",
          }}
          onClick={() => handleNextClick(selectedImageIndex)}
        >
          <img
            src={rightArrowImage}
            alt="Right Arrow"
            style={{ width: "40px", height: "40px", opacity: "0.90" }}
          />
        </button>
      </div>
    );
  };

  return (
    <>
      <HelmetForWeb></HelmetForWeb>

      {/* //----------------------- start view screenshot modal------------------------------- */}
      <Modal show={show} onHide={handleClose} size="Default">
        <Modal.Header closeButton>
          <Modal.Title>View Screenshot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel
            cols={1}
            rows={1}
            gap={10}
            loop
            autoplay={3000}
            arrowLeft={arrowLeft}
            arrowRight={arrowRight}
          >
            {images.map((imageUrl, index) =>
              index == selectedImageIndex ? (
                <Carousel.Item key={index}>
                  <div className="card">
                    <img
                      src={imageUrl}
                      alt={`app-${index + 1}`}
                      className="img-fluid"
                    />
                  </div>
                </Carousel.Item>
              ) : null
            )}
          </Carousel>
        </Modal.Body>
      </Modal>
      {/* // ------------------------end view screenshot modal --------------------------- */}

      <Layout>
        {/* <!-- Hero Header Section Start --> */}
        {/* <section className="sub-hero-headerr">
          <div className="container">
            <div className="text-content"></div>
          </div>
        </section> */}

        <section className="bg-white section-about">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-lg-0 mb-3">
                <div className="section-header">
                  <h1
                    className="h1qr"
                    style={{
                      fontSize: "clamp(4rem, 2vw, 4rem)",
                      fontFamily: "sans-serif",
                      fontWeight: "700",
                    }}
                  >
                    {t("About")}{" "}
                    <span
                      style={{
                        color: "#FE5C35",
                        fontSize: "clamp(4rem, 2vw, 4rem)",
                        fontFamily: "sans-serif",
                        fontWeight: "700",
                      }}
                    >
                      {t("Us")}
                    </span>
                  </h1>
                  {/* <h6 className="section-subtitle">{t("About HUNTSJOB")}</h6>
                  <h2 className="section-title">{t("Our Journey")}</h2> */}
                </div>
                <div className="parent-paragraph">
                  <p>{t("AboutHeading1")}</p>
                  <p>{t("AboutHeading2")}</p>
                  <p>{t("AboutHeading3")}</p>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <div className="image-containerr">
                  <img src={about} className="img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- About End --> */}

        {/* <!-- Statistic Start --> */}

        {/* <!-- Statistic End --> */}

        {/* <!--App Screenshot --> */}

        {/* <!--App Screenshot end --> */}

        <section className="section-companies">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title">{t("App Screenshot")}</h2>
            </div>
            <Carousel cols={9} rows={1} gap={10} loop autoplay={5000}>
              {images.map((imageUrl, index) => (
                <Carousel.Item key={index}>
                  <div
                    className="card-slide card"
                    onClick={() => handleShow(index)}
                  >
                    <div className="card-body client-card">
                      <div className="logo">
                        <img
                          src={imageUrl}
                          alt={`app-${index + 1}`}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default AboutUs;
