import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import OtpInput from 'react-otp-input';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from "react-router-dom";
import Select from 'react-select';
import { CommonService } from "../../../Services/CommonService";
import { ProfileService } from "../../../Services/Profile/ProfileService";
import { CandidateRegService } from "../../../Services/CanRegistration/CandidateRegService";
import { ToastContainer, toast } from 'react-toastify';
import '../../../assets/css/styles.css';
import '../../../assets/css/developer.css';
import ReactStopwatch from 'react-stopwatch';
import { useTranslation } from 'react-i18next';
import ForgotPassword from '../../LogIn/ForgotPassword';
import LoginModal from '../../LogIn/LoginModal';
import { AuthService } from "../../../Services/AuthService";

function RegisterGeneral({ TriggerCallBackResponse, triggerFileInput }) {
  const { t } = useTranslation();
  const ShowAlert = (type, message) => {
    if (type === 1) {
      toast.success(message, {
        toastId: '',
      })
    } else {
      toast.error(message, {
        toastId: '',
      })
    }
  }
  const search = useLocation().search;
  const navigate = useNavigate();
  const { register, setValue, clearErrors, watch, formState: { errors }, handleSubmit } = useForm();
  const [isPsdMatch, setisPsdMatch] = useState(true);
  const [iCurrentPOSList, setiCurrentPOSList] = useState([]);
  const [iNationalityList, setiNationalityList] = useState([]);
  const [iCurrentLocationList, setiCurrentLocationList] = useState([]);
  const [countryDD, setCountryDD] = useState([]);
  const [countryvalue, setCountryvalue] = useState([]);
  const [fileValidationErrorMessage, setfileValidationErrorMessage] = useState("");
  const maxFileSize = 1024 * 1024 * 3;
  const [mobileAVColor, setmobileAVColor] = useState("#1bc23f");
  const [emailAVColor, setemailAVColor] = useState("#1bc23f");
  const [emailAvailableMessage, setemailAvailableMessage] = useState("");
  const [mobileAvailableMessage, setmobileAvailableMessage] = useState("");
  const [openLoader, setopenLoader] = useState(false);
  const [show, setshow] = useState(false);
  const [mobileAvailableModal, setmobileAvailableModal] = useState(false);
  const [mobileoremailHeader, setmobileoremailHeader] = useState("");
  const [forgotPaswdModalShow, setforgotPaswdModalShow] = useState(false);
  const [loginModalShow, setloginModalShow] = useState(false);
  const [mobileOtp, setmobileOtp] = useState('');
  const [emailOtp, setemailOtp] = useState('');
  const [candidateID, setcandidateID] = useState("");
  const [isPhoneOrEmail, setisPhoneOrEmail] = useState(false);
  const [isMobileOtpVerified, setisMobileOtpVerified] = useState(false);
  const [isEmailOtpVerified, setisEmailOtpVerified] = useState(false);
  const [isShowMobileCountryCodeErr, setisShowMobileCountryCodeErr] = useState(false);
  const [socilaUser, setsocilaUser] = useState({});
  const [iPosValue, setiPosValue] = useState([]);
  const [iNationalityValue, setiNationalityValue] = useState([]);
  const [iCurrentLocationValue, setiCurrentLocationValue] = useState([]);
  const [resumeName] = useState("DOC, DOCx, PDF");
  const [countryId, setCountryId] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobilesec, setMobileSeconds] = useState(20);
  const [emailsec, setEmailSeconds] = useState(20);
  const [mobOtpTime, setmobOtpTime] = useState(true);
  const [emailOtpTime, setemailOtpTime] = useState(true);
  const [mobOTPResendButton, setMobOTPResendButton] = useState(false);
  const [emailOTPResendButton, setEmailOTPResendButton] = useState(false);
  const [loginProcessValue, setloginProcessValue] = useState([]);
  const [waChangedValue, setWaChangedValue] = useState(0);

  const handleClose = () => {
    setshow(false);
  }
  const handleOTPChange = async (v, type) => {
    if (!IsNullOrEmpty(v)) {
      v = v.replace(/[^0-9]/g, '');
      if (type === 1) {
        setmobileOtp(v);
      } else {
        setemailOtp(v)
      }
    }
  }
  const validateOTP = async (type) => {
    if (type === 1) {
      if (!IsNullOrEmpty(mobileOtp)) {
        if (parseInt(mobileOtp.length) === 6) {
          const res = await CandidateRegService.verify_Registration_OTP(mobileOtp, candidateID, "1");
          if (res.isSuccess) {
            setmobOtpTime(false);
            setisMobileOtpVerified(true);
            ShowAlert(1, res.message);
            if (isPhoneOrEmail) {
              if (isEmailOtpVerified) {
                setshow(false);
                // navigate({
                //   pathname: '/registration/step2',
                //   search: "?qs=" + candidateID,
                // });
                TriggerCallBackResponse(2, candidateID, loginProcessValue);
              }
            } else {
              setshow(false);
              try {
                const res = await AuthService.LoginUser(loginProcessValue.mobileno, loginProcessValue.countryid, loginProcessValue.password, "")
              } catch (error) {

              }
              // navigate({
              //   pathname: '/registration/step2',
              //   search: "?qs=" + candidateID,
              // });
              TriggerCallBackResponse(2, candidateID, loginProcessValue);
              navigate("/register?isp=1");
            }
          } else {
            ShowAlert(0, res.message);
          }

        } else {
          ShowAlert(0, "Please enter 6 digit mobile otp")
        }
      } else {
        ShowAlert(0, "Please enter mobile otp")
      }
    } else {
      if (!IsNullOrEmpty(emailOtp)) {
        if (parseInt(emailOtp.length) === 6) {
          const res = await CandidateRegService.verify_Registration_OTP(emailOtp, candidateID, "2");
          if (res.isSuccess) {
            setemailOtpTime(false);
            setisEmailOtpVerified(true);
            ShowAlert(1, res.message);
            if (isPhoneOrEmail) {
              if (isMobileOtpVerified) {
                setshow(false);
                // navigate({
                //   pathname: '/registration/step2',
                //   search: "?qs=" + candidateID,
                // });
                TriggerCallBackResponse(2, candidateID, loginProcessValue);
              }
            } else {
              setshow(false);
              // navigate({
              //   pathname: '/registration/step2',
              //   search: "?qs=" + candidateID,
              // });
              TriggerCallBackResponse(2, candidateID, loginProcessValue);
            }
          } else {
            ShowAlert(0, res.message);
          }

        } else {
          ShowAlert(0, "Please enter 6 digit email otp")
        }
      } else {
        ShowAlert(0, "Please enter email otp")
      }
    }

  }
  const handleStep1Submit = async (d) => {
    const ddErrorCount = checkDDValidation();
    if (ddErrorCount > 0) {
      return false;
    }
    let base64ResumeString = "";
    let fileName = "";
    if (d.resume.length > 0) {
      const file = d.resume[0];
      fileName = file.name;
      let fileExt = fileName.split('.').pop().toLowerCase();
      if (fileExt === 'doc' || fileExt === "docx" || fileExt === "pdf") {
        setfileValidationErrorMessage("");
        base64ResumeString = await blobToBase64DataURL(file);
      } else {
        setfileValidationErrorMessage("Resume extension should be in .doc,.docx or .pdf ");
        return false;
      }
    }
    let sXml = "";
    if (socilaUser) {
      if (socilaUser.ID !== undefined && socilaUser.ID !== null && socilaUser.ID !== "") {
        sXml += "<Soc>";
        sXml += "<SocDetails>";
        sXml += "<SocialID>" + socilaUser.ID + "</SocialID>";
        sXml += "<FirstName>" + socilaUser.fName !== undefined ? socilaUser.fName : "" + "</FirstName>";
        sXml += "<LastName>" + socilaUser.lName !== undefined ? socilaUser.lName : "" + "</LastName>";
        sXml += "<Email>" + socilaUser.email !== undefined ? socilaUser.email : "" + "</Email>";
        sXml += "<ProfilePic>" + socilaUser.pic !== undefined ? socilaUser.pic : "" + "</ProfilePic>";
        sXml += "</SocDetails>";
        sXml += "</Soc>";
      }
    }
    let errCount = 0;
    if (countryvalue.value === 0 || countryvalue.value === undefined && !IsNullOrEmpty(d.mobile)) {
      errCount += 1
      setisShowMobileCountryCodeErr(true);
      document.getElementById("idxMobileError").innerHTML = "";
    } else if (countryvalue.value != 0 && IsNullOrEmpty(d.mobile)) {
      errCount += 1
      document.getElementById("idxMobileError").innerHTML = "Please enter mobile number";
      setisShowMobileCountryCodeErr(false);
    } else {
      errCount += 0;
      document.getElementById("idxMobileError").innerHTML = "";
      setisShowMobileCountryCodeErr(false);
    }
    let localexpy = d.localExpFrom ? parseInt(d.localExpFrom) : 0;
    let localExpm = d.localExpTo ? parseInt(d.localExpTo) : 0;
    let overExpy = d.overseasExfrom ? parseInt(d.overseasExfrom) : 0;
    let overExpm = d.overseasExTo ? parseInt(d.overseasExTo) : 0;
    if (localexpy === 0 && localExpm === 0) {
      errCount += 0;
    } else {
      errCount += 0;
    }
    let totalLocalExperienceMonths = (parseInt(localexpy) * 12) + parseInt(localExpm);
    let totalOverseasExperienceMonths = (parseInt(overExpy) * 12) + parseInt(overExpm);
    let totalExperienceMonths = totalLocalExperienceMonths + totalOverseasExperienceMonths;
    if (totalExperienceMonths > 35 * 12) {
      ShowAlert(0, "Total experience cannot exceed 35 years.");
      setopenLoader(false);
      errCount += 1;
    } else {
      errCount += 0;
    }
    setCountryId(parseInt(countryvalue.value));
    setMobileNo(d.mobile);
    setEmailId(d.email);

    if (errCount === 0) {

      const registerStep1ReqData = {
        Name: d.name,
        EmailID: d.email,
        CountryID: parseInt(countryvalue.value),
        MobileNo: d.mobile,
        Password: d.password,
        CurrentPosition: iPosValue.label,
        DomExperienceYears: d.localExpFrom ? parseInt(d.localExpFrom) : 0,
        DomExperienceMonths: d.localExpTo ? parseInt(d.localExpTo) : 0,
        OverExperienceYears: d.overseasExfrom ? parseInt(d.overseasExfrom) : 0,
        OverDomExperienceMonths: d.overseasExTo ? parseInt(d.overseasExTo) : 0,
        Nationality: parseInt(iNationalityValue.value),
        CurrentLoc: parseInt(iCurrentLocationValue.value),
        ResumeFile: base64ResumeString,
        FileName: fileName,
        AppType: "Web",
        Source: "",
        Social: sXml,
      }
      try {
        setopenLoader(true);
        const data = await CandidateRegService.save_Registration_Step1(registerStep1ReqData);
        if (data.isSuccess) {
          setTimeout(() => {
            setMobOTPResendButton(true);
          }, 20000);
          // if (!IsNullOrEmpty(registerStep1ReqData.EmailID)) {
          //   setisPhoneOrEmail(true);
          //   setTimeout(() => {
          //     setEmailOTPResendButton(true);
          //   }, 20000);
          // }
          ShowAlert(1, data.message);
          setcandidateID(data.data);
          setloginProcessValue({ "mobileno": registerStep1ReqData.MobileNo, "password": registerStep1ReqData.Password, "countryid": registerStep1ReqData.CountryID });
          setshow(true);
          // if (parseInt(countryvalue.value) === 1) {
          //   setshow(true);
          // } else {
          //   TriggerCallBackResponse(2, data.data, { "mobileno": registerStep1ReqData.MobileNo, "password": registerStep1ReqData.Password, "countryid": registerStep1ReqData.CountryID });
          // }
        } else {
          ShowAlert(0, data.message);
        }
        setopenLoader(false);
      } catch (error) {
        setopenLoader(false);
      }
    }

  }
  const hanleOnchangewa = (e) => {
    try {
      if (e) {
        setWaChangedValue(1);
        console.log(1)
      }
      else {
        setWaChangedValue(0);
        console.log(0)
      }
    } catch (error) {

    }

  }
  const submitClick = () => {
    checkDDValidation();
  }
  const checkDDValidation = () => {
    let errCount = 0;
    if (countryvalue && countryvalue.value) {
      setisShowMobileCountryCodeErr(false);
    } else {
      setisShowMobileCountryCodeErr(true);
    }
    if (iPosValue && iPosValue.value) {
      document.getElementById("idxCurrentPosError").innerHTML = "";
    } else {
      document.getElementById("idxCurrentPosError").innerHTML = "Please select current position";
      errCount += 1;
    }
    if (iNationalityValue && iNationalityValue.value) {
      document.getElementById("idxNationalityError").innerHTML = "";
    } else {
      document.getElementById("idxNationalityError").innerHTML = "Please select nationality";
      errCount += 1;
    }
    if (iCurrentLocationValue && iCurrentLocationValue.value) {
      document.getElementById("idxCurrLocError").innerHTML = "";
    } else {
      document.getElementById("idxCurrLocError").innerHTML = "Please select location";
      errCount += 1;
    }
    return errCount;
  }
  const handleNameChange = (v) => {
    if (!IsNullOrEmpty(v)) {
      if (!errors.name?.type === 'required' || errors.name?.type === undefined)
        document.getElementById("idxNameError").innerHTML = "";
      const splCharRegx = new RegExp(/^[a-zA-Z_. ]+$/);
      if (!splCharRegx.test(v)) {
        if (errors.name?.type === 'pattern') {
        } else {
          document.getElementById("idxPatternerror").innerHTML = "Numeric and special characters not allowed except (. & _)";
        }
        v = v.replace(/[^a-zA-Z_. ]/g, "");
        document.getElementById("idxName").value = v;
      } else {
        if (!errors.name?.type === 'pattern' || errors.name?.type === undefined)
          document.getElementById("idxPatternerror").innerHTML = "";
      }
    } else {
      if (!errors.name?.type === 'required' || errors.name?.type === undefined)
        document.getElementById("idxNameError").innerHTML = "Please enter name";
    }
  }

  const handleNameFocusOut = (v) => {
    if (!IsNullOrEmpty(v)) {
      if (!errors.name?.type === 'required' || errors.name?.type === undefined)
        document.getElementById("idxNameError").innerHTML = "";
      const splCharRegx = new RegExp(/^[a-zA-Z_. ]+$/);
      if (!splCharRegx.test(v)) {
        if (errors.name?.type === 'pattern') {
        } else {
          document.getElementById("idxPatternerror").innerHTML = "Numeric and special characters not allowed except (. & _)";
        }
      } else {
        if (!errors.name?.type === 'pattern' || errors.name?.type === undefined)
          document.getElementById("idxPatternerror").innerHTML = "";
      }
    } else {
      if (!errors.name?.type === 'required' || errors.name?.type === undefined)
        document.getElementById("idxNameError").innerHTML = "Please enter name";
    }
  }
  const handleEmailChange = (v) => {
    if (!IsNullOrEmpty(v)) {
      if (!errors.email?.type === 'required' || errors.email?.type === undefined)
        document.getElementById("idxEmailError").innerHTML = "";
      const emailRegx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (!emailRegx.test(v)) {
        setemailAvailableMessage("");
        if (errors.email?.type === 'pattern') {
        } else {
          document.getElementById("idxEmailPatternError").innerHTML = "Please enter a valid email";
        }
      } else {
        isEmailOrMobileAvailable(0, v, 2);
        if (!errors.email?.type === 'pattern' || errors.email?.type === undefined)
          document.getElementById("idxEmailPatternError").innerHTML = "";
      }
    } else {
      document.getElementById("idxEmailPatternError").innerHTML = "";
    }
  }
  const handleEmailFocusOut = (v) => {
    if (!IsNullOrEmpty(v)) {
      if (!errors.email?.type === 'required' || errors.email?.type === undefined)
        document.getElementById("idxEmailError").innerHTML = "";
      const emailRegx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (!emailRegx.test(v)) {
        if (errors.email?.type === 'pattern') {
        } else {
          document.getElementById("idxEmailPatternError").innerHTML = "Please enter a valid email";
        }
      } else {
        if (!errors.email?.type === 'pattern' || errors.email?.type === undefined)
          document.getElementById("idxEmailPatternError").innerHTML = "";
      }
    } else {
      // if (!errors.email?.type === 'pattern' || errors.email?.type === undefined)
      //     document.getElementById("idxEmailError").innerHTML = "Please Enter email";
    }
  }
  const handleSelectCountry = (selectedOption) => {
    if (selectedOption) {
      setCountryvalue(selectedOption);
      setisShowMobileCountryCodeErr(false);
      let val = document.getElementById("idxMobile").value;
      if (!IsNullOrEmpty(val)) {
        if (!errors.mobile?.type === 'required' || errors.mobile?.type === undefined)
          document.getElementById("idxMobileError").innerHTML = "";
      } else {
        if (!errors.mobile?.type === 'required')
          document.getElementById("idxMobileError").innerHTML = "Please enter mobile number";
      }
      if (val.length === selectedOption.MaxMobilelength && selectedOption.value) {
        isEmailOrMobileAvailable(selectedOption.value, val, 1);
      } else {
        setmobileAvailableMessage("");
      }
    } else {
      setCountryvalue([]);
      setmobileAvailableMessage("");
      let val = document.getElementById("idxMobile").value;
      if (!IsNullOrEmpty(val)) {
        setisShowMobileCountryCodeErr(true);
      } else {
        setisShowMobileCountryCodeErr(false);
        if (!errors.mobile?.type === 'required' || errors.mobile?.type === undefined)
          document.getElementById("idxMobileError").innerHTML = "";
      }
    }
  }
  const handleMobileChange = (v) => {
    if (!IsNullOrEmpty(v)) {
      v = v.replace(/[^0-9]/g, '');
      setValue("mobile", v);
      if (countryvalue.value) {
        setisShowMobileCountryCodeErr(false);
      } else {
        setisShowMobileCountryCodeErr(true);
      }
      if (v.length === countryvalue.MaxMobilelength && countryvalue.value) {
        isEmailOrMobileAvailable(countryvalue.value, v, 1);
      } else {
        setmobileAvailableMessage("");
      }
      if (!errors.mobile?.type === 'required' || errors.mobile?.type === undefined)
        document.getElementById("idxMobileError").innerHTML = "";
    } else {
      setmobileAvailableMessage("");
      if (countryvalue.value) {
        if (!errors.mobile?.type === 'required')
          document.getElementById("idxMobileError").innerHTML = "Please enter mobile number";
      } else {
        setisShowMobileCountryCodeErr(false);
        if (!errors.mobile?.type === 'required' || errors.mobile?.type === undefined)
          document.getElementById("idxMobileError").innerHTML = "";
      }
      if (!errors.mobile?.type === 'required')
        document.getElementById("idxMobileError").innerHTML = "Please enter mobile number";
    }
  }
  const handleMobileFocusOut = (v) => {
    if (!IsNullOrEmpty(v)) {
      if (!errors.mobile?.type === 'required' || errors.mobile?.type === undefined)
        document.getElementById("idxMobileError").innerHTML = "";
    } else {
      if (!errors.mobile?.type === 'required' || errors.mobile?.type === undefined)
        document.getElementById("idxMobileError").innerHTML = "Please enter mobile number";
    }
  }

  const handlePassowrdChange = (v) => {
    if (v === null || v === undefined || v === "") {
      document.getElementById('idxConfPassword').readOnly = true;
    } else {
      document.getElementById('idxConfPassword').readOnly = false;
    }
    if (!IsNullOrEmpty(v)) {
      if (!errors.password?.type === 'required' || errors.password?.type === undefined)
        document.getElementById("idxPasswordError").innerHTML = "";

      if (v.length < 6) {
        if (!errors.password?.type === 'required' || errors.password?.type === undefined)
          document.getElementById("idxPasswordError").innerHTML = "Password length must be min 6 characters";
      }
      else if (v.length === 20) {
        if (!errors.password?.type === 'required' || errors.password?.type === undefined)
          document.getElementById("idxPasswordError").innerHTML = "Password length must be max 20 characters";
      }
      else {
        if (!errors.password?.type === 'required' || errors.password?.type === undefined)
          document.getElementById("idxPasswordError").innerHTML = "";
      }
    } else {
      if (!errors.password?.type === 'required' || errors.password?.type === undefined)
        document.getElementById("idxPasswordError").innerHTML = "Please enter password";
      document.getElementById("idxPsdPatternError").innerHTML = "";
    }
  }
  const handlePassowrdFocusOut = (v) => {
    if (!IsNullOrEmpty(v)) {
      if (!errors.password?.type === 'required' || errors.password?.type === undefined)
        document.getElementById("idxPasswordError").innerHTML = "";

    } else {
      if (!errors.password?.type === 'required' || errors.password?.type === undefined)
        document.getElementById("idxPasswordError").innerHTML = "Please enter password";
      document.getElementById("idxPsdPatternError").innerHTML = "";
    }
  }
  const handleConfirmPasswordChange = (v) => {
    if (!IsNullOrEmpty(v)) {
      if (!errors.confirmPsd?.type === 'required' || errors.confirmPsd?.type === undefined) {
        document.getElementById("idxConfPsdError").innerHTML = "";
      }
      if (v !== document.getElementById('idxPassword').value) {
        setisPsdMatch(false);
      } else {
        setisPsdMatch(true);
      }

    } else {
      if (!errors.confirmPsd?.type === 'required' || errors.confirmPsd?.type === undefined)
        document.getElementById("idxConfPsdError").innerHTML = "Please enter confirm password";
      setisPsdMatch(true);
    }

  }
  const handleConfirmPasswordFocusOut = (v) => {
    if (!IsNullOrEmpty(v)) {
      if (!errors.confirmPsd?.type === 'required' || errors.confirmPsd?.type === undefined) {
        document.getElementById("idxConfPsdError").innerHTML = "";
      }
      if (v !== document.getElementById('idxPassword').value) {
        setisPsdMatch(false);
      } else {
        setisPsdMatch(true);
      }

    } else {
      if (!errors.confirmPsd?.type === 'required' || errors.confirmPsd?.type === undefined)
        document.getElementById("idxConfPsdError").innerHTML = "Please enter confirm password";
    }

  }
  const handleCurrPosChange = (v) => {
    if (!IsNullOrEmpty(v)) {
      setiPosValue(v);
      document.getElementById("idxCurrentPosError").innerHTML = "";
    } else {
      setiPosValue([]);
      document.getElementById("idxCurrentPosError").innerHTML = "Please select current position";
    }
  }
  const handleCurrPosFocusOut = () => {
    if (iPosValue && iPosValue.value) {
      document.getElementById("idxCurrentPosError").innerHTML = "";
    } else {
      document.getElementById("idxCurrentPosError").innerHTML = "Please select current position";
    }
  }

  // const handleNationalityChange = (v) => {
  //     if (!IsNullOrEmpty(v)) {
  //         if (!errors.nationality?.type === 'required' || errors.nationality?.type === undefined)
  //             document.getElementById("idxNationalityError").innerHTML = "";
  //     } else {
  //         if (!errors.nationality?.type === 'required' || errors.nationality?.type === undefined)
  //             document.getElementById("idxNationalityError").innerHTML = "Please select nationality";
  //     }
  // }
  const handleNationalityChange = (v) => {
    if (!IsNullOrEmpty(v)) {
      setiNationalityValue(v);
      document.getElementById("idxNationalityError").innerHTML = "";
    } else {
      setiNationalityValue([]);
      document.getElementById("idxNationalityError").innerHTML = "Please select nationality";
    }
  }
  const handleNationalityFocusOut = (v) => {
    if (iNationalityValue && iNationalityValue.value) {
      document.getElementById("idxNationalityError").innerHTML = "";
    } else {
      document.getElementById("idxNationalityError").innerHTML = "Please select nationality";
    }
  }
  const handleCurrLocChange = (v) => {
    if (!IsNullOrEmpty(v)) {
      setiCurrentLocationValue(v);
      document.getElementById("idxCurrLocError").innerHTML = "";
    } else {
      setiCurrentLocationValue([]);
      document.getElementById("idxCurrLocError").innerHTML = "Please select location";
    }
  }
  const handleCurrLocFocusOut = (v) => {
    if (iCurrentLocationValue && iCurrentLocationValue.value) {
      document.getElementById("idxCurrLocError").innerHTML = "";
    } else {
      document.getElementById("idxCurrLocError").innerHTML = "Please select location";
    }
  }
  const handleDomExpFromChange = (v) => {
    if (!IsNullOrEmpty(v)) {
      v = v.replace(/[^0-9]/g, '');
      setValue("localExpFrom", v);
      // if (!errors.localExpFrom?.type === 'required' || errors.localExpFrom?.type === undefined || errors.localExpFrom?.type === 0)
      //   document.getElementById("idxDomExpFromError").innerHTML = "";
    } else {
      // if (!errors.localExpFrom?.type === 'required')
      //   document.getElementById("idxDomExpFromError").innerHTML = "Please enter year";
    }
  }
  const handleDomExpFromFocusOut = (v) => {
    if (!IsNullOrEmpty(v)) {
      v = v.replace(/[^0-9]/g, '');
      if (parseInt(v) > 35) {
        v = 35;
      }
      if (IsNullOrEmpty(v) || parseInt(v) <= 0) {
        v = 0;
      }
      setValue("localExpFrom", v);
      // if (!errors.localExpFrom?.type === 'required' || errors.localExpFrom?.type === undefined)
      //   document.getElementById("idxDomExpFromError").innerHTML = "";
    } else {
      // if (!errors.localExpFrom?.type === 'required' || errors.localExpFrom?.type === undefined)
      //   document.getElementById("idxDomExpFromError").innerHTML = "Please enter year";
    }
  }
  const handleDomExpToChange = (v) => {
    if (!IsNullOrEmpty(v)) {
      v = v.replace(/[^0-9]/g, '');
      setValue("localExpTo", v);
    }
  }
  const handleOverseasExpToChange = (v) => {
    if (!IsNullOrEmpty(v)) {
      v = v.replace(/[^0-9]/g, '');
      setValue("overseasExTo", v);
    }
  }
  const handleDomExpToFocusOut = (v) => {
    if (!IsNullOrEmpty(v)) {
      v = v.replace(/[^0-9]/g, '');
      if (parseInt(v) > 11) {
        v = 11;
      }
      if (parseInt(v) <= 0) {
        v = 0;
      }
      setValue("localExpTo", v);
      if (!errors.localExpTo?.type === 'required' || errors.localExpTo?.type === undefined)
        document.getElementById("idxDomExpToError").innerHTML = "";
    } else {
      if (!errors.localExpTo?.type === 'required' || errors.localExpTo?.type === undefined)
        document.getElementById("idxDomExpToError").innerHTML = "Please enter domestic/local experience to";
    }
  }
  const handleOverExpFromChange = (v) => {
    if (!IsNullOrEmpty(v)) {
      v = v.replace(/[^0-9]/g, '');
      setValue("overseasExfrom", v);
    }
    // if (!errors.overseasExfrom?.type === 'required' || errors.overseasExfrom?.type === undefined)
    //     document.getElementById("idxOverExpFromError").innerHTML = "";
    // } else {
    //     if (!errors.overseasExfrom?.type === 'required')
    //         document.getElementById("idxOverExpFromError").innerHTML = "Please enter overseas/abroad experience";
    // }
  }
  const handleOverExpFromFocusOut = (v) => {
    if (!IsNullOrEmpty(v)) {
      v = v.replace(/[^0-9]/g, '');
      if (parseInt(v) > 35) {
        v = 35;
      }
      if (parseInt(v) <= 0) {
        v = 0;
      }
      setValue("overseasExfrom", v);
      // if (!errors.overseasExfrom?.type === 'required' || errors.overseasExfrom?.type === undefined)
      //     document.getElementById("idxOverExpFromError").innerHTML = "";
      // } else {
      //     if (!errors.overseasExfrom?.type === 'required' || errors.overseasExfrom?.type === undefined)
      //         document.getElementById("idxOverExpFromError").innerHTML = "Please enter overseas/abroad experience";
    }
  }
  const handleOverExpToFocusOut = (v) => {

    if (!IsNullOrEmpty(v)) {
      v = v.replace(/[^0-9]/g, '');
      if (parseInt(v) > 11) {
        v = 11;
      }
      if (parseInt(v) <= 0) {
        v = 0;
      }
      setValue("overseasExTo", v);
    }
  }
  const handleResumeUploadChange = (e) => {
    let file = e.target.files[0];
    document.getElementById("cancel-resume").style.display = "block";
    if (file) {
      if (file.size > 0) {
        if (file.size > maxFileSize) {
          setfileValidationErrorMessage("Resume size must be less than 3mb");
          return false;
        }
        let filename = file.name;
        document.getElementById("resume-name").innerHTML = filename;
        let fileExt = filename.split('.').pop().toLowerCase();
        if (fileExt === 'doc' || fileExt === "docx" || fileExt === "pdf") {
          setfileValidationErrorMessage("");
        } else {
          setfileValidationErrorMessage("Resume extension should be in .doc,.docx or .pdf ");
        }
      }
    } else {
      document.getElementById("resume-name").innerHTML =
        setfileValidationErrorMessage("");
    }
  }
  const togglePasswordShow = (inputID, iconID) => {
    let input = document.getElementById(inputID);
    let icon = document.getElementById(iconID);
    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("bx-show");
      icon.classList.add("bx-hide");
      icon.title = "hide password";
    } else {
      input.type = "password";
      icon.classList.remove("bx-hide");
      icon.classList.add("bx-show");
      icon.title = "show password";
    }
  }
  const IsNullOrEmpty = (v) => {
    if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
      return true;
    } else {
      return false;
    }
  }
  const numberOnly = (event) => {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  const blobToBase64DataURL = (blob) => new Promise(
    resolvePromise => {
      const reader = new FileReader();
      reader.onload = () => resolvePromise(reader.result);
      reader.readAsDataURL(blob);
    }
  )
  const initCurrentPositionList = async () => {
    const pos = await CandidateRegService.get_FAS_DropdownList();
    if (pos.isSuccess) {
      const d = JSON.parse(pos.data);
      setiCurrentPOSList(d);
    }
  }
  const initNationalityList = async () => {
    const nl = await CommonService.getNationalityList();
    nl ? setiNationalityList(nl) : setiNationalityList([]);
  }
  const initCurrentLocationList = async () => {
    const cLoc = await ProfileService.getLocationList();
    cLoc ? setiCurrentLocationList(cLoc) : setiCurrentLocationList([]);
  }
  const initCountry = async () => {
    const cu = await CandidateRegService.getCountryList();
    if (cu.isSuccess) {
      let countryList = JSON.parse(cu.data)
      setCountryDD(countryList)
      if (cu.ipcountryCode) {
        const selectedCountry = countryList.find(country => country.CountryAlphaCode === cu.ipcountryCode);
        if (selectedCountry) {
          const cuSelected = {
            label: selectedCountry.label,
            value: selectedCountry.value,
            MaxMobilelength: selectedCountry.MaxMobilelength,
            MinMobilelength: selectedCountry.MinMobilelength,
          };
          setCountryvalue(cuSelected);
          setisShowMobileCountryCodeErr(false);
        }
      }
    } else {
      setCountryDD([]);
    }
  }
  const isEmailOrMobileAvailable = async (cId, emailorMobile, type) => {
    if (!IsNullOrEmpty(emailorMobile)) {
      switch (type) {
        case 1:
          const res = await CandidateRegService.checkIsEmailOrMobileExist(cId, emailorMobile, "1");
          if (res.isSuccess) {
            setmobileAvailableMessage(res.message);
            setmobileAVColor("#1bc23f");
          } else {
            setmobileAvailableMessage(res.message);
            setmobileAVColor("#ff0000");
            setmobileAvailableModal(true);
            setmobileoremailHeader("Mobile number")
          }
          break;
        case 2:
          const res1 = await CandidateRegService.checkIsEmailOrMobileExist(cId, emailorMobile, "2");
          if (res1.isSuccess) {
            setemailAvailableMessage(res1.message);
            setemailAVColor("#1bc23f");
          } else {
            setemailAvailableMessage(res1.message);
            setemailAVColor("#ff0000");
            setmobileAvailableModal(true);
            setmobileoremailHeader("Email id")
          }
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case 1:
          setmobileAvailableMessage("");
          break;
        case 2:
          setemailAvailableMessage("");
          break;
        default:
          break;
      }
      setmobileAvailableMessage("");
      setemailAvailableMessage("");
    }

  }
  const cancelFileClick = () => {
    document.getElementById("cancel-resume").style.display = "none";
    document.getElementById("idxResume").value = null;
    document.getElementById("resume-name").innerHTML = resumeName;
    setfileValidationErrorMessage("");
  }

  const resendMobileOtp = async () => {
    try {
      setMobileSeconds(20);
      setMobOTPResendButton(false);
      setTimeout(() => {
        setMobOTPResendButton(true);
      }, 20100);
      const data = {
        ContactTypeID: 1,
        OTP: "",
        CandidateID: candidateID,
        Contact: mobileNo,
        CountryID: countryId
      }
      const res = await CandidateRegService.resendEmailOrMobileOTP(data);
      if (res.isSuccess) {
        ShowAlert(1, res.message);
      } else {
        ShowAlert(0, res.message);
      }
    } catch (error) {

    }
  }
  const resendEmailOtp = async () => {
    try {
      setEmailSeconds(20);
      setEmailOTPResendButton(false);
      setTimeout(() => {
        setEmailOTPResendButton(true);
      }, 20000);
      const data = {
        ContactTypeID: 2,
        OTP: "",
        CandidateID: candidateID,
        Contact: emailId
      }
      const res = await CandidateRegService.resendEmailOrMobileOTP(data);
      if (res.isSuccess) {
        ShowAlert(1, data.message);
      } else {
        ShowAlert(0, data.message);
      }
    } catch (error) {

    }
  }
  const handleForgotPaswdModalShowClick = () => {
    setforgotPaswdModalShow(true);
  }
  const handleLoginModalShowClick = () => {
    setloginModalShow(true);
  }
  const CloseFPModal = (res) => {
    if (res === 1) {
      setforgotPaswdModalShow(false);
      setloginModalShow(true);
    } else {
      setforgotPaswdModalShow(false);
    }
  }
  const CloseLoginModal = (res) => {
    if (res === 1) {
      setloginModalShow(false);
      navigate("/profiledashboard");
    } else {
      setloginModalShow(false);
    }
  }
  useEffect(() => {
    setsocilaUser({});
    try {
      const sUser = new URLSearchParams(search).get('s-user');
      if (!IsNullOrEmpty(sUser)) {
        const u = JSON.parse(atob(sUser));
        setsocilaUser(u);
        if (u.fullName) {
          setValue("name", u.fullName);
        }
        if (u.email) {
          setValue("email", u.email);
          isEmailOrMobileAvailable(0, u.email, 2);
        }
      }
    } catch (error) {
    }
    initCurrentPositionList();
    initNationalityList();
    initCurrentLocationList();
    initCountry();
  }, [])


  //RegisterGeneral

useEffect(() => {
  if (triggerFileInput) {
    localStorage.removeItem("triggerFileInput");
    document.getElementById("idxResume").click();
  }
}, [triggerFileInput]);


  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* otp modal start */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ marginTop: "4rem" }}

      >
        <Modal.Header>
          <Modal.Title className="text-center">
            <span className='text-primary'>OTP</span>
          </Modal.Title>
          {/* <button onClick={() => handleClose()} type="button" className="close">
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                    </button> */}
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {
              isPhoneOrEmail ?
                <React.Fragment>
                  <div className="col-md-3 mt-2">
                    <label className="control-label">Mobile OTP</label>
                  </div>
                  <div className="col-md-7 mt-2">
                    <OtpInput inputType="tel"
                      value={mobileOtp}
                      onChange={(e) => handleOTPChange(e, 1)}
                      numInputs={6}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} className='otpbox form-control p-0' />}
                    />
                  </div>
                  <div className="col-md-2 mt-2">
                    {
                      isMobileOtpVerified ?
                        <button type="button" className="btn btn-sm btn-success" disabled="true">
                          <i style={{ color: "#000 !important" }} className="fa fa-check" aria-hidden="true"></i> {t("Verified")}</button>
                        :
                        <button type="button" className="btn btn-sm btn-success" onClick={() => validateOTP(1)}>{t("Verify")}</button>
                    }

                  </div>
                  {
                    mobOtpTime ?
                      <ReactStopwatch
                        seconds={0}
                        minutes={0}
                        hours={0}
                        limit="00:00:20"
                        onChange={({ seconds }) => {
                          if (mobilesec > 0) setMobileSeconds(mobilesec - 1);
                        }}
                        render={({ seconds }) => {
                          return (
                            <div>
                              <p id="idxResendMO">Resend mobile OTP in:  {mobilesec != 0 ? <span id="idxMTimer" style={{ display: "inline" }}>{mobilesec} sec</span> : null} {mobOTPResendButton ? <a id="idxresendMOTP" onClick={() => resendMobileOtp()} className="btn-link" style={{ cursor: "pointer" }}>Resend?</a> : null}</p>
                            </div>
                          );
                        }}
                      /> : null
                  }
                  <div className="col-md-3 mt-2">
                    <label className="control-label">Email OTP</label>
                  </div>
                  <div className="col-md-7 mt-2">
                    <OtpInput inputType="tel"
                      value={emailOtp}
                      onChange={(e) => handleOTPChange(e, 2)}
                      numInputs={6}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} className='otpbox form-control p-0' />}
                    />
                  </div>
                  <div className="col-md-2 mt-2">
                    {
                      isEmailOtpVerified ?
                        <button type="button" className="btn btn-sm btn-success" disabled="true">
                          <i style={{ color: "#000 !important" }} className="fa fa-check" aria-hidden="true"></i> {t("Verified")}</button>
                        :
                        <button type="button" className="btn btn-sm btn-success" onClick={() => validateOTP(2)}>{t("Verify")}</button>
                    }

                  </div>
                  <label className="text-danger" id="idxOtpError"></label>
                  {
                    emailOtpTime ?
                      <ReactStopwatch
                        seconds={0}
                        minutes={0}
                        hours={0}
                        limit="00:00:20"
                        onChange={({ seconds }) => {
                          if (emailsec > 0) setEmailSeconds(emailsec - 1);
                        }}
                        render={({ seconds }) => {
                          return (
                            <div>
                              <p id="idxResendEO">Resend email OTP in: {emailsec != 0 ? <span id="idxETimer" style={{ display: "inline" }}>{emailsec} sec</span> : null} {emailOTPResendButton ? <a onClick={() => resendEmailOtp()} className="btn-link" style={{ cursor: "pointer" }} id="idxresendEOTP">Resend?</a> : null}</p>
                            </div>
                          );
                        }}
                      /> : null
                  }
                </React.Fragment>
                :
                <React.Fragment>
                  <div className="col-md-3 mt-2">
                    <label className="control-label">OTP</label>
                  </div>
                  <div className="col-md-7 mt-2">
                    <OtpInput inputType="tel"
                      value={mobileOtp}
                      onChange={(e) => handleOTPChange(e, 1)}
                      numInputs={6}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} className='otpbox form-control p-0' />}
                    />
                  </div>
                  <div className="col-md-2 mt-2">
                    <button type="button" className="btn btn-sm btn-success" onClick={() => validateOTP(1)}>{t("Verify")}</button>

                  </div>
                  <label className="text-danger" id="idxOtpError"></label>
                  {
                    mobOtpTime ?
                      <ReactStopwatch
                        seconds={0}
                        minutes={0}
                        hours={0}
                        limit="00:00:20"
                        onChange={({ seconds }) => {
                          if (mobilesec > 0) setMobileSeconds(mobilesec - 1);
                        }}
                        render={({ seconds }) => {
                          return (
                            <div>
                              <p>Resend OTP in: {mobilesec != 0 ? <span id="idxMTimer" style={{ display: "inline" }}>{mobilesec} sec</span> : null} {mobOTPResendButton ? <a id="idxresendMOTP" onClick={() => resendMobileOtp()} className="btn-link" style={{ cursor: "pointer" }}>Resend?</a> : null}</p>
                            </div>
                          );
                        }}
                      /> : null
                  }
                </React.Fragment>

            }

          </div>

        </Modal.Body>

      </Modal>
      {/* otp modal end */}

      {/* mobile number exist modal start */}
      <Modal
        show={mobileAvailableModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title className="text-center">
            <h2 className="modal-title fs-5 text-danger" >{mobileoremailHeader} is already registered.</h2>
          </Modal.Title>
          <button onClick={() => setmobileAvailableModal(false)} type="button" className="btn-close" aria-label="Close"></button>
        </Modal.Header>
        <ModalBody>
          <ul>
            <li>If you have forgotten your password<a className="btn btn-link" onClick={() => handleForgotPaswdModalShowClick()}>click here</a></li>
            <li>If you want to login<a className="btn btn-link" onClick={() => handleLoginModalShowClick()}>click here</a></li>
          </ul>
        </ModalBody>

      </Modal>
      {/* mobile number exist modal end */}

      {/* ForgotPassword Modal start */}
      <Modal
        centered
        show={forgotPaswdModalShow}
        size='lg'
        onHide={handleClose}
        animation={true}
      >
        <ForgotPassword CallbackFP={CloseFPModal} />
      </Modal>
      {/* ForgotPassword Modal end */}

      {/* Login Modal start */}
      <Modal Modal
        show={loginModalShow}
        size='lg'
        onHide={handleClose}
        animation={true}
        centered
      >
        <LoginModal CallbackRes={CloseLoginModal} />
      </Modal >
      {/* Login Modal end */}

      <div className="card-body-header">
        <h2 className="card-title flex-fill">{t("Register_Heading")}</h2>
      </div>
      <ul className="stepper">
        <li className="active"><a href="#"><i className='bx bx-circle'></i>{t("General")}</a></li>
        <li className=""><a href="#"><i className='bx bx-circle'></i>{t("Basic")}</a></li>
        <li><a href="#"><i className='bx bx-circle'></i>{t("Professional")}</a></li>
        <li><a href="#"><i className='bx bx-circle'></i>{t("Education")}</a></li>
        <li><a href="#"><i className='bx bx-circle'></i>{t("Personal")}</a></li>
      </ul>
      <h5 className="card-sub-title">{t("General_Info")}</h5>
      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit(handleStep1Submit)}>
        <div className="row">
          <div className="col-12 form-group">
            <label htmlFor="" className="form-label">{t("Name")} <span className="text-danger ">*</span></label>
            <input type="text"
              className="form-control"
              placeholder={t("Full_Name")}
              id="idxName"
              name="name"
              maxLength={30}
              {...register("name",
                {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z_. ]+$/,
                  },
                  onChange: (e) => { handleNameChange(e.target.value) },
                  onBlur: (e) => { handleNameFocusOut(e.target.value) }
                })
              }
            />
            {errors.name?.type === 'required' && <p className='text-danger mt-1 f13'>Please enter name</p>}
            {errors.name?.type === 'required' ? null : <span className="text-danger f13" id="idxNameError"></span>}
            {errors.name?.type === 'pattern' && <p className='text-danger mt-1 f13'>Numeric and special characters not allowed except (. & _)</p>}
            {errors.name?.type === 'pattern' ? null : <span className="text-danger f13" id="idxPatternerror"></span>}
          </div>
          <div className="col-md-5 form-group">
            <label htmlFor="" className="form-label">{t("Country_Code")}<span className="text-danger ">*</span></label>
            <Select
              placeholder={t("Select")}
              onChange={handleSelectCountry}
              value={countryvalue}
              options={countryDD}
              isClearable
            />
            {isShowMobileCountryCodeErr ? <p className='text-danger mt-1 f13'>Please select country</p> : null}
          </div>
          <div className="col-md-7 form-group">
            <label htmlFor="" className="form-label">{t("Mobile_number")} <span className="text-danger ">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder={t("Mobile_number")}
              id="idxMobile"
              name="mobile"
              maxLength={countryvalue.MaxMobilelength ? countryvalue.MaxMobilelength : 10}
              {...register("mobile",
                {
                  required: true,
                  onKeyPress: (e) => { numberOnly(e) },
                  onChange: (e) => { handleMobileChange(e.target.value) },
                  onBlur: (e) => { handleMobileFocusOut(e.target.value) }
                })
              }
            />

            {mobileAvailableMessage === "" ? null : <span className="f13" style={{ color: mobileAVColor }}>{mobileAvailableMessage}</span>}
            {errors.mobile?.type === 'required' && <p className='text-danger mt-1 f13'>Please enter mobile number</p>}
            {errors.mobile?.type === 'required' ? null : <span className="text-danger f13" id="idxMobileError"></span>}
          </div>
          {/* <div className="col-md-12 form-group">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="idxWACheckBox" defaultChecked="true" onChange={(e) => hanleOnchangewa(e.target.checked)} />
              <label className="form-check-label">
                <div id="fileHelpId" className="form-text"> May I confirm if your mobile number is registered with WhatsApp and if you'd like to receive notifications from WhatsApp?</div>
              </label>
            </div>
          </div> */}
          <div className="col-12 form-group">
            <label htmlFor="" className="form-label">{t("Email")}</label>
            <input type="text"
              className="form-control"
              placeholder="ex:youremailid@mail.com"
              id="idxEmail"
              name="email"
              maxLength={50}
              {...register("email",
                {
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                  },
                  onChange: (e) => { handleEmailChange(e.target.value) },
                  onBlur: (e) => { handleEmailFocusOut(e.target.value) }
                })
              }
            />
            {emailAvailableMessage === "" ? null : <span className="f13" style={{ color: emailAVColor }}>{emailAvailableMessage}</span>}
            {errors.email?.type === 'required' && <p className='text-danger mt-1 f13'>Please enter email</p>}
            {errors.email?.type === 'required' ? null : <span className="text-danger f13" id="idxEmailError"></span>}
            {errors.email?.type === 'pattern' && <p className='text-danger mt-1 f13'>Please enter a valid email</p>}
            {errors.email?.type === 'pattern' ? null : <span className="text-danger f13" id="idxEmailPatternError"></span>}
          </div>

          <div className="col-lg-6 form-group">
            <label htmlFor="" className="form-label">{t("Password")} <span className="text-danger ">*</span></label>
            <div className="input-group input-group-date">
              <input type="password"
                className="form-control"
                placeholder={t("Password")}
                id="idxPassword"
                name="password"
                minLength={6}
                maxLength={20}
                {...register("password",
                  {
                    // pattern: {
                    //   value: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/
                    // },
                    required: true,
                    onChange: (e) => { handlePassowrdChange(e.target.value) },
                    onBlur: (e) => { handlePassowrdFocusOut(e.target.value) }
                  })
                }
              />
              <span className="input-group-text" onClick={() => togglePasswordShow("idxPassword", "PsdID")} style={{ cursor: "pointer" }}>
                <i style={{ fontSize: "x-large" }} className="bx bx-show float-right" id="PsdID" title="show password" aria-hidden="true" ></i>
              </span>
            </div>
            {errors.password?.type === 'required' && <p className='text-danger mt-1 f13'>Please enter password</p>}
            {errors.password?.type === 'required' ? null : <span className="text-danger f13" id="idxPasswordError"></span>}
            {errors.password?.type === 'pattern' && <span className='text-danger mt-1 f13'>Password must be contain at least a  special character , a number  and min length 6 characters</span>}
            {errors.password?.type === 'pattern' ? null : <span className="text-danger f13" style={{ fontSize: '13px', padding: "2%" }} id="idxPsdPatternError"></span>}
          </div>

          <div className="col-lg-6 form-group">
            <label htmlFor="" className="form-label">{t("Confirm_Password")} <span className="text-danger ">*</span></label>
            <div className="input-group input-group-date">
              <input
                readOnly
                type="password"
                className="form-control"
                placeholder={t("Confirm_Password")}
                id="idxConfPassword"
                name="confirmPsd"
                maxLength={20}
                {...register("confirmPsd",
                  {
                    required: true,
                    onChange: (e) => { handleConfirmPasswordChange(e.target.value) },
                    onBlur: (e) => { handleConfirmPasswordFocusOut(e.target.value) },
                    validate: (val) => {
                      if (watch('password') !== val) {
                        setisPsdMatch(false);
                      } else {
                        setisPsdMatch(true);
                      }
                    }
                  })
                }
              />
              <span className="input-group-text" onClick={() => togglePasswordShow("idxConfPassword", "confPsdID")} style={{ cursor: "pointer" }}>
                <i style={{ fontSize: "x-large" }} className="bx bx-show float-right" id="confPsdID" title="show password" aria-hidden="true" ></i>
              </span>

            </div>

            {errors.confirmPsd?.type === 'required' && <p className='text-danger mt-1 f13' >Please enter confirm password</p>}
            {errors.confirmPsd?.type === 'required' ? null : <span className="text-danger f13" id="idxConfPsdError"></span>}
            {errors.confirmPsd?.type === 'required' ? null : isPsdMatch ? null : <span className='text-danger f13'>Password and confirm password not matched</span>}
          </div>
          {/* <div className="col-1 form-group " style={{ marginTop: "6%", cursor: "pointer" }}>
            <i style={{ fontSize: "x-large" }} className="bx bx-show float-right" id="confPsdID" title="show password" aria-hidden="true" onClick={() => togglePasswordShow("idxConfPassword", "confPsdID")}></i>
          </div> */}
          <div className="col-12 form-group">
            <label htmlFor="" className="form-label">{t("Current_Position")}<span className="text-danger ">*</span></label>
            <Select
              placeholder={t("Select")}
              onChange={handleCurrPosChange}
              onBlur={handleCurrPosFocusOut}
              value={iPosValue}
              options={iCurrentPOSList}
              isClearable
            />
            <span className="text-danger f13" id="idxCurrentPosError"></span>
          </div>
          <div className=""></div>
          <div className="col-lg-6 form-group">
            <label htmlFor="" className="form-label">{t("Domestic_Local_Exp")} <span className="text-danger ">*</span></label>
            <div className='row'>
              <div className='col-6'>
                <input type="text"
                  className="form-control"
                  placeholder={t("Year")}
                  id="idxLocalExfrom"
                  name="localExpFrom"
                  maxLength={2}
                  {...register("localExpFrom",
                    {
                      // required: true,
                      onKeyPress: (e) => { numberOnly(e) },
                      onChange: (e) => { handleDomExpFromChange(e.target.value) },
                      onBlur: (e) => { handleDomExpFromFocusOut(e.target.value) },
                    })
                  }
                />
                {errors.localExpFrom?.type === 'required' && <p className='text-danger mt-1 f13' >Please enter  year</p>}
                {errors.localExpFrom?.type === 'required' ? null : <span className="text-danger f13" id="idxDomExpFromError"></span>}
              </div>
              <div className='col-6'>
                <input type="text"
                  className="form-control"
                  placeholder={t("Month")}
                  id="idxLocalExTo"
                  name="localExpTo"
                  maxLength={2}
                  {...register("localExpTo",
                    {
                      onKeyPress: (e) => { numberOnly(e) },
                      onChange: (e) => { handleDomExpToChange(e.target.value) },
                      onBlur: (e) => { handleDomExpToFocusOut(e.target.value) },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 form-group">
            <label htmlFor="" className="form-label">{t("Overseas_Abroad_Exp")}</label>
            <div className='row'>
              <div className='col-6'>
                <input type="text"
                  className="form-control"
                  placeholder={t("Year")}
                  id="idxOverseasExfrom"
                  name="overseasExfrom"
                  maxLength={2}
                  {...register("overseasExfrom",
                    {
                      onKeyPress: (e) => { numberOnly(e) },
                      onChange: (e) => { handleOverExpFromChange(e.target.value) },
                      onBlur: (e) => { handleOverExpFromFocusOut(e.target.value) }
                    })
                  }
                />
              </div>
              <div className='col-6'>
                <input type="text"
                  className="form-control"
                  placeholder={t("Month")}
                  id="idxOverseasExfromTo"
                  name="overseasExTo"
                  maxLength={2}
                  {...register("overseasExTo",
                    {
                      onKeyPress: (e) => { numberOnly(e) },
                      onChange: (e) => { handleOverseasExpToChange(e.target.value) },
                      onBlur: (e) => { handleOverExpToFocusOut(e.target.value) }
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 form-group">
            <label htmlFor="" className="form-label">{t("Nationality")} <span className="text-danger ">*</span></label>
            <Select
              placeholder={t("Select")}
              onChange={handleNationalityChange}
              onBlur={handleNationalityFocusOut}
              value={iNationalityValue}
              options={iNationalityList}
              isClearable
            />
            <span className="text-danger f13" id="idxNationalityError"></span>
          </div>
          <div className="col-lg-6 form-group">
            <label htmlFor="" className="form-label">{t("Current_Location")} <span className="text-danger ">*</span></label>
            <Select
              placeholder={"Ex:Hyderabad"}
              onChange={handleCurrLocChange}
              value={iCurrentLocationValue}
              onBlur={handleCurrLocFocusOut}
              options={iCurrentLocationList}
              isClearable
            />
            <span className="text-danger f13" id="idxCurrLocError"></span>
          </div>

          <div className="col-12 form-group">
            <label htmlFor="" className="form-label">{t("Resume")}</label>
            <div className="custom-file-select">
              <input type="file"
                style={{ width: "fit-content" }}
                className="form-control"
                placeholder=""
                aria-describedby="fileHelpId"
                id="idxResume"
                name="resume"
                {...register("resume",
                  {
                    onChange: (e) => { handleResumeUploadChange(e) }
                  })
                }
              />
              <div className="file-start">
                <button className="btn btn-primary">{t("Upload_Resume")}</button>
                <span id="resume-name">DOC, DOCx, PDF</span>
              </div>
              <div className="file-end">Max: 3 MB</div>
              <span id="cancel-resume" title="Cancel" className=" input-group-date" onClick={() => cancelFileClick()} style={{ cursor: "pointer", display: "none" }}>
                <i style={{ fontSize: "x-large" }} className="bx bx-x float-right" ></i>
              </span>
            </div>
            {IsNullOrEmpty(fileValidationErrorMessage) ? null : <span className="text-danger mt-1 f13">{fileValidationErrorMessage}</span>}
            <div id="fileHelpId" className="form-text">{t("Resume_Msg")}</div>
          </div>
          <div className="form-bottom-actions">
            <div id="fileHelpId" className="form-text"><span className="text-danger ">*</span> By registering with us, you agree to our Terms and Conditions.  <Link to="/termsofuse/#communications"><i className="bx bx-link-external"></i></Link></div>
            <button type="submit" className="btn-primary btn" onClick={() => submitClick()} >{t("Next")}</button>
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default RegisterGeneral