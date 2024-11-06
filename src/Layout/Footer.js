import React, { useEffect, useState } from "react";
import "bootstrap";
// import logoimg1 from "../assets/imgs/logo.svg";
import logoimg2 from "../assets/imgs/HuntsJobLogo.svg";
import { HomePageService } from "../Services/HomePageService";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import appstore from "../assets/imgs/appstore.png";
// import playstore from "../assets/imgs/play-store.png";
// import playstore from "../../landingstatic/img/Playstore.png";
import playstore from "../landingstatic/img/android.png";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import { CommonService } from "../Services/CommonService";
import XIcon from "@mui/icons-material/X";
import "animate.css";
import telegram from "../../src/landingstatic/img/telegram.svg";
import facebook from "../../src/landingstatic/img/facebook.svg";
import youtube from "../../src/landingstatic/img/youtube.svg";
import instagram from "../../src/landingstatic/img/instagram.svg";
import linkedin from "../../src/landingstatic/img/linkedin.svg";
import whatsapp from "../../src/landingstatic/img/whatsapp.svg";
import twitterx from "../../src/landingstatic/img/twitterx.svg";

function Footer2() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [industries, setindustries] = useState([]);
  const [countriess, setcountriess] = useState([]);
  const getcurrentfullyear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 992);
  const cookiesIndustryValue = cookies.get("industries");
  const countryFooter = cookies.get("countryFooter");
  const expirationDate = new Date(Date.now() + 30 * 60 * 1000);
  const initIndustries = async () => {
    try {
      if (cookiesIndustryValue) {
        setindustries(JSON.parse(cookiesIndustryValue));
      } else {
        const industries = await HomePageService.GetIndustryForFooter();
        const ind = JSON.parse(industries.apiData);
        Cookies.set('industries', JSON.stringify(ind), { expires: expirationDate });
        setindustries(ind);
      }
    } catch (error) {
    }
  };
  const initCountries = async () => {
    try {
      if (countryFooter) {
        setcountriess(JSON.parse(countryFooter));
      } else {
        const countries = await HomePageService.GetCountriesForFooter();
        if (countries) {
          const con = JSON.parse(countries.apiData);
          Cookies.set('countryFooter', con, { expires: expirationDate });
          setcountriess(con);
        }
        else {
          setcountriess([]);
        }
      }
    } catch (error) {
      setcountriess([]);
    }
  }
  const handleIndustries = (indId, IndName) => {
    let obj = "";
    let IsQuickSearch = "qs_asr&qID=Qs";
    try {
      obj += IsQuickSearch;
      obj += "&IndId=" + indId;
      obj += "&IndName=" + IndName;

      IndName = IndName.replace(/\s*\/\s*|\s+and\s+/g, '-').replace(/\s+/g, '-').toLowerCase();
      // console.log(IndName);
      navigate("/industry/" + IndName + "-jobs?indId=" + indId)
    } catch (error) { }
    // navigate({
    //   pathname: "/advancesearchresult",
    //   search: "ref=" + obj,
    // });
  };
  
  const handleLocation = (locId, LocName) => {
    let obj = "";
    let IsQuickSearch = "qs_asr&qID=Qs";
    try {
      obj += IsQuickSearch;
      obj += "&locId=" + locId;
      obj += "&locName=" + LocName;
    } catch (error) { }
    navigate({
      pathname: "/advancesearchresult",
      search: "ref=" + obj,
    });
  };
  const ShowAlert = (type, message) => {
    if (type === 1) {
      toast.success(message, {
        toastId: "",
      });
    } else {
      toast.error(message, {
        toastId: "",
      });
    }
  };
  const onclickapp = () => {
    ShowAlert(0, "Mobile app is coming soon.");
  };

  useEffect(() => {
    initIndustries();
    initCountries();
  }, []);
  const staticItems = [
    "Petroleum / Oil...",
    "Construction - Oil...",
    "Engineering / Pr...",
    "Construction",
    "Projects / Inf...",
    "Technology / Pla...",
  ];
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (countryID, countryName) => {
    handleLocation(countryID, countryName);
    setIsOpen(false);
  };

  return (
    <>
      <footer className="footer-container">
        <div className="container">
          <div className="row">
            <div className="mb-3 mb-lg-0 col-lg">
              <Link to="/" className="logo">
                <img style={{ width: "160px" }} src={logoimg2} alt="Huntsjob" />
              </Link>
              <div
                className="social-container"
              // style={{ flexDirection: "unset", display: "unset" }}
              >
                <h6 className="subtitle">{t("Download Our App")}</h6>

                <Link
                  to="https://play.google.com/store/apps/details?id=com.googlesignexbee"
                  target="blank"
                >
                  <img
                    style={{
                      // width: "52.5%",
                      width: isMobile ? "35%" : isTablet ? "25%" : "70%",
                      marginRight: isMobile ? "10px" : isTablet ? "10px" : "0",
                      marginBottom: isMobile
                        ? "0px"
                        : isTablet
                          ? "0px"
                          : "10px",
                      borderRadius: "5px",
                      border: "1px solid white",
                    }}
                    src={playstore}
                    alt="International Jobs"
                  />
                </Link>
                {/* <Link onClick={onclickapp}>
                  <img
                    style={{
                      width: isMobile ? "35%" : isTablet ? "25%" : "70%",
                      borderRadius: "5px",
                      border: "1px solid white",
                    }}
                    src={appstore}
                    alt="mobileapp"
                  />
                </Link> */}
              </div>
            </div>
            <div className="mb-3 mb-lg-0 col-lg">
              <h5 className="title">{t("For Jobseekers")}</h5>
              {/* <div class="loader-line"></div> */}
              {/* <div className="geeks footergeeks"></div> */}

              <ul className="links">
                <li>
                  {/* <i className="icon bx bx-right-arrow-alt"></i> */}
                  <Link to="/">{t("Home")}</Link>
                </li>
                <li>
                  {/* <i className="icon bx bx-right-arrow-alt"></i> */}
                  <Link to="/quicksearch">{t("Quick Search")}</Link>
                </li>
                <li>
                  {/* <i className="icon bx bx-right-arrow-alt"></i> */}
                  <Link to="/advancesearch">{t("Advanced Search")}</Link>
                </li>
                {/* <li><Link to="/">Get Jobs In Email</Link></li> */}
                <li>
                  {/* <i className="icon bx bx-right-arrow-alt"></i> */}
                  <Link to="/aboutus">{t("Know About Companies")}</Link>
                </li>
                <li>
                  {/* <i className="icon bx bx-right-arrow-alt"></i> */}
                  <Link to="/profiledashboard">Huntsjob</Link>
                </li>
              </ul>
            </div>
            <div className="mb-3 mb-lg-0 col-lg">
              <h5 className="title">{t("Job By Industry")}</h5>
              {/* <div class="loader-line"></div> */}
              {/* <div className="geeks footergeeks"></div> */}

              <ul className="links">
                {industries
                  ? industries.slice(0, 5).map((item, i) => (
                    <div key={i}>
                      <li>
                        {/* <i className="icon bx bx-right-arrow-alt"></i> */}
                        <a
                          title={item.IndustryName}
                          onClick={() =>
                            handleIndustries(
                              item.IndustryID,
                              item.IndustryName
                            )
                          }
                          href=""
                          style={{ cursor: "pointer" }}
                        >
                          {/* {item.IndustryName} */}
                          {item.IndustryName
                            ? item.IndustryName.length <= 25
                              ? item.IndustryName
                              : item.IndustryName.substring(0, 25) + "..."
                            : ""}
                        </a>
                      </li>
                    </div>
                  ))
                  : ""}
              </ul>
            </div>
            <div className="mb-3 mb-lg-0 col-lg">
              <h5 className="title">{t("Jobs By Country")}</h5>
              {/* <div class="loader-line"></div> */}
              {/* <div className="geeks footergeeks"></div> */}

              <ul className="links">
                {countriess &&
                  countriess.map((item, i) =>
                    item.CountryID != 615 && item.CountryID != 135 ? (
                      <div key={i}>
                        <li>
                          {/* //<i className="icon bx bx-right-arrow-alt"></i> */}
                          <a
                            title={item.CountryName}
                            onClick={() =>
                              handleLocation(item.CountryID, item.CountryName)
                            }
                            href=""
                            style={{ cursor: "pointer" }}
                          >
                            {item.CountryName}
                          </a>
                        </li>
                      </div>
                    ) : null
                  )}
                {/* <li>
                  <a href="">Qatar</a>
                </li>
                <li>
                  <a href="">Oman</a>
                </li>
                <li>
                  <a href="">Kuwait</a>
                </li>
                <li>
                  <a href="">Bahrain</a>
                </li>
                <li>
                  <a href="">Romania</a>
                </li>
                <li>
                  <a href="">Saudi Arabia</a>
                </li>
                <li>
                  <a href="">United Arab Emirates</a>
                </li> */}
              </ul>
            </div>
            {/* <div className="mb-3 mb-lg-0 col-lg">
            
            </div> */}
            <div className="mb-3 mb-lg-0 col-lg-4">
              <h5 className="title">{t("Head Office")}</h5>
              <div className="branch">
                <ul>
                  <li>
                    <div className="item">
                      <a href="https://www.google.com/maps?ll=19.279117,72.871533&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=3368279191434169518" style={{ display: "flex", gap: ".5rem" }}>
                        <i className="icon bx bxs-map"></i>
                        <span>
                          HUNTSJOB.COM, Mandakini, Jangid Complex Rd,<br></br>{" "}
                          Silver Park, Mira Road East, Mumbai, <br></br>
                          Maharashtra 401107
                        </span>
                      </a>
                    </div>
                  </li>
                  <li>
                    {/* <div className="item"><i className='bx bxs-phone icon'></i><a href="tel:+91 22285 55570">+91 22285 55570</a>
                    </div> */}
                    {/* <div className="item"><i className='bx bxs-printer icon'></i><a href="tel:+91 22285 55678">+91 22285 55678</a>
                    </div> */}
                  </li>
                  <li>
                    <div className="item">
                      <i className="bx bxs-envelope icon"></i>
                      <a href="mailto:support@huntsjob.com">
                        support@huntsjob.com
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* <div className="branch">
                <iframe
                  style={{ height: "100%", width: "100%" }}
                  title="google-map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.1276845660705!2d72.8742333!3d19.2768128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b05d9a58b283%3A0x2ebe881425c60cae!2sHUNT%20JOBS%20PRIVATE%20LTD!5e0!3m2!1sen!2sin!4v1679744176450!5m2!1sen!2sin"
                  allowFullScreen
                  className="md-height"
                ></iframe>
              </div> */}
            </div>
            {/* <div className="mb-3 mb-lg-0 col-lg">
             
            </div> */}
          </div>
          {isMobile || isTablet ? (
            <div className="social-container">
              {/* <div
              className="foorterHr"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ff5c35",
              }}
            >
              {" "}
              <hr
                style={{ width: "40%", textAlign: "center", color: "#ff5c35" }}
              />
              <i class="bx bx-infinite " style={{ margin: "0 10px" }}></i>
              <hr
                style={{ width: "40%", textAlign: "center", color: "#ff5c35" }}
              />
            </div> */}
              <div className="">
                <ul className="links text-light">
                  <li>
                    <Link to="/privacycommitment">
                      {t("Privacy Commitment")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/termsofuse">{t("Terms & Conditions")}</Link>
                  </li>
                  <li>
                    <Link to="/sitemap">{t("Sitemap")}</Link>
                  </li>
                </ul>
              </div>
              <h6
                className="subtitle d-flex mt-2 "
              // style={{ color: "#b1a6a6" }}
              >
                {t("Connect with us")}
              </h6>
              <div style={{ display: isMobile ? "" : "flex" }}>
                <div className="social-links ">
                  <Link
                    to="https://www.facebook.com/HuntsjobGlobal"
                    target="_blank"
                    className="logo"
                  >
                    {/* <i className="bx bxl-facebook"></i> */}
                    <img src={facebook} alt="Huntsjob Facebook" height={"30px"} width={"30px"} />
                  </Link>
                  <Link
                    to="https://www.instagram.com/huntsjobglobal/"
                    target="_blank"
                    className="logo"
                  >
                    {/* <i className="bx bxl-instagram"></i> */}
                    <img
                      src={instagram}
                      alt="Huntsjob Instagram"
                      height={"30px"}
                      width={"30px"}
                    />
                  </Link>
                  <Link
                    to="https://www.linkedin.com/company/huntsjob"
                    target="_blank"
                    className="logo"
                  >
                    {/* <i className="bx bxl-linkedin"></i> */}
                    <img src={linkedin} alt="Huntsjob LinkedIn" height={"30px"} width={"30px"} />
                  </Link>
                  <Link
                    to="https://twitter.com/HuntsjobMedia"
                    target="_blank"
                    className="logo"
                  >
                    {/* <XIcon style={{ height: "75%", width: "75%" }} /> */}
                    {/* <FontAwesomeIcon icon={faXTwitter} /> */}
                    <img src={twitterx} alt="Huntsjob Twitter" height={"30px"} width={"30px"} />
                  </Link>
                </div>
                <div
                  className="social-links d-flex"
                  style={{ margin: isMobile ? "0.5rem 1.5rem" : "0 1.5rem" }}
                >
                  <Link
                    to="https://www.youtube.com/channel/UCtGvxHw0RWxRaSuq2ooUwCQ"
                    target="_blank"
                    className="logo "
                  >
                    {/* <i className="bx bxl-youtube"></i> */}
                    <img src={youtube} alt="Huntsjob Youtube" height={"30px"} width={"30px"} />
                  </Link>

                  <Link
                    to="https://whatsapp.com/channel/0029Va9rJrp9Bb5vMS6Pob2z"
                    target="_blank"
                    className="logo"
                  >
                    {/* <i class="bx bxl-whatsapp"></i> */}
                    <img src={whatsapp} alt="Huntsjob Whatsapp" height={"30px"} width={"30px"} />
                  </Link>
                  <Link
                    to="https://t.me/Huntsjob"
                    target="_blank"
                    className="logo"
                  >
                    {/* <i class="bx bxl-telegram"></i> */}
                    <img src={telegram} alt="Huntsjob Telegram" height={"30px"} width={"30px"} />
                  </Link>
                </div>
              </div>
              {/* </div> */}
            </div>
          ) : (
            <div className="social-container">
              <div
                className="foorterHr"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ff5c35",
                }}
              >
                {" "}
                <hr
                  style={{
                    width: "40%",
                    textAlign: "center",
                    color: "#ff5c35",
                  }}
                />
                <i class="bx bx-infinite " alt="Huntsjob Social Media" style={{ margin: "0 10px" }}></i>
                <hr
                  style={{
                    width: "40%",
                    textAlign: "center",
                    color: "#ff5c35",
                  }}
                />
              </div>
              <div className="social-links ">
                <Link
                  to="https://www.facebook.com/HuntsjobGlobal"
                  target="_blank"
                  className="logo"
                >
                  {/* <i className="bx bxl-facebook"></i> */}
                  <img src={facebook} alt="Huntsjob Facebook" height={"30px"} width={"30px"} />
                </Link>
                <Link
                  to="https://www.instagram.com/huntsjobglobal/"
                  target="_blank"
                  className="logo"
                >
                  {/* <i className="bx bxl-instagram"></i> */}
                  <img src={instagram} alt="Huntsjob Instagram" height={"30px"} width={"30px"} />
                </Link>
                <Link
                  to="https://www.linkedin.com/company/huntsjob"
                  target="_blank"
                  className="logo"
                >
                  {/* <i className="bx bxl-linkedin"></i> */}
                  <img src={linkedin} alt="Huntsjob LinkedIn" height={"30px"} width={"30px"} />
                </Link>
                <Link
                  to="https://twitter.com/HuntsjobMedia"
                  target="_blank"
                  className="logo"
                >
                  {/* <XIcon style={{ height: "75%", width: "75%" }} /> */}
                  {/* <FontAwesomeIcon icon={faXTwitter} /> */}
                  <img src={twitterx} alt="Huntsjob Twitter" height={"30px"} width={"30px"} />
                </Link>
                {/* </div> */}
                {/* <div
                    className="social-links d-grid"
                    style={{ marginTop: "15px" }}
                  > */}
                {/* <Link to="#" className="logo"><i className='bx bxl-google'></i></Link> */}
                <Link
                  to="https://www.youtube.com/channel/UCtGvxHw0RWxRaSuq2ooUwCQ"
                  target="_blank"
                  className="logo "
                >
                  {/* <i className="bx bxl-youtube"></i> */}
                  <img src={youtube} alt="Huntsjob Youtube" height={"30px"} width={"30px"} />
                </Link>

                <Link
                  to="https://whatsapp.com/channel/0029Va9rJrp9Bb5vMS6Pob2z"
                  target="_blank"
                  className="logo"
                >
                  {/* <i class="bx bxl-whatsapp"></i> */}
                  <img src={whatsapp} alt="Huntsjob Whatsapp" height={"30px"} width={"30px"} />
                </Link>
                <Link
                  to="https://t.me/Huntsjob"
                  target="_blank"
                  className="logo"
                >
                  {/* <i class="bx bxl-telegram"></i> */}
                  <img src={telegram} alt="Huntsjob Telegram" height={"30px"} width={"30px"} />
                </Link>
              </div>
              <h6
                className="subtitle d-flex mt-2 "
                style={{ color: "#b1a6a6" }}
              >
                {t("Connect with us")}
              </h6>
              {/* </div> */}
            </div>
          )}
        </div>
        <div className="copyright-container">
          <div className="container">
            <p>
              Copyright © {getcurrentfullyear} By Hunt Jobs Pvt. Ltd. All Rights
              Reserved.
            </p>
            <ul className="links hideLinks">
              <li>
                <Link to="/privacycommitment">{t("Privacy Commitment")}</Link>
              </li>
              <li>
                <Link to="/termsofuse">{t("Terms & Conditions")}</Link>
              </li>
              <li>
                <Link to="/sitemap">{t("Sitemap")}</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Footer2;
