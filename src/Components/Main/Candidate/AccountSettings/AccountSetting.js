import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../../Layout/Layout";
import UserPng from "../../../../assets/imgs/user.png";
import { ToastContainer, toast } from "react-toastify";
import { ProfileService } from "../../../../Services/Profile/ProfileService";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { CandidateRegService } from "../../../../Services/CanRegistration/CandidateRegService";
import { AuthService } from "../../../../Services/AuthService";
import { useForm } from "react-hook-form";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import "./AccountSettings.css";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


function AccountSettings() {
  const [whatsappCheckBox, setWhatsappCheckBox] = useState(true);
  const [emailCheckBox, setemailCheckBox] = useState(true);
  const [smsCheckBox, setSmsCheckBox] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [messageBackground, setMessageBackground] = useState("");
  const [NotificationMessage, setNotificationMessage] = useState("");
  const state = {
    open1: false,
    vertical: "top",
    horizontal: "center",
  };
  const { vertical, horizontal } = state;
  const { t } = useTranslation();
  const [countryDD, setCountryDD] = useState([]);
  const [showprofileImage, setprofileImageShow] = useState(false);
  const handleProfileImageClose = () => setprofileImageShow(false);
  const handleProfileImageShow = () => setprofileImageShow(true);
  const navigate = useNavigate();
  const [profilePercentage, setProfilePercentage] = useState(0);
  const [generalInfo, setGeneralInfo] = useState([]);

  const [openLoader, setopenLoader] = React.useState(false);
  const {
    register,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  /* mobile email update*/
  const notificationRef = useRef();
  /* mobile email update end*/

  const handleLeftMenuClick = (e, tag, ref) => {
    // window.location = tag;
    switch (ref) {
      case "notificationRef":
        window.scrollTo(0, notificationRef.current.offsetTop - 87);
        break;
      default:
        break;
    }
    const parentEl = document.getElementsByClassName("ul-parent");
    const childCount = parentEl[0].childNodes.length;
    for (let i = 0; i < childCount; i++) {
      parentEl[0].childNodes[i].childNodes[0].classList.remove("active");
    }
    e.target.classList.add("active");
  };

  const initProfilePercentage = async () => {
    const res1 =
      await ProfileService.getProfileByIDGetCandidateProfilePercentageCaculation();
    const percentage = JSON.parse(res1.apiData);
    setProfilePercentage(parseInt(percentage[0].ProfilePercentage));
    let bar = parseInt(percentage[0].ProfilePercentage);
    document.getElementById("progress").style.width = bar + "%";
  };

  const initProfileData = async () => {
    try {
      setopenLoader(true);
      const res = await ProfileService.getProfileByID();
      const profile = JSON.parse(res.apiData);
      setGeneralInfo(profile.Table[0]);
      const userName = profile.Table[0].CandidateFirstName;
      const documents = profile.Table5;
      let iBase64File = "";
      if (documents && documents.length > 0) {
        for (let i = 0; i < documents.length; i++) {
          const url = IsNullOrEmpty(documents[i].PreSignedUrl)
            ? ""
            : documents[i].PreSignedUrl;
          if (!IsNullOrEmpty(url)) {
            iBase64File = await AuthService.download_file_from_s3(url);
            if (iBase64File.includes("<?xml")) {
              iBase64File = "";
            }
            if (!IsNullOrEmpty(iBase64File)) {
              documents[i].PreSignedUrl = iBase64File;
              if (documents[i].DocType === 12) {
                var image1 = document.getElementById("output1");
                image1.src = iBase64File;
                AuthService.set_userImage_And_pic(userName, image1.src);
              }
            }
          }
        }
      }
      initProfilePercentage();
      setopenLoader(false);
    } catch (error) {
      setopenLoader(false);
    }
  };

  const initCountry = async () => {
    try {
      const cu = await CandidateRegService.getCountryList();
      if (cu.isSuccess) {
        setCountryDD(JSON.parse(cu.data));
      } else {
        setCountryDD([]);
      }
    } catch (error) { }
  };

  const getEmail = () => {
    setValue("emailid", generalInfo.CandidateEmailID);

  };
  const getMobileNo = () => {
    countryDD.filter(function (f) {
      if (parseInt(f.value) === generalInfo.CountryID) {
        var cuSelected = {
          label: f.label,
          value: f.value,
          MaxMobilelength: f.MaxMobilelength,
          MinMobilelength: f.MinMobilelength,
        };
      }
    });
    setValue("mobile-no", generalInfo.CandidateMobileNo);
  };


  const IsNullOrEmpty = (v) => {
    if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
      return true;
    } else {
      return false;
    }
  };

  const clickToviewProfileImage = () => {
    if (
      AuthService.get_userImage_Or_pic(2) === "" ||
      AuthService.get_userImage_Or_pic(2) === undefined ||
      AuthService.get_userImage_Or_pic(2) === null
    ) {
      handleProfileImageClose();
    } else {
      handleProfileImageShow();
    }
  };

  // //function to set notification permissions
  // const handleNotificationMessage = (type, e) => {
  //   console.log(AuthService.getCurrentUser().referenceID);
  //   axios
  //     .post(
  //       "http://localhost:4000/api/notifications/setNotificationPermission",
  //       {
  //         id: AuthService.getCurrentUser().referenceID,
  //         type: type,
  //         value: e.target.checked,
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.result) {
  //         switch (e.target.id) {
  //           case "whatsappId":
  //             setMessageBackground(whatsappCheckBox ? "error" : "success");
  //             setWhatsappCheckBox(!whatsappCheckBox);
  //             setOpenAlert(true);
  //             setNotificationMessage(
  //               whatsappCheckBox
  //                 ? "Whatsapp messages will not be sent "
  //                 : "Whatsapp Message Service is on you will Receive Notification"
  //             );
  //             break;
  //           case "emailId":
  //             setMessageBackground(emailCheckBox ? "error" : "success");
  //             setemailCheckBox(!emailCheckBox);
  //             setOpenAlert(true);
  //             setNotificationMessage(
  //               emailCheckBox
  //                 ? "Email messages will not be sent "
  //                 : "Email Message Service is on you will Receive Notification"
  //             );
  //             break;
  //             break;
  //           case "smsId":
  //             setMessageBackground(smsCheckBox ? "error" : "success");
  //             setSmsCheckBox(!smsCheckBox);
  //             setOpenAlert(true);
  //             setNotificationMessage(
  //               smsCheckBox
  //                 ? "Sms messages will not be sent "
  //                 : "Sms Message Service is on you will Receive Notification"
  //             );
  //             break;

  //           default:
  //             break;
  //         }
  //       } else {
  //         // alert("issue in backend");
  //         toast.error("Network error", {
  //           toastId: "",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Network error check internet connection", {
  //         toastId: "",
  //       });
  //     });
  // };

  // Function to debounce
  function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
      const context = this;

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  // Original function with debounce
  const handleNotificationMessage = debounce(async (type, e) => {
    try {
      const res = await ProfileService.setNotificationPermissionsByID({ canID: AuthService.getCurrentUser().referenceID, type: type, value: !e.target.checked });
      if (res.isSuccess) {
        switch (e.target.id) {
          case "whatsappId":
            setMessageBackground(whatsappCheckBox ? "error" : "success");
            setWhatsappCheckBox(!whatsappCheckBox);
            setOpenAlert(true);
            setNotificationMessage(
              whatsappCheckBox
                ? "Whatsapp messages will not be sent "
                : "Whatsapp Message Service is on you will Receive Notification"
            );
            break;
          case "emailId":
            setMessageBackground(emailCheckBox ? "error" : "success");
            setemailCheckBox(!emailCheckBox);
            setOpenAlert(true);
            setNotificationMessage(
              emailCheckBox
                ? "Email messages will not be sent "
                : "Email Message Service is on you will Receive Notification"
            );
            break;
          case "smsId":
            setMessageBackground(smsCheckBox ? "error" : "success");
            setSmsCheckBox(!smsCheckBox);
            setOpenAlert(true);
            setNotificationMessage(
              smsCheckBox
                ? "Sms messages will not be sent "
                : "Sms Message Service is on you will Receive Notification"
            );
            break;

          default:
            break;
        }
      } else {
        alert("issue in backend");
        toast.error("Network error", {
          toastId: "",
        });
      }
    }
    catch (err) {
      console.log(err);
      toast.error("Network error check internet connection", { toastId: "",});
    }
  }, 500);


  //function to get notification permissions
  const getNotificationMessage = async () => {
    try {
      const res = await ProfileService.getNotificationPermissionsByID();
      if (res.isSuccess) {
        const data = JSON.parse(res.apiData)
        console.log("🚀 ~ getNotificationMessage ~ data:", data)
        
        setWhatsappCheckBox(data[0].IsWhatsAppPermissionGranted);
        setemailCheckBox(data[0].IsEmailPermissionGranted);
        setSmsCheckBox(data[0].IsSMSPermissionGranted);
      }
    }
    catch (err) {
      console.log(err);
      //alert("issue in backend");
    }


    // axios
    //   .get(
    //     `http://localhost:4000/api/notifications/GetNotificationPermission?id=${id}`
    //   )
    //   .then((res) => {
    //     console.log(res.data.data);
    //     setWhatsappCheckBox(res.data.data.IsWhatsAppPermissionGranted);
    //     setemailCheckBox(res.data.data.IsEmailPermissionGranted);
    //     setSmsCheckBox(res.data.data.IsSMSPermissionGranted);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // alert("issue in backend");
    //   });
  };

  const handleSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    initProfilePercentage();
    initCountry();
    if (AuthService.isAuthenticatedUser()) {
      initProfileData();
      getNotificationMessage();
    } else {
      navigate({
        pathname: "/",
      });
    }
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* View Profile Image Modal */}
      <Modal
        show={showprofileImage}
        onHide={handleProfileImageClose}
        animation={true}
        centered
        size="md"
        closeButton
      >
        <span onClick={handleProfileImageClose} id="close">
          ✖
        </span>
        <img
          src={AuthService.get_userImage_Or_pic(2)}
          style={{ width: "100%" }}
          alt=""
        />
      </Modal>
      {/* View Profile Image Modal */}

      <Layout>
        <section>
          <div className="container mt-5">
            {/* Profile Header Start*/}
            <div className="profile-information-items shadow-sm">
              <div className="item">
                <div
                  className="avatar"
                  style={{ cursor: "pointer" }}
                  onClick={() => clickToviewProfileImage()}
                >
                  <img src={UserPng} id="output1" alt="" />
                </div>
                <div className="content">
                  <div className="header">
                    <h4>{generalInfo.CandidateFirstName}</h4>
                    <button className="btn btn-link btn-sm"></button>
                  </div>
                  <p>
                    {generalInfo.CandidateCurrentPosition}
                    <br />
                  </p>
                </div>
              </div>
              <div className="item">
                <ul>
                  <li>
                    <i className="icon bx bxs-phone"></i>{" "}
                    <span>
                      {" "}
                      {generalInfo.CountryISDCode ? (
                        <span>(+{generalInfo.CountryISDCode})</span>
                      ) : null}
                      {generalInfo.CandidateMobileNo}
                    </span>
                    {generalInfo.IsMobileVerified ? (
                      <div className="badge ">
                        <i class='bx bxs-check-circle' style={{ color: "#00BA00", fontSize: "20px" }}></i>
                        {/* {t("Verified")} */}
                      </div>
                    ) : (
                      <div
                        className="badge bg-primary"
                        onClick={() => getMobileNo()}
                        data-bs-target="#mobileModal"
                        style={{ cursor: "pointer" }}
                      >
                        {t("Verify")}
                      </div>
                    )}
                  </li>
                  {generalInfo.CandidateEmailID ? (
                    <li className="emailFlex">
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <i className="icon bx bxs-envelope me-1"></i>
                      {generalInfo.CandidateEmailID}
                      {generalInfo.IsEmailVerified ? (
                        <div className="badge">
                          <i
                            class="bx bxs-check-circle"
                            style={{ color: "#00BA00", fontSize: "20px" }}
                          ></i>
                          {/* {t("Verified")} */}
                        </div>
                      ) : (
                        ""
                      )}
                    </span>
                    {!generalInfo.IsEmailVerified ? (
                      <div
                        className="badge2 bg-primary "
                        onClick={() => getEmail()}
                        data-bs-target="#emailModal"
                        style={{ cursor: "pointer" }}
                      >
                        {t("Verify")}
                      </div>
                    ) : (
                      ""
                    )}
                  </li>
                  ) : (
                    <li>
                      <i className="icon bx bxs-envelope"></i>
                      <span>{t("Add_Email")}</span>
                      <div
                        className="badge bg-primary"
                        onClick={() => getEmail()}
                        data-bs-target="#emailModal"
                        style={{ cursor: "pointer" }}
                      >
                        {t("Add")}
                      </div>
                    </li>
                  )}
                </ul>
              </div>
              <div className="item">
                <div className="status-container">
                  <div className="status-header">
                    <div className="status-start">
                      {t("Profile_status")}
                      {profilePercentage === 100 ? (
                        <div className="badge bg-success">
                          <i className="bx bxs-check-circle"></i>
                          {t("Completed")}
                        </div>
                      ) : (
                        <div
                          className="badge bg-primary"
                          style={{ whiteSpace: "break-spaces" }}
                        >
                          {t("Pending_Actions")}
                        </div>
                      )}
                    </div>
                    <div className="status-end">{profilePercentage}%</div>
                  </div>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={profilePercentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div className="progress-bar" id="progress"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Profile Header End*/}
            <div className="row">
              {/* Profile Left Menu Start*/}
              <div className="col-md-3 mb-4 mb-md-0">
                <div className="card card-navigation shadow-sm">
                  <div className="card-header">
                    <h5 className="card-title">Account Setting</h5>
                  </div>
                  <ul className="card-body p-0 ul-parent">
                    <li
                      onClick={(e) =>
                        handleLeftMenuClick(e, "#notificationPermission", "notificationRef")
                      }
                    >
                      <a className="active" style={{ cursor: "pointer" }}>
                        {t("Notification Permission")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Profile Left Menu End*/}
              <div className="col-md-9 mb-4 mb-md-0">
                {/* Notification Permission Start */}
                <div
                  className="card card-information card-profile shadow-sm"
                  id="notificationPermission"
                  ref={notificationRef}
                >
                  <div className="card-header">
                    <h5 className="card-title">
                      {t("Notification_Permissions")}
                    </h5>
                    
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="label mediaHeading mb-4">
                        {t("turnOnOff")}
                      </div>
                      <div className="col-sm-4 mb-4">
                        <div className="social-icon">
                          <WhatsAppIcon color="success" sx={{ fontSize: 30 }} />
                          <div class="form-check form-switch">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="whatsappId"
                              checked={whatsappCheckBox}
                              onChange={(e) => handleNotificationMessage(3, e)}
                            />
                          </div>
                        </div>
                        {/* notificationMessage component start  */}
                        <Snackbar
                          anchorOrigin={{ vertical, horizontal }}
                          open={openAlert}
                          autoHideDuration={8000}
                          onClose={handleSnackBar}
                        >
                          <Alert
                            onClose={handleSnackBar}
                            severity={messageBackground}
                            variant="filled"
                            sx={{ width: "100%" }}
                          >
                            {NotificationMessage}
                          </Alert>
                        </Snackbar>
                        {/* notificationMessage component end  */}
                        <div className="value">
                          <span>Whatsapp</span>
                        </div>
                      </div>
                      <div className="col-sm-4 mb-4">
                        <div className="value">
                          <div className="social-icon">
                            <EmailIcon color="success" sx={{ fontSize: 30 }} />
                            <div class="form-check form-switch">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="emailId"
                                checked={emailCheckBox}
                                onChange={(e) =>
                                  handleNotificationMessage(2, e)
                                }
                              />
                            </div>
                          </div>
                          <div className="value">
                            <span>Email</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 mb-4">
                        <div className="value">
                          <div className="social-icon">
                            <SmsIcon color="success" sx={{ fontSize: 30 }} />
                            <div class="form-check form-switch">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="smsId"
                                checked={smsCheckBox}
                                onChange={(e) =>
                                  handleNotificationMessage(1, e)
                                }
                              />
                            </div>
                          </div>
                          <div className="value">
                            <span>Sms</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Notification Permission End */}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default AccountSettings;
