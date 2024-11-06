//too many changes

import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
// import '../../css/profileDashboard.css';
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import NewLayout from '../../Layout/Layout';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { UserService } from '../../Services/UserService';
import OtpInput from 'react-otp-input';
import { Modal, ModalBody } from 'react-bootstrap';
import auth from '../../assets/imgs/auth.png';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { CandidateRegService } from '../../Services/CanRegistration/CandidateRegService';


function ForgotPassword({ CallbackFP }) {
    const { t } = useTranslation();
    const [show, setshow] = useState(false);
    const [isPsdMatch, setisPsdMatch] = useState(true);
    const [openLoader, setopenLoader] = React.useState(false);
    const [typeID, setTypeID] = useState("");
    const navigate = useNavigate();
    const [message, setmessage] = useState("");
    const [labelText, setlabelText] = useState("");
    const [IsCheckInput, setIsCheckInput] = useState(1);
    const [isMobileNoValid, setisMobileNoValid] = useState(false);
    const [isEmailIDValid, setisEmailIDValid] = useState(false);
    const { register, setValue, clearErrors, watch, formState: { errors }, handleSubmit } = useForm();
    const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, } = useForm();
    const [OTP, setOTP] = useState("");
    const [otpError, setotpError] = useState("");
    const [countryDD, setCountryDD] = useState([]);
    const [countryvalue, setCountryvalue] = useState([]);
    const [isShowMobileCountryCodeErr, setisShowMobileCountryCodeErr] = useState([]);
    const [forgotPasswordRadio,setForgotPasswordRadio] = useState(true)

    const handleOpen = () => {
        setValue("password", "")
        setValue("confirmPsd", "")
        setshow(true);
        document.getElementById("idfPassword").value = "";
        document.getElementById("idxConformPassword").value = "";
        setOTP("");
    }
    const handleForgotPasswordSave = async (formData) => {
        try {
            setopenLoader(true);
            if (formData.login === "true") {
                setTypeID("1");
                if (countryvalue.length === 0) {
                    setisShowMobileCountryCodeErr(true);
                }
                if (IsNullOrEmpty(formData.NewText)) {
                    document.getElementById("idxMobileorEmailErr").innerHTML = "Please enter mobile number";
                    setlabelText("");
                }
                // else if (formData.NewText.length < 10) {
                //     document.getElementById("idxMobileorEmailErr").innerHTML = "Please enter 10 digit mobile number";
                //     setlabelText("");
                // }
                else if (parseInt(formData.NewText) && formData.NewText.length <= 10 && countryvalue.length !== 0) {
                    document.getElementById("idxMobileorEmailErr").innerHTML = "";
                    const res = await UserService.sendForgotPasswordLink(formData.NewText, countryvalue.value, "1");
                    if (res.isSuccess) {
                        document.getElementById('newtextField').value = "";
                        ShowAlert(1, res.message);
                        setValue("reqCanID", res.data)
                        handleOpen();
                        setopenLoader(false);  
                    } else {
                        ShowAlert(0, res.message);
                        setopenLoader(false);
                    }
                }
                else {
                    document.getElementById("idxMobileorEmailErr").innerHTML = "Please enter only number";
                    setlabelText("");
                    setopenLoader(true);
                }
                setopenLoader(false);
            } else {
                setTypeID("2");
                if (IsNullOrEmpty(formData.NewText)) {
                    ShowAlert(0, "Please enter mobile no or email id.");
                } else {
                    const emailRegx = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
                    if (emailRegx.test(formData.NewText)) {
                        document.getElementById("idxMobileorEmailErr").innerHTML = "";
                        const res = await UserService.sendForgotPasswordLink(formData.NewText, 0, "2");
                        if (res.isSuccess) {
                            ShowAlert(1, res.message);
                            setValue("reqCanID", res.data)
                            handleOpen();
                            setopenLoader(false);
                            document.getElementById('newtextField').value = "";
                        } else {
                            ShowAlert(0, res.message);
                            setopenLoader(false);
                        }
                    } else {
                        document.getElementById("idxMobileorEmailErr").innerHTML = "Please enter a valid email";
                        setlabelText("");
                    }
                }
            }
            setopenLoader(false);
        } catch (error) {
            setopenLoader(true);
        }
        setopenLoader(false);
    }
    const handleRadioBtnCheck = (e) => {

        if (e.target.value === "true") {
            document.getElementById("countryselect").style.display = "block";
            document.getElementById("idxMobileorEmailErr").innerHTML = "";
            setisMobileNoValid(true);
            setlabelText("please enter mobile no");
            setIsCheckInput(1);
            setForgotPasswordRadio(true)
        } else {
            document.getElementById("countryselect").style.display = "none";
            document.getElementById("newtextField").value = "";
            setIsCheckInput(2);
            document.getElementById("idxMobileorEmailErr").innerHTML = "";
            setisMobileNoValid(true);
            setlabelText("please enter email ID");
            setForgotPasswordRadio(false)
        }
    }
    const handleMobileNoOrEmailIDonChange = (v) => {

        if (!IsNullOrEmpty(v)) {
            setisMobileNoValid(false);
            if (IsCheckInput === 1) {
                v = v.replace(/[^0-9]/g, '');
                document.getElementById("newtextField").value = v;
                if (v != null || v != undefined || v != "") {
                    if (v.length < countryvalue.MaxMobilelength) {
                        document.getElementById("idxMobileorEmailErr").innerHTML = "";
                    }
                } else {
                    document.getElementById("idxMobileorEmailErr").innerHTML = `Mobile number should be ${countryvalue.MaxMobilelength}`;
                }
            }
            if (IsCheckInput === 2) {
                let minlength = document.getElementById("newtextField");
                minlength.setAttribute("maxlength", 50);
                const emailRegx = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
                if (emailRegx.test(v)) {
                    document.getElementById("idxMobileorEmailErr").innerHTML = "";
                } else {
                    document.getElementById("idxMobileorEmailErr").innerHTML = "Please enter a valid email";
                }
            }
        } else {
            document.getElementById("idxMobileorEmailErr").innerHTML = "Please fill this input";
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
    const handlePassowrdChange = (v) => {
        //document.getElementById("idfPasswordError").innerHTML = "";
        if (!IsNullOrEmpty(v)) {
            document.getElementById("idfPasswordError").innerHTML = "";
            if (v.length < 6) {
                document.getElementById("idfPasswordError").innerHTML = "Password length must be 6 characters";
            } else {
                document.getElementById("idfPasswordError").innerHTML = "";
            }
        } else {
            if (!errors.password?.type === 'required' || errors.password?.type === undefined)
                document.getElementById("idfPasswordError").innerHTML = "Please enter password";
        }
        /* CHANGES BY SHADAB 1-9*/
        //-----------------------------------------------//
        if (v !== document.getElementById('idxConformPassword').value) {
            setisPsdMatch(false);
            document.getElementById("idxConfPsdError").innerHTML = "Password and confirm password not matched";
        } else {
            setisPsdMatch(true);
            document.getElementById("idxConfPsdError").innerHTML = "";
        }
    }

    const handlePasswordFocusIn = (v) => {
        /* CHANGES BY SHADAB 1-9*/
        if (v !== document.getElementById('idxConformPassword').value) {
            setisPsdMatch(false);
            document.getElementById("idxConfPsdError").innerHTML = "Password and confirm password not matched";
        } else {
            setisPsdMatch(true);
            document.getElementById("idxConfPsdError").innerHTML = "";
        } 
    }

    const handlePassowrdFocusOut = (v) => {
        /* CHANGES BY SHADAB 1-9*/
        document.getElementById("idfPasswordError").innerHTML = "";
        if (!IsNullOrEmpty(v)) {
            document.getElementById("idfPasswordError").innerHTML = "";
            //const psdRegx = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
            if (v.length < 6) {
                document.getElementById("idfPasswordError").innerHTML = "Password length must be 6 characters";
            } else {
                document.getElementById("idfPasswordError").innerHTML = "";
            }
        }
        else {
            document.getElementById("idfPasswordError").innerHTML = "Please enter password";
        }
        //---------------------------------------------//
        /* CHANGES BY SHADAB 1-9*/
        if (v !== document.getElementById('idxConformPassword').value) {
            setisPsdMatch(false);
            document.getElementById("idxConfPsdError").innerHTML = "Password and confirm password not matched";
        } else {
            setisPsdMatch(true);
            document.getElementById("idxConfPsdError").innerHTML = "";
        } 
    }
    const handleConfirmPasswordChange = (v) => {
        /* CHANGES BY SHADAB 1-9*/
        if (!IsNullOrEmpty(v)) {
            document.getElementById("idxConfPsdError").innerHTML = "";
            if (v !== document.getElementById('idfPassword').value) {
                setisPsdMatch(false);
                document.getElementById("idxConfPsdError").innerHTML = "Password and confirm password not matched";
            } else {
                setisPsdMatch(true);
                document.getElementById("idxConfPsdError").innerHTML = "";
            }
        } else {
            document.getElementById("idxConfPsdError").innerHTML = "";
        }

    }
    const handleConfirmPasswordFocusOut = (v) => {
        /* CHANGES BY SHADAB 1-9*/
        document.getElementById("idxConfPsdError").innerHTML = "";
        if (v !== document.getElementById('idfPassword').value) {
            setisPsdMatch(false);
            document.getElementById("idxConfPsdError").innerHTML = "Password and confirm password not matched";
        } else {
            setisPsdMatch(true);
            document.getElementById("idxConfPsdError").innerHTML = "";
        }
        // if (!IsNullOrEmpty(v)) {
        //     document.getElementById("idxConfPsdError").innerHTML = "";
        //     if (v !== document.getElementById('idfPassword').value) {
        //         setisPsdMatch(false);
        //     } else {
        //         setisPsdMatch(true);
        //     }
        // } else {
        //     document.getElementById("idxConfPsdError").innerHTML = "";
            
        // }

    }
    const IsNullOrEmpty = (v) => {
        if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
            return true;
        } else {
            return false;
        }
    }
    const handleOTPChange = async (v) => {
        if (!IsNullOrEmpty(v)) {
            v = v.replace(/[^0-9]/g, '');
            setOTP(v);
            if (parseInt(v).toString().length === 6) {
                setotpError("");
            }
        } else {
            setOTP("");
        }
    }
    const checkOTPValidation = () => {
        let err = 0;
        if (!IsNullOrEmpty(OTP)) {
            if (parseInt(OTP).toString().length === 6) {
                setotpError("");
            } else {
                err = 1;
                setotpError("Please enter 6 digit otp");
            }
        } else {
            err = 1;
            setotpError("Please enter otp");
        }
        return err;
    }
    const updatePasswordSubmit = async (fd) => {
        const otpErr = checkOTPValidation();
        if (otpErr > 0) {
            return false;
        }
        const password = document.getElementById("idfPassword").value;
        const cPassword = document.getElementById("idxConformPassword").value;
        if (IsNullOrEmpty(password)) {
            document.getElementById("idfPasswordError").innerHTML = "Please enter password";
            return false;
        } else {
            const psdRegx = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
            if (password < 6) {
                document.getElementById("idfPasswordError").innerHTML = "Password min length must be 6 characters";
                return false;
            }
            else {
                document.getElementById("idfPasswordError").innerHTML = "";
            }
        }
        if (IsNullOrEmpty(cPassword)) {
            document.getElementById("idxConfPsdError").innerHTML = "Please enter confirm password";
            return false;
        } else {
            setisPsdMatch(true);
            document.getElementById("idxConfPsdError").innerHTML = "";
        }
        if (password !== cPassword) {
            setisPsdMatch(false);
            return false;
        } else {
            setisPsdMatch(true);
            document.getElementById("idxConfPsdError").innerHTML = "";
        }
        if (!IsNullOrEmpty(fd.reqCanID)) {
            const res = await UserService.updateForgotPassword(fd.reqCanID, password, OTP, typeID);
            if (res.isSuccess) {
                ShowAlert(1, res.message);
                document.getElementById("idfPassword").value = "";
                document.getElementById("idxConformPassword").value = "";
                setValue("password", "");
                setValue("cofirmPsd", "");
                setValue("reqCanID", "");
                setOTP("");
                CallbackFP(1)
                setshow(false);
                setopenLoader(false);
            } else {
                //document.getElementById("idfPassword").value = "";
                //document.getElementById("idxConformPassword").value = "";
                ShowAlert(0, res.message);
                setopenLoader(false);
                //setValue("password", "");
                //setValue("cofirmPsd", "");
                setOTP("");
                setopenLoader(false);
            }
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
    const initCountry = async () => {
        const cu = await CandidateRegService.getCountryList();
        if (cu.isSuccess) {
            setCountryDD(JSON.parse(cu.data))
        } else {
            setCountryDD([]);
        }
    }
    const handleSelectCountry = (selectedOption) => {
        let minlength = document.getElementById("newtextField");
        if (selectedOption) {
            setCountryvalue(selectedOption);
            minlength.setAttribute("maxlength", selectedOption.MaxMobilelength);
            setisShowMobileCountryCodeErr(false);
        } else {
            setCountryvalue([]);
            minlength.setAttribute("maxlength", "");
            setisShowMobileCountryCodeErr(true);
        }
    }
    useEffect(() => {
        initCountry();
        /* CHANGES BY SHADAB 1-9 */
        document.getElementById("countryselect").style.display = "block";
        document.getElementById("idxMobileorEmailErr").innerHTML = "";
        setisMobileNoValid(true);
        setlabelText("please enter mobile no");
        setIsCheckInput(1);
        setForgotPasswordRadio(true)
    }, []);
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                size='md'
            >
                <Modal.Header>
                    <Modal.Title className="text-center">
                        <h2 className="modal-title fs-5" >{t("Update_Password")}</h2>
                    </Modal.Title>
                    <button onClick={() => setshow(false)} type="button" className="btn-close" aria-label="Close"></button>
                </Modal.Header>
                <ModalBody>
                    <form key={1} method='POST' name='forgotPsd' id='forgotPsdFormID' onSubmit={handleSubmit(updatePasswordSubmit)}>
                        <div className="row">
                            <input type="hidden" name='reqCanID' {...register("reqCanID")} />
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">{t("New_Password")} <span className="text-danger ">*</span></label>
                                    <div className="input-group input-group-date">
                                        <input className='form-control' type='password' id='idfPassword' name='password' minLength={6} maxLength={20} autoFocus={true}
                                            {...register("password",
                                                {
                                                    // pattern: {
                                                    //     value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
                                                    // },
                                                    required: true,
                                                    onChange: (e) => { handlePassowrdChange(e.target.value) },
                                                    onBlur: (e) => { handlePassowrdFocusOut(e.target.value) },
                                                    /* CHANGES BY SHADAB 1-9*/
                                                    onFocus: (e) => { handlePasswordFocusIn(e.target.value) },
                                                    
                                                })
                                            }
                                        />

                                        <span className="input-group-text" onClick={() => handleShowPassword("idfPassword", "opassiconid")} style={{ cursor: "pointer" }}>
                                            <i style={{ fontSize: "x-large" }} className="bx bx-hide" id="opassiconid" title="show password" aria-hidden="true" ></i>
                                        </span>
                                    </div>
                                    {/* {errors.password?.type === 'required' && <p className='text-danger mt-1 f13'>Please enter password</p>} */}
                                    {<span className="text-danger f13" id="idfPasswordError"></span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">{t("Confirm_Password")} <span className="text-danger ">*</span></label>
                                    <div className="input-group input-group-date">
                                        <input className='form-control ' type='password' id='idxConformPassword' name='confirmPsd' minLength={6} maxLength={20}

                                            {...register("confirmPsd",
                                                {
                                                    required: true,
                                                    onChange: (e) => { handleConfirmPasswordChange(e.target.value) },
                                                    onBlur: (e) => { handleConfirmPasswordFocusOut(e.target.value) },
                                                    validate: (val) => {
                                                        if (watch('password') !== val) {
                                                            setisPsdMatch(false);
                                                            document.getElementById("idxConfPsdError").innerHTML = "Password and confirm password not matched";
                                                        } else {
                                                            setisPsdMatch(true);
                                                            document.getElementById("idxConfPsdError").innerHTML = "";
                                                        }
                                                    }
                                                })
                                            }
                                        />

                                        <span className="input-group-text" onClick={() => handleShowPassword("idxConformPassword", "coniconid")} style={{ cursor: "pointer" }}>
                                            <i style={{ fontSize: "x-large" }} className="bx bx-hide" id="coniconid" title="show password" aria-hidden="true" ></i>
                                        </span>
                                    </div>
                                    {/* {errors.confirmPsd?.type === 'required' && <p className='text-danger mt-1 f13'>Please enter confirm password</p>} */}
                                    {<span className="text-danger " id="idxConfPsdError"></span>}
                                    {/* {errors.confirmPsd?.type === 'required' ? null : isPsdMatch ? null : <span className='text-danger f13'>Password and confirm password not matched</span>} */}
                                </div>
                                <div className="col-md-2 mt-2">
                                    <label className="control-label">OTP</label>
                                </div>
                                <div className="col-md-10 mt-2">
                                    <OtpInput inputType="tel"

                                        value={OTP}
                                        onChange={(e) => handleOTPChange(e)}
                                        numInputs={6}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} className='otpbox form-control p-0' />}
                                        shouldAutoFocus={false}
                                    />
                                    {otpError === "" ? null : <span className='text-danger f13'>{otpError}</span>}
                                </div>
                                <div className="mt-2">
                                    <button type="submit" className="btn-primary btn" style={{ float: "right" }}>{t("Update")}</button>
                                </div>
                            </div>

                            {/* <React.Fragment>
                                <div className="col-md-4 ">
                                    <label className="control-label">{t("New_Password")}</label>
                                </div>
                                <div className="col-md-6 ">
                                    <input className='form-control' type='password' id='idfPassword' name='password' minLength={6} maxLength={20}
                                        {...register("password",
                                            {
                                                required: true,
                                                onChange: (e) => { handlePassowrdChange(e.target.value) },
                                                onBlur: (e) => { handlePassowrdFocusOut(e.target.value) }
                                            })
                                        }
                                    />
                                    {errors.password?.type === 'required' && <p className='text-danger mt-1 f13'>Please enter password</p>}
                                    {errors.password?.type === 'required' ? null : <span className="text-danger f13" id="idfPasswordError"></span>}
                                </div>
                                <div className="col-md-2 "></div>


                                <div className="col-md-4 mt-1 ">
                                    <label className="control-label">{t("Confirm_Password")}</label>
                                </div>
                                <div className="col-md-6 mt-1 ">
                                    <input className='form-control ' type='password' id='idxConformPassword' name='confirmPsd' minLength={6} maxLength={20}

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
                                    {errors.confirmPsd?.type === 'required' && <p className='text-danger mt-1 f13'>Please enter confirm password</p>}
                                    {errors.cofirmPsd?.type === 'required' ? null : <span className="text-danger " id="idxConfPsdError"></span>}
                                    {errors.confirmPsd?.type === 'required' ? null : isPsdMatch ? null : <span className='text-danger f13'>Password and confirm password not matched</span>}
                                </div>
                                <div className="col-md-2 mt-1"></div>
                                <div className="col-md-4 mt-2"></div>
                                <div className="col-md-6 mt-2">
                                    <input type="checkbox" onClick={() => handleShowPassword()} /> <small className="text-muted">{t("Show_Password")}</small>
                                </div>
                                <div className="col-md-2 mt-2"></div>

                                <div className="col-md-4 mt-2">
                                    <label className="control-label">OTP</label>
                                </div>
                                <div className="col-md-6 mt-2">
                                    <OtpInput inputType="tel"

                                        value={OTP}
                                        onChange={(e) => handleOTPChange(e)}
                                        numInputs={6}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} className='otpbox' />}
                                        shouldAutoFocus={true}
                                    />
                                    {otpError === "" ? null : <span className='text-danger f13'>{otpError}</span>}
                                </div>
                                <div className="col-md-2 mt-2"></div>
                                <div className="mt-2">
                                    <button type="submit" className="btn-primary btn" style={{ float: "right" }}>{t("Update")}</button>
                                </div>
                            </React.Fragment> */}

                        </div>
                    </form>
                </ModalBody>

            </Modal>
            <div className="modal-content modal-content-auth " style={{ border: "none" }}>
                <div className="modal-start d-none d-lg-flex">
                    <div className="img-icon">
                        <img src={auth} alt="" />
                    </div>
                    <h3 className="title">{t("Forgot_Password")}</h3>
                    <ul className="list-check">
                        <li>{t("Forgot_Password_P1")}</li>
                        <li>{t("Forgot_Password_P2")}</li>
                        <li>{t("Forgot_Password_P3")}</li>
                        <li>{t("Forgot_Password_P4")}</li>
                    </ul>
                </div>
                <div className="modal-end">
                    <div className="modal-header">
                        <h2 className="modal-title fs-5" >{t("Forgot_Password")}</h2>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => CallbackFP(-1)} ></button>

                    </div>
                    <div className="modal-body mt-3">
                        <form key={2} className='login' method='POST' onSubmit={handleSubmit2(handleForgotPasswordSave)}>
                            <input type="hidden" name='ID' {...register("ID")} />
                            <div className="row mb-3">
                                <div className="register">
                                    <h5 className="title mb-4" style={{color:"#2e475d"}}>{t("Forgot_Password_P5")}</h5>
                                </div>

                                <aside style={{ marginBottom: "0px" }}>
                                    <div className='row mb-2' >
                                        <div className='mb-3'>
                                            <label style={{ cursor: "pointer" }}>
                                                {/* CHANGES BY SHADAB 1-9 */}
                                                <input type="radio" name="login" value="true" checked={forgotPasswordRadio}
                                                    {...register2("login", {
                                                        required: true,
                                                        onChange: (e) => { handleRadioBtnCheck(e) }
                                                    })}
                                                />  {t("Forgot_Password_R1")}</label>
                                            &nbsp;
                                        </div>
                                        <div className='mb-3'>
                                            <label style={{ cursor: "pointer" }}>
                                                {/* CHANGES BY SHADAB 1-9 */}
                                                <input type="radio" name="login" value="false" checked={!forgotPasswordRadio}
                                                    {...register2("login", {
                                                        required: true,
                                                    })}
                                                />  {t("Forgot_Password_R2")}</label>
                                        </div>
                                    </div>
                                </aside>
                                <aside>
                                    <div id='countryselect' style={{ display: "none" }}>
                                        <Select
                                            placeholder={t("Select")}
                                            onChange={handleSelectCountry}
                                            value={countryvalue}
                                            options={countryDD}
                                            isClearable
                                        />
                                        {isShowMobileCountryCodeErr ? <p className='text-danger mt-1 f13'>Please select country</p> : null}
                                    </div>

                                    <input type="text" id='newtextField'
                                        name='NewText'
                                        className="form-control mt-2"

                                        {...register2("NewText",
                                            {
                                                required: true,
                                                onChange: (e) => { handleMobileNoOrEmailIDonChange(e.target.value) }
                                            }
                                        )}
                                    />
                                    {errors.NewText?.type === 'required' ? null : <label className="text-danger " id="idxMobileorEmailErr"></label>}
                                    {isMobileNoValid ? <label className='text-danger ' style={{ borderBottom: "none" }}>  {labelText}</label> : null}
                                </aside>
                            </div>
                            <div className="d-grid buttons">
                                <button type='submit' className="btn-primary btn" >{t("Submit")}</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <ToastContainer
                position="bottom-left"
                // position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </div>
    )

}
export default ForgotPassword;