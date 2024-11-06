import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from '../../../Services/AuthService';
import LoginModal from '../../LogIn/LoginModal';
import animationData from "../../../assets/imgs/Welcome3.json";
import Android from "../../../landingstatic/img/Playstore.png"
import HuntsjobLogReg from "../../../landingstatic/img/HUNTSJOB POPUP _WEBSITE_SIZE_avif.avif.avif"

function LoginRegisterToastTemplate() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const handleLoginClose = () => setloginShow(false);
    const [loginShow, setloginShow] = useState(false);
    const handleLoginShow = () => setloginShow(true);
    const [showButtons, setShowButtons] = useState(false); // For buttons visibility
    const [showImage, setShowImage] = useState(false); // For image visibility
    const OnclickLoginOrRegister = (value) => {
        handleClose();
        if (value === "Register") {
            navigate("/register");
        } else {
            if (!AuthService.isAuthenticatedUser()) {
                handleLoginShow();
            }
        }
    }
    useEffect(() => {
        const lastClosedDate = localStorage.getItem('toastClosedDate');
        const today = new Date().toLocaleDateString();
        if (lastClosedDate !== today) {
            if (!AuthService.isAuthenticatedUser()) {
                setShowToast(true);
            }
        }
    }, []);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const handleClose = () => {
        const today = new Date().toLocaleDateString();
        localStorage.setItem('toastClosedDate', today);
        setShowToast(false);
    };
    const CloseModal = (res) => {
        if (res === 1) {
            handleClose();
            navigate("/profiledashboard");
        } else {
            handleClose();
            handleLoginClose();
        }
    }

    useEffect(() => {
        const buttonTimer = setTimeout(() => {
            setShowButtons(true);
        }, 500);
        return () => clearTimeout(buttonTimer);
    }, []);

    // Set timeout for the image to appear after 4 seconds
    useEffect(() => {
        const imageTimer = setTimeout(() => {
            setShowImage(true);
        }, 500);
        return () => clearTimeout(imageTimer);
    }, []);
    return (
        <> 
            <Modal
                show={loginShow}
                size='lg'
                onHide={handleLoginClose}
                animation={true}
            >
                <LoginModal CallbackRes={CloseModal} />
            </Modal>


            {/* <Modal
                show={showToast}
                size='md'
                onHide={handleClose}
                centered
                animation={true}
                style={{ borderRadius: "2rem" }}
            >
                <div style={{ position: "relative", textAlign: "center" }}>
                    <span style={{
                        position: "absolute", top: "10px", right: "22px", color: "white", cursor: "pointer", textShadow: "rgba(255, 255, 255, 0.7) 0px 0px 10px", fontSize: "bold", transition: "0.3s", display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "7%",
                        height: "7%",
                    }} onClick={handleClose}>X</span>
                    <img src={HuntsjobLogReg} className="Group" style={{ width: "100%", borderRadius: "20px" }} alt="Job Vacancy Login Page" />

                    
                    {showImage && (
                        <>
                            <div
                                style={{
                                    position: "absolute",
                                    top: "41%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    display: "flex",
                                    gap: "15px",

                                    justifyContent: "center",
                                }}
                            >
                                <button
                                    type="button"
                                    className="btn btn-lg btn-primary login-button toastTemp"
                                    onClick={() => OnclickLoginOrRegister("login")}
                                    title="Login with Huntsjob"
                                >
                                    {" "}
                                    Login
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-lg btn-outline-primary  toastTemp"
                                    onClick={() => OnclickLoginOrRegister("Register")}
                                    title="Register with Huntsjob"
                                >
                                    Register
                                </button>
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    top: "57%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    display: "flex",
                                    gap: "10px",
                                    justifyContent: "center",
                                }}
                            >
                                <Link
                                    to="https://play.google.com/store/apps/details?id=com.googlesignexbee"
                                    target="blank"
                                >
                                    <img
                                        src={Android}
                                        className="toastApp"
                                        alt="Job Search App India"
                                    ></img>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </Modal> */}
        </>
    )
}

export default LoginRegisterToastTemplate