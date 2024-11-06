import React, { useEffect, useState, useRef } from "react";
import "../assets/css/styles.css";
import logoimg2 from "../assets/imgs/HuntsJobLogo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "bootstrap";
import { AuthService } from "../Services/AuthService";
import { ProfileService } from "../Services/Profile/ProfileService";
import { Modal, ModalBody } from "react-bootstrap";
import LoginModal from "../Components/LogIn/LoginModal";
import user from "../assets/imgs/user.png";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import classNames from "classnames";
import languages from "../assets/languageDropDown.json";
import "../assets/css/developer.css";
// import LoginRegisterToastTemplate from "../Components/Main/LoginRegisterToastTemplate/LoginRegisterToastTemplate";
import Language from "../../src/landingstatic/img/language (4).png"

function Header2() {
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  // const [isAboutOpen, setIsAboutOpen] = useState(false);
  // const dropdownRef = useRef(null);
  // const dropdownRef1 = useRef(null);
  // const [countryDetails, setiCountryDetails] = useState("");
  const handlelogout = () => {
    AuthService.logout();
    window.location.href = "/";
  };
  const handleDashbordClick = () => {
    if (AuthService.isAuthenticatedUser()) {
      navigate({
        pathname: "/profiledashboard",
      });
      initProfileData();
    } else {
      handleShow();
    }
  };
  const handleBlogsClick = () => { };
  const CloseModal = (res) => {
    if (res === 1) {
      initProfileData();
      handleClose();
      navigate("/");
    } else {
      handleClose();
    }
  };
  const initProfileData = async () => {
    // const res = await ProfileService.getProfileByID();
    // const profile = JSON.parse(res.apiData);
    // setuserName(profile.Table[0].CandidateFirstName);
    // const documents = profile.Table5;
    // if (documents && documents.length > 0) {
    //     for (let i = 0; i < documents.length; i++) {
    //         if (documents[i].DocType === 12) {
    //             var image = document.getElementById("headerpic");
    //             image.src = atob(documents[i].Base64File);
    //         }
    //     }
    // }
  };
  const handleLoginModal = () => {
    if (AuthService.isAuthenticatedUser()) {
    } else {
      handleShow();
    }
  };
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: true,
      },
      "google_translate_element"
    );
  };
  // const convert_ip_to_int = (ip) => {
  //     let int_IP = 0;
  //     try {
  //         int_IP = ip.split(".").reduce((int, v) => int * 256 + +v);
  //     } catch (error) {
  //         int_IP = 0;
  //     }
  //     return int_IP;
  // }
  // const init_userIpAddress = async () => {
  //     try {
  //         const res = await HomePageService.initIP();
  //         if (res.isSuccess) {
  //             const IP = res.data;
  //             if (IP !== "" && IP !== undefined && IP !== null) {
  //                 const convertedIP = convert_ip_to_int(IP);
  //                 const res1 = await HomePageService.getCountryDetails(IP, convertedIP);
  //                 if (res1.isSuccess) {
  //                     const countryDetails = JSON.parse(res1.data);
  //                     countryDetails ? setiCountryDetails(countryDetails[0]) : setiCountryDetails([]);
  //                 }
  //             }
  //         }
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t, i18n } = useTranslation();
  const releaseDate = new Date("2021-03-07");
  const timeDifference = new Date() - releaseDate;
  const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  useEffect(() => {
    //init_userIpAddress();
    document.body.dir = "ltr";
    const params = new URLSearchParams(window.location.search);
    if (AuthService.isAuthenticatedUser()) {
      initProfileData();
    } else {
      let qs = params.get("qs");
      if (qs === "login") {
        handleShow();
      }
      if (qs) {
        handleShow();
      }
    }
    try {
      var addScript = document.createElement("script");
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
    } catch (error) { }
  }, [currentLanguage, t]);

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  //   setIsAboutOpen(false);
  // };
  // const toggleDropdownAbout = () => {
  //   setIsAboutOpen(!isAboutOpen);
  //   setIsOpen(false);
  // };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //     if (
  //       dropdownRef1.current &&        !dropdownRef1.current.contains(event.target)
  //     ) {
  //       setIsAboutOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
    let openDropdown = null;

    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", function (event) {
        const dropdownMenu = this.nextElementSibling;

        // Close previously opened dropdown if it's not the currently clicked one
        if (openDropdown && openDropdown !== dropdownMenu) {
          openDropdown.classList.remove("show");
        }

        // Toggle current dropdown menu
        dropdownMenu.classList.toggle("show");

        // Update the currently opened dropdown
        openDropdown = dropdownMenu.classList.contains("show")
          ? dropdownMenu
          : null;

        // Prevent event from bubbling up to document
        event.stopPropagation();
      });
    });

    document.addEventListener("click", function () {
      if (openDropdown) {
        openDropdown.classList.remove("show");
        openDropdown = null;
      }
    });
  });
  const handleJobSearchOnClick = (words) => {
    if (words) {
      let obj = "";
      const isQuickSearch = "qs_asr&qID=Qs";
      obj += isQuickSearch;
      obj += `&Keywords=${words}`;
      obj += `&keyAny=0`;

      navigate({
        pathname: "/advancesearchresult",
        search: `ref=${obj}`,
      });
    }
  };
  const handleLanguageClick = (code, name, country_code, sl_no) => {
    i18next.changeLanguage(code);
  };

  const isTamil = i18n.language === "ta";
  const isMalayalam = i18n.language === "ml";
  const isSihlan = i18n.language === "si";


  return (
    <>
      <header>
        {AuthService.isAuthenticatedUser() ? (
          <nav className="navbar navbar-expand-lg">
            <div className="container">
              <Link className="navbar-brand" to="/">
                <img style={{ width: "160px" }} src={logoimg2} alt="Huntsjob" />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
                style={{
                  paddingLeft:
                    isTamil || isMalayalam || isSihlan ? "2rem" : undefined,
                  fontSize:
                    isTamil || isMalayalam || isSihlan ? "70%" : undefined,
                }}

              >
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/"
                      title={t("Huntsjob Jobs")}
                    >
                      {t("Home")}{" "}
                    </NavLink>
                  </li>
                  {/* <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/jobs"
                      title={t("Home")}
                    >
                      {t("Jobs")}{" "}
                    </NavLink>
                  </li> */}

                  <li
                    className="nav-item"
                    title={t("Search")}
                  // style={{ fontSize: "large" }}
                  >
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/quicksearch"
                      title={t("Job Search")}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <i
                        className="bx bx-search-alt"
                        style={{ textAlign: "center", marginRight: "8px" }}
                      ></i>{" "}
                      {t("Search")}
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/profiledashboard"
                      aria-current="page"
                      onClick={() => handleDashbordClick()}
                      title="Huntsjob Job Updates"
                    >
                      HuntsJob
                    </NavLink>
                  </li>



                  <li className="nav-item dropdown profile">
                    <a
                      className="nav-link dropdown-toggle "
                      href="#"
                      id="jobDropdown"
                      role="button"
                      title={t("Job Search")}
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span>{t("Jobs")}</span>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      data-bs-popper="static"
                      style={{ width: "300px", left: "-95%" }}
                      aria-labelledby="jobDropdown"
                    >
                      <div className="row">
                        <div className="col-6">
                          <Link
                            className="dropdown-item"
                            aria-current="page"
                            to="/idxjobs#idxTargetTodaysJOb"
                            title={t("Recent Jobs")}
                          >
                            {t("Todays Jobs")}{" "}
                          </Link>
                          <Link
                            className="dropdown-item"
                            aria-current="page"
                            to="/idxjobs#idxTargetMonthlyJOb"
                            title={t("Gulf Jobs")}
                          >
                            {t("Previous Jobs")}{" "}
                          </Link>
                          <Link
                            className="dropdown-item"
                            aria-current="page"
                            to="/idxjobs#idxTargetHotJOb"
                            title={t("Work Abroad Jobs")}
                          >
                            {t("Trending Jobs")}{" "}
                          </Link>
                        </div>
                        <div
                          className="col-6"
                          style={{ borderLeft: "1px solid grey" }}
                        >
                          <a
                            href=""
                            className="dropdown-item"
                            aria-current="page"
                            onClick={() => handleJobSearchOnClick("Plumber")}
                            title={t("Plumber Jobs")}
                          >
                            {t("Plumber Jobs")}{" "}
                          </a>
                          <a
                            href=""
                            className="dropdown-item"
                            aria-current="page"
                            onClick={() => handleJobSearchOnClick("Welder")}
                            title={t("Welder Jobs")}
                          >
                            {t("Welder Jobs")}{" "}
                          </a>
                          <a
                            href=""
                            className="dropdown-item"
                            aria-current="page"
                            onClick={() => handleJobSearchOnClick("Engineer")}
                            title={t("Engineer Jobs")}
                          >
                            {t("Engineer Jobs")}{" "}
                          </a>
                        </div>
                      </div>
                    </ul>
                  </li>
                  {/* <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/quicksearch"
                      title={t("Search")}
                    >
                      {t("Search")}
                    </NavLink>
                  </li> */}


                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="aboutDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      // onClick={toggleDropdownAbout}
                      title={t("Huntsjob")}
                    >
                      {t("About")}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="aboutDropdown"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item"
                          aria-current="page"
                          to="/aboutus"
                          title={t("About Huntsjob")}
                        >
                          {t("About_Us")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          aria-current="page"
                          to="/contactus"
                          title={t("Contact Huntsjob")}
                        >
                          {t("Contact_Us")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/blog"
                          title={t("Job Opening Blog")}
                        >
                          {t("Blog")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/successstory"
                          title={t("Huntsjob Success Story")}
                        >
                          {t("Success Story")}
                        </NavLink>
                      </li>
                    </ul>
                  </li>


                  <li className="nav-item dropdown profile" >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      id="profileDropdown"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      title="Candidate Profile"

                    >
                      {AuthService.get_userImage_Or_pic(2) ? (
                        <img
                          src={AuthService.get_userImage_Or_pic(2)}
                          alt=""
                          id="headerpic"
                          style={{ borderRadius: "1rem" }}
                        />
                      ) : (
                        <img src={user} alt="" id="headerpic" style={{ borderRadius: "1rem" }} />
                      )}
                      <span>{"Profile"}</span>

                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      data-bs-popper="static"
                      aria-labelledby="profileDropdown"
                    >
                      <Link
                        className="dropdown-item"
                        to="/myprofile"
                        title={t("Candidate Profile")}
                      >
                        <i className="bx bxs-user icon"></i>
                        {t("Profile")}
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="/changepassword"
                        title={t("Change_Password")}
                      >
                        <i className="bx bx-lock icon"></i>
                        {t("Change_Password")}
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="/accountsettings"
                        title={t("Notification_Permissions")}
                      >
                        <i className="bx bx-bell"></i>
                        {t("Notification_Permissions")}
                      </Link>
                      <Link
                        className="dropdown-item"
                        onClick={handlelogout}
                        title={t("Logout")}
                      >
                        <i className="bx bxs-log-in-circle icon"></i>
                        {t("Logout")}
                      </Link>
                    </ul>
                  </li>

                  {/* <li
                    className="nav-item"
                    title={t("Search")}
                    style={{ fontSize: "large" }}
                  >
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/quicksearch"
                    >
                      <i
                        className="bx bx-search-alt"
                        style={{
                          border: "0.5px black solid",
                          borderRadius: "49%",
                          padding: "6px",
                          fontweight: "700",
                        }}
                      ></i>
                    </NavLink>
                  </li> */}




                  <li className="nav-item dropdown profile ">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      id="languageDropdown"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    // onClick={toggleDropdown}
                    >
                      {/* <i
                        className="bx bx-globe-alt"
                        style={{ fontSize: "1rem" }}
                      ></i> */}
                      <img src={Language} alt="language" style={{ width: "24.941px", height: "20.941px" }} />
                      <span>{t("language_name")}</span>
                    </a>
                    <ul
                      className="dropdown-menu scrollable-menu"
                      aria-labelledby="languageDropdown"
                      role="menu"
                      data-bs-popper="static"
                    >
                      <li>

                        <span className="dropdown-item">{t("language")}</span>
                      </li>

                      {languages.map(({ code, name, country_code, sl_no }) => (

                        <li key={sl_no}>
                          <a
                            style={{ cursor: "pointer" }}
                            className={classNames("dropdown-item", {
                              disabled: currentLanguageCode === code,
                            })}
                            onClick={() => {
                              i18next.changeLanguage(code);
                            }}
                          >
                            <span
                              className={`flag-icon flag-icon-${country_code} mx-2`}
                              style={{
                                opacity: currentLanguageCode === code ? 0.5 : 1,
                              }}
                            ></span>
                            {name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : (
          <nav className="navbar navbar-expand-lg">
            <div
              className="container"
              style={
                {
                  // display: "flex",
                  // justifyContent: "space-between",
                  // alignItems: "center",
                  // maxWidth: "100%",
                }
              }
            >
              {/* <div className="navbar-logo"> */}
              <NavLink className="navbar-brand" to="/">
                <img src={logoimg2} style={{ width: "160px" }} alt="" />
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              {/* </div> */}
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
                style={{
                  paddingLeft:
                    isTamil || isMalayalam || isSihlan ? "2rem" : undefined,
                  fontSize:
                    isTamil || isMalayalam || isSihlan ? "70%" : undefined,
                }}
              >
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item" title={t("Home")}>
                    <NavLink className="nav-link" aria-current="page" to="/">
                      {t("Home")}
                    </NavLink>
                  </li>

                  {/* <li className="nav-item" title={"Jobs"}>
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/jobs"
                    >
                      {t("Jobs")}
                    </NavLink>
                  </li> */}
                  <li
                    className="nav-item"
                    title={t("Search")}
                  // style={{ fontSize: "large" }}
                  >
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/quicksearch"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <i
                        className="bx bx-search-alt"
                        style={{ textAlign: "center", marginRight: "8px" }}
                      ></i>{" "}
                      {t("Search")}
                    </NavLink>
                  </li>

                  <li className="nav-item dropdown profile">
                    <a
                      className="nav-link dropdown-toggle "
                      href="#"
                      id="jobDropdown"
                      role="button"
                      title={t("Jobs")}
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span>{t("Jobs")}</span>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      data-bs-popper="static"
                      style={{ width: "300px", left: "-95%" }}
                      aria-labelledby="jobDropdown"
                    >
                      <div className="row">
                        <div className="col-6">
                          <Link
                            className="dropdown-item"
                            aria-current="page"
                            to="/idxjobs#idxTargetTodaysJOb"
                            title={t("Todays Jobs")}
                          >
                            {t("Todays Jobs")}{" "}
                          </Link>
                          <Link
                            className="dropdown-item"
                            aria-current="page"
                            to="/idxjobs#idxTargetMonthlyJOb"
                            title={t("Previous Jobs")}
                          >
                            {t("Previous Jobs")}{" "}
                          </Link>
                          <Link
                            className="dropdown-item"
                            aria-current="page"
                            to="/idxjobs#idxTargetHotJOb"
                            title={t("Trending Jobs")}
                          >
                            {t("Trending Jobs")}{" "}
                          </Link>
                        </div>
                        <div
                          className="col-6"
                          style={{ borderLeft: "1px solid grey" }}
                        >
                          <a
                            href=""
                            className="dropdown-item"
                            aria-current="page"
                            onClick={() => handleJobSearchOnClick("Plumber")}
                            title={t("Plumber Jobs")}
                          >
                            {t("Plumber Jobs")}{" "}
                          </a>
                          <a
                            href=""
                            className="dropdown-item"
                            aria-current="page"
                            onClick={() => handleJobSearchOnClick("Welder")}
                            title={t("Welder Jobs")}
                          >
                            {t("Welder Jobs")}{" "}
                          </a>
                          <a
                            href=""
                            className="dropdown-item"
                            aria-current="page"
                            onClick={() => handleJobSearchOnClick("Engineer")}
                            title={t("Engineer Jobs")}
                          >
                            {t("Engineer Jobs")}{" "}
                          </a>
                        </div>
                      </div>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="aboutDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    // onClick={toggleDropdownAbout}
                    >
                      {t("About")}
                    </a>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="aboutDropdown"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item"
                          aria-current="page"
                          to="/aboutus"
                          title={t("About_Us")}
                        >
                          {t("About_Us")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          aria-current="page"
                          to="/contactus"
                          title={t("Contact_Us")}
                        >
                          {t("Contact_Us")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/blog"
                          title={t("Blog")}
                        >
                          {t("Blog")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/successstory"
                          title={t("Success Story")}
                        >
                          {t("Success Story")}
                        </NavLink>
                      </li>
                    </ul>
                  </li>




                  <li className="nav-item dropdown profile">
                    <a
                      className="nav-link dropdown-toggle "
                      href="#"
                      id="candidateDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      title={t("Candidate")}
                    // style={{padding:5}}
                    >
                      <span>{t("Candidate")}</span>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      data-bs-popper="static"
                      aria-labelledby="candidateDropdown"
                    >
                      <a
                        href="#"
                        className="dropdown-item"
                        onClick={handleLoginModal}
                        title={t("Candidate_Login")}
                      >
                        <i className="bx bxs-user icon"></i>
                        {t("Candidate_Login")}
                      </a>
                      <Link
                        className="dropdown-item"
                        to="/register"
                        title={t("Candidate_Register")}
                      >
                        <i className="bx bxs-user-detail icon"></i>
                        {t("Candidate_Register")}
                      </Link>
                    </ul>
                  </li>
                  <li className="nav-item dropdown profile">
                    <a
                      className="nav-link dropdown-toggle "
                      href="#"
                      id="recruiterDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      title={t("Recruiter")}
                    >
                      <span>{t("Recruiter")}</span>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      data-bs-popper="static"
                      aria-labelledby="recruiterDropdown"
                    >

                      <li>
                        <NavLink
                          target="_blank"
                          className="dropdown-item"
                          to="https://recruiter.huntsjob.com/"
                          title={t("Recruiter_Login")}
                        >
                          <i className="bx bxs-user icon"></i>
                          {t("Recruiter_Login")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          aria-current="page"
                          to="/sales"
                          title="sales"
                        >
                          <i className="bx bxs-user-detail icon"></i>
                          Registration
                        </NavLink>
                      </li>

                    </ul>
                  </li>
                  <li className="nav-item dropdown profile ">

                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      id="languageDropdown"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    // onClick={toggleDropdown}
                    >
                      {/* <i
                        className="bx bx-globe-alt"
                        style={{ fontSize: "1rem" }}
                      ></i> */}
                      <img src={Language} alt="language" style={{ width: "24.941px", height: "20.941px" }} />
                      <span>{t("language_name")}</span>
                    </a>

                    <ul
                      className="dropdown-menu scrollable-menu"
                      // aria-labelledby="dropdownMenuButton1"
                      aria-labelledby="languageDropdown"
                      role="button"
                      data-bs-popper="static"
                    >
                      <li>
                        <span className="dropdown-item">{t("language")}</span>
                      </li>


                      {languages.map(({ code, name, country_code, sl_no }) => (
                        <li key={sl_no}>
                          <a
                            style={{ cursor: "pointer" }}
                            className={classNames("dropdown-item", {
                              disabled: currentLanguageCode === code,
                            })}
                            // onClick={() => {
                            //   i18next.changeLanguage(code);
                            // }} 
                            onClick={() => handleLanguageClick(code, name, country_code, sl_no)}
                          >
                            <span
                              className={`flag-icon flag-icon-${country_code} mx-2`}
                              style={{
                                opacity: currentLanguageCode === code ? 0.5 : 1,
                              }}
                            ></span>
                            {name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </header>
      {/* <!-- Login Modal Start --> */}
      <Modal
        Modal
        show={show}
        size="lg"
        onHide={handleClose}
        animation={true}
        centered
      >
        <LoginModal CallbackRes={CloseModal} />
        {/* <LoginRegisterToastTemplate2 CallbackRes={CloseModal}/> */}
      </Modal>
      {/* <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">

                </div>
            </div> */}
      {/* <!-- Login Modal End --> */}
    </>
  );
}

export default Header2;
