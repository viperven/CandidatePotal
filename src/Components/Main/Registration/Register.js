// Rupesh jha 
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CandidateRegService } from "../../../Services/CanRegistration/CandidateRegService";
import { ToastContainer, toast } from 'react-toastify';
import { Backdrop, CircularProgress } from "@mui/material";
import { Modal, ModalBody } from "react-bootstrap";
import OtpInput from 'react-otp-input';
import LoginModal from "../../LogIn/LoginModal";
import ForgotPassword from "../../LogIn/ForgotPassword";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactStopwatch from 'react-stopwatch';
import { AuthService } from "../../../Services/AuthService";
import loginImg from "../../../../src/assets/imgs/login.png"
import Select from 'react-select';
import { CommonService } from "../../../Services/CommonService";
import { ProfileService } from "../../../Services/Profile/ProfileService";
import Layout from "../../../Layout/Layout";
import facebook from "../../../assets/imgs/facebook.svg";
import google from "../../../assets/imgs/google.png";
import registerImg from "../../../assets/imgs/HuntsJobRegister.svg";


const maxFileSize = 1024 * 1024 * 3;

const TestRegister = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const { register, setValue, handleSubmit, formState: { errors }, trigger, watch, getValues } = useForm();
    const [fileValidationErrorMessage, setfileValidationErrorMessage] = useState("");
    const [countryvalue, setCountryvalue] = useState([]);
    const [iPosValue, setiPosValue] = useState([]);
    const [iNationalityValue, setiNationalityValue] = useState([]);
    const [iCurrentLocationValue, setiCurrentLocationValue] = useState([]);
    const [formData, setData] = useState({})
    const [openLoader, setopenLoader] = useState(false);
    const [mobOTPResendButton, setMobOTPResendButton] = useState(false);
    const [show, setshow] = useState(false);
    const [isPhoneOrEmail, setisPhoneOrEmail] = useState(false);
    const [mobileOtp, setmobileOtp] = useState('');
    const [loginModalShow, setloginModalShow] = useState(false);
    const [forgotPaswdModalShow, setforgotPaswdModalShow] = useState(false);
    const [mobileAvailableModal, setmobileAvailableModal] = useState(false);
    const [mobileoremailHeader, setmobileoremailHeader] = useState("");
    const [mobilesec, setMobileSeconds] = useState(20);
    const [candidateID, setcandidateID] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [countryId, setCountryId] = useState("");
    const navigate = useNavigate();
    const [emailOtp, setemailOtp] = useState('');
    const [isMobileOtpVerified, setisMobileOtpVerified] = useState(false);
    const [mobOtpTime, setmobOtpTime] = useState(true);
    const [isEmailOtpVerified, setisEmailOtpVerified] = useState(false);
    const [loginProcessValue, setloginProcessValue] = useState([]);
    const [emailOtpTime, setemailOtpTime] = useState(true);
    const [emailsec, setEmailSeconds] = useState(20);
    const [emailOTPResendButton, setEmailOTPResendButton] = useState(false);
    const [returnCandidateID, setReturnCandidateID] = useState("");
    const [iCurrentPOSList, setiCurrentPOSList] = useState([]);
    const [iNationalityList, setiNationalityList] = useState([]);
    const [iCurrentLocationList, setiCurrentLocationList] = useState([]);
    const [otpSentToEmailOrPhone, setOtpSentToEmailOrPhone] = useState(""); //1 means otp sent to mobile 2 means sent to email
    const [mobileNumber, setMobileNumber] = useState("")
    const [emailId, setEmailId] = useState("");
    const [countryDD, setCountryDD] = useState([]);
    const [isShowMobileCountryCodeErr, setisShowMobileCountryCodeErr] = useState(false);
    const [isPsdMatch, setisPsdMatch] = useState(true);
    const [resumeName] = useState("DOC, DOCx, PDF");
    const [emailAvailableMessage, setemailAvailableMessage] = useState("");
    const [mobileAvailableMessage, setmobileAvailableMessage] = useState("");
    const [mobileAVColor, setmobileAVColor] = useState("#1bc23f");
    const [emailAVColor, setemailAVColor] = useState("#1bc23f");
    const [isFocused, setIsFocused] = useState(false);
    const [verifyButtonDisable, setVerifyButtonDisable] = useState(false);

    console.log(watch("nationality")) // watch input value by passing the name of it

    // utilites functions  starts
    const numberOnly = (event) => {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
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
    //utilites function stops

    // name starts here 
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
    // name ends here 

    //validations 

    const checkDDValidation = () => {
        let errCount = 0;
        let password = document.getElementById("idxPassword").value;
        let confirmPassword = document.getElementById("idxConfPassword").value;
        if (password !== confirmPassword) {
            errCount += 1;
        }
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

    const cancelFileClick = () => {
        document.getElementById("cancel-resume").style.display = "none";
        document.getElementById("idxResume").value = null;
        document.getElementById("resume-name").innerHTML = resumeName;
        setfileValidationErrorMessage("");
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



    //email starts here

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

    const handleEmailChange = (v) => {

        console.log(v, "sss");
        try {
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
                setemailAvailableMessage("");
            }
        }
        catch (error) {
            console.log(error.message)

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

    // email ends here 

    // mobile starts here 
    const handleMobileChange = (v) => {
        debugger
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
                setmobileAvailableMessage(`${countryvalue?.MaxMobilelength} digits is required for ${countryvalue?.label}`);
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




    //mobile ends here

    // passwords 


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

    const togglePasswordShow = (inputID, iconID) => {
        let input = document.getElementById(inputID);
        let icon = document.getElementById(iconID);
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("bx-hide");
            icon.classList.add("bx-show");
            icon.title = "hide password";
        } else {
            input.type = "password";
            icon.classList.remove("bx-show");
            icon.classList.add("bx-hide");
            icon.title = "show password";
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

    const handleSelectCountry = (selectedOption) => {
        debugger
        if (selectedOption) {
            setCountryvalue(selectedOption);
            let mobileNumber = document.getElementById("idxMobile").value;
            handleMobileChange(mobileNumber)
        }

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

    // position code start

    const initCurrentPositionList = async () => {
        const pos = await CandidateRegService.get_FAS_DropdownList();
        console.log(pos);

        if (pos.isSuccess) {
            const d = JSON.parse(pos.data);
            setiCurrentPOSList(d);
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

    //   position code end 

    //nationality code

    const initNationalityList = async () => {
        const nl = await CommonService.getNationalityList();
        nl ? setiNationalityList(nl) : setiNationalityList([]);
    }

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

    //location code

    const initCurrentLocationList = async () => {
        const cLoc = await ProfileService.getLocationList();
        cLoc ? setiCurrentLocationList(cLoc) : setiCurrentLocationList([]);
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

    const ProccedToLogin = async (LoginProcess) => {
        debugger
        setopenLoader(true);
        try {
            const res = await AuthService.LoginUser(LoginProcess.mobileno, LoginProcess.countryid, LoginProcess.password, "");
            setopenLoader(false);
            if (res.isSuccess) {
                navigate({
                    pathname: '/',
                });
            }
        } catch (error) {
            console.log(error)
            setopenLoader(false);
        }
        setopenLoader(false);
    }

    const CallBackResponse = (value, canID, loginValue) => {
        console.log(loginValue);
        setReturnCandidateID(canID);
        setloginProcessValue(loginValue);
        ProccedToLogin(loginValue)
        // switch (value) {
        //     case 2:
        //         // setisPhoneOrEmail(true);
        //         setIsShowRegStep1(false);
        //         setIsShowRegStep2(true);
        //         setIsShowRegStep3(false);
        //         setIsShowRegStep4(false);
        //         setIsShowRegStep5(false);
        //         break;
        //     case 3:
        //         setIsShowRegStep1(false);
        //         setIsShowRegStep2(false);
        //         setIsShowRegStep3(true);
        //         setIsShowRegStep4(false);
        //         setIsShowRegStep5(false);
        //         break;
        //     case 4:
        //         setIsShowRegStep1(false);
        //         setIsShowRegStep2(false);
        //         setIsShowRegStep3(false);
        //         setIsShowRegStep4(true);
        //         setIsShowRegStep5(false);
        //         break;
        //     case 5:
        //         setIsShowRegStep1(false);
        //         setIsShowRegStep2(false);
        //         setIsShowRegStep3(false);
        //         setIsShowRegStep4(false);
        //         setIsShowRegStep5(true);
        //         break;

        //     default:
        //         break;
        // }

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

    const validateOTP = async (type) => {
        debugger
        let res;
        setVerifyButtonDisable(true);
        if (type === 1) {
            if (!IsNullOrEmpty(mobileOtp)) {
                if (parseInt(mobileOtp.length) === 6) {
                    if (otpSentToEmailOrPhone === "1") {
                        res = await CandidateRegService.verify_Registration_OTP_New(1, mobileOtp, mobileNumber);
                    }
                    else {
                        res = await CandidateRegService.verify_Registration_OTP_New(2, mobileOtp, emailId);
                    }
                    if (res.isSuccess) {
                        setmobOtpTime(false);
                        setisMobileOtpVerified(true);
                        ShowAlert(1, res.message);
                        const data = await CandidateRegService.save_Registration_Step1(formData);
                        if (isPhoneOrEmail) {
                            if (isEmailOtpVerified) {
                                setshow(false);
                            }
                        }
                        else {
                            setshow(false);
                            if (data.isSuccess) {
                                CallBackResponse(2, data.data, { "mobileno": formData.MobileNo, "password": formData.Password, "countryid": formData.CountryID });
                                ShowAlert(1, data.message);
                            } else {
                                ShowAlert(0, data.message);
                            }
                        }
                    } else {
                        ShowAlert(0, res.message);
                        setVerifyButtonDisable(false);
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
                            }
                        } else {
                            setshow(false);
                            console.log(2, candidateID, loginProcessValue);
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

    const handleForgotPaswdModalShowClick = () => {
        setforgotPaswdModalShow(true);
    }

    const handleLoginModalShowClick = () => {
        setloginModalShow(true);
    }

    const CloseLoginModal = (res) => {
        if (res === 1) {
            setloginModalShow(false);
            navigate("/profiledashboard");
        } else {
            setloginModalShow(false);
        }
    }

    const CloseFPModal = (res) => {
        if (res === 1) {
            setforgotPaswdModalShow(false);
            setloginModalShow(true);
        } else {
            setforgotPaswdModalShow(false);
        }
    }

    const IsNullOrEmpty = (v) => {
        if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
            return true;
        } else {
            return false;
        }
    }

    const handleClose = () => {
        setshow(false);
    }

    const blobToBase64DataURL = (blob) => new Promise(
        resolvePromise => {
            const reader = new FileReader();
            reader.onload = () => resolvePromise(reader.result);
            reader.readAsDataURL(blob);
        }
    )

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

    const onSubmit = async (d) => {
        debugger
        const ddErrorCount = checkDDValidation();
        if (ddErrorCount > 0) {
            return false;
        }
        let sXml = "";
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

        const registerStep1ReqData = {
            Name: d.name,
            EmailID: d.email,
            CountryID: countryvalue?.value,
            MobileNo: d.mobile,
            Password: d.password,
            CurrentPosition: iPosValue?.label,
            DomExperienceYears: d.localExpFrom ? parseInt(d.localExpFrom) : 0,
            DomExperienceMonths: d.localExpTo ? parseInt(d.localExpTo) : 0,
            OverExperienceYears: d.overseasExfrom ? parseInt(d.overseasExfrom) : 0,
            OverDomExperienceMonths: d.overseasExTo ? parseInt(d.overseasExTo) : 0,
            Nationality: parseInt(iNationalityValue.value),
            CurrentLoc: parseInt(iCurrentLocationValue.value),
            ResumeFile: "",
            FileName: "",
            AppType: "Web",
            Source: "",
            Social: sXml,
            IsCandidateVerifiedStatus: 0
        }

        setData({
            Name: d.name,
            EmailID: d.email,
            CountryID: countryvalue?.value,
            MobileNo: d.mobile,
            Password: d.password,
            CurrentPosition: iPosValue?.label,
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
            IsCandidateVerifiedStatus: 1
        })

        try {
            setopenLoader(true);
            const data = await CandidateRegService.save_Registration_Step1(registerStep1ReqData);

            if (data.isSuccess) {
                setEmailId(d.email)
                setMobileNumber(d.mobile);
                setOtpSentToEmailOrPhone(data?.mobileOrEmail);
                // const result = JSON.parse(data);
                if (data?.mobileOrEmail === "1") {
                    setTimeout(() => {
                        setMobOTPResendButton(true);
                    }, 20000);
                }
                else {
                    setTimeout(() => {
                        setEmailOTPResendButton(true);
                    }, 20000);
                }
                ShowAlert(1, data.message);
                setshow(true);

            } else {
                ShowAlert(0, data.message);
            }
            setopenLoader(false);


        } catch (error) {
            setopenLoader(false);
            console.log(error.message);

        }
    };

    const handleNextStep = async () => {
        const valid = await trigger();
        if (valid) {
            setStep(step + 1);
        }
    };

    // initialize all the necessary functions 

    useEffect(() => {
        initCountry();
        initCurrentPositionList();
        initNationalityList();
        initCurrentLocationList();
    }, [])


    const submitClick = () => {
        checkDDValidation();
    };


    return (
        <>
            <Layout showFooter={false}>
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
                            <span className='text-primary'>{otpSentToEmailOrPhone == 1 ? "OTP sent to mobile" : "OTP sent to Email"}</span>
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
                                                    <button type="button" className="btn btn-sm btn-success" onClick={() => validateOTP(1)} disabled={verifyButtonDisable}>{t("Verify")}asd</button>
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
                                                    <button type="button" className="btn btn-sm btn-success" onClick={() => validateOTP(2)} disabled={verifyButtonDisable}>{t("Verify")}</button>
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
                                            <label className="control-label">{otpSentToEmailOrPhone == 1 ? "OTP sent to mobile" : "OTP sent to Email"}</label>
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
                                            <button type="button" className="btn btn-sm btn-success" onClick={() => validateOTP(1)} disabled={verifyButtonDisable}>{t("Verify")}</button>

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

                <section>
                    <div id="registration-container" className="container">

                        <div className="row justify-content-center">
                            <div className="col-lg-4 mb-3 d-none d-md-block" >
                                <div className="card card-guide shadow-sm" style={{ marginTop: "10px" }}>
                                    <div className="img-icon" style={{ marginTop: "10px" }}>
                                        <img style={{ width: "300px" }} src={registerImg} alt="HuntsJob Registration Image" />
                                    </div>
                                    <div className="card-body">
                                        <h3 className="title">Register With Huntsjob</h3>
                                        <ul className="list-check">
                                            <li>{"Build your profile and let recruiters find you"}</li>
                                            <li>{"Receive job alerts tailored to your expertise"}</li>
                                            <li>
                                                {
                                                    "Join our community and set your professional journey on fire"
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 mb-3" style={{ marginTop: "10px" }}>
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="card-body-header">
                                            <h4 className="card-title">
                                                {t("Let's get started, tell us about yourself")}
                                            </h4>
                                            {/* <p className="card-title text-body-tertiary">
                                                {t("It only takes a couple of minutes to get started")}
                                            </p> */}
                                        </div>

                                        {/* my code  */}
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="row">
                                                <div className="col-12 mb-3">
                                                    {/* name  */}
                                                    <label className="form-label">
                                                        {t("Name")}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control rounded-3"
                                                        // className={`form-control ${errors.name ? 'is-invalid' : ''}`}
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

                                                {/* mobile country code  */}
                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="" className="form-label">{t("Country_Code")}<span className="text-danger ">*</span></label>
                                                    <Select
                                                        className="rounded-3"
                                                        placeholder={t("Select")}
                                                        onChange={handleSelectCountry}
                                                        value={countryvalue}
                                                        options={countryDD}
                                                        isClearable
                                                    />
                                                    <span className="text-danger f13" id="idxCountryCode"></span>
                                                </div>

                                                {/* mobile number  */}
                                                <div className="col-md-9 mb-3">
                                                    <label className="form-label">
                                                        {t("Mobile number")}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control rounded-3"
                                                        placeholder={t("Mobile_number")}
                                                        // className={`mt-3 form-control ${errors.mobile ? 'is-invalid' : ''}`}
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

                                                {/* email  */}
                                                <div className="autofillBg col-12 mb-3">
                                                    <label className="form-label">{t("Email")}</label>
                                                    {countryvalue?.value != 1 ? <span className="text-danger">*</span> : ""}
                                                    <input
                                                        type="email"
                                                        className="form-control rounded-3"
                                                        placeholder="ex: youremailid@mail.com"
                                                        // className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                        id="idxEmail"
                                                        name="email"
                                                        maxLength={50}
                                                        {...register("email",
                                                            {
                                                                required: countryvalue?.value !== 1 ? true : false,
                                                                pattern: {
                                                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                                                                },
                                                                onChange: (e) => { handleEmailChange(e.target.value) },
                                                                onBlur: (e) => { handleEmailFocusOut(e.target.value) }
                                                            })
                                                        }
                                                    />
                                                    {emailAvailableMessage === "" ? null : <span className="f13" style={{ color: emailAVColor }}> {emailAvailableMessage}</span>}
                                                    {errors.email?.type === 'required' && countryvalue?.value !== 1 && <p className='text-danger mt-1 f13'>Please enter email</p>}
                                                    {errors.email?.type === 'required' ? null : <span className="text-danger f13" id="idxEmailError"></span>}
                                                    {errors.email?.type === 'pattern' && <p className='text-danger mt-1 f13'>Please enter a valid email</p>}
                                                    {errors.email?.type === 'pattern' ? null : <span className="text-danger f13" id="idxEmailPatternError"></span>}

                                                </div>

                                                <div className="col-lg-6 autofillBg">
                                                    <label className="form-label">
                                                        {t("Password")} <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="input-group input-group-date rounded-3">
                                                        <input
                                                            type="password"
                                                            className="form-control  ms-3 shadow-none"
                                                            // className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                            placeholder={t("Password")}
                                                            id="idxPassword"
                                                            name="password"
                                                            minLength={6}
                                                            maxLength={20}
                                                            {...register("password", {
                                                                required: true,
                                                                onChange: (e) => { handlePassowrdChange(e.target.value) },
                                                                onBlur: (e) => { handlePassowrdFocusOut(e.target.value) }
                                                            })}
                                                        />
                                                        <span className="input-group-text me-3" onClick={() => togglePasswordShow("idxPassword", "PsdID")} style={{ cursor: "pointer" }}>
                                                            <i style={{ fontSize: "x-large" }} className="bx bx-hide float-right" id="PsdID" title="show password" aria-hidden="true" ></i>
                                                        </span>
                                                    </div>
                                                    {errors.password?.type === 'required' && <p className='text-danger mt-1 f13'>Please enter password</p>}
                                                    {errors.password?.type === 'required' ? null : <span className="text-danger f13" id="idxPasswordError"></span>}
                                                    {errors.password?.type === 'pattern' && <span className='text-danger mt-1 f13'>Password must be contain at least a  special character , a number  and min length 6 characters</span>}
                                                    {errors.password?.type === 'pattern' ? null : <span className="text-danger f13" style={{ fontSize: '13px', padding: "2%" }} id="idxPsdPatternError"></span>}
                                                </div>

                                                <div className="col-lg-6">
                                                    <label className="form-label">
                                                        {t("Confirm Password")}{" "}
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="input-group input-group-date rounded-3">
                                                        <input
                                                            type="password"
                                                            className="form-control  ms-3 shadow-none"
                                                            placeholder={t("Confirm Password")}
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
                                                        <span className="input-group-text me-3" onClick={() => togglePasswordShow("idxConfPassword", "confPsdID")} style={{ cursor: "pointer" }}>
                                                            <i style={{ fontSize: "x-large" }} className="bx bx-hide float-right" id="confPsdID" title="show password" aria-hidden="true" ></i>
                                                        </span>
                                                    </div>
                                                    {errors.confirmPsd?.type === 'required' && <p className='text-danger mt-1 f13' >Please enter confirm password</p>}
                                                    {errors.confirmPsd?.type === 'required' ? null : <span className="text-danger f13" id="idxConfPsdError"></span>}
                                                    {errors.confirmPsd?.type === 'required' ? null : isPsdMatch ? null : <span className='text-danger f13'>Password and confirm password not matched</span>}
                                                </div>

                                                {/* position  */}
                                                <div className="col-lg-12 mb-3">
                                                    <label htmlFor="" className="form-label">{t("Current_Position")}<span className="text-danger ">*</span></label>
                                                    <Select
                                                        className="rounded-3"
                                                        placeholder={t("Select")}
                                                        onChange={handleCurrPosChange}
                                                        // onBlur={handleCurrPosFocusOut}
                                                        value={iPosValue}
                                                        options={iCurrentPOSList}
                                                        isClearable
                                                    // required
                                                    // onBlur={handleCurrPosFocusOut}
                                                    />
                                                    <span className="text-danger f13" id="idxCurrentPosError"></span>
                                                    {/* <span className="text-danger f13" id="idxCurrentPosError">{iPosValue ? "Please Select Position" : ""}</span> */}
                                                </div>

                                                {/* --nationality */}
                                                <div className="col-lg-6 mb-3">
                                                    <label htmlFor="" className="form-label">{t("Nationality")} <span className="text-danger ">*</span></label>
                                                    <Select
                                                        className="rounded-3"
                                                        placeholder={t("Select")}
                                                        onChange={handleNationalityChange}
                                                        // onBlur={handleNationalityFocusOut}
                                                        value={iNationalityValue}
                                                        options={iNationalityList}
                                                        isClearable
                                                    // required
                                                    />
                                                    <span className="text-danger f13" id="idxNationalityError"></span>
                                                    {/* <span className="text-danger f13" id="idxNationalityError">{iNationalityValue ? "Please Select Position" : ""}</span> */}
                                                </div>

                                                {/* location  */}
                                                <div className="col-lg-6  mb-3">
                                                    <label htmlFor="" className="form-label">{t("Current_Location")} <span className="text-danger ">*</span></label>
                                                    <Select
                                                        className="rounded-3"
                                                        placeholder={"Ex:Hyderabad"}
                                                        onChange={handleCurrLocChange}
                                                        value={iCurrentLocationValue}
                                                        // onBlur={handleCurrLocFocusOut}
                                                        options={iCurrentLocationList}
                                                        isClearable
                                                    // required
                                                    />
                                                    <span className="text-danger f13" id="idxCurrLocError"></span>
                                                    {/* <span className="text-danger f13" id="idxCurrLocError">{iCurrentLocationValue ? "Please Select Position" : ""}</span> */}
                                                </div>

                                                {/* resume  */}
                                                <div className="col-lg-12 mb-3">
                                                    <label className="form-label" style={{ fontSize: '14px', fontWeight: '500' }}>{t("Resume")}</label>
                                                    <div className="custom-file-select rounded-3 ">
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            aria-describedby="fileHelpId"
                                                            id="idxResume"
                                                            name="resume"
                                                            // className={`form-control ${errors.resume ? 'is-invalid' : ''}`}
                                                            // {...register("resume", { required: "Resume is required" })}
                                                            {...register("resume",
                                                                {
                                                                    // required: true,
                                                                    onChange: (e) => { handleResumeUploadChange(e) }
                                                                })
                                                            }
                                                        />
                                                        <div className="file-start">
                                                            <button className="btn btn-primary " style={{ borderRadius: "5px !important" }}>
                                                                {t("Upload Resume")}
                                                            </button>
                                                            <span id="resume-name">DOC, DOCx, PDF </span>
                                                        </div>
                                                        <div className="file-end">Max: 3 MB</div>
                                                        <span id="cancel-resume" title="Cancel" className=" input-group-date" onClick={() => cancelFileClick()} style={{ cursor: "pointer", display: "none" }}>
                                                            <i style={{ fontSize: "x-large" }} className="bx bx-x float-right" ></i>
                                                        </span>
                                                    </div>
                                                    <span id="cancel-resume" title="Cancel" className=" input-group-date" onClick={() => cancelFileClick()} style={{ cursor: "pointer", display: "none" }}>
                                                        <i style={{ fontSize: "x-large" }} className="bx bx-x float-right" ></i>
                                                    </span>
                                                    {/* {errors.resume?.type === 'required' && <p className='text-danger mt-1 f13'>Please Upload an Resume</p>} */}
                                                    {fileValidationErrorMessage != "" ? <p className='text-danger mt-1 f13'>{fileValidationErrorMessage}</p> : null}

                                                </div>

                                                <div className="form-bottom-actions justify-content-center flex-column align-items-center">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary rounded-3"
                                                        onClick={() => submitClick()}
                                                    >
                                                        {t("Register now")}
                                                    </button>
                                                </div>

                                                {/* 
                                                <div className="or-devider">
                                                    <span>{t("Or")}</span>
                                                </div> */}

                                                {/* <div className="d-flex buttons">
                                                    <div className="col-6 form-group d-flex justify-content-center">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary w-100 rounded-3"
                                                        >
                                                            <img
                                                                src={google}
                                                                alt="Sign in with Google"
                                                                height={"25px"}
                                                                width={"25px"}
                                                            />
                                                            {t("Sign in with Google")}
                                                        </button>
                                                    </div>
                                                    <div className="col-6 form-group d-flex justify-content-center">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary w-100 rounded-3"
                                                        >
                                                            <img
                                                                src={facebook}
                                                                alt="Sign in with Facebook"
                                                                height={"25px"}
                                                                width={"25px"}
                                                            />
                                                            {t("Sign in with Facebook")}
                                                        </button>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </form>
                                        {/* my code  */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section >
            </Layout >
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
    );
};

export default TestRegister;
