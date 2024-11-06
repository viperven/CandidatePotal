import React, { useRef, useState, useEffect } from "react";
import "../../assets/css/styles.css";
import Layout from "../../Layout/Layout";
import { HomePageService } from "../../Services/HomePageService";
import { AdvanceSearchService } from "../../Services/AdvanceSearchService";
import Carousel from "react-grid-carousel";
import { toast } from "react-toastify";
import ToastContainerModal from "react-bootstrap/ToastContainer";
import climage from "../../assets/imgs/Logo blur.png";
import playstore from "../../landingstatic/img/android.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { Backdrop } from "@mui/material";
import { Modal } from "react-bootstrap";
import "animate.css";
import { ProfileDashboardService } from "../../Services/ProfileDashboardservice";
import { AuthService } from "../../Services/AuthService";
import LoginModal from "../LogIn/LoginModal";
import ApplyJobModal from "./Jobs/ApplyJobModal";
import leftArrowImage from "../../assets/imgs/left-arrow1.png";
import rightArrowImage from "../../assets/imgs/right-arrow1.png";
import image_10 from "../../landingstatic/img/cv 1.png";
import image_11 from "../../landingstatic/img/image-11.png";
import image_12 from "../../landingstatic/img/image-12.png";
import image_13 from "../../landingstatic/img/image-13.png";
import image18 from "../../landingstatic/img/QRCode.png";
import Download from "../../assets/imgs/Download 3.avif";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import award from "../../landingstatic/img/REGISTRATION.avif";
import todo from "../../landingstatic/img/JOB POSTINGS.avif";
import vacancies from "../../landingstatic/img/VACANCIES HANDLED.avif";
import applications from "../../landingstatic/img/APPLICATIONS.avif";
import { styled, keyframes } from "@mui/material/styles";
// import LoginRegisterToastTemplate from "./LoginRegisterToastTemplate/LoginRegisterToastTemplate";
import { useForm } from "react-hook-form";
import NewLoader from "./NewLoader";
import shape from "../../landingstatic/img/Rectangle 50.svg";
import Rectangle77 from "../../landingstatic/img/Construction_img_avif.avif";
import Rectangle78 from "../../landingstatic/img/Welder_img_avif.avif";
import FrameResume from "../../landingstatic/img/CREATE_RESUME_SECTION_TEMPLATE_2.avif";
import WebImage from "../../assets/imgs/Frame.avif";
import cookies from "js-cookie";
import { useParams } from "react-router-dom";
import HomeSearchInput from "./HomeSearchInput";
import { Contactservice } from "../../Services/Contactservice";
import RightLanImage from "../../assets/imgs/Landing Page_05 1.png";
import PopularCategories from "./HomePageComponents/PopularCategories";
import TrendingJobs from "./HomePageComponents/TrendingJobs";

const HomePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [regxOnlySpecialChar, setregxOnlySpecialChar] =
    useState(/^[^a-zA-Z0-9]+$/);
  const [top10Industries, setTop10Industries] = useState([]);
  const [clientImgs, setclientImgs] = useState([]);
  const [dailyJobs, setdailyJobs] = useState([]);
  const [monthlyJobs, setmonthlyJobs] = useState([]);
  const [hotjobs, sethotjobs] = useState([]);
  const [KeyWordsList, setKeyWordsList] = useState([]);
  const [href, sethref] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [mesage, setmesage] = useState([]);
  const [message, Setmessage] = useState("");
  const [eventMessages, setEventMessages] = useState("");
  const [showToast, setToast] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const currentDate = new Date().getDate();
  const [loading, setLoading] = React.useState(true);
  setTimeout(() => setLoading(false), 2000);
  const [openLoader, setopenLoader] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handlePaperAddClose = () => setPaperAddShow(false);
  const handlePaperAddShow = () => setPaperAddShow(true);
  const [paperAddshow, setPaperAddShow] = useState(false);
  const [applyJobModal, setapplyJobModal] = useState(false);
  const handleLoginClose = () => setloginShow(false);
  const handleLoginShow = () => setloginShow(true);
  const [loginShow, setloginShow] = useState(false);
  const [jpid, setJpid] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile2, setIsMobile2] = useState(window.innerWidth <= 992);
  const [showUploadResume, setShowUploadResume] = useState(true);
  const [showHideUploadResume, setShowHideUploadResume] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showImage2, setShowImage2] = useState(false);
  const cookiesIndustryValue = cookies.get("industries");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile2(window.innerWidth <= 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onClickKeywordHandler = (e) => {
    try {
      document.getElementById("myInput").value = e;
      setKeyWordsList([]);
    } catch (error) {
      console.log(error);
    }
  };
  const getEventMessages = async () => {
    try {
      const ev = await HomePageService.getUpcomingEvent();
      const event = JSON.parse(ev.apiData);
      setEventMessages(event[0].Description);
    } catch (error) { }
  };
  const initIndustries = async () => {
    try {
      if (cookiesIndustryValue) {
        setTop10Industries(JSON.parse(cookiesIndustryValue));
      } else {
        const industries = await HomePageService.GetIndustryForFooter();
        const ind = JSON.parse(industries.apiData);
        const top10industries = ind.splice(0, 10);
        setTop10Industries(top10industries);
      }
    } catch (error) { }
  };

  const initClientImages = async () => {
    try {
      const storedData = localStorage.getItem("clientData");
      const storedTimestamp = localStorage.getItem("clientDataTimestamp");
      const now = Date.now();
      const thirtyMinutes = 30 * 60 * 1000;
      if (
        storedData &&
        storedTimestamp &&
        now - parseInt(storedTimestamp) < thirtyMinutes
      ) {
        const data = JSON.parse(storedData);
        setclientImgs(data);
      } else {
        const hotjobs = await HomePageService.ClientImages();
        const img = JSON.parse(hotjobs.apiData);
        localStorage.setItem("clientData", JSON.stringify(img));
        localStorage.setItem("clientDataTimestamp", now.toString());
        setclientImgs(img);
      }
    } catch (error) {
      setclientImgs([]);
    }
  };

  const setClintlogo = (base64) => {
    let img = "";
    try {
      img = atob(base64);
    } catch (error) {
      img = "";
    }
    return img;
  };

  const isContainDataBase64 = (base64, contentType) => {
    let resultImage = "";
    if (base64 != null) {
      resultImage = setClintlogo(base64);
      if (resultImage.includes("data:")) {
        resultImage = resultImage;
      } else {
        resultImage = "data:" + contentType + ";base64," + resultImage;
      }
    } else {
      resultImage = climage;
    }
    return resultImage;
  };
  const handleInputChange = (inputText) => {
    if (inputText.length > 0) {
      initKeyWordsList(inputText);
      if (regxOnlySpecialChar.test(inputText)) {
        Setmessage("Only special character(s) are  not allowed");
      } else {
        Setmessage("");
      }
    } else {
      setKeyWordsList([]);
      Setmessage("");
    }
  };
  const onclickhideKeyWordList = (e) => {
    //setTimeout(setKeyWordsList([]), 0);
    setKeyWordsList([]);
  };
  const initKeyWordsList = async (inputText) => {
    try {
      if (inputText !== "" || inputText !== undefined || inputText !== null) {
        const keyWords = await AdvanceSearchService.GetKeyWords(inputText);

        if (keyWords.isSuccess) {
          const res = JSON.parse(keyWords.apiData);
          const keywordsuggesstion = [];
          res.forEach((element) => {
            keywordsuggesstion.push(element.KeyWord);
          });
          keywordsuggesstion
            ? setKeyWordsList(keywordsuggesstion)
            : setKeyWordsList([]);
        } else {
          setKeyWordsList([]);
        }
      }
    } catch (error) { }
  };
  const initDailyAndMonthlyJobs = async () => {
    try {
      const res = await HomePageService.GetDailyAndMonthlyJobs();
      const jobs = JSON.parse(res.apiData);
      setdailyJobs(jobs.Table);
      //setdailyJobs([]);
      setmonthlyJobs(jobs.Table1);
    } catch (error) {
      console.log(error);
    }
  };
  const initHotJobs = async () => {
    try {
      const hotjob = await HomePageService.GetHotJobs();
      const hotjobs = JSON.parse(hotjob.apiData);
      sethotjobs(hotjobs);
    } catch (error) {
      console.log(error);
    }
  };
  //old
  // const handleTop5Industries = (indId, IndName) => {
  //   let obj = "";
  //   let IsQuickSearch = "qs_asr&qID=Qs";
  //   try {
  //     obj += IsQuickSearch;
  //     obj += "&IndId=" + indId;
  //     obj += "&IndName=" + IndName;
  //   } catch (error) {}

  //   navigate({
  //     pathname: "/advancesearchresult",
  //     search: "ref=" + obj,
  //   });
  // };

  const handleTop5Industries = (indId, IndName) => {
    let obj = "";
    let IsQuickSearch = "qs_asr&qID=Qs";
    try {
      obj += IsQuickSearch;
      obj += "&IndId=" + indId;
      obj += "&IndName=" + IndName;;
    } catch (error) { }

    // navigate({
    //   pathname: "/advancesearchresult",
    //   search: "ref=" + obj,
    // });
    // navigate("/advancedsearchresult/industry/petroleum-oil-gas-power-jobs?IndId=35")

    IndName = IndName.replace(/\s*\/\s*|\s+and\s+/g, '-').replace(/\s+/g, '-').toLowerCase();
    // console.log(IndName);
    navigate("/industry/" + IndName + "-jobs?indId=" + indId)
  };


  const replaceSpecialCharFromUrl = (v) => {
    v.replace("$", "")
      .replace(/ /g, "")
      .replace("%20", "-")
      .replace(" ", "-")
      .replace("%21", "")
      .replace("%22")
      .replace("%23", "")
      .replace("%24")
      .replace("%25", "")
      .replace("%26")
      .replace("%27", "")
      .replace("%28")
      .replace("%29", "")
      .replace("%2A", "")
      .replace("%2B", "")
      .replace("%2C", "")
      .replace("%2E", "")
      .replace("$", "")
      .replace("%30", "")
      .replace("%31", "")
      .replace("%32", "")
      .replace("%33", "")
      .replace("%34", "")
      .replace("%35", "")
      .replace("%36", "")
      .replace("%37", "")
      .replace("%38", "")
      .replace("%37", "")
      .replace("%38", "")
      .replace("%39", "")
      .replace("0", "")
      .replace("1", "")
      .replace("2", "")
      .replace("3", "")
      .replace("4", "")
      .replace("5", "")
      .replace("6", "")
      .replace("7", "")
      .replace("8", "")
      .replace("9", "");
    return v;
  };
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  // console.log("🚀 ~ HomePage ~ selectedOptions:", selectedOptions)


  // const handlejobSearch = () => {
  //   let keywordValue = selectedOptions[0]?.label;
  //   let keyWord = "";
  //   if (keywordValue) {
  //     if (
  //       keywordValue !== "" ||
  //       keywordValue !== null ||
  //       keywordValue !== undefined
  //     ) {
  //       keyWord = keywordValue;
  //     }
  //   }
  //   let obj = "";
  //   let IsQuickSearch = "qs_asr&qID=Qs";
  //   try {
  //     obj += IsQuickSearch;
  //     if (keyWord != "" && keyWord !== null && keyWord != undefined) {
  //       const words = encodeURIComponent(keyWord)
  //         .replace(/'/g, "%27")
  //         .replace(/"/g, "%22");
  //       obj += "&Keywords=" + words;
  //     }
  //     obj += "&keyAny=" + 0 + "";
  //   } catch (error) {}
  //   if (regxOnlySpecialChar.test(keywordValue)) {
  //     Setmessage("Only special character(s) are  not allowed");
  //     return false;
  //   } else {
  //     Setmessage("");
  //   }
  //   if (keyWord) {
  //     navigate({
  //       pathname: "/advancesearchresult",
  //       search: "ref=" + obj,
  //     });
  //   } else {
  //     Setmessage("Please enter skills / designations");
  //   }
  // };
  // old

  const handlejobSearch = () => {

    // document.getElementById("myInput").focus();
    console.log(selectedOptions);

    // let keywordValue = document.getElementById("myInput").value;
    let keywordValue = selectedOptions[0]?.label;

    let keyWord = "";
    if (keywordValue) {
      if (
        keywordValue !== "" ||
        keywordValue !== null ||
        keywordValue !== undefined
      ) {
        keyWord = keywordValue;
      }
    }
    let obj = "";
    let IsQuickSearch = "qs_asr&qID=Qs";
    try {
      obj += IsQuickSearch;
      if (keyWord != "" && keyWord !== null && keyWord != undefined) {
        const words = encodeURIComponent(keyWord)
          .replace(/'/g, "%27")
          .replace(/"/g, "%22");
        obj += "&Keywords=" + words;
      }
      obj += "&keyAny=" + 0 + "";
    } catch (error) { }
    if (regxOnlySpecialChar.test(keywordValue)) {
      Setmessage("Only special character(s) are  not allowed");
      return false;
    } else {
      Setmessage("");
    }
    if (keyWord) {
      debugger
      // let seoCompatibleUrl = keyWord;
      // seoCompatibleUrl = replaceSpecialCharFromUrls(seoCompatibleUrl);
      // navigate("/jobs/" + seoCompatibleUrl + "-jobs")
      // // navigate({
      // //   pathname: "/advancesearchresult",
      // //   search: "ref=" + obj,
      // // });

      let seoCompatibleUrl = keyWord;
      if (seoCompatibleUrl !== "" && seoCompatibleUrl !== null && seoCompatibleUrl !== undefined) {
        seoCompatibleUrl = seoCompatibleUrl.replace("–", '-').replace(/[/]+/g, '-').replace(/[ ]+/g, '-');
      }
      seoCompatibleUrl = replaceSpecialCharFromUrl(seoCompatibleUrl);
      console.log(seoCompatibleUrl);
      console.log("/jobs/" + seoCompatibleUrl + "-jobs");

      navigate("/jobs/" + seoCompatibleUrl + "-jobs")
    } else {
      Setmessage("Please enter skills / designations");
    }
  };

  const handleclientSearch = (clientId) => {
    let obj = "";
    let IsQuickSearch = "qs_asr&qID=Qs";
    try {
      obj += IsQuickSearch;
      obj += "&ClientId=" + clientId;
    } catch (error) { }
    navigate({
      pathname: "/advancesearchresult",
      search: "ref=" + obj,
    });
  };
  const handleOnclickJobDetailsPage = (jpID, title) => {
    let jobtitle = title.replace(/\s+/g, "-");
    var href = "/jobdetails" + "?jobs=" + jobtitle + "/" + jpID;
    sethref(href);
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
  const handleappdownload = () => {
    if (showToast) {
      setToast(false);
    } else {
      setToast(true);
    }
  };
  const onclickapp = () => {
    ShowAlert(0, "Mobile app is coming soon.");
  };
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Close toast if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setToast(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const IconsForCountShow = (i) => {
    let icon = "";
    switch (i) {
      case 1:
        icon = award;
        break;
      case 2:
        icon = todo;
        break;
      case 3:
        icon = vacancies;
        break;
      case 4:
        icon = applications;
        break;
      default:
        break;
    }
    return icon;
  };
  const fetchMessagData = async () => {
    try {
      const response = await HomePageService.getNotification();
      const data2 = JSON.parse(response.apiData);
      const dataArray = data2[0].WebMessage.split(",");
      let array = transformData(dataArray);
      setmesage(array);
    } catch (error) { }
  };
  const transformData = (input) => {
    const output = [];
    input.forEach((item) => {
      const [name, count] = item.split(": ");
      output.push({
        Name: name,
        Count: parseInt(count),
      });
    });
    return output;
  };
  const handleApplyJOBClick = async (jpID) => {
    if (jpID === undefined || jpID === null) {
      ShowAlert(0, "Invalid request");
      return false;
    }
    try {
      if (AuthService.isAuthenticatedUser()) {
        setJpid(jpID);
        const res = await ProfileDashboardService.ApplySelectedJob(jpID);
        if (res.isSuccess) {
          ShowAlert(1, res.message);
          initDailyAndMonthlyJobs();
          initHotJobs();
        } else {
          ShowAlert(0, res.message);
        }
        handleShow();
      } else {
        handleLoginShow();
        navigate({
          pathname: "/",
        });
      }
    } catch (error) {
      ShowAlert(0, "Invalid request");
    }
  };
  const handleSaveJobClick = async (jpID) => {
    if (jpID === undefined || jpID === null) {
      ShowAlert(0, "Invalid request");
      return false;
    }
    try {
      if (AuthService.isAuthenticatedUser()) {
        if (jpID) {
          const res = await ProfileDashboardService.saveSelectJob(jpID);
          if (res.isSuccess) {
            ShowAlert(1, res.message);
            initDailyAndMonthlyJobs();
            initHotJobs();
          } else {
            ShowAlert(0, "You have already saved this job");
          }
        } else {
        }
      } else {
        handleLoginShow();
        navigate({
          pathname: "/",
        });
      }
    } catch (error) {
      ShowAlert(0, "Invalid request");
    }
  };
  const CloseModal = () => {
    handleLoginClose();
  };
  const CloseCandidateModal = (value) => {
    if (value === 1) {
      handleClose();
      let checkboxes = document.getElementsByClassName("jobId");
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          checkboxes[i].checked = false;
        }
      }
    }
  };
  const CloseChildModal = (value, isRefreshList) => {
    if (value === 1) {
      handleClose();
    }
    if (isRefreshList) {
      handleClose();
    }
  };
  useEffect(() => {
    fetchMessagData();
  }, []);
  useEffect(() => {
    initClientImages();
    getEventMessages();
    initIndustries();
    // initDailyAndMonthlyJobs();
    initHotJobs();
    // window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handlePrevClick = (index) => {
    if (index > 0) {
      setSelectedImageIndex(index - 1);
    } else {
      // setSelectedImageIndex(index + (advimages.length - 1));
    }
  };

  const handleNextClick = (index) => {
    // if (index < advimages.length - 1) {
    //   setSelectedImageIndex(index + 1);
    // } else {
    //   setSelectedImageIndex(index - (advimages.length - 1));
    // }
  };

  const arrowLeft = () => {
    return (
      <div
        style={{
          position: "absolute",
          left: "-20%",
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
          right: "-20%",
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
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 2.5,
  //   slidesToScroll: 1,
  //   centerMode: true,
  //   centerPadding: '100px',
  //   top: '30px'
  // };
  const [activeSlide, setActiveSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "100px",
    beforeChange: (current, next) => setActiveSlide(next),
    afterChange: (current) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  const carouselData = [
    {
      name: "Mr. Shuaib Babajan Alamkhani",
      quote:
        "I am extremely grateful to Huntsjob for helping me secure a fantastic opportunity as a Boat Mechanic in Bahrain's Reputed Company. The entire process was smooth and efficient, and the support received from the team was incredible. Thank you, Huntsjob, for making this possible.",
      // image: RW6,
      rating: 5,
    },
    {
      name: "Mr. Prakash",
      quote:
        "I would highly recommend Huntsjob to all candidates who are looking for overseas job opportunities.",
      // image: RW1,
      rating: 4,
    },
    {
      name: "Mr. Suresh",
      quote:
        "I saw job ads from Huntsjob and came to Mumbai from Tamil Nadu to give Interviews. I am grateful to Huntsjob for providing overseas career opportunities.",
      // image: RW2,
      rating: 5,
    },
    {
      name: "Mr. Zaman Usmani",
      quote:
        "I got to know about interviews from Huntsjob. I came from UP to Mumbai to give interviews. Thank you Huntsjob for the good information & assistance provided.",
      // image: RW3,
      rating: 4,
    },
    {
      name: "Mr. Mohammad Shadab",
      quote:
        "I got selected as a Maintenance Incharge at a reputed steel fabrication company in KSA, thanks to Huntsjob for shortlisting my CV and giving me this opportunity!",
      // image: RW4,
      rating: 5,
    },
    {
      name: "Mr. Mohammad Zafar",
      quote:
        "Through Huntsjob, I got selected in an online interview for Qatar’s reputed Galfar Al Misnad company. The overall process was smooth & hassle free. I am really grateful for this career opportunity.",
      // image: RW5,
      rating: 4,
    },
    // Add more items as needed
  ];

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const [err, setErr] = React.useState(0);
  const flip = keyframes`
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
  100% { transform: rotateY(360deg); }
`;
  const handleButtonClick = () => {
    localStorage.setItem("triggerFileInput", "true");
    navigate("/register");
  };
  const handleButtonClickUpdate = () => {
    localStorage.setItem("triggerFileInput", "true");
    navigate("/myprofile");
  };

  useEffect(() => {
    let timer = "";
    if (!AuthService.isAuthenticatedUser()) {
      timer = setTimeout(() => {
        setShowImage(true);
      }, 2000);
    } else {
      timer = setTimeout(() => {
        setShowImage2(true);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowUploadResume(true);
      setShowHideUploadResume(false);
    }, 4000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (animateOut) {
      const hideTimer = setTimeout(() => {
        setShowUploadResume(false);
        setShowHideUploadResume(true);
      }, 2000);

      return () => clearTimeout(hideTimer);
    }
  }, [animateOut]);

  useEffect(() => {
    if (id === "resumesection" || id === undefined) {
      setTimeout(() => {
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 1500);
    } else {
      navigate("/404");
    }
  }, [id]);

  useEffect(() => {
    const hash = location.hash;
    console.log("hash: ", hash);
    if (hash) {
      const elementId = hash.replace("#", "");
      const element = document.getElementById(elementId);
      console.log("element: ", element);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 2000);
      }
    }
  }, [location]);

  const currentReview = carouselData[currentIndex];

  const handleIndustriesiconOnload = (inId) => {
    const automobiles =
      "data:image/png;base64,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";
    const Catering =
      "data:image/png;base64,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";
    const engineering =
      "data:image/png;base64,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";
    const factory =
      "data:image/png;base64,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";
    const oil_pump =
      "data:image/png;base64,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";
    const storage_stacks =
      "data:image/png;base64,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";
    const petrochemical =
      "data:image/png;base64,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";
    const crucible =
      "data:image/png;base64,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";
    const construction =
      "data:image/png;base64,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";
    const corporation =
      "data:image/png;base64,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";
    const hotel =
      "data:image/png;base64,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";
    const boat =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAoZSURBVHgBzVoLTFTpFf4GdwVUHnZlXUBhVHxhZWWzqTEKTNNq2spWjSau0UasaV2rVjcxmmpSsV3daJtWjehS46vCGtOsSn11fZSXr11UXOqK6KLD01qUpyCIcHu+f+YOw8gMMzzc/ZIzc+9/7/3P+c7jf9wZwHMsFKkS0XpJHojMhIcwwDMYqSjgtT6IDwpET6KlVUPd0ybcaGzEw5YWNg0UqXb3+dfgGSbwY8vIMCwIGYSexq17j3Cqvh5/fPKEp4zKAXefdTciCSJxsETEFDPQD2E+fdHTqK61RINREWSImEUy4QEhV9iA3qsHd2VVZ0a6E5EHYWFhxitXriAwsGfrwhWq6upRUV2L6T+KQ3lZmVmahrm6v7MaoeVGEjh58iReJZqeN6PqaQNCQoeQiNFqi9vF7wgTvv200mUCXMCdiMDws2USlyi8ahhKzNAeXId26yxPSeSms3s7I6K8YIib/+0QuZULQ+j30dJGxCm84Bpvq08rCS0jBa1zB0C7nW05N+ehdVGoau8NaH7+QMBg/dTo6t7OiBhhHG85qq+BtvsDICgMhqBwRULb+FN1yTAuFr2Cvt6WbwuZt13d2mlq0WiF/gEw/OYTGCJjodVX20h4bfiXItcRSBbW6CEyBgZP09NKxPDmCGg1j4yubnVFxJKTOhF2GLfAcvCPzepLkdAjJiBB5JyS1MuSbxmuG2radaiRsDjCEDkFGBcDg13fHaJfP8t3wFt6Cx8ogodEjOqTSh2gIlO/RcZEGRW/zoZ2TYy2974gakA/xAwdjJSHj9WCcHr//rhR/RD3MlOgZVpqSmOEGKl34yU9Y162oK+PRR8jYmmJ7jqR/u1nc+1/0o8YruVYjbd6Xa2Ig99AbKA/4t8MlHNL1ycrqvH8RQs+HDhQnT988UKtpbKePcPdkq/xkLV2OglavwBLlISULVp9+ljSa3BEe5s8JBKnPiUdaLQaqWh8RZtDYgL9EDM4FFxEUtxBsBCcPmCAEuLe8+eKWKYQu5FjdRDa0tBriNS4X7D+uNOCd7bWMon8FQ5jd7iPt9qHxAcNRJSfr83rrjDuUp6KyLGQkE7vrWtttUXLbl9iD7PIIlhWxu2gW8L8SYCF8UzruUoXi7f9FQES6U34eXkhTgo8zlrk9mnI7zpNM0pzOixrrgyRNOu3mRHZIJKod6bSRQz3JF06QnVzC1L/+xib75epYmeNvOPtrVKrq9BTUKVjU5P9pUQS0bhJWj8stF2Rdsf4kxVVyK6q6/AekmF9dJeUnobbqqtV5GRYQEKYj3fg9rFG+Hh1NtF3bPze8gpsKCzFqoIinH9Sg+LG54iJicHy5ctx9+5dtEpE1m/8A+rq6nCjuEilyhEecydoMKiU8vNQt7c8Z3z9dWQ1NLCWVGodk1qYWRb3jtuddOT5gIAAREVFYcGCBYiPj7dtwiIjI9EsHjt1IVOdy94C1768ivQL55Bx/rytz65GampJCWsng08U1cioUtTY5LKYnRlPzzsa7wohoaH4+azZShih9PNnbaT0vHeX1F2pFSHBw694l1rjZ1fWITzEu1eMdwY/P79ukbrX3KwfZjC1aEnVfJmVkyOHe5Q27sAxtdyBIykdjqT42oivjwTD9AkxXerEFOXXr0eM7y4Rd0lxwpQRixkVrccqU+rElNfq1WNp01NwlX5WcFK0LVGMIg+WLVuGrVu3oifR3Yg4w+9/twYnjh3lIV8TmfXB2yySkZKSgpqaGnzXUV5WqpPIgMX2dlvdgySxc+dOW0NxcTEmTZqE/rKXoPD4VRCloe/PfA/RYyKUvD/rPZVWOq59+YXNZv3AnsgBkeqkpCSbsVlZWcjLy8Po0aOV8PjQoUO2B4qKitCTxtsbWnAnH0OGDFFSkJ+Pfx77zHY9eecOfplh907Ycba5KSRM9DzrhaSIxYsXy66zn1py7Nq1S1YVBpw4cQLZ2dlYt24d1q9fj+7gzx9/hNSDB9RkOX/hIjner9pnzJghy5tW7N69G59KGws6/fw5tTqAw1K+j90xV8EJQ4cOVSl17tw5NMuEM2fOHIwfPx6vy7qmQdY1d+7cwenTp/H48WMMHz4cx48fVxGcOnVqh0bSGTSGBnYEenf/nmRQb1lpKS5nZ6FFhlXqnTJlCnx9fdEkk+P9wkJk/vsCnoje4OBg1NbWcq/EYfVz9tNu1GL6rF27VhmZm5uLyZMnq0jYg9dIVF5sY9CgQUhMTFTnt2/fRnj4yy8TXI1a9CxfUnuil1PC06dPkZqaioqKCt32Ij21zCIZJSUlJj5AA+lhej8tLQ3SrqJBhfQSFTmS6ohEZ2AqvfuDibh96z9wVy/bJBo6CTOsLyPsayRNHjLxRnbIjig+Pr4IjxiJRll6FxUVo6Bgr1LK/KX3CNZTV2H68VRV3O7qjYiIQKGkmRXb9QMS0be5KxlO5uqlS5dUZ2+FhGLhspXw8bWEubryCY7s26Ou0Uv0EI85ADDksbGxKjruoK6uVs0FLGJP9HLVwXS9evUqa2clrNteDr/cA/NFg5GG0SsXL16UTnwx95e/tnVGBH7vDasCX9UpDWBkOAwvWbIEc+fOhbv41S/m40+bP1J14oleEhg1ahSmTZvGS0YRDnHHGJEJ9O6KFStsBVZQUADjiJGqA0ewM14rvv+NOmdOR0dHY+/evWqecRecJ7qqlwtak8mEoKAgnD17FqWlpRPUhMiOWFQ6eO4tDzrDM8lbx/u7iu7o9fZu2z+pjZUU7QQW7rx585SHma9FhfdUofk4dMx8fVReqrxJHD58WM05BJf97mL0mLEqKmvWrPFIL4u9srISR48exeXLl/XLNxmRWbC89DIz78mYec/ODiZtVx3oaHzWgCP7/6aucTjkKMICZYFz1XzmzBm4i78kfYKNH29RQ7AnejkJc866fv06L5lFPhT5IWd2Vj03JwaZyX/C/Js4caLq4Pq1HHyV8wUKxXMFt/LwedpnoqBSKaQHmdMkwmUKly8+Pj4vGexsZvfz98fosZHqLQpnbHf0co/ETJCaUGQEG0W2kav9PMKhTBUuQWP1kYQGM3/DxfNsHzNmjLqHqcB2/uJLIl3Bp9Z1lbt6Od+wyFkfMvzOsBKxTYhGCg1jJ/qMrc8V9mAKsCaomPfyGS4eN23a5NHikfMI11kcfj3Ry6HXX6JJMhIZEzr4zYTMNOlEEy+on4T5LSmk7du3T4kUpe0aRQzQj9W/hWSZoiUnJ2vl5eVafX29ErZJHWi5d75RkpVzQ/tg+W812cK2+/nZmd4dO3Zos2fPbqdXSOjHic4clWi9gZMk/zbxgOey2VKCtr8h2a5ZHUAk6G00XmZgLT8/30Zkz99THQlUoe2vGR3qXb16tbZ06dLO9DqF0e54le4tSSW9wwQn98KRkBNJt94T2Jle2VRpI0aMcFevS1BZrp0RuR50YoJlB1dllW3Wtl7R+3+AhBJOK36k0gAAAABJRU5ErkJggg==";
    const defaultIndustries =
      "data:image/png;base64,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";

    switch (inId) {
      case 6:
        return automobiles;
      case 10:
        return Catering;
      case 16:
        return engineering;
      case 31:
        return factory;
      case 35:
        return oil_pump;
      case 37:
        return storage_stacks;
      case 57:
        return petrochemical;
      case 60:
        return crucible;
      case 66:
        return construction;
      case 78:
        return corporation;
      case 82:
        return hotel;

      default:
        return defaultIndustries;
    }
  };

  let x = 3;
  if (isMobile) {
    x = 1;
  } else if (isMobile2) {
    x = 2;
  } else {
    x = 3;
  }
  const containerRef = useRef(null);
  // Handle scrolling to next/previous review

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const itemWidth = container.offsetWidth;
      const newIndex =
        direction === "next"
          ? Math.min(currentIndex + 1, carouselData.length - 1)
          : Math.max(currentIndex - 1, 0);

      container.scrollTo({
        left: newIndex * itemWidth,
        behavior: "smooth",
      });
      setCurrentIndex(newIndex);
    }
  };

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const HandleSubscribeSubmit = async () => {
    if (err === 0) {
      setopenLoader(true);
      const email = document.getElementById("mce-EMAIL").value;
      const res = await Contactservice.SaveSubScription(email);
      // console.log(res)
      if (res.isSuccess) {
        setopenLoader(false);
        ShowAlert(1, res.message);
        setValue("EMAIL", "");
        setErr(0);
      } else {
        setopenLoader(false);
        ShowAlert(0, res.message);
      }
    }
  };

  function handleEmailValidation2(val) {
    if (val) {
      const email = val;
      const emailRegx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (emailRegx.test(email)) {
        document.getElementById("idxEmailPatternError2").innerHTML = "";
        setErr(0);
      } else {
        document.getElementById("idxEmailPatternError2").innerHTML =
          "Please enter a valid email";
        setErr(1);
      }
    } else {
      document.getElementById("idxEmailPatternError2").innerHTML = "";
    }
  }

  useEffect(() => {
    document.title =
      "HuntsJob - Jobs - Blue Collar Jobs - Resume Builder - Recruitment - Recruiter - Job Search -  Employment - Job Vacancies";
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
      >
        <NewLoader />
      </Backdrop>

      <Modal
        show={loginShow}
        size="lg"
        onHide={handleLoginClose}
        animation={true}
      >
        <LoginModal CallbackRes={CloseModal} />
      </Modal>

      <Modal show={show} size="lg" onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Details_For_Apply")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ApplyJobModal
            jobPostingID={jpid}
            TriggerModalClose={CloseChildModal}
            TriggerCloseModal={CloseCandidateModal}
            IsApplied={true}
          />
        </Modal.Body>
      </Modal>

      <>
        <div
          id="idxToastContainer"
          className="feedback fbackpos"
          style={{ zIndex: 1 }}
          onClick={handleappdownload}
        ></div>
        <ToastContainerModal
          // position='top-end'
          style={{ zIndex: 1, top: "40%", right: "3%", position: "fixed" }}
        >
          <Toast
            onClose={() => setToast(false)}
            autohide
            ref={wrapperRef}
            show={showToast}
            delay={2200000}
          >
            <Toast.Header style={{ justifyContent: "end" }}> </Toast.Header>
            {/* <Toast.Body>
              <div className="row">
                <div className="col-8">
                  <p>Download Android / iOS App</p>
                  <div className="row"> 
                    <div className="col-6">
                      <Link onClick={onclickapp}>
                        <img src={appstore} alt="mobileapp" />
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to="https://play.google.com/store/apps/details?id=com.googlesignexbee"
                        target="blank"
                      >
                        <img src={playstore} alt="mobileapp" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <img
                    style={{
                      width: "50%",
                      height: "100%",
                      marginLeft: "25%",
                    }}
                    src={mobileappScreenshot}
                    alt="mobileappScreenshot"
                  />
                </div>
              </div>
            </Toast.Body> */}
          </Toast>
        </ToastContainerModal>
        <Layout>
          {/* <LoginRegisterToastTemplate /> */}
          <>
            <section
              className="hero-header"
              style={{
                backgroundImage: `url(${WebImage})`,
                //   backgroundColor: "#ff923942",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(100%)",
              }}
            >
              {showImage && (
                <>
                  {showUploadResume && (
                    <div>
                      {/* Hidden file input */}

                      <div
                        className={`uploadResume ${animateOut ? "animate-out" : ""
                          }`}
                        onClick={handleButtonClick}
                        title="Upload Resume"
                      >
                        <div class="overlap-group">
                          <div class="rectangle"></div>
                          <img class="img" alt="Resume Upload" src={shape} />
                          <div class="text-wrapper">Upload your Resume</div>
                          <div class="group">
                            <i className="bx bx-upload" alt="Free Resume Builder"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showHideUploadResume && (
                    <div>
                      {/* Hidden file input */}

                      <div className="upload-container">
                        <div
                          className="hideUploadResume"
                          title="Upload Resume"
                          onClick={handleButtonClick}
                        >
                          <i className="bx bx-upload" alt="Free Resume Builder"></i>
                        </div>

                        <div
                          className="hoverUploadResume"
                          title="Upload Resume"
                          onClick={handleButtonClick}
                        >
                          <div class="overlap-group">
                            <div class="rectangle"></div>
                            <img class="img" src={shape} alt="Resume Upload" />
                            <div class="text-wrapper">Upload your Resume</div>
                            <div class="group">
                              <i className="bx bx-upload" alt="Free Resume Builder"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              {showImage2 && (
                <>
                  {showUploadResume && (
                    <div>
                      {/* Hidden file input */}

                      <div
                        className={`uploadResume ${animateOut ? "animate-out" : ""
                          }`}
                        onClick={handleButtonClickUpdate}
                        title="Update your Resume"
                      >
                        <div class="overlap-group">
                          <div class="rectangle"></div>
                          <img class="img" src={shape} alt="Resume Update" />
                          <div class="text-wrapper">Update your Resume</div>
                          <div class="group">
                            <i className="bx bx-upload" alt="Free Resume Builder"></i>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                  {showHideUploadResume && (
                    <div>
                      {/* Hidden file input */}

                      <div className="upload-container">
                        <div
                          className="hideUploadResume"
                          title="Update your Resume"
                          onClick={handleButtonClickUpdate}
                        >
                          <i className="bx bx-upload" alt="Free Resume Builder"></i>
                        </div>

                        <div
                          className="hoverUploadResume"
                          title="Update your Resume"
                          onClick={handleButtonClickUpdate}
                        >
                          <div class="overlap-group">
                            <div class="rectangle"></div>
                            <img class="img" src={shape} alt="Resume Update" />
                            <div class="text-wrapper">Update your Resume</div>
                            <div class="group">
                              <i className="bx bx-upload" alt="Free Resume Builder"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div className="container d-flex ">
                <div
                  className="row"
                  style={{ borderRadius: "15px", minWidth: "47.5%" }}
                >
                  <div className="col-md-12">
                    {isMobile2 ? (
                      <>
                        <h1
                          style={{
                            fontSize: "clamp(1.5rem, 4vw, 4rem)",
                            fontWeight: "700",
                            color: "#2E475D",
                          }}
                        >
                          {t("Find Your")}{" "}
                          <span style={{ color: "#FE5C35" }}>
                            {t("Dream Job")}{" "}
                          </span>{" "}
                          Today!
                        </h1>
                        <p
                          style={{
                            fontSize: "clamp(1rem, 4vw, 1rem)",
                            fontWeight: "400",
                            color: "#2E475D",
                          }}
                        >
                          {t("HomeSubHeading")}
                        </p>
                      </>
                    ) : (
                      <>
                        <h1
                          style={{
                            fontSize: "clamp(1.3rem, 4vw, 4rem)",
                            fontWeight: "700",
                            color: "#2E475D",
                            textAlign: "left",
                          }}
                        >
                          Find Your{" "}
                          <span style={{ color: "#FE5C35" }}>
                            {t("Dream Job")}{" "}
                          </span>
                        </h1>
                        <h1
                          style={{
                            fontSize: "clamp(1.3rem, 4vw, 4rem)",
                            fontWeight: "700",
                            color: "#2E475D",
                            textAlign: "left",
                          }}
                        >
                          Today!
                        </h1>
                        <p
                          style={{
                            fontSize: "clamp(1rem, 4vw, 1rem)",
                            fontWeight: "400",
                            color: "#2E475D",
                            textAlign: "left",
                          }}
                        >
                          {t("HomeSubHeading")}
                        </p>
                      </>
                    )}

                    <div className="search-container">
                      <div className="skill-search input-group">
                        <i className="icon bx bx-search"></i>
                        <HomeSearchInput
                          options={options}
                          setOptions={setOptions}
                          selectedOptions={selectedOptions}
                          setSelectedOptions={setSelectedOptions}
                          onChange={(e) => handleInputChange(e.target.value)}
                          handlejobSearch={handlejobSearch}
                        />
                      </div>
                      <button
                        className="btn btn-primary"
                        id="idxSearchBtn"
                        title="Please enter skills / designations and click here to get new jobs"
                        onClick={handlejobSearch}
                      >
                        {t("Search")}
                      </button>
                      <div
                        className={
                          KeyWordsList.length > 0
                            ? "search-datalist-div"
                            : "searchlist-hidden"
                        }
                      >
                        <ul className="searchlist">
                          {KeyWordsList.map((keyword, i) => (
                            <li
                              onMouseDown={() => onClickKeywordHandler(keyword)}
                              className="datalist-list"
                              key={i}
                            >
                              {keyword}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div
                      className="row gx-0 d-flex align-items-center  animate__animated"
                      id="countboxmain"
                      style={{ marginTop: "50px", gap: "4%" }}
                    >
                      {mesage.map((item, i) => (
                        <div
                          key={i}
                          id="wow-container"
                          className=" wow col-lg-2 "
                          data-wow-delay="0.6s"
                          style={{
                            visibility: "visible",
                            // animationDelay: "0.6s",
                            // animationName: "zoomIn",
                            color: "white",
                            border: "1px solid white",
                            borderRadius: "15px",
                            padding: "10px",
                          }}
                        >
                          <div
                            className="d-flex align-items-center justify-content-center p-2"
                            style={{ height: "45px" }}
                          >
                            <div className="col-lg-3 col-2 col-sm-2 col-xs-2">
                              <img
                                src={IconsForCountShow(i + 1)}
                                alt={`Job Icon ${i + 1}`}
                                style={{ width: "40px", height: "40px" }}
                              />
                            </div>
                            <div className="col-lg-9 col-4 col-sm-2 col-xs-2 ps-2">
                              <h6
                                className="mb-0 fw-bold"
                                style={{
                                  whiteSpace: "nowrap",
                                  fontSize: "clamp(0.5rem, 1vw, 0.6rem)",
                                  color: "#2E475D",
                                }}
                              >
                                {item.Name.replace('handled', '')}:
                              </h6>
                              <h2
                                className="mb-0"
                                data-toggle="counter-up"
                                style={{ fontSize: "15px" }}
                              >
                                <CountUp
                                  style={{
                                    color: "#2E475D",
                                    fontWeight: "bolder",
                                  }}
                                  start={0}
                                  end={item.Count}
                                  duration={5}
                                />
                              </h2>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {!isMobile ? (
                  <div className="RightLanImage" style={{ margin: "0 8%" }}>
                    <img
                      src={RightLanImage}
                      alt="Description of Image"
                      className="img-fluid1"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </section>
          </>

          <div style={{ overflow: "hidden", background: "white" }}>
            {/* old  */}
            {/* <PopularCategories
              top10Industries={top10Industries}
              t={t}
              isMobile={isMobile}
              handleTop5Industries={handleTop5Industries}
              handleIndustriesiconOnload={handleIndustriesiconOnload}
            /> */}

            <PopularCategories
              top10Industries={top10Industries}
              isMobile={isMobile}
              handleTop5Industries={handleTop5Industries}
              handleIndustriesiconOnload={handleIndustriesiconOnload}
              t={t}
              width="300px"
            />

            <TrendingJobs
              hotjobs={hotjobs}
              x={x}
              t={t}
              handleOnclickJobDetailsPage={handleOnclickJobDetailsPage}
              handleSaveJobClick={handleSaveJobClick}
              href={href} />

            <div
              className="container"
              id="ImagFill"
              style={{
                display: "flex",
                minHeight: "50vh",
                justifyContent: "center",
                alignItems: "center",
                padding: "50px 15px",
                marginBottom: "50px",
              }}
            >
              <div className="row" style={{ justifyContent: "center" }}>
                {!isMobile ? (
                  <div className="col-lg-6 fisiimag">
                    <div
                      style={{
                        position: "relative",
                        width: "327.505px",
                        height: "413.298px",
                      }}
                    >
                      <img
                        className="firstimag"
                        src={Rectangle77}
                        alt="Job Hiring Now Near Me"
                      />
                      <img
                        className="secondimag"
                        src={Rectangle78}
                        alt="Job Hiring Near Me"
                      />
                    </div>
                  </div>
                ) : (
                  <div class="flip-box" style={{ marginBottom: "115px" }}>
                    <div class="flip-box-inner">
                      <div class="flip-box-front">
                        <img
                          src={Rectangle78}
                          alt="Job Hiring Near Me"
                          style={{ height: "auto" }}
                        />
                      </div>
                      <div class="flip-box-back">
                        <img
                          src={Rectangle78}
                          alt="Job Hiring Near Me"
                          style={{ height: "auto" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-lg-6 d-flex flex-column justify-content-between">
                  <h1
                    style={{
                      color: "#2E475D",
                      fontFamily: "Nunito Sans",
                      fontSize: "48px",
                      fontWeight: "700",
                      fontSize: isMobile2 ? "clamp(2rem, 4vw, 4rem)" : "48px",
                      textAlign: isMobile2 ? "center" : "unset",
                    }}
                  >
                    <span style={{ color: "#FE5C35" }}> {t("Huntsjob")}: </span>
                    {t("Create A Better Future For Yourself")}
                  </h1>

                  <p
                    style={{
                      color: "#2E475D",
                      fontFamily: "Nunito Sans",
                      fontSize: "20px",
                      fontWeight: "400",
                      fontSize: isMobile2 ? "clamp(1rem, 4vw, 1rem)" : "20px",
                      textAlign: isMobile2 ? "center" : "unset",
                    }}
                  >
                    {t("SuccessStatus")}
                  </p>

                  <div class="container" style={{ paddingLeft: "0px" }}>
                    <div class="row">
                      <div
                        class="col"
                        style={{
                          paddingLeft: "0px",
                          flex: window.innerWidth <= 550 ? "auto" : "",
                        }}
                      >
                        <div
                          class="d-flex align-items-center"
                          style={{ marginBottom: "5px" }}
                        >
                          <i
                            class="bx bxs-check-circle"
                            alt="Apply For Job"
                            style={{
                              color: "#E15973",
                              padding: "5px",
                              fontSize: "50px",
                            }}
                          ></i>
                          <span style={{ marginLeft: "10px" }}>
                            {t("Hassle-Free")}
                          </span>
                        </div>
                      </div>
                      <div
                        class="col"
                        style={{
                          paddingLeft: "0px",
                          flex: window.innerWidth <= 550 ? "auto" : "",
                        }}
                      >
                        <div class="d-flex align-items-center">
                          <i
                            class="bx bxs-check-circle"
                            alt="Apply For Job"
                            style={{
                              color: "#6D52D3",
                              padding: "5px",
                              fontSize: "50px",
                            }}
                          ></i>
                          <span style={{ marginLeft: "10px" }}>
                            {t("Work Across Top Countries")}
                          </span>
                        </div>
                      </div>
                      <div class="w-100"></div>
                      <div
                        class="col"
                        style={{
                          paddingLeft: "0px",
                          flex: window.innerWidth <= 550 ? "auto" : "",
                        }}
                      >
                        <div
                          class="d-flex align-items-center"
                          style={{ marginBottom: "5px" }}
                        >
                          <i
                            class="bx bxs-check-circle"
                            alt="Apply For Job"
                            style={{
                              color: "#E69024",
                              padding: "5px",
                              fontSize: "50px",
                            }}
                          ></i>
                          <span style={{ marginLeft: "10px" }}>
                            {t("Top Global Employers")}
                          </span>
                        </div>
                      </div>
                      <div
                        class="col"
                        style={{
                          paddingLeft: "0px",
                          flex: window.innerWidth <= 550 ? "auto" : "",
                        }}
                      >
                        <div class="d-flex align-items-center">
                          <i
                            class="bx bxs-check-circle"
                            alt="Apply For Job"
                            style={{
                              color: "#0dcb76",
                              padding: "5px",
                              fontSize: "50px",
                            }}
                          ></i>
                          <span style={{ marginLeft: "10px" }}>
                            {t("Diverse Job Roles")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="container d-flex  justify-content-center"
              style={{ marginBottom: "50px" }}
            >
              <div class="row">
                <div className="col-lg-6 d-flex flex-column justify-content-between">
                  <h1
                    style={{
                      color: "#2E475D",
                      fontFamily: "Nunito Sans",
                      fontSize: "48px",
                      fontWeight: "700",
                      fontSize: isMobile2 ? "clamp(2rem, 4vw, 4rem)" : "48px",
                      textAlign: isMobile2 ? "center" : "unset",
                    }}
                  >
                    {t("Craft a")}
                    <span style={{ color: "#FE5C35" }}> {t("Resume")} </span>
                    {t("That Stands Out")}
                  </h1>
                  <p
                    style={{
                      color: "#2E475D",
                      fontFamily: "Nunito Sans",
                      fontSize: "20px",
                      fontWeight: "400",
                      fontSize: isMobile2 ? "clamp(1rem, 4vw, 1rem)" : "20px",
                      textAlign: isMobile2 ? "center" : "unset",
                    }}
                  >
                    {t("ResumeD")}
                  </p>
                  <div class="container">
                    <div class="row">
                      <div class="col" style={{ paddingLeft: "0" }}>
                        <div
                          class="d-flex align-items-start"
                          style={{ marginBottom: "5px" }}
                        >
                          <i
                            class="bx bxs-check-circle"
                            alt="Create Your Resume"
                            style={{ color: "#FE5C35", fontSize: "20px" }}
                          ></i>
                          <span style={{ marginLeft: "10px" }}>
                            {t("Easy To use")}
                          </span>
                        </div>
                      </div>
                      <div class="col">
                        <div class="d-flex align-items-start">
                          <i
                            class="bx bxs-check-circle"
                            alt="Create Your Resume"
                            style={{ color: "#FE5C35", fontSize: "20px" }}
                          ></i>
                          <span style={{ marginLeft: "10px" }}>
                            {t("Gets you compliments")}
                          </span>
                        </div>
                      </div>
                      <div class="w-100"></div>
                      <div class="col" style={{ paddingLeft: "0" }}>
                        <div
                          class="d-flex align-items-start"
                          style={{ marginBottom: "5px" }}
                        >
                          <i
                            class="bx bxs-check-circle"
                            alt="Create Your Resume"
                            style={{ color: "#FE5C35", fontSize: "20px" }}
                          ></i>
                          <span style={{ marginLeft: "10px" }}>
                            {t("Free basic template")}
                          </span>
                        </div>
                      </div>
                      <div class="col">
                        <div class="d-flex align-items-start">
                          <i
                            class="bx bxs-check-circle"
                            alt="Create Your Resume"
                            style={{ color: "#FE5C35", fontSize: "20px" }}
                          ></i>
                          <span style={{ marginLeft: "10px" }}>
                            {t("ATS-friendly")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="resumeBuilderButtonClass">
                    <button
                      type="submit"
                      className="btn btn-outline-primary text-black"
                      style={{ borderRadius: "14px" }}
                      onClick={() => navigate("/resume-builder")}
                    >
                      {t("CreateResume")}
                      <i
                        className="bx bxs-right-arrow-alt"
                        style={{
                          borderRadius: "50%",
                          background: "#FE5C35",
                          color: "white",
                          padding: "2px",
                          marginLeft: "3px",
                        }}
                      ></i>
                    </button>
                  </div>
                </div>

                <div class="col-lg-6 d-flex flex-column justify-content-center">
                  <img
                    src={FrameResume}
                    alt="Free ATS Friendly Resume Builder"
                    class="resume-img"
                  />
                </div>

                <div className="resumeBuilderButtonClass2  text-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-outline-primary text-black"
                    style={{ borderRadius: "14px" }}
                    onClick={() => navigate("/resume-builder")}
                  >
                    {t("CreateResume")}
                    <i
                      className="bx bxs-right-arrow-alt"
                      alt="Build Your Resume"
                      style={{
                        borderRadius: "50%",
                        background: "#FE5C35",
                        color: "white",
                        padding: "2px",
                        marginLeft: "3px",
                      }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>

            {!isMobile ? (
              <section className="section-companies">
                <div className="title-container">
                  <div class="section" style={{ paddingBottom: "50px" }}>
                    <div class="heading">
                      <span style={{ color: "#FE5C35" }}>
                        {t("Get Your Dream Job")}{" "}
                      </span>
                      {t("In 4 Easy Steps")}
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="number-container">
                    <div className="number">
                      <div className="number-half" style={{ color: "orange" }}>
                        01
                      </div>
                      <div className="number-text">
                        <h1 style={{ color: "#2E475D" }}>
                          {t("Create Account")}
                        </h1>
                        <p>{t("Step1")} </p>
                        <img
                          src={image_11}
                          alt="Resume Maker"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="number">
                      <div
                        className="number-half"
                        style={{ color: "yellowgreen" }}
                      >
                        02
                      </div>
                      <div className="number-text">
                        <h1 style={{ color: "#2E475D" }}>
                          {t("Upload Resume")}
                        </h1>
                        <p>{t("Step2")}</p>
                        <img
                          src={image_10}
                          alt="Resume Builder"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="number">
                      <div
                        className="number-half"
                        style={{ color: "darkviolet" }}
                      >
                        03
                      </div>
                      <div className="number-text">
                        <h1 style={{ color: "#2E475D" }}>{t("Find Jobs")}</h1>
                        <p>{t("Step3")}</p>
                        <img
                          src={image_12}
                          alt="CV Builder"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="number">
                      <div
                        className="number-half"
                        style={{ color: "darkcyan" }}
                      >
                        04
                      </div>
                      <div className="number-text">
                        {" "}
                        <h1 style={{ color: "#2E475D" }}>{t("Apply Job")}</h1>
                        <p>{t("Step4")}</p>
                        <img
                          src={image_13}
                          alt="Free Resume Builder"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            <div
              className="container-fluid"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <div class="container qrContainer d-flex justify-content-center">
                <div class="row w-100">
                  <div className="col-12 text-center">
                    <h1
                      className="h1qr"
                      style={{ fontSize: "clamp(3rem, 2vw, 4rem)" }}
                    >
                      {t("Download")}{" "}
                      <span style={{ color: "#FE5C35" }}>
                        {" "}
                        {t("HuntsJob App!")}
                      </span>
                    </h1>
                  </div>{" "}
                  <div className="app-container">
                    <img
                      className="downloadImage"
                      style={{
                        width: "45%",
                        paddingRight: "30px",
                      }}
                      src={Download}
                      alt="Download"
                    />
                    <div class="vl"></div>
                    <div class="col-10 col-md-3 col-sm-6 d-flex flex-column align-items-center ">
                      <div>{t("Scan QR to download")}</div>
                      <img
                        src={image18}
                        alt="QRCODE"
                        style={{
                          maxWidth: "100%",
                          height: "150px",
                          marginTop: "40px",
                        }}
                      />
                    </div>

                    <div class="col-10 col-md-4 d-flex flex-column align-items-center">
                      <div>{t("Subscribe to get job updates")}</div>
                      <div class="formContainer" bis_skin_checked="1">
                        <form
                          className="footer-form needs-validation"
                          onSubmit={handleSubmit(HandleSubscribeSubmit)}
                          style={{ height: "65px", margin: "27px auto" }}
                        >
                          {" "}
                          <fieldset class="fieldInput">
                            <input
                              type="email"
                              className="form-input"
                              placeholder="Enter your email"
                              name="EMAIL"
                              id="mce-EMAIL"
                              required="required"
                              {...register("EMAIL")}
                              onChange={(e) =>
                                handleEmailValidation2(e.target.value)
                              }
                            />
                            <button
                              type="submit"
                              class="form-submit"
                              id="mc-submit"
                            >
                              Submit
                            </button>
                          </fieldset>
                          <span
                            class="text-danger f13"
                            id="idxEmailPatternError2"
                          ></span>
                        </form>
                      </div>
                      <div class="row w-100">
                        <div className="social-container text-center">
                          <Link
                            to="https://play.google.com/store/apps/details?id=com.googlesignexbee"
                            target="blank"
                          >
                            <img
                              style={{ width: "65%", paddingLeft: "10px" }}
                              src={playstore}
                              alt="mobileapp"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="title-container">
              <div class="section">
                <div class="heading">
                  <span style={{ color: "#FE5C35" }}>{t("Testimonials")} </span>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="testbg">
                <div
                  className="testbgbox text-center"
                  style={{ color: "black", marginTop: "64px" }}
                  ref={containerRef}
                >
                  <div className="review">
                    <p
                      style={{
                        fontFamily: "cursive",
                        fontSize: isMobile2
                          ? "clamp(0.8rem, 1vw, 4rem)"
                          : "1.1em",
                      }}
                    >
                      {carouselData[currentIndex].quote}
                    </p>
                  </div>
                  <div className="stars">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index}>
                        {index < carouselData[currentIndex].rating ? "⭐" : "☆"}
                      </span>
                    ))}
                  </div>
                  <div className="name">
                    <p
                      style={{
                        fontSize: isMobile2
                          ? "clamp(0.8rem, 1vw, 4rem)"
                          : "1.5em",
                      }}
                    >
                      {carouselData[currentIndex].name}
                    </p>
                  </div>
                </div>

                {/* Dots Container */}
                {!isMobile2 && (
                  <div
                    className="dots-container"
                    style={{ textAlign: "center", marginTop: "20px" }}
                  >
                    {carouselData.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${index === currentIndex ? "active" : ""
                          }`}
                        onClick={() => handleDotClick(index)}
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "10px",
                          margin: "0 5px",
                          backgroundColor:
                            index === currentIndex ? "#FE5C35" : "#ddd",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                      ></span>
                    ))}
                  </div>
                )}

                {/* Mobile Navigation Buttons */}
                {isMobile2 && (
                  // <div className="mobile-nav-buttons">

                  // </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{
                      // Align items to the right
                      gap: "5px", // Add spacing between the buttons
                      marginTop: "10px",
                    }}
                  >
                    <div>
                      <button
                        className="arrow-button"
                        onClick={() => handleScroll("prev")}
                        disabled={currentIndex === 0}
                      >
                        <i class="bx bx-chevron-left"></i>
                      </button>
                    </div>
                    <div>
                      <button
                        className="arrow-button"
                        onClick={() => handleScroll("next")}
                        disabled={currentIndex === carouselData.length - 1}
                      >
                        <i class="bx bx-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="container">
              <div className="section-header text-center mt-5">
                <div class="section" style={{ paddingBottom: "30px" }}>
                  <div class="heading">
                    <span style={{ color: "#FE5C35" }}>{t("Companies")} </span>
                    {t("Actively Hiring")}
                  </div>
                </div>
                <p style={{ color: "#190905" }}>
                  {t("Companies Actively Hiring_Descp")}
                </p>
              </div>
              <div className="row mb-4">
                <Carousel cols={8} rows={1} gap={4}>
                  {clientImgs
                    ? clientImgs.map((item, i) => (
                      <Carousel.Item key={i}>
                        <div className="card-slide card">
                          <div
                            title={item.ClientName}
                            className="card-body client-card shadow-sm mb-1"
                            style={{ cursor: "text", textAlign: "center" }}
                          >
                            <div className="logo">
                              <img
                                src={isContainDataBase64(
                                  item.Base64File,
                                  item.ContentType
                                )}
                                style={{ width: "100px", height: "50px" }}
                                alt="logo"
                              />
                            </div>
                          </div>
                        </div>
                      </Carousel.Item>
                    ))
                    : null}
                </Carousel>
              </div>
            </div>

          </div>
        </Layout>
      </>
    </>
  );
};
export default HomePage;
