import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { Contactservice } from '../../Services/Contactservice';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import whatsapp from "../../landingstatic/img/whatsapp.svg";
import "./ContactUs.css";


function ContactUs() {
    const { t } = useTranslation();
    const { register, setValue, formState: { errors }, handleSubmit } = useForm();
    const [openLoader, setopenLoader] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [err, setErr] = React.useState(0)



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
    const HandleSubscribeSubmit = async () => {
        if (err === 0) {
            setopenLoader(true);
            const email = document.getElementById('mce-EMAIL').value;
            const res = await Contactservice.SaveSubScription(email);
            if (res.isSuccess) {
                setopenLoader(false);
                ShowAlert(1, res.message);
                setValue("EMAIL", "");
                setErr(0)
            } else {
                setopenLoader(false);
                ShowAlert(0, res.message);
            }
        }
    }
    const setclearContactInfo = () => {
        setValue("Name", "");
        setValue("MobNO", "");
        setValue("Email", "");
        setValue("message", "");
    }
    const HandleGmailContactInfoSubmit = async (data) => {
        if (err === 0) {
            setopenLoader(true);
            const contactus = {
                Name: data.Name,
                PhoneNo: data.MobNO,
                EmailId: data.Email,
                Messsage: data.message,
            }
            const res = await Contactservice.SaveContactUs(contactus);
            if (res.isSuccess) {
                setopenLoader(false);
                ShowAlert(1, res.message);
                setclearContactInfo();
                setErr(0)
            } else {
                setopenLoader(false);
                ShowAlert(0, res.message);
            }
        }
    }

    function formatString(str) {
        let newStr = str.replace(/[^0-9]/g, ''); // Remove all non-numeric characters
        return newStr;
    }

    function handleNameValidation(str) {
        let newStr = str.replace(/[^A-Za-z\s]/g, ''); // Remove all non-numeric characters
        return newStr;
    }

    function handleEmailValidation1(val) {
        if (val) {
            const email = val;
            const emailRegx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
            if (emailRegx.test(email)) {
                document.getElementById("idxEmailPatternError1").innerHTML = "";
                setErr(0)
            } else {
                document.getElementById("idxEmailPatternError1").innerHTML = "Please enter a valid email";
                setErr(1)
            }
        } else {
            document.getElementById("idxEmailPatternError1").innerHTML = "";
        }
    }

    function handleEmailValidation2(val) {
        if (val) {
            const email = val;
            const emailRegx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
            if (emailRegx.test(email)) {
                document.getElementById("idxEmailPatternError2").innerHTML = "";
                setErr(0)
            } else {
                document.getElementById("idxEmailPatternError2").innerHTML = "Please enter a valid email";
                setErr(1)
            }
        } else {
            document.getElementById("idxEmailPatternError2").innerHTML = "";
        }
    }
    // useEffect(() => {
    //     document.title=("HuntsJob || ContactUs");
    // }, [])
    useEffect(() => {
        window.scroll(0, 0);
    })
    useEffect(() => {
        document.title = 'HuntsJob - ContactUs';
    }, []);
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Layout>
                {/* <section className="sub-hero-headerr">
                    <div className="container">
                        <div className="text-content">
                            <h1>{t("Contact_Us")}</h1>
                        </div>

                    </div>
                </section>
                <section className="bg-white section-about">
                    <div className="container">
                       
                        <div className="row mt-5">
                            <div className="col-lg-6 mb-lg-0 mb-3">
                                <div className="section-header">
                                    <h2 className="section-subtitle"><span>{t("Contact Information")}</span></h2>
                                </div>
                                <form className="theme-form" method="POST" onSubmit={handleSubmit(HandleGmailContactInfoSubmit)}>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6 md-fgrup-margin">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={t("Your Name")}
                                                    required="required"
                                                    name="Name"
                                                    {...register("Name",{
                                                        onChange : (e)=> e.target.value = handleNameValidation(e.target.value)
                                                    })}
                                                   
                                                />
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    maxLength={10}
                                                    placeholder={t("Phone Number")}
                                                    required="required"
                                                    name="MobNO"
                                                    {...register("MobNO",{
                                                        onChange : (e) => e.target.value = formatString(e.target.value)                                                    })}
                                                   
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder={t("Email Address")}
                                            required="required"
                                            name="Email"
                                            {...register("Email",{
                                                onChange : (e)=> handleEmailValidation1(e.target.value)
                                            })}
                                           
                                        />
                                        <span className="text-danger f13" id="idxEmailPatternError1"></span>
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            rows="4"
                                            placeholder={t("Message")}
                                            required="required"
                                            name="Message"
                                            {...register("message")}
                                        ></textarea>
                                    </div>
                                    <div className="form-button">
                                        <button
                                            type="submit"
                                            className="btn-primary btn"
                                            style={{ cursor: "pointer" }}
                                        >
                                            {t("Send")}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-5 offset-lg-1">
                                <div className="section-header">
                                    <h2 className="section-subtitle">{t("Subscribe To Newsletter")}</h2>
                                </div>
                                <form
                                    className="footer-form needs-validation"
                                    onSubmit={handleSubmit(HandleSubscribeSubmit)}
                                >
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder={t("Enter Your Email")}
                                            name="EMAIL"
                                            id="mce-EMAIL"
                                            required="required"
                                            {...register("EMAIL")}
                                            onChange={(e)=>handleEmailValidation2(e.target.value)}
                                        />
                                        <span className="text-danger f13" id="idxEmailPatternError2"></span>
                                    </div>
                                    <div className="form-button">
                                        <button
                                            type="submit"
                                            className="btn-primary btn"
                                            id="mc-submit"
                                            style={{ cursor: "pointer" }}
                                        >
                                            {t("Send")}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section> */}

                <section style={{ marginBottom: "50px" }}>    
                <section className="sub-hero-headerr" style={{background:"white"}}>
                    <div className="container">
                        {/* <div className="text-content">
                            <h1 style={{
                                textAlign: "center",
                                marginBottom: "28px",
                                fontWeight: "700",
                                color: "#2E475D"
                            }}>{t("Contact_Us")}</h1>
                        </div> */}
                        <div className="section-header">
                  <h1
                    className="h1qr"
                    style={{
                      fontSize: "clamp(4rem, 2vw, 4rem)",
                      fontFamily: "sans-serif",
                      fontWeight: "700",
                    }}
                  >
                    {t("Contact")}{" "}
                    <span
                      style={{
                        color: "#FE5C35",
                        fontSize: "clamp(4rem, 2vw, 4rem)",
                        fontFamily: "sans-serif",
                        fontWeight: "700",
                      }}
                    >
                      {t("Us")}
                    </span>
                  </h1>
                  {/* <h6 className="section-subtitle">{t("About HUNTSJOB")}</h6>
                  <h2 className="section-title">{t("Our Journey")}</h2> */}
                </div>
                    </div>
                    </section>


                    <div className="d-flex justify-content-center align-items-center min-vh-80" >
                        <div className="container shadow-lg" style={{ borderRadius: "10px", width: "100%", maxWidth: "1200px", marginTop:"50px" }}>
                            <div className="row custom-container" style={{ borderRadius: "10px" }}>
                                {/* Contact Form Column */}
                                <div className="col-md-12 col-lg-6 d-flex justify-content-center mb-4 mb-lg-0">
                                    <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
                                        <div className="card-body">
                                            <h5 className="card-title"style={{fontSize: "2.0rem"}}>Get In Touch</h5>
                                            <form className="theme-form" method="POST" onSubmit={handleSubmit(HandleGmailContactInfoSubmit)}>
                                                <div className="row mb-3">
                                                    <div className="col-12 col-md-6">
                                                        <label htmlFor="name" className="form-label">Name</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder={t("Your Name")}
                                                            required="required"
                                                            name="Name"
                                                            id="name"
                                                            {...register("Name", {
                                                                onChange: (e) => e.target.value = handleNameValidation(e.target.value)
                                                            })} />
                                                    </div>
                                                    <div className="col-12 col-md-6">
                                                        <label htmlFor="phone" className="form-label">Phone</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            maxLength={10}
                                                            placeholder={t("Phone Number")}
                                                            required="required"
                                                            name="MobNO"
                                                            id="phone"
                                                            {...register("MobNO", {
                                                                onChange: (e) => e.target.value = formatString(e.target.value)
                                                            })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input type="email"
                                                        className="form-control"
                                                        id="exampleFormControlInput1"
                                                        placeholder={t("Email Address")}
                                                        required="required"
                                                        name="Email"
                                                        {...register("Email", {
                                                            onChange: (e) => handleEmailValidation1(e.target.value)
                                                        })} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="description" className="form-label">Description</label>
                                                    <textarea className="form-control"
                                                        id="exampleFormControlTextarea1"
                                                        rows="4"
                                                        placeholder={t("Message")}
                                                        required="required"
                                                        name="Message"
                                                        {...register("message")}></textarea>
                                                </div>
                                                <button type="submit" className="btn btn-primary rounded">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Column */}
                                <div className="col-md-12 col-lg-6 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                                    <div className="card" style={{ width: '100%', maxWidth: '500px', backgroundColor: "#0F172A" }}>
                                        <div className="card-body">
                                            <h5 className="card-title text-white text-start" style={{fontSize: "2.0rem"}}>Info</h5>
                                            <ul className="list-unstyled text-white">
                                                {/* <li className="d-flex align-items-center mb-3">
                                                    <i className="bx bxs-phone-call me-2" style={{ fontSize: "28px" }} /> 022 4617 1122
                                                </li>
                                                <li className="d-flex align-items-center mb-3">
                                                    <img src={whatsapp} alt="WhatsApp" height={"30px"} width={"30px"} className="me-2" /> +123 456 7891
                                                </li> */}
                                                <li className="d-flex align-items-center mb-3">
                                                    <i className='bx bxs-envelope me-2' style={{ fontSize: "28px" }}></i> support@huntsjob.com
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <i className="bx bxs-map me-2" style={{ fontSize: "28px" }}></i>  HUNTSJOB.COM, Mandakini, Jangid Complex Rd,<br></br>{" "}
                                                    Silver Park, Mira Road East, Mumbai, <br></br>
                                                    Maharashtra 401107
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>


            </Layout>
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

export default ContactUs