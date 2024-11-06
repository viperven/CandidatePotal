import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import Select from 'react-select';
import { Link } from "react-router-dom";
import ForgotPassword from './ForgotPassword';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Modal, ModalBody } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import authimg from '../../assets/imgs/Frame-43341.avif'
import { AuthService } from '../../Services/AuthService';
import { CandidateRegService } from '../../Services/CanRegistration/CandidateRegService';

function LoginModal({ CallbackRes }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [openLoader, setopenLoader] = React.useState(false);
    const { register, setValue, formState: { errors }, handleSubmit } = useForm();
    const [ErrMessage, setErrMessage] = useState("");
    const [moborEmail, setMoborEmail] = useState("M");
    const [countryvalue, setCountryvalue] = useState([]);
    const [isShowMobileCountryCodeErr, setisShowMobileCountryCodeErr] = useState(false);
    const [countryDD, setCountryDD] = useState([]);
    const search = useLocation().search;
    let returnURL = new URLSearchParams(search).get('ReturnUrl');
    const qs = new URLSearchParams(search).get('qs');
    const btnSytle = {
        border: "2px solid #FF5C35",
        width: "100%",
        background: "#FFF",
        color: "#FF5C35",
        textTransform: "capitalize",
        fontSize: "1rem",
        display: "none",
    }
    const handleLoaderClose = () => {
        setopenLoader(false);
    };
    const handleSelectCountry = (selectedOption) => {
        if (selectedOption) {
            setCountryvalue(selectedOption);
            setisShowMobileCountryCodeErr(false);
            let val = document.getElementById("idxMobile").value;
            if (!IsNullOrEmpty(val)) {
                if (!errors.mobilenumber?.type === 'required' || errors.mobilenumber?.type === undefined)
                    document.getElementById("idxMobileError").innerHTML = "";
            } else {
                if (!errors.mobilenumber?.type === 'required')
                    document.getElementById("idxMobileError").innerHTML = "Please enter mobile number";
            }
        } else {
            setCountryvalue([]);
            let val = document.getElementById("idxMobile").value;
            if (!IsNullOrEmpty(val)) {
                setisShowMobileCountryCodeErr(true);
            } else {
                setisShowMobileCountryCodeErr(false);
                if (!errors.mobilenumber?.type === 'required' || errors.mobilenumber?.type === undefined)
                    document.getElementById("idxMobileError").innerHTML = "";
            }
        }
    }
    const onclickMoborEmail = (e) => {
        if (e === "M") {
            document.getElementById("emailerror").innerHTML = "";
        } else {
            setisShowMobileCountryCodeErr(false);
            document.getElementById("idxMobileError").innerHTML = "";
        }
        setMoborEmail(e)
        setValue("mobilenumber", "");
        setValue("email", "");
        setErrMessage("");
        setCountryvalue([]);
    }
    const loginSubmit = async (data) => {
        debugger
        let errorcount = 0;
        let countryid = 0;
        let emailormobile = "";
        let password = "";
        if (moborEmail === "M") {
            if (countryvalue.value === 0 || countryvalue.value === undefined || countryvalue.value === null) {
                countryid = 0;
                errorcount += 1
            }
            else {
                countryid = countryvalue.value;
            }
        } else {
            countryid = 0;
        }

        if (!IsNullOrEmpty(data.mobilenumber)) {
            emailormobile = data.mobilenumber;
            errorcount += 0
        }
        else {
            emailormobile = data.email;
            errorcount += 0
        }
        if (!IsNullOrEmpty(data.Password)) {
            password = data.Password;
        } else {
            password = "";
            errorcount += 1;
        }
        setErrMessage("");
        setopenLoader(true);
        try {
            if (errorcount === 0) {
                const res = await AuthService.LoginUser(emailormobile, countryid, password, "");
                if (res.isSuccess) {
                    CallbackRes(1);
                    setopenLoader(false);
                    setErrMessage("");
                } else {
                    if (moborEmail === "M") {
                        setErrMessage("Invalid mobile or password");
                    } else {
                        setErrMessage("Invalid emailid or password");
                    }
                }
                setopenLoader(false);
            }
            else {
                setopenLoader(false);
            }
        } catch (error) {
            setopenLoader(false);
        }

    }
    
    const handleShowPassword = (inputID, iconID) => {
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
    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => initGoogleUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    const initGoogleUser = async (token) => {
        try {
            debugger
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((g) => {
                    const gData = {
                        ID: g.data.id,
                        fullName: g.data.name,
                        fName: g.data.family_name,
                        lName: g.data.given_name,
                        email: g.data.email,
                        pic: g.data.picture
                    }
                    loginGoogleSubmit(gData)
                })
                .catch((err) => console.log(err));
        } catch (error) {
        }

    }
    const loginGoogleSubmit = async (g) => {
        try {
            const res = await AuthService.LoginUser(IsNullOrEmpty(g.email) ? "" : g.email, 0, "", g.ID.toString());
            if (res.isSuccess) {
                setopenLoader(false);
                CallbackRes(1);
                setopenLoader(false);
                setErrMessage("");

            } else {
                CallbackRes(-1);
                navigate(
                    {
                        pathname: "/register",
                        search: "?s-user=" + btoa(JSON.stringify(g))
                    });
                setErrMessage(res.message);
            }
            setopenLoader(false);
        } catch (error) {
            setopenLoader(false);
        }
    }
    const loginFaceBookSubmit = async (f) => {
        try {
            
            const res = await AuthService.LoginUser(IsNullOrEmpty(f.email) ? "" : f.email, 0, "", f.ID.toString());
            if (res.isSuccess) {
                setopenLoader(false);
                if (returnURL) {
                    if (qs) {
                        returnURL += "?qs=";
                        returnURL += qs;
                    }
                    navigate(returnURL);
                } else {
                    navigate('/profiledashboard');
                }

            } else {
                CallbackRes(-1);
                navigate(
                    {
                        pathname: "/register",
                        search: "?s-user=" + btoa(JSON.stringify(f))
                    });
            }
            setopenLoader(false);
        } catch (error) {
            setopenLoader(false);
        }
    }
    const onFBInSuccess = (f) => {
        try {
            const name = f.name;
            let fname = "";
            let lname = "";
            if (name !== "" && name !== undefined && name !== null) {
                const split = name.split(" ");
                split.filter(function (d, i) {
                    if (i === 0) {
                        fname = d;
                    } else {
                        lname += d + " ";
                    }
                })
            }
            const fData = {
                ID: f.id,
                fullName: name,
                fName: fname,
                lName: lname.trim(),
                email: f.email,
                pic: f.picture.data.url
            }
            loginFaceBookSubmit(fData);
        } catch (error) {
        }
    }
    const CloseFPModal = (res) => {
        if (res === 1) {
            document.getElementById("LGModal").style.display = "flex";
            handleClose();
        } else {
            document.getElementById("LGModal").style.display = "flex";
            handleClose();
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
    const handleMobileChange = (v) => {
        if (!IsNullOrEmpty(v)) {
            v = v.replace(/[^0-9]/g, '');
            setValue("mobilenumber", v);
            if (countryvalue.value) {
                setisShowMobileCountryCodeErr(false);
            } else {
                setisShowMobileCountryCodeErr(true);
            }
            if (!errors.mobile?.type === 'required' || errors.mobile?.type === undefined)
                document.getElementById("idxMobileError").innerHTML = "";
        } else {
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
    const handleForgotPaswdModal = () => {
        document.getElementById("LGModal").style.display = "none";
        setValue("emailID", "");
        setValue("Password", "");
        handleShow();
    }
    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        const emailPattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
        // const emailPattern = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
        return emailPattern.test(newEmail);
    }
    const initCountry = async () => {
        setopenLoader(true)
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
            setopenLoader(false)
        }
        setopenLoader(false)
    }

    useEffect(() => {
        initCountry()
    }, []);

    const location = useLocation();
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
                onClick={handleLoaderClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Modal
                centered
                show={show}
                size='lg'
                onHide={handleClose}
                animation={true}
            >
                <ForgotPassword CallbackFP={CloseFPModal} />
            </Modal>
            <div className="modal-content modal-content-auth " id='LGModal' style={{ border: "none" ,flexDirection:"row" }}>
                <div className="modal-start d-none d-lg-flex">
                    <div className="img-icon">
                        <img src={authimg} alt="" style={{width:"100%"}}/>
                    </div>
                    <h3 className="title">{t("New_Here")}?</h3>
                    <ul className="list-check">
                        <li>{t("Login_Page_P1")}</li>
                        <li>{t("Login_Page_P2")}</li>
                        <li>{t("Login_Page_P3")}</li>
                        <li>{t("Login_Page_P4")}</li>
                    </ul>
                </div>
                <div className="modal-end">
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => CallbackRes(-1)} ></button>
                    <div className="modal-header">
                        <h2 className="modal-title fs-5" id="loginModalLabel">{t("Login")}</h2>
                        {/*<Link className="btn btn-link-login ms-auto" to="/register" >{t("Register")}</Link>*/}
                        {location.pathname !== '/register' && (
                <Link className="btn btn-link-login ms-auto" to="/register">
                    {t("Register")}
                </Link>
            )}

                    </div>

                    <div className="modal-body">
                        <form method="POST" onSubmit={handleSubmit(loginSubmit)} >
                            <div className='row'>
                                <span>
                                    {
                                        ErrMessage === "" ? null : <span className="text-danger">{ErrMessage}</span>
                                    }
                                </span>
                            </div>

                            <div className="form-group autofillBg">
                                <label className="form-label">
                                    <input type="radio" value={"M"} name='mobileoremail' defaultChecked onClick={(e) => onclickMoborEmail(e.target.value)} />&nbsp;{t("Mobile")} &nbsp;&nbsp;
                                    <input type="radio" value={"E"} name='mobileoremail' onClick={(e) => onclickMoborEmail(e.target.value)} />&nbsp;{t("Email")}
                                </label>
                                {moborEmail === "M" ? <>
                                    <Select
                                        required
                                        placeholder={t("Select")}
                                        onChange={handleSelectCountry}
                                        value={countryvalue}
                                        options={countryDD}
                                        isClearable
                                    />
                                    <span data-tooltip-id="my-tooltip"
                                        data-tooltip-content="Please select country under registred mobile"
                                        style={{ float: "right", marginTop: "-8%", marginRight: "-5%", color: "#f8cdcd", cursor: "pointer" }}>
                                        <i className="bx bx-info-circle"  ></i>
                                    </span>
                                    <Tooltip id="my-tooltip"
                                        place="left"
                                        effect="solid">
                                    </Tooltip>
                                    <input type="text" className="form-control mt-2 " placeholder={t("Mobile_number")}
                                        id="idxMobile"
                                        name="mobilenumber"
                                        maxLength={countryvalue.MaxMobilelength}
                                        {...register("mobilenumber",
                                            {
                                                required: true,
                                                pattern: {
                                                    value: /[0-9a-zA-Z]/
                                                },
                                                onKeyPress: (e) => { numberOnly(e) },
                                                onChange: (e) => { handleMobileChange(e.target.value) },
                                                onBlur: (e) => { handleMobileFocusOut(e.target.value) }
                                            })
                                        }
                                    />
                                </>
                                    : <input type="text" className="form-control " placeholder={t("Email")} maxLength={50}
                                        id="emailID"
                                        name="email"
                                        onChange={handleEmailChange}
                                        {...register("email", { required: true })}

                                    />
                                }
                                {errors.mobilenumber?.type === 'required' ? null : <span className="text-danger f13" id="idxMobileError"></span>}
                                {isShowMobileCountryCodeErr ? <p className='text-danger mt-1 f13'>Please select country</p> : null}
                                {errors.mobilenumber?.type === 'required' && <p className='text-danger' id='idxMobileError'>Please enter mobile number</p>}
                                {errors.email?.type === 'required' ? null : <span className="text-danger f13" id="emailerror"></span>}
                                {errors.email?.type === 'required' && <p className='text-danger' id='emailerror'>Please enter email id</p>}
                            </div>
                            <div className="form-group autofillBg">
                                <label htmlFor="" className="form-label">{t("Password")} <span className="text-danger ">*</span></label>
                                <div className="input-group input-group-date">
                                    <input type="password" className="form-control " placeholder="●●●●●●●●●●"
                                        id="Password" autoComplete='off' min={6} maxLength={20}
                                        name="Password"
                                        {...register("Password", { required: true })}
                                    />

                                    <span className="input-group-text" onClick={() => handleShowPassword("Password", "iconid")} style={{ cursor: "pointer" }}>
                                        <i style={{ fontSize: "x-large" }} className="bx bx-hide" id="iconid" title="show password" aria-hidden="true" ></i>
                                    </span>
                                </div>
                                {errors.Password?.type === 'required' && <p className='text-danger'>Please enter password</p>}
                            </div>

                            <div className="actions d-flex justify-content-between">
                                {/* <a className="btn btn-link">Use OTP to Login</a> */}
                                <a className="btn btn-link-login" onClick={() => handleForgotPaswdModal()}>{t("Forgot_Password")}?</a>
                            </div>

                            <div className="d-grid buttons">
                                <button className="btn btn-primary">{t("Login")}</button>
                            </div>
                            <div className="or-devider">
                                <span>{t("Or")}</span>
                            </div>
                            <div className="d-grid buttons">
                                <button type='button' className="btn btn-outline-primary" onClick={() => googleLogin()}><i className='bx bxl-google icon' ></i> {t("Sign_in_with_Google")}</button>
                                <label>
                                    <a className="btn btn-outline-primary"><i className='bx bxl-facebook icon'></i>{t("Sign_in_with_Facebook")}
                                        <FacebookLogin
                                            appId="802428051225520" //APP ID NOT CREATED YET
                                            fields="name,email,picture"
                                            callback={onFBInSuccess}
                                            textButton="Sign in with Facebook"
                                            size="small"
                                            icon="bx bxl-facebook icon"
                                            buttonStyle={btnSytle}

                                        />
                                    </a>
                                </label>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LoginModal