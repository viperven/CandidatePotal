import React, { useState, useEffect, useRef } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Layout from '../../../Layout/Layout'
import UserPng from '../../../assets/imgs/user.png'
import { ToastContainer, toast } from 'react-toastify';
import EditGeneralInfo from './EditGeneralInfo';
import EditProfession from './EditProfession';
import EditQualification from './EditQualification';
import EditPersonal from './EditPersonal';
import EditBasicDetails from './EditBasicDetails';
import Select from 'react-select';
import { ProfileService } from '../../../Services/Profile/ProfileService';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { CandidateRegService } from '../../../Services/CanRegistration/CandidateRegService';
import { AuthService } from '../../../Services/AuthService';
import { useForm } from "react-hook-form";
import OtpInput from 'react-otp-input';
import Grid from '@mui/material/Grid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LoginModal from '../../LogIn/LoginModal';
import { ModalBody, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CommonService } from '../../../Services/CommonService';
import { AdvanceSearchService } from '../../../Services/AdvanceSearchService';
import NewLoader from '../NewLoader';

const S3_Can_Folder = {
    Resume: 1,
    Passport: 2,
    DrivingLicense: 3,
    Visa: 4,
    Tickets: 5,
    Medical: 6,
    PCC: 7,
    EducationCertificate: 8,
    ExperienceCertificate: 9,
    Others: 10,
    CDC: 11,
    Photo: 12
}



function MyProfile() {
    const { t } = useTranslation();
    const loc = useLocation();
    // login modal
    const handleLoginClose = () => setloginShow(false);
    const handleLoginShow = () => setloginShow(true);
    const [countryDD, setCountryDD] = useState([]);
    const [countryvalue, setCountryvalue] = useState([]);
    const [isShowMobileCountryCodeErr, setisShowMobileCountryCodeErr] = useState(false);
    const [loginShow, setloginShow] = useState(false);
    // login modal end

    const maxFileSize = 1024 * 1024 * 3;
    const maxPicSize = 1024 * 1024;

    const [OpenAction, setOpenAction] = useState(0);
    const [show, setShow] = useState(false);
    const [showprofileImage, setprofileImageShow] = useState(false);

    const handleProfileImageClose = () => setprofileImageShow(false);
    const handleProfileImageShow = () => setprofileImageShow(true);
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleClose = () => {
        setShow(false);

    }
    const handleLoaderClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();
    const handleShow = (actionType) => {
        if (actionType > 0) {
            setOpenAction(actionType);
            setShow(true);
        } else {
            navigate("/myprofile");
        }
    }
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
    const callBackModalClose = (value) => {
        if (value === 1) {
            setShow(false);
            initProfileData();
            initProfilePercentage();
        } else {
            setShow(false);
        }
    }
    const [countrySelectIsDisable, setcountrySelectIsDisable] = useState(false);
    const [profilePercentage, setProfilePercentage] = useState(0);
    const [generalInfo, setGeneralInfo] = useState([]);
    const [generalData, setgeneralData] = useState("");
    const [basicData, setBasicData] = useState("");
    const [qualificationData, setQualification] = useState([]);
    const [keySkils, setKeySkils] = useState([]);
    const [keystringSkils, setKeystringSkils] = useState("");
    const [professionData, setProfession] = useState([]);
    const [canQualData, setCanQualData] = useState("");
    const [languageData, setLanguage] = useState([]);
    const [preferedLocation, setPreferedLocation] = useState([]);
    const [resume, setResume] = useState([]);
    const [otherDocuments, setOtherDocuments] = useState([]);
    const [personalData, setPersonalData] = useState("");
    const [openLoader, setopenLoader] = React.useState(false);
    const { register, setValue, setError, clearErrors, watch, formState: { errors }, handleSubmit } = useForm();
    /* mobile email update*/
    const [OpenEmail, setOpenEmail] = React.useState(false);
    const [OpenMobile, setOpenMobile] = React.useState(false);
    const [emailAvailableMessage, setemailAvailableMessage] = useState("");
    const [isEnter, setIsEnter] = React.useState(false);
    const [emailOtp, setemailOtp] = useState('');
    const [mobileOtp, setmobileOtp] = useState('');
    const [mobileAvailableMessage, setmobileAvailableMessage] = useState("");
    const [mobileAVColor, setmobileAVColor] = useState("#1bc23f");
    const [emailAVColor, setemailAVColor] = useState("#1bc23f");
    const [otpSuccessMessage, setOTPSuccessMessage] = useState("");
    const [iUpdateMobileOrEmailMessage, setiUpdateMobileOrEmailMessage] = useState("green");
    const [contactUpdateMessage, setContactUpdateMessage] = useState("");
    const [mobileEmailErrorCount, setMobileEmailErrorCount] = useState(0);
    const [emailID, setEmailID] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const generalRef = useRef();
    const basicRef = useRef();
    const professionalRef = useRef();
    const educationRef = useRef();
    const keySkillsRef = useRef();
    const personalRef = useRef();
    const otherRef = useRef();
    /* mobile email update end*/

    const handleLeftMenuClick = (e, tag, ref) => {
        // window.location = tag;
        switch (ref) {
            case "generalRef":
                window.scrollTo(0, generalRef.current.offsetTop - 87);
                break;
            case "basicRef":
                window.scrollTo(0, basicRef.current.offsetTop - 87);
                break;
            case "professionalRef":
                window.scrollTo(0, professionalRef.current.offsetTop - 87);
                break;
            case "educationRef":
                window.scrollTo(0, educationRef.current.offsetTop - 87);
                break;
            case "keySkillsRef":
                window.scrollTo(0, keySkillsRef.current.offsetTop - 87);
                break;
            case "personalRef":
                window.scrollTo(0, personalRef.current.offsetTop - 87);
                break;
            case "otherRef":
                window.scrollTo(0, otherRef.current.offsetTop - 87);
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
    }
    const initProfilePercentage = async () => {
        const res1 = await ProfileService.getProfileByIDGetCandidateProfilePercentageCaculation();
        const percentage = JSON.parse(res1.apiData);
        setProfilePercentage(parseInt(percentage[0].ProfilePercentage));
        let bar = parseInt(percentage[0].ProfilePercentage);
        document.getElementById("progress").style.width = bar + "%";
    }



    const initProfileData = async () => {
        debugger
        try {
            setopenLoader(true);
            const res = await ProfileService.getProfileByID();
            const profile = JSON.parse(res.apiData);
            console.log(profile);      
            const userName = profile.Table[0].CandidateFirstName;
            console.log("🚀 ~ initProfileData ~ userName:", userName)
            const documents = profile.Table5;
            console.log("🚀 ~ initProfileData ~ documents:", documents)

            setGeneralInfo(profile.Table[0]);
            if (documents && documents.length > 0) {
                {
                    console.log("doc", documents)
                }
                for (let i = 0; i < documents.length; i++) {

                    const url = IsNullOrEmpty(documents[i].PreSignedUrl) ? "" : documents[i].PreSignedUrl;
                    if (!IsNullOrEmpty(url)) {
                        let iBase64File = await AuthService.download_file_from_s3(url);
                        if (iBase64File.includes('<?xml')) {
                            iBase64File = "";
                        }

                        if (!IsNullOrEmpty(iBase64File)) {
                            documents[i].PreSignedUrl = iBase64File;
                            if (documents[i].DocType === 1) {
                                setResume(documents[i]);
                                console.log("Setting resume:", documents[i]);
                            }
                            if (documents[i].DocType === 12) {
                                var image = document.getElementById("output");
                                var image1 = document.getElementById("output1");

                                image.src = iBase64File;
                                image1.src = iBase64File;
                                AuthService.set_userImage_And_pic(userName, image.src);

                            }
                        }
                    }
                }
            }
            if (profile.Table[0]) {
                let skillsString = profile.Table[0].CandidateKeySkills.trim();
                if (skillsString) {
                    if (skillsString.endsWith(',')) {
                        skillsString = skillsString.slice(0, -1);
                    }
                    const skills = skillsString.split(',');
                    setKeystringSkils(skillsString);
                    setKeySkils(skills);
                }
            }

            setQualification(profile.Table3);
            setProfession(profile.Table2 ? profile.Table2 : []);
            setLanguage(profile.Table4 ? profile.Table4 : []);
            // const userName = profile.Table[0].CandidateFirstName;
            setPreferedLocation(profile.Table1);
            // const documents = profile.Table5;
            let iBase64File = "";

            const filteredDocuments = documents.filter(doc => doc.DocType !== 1 && doc.DocType !== 12);
            setOtherDocuments(filteredDocuments);
            initProfilePercentage()
            setopenLoader(false);
        } catch (error) {
            setopenLoader(false);
        }

    }

    const initCountry = async () => {
        try {
            const cu = await CandidateRegService.getCountryList();
            if (cu.isSuccess) {
                setCountryDD(JSON.parse(cu.data))
            } else {
                setCountryDD([]);
            }
        } catch (error) {

        }
    }
    const handleEditGeneralInfo = (name, position, nationality, location, domExpMonth, domExpYear, OversExpMonth, OversExpYear) => {

        const generalArray = {
            CandidateFirstName: name,
            CandidateCurrentPosition: position,
            CandidateNationality: nationality,
            LocationName: location,
            CandidateDomExperienceMonths: domExpMonth,
            CandidateDomExperienceYearsFrom: domExpYear,
            CandidateExperienceMonths: OversExpMonth,
            CandidateExperienceYearsFrom: OversExpYear
        }

        setgeneralData(JSON.stringify(generalArray));
        handleShow(1);
    }
    const handleEditBasicDetails = (curSalCurrencyID, expSalCurrencyID, curSalary, expSalary, notcPeriod, industryID, prefLocation) => {
        const basicArray = {
            CandidateCurrentAnnualSalaryCurrencyID: curSalCurrencyID,
            CandidateExpectedAnnualSalaryCurrencyID: expSalCurrencyID,
            CurrentSalary: curSalary,
            ExpSalary: expSalary,
            NotcPeriod: notcPeriod,
            IndustryID: industryID,
            Locations: prefLocation
        }
        setBasicData(JSON.stringify(basicArray))
        handleShow(2);
    }
    const handleDeleteProfessional = async (professionalId) => {
        // setopenLoader(true);
        const res = await ProfileService.deleteProfessionaldetail(professionalId);
        if (res.isSuccess) {
            ShowAlert(1, res.message);
        } else {
            ShowAlert(0, res.message);
        }
        initProfileData();
        initProfileData();
        initProfilePercentage();
        //setopenLoader(false);
    }
    const handleAddQualification = () => {
        const qualArray = {
            qualID: null,
            qualSpID: null,
            qualInstID: null,
            qualYear: null,
            qualResumeID: null,
        }
        setCanQualData(JSON.stringify(qualArray))
        handleShow(4);
    }
    const handleDeleteQualification = async (canResId) => {
        //setopenLoader(true);
        const res = await ProfileService.deleteQualification(canResId);
        if (res.isSuccess) {
            ShowAlert(1, res.message);
        } else {
            ShowAlert(0, res.message);
        }
        initProfileData();
        initProfileData();
        initProfilePercentage();

        //setopenLoader(false);
    }
    const handleEditPersonal = (dob, gender, maritalStatusID, relgID, passNo, passIssuePlace, passIssueDate, passExpiryDate, lang) => {
        const personalArray = {
            CandidateDateOfBirth: dob,
            CandidateGender: gender,
            MaritalStatusID: maritalStatusID,
            ReligionID: relgID,
            CandidatePassportNo: passNo,
            CandidatePassportIssuePlace: passIssuePlace,
            CandidatePassportIssueDate: passIssueDate,
            CandidatePassportExpiryDate: passExpiryDate,
            Lang: lang
        }
        setPersonalData(JSON.stringify(personalArray))
        handleShow(5);
    }
    const handleUploadImage = async (event) => {
        var image = document.getElementById("output");
        const img = event.target.files[0];
        if (img && img.size > 0) {
            const file = img;
            if (file.size > maxPicSize) {
                ShowAlert(0, "Upload photo less than 1 MB.");
                document.getElementById("file").value = "";
                return false;
            } else {
                let fileName = file.name;
                let fileExt = fileName.split('.').pop().toLowerCase();
                if (fileExt === 'gif' || fileExt === "jpg" || fileExt === "jpeg" || fileExt === "png" || fileExt === "jfif" || fileExt === "pjpeg" || fileExt === "svg" || fileExt === "webp") {
                    image.src = URL.createObjectURL(file);
                    let base64PicString = await blobToBase64DataURL(file);
                    try {
                        setopenLoader(true);
                        const reqData = {
                            CandidateID: AuthService.getCurrentUser().referenceID,
                            IsPhoto: true,
                            FileName: fileName,
                            Base64FileString: base64PicString
                        }
                        const res = await ProfileService.updatePhotoOrResume(reqData);
                        if (res.isSuccess) {
                            ShowAlert(1, res.message);

                        } else {
                            ShowAlert(0, res.message);
                        }
                        initProfileData();
                        setopenLoader(false);
                    } catch (error) {
                        setopenLoader(false);
                    }
                } else {
                    ShowAlert(0, "pic extension should be in .gif ,.jpg,.peg,.png,.jfif,.pjpeg,.svg,.webp ");
                    return false;
                }
            }
        }
    }

    const handleUploadResume = async (event) => {
        const resume = event.target.files[0];
        console.log("resume", resume);

        if (resume && resume.size > 0) {
            const file = resume;
            if (file.size > maxFileSize) {
                ShowAlert(0, "Resume size is greater than permitted");
                initProfileData();
            } else {
                let filename = file.name.replace(/[&\/\\#,+()$~%'":*?<>{}|]/g, '');
                let fileExt = filename.split('.').pop().toLowerCase();
                if (fileExt === 'pdf' || fileExt === 'doc' || fileExt === 'docx') {
                    let base64PicString = await blobToBase64DataURL(file);
                    try {
                        setopenLoader(true);
                        const reqData = {
                            CandidateID: AuthService.getCurrentUser().referenceID,
                            IsPhoto: false,
                            FileName: filename,
                            Base64FileString: base64PicString
                        }
                        const res = await ProfileService.updatePhotoOrResume(reqData);
                        if (res.isSuccess) {
                            ShowAlert(1, res.message);
                        } else {
                            ShowAlert(0, res.message);
                        }
                        initProfileData();
                        setopenLoader(false);
                    } catch (error) {
                        setopenLoader(false);

                    }
                } else {
                    ShowAlert(0, "resume extension should be in .pdf, .doc, .docx ");
                    return false;
                }
            }


        }

    }
    const downloadResume = (base64, fileName) => {
        try {
            downloadFile(base64, fileName);
        } catch (error) { }

    }
    const blobToBase64DataURL = (blob) => new Promise(
        resolvePromise => {
            const reader = new FileReader();
            reader.onload = () => resolvePromise(reader.result);
            reader.readAsDataURL(blob);
        }
    )
    const downloadFile = (base64, fileName, type) => {
        try {
            debugger
            let fileExt = fileName.split('.').pop().toLowerCase();
            const link = document.createElement('a');
            if (base64.includes('data:application')) {
                link.href = base64;
                link.download = fileName;
                link.click();
            } else {
                switch (fileExt) {
                    case "docx":
                    case "doc":
                        link.href = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64}`;
                        break;
                    case "xls":
                        link.href = `data:application/vnd.ms-excel;base64,${base64}`;
                        break;
                    case "xlsx":
                        link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
                        break;
                    case "pdf":
                        link.href = `data:application/pdf;base64,${base64}`;
                        break;
                    case "text":
                        link.href = `data:text/plain;base64,${base64}`;
                        break;
                    default:
                        link.href = base64;
                        break;
                }
                link.download = fileName;
                link.click();
            }
        } catch (error) {

        }
    }
    /*methods for mobile email otp send */
    const handleEmailClose = (_, reason) => {
        if (reason !== "backdropClick") {
            setOpenEmail(false);
            setopenLoader(false);
        }
    }
    const handleMobileClose = (_, reason) => {
        if (reason !== "backdropClick") {
            setOpenMobile(false);
            setopenLoader(false);
        }
    }
    const getEmail = () => {
        setValue("emailid", generalInfo.CandidateEmailID);
        setContactUpdateMessage("");
        setemailAvailableMessage("");
        setOpenEmail(true);
        setIsEnter(false);
        setemailOtp("");
    }
    const getMobileNo = () => {
        countryDD.filter(function (f) {
            if (parseInt(f.value) === generalInfo.CountryID) {
                var cuSelected = { label: f.label, value: f.value, MaxMobilelength: f.MaxMobilelength, MinMobilelength: f.MinMobilelength };
                setCountryvalue(cuSelected);
            }
        })
        setValue("mobile-no", generalInfo.CandidateMobileNo);
        setOpenMobile(true);
        setContactUpdateMessage("");
        setmobileAvailableMessage("");
        setcountrySelectIsDisable(false);
        setisShowMobileCountryCodeErr(false);
        setIsEnter(false);
        setmobileOtp("");
    }
    const handlUpdateEmail = async () => {
        setemailAvailableMessage("");
        let email = document.getElementById('eid').value;
        if (email === "" || email === undefined || email === null) {
            ShowAlert(0, "Please enter email");
            return false;
        } else {
            setEmailID(email);
            const emailRegx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
            if (emailRegx.test(email)) {
                const data = {
                    ContactTypeID: 2,
                    OTP: "",
                    CandidateID: AuthService.getCurrentUser().referenceID,
                    Contact: email
                }
                if (mobileEmailErrorCount === 0) {

                    const res = await ProfileService.UpdateCandidateEmailOrMobile(data);

                    if (res.isSuccess) {
                        setOTPSuccessMessage(res.message);
                        setiUpdateMobileOrEmailMessage("green");
                        setIsEnter(true);
                        document.getElementById("sbtn").style.display = "none";
                        document.getElementById("eid").readOnly = true;
                        setTimeout(() => {
                            setOTPSuccessMessage("");
                        }, 5000);
                        initProfilePercentage();
                    }
                    else {
                        setOTPSuccessMessage(res.message);
                        setiUpdateMobileOrEmailMessage("red");
                        setTimeout(() => {
                            setOTPSuccessMessage("");
                            setOpenEmail(false);
                        }, 2000);
                        initProfilePercentage();
                    }
                }
            }
            else {
                ShowAlert(0, "please enter valid email");
            }
        }
    }
    const handleUpdateMobile = async () => {
        let mobile = document.getElementById('mid').value;
        mobile = mobile.replace(/[^0-9]/g, '');
        if (mobile === "" || mobile === undefined || mobile === null) {
            ShowAlert(0, "Please enter mobile no ")
        } else {
            setMobileNo(mobile);
            if (mobile.length > countryvalue.MinMobilelength || mobile.length <= countryvalue.MaxMobilelength) {
                const data = {
                    ContactTypeID: 1,
                    OTP: "",
                    CandidateID: AuthService.getCurrentUser().referenceID,
                    Contact: mobile,
                    CountryID: countryvalue.value
                }
                if (mobileEmailErrorCount === 0) {
                    const res = await ProfileService.UpdateCandidateEmailOrMobile(data);
                    if (res.isSuccess) {
                        setiUpdateMobileOrEmailMessage("green");
                        setOTPSuccessMessage(res.message);
                        setIsEnter(true);
                        document.getElementById("sbtn").style.display = "none";
                        document.getElementById("mid").readOnly = true;
                        setcountrySelectIsDisable(true);
                        setTimeout(() => {
                            setOTPSuccessMessage("");
                        }, 2000);
                        initProfilePercentage();
                    }
                    else {
                        setiUpdateMobileOrEmailMessage("red");
                        setOTPSuccessMessage(res.message);
                        setTimeout(() => {
                            setOTPSuccessMessage("");
                            setOpenMobile(false);
                            setcountrySelectIsDisable(false);
                        }, 2000);
                        initProfilePercentage();
                    }
                }
            } else {
                var max = MaxMobilelength(countryvalue);
                document.getElementById("idxMobilePatternError").innerHTML = `Please enter a valid mobile number length should be ${max}`;
            }
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
    const getOTPVerify = async () => {
        if (emailOtp) {
            let email = emailID;
            const data = {
                ContactTypeID: 2,
                OTP: emailOtp,
                CandidateID: AuthService.getCurrentUser().referenceID,
                Contact: email
            }
            const updateRes = await ProfileService.UpdateCandidateEmailOrMobile(data);
            if (updateRes.isSuccess) {
                setemailAvailableMessage("");
                setContactUpdateMessage(updateRes);
                setemailOtp("");
                ShowAlert(1, updateRes.message);
                initProfileData();
                initProfilePercentage();
                setOpenEmail(false);
            } else {
                setOTPSuccessMessage("");
                setemailOtp("");
                setContactUpdateMessage(updateRes);
                ShowAlert(0, updateRes.message);
            }
        }
        else if (mobileOtp) {
            let mobile = mobileNo;
            const data = {
                ContactTypeID: 1,
                OTP: mobileOtp,
                CandidateID: AuthService.getCurrentUser().referenceID,
                Contact: mobile,
                CountryID: countryvalue.value
            }
            const updateRes = await ProfileService.UpdateCandidateEmailOrMobile(data);
            if (updateRes.isSuccess) {
                setmobileAvailableMessage("")
                setContactUpdateMessage(updateRes);
                setOTPSuccessMessage("");
                setmobileOtp("");
                setcountrySelectIsDisable(false);
                ShowAlert(1, updateRes.message);
                initProfileData();
                initProfilePercentage();
                setOpenMobile(false);
            } else {
                setOTPSuccessMessage("");
                setmobileOtp("");
                setContactUpdateMessage(updateRes);
                ShowAlert(0, updateRes.message);

            }
        } else {
            ShowAlert(0, "fill otp field");
        }
    }

    const IsNullOrEmpty = (v) => {
        if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
            return true;
        } else {
            return false;
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
            // if (!errors.email?.type === 'pattern' || errors.email?.type === undefined)
            //     document.getElementById("idxEmailError").innerHTML = "Please Enter email";
        }
    }
    const MaxMobilelength = (v) => {
        return (v.MaxMobilelength);
    }
    const MinMobilelength = (v) => {
        return (v.MinMobilelength);
    }
    const handleMobileChange = (v) => {
        v = v.replace(/[^0-9]/g, '');
        document.getElementById("mid").value = v;
        if (!IsNullOrEmpty(v)) {
            if (v.length > MaxMobilelength(countryvalue)) {
                var moblength = MaxMobilelength(countryvalue);
                document.getElementById("idxMobilePatternError").innerHTML = `Please enter a valid mobile number length should be les than ${moblength}`;
                setmobileAvailableMessage("");
            }
            document.getElementById("idxMobileError").innerHTML = "";
            if (v.length === MaxMobilelength(countryvalue)) {
                if (countryvalue.value) {
                    isEmailOrMobileAvailable(countryvalue.value, v, 1);
                    document.getElementById("idxMobilePatternError").innerHTML = "";
                }
            } else {
                //CHANGES BY SHADAB 1-9
                setmobileAvailableMessage("");
            }
        } else {
            document.getElementById("idxMobileError").innerHTML = "Please enter mobile number";
        }
    }

    const numberOnly = (event) => {

        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    const isEmailOrMobileAvailable = async (cId, emailorMobile, type) => {
        let errCount = 0;
        if (!IsNullOrEmpty(emailorMobile)) {
            switch (type) {
                case 1:
                    const res = await CandidateRegService.checkIsEmailOrMobileExist(cId, emailorMobile, "1");
                    if (res.isSuccess) {
                        errCount += 0;
                        setmobileAvailableMessage(res.message);
                        setmobileAVColor("#1bc23f");
                    } else {
                        errCount += 1;
                        setmobileAvailableMessage(res.message);
                        setmobileAVColor("#ff0000");
                    }
                    break;
                case 2:
                    const res1 = await CandidateRegService.checkIsEmailOrMobileExist(cId, emailorMobile, "2");
                    if (res1.isSuccess) {
                        errCount += 0;
                        setemailAvailableMessage(res1.message);
                        setemailAVColor("#1bc23f");
                    } else {
                        errCount += 1;
                        setemailAvailableMessage(res1.message);
                        setemailAVColor("#ff0000");
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
        setMobileEmailErrorCount(errCount);
    }
    const handleSelectCountry = (selectedOption) => {
        if (selectedOption) {
            setCountryvalue(selectedOption);
            setisShowMobileCountryCodeErr(false);
            let val = document.getElementById("mid").value;
            if (!IsNullOrEmpty(val)) {
                if (val.length > selectedOption.MaxMobilelength) {
                    document.getElementById("idxMobilePatternError").innerHTML = `Please enter a valid mobile number length should be less than ${selectedOption.MaxMobilelength}`;
                }
                if (!errors.mobile?.type === 'required' || errors.mobile?.type === undefined)
                    document.getElementById("idxMobileError").innerHTML = "";
            } else {
                if (!errors.mobile?.type === 'required')
                    document.getElementById("idxMobileError").innerHTML = "Please enter mobile number";
            }
            if (val.length === 10 && selectedOption.value) {
                isEmailOrMobileAvailable(selectedOption.value, val, 1);
            } else {
                setmobileAvailableMessage("");
            }
        } else {
            setmobileAvailableMessage("");
            setCountryvalue([]);
            let val = document.getElementById("mid").value;
            if (!IsNullOrEmpty(val)) {
                setisShowMobileCountryCodeErr(true);
            } else {
                setisShowMobileCountryCodeErr(false);
                if (!errors.mobile?.type === 'required' || errors.mobile?.type === undefined)
                    document.getElementById("idxMobileError").innerHTML = "";
            }
        }
    }
    const clickToviewProfileImage = () => {
        if (AuthService.get_userImage_Or_pic(2) === "" || AuthService.get_userImage_Or_pic(2) === undefined || AuthService.get_userImage_Or_pic(2) === null) {
            handleProfileImageClose()
        }
        else {
            handleProfileImageShow();
        }
    }
    /*methods for mobile email otp send  end*/
    const [docOpen, setOtherdocOpen] = useState(false);
    const [docTypelist, setdocTypeList] = useState([]);
    const [fileValidationErrorMessage, setfileValidationErrorMessage] = useState("");
    const [fileName, setFileName] = useState("");
    const handleOpenOtherDocumentModalOnClick = () => {
        setOtherdocOpen(true);
    }
    const handleCloseOtherDocument = () => {
        setFileName("");
        setOtherdocOpen(false);
    }
    const handleUploadDocClick = async () => {
        let doc = document.getElementById("docID");
        let doctypeId = document.getElementById("docTypeID").value;
        const docFile = doc.files[0];
        if (docFile && docFile.size > 0) {
            const file = docFile;
            if (file.size > maxPicSize) {
                ShowAlert(0, "Document size is greater than permitted.");

            } else {
                let filename = file.name.replace(/[&\/\\#,+()$~%'":*?<>{}|]/g, '');
                const docExt = docFile.name.split('.').pop().toLowerCase();
                if (docExt === 'pdf' || docExt === 'doc' || docExt === 'docx') {
                    let base64String = await blobToBase64DataURL(file);
                    try {
                        setopenLoader(true);
                        const reqData = {
                            EncCandidateID: AuthService.getCurrentUser().referenceID,
                            FileName: filename,
                            Base64FileString: base64String,
                            DocTypeID: parseInt(doctypeId)
                        }
                        const res = await ProfileService.UploadCandidateDocuments(reqData);
                        if (res.isSuccess) {
                            ShowAlert(1, res.message);
                            handleCloseOtherDocument();
                            initProfileData();
                        } else {
                            ShowAlert(0, res.message);
                        }

                        setopenLoader(false);
                    } catch (error) {
                        setopenLoader(false);

                    }
                } else {
                    ShowAlert(0, "Document extension should be in .pdf, .doc, .docx. ");
                    return false;
                }
            }
        }
    }

    const handleDocChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            if (file.size > 0) {
                if (file.size > maxPicSize) {
                    setfileValidationErrorMessage("Document size must be less than 1mb");
                    document.getElementById("docID").value = "";
                    return;
                }
                let filename = file.name;
                setFileName(filename);
                let fileExt = filename.split('.').pop().toLowerCase();
                if (fileExt === 'gif' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'png' || fileExt === 'bmp' ||
                    fileExt === 'doc' || fileExt === 'docx' || fileExt === 'pdf' || fileExt === 'xls' || fileExt === 'xlsx' || fileExt === 'csv ') {
                    setfileValidationErrorMessage("");
                } else {
                    setfileValidationErrorMessage("Resume extension should be in .doc,.docx or .pdf ");
                }
            }
        } else {
            setfileValidationErrorMessage("");
        }
    }
    const handleDownloadDocClick = (base64, fileName) => {
        try {
            setopenLoader(true);
            downloadFile(base64, fileName);
            setopenLoader(false);
        } catch (error) { setopenLoader(false); }
    }
    const returnFileextensionIcon = (e) => {
        // return 'bx bxs-food-menu';
        // return 'bx bxs-book-content';
        return 'bx bxs-detail';
    }
    const CloseModal = (res) => {
        if (res === 1) {
            handleLoginClose();
            initProfileData();
            initProfilePercentage();
        } else {
            navigate({
                pathname: "/",
            })
        }


    }
    const docTypeList = async () => {
        try {
            const docType = await CommonService.getDocTypes();
            docType.shift();
            docType.pop();
            docType ? setdocTypeList(docType) : setdocTypeList([]);
        } catch (error) { }
    }

    //#region  KeySkill
    const [keyskillMOdalOpen, setKeyskillMOdalOpen] = useState(false);
    const [KeyWordsList, setKeyWordsList] = useState([]);
    const [suggestionText, setSuggestionText] = useState([]);
    const handleOpenKeyskillModalOnClick = () => {
        setKeyskillMOdalOpen(true);
    }
    const handleCloseKeySkillModal = () => {
        setKeyskillMOdalOpen(false);
    }
    const handleInputChange = (inputText) => {
        if (inputText.length > 0) {
            const text = inputText.split(',')
            if (text.length > 15) {
                ShowAlert(0, "Max 15 Skills only")
            } else {
                setSuggestionText(text[text.length - 1])
                setKeystringSkils(inputText)
                initKeyWordsList(text[text.length - 1].trim());
            }

        } else {
            setKeyWordsList([]);
            setKeystringSkils("")
        }
    };
    const onclickhideKeyWordList = (e) => {
        setKeyWordsList([]);
    };
    const onClickKeywordHandler = (e) => {
        try {
            let oldText = document.getElementById("idxmyInput").value;
            if (suggestionText.trim().length > 0) {
                oldText = oldText.slice(0, -suggestionText.trim().length)
            }
            setKeystringSkils(oldText + e + ' , ');
            setKeyWordsList([]);
        } catch (error) {
            console.log(error);
        }
    };
    const initKeyWordsList = async (inputText) => {
        try {
            if (inputText !== "" && inputText !== undefined && inputText !== null) {
                const keyWords = await ProfileService.GetKeyskills(inputText);
                if (keyWords.isSuccess) {
                    const res = JSON.parse(keyWords.apiData);
                    let keywordsuggesstion = [];
                    res.forEach((element) => {
                        keywordsuggesstion.push(element.Keyskill);
                    });
                    try {
                        const skillsString = document.getElementById("idxmyInput").value;
                        const skills = skillsString.split(',');
                        const filteredKeywordSuggestion = keywordsuggesstion.filter(
                            keyword => !skills.includes(keyword)
                        );
                        setKeyWordsList(filteredKeywordSuggestion);
                    } catch { }

                } else {
                    setKeyWordsList([]);
                }
            } else {
                setKeyWordsList([]);
            }
        } catch (error) {
            console.error(error);
            setKeyWordsList([]);
        }
    };
    const handleUpdateKeySkills = async (v) => {
        let val = document.getElementById("idxmyInput").value;
        if (val) {
            const refId = AuthService.getCurrentUser().referenceID;
            const encodedStr = encodeURIComponent(val);
            const res = await ProfileService.updateKeySkills(refId, encodedStr);
            if (res.isSuccess) {
                ShowAlert(1, res.message);
                setKeyskillMOdalOpen(false);
                initProfileData();
            }
            else {
                ShowAlert(0, res.message);
                setKeyskillMOdalOpen(true);
            }

        }
    }
    //#endregion

    useEffect(() => {
        docTypeList();
        initProfilePercentage();
        initCountry();
        if (AuthService.isAuthenticatedUser()) {
            initProfileData();
        } else {
            handleLoginShow();
            navigate({
                pathname: "/myprofile",
            })
            initProfileData();
        }
    }, [])

    const location = useLocation();
    const callFunction = location.state?.callFunction;

    React.useEffect(() => {
        if (callFunction) {
            handleUploadResume();
        }
    }, [callFunction]);

    const fileInputRef = useRef(null);
    const fileUpdateRef = useRef(null);





    useEffect(() => {
        const setFile = () => {
            const triggerFileInput =
                localStorage.getItem("triggerFileInput") === "true";
            if (triggerFileInput) {
                localStorage.removeItem("triggerFileInput");
                if (resume) {
                    // debugger;
                    if (fileUpdateRef.current) {
                        console.log("fileUpdateRef", fileUpdateRef.current);
                        fileUpdateRef.current.click();
                    }
                } else {
                    if (fileInputRef.current) {
                        console.log("fileInputRef", fileInputRef.current);
                        fileInputRef.current.click();
                    }
                }
            }
        };

        setTimeout(setFile, 2000);
    }, []);




    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
            >
                <NewLoader />
            </Backdrop>

            {/* Login Modal */}
            <Modal
                show={loginShow}
                size='lg'
                onHide={handleLoginClose}
                animation={true}
            >
                <LoginModal CallbackRes={CloseModal} />

            </Modal>
            {/* Login Modal end */}
            {/* View Profile Image Modal */}
            <Modal show={showprofileImage}
                onHide={handleProfileImageClose}
                animation={true}
                centered
                size='md'
                closeButton
            >

                <span onClick={handleProfileImageClose} id="close">✖</span>
                <img src={AuthService.get_userImage_Or_pic(2)} style={{ width: "100%" }} alt="" />
            </Modal>
            {/* View Profile Image Modal */}
            {/* // --------------------start upload doc modal ----------------------------*/}
            <Modal
                show={docOpen}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h1 className="modal-title fs-5" id="uploadNewDocumentModalLabel"> Upload New Document</h1>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => handleCloseOtherDocument()}></button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="row">
                        <div id="fileHelpId" className="form-text"> <span style={{ color: "red" }}>*</span> {t("Upload only .pdf,.doc,.docx max size upto 1Mb")} </div>
                        <div className="col-12 mb-3">
                            <label for="" className="form-label fw-bold">Document</label>
                            <div className="custom-file-select">
                                <input type="file" className="form-control" onChange={(e) => handleDocChange(e)} id="docID" placeholder="" aria-describedby="fileHelpId" required />
                                <div className="file-start">
                                    <button className="btn btn-primary">Upload</button>
                                    <span>{fileName ? fileName : <span>DOC, DOCx, PDF</span>}</span>
                                </div>
                                {/* <!-- <div className="file-end">Max: 5 MB</div> --> */}
                            </div>
                            {IsNullOrEmpty(fileValidationErrorMessage) ? null : <span className="text-danger mt-1 f13">{fileValidationErrorMessage}</span>}
                        </div>
                        <div className="col-12 mb-3">
                            <label for="" className="form-label fw-bold">Document Type</label>
                            <select className="form-select" id="docTypeID" required //onChange={() => this.handleDocTypeChange()}
                            >
                                <option value="">--- Select Doc Type ---</option>
                                {
                                    docTypelist.map((d, i) =>
                                        <option key={i} value={d.value}>{d.label}</option>
                                    )
                                }
                            </select>

                        </div>

                    </div>
                </Modal.Body>
                <div className="modal-footer border-0 pt-0" id="CanDocFooter">
                    {/* <button type="button" className="btn btn-white" onClick={() => handleCloseOtherDocument()}>Cancel</button> */}
                    <button type="button" className="btn btn-primary" onClick={() => handleUploadDocClick()} id="CanDocSaveBtn" >Submit</button>
                </div>
            </Modal>
            {/* // --------------------end upload doc modal ----------------------------*/}

            {/* // --------------------start upload doc modal ----------------------------*/}
            <Modal
                show={keyskillMOdalOpen}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header>
                    <Modal.Title>
                        <h1 className="modal-title fs-5" id="uploadNewDocumentModalLabel"> Update Key Skills</h1>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => handleCloseKeySkillModal()}></button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="row">
                        <div id="fileHelpId" className="form-text"> <span style={{ color: "red" }}>*</span> Please enter your key skills with comma seperated</div>
                        <div className="search-container">
                            <div className="skill-search input-group">
                                <textarea
                                    type="text"
                                    placeholder="Enter Key Skills"
                                    className="form-control"
                                    id="idxmyInput"
                                    autoComplete="off"
                                    list="KeywardSuggetions"
                                    value={keystringSkils}
                                    required
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    onBlur={(e) => onclickhideKeyWordList(e.target.value)}
                                />
                            </div>

                            <div className={KeyWordsList.length > 0 ? "search-datalist-div" : "searchlist-hidden"} style={{ marginTop: "1.5%" }}>
                                <ul className="searchlist">
                                    {KeyWordsList.map((keyword, i) => {
                                        return (
                                            <li
                                                onMouseDown={() => onClickKeywordHandler(keyword)}
                                                className="datalist-list"
                                                key={i}
                                            >
                                                {keyword}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <div className="modal-footer border-0 pt-0" id="CanDocFooter">
                    <button type="button" className="btn btn-primary" onClick={() => handleUpdateKeySkills()} id="CanDocSaveBtn" >Submit</button>
                </div>
            </Modal>
            {/* // --------------------end upload doc modal ----------------------------*/}
            <Layout>
                <section>
                    <div className="container mt-5">
                        {/* Profile Header Start*/}
                        <div className="profile-information-items shadow-sm">
                            <div className="item">
                                <div className="avatar" style={{ cursor: "pointer" }} onClick={() => clickToviewProfileImage()}>
                                    <img src={UserPng} id='output1' alt="" />
                                </div>
                                <div className="content">
                                    <div className="header">
                                        <h4>{generalInfo.CandidateFirstName}</h4>
                                        <button className="btn btn-link btn-sm"></button>
                                    </div>
                                    <p>{generalInfo.CandidateCurrentPosition}<br />
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
                            <div className="col-md-3 mb-4 mb-md-0" style={{ display: isMobile ? "none" : "" }}>
                                <div className="card card-navigation shadow-sm">
                                    <div className="card-header">
                                        <h5 className="card-title">{t("My_Account")}</h5>
                                    </div>
                                    <ul className="card-body p-0 ul-parent">
                                        <li onClick={(e) => handleLeftMenuClick(e, "#generalInfo", "generalRef")}><a className="active" style={{ cursor: "pointer" }}>{t("General_Info")}</a></li>
                                        <li onClick={(e) => handleLeftMenuClick(e, "#basicDetails", "basicRef")}><a className="" style={{ cursor: "pointer" }}>{t("Basic_Details")}</a></li>
                                        <li onClick={(e) => handleLeftMenuClick(e, "#ProfessionalDetails", "professionalRef")}><a className="" style={{ cursor: "pointer" }}>{t("Professional_Details")}</a></li>
                                        <li onClick={(e) => handleLeftMenuClick(e, "#EducationDetails", "educationRef")}><a className="" style={{ cursor: "pointer" }}>{t("Education_Details")}</a></li>
                                        <li onClick={(e) => handleLeftMenuClick(e, "#idxKeySkills", "keySkillsRef")}><a className="" style={{ cursor: "pointer" }}>{t("Key_Skills")}</a></li>
                                        <li onClick={(e) => handleLeftMenuClick(e, "#PersonalDetails", "personalRef")}><a className="" style={{ cursor: "pointer" }}>{t("Personal_Details")}</a></li>
                                        <li onClick={(e) => handleLeftMenuClick(e, "#otherDocuments", "otherRef")}><a className="" style={{ cursor: "pointer" }}>{t("Other_Document")}</a></li>
                                        {/* <li><a onclik={handleScrolMyProfile(6)} className="">Settings</a></li> */}
                                    </ul>
                                </div>
                            </div>
                            {/* Profile Left Menu End*/}
                            <div className="col-md-9 mb-4 mb-md-0">
                                {/* General Info Start */}
                                <div className="card card-information card-profile shadow-sm" id="generalInfo" ref={generalRef}>
                                    <div className="card-header">
                                        <h5 className="card-title">{t("General_Info")}</h5>
                                        <button className="btn btn-link" data-bs-target="#generalInfoModal"  >
                                            <i onClick={() => handleEditGeneralInfo(generalInfo.CandidateFirstName, generalInfo.CandidateCurrentPosition, generalInfo.CandidatePassportIssuedByCountryID, generalInfo.CandidateCurrentLocationID, generalInfo.CandidateDomExperienceMonths, generalInfo.CandidateDomExperienceYearsFrom, generalInfo.CandidateExperienceMonths, generalInfo.CandidateExperienceYearsFrom)} className='bx bxs-edit-alt'></i></button>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-12 mb-4">
                                                <div className="label">{t("Name")}</div>
                                                <div className="value">{generalInfo.CandidateFirstName}</div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <div className="label">{t("Primary_Email")}</div>
                                                {generalInfo.CandidateEmailID ?
                                                    <div className="value">{generalInfo.CandidateEmailID}{generalInfo.IsEmailVerified ? <span><i className='icon text-success bx bxs-check-circle'></i></span> : null}&nbsp;
                                                        <i onClick={() => getEmail()} data-bs-target="#emailModal" className='bx bxs-edit-alt' style={{ cursor: "pointer", color: "#82919E", fontSize: "20px" }}></i>
                                                    </div>
                                                    : <div className="value">{t("Add_Email")}&nbsp;
                                                        <i onClick={() => getEmail()}
                                                            data-bs-target="#emailModal"
                                                            className='icon bx bx-plus'
                                                            style={{ cursor: "pointer", color: "#82919E", fontSize: "20px" }}
                                                        ></i>
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <div className="label">{t("Mobile_number")}</div>
                                                <div className="value">{generalInfo.CountryISDCode ? <span>(+{generalInfo.CountryISDCode})</span> : null} {generalInfo.CandidateMobileNo}{generalInfo.IsMobileVerified ? <span><i className='icon text-success bx bxs-check-circle'></i></span> : null}&nbsp;
                                                    <i onClick={() => getMobileNo()} data-bs-target="#mobileModal" className='bx bxs-edit-alt' style={{ cursor: "pointer", color: "#82919E", fontSize: "20px" }}></i>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <div className="label">{t("Current_Position")}</div>
                                                <div className="value">{generalInfo.CandidateCurrentPosition ? <span>{generalInfo.CandidateCurrentPosition}</span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <div className="label">{t("Nationality")}</div>
                                                <div className="value">{generalInfo.CountryName ? <span>{generalInfo.CountryName}</span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <div className="label">{t("Current_Location")}</div>
                                                <div className="value">{generalInfo.LocationName ? <span>{generalInfo.LocationName}</span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <div className="label">{t("Resume")}</div>
                                                <div className="value">
                                                    {resume.ModifiedOn ? <span className="mt-1">{t("Last_Updated_On")}<span>&nbsp;({resume.ModifiedOn})</span>
                                                        <p>
                                                            <span title={resume.FileName} style={{ cursor: "pointer" }}> {resume.FileName.length <= 20 ? resume.FileName : resume.FileName.substring(0, 16) + "..."}</span>&nbsp;
                                                            <label>
                                                                <input id='resumefile' type="file" ref={fileUpdateRef}
                                                                    onChange={(e) => handleUploadResume(e)}
                                                                    style={{ display: "none" }}
                                                                    accept='.pdf, .doc, .docx'
                                                                />
                                                                <a className="btn-outline-primary btn" style={{ height: "1.85rem" }}>
                                                                    {t("Update")} <i className="bx bx-upload"></i>
                                                                </a>
                                                            </label>&nbsp;
                                                            <label>

                                                                <a onClick={() => downloadResume(resume.PreSignedUrl, resume.FileName)}
                                                                    className="btn-outline-primary btn" style={{ height: "1.85rem" }}>
                                                                    {t("Download")} <i className="bx bx-download"></i>
                                                                </a>
                                                            </label>
                                                        </p></span> :
                                                        <p><label>
                                                            <input id='resumefile' type="file" ref={fileInputRef}
                                                                onChange={(e) => handleUploadResume(e)}
                                                                style={{ display: "none" }}
                                                                accept='.pdf, .doc, .docx'
                                                            />
                                                            <a className="btn-outline-primary btn" style={{ height: "1.85rem" }}>
                                                                {t("Upload_Resume")}  <i className="bx bx-upload"></i>
                                                            </a>
                                                        </label></p>}
                                                </div>
                                                <div id="fileHelpId" className="form-text">* {t("Upload only .pdf,.doc,.docx max size upto 3Mb")}</div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <div className="label">{t("Domestic_Local_Exp")}</div>
                                                <div className="value">{generalInfo.CandidateDomExperienceYearsFrom || generalInfo.CandidateDomExperienceMonths ? <span>{generalInfo.CandidateDomExperienceYearsFrom}Year {generalInfo.CandidateDomExperienceMonths}Month </span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <div className="label">{t("Overseas_Abroad_Exp")}</div>
                                                <div className="value">{generalInfo.CandidateExperienceYearsFrom || generalInfo.CandidateExperienceMonths ? <span>{generalInfo.CandidateExperienceYearsFrom}Year {generalInfo.CandidateExperienceMonths}Month </span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* General Info End */}
                                {/* Basic Details Start */}
                                <div className="card card-information card-profile shadow-sm" id="basicDetails" ref={basicRef} >
                                    <div className="card-header">
                                        <h5 className="card-title">{t("Basic_Details")}</h5>
                                        <button className="btn btn-link" data-bs-target="#basicDetailsModal">
                                            <i onClick={() => handleEditBasicDetails(generalInfo.CandidateCurrentAnnualSalaryCurrencyID, generalInfo.CandidateExpectedAnnualSalaryCurrencyID, generalInfo.CandidateCurrentAnnualSalary, generalInfo.CandidateExpectedAnnualSalary, generalInfo.CandidateNoticePeriod, generalInfo.CandidateCurrentIndustryID, JSON.stringify(preferedLocation))}
                                                className='bx bxs-edit-alt'></i></button>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-6 mb-4">
                                                <div className="label">{t("Current_Salary")}</div>
                                                <div className="value">{generalInfo.CandidateCurrentAnnualSalary ? <span>{generalInfo.CandidateCurrentAnnualSalary} {generalInfo.CurrentSalaryCurrency}</span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <div className="label">{t("Expected_Salary")}</div>
                                                <div className="value">{generalInfo.CandidateExpectedAnnualSalary ? <span>{generalInfo.CandidateExpectedAnnualSalary} {generalInfo.ExpectedSalaryCurrency}</span> : <span>{t("Not_mentioned")}</span>}
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <div className="label">{t("Notice_Period")}</div>
                                                <div className="value">{generalInfo.NoticePeriod ? <span>{generalInfo.NoticePeriod}</span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <div className="label">{t("Industry")}</div>
                                                <div className="value">{generalInfo.IndustryName ? <span>{generalInfo.IndustryName}</span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                            <div className="col-sm-6 mb-4">
                                                <div className="label">{t("Preferred_Job_Location")}</div>
                                                <div className="value">
                                                    {preferedLocation.length > 0 ? preferedLocation.map((row, i) => (
                                                        <span key={i}>{(i ? ', ' : '') + row.LocationName}</span>
                                                    ))
                                                        : <span>{t("Not_mentioned")}</span>}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {/* Basic Details End */}
                                {/* Professional Details Start */}
                                <div className="card card-information card-profile shadow-sm" id="ProfessionalDetails" ref={professionalRef}>
                                    <div className="card-header">
                                        <h5 className="card-title">{t("Professional_Details")}</h5>
                                        <button className="btn btn-link" data-bs-target="#professionalDetailsModal"><i
                                            onClick={() => handleShow(3)} className='icon bx bx-plus'></i></button>
                                    </div>
                                    <div className="card-body">
                                        {professionData.length > 0 ? professionData.map((row, i) => (
                                            <div className="details-item" key={i}>
                                                <div className="item-start">
                                                    <h4>{row.FunctionalSpecializationName}</h4>
                                                    <h6>{row.Company}</h6>
                                                    <p>{row.StartDate ? <span> {row.StartDate} - {row.EndDate ? row.EndDate : "Currently Working"} </span> : ""}</p>
                                                    <p>{row.LocationName}</p>
                                                </div>
                                                <div className="item-end"><button className="btn btn-link"
                                                    data-bs-target="#professionalDetailsModal">
                                                    <i className='bx bxs-trash' onClick={() => handleDeleteProfessional(row.EncCandidateResumeProfessionalID)}></i></button></div>
                                            </div>
                                        )) : <p className="mt-2"><b>{t("Add_Professional_Dtails")}</b></p>
                                        }
                                    </div>
                                </div>
                                {/* Professional Details End */}
                                {/* Education Details start */}
                                <div className="card card-information card-profile shadow-sm" id="EducationDetails" ref={educationRef}>
                                    <div className="card-header">
                                        <h5 className="card-title">{t("Education_Details")}</h5>
                                        <button className="btn btn-link" onClick={() => handleAddQualification()} data-bs-target="#educationDetailsModal"><i
                                            className='icon bx bx-plus'></i></button>
                                    </div>
                                    <div className="card-body">
                                        {qualificationData.length > 0 ? qualificationData.map((row, i) => (
                                            <div className="details-item" key={i}>
                                                <div className="item-start">
                                                    <h4>{row.QualificationName}({row.QualificationSpecializationName})</h4>
                                                    <p className="multiple-info"><span>{t("Institute")}: <strong>{row.InstituteName ? row.InstituteName : <span>{t("Not_mentioned")}</span>}</strong></span>
                                                        <span>{t("Passing_Year")}:<strong>{row.CandidateResumeYearOfPassing ? row.CandidateResumeYearOfPassing : <span>{t("Not_mentioned")}</span>}</strong></span></p>
                                                </div>
                                                <div className="item-end"><button className="btn btn-link"
                                                    data-bs-target="#educationDetailsModal">
                                                    <i className='bx bxs-trash' onClick={() => handleDeleteQualification(row.EncCandidateResumeQualificationID)}></i></button></div>
                                            </div>
                                        )) : <p className="mt-2"><b>{t("Add_Education_Details")}</b></p>
                                        }
                                    </div>

                                </div>
                                <div className="card card-information card-profile shadow-sm" id="idxKeySkills" ref={keySkillsRef}>
                                    <div className="card-header">
                                        <h5 className="card-title">{t("Key_Skills")}</h5>
                                        <button className="btn btn-link" onClick={() => handleOpenKeyskillModalOnClick()} data-bs-target="#educationDetailsModal"><i
                                            className='icon bx bx-plus'></i></button>
                                    </div>
                                    <div className="card-body mb-3">
                                        {
                                            keySkils ?
                                                <div>
                                                    <Stack direction="row" spacing={2} alignItems="start" useFlexGap flexWrap="wrap">
                                                        {keySkils.map((skill) => (
                                                            <Chip label={skill} >{skill}</Chip>
                                                        ))}
                                                    </Stack>
                                                </div> : <p className="mt-2"><b>{t("Add_Key_Skills")}</b></p>
                                        }
                                    </div>
                                </div>
                                {/* Education Details End */}
                                {/* Personal Details Start */}
                                <div className="card card-information card-profile shadow-sm" id="PersonalDetails" ref={personalRef}>
                                    <div className="card-header">
                                        <h5 className="card-title">{t("Personal_Details")}</h5>
                                        <button className="btn btn-link" data-bs-target="#personalDetailsModal"><i
                                            onClick={() => handleEditPersonal(generalInfo.CandidateDateOfBirth, generalInfo.CandidateGender, generalInfo.MaritalStatusID, generalInfo.ReligionID, generalInfo.CandidatePassportNo, generalInfo.CandidatePassportIssuePlace, generalInfo.CandidatePassportIssueDate, generalInfo.CandidatePassportExpiryDate, JSON.stringify(languageData))} className='bx bxs-edit-alt'></i></button>
                                    </div>
                                    <div className="card-body">
                                        <div className="professional-items">
                                            <div className="professional-item">
                                                <div className="persnoal-info">
                                                    <div className="avatar" style={{ cursor: "pointer" }} >
                                                        <img src={UserPng} className='output' id="output" alt="" onClick={() => clickToviewProfileImage()} />
                                                        <label>
                                                            <input id="file" type="file"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => handleUploadImage(e)}
                                                                accept='.gif ,.jpg,.peg,.png,.jfif,.pjpeg,.svg,.webp'
                                                            />
                                                            <a className="btn btn-primary btn-edit"><i className='bx bx-edit-alt'></i></a>
                                                        </label>
                                                    </div>
                                                    <div className="details">
                                                        <div className="action-info">
                                                            <label>
                                                                <input id="file" type="file"
                                                                    style={{ display: "none" }}
                                                                    onChange={(e) => handleUploadImage(e)}
                                                                    accept='.gif ,.jpg,.peg,.png,.jfif,.pjpeg,.svg,.webp'
                                                                />
                                                                <a className="btn btn-sm btn-secondary">{t("Update_Photo")}</a>
                                                            </label>
                                                            <span>accept only .gif, .jpg, .peg, .png, .jfif, .pjpeg, .svg, .webp</span>
                                                            <span>Max: 1 MB</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="label">{t("DOB")}</div>
                                                <div className="value">{generalInfo.CandidateDateOfBirth ? <span>{generalInfo.CandidateDateOfBirth}</span>
                                                    : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="label">{t("Gender")}</div>
                                                <div className="value">{generalInfo.CandidateGender ? <span >{generalInfo.CandidateGender === "M" ? <span>Male</span> : <span>Female</span>}</span> : <span>{t("Not_mentioned")}</span>}
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="label">{t("Marital_Status")}</div>
                                                <div className="value">{generalInfo.MaritalStatusName ? <span>{generalInfo.MaritalStatusName}</span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="label">{t("Religion")}</div>
                                                <div className="value">{generalInfo.ReligionName ? <span>{generalInfo.ReligionName}</span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="label">{t("Passport_No")}</div>
                                                <div className="value">{generalInfo.CandidatePassportNo ? <span>{generalInfo.CandidatePassportNo}</span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>

                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="label">{t("Passport_Issue_place")}</div>
                                                <div className="value">{generalInfo.CandidatePassportIssuePlaceName ? <span>{generalInfo.CandidatePassportIssuePlaceName}</span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="label">{t("Passport_Issue_Date")}</div>
                                                <div className="value">{generalInfo.CandidatePassportIssueDate ? <span>{generalInfo.CandidatePassportIssueDate}</span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="label">{t("Passport_Expiry_Date")}</div>
                                                <div className="value">{generalInfo.CandidatePassportExpiryDate ? <span>{generalInfo.CandidatePassportExpiryDate}</span> : <span>{t("Not_mentioned")}</span>}</div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="label">{t("Languages")}</div>
                                                <div className="mt-1">
                                                    {
                                                        languageData.length > 0 ?
                                                            languageData.map((d, i) =>
                                                                <React.Fragment>
                                                                    <ul key={i}>
                                                                        <li>{d.Language} | {d.LanguageProficiency}</li>
                                                                    </ul>

                                                                </React.Fragment>

                                                            )
                                                            :
                                                            <div className="value">{t("Not_mentioned")}</div>
                                                    }
                                                </div>
                                            </div>


                                        </div>


                                    </div>
                                </div>
                                {/* Personal Details End */}
                                {/* Upload Other Documents start */}
                                <div className="card card-information card-profile shadow-sm" id="otherDocuments" ref={otherRef}>
                                    <div className="card-header">
                                        <h5 className="card-title"> {t("Other_Document")}</h5>
                                        <button className="btn btn-link" data-bs-target="#professionalDetailsModal" title='Add Document' onClick={() => handleOpenOtherDocumentModalOnClick()}><i className='icon bx bx-plus'></i> </button>
                                    </div>
                                    <div className="card-body">
                                        {otherDocuments.length || otherDocuments.length > 0 ? otherDocuments.map((row, i) => (
                                            <div className="details-item" key={i} title={row.DocName}>
                                                <div className="item-start">
                                                    <h4><i className={returnFileextensionIcon(row.FileName)}></i> {row.DocName ? row.DocName : "N/A"}</h4>
                                                    <h6>{row.FileName ? (row.FileName.length > 80 ? row.FileName.substring(0, 80) + '...' : row.FileName) : "N/A"}</h6>
                                                    <p>{row.ModifiedOn ? row.ModifiedOn : "N/A"}</p>
                                                </div>
                                                <div className="item-end"><button className="btn btn-link" data-bs-target="#professionalDetailsModal" title={"Download " + row.DocName} onClick={() => handleDownloadDocClick(row.PreSignedUrl, row.FileName)}><i className='bx bx-download' ></i></button></div>
                                                {/* <div className="item-end"><button className="btn btn-link" data-bs-target="#professionalDetailsModal" title={"Delete " + row.FileName}><i className='bx bxs-trash' ></i></button></div> */}
                                            </div>
                                        )) : <p className="mt-2"><b>{t("Other_Document")}</b></p>
                                        }
                                    </div>
                                </div>
                                {/* Upload Other Documents end */}
                            </div>
                        </div>
                    </div>

                    {/* <!-- Email Modal Start --> */}
                    <Modal
                        show={OpenEmail}
                        //size='lg'
                        centered
                        keyboard={false}
                    >
                        <Modal.Body>
                            <h1 className="modal-title fs-5" id="settingsModalLabel">{t("Edit_Email")}</h1>
                            <button type="button" onClick={() => setOpenEmail(false)} className="btn-close" aria-label="Close"></button>
                            <div className="row">
                                <div className="col-12 form-group m-0">
                                    <label htmlFor="" className="form-label">{t("Email")}</label>
                                    <input type="text" className='form-control' name='emailid' id='eid' maxLength={90}
                                        {...register("emailid",
                                            {
                                                pattern: {
                                                    value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
                                                },
                                                onChange: (e) => { handleEmailChange(e.target.value) },
                                            })}
                                    />
                                    {emailAvailableMessage === "" ? null : <span className="f13" style={{ color: emailAVColor }}>{emailAvailableMessage}<br /></span>}
                                    {errors.email?.type === 'required' && <p className='text-danger mt-1 f13'>Please enter email</p>}
                                    {errors.email?.type === 'required' ? null : <span className="text-danger f13" id="idxEmailError"></span>}
                                    {errors.email?.type === 'pattern' && <p className='text-danger mt-1 f13'>Please enter a valid email</p>}
                                    {errors.email?.type === 'pattern' ? null : <span className="text-danger f13" id="idxEmailPatternError"></span>}
                                    {contactUpdateMessage.isSuccess ?
                                        <span style={{ color: "Grren", fontSize: "13px" }}>{contactUpdateMessage.message}</span> :
                                        <span style={{ color: "Red", fontSize: "13px" }}>{contactUpdateMessage.message}</span>
                                    }
                                    <span style={{ color: iUpdateMobileOrEmailMessage, fontSize: "13px" }}>{otpSuccessMessage}</span>
                                    {isEnter ? <span className="f13" id="showOtp">
                                        <div className='row mt-3' style={{ alignItems: "baseline" }}>
                                            <div className="col-md-3 mt-2">
                                                <label className="control-label">Enter OTP</label>
                                            </div>
                                            <div className="col-md-7 mt-2">
                                                <OtpInput inputType="tel" id='emailid'
                                                    value={emailOtp}
                                                    onChange={(e) => handleOTPChange(e, 2)}
                                                    numInputs={6}
                                                    renderSeparator={<span>-</span>}
                                                    renderInput={(props) => <input {...props} className='otpbox form-control p-0' />}
                                                />
                                            </div>

                                            <div className="col-md-2 mt-2">
                                                <button type="button" className="btn btn-sm btn-primary" onClick={() => getOTPVerify()} >{t("Verify")}</button>
                                            </div>
                                            <label className="text-danger" id="idxOtpError"></label></div>
                                    </span> : null}
                                </div>
                            </div>
                            <Grid item xs={12} sm={12} className='mt-3' id="sbtn">
                                <button type="button" onClick={() => setOpenEmail(false)} className="btn btn-link" >{t("Cancel")}</button>
                                <button type="submit" style={{ float: "right" }} onClick={() => handlUpdateEmail()} className="btn btn-primary">Send OTP</button>
                            </Grid>
                        </Modal.Body>
                    </Modal>
                    {/* <!-- Email Modal End  --> */}
                    {/* <!-- Mobile Modal Start --> */}
                    <Modal
                        show={OpenMobile}
                        //size='lg'
                        centered
                        keyboard={false}
                    >
                        <Modal.Body>
                            <h1 className="modal-title fs-5" id="settingsModalLabel">{t("Edit_Mobile_No")}.</h1>
                            <button type="button" onClick={() => setOpenMobile(false)} className="btn-close" aria-label="Close"></button>
                            <div className="row mt-4">
                                <div className="col-4 form-group m-0">
                                    <label htmlFor="" className="form-label">{t("Country_Code")}</label>
                                    <Select
                                        onChange={handleSelectCountry}
                                        value={countryvalue}
                                        options={countryDD}
                                        isClearable
                                        isDisabled={countrySelectIsDisable}
                                    />
                                </div>
                                <div className="col-8 form-group m-0">
                                    <label htmlFor="" className="form-label">{t("Mobile")}</label>
                                    <input type="text" className='form-control' name='mobile-no' id='mid' minLength={MinMobilelength(countryvalue)} maxLength={MaxMobilelength(countryvalue)}

                                        {...register("mobile-no",
                                            {
                                                required: true,
                                                onChange: (e) => { handleMobileChange(e.target.value) },
                                            })
                                        }
                                    />
                                </div>
                                {isShowMobileCountryCodeErr ? <p className='text-danger mt-1 f13'>Please select country</p> : null}
                                {mobileAvailableMessage === "" ? null : <span className="f13" style={{ color: mobileAVColor }} >{mobileAvailableMessage}<br /></span>}
                                {errors.mobile?.type === 'required' && <p className='text-danger mt-1 f13'>Please enter mobile number</p>}
                                {errors.mobile?.type === 'required' ? null : <span className="text-danger f13" id="idxMobileError"></span>}
                                {errors.mobile?.type === 'pattern' && <p className='text-danger mt-1 f13'>Please enter 10 digit mobile number</p>}
                                {errors.mobile?.type === 'pattern' ? null : <span className="text-danger f13" id="idxMobilePatternError"></span>}
                                {contactUpdateMessage.isSuccess ?
                                    <span style={{ color: "Grren", fontSize: "13px" }}>{contactUpdateMessage.message}</span> :
                                    <span style={{ color: "Red", fontSize: "13px" }} id='mobotpErr'>{contactUpdateMessage.message}</span>
                                }
                                <span style={{ color: iUpdateMobileOrEmailMessage, fontSize: "13px" }}>{otpSuccessMessage}</span>
                                {isEnter ? <span className="f13" id="showOtp">
                                    <div className='row mt-3' style={{ alignItems: "baseline" }}>
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
                                            <button type="button" className="btn btn-sm btn-primary" onClick={() => getOTPVerify()} >{t("Verify")}</button>
                                        </div>
                                        <label className="text-danger" id="idxOtpError"></label>
                                    </div>
                                </span>
                                    : null}

                            </div>
                            <Grid item xs={12} sm={12} className='mt-3' id="sbtn">
                                <button type="button" onClick={() => setOpenMobile(false)} className="btn btn-link" >{t("Cancel")}</button>
                                <button type="button" onClick={() => handleUpdateMobile()} style={{ float: "right" }} className="btn btn-primary">{t("Submit")}</button>
                            </Grid>
                        </Modal.Body>
                    </Modal>
                    {/* <!-- Mobile Modal End  --> */}
                </section>
            </Layout >

            <Modal
                show={show}
                size='lg'
                onHide={handleClose}
                keyboard={false}
            >
                <Modal.Body>
                    {
                        OpenAction === 1 ? <EditGeneralInfo generalData={generalData} triggerClick={callBackModalClose} /> : null
                    }
                    {
                        OpenAction === 2 ? <EditBasicDetails basicData={basicData} triggerClick={callBackModalClose} /> : null
                    }
                    {
                        OpenAction === 3 ? <EditProfession triggerClick={callBackModalClose} /> : null
                    }
                    {
                        OpenAction === 4 ? <EditQualification qualData={canQualData} triggerClick={callBackModalClose} data={qualificationData} /> : null
                    }
                    {
                        OpenAction === 5 ? <EditPersonal personalData={personalData} triggerClick={callBackModalClose} /> : null
                    }

                </Modal.Body>
            </Modal>
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

export default MyProfile