import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Key_Recruiter_Icon from "../../landingstatic/img/key_Recruiter Register_page.png";
import Hiring_Recruiter_Icon from "../../landingstatic/img/hiring_Recruiter_Register_page.png";
import Carousel_Recruiter_Icon from "../../landingstatic/img/carousel_Recruiter_register_page.png";
import Layout from '../../Layout/Layout';
import Select from 'react-select';
import { useForm } from 'react-hook-form'
import { RecruiterSalesService } from '../../Services/RecruiterSalesService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RecruiterSales = () => {
    const [isMobile2, setIsMobile2] = useState(window.innerWidth <= 992);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {

        try {
            const result = await RecruiterSalesService.SaveRecruiterSalesLead(data);
            if (result?.isSuccess) {
                toast.success(t("Thank you for reaching out to our sales team. We will connect with you shortly."));
                reset();
            } else {
                toast.error(`Your sales inquiry faced a challenge ${result.message} , Please retry`);
            }
        } catch (error) {
            console.error(error.message);
            toast.error(`An error occurred. Please check your input and try again .`);
        }
    };

    return (
        <Layout>
            <div id='testcont'>
                <div
                    class="container d-flex  justify-content-center"
                    style={{ marginBottom: "50px" }}
                >
                    <div class="row mt-3" >
                        <div className="col-lg-6 d-flex flex-column justify-content-center">
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
                                {t("Join Our")}
                                <span style={{ color: "#FE5C35" }}> {t("Recruiter")} </span>
                                {t("Portal Today!")}
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
                                {t("Unlock a world of opportunities by registering with our recruiter portal.Connect with top talent and streamline your hiring process effortlessly")}
                            </p>


                            <div className="resumeBuilderButtonClass">
                                <Link
                                    target="_blank"
                                    className="dropdown-item"
                                    to="https://recruiter.huntsjob.com/"
                                    title={t("Recruiter_Login")}
                                >
                                    <button
                                        type="submit"
                                        className="btn btn-outline-primary text-black"
                                        style={{ borderRadius: "14px" }}
                                        onClick={() => navigate("/")}
                                    >
                                        {t("Login")}
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
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <div className="card shadow-sm">
                                <div className="card-body" style={{ borderRadius: "16px", boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px" }}>
                                    <div className="card-body-header">
                                        <h2 className="card-title flex-fill" style={{ textAlign: "center" }}>{t("Talk To Sales Team")}</h2>
                                    </div>
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
                                                    className="form-control rounded-pill"
                                                    // className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                    placeholder={t("Full_Name")}
                                                    id="idxName"
                                                    name="name"
                                                    maxLength={30}
                                                    {...register("Name",
                                                        {
                                                            required: "Name is Required"
                                                        }
                                                    )}
                                                />
                                                {errors.Name && <p className="errorMsg">{errors.Name.message}</p>}
                                            </div>

                                            <div className="autofillBg col-12 mb-3">
                                                <label className="form-label">{t("Email")} <span className="text-danger">*</span></label>
                                                <input
                                                    type="email"
                                                    className="form-control rounded-pill"
                                                    placeholder="ex: youremailid@mail.com"
                                                    // className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                    id="idxEmail"
                                                    name="email"
                                                    maxLength={50}
                                                    {...register("Email", {
                                                        required: "Email is required.",
                                                        pattern: {
                                                            value: /^[^@ ]+@(?!gmail\.com|yahoo\.com|hotmail\.com)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                                                            message: "Please enter a valid business email ."
                                                        }
                                                    })}
                                                />
                                                {errors.Email && <p className="errorMsg">{errors.Email.message}</p>}

                                            </div>

                                            {/* <div className="col-lg-6 mb-3 autofillBg">
                                                <label className="form-label">
                                                    {t("Password")} <span className="text-danger">*</span>
                                                </label>
                                                <div className="input-group input-group-date rounded-pill">
                                                    <input
                                                        type="password"
                                                        className="form-control  ms-3 shadow-none"
                                                        // className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                        placeholder={t("Password")}
                                                        id="idxPassword"
                                                        name="password"
                                                        minLength={6}
                                                        maxLength={20}

                                                    />
                                                    <span className="input-group-text me-3" style={{ cursor: "pointer" }}>
                                                        <i style={{ fontSize: "x-large" }} className="bx bx-hide float-right" id="PsdID" title="show password" aria-hidden="true" ></i>
                                                    </span>
                                                </div>

                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">
                                                    {t("Confirm Password")}{" "}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <div className="input-group input-group-date rounded-pill">
                                                    <input
                                                        type="password"
                                                        className="form-control  ms-3 shadow-none"
                                                        placeholder={t("Confirm Password")}
                                                        id="idxConfPassword"
                                                        name="confirmPsd"
                                                        maxLength={20}

                                                    />
                                                    <span className="input-group-text me-3" style={{ cursor: "pointer" }}>
                                                        <i style={{ fontSize: "x-large" }} className="bx bx-hide float-right" id="confPsdID" title="show password" aria-hidden="true" ></i>
                                                    </span>
                                                </div>

                                            </div> */}


                                            {/* mobile number  */}
                                            <div className="col-md-12 mb-3">
                                                <label className="form-label">
                                                    {t("Mobile number")}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded-pill"
                                                    placeholder={t("Mobile_number")}
                                                    // className={`mt-3 form-control ${errors.mobile ? 'is-invalid' : ''}`}
                                                    id="idxMobile"
                                                    name="mobile"
                                                    {...register("PhoneNumber", {
                                                        required: "Phone Number Is Required",
                                                        minLength: {
                                                            value: 10,
                                                            message: "Phone Number must be at least 10 characters."
                                                        },
                                                        maxLength: {
                                                            value: 10,
                                                            message: "Phone Number must not exceed 10 characters."
                                                        },
                                                        pattern: {
                                                            value: /^[0-9]*$/, // Optional: restrict to numeric values only
                                                            message: "Phone Number must contain only digits."
                                                        }
                                                    }
                                                    )}
                                                />
                                                {errors.PhoneNumber && <p className="errorMsg">{errors.PhoneNumber.message}</p>}

                                            </div>

                                            {/* <div className="form-control">
                                                <label>Company</label>
                                                <input type="text" name="Company" {...register("Company", {
                                                    required: "Company Name Is Required",
                                                    maxLength: {
                                                        value: 30,
                                                        message: "Company Name Should be Max 30 characters."
                                                    },
                                                })} />
                                                {errors.Company && <p className="errorMsg">{errors.Company.message}</p>}
                                            </div> */}
                                            <div className="col-12 mb-3">
                                                {/* name  */}
                                                <label className="form-label">
                                                    {/* {t("Company")} */}
                                                    Company
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded-pill"
                                                    // className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                    placeholder={t("Company_Name")}
                                                    id="idxName"
                                                    name="Company"
                                                    maxLength={30}
                                                    {...register("Company", {
                                                        required: "Company Name Is Required",
                                                        maxLength: {
                                                            value: 30,
                                                            message: "Company Name Should be Max 30 characters."
                                                        },
                                                    })}
                                                />
                                                {errors.Company && <p className="errorMsg">{errors.Company.message}</p>}
                                            </div>

                                            <div className="form-bottom-actions justify-content-center flex-column align-items-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary rounded-pill"
                                                >
                                                    {t("Register now")}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="section-header text-center mt-5">
                    <div class="section" style={{ paddingBottom: "30px" }}>
                        <div class="heading" style={{ fontWeight: "700", fontSize: "clamp(1rem, 3vw, 4rem)" }}>

                            {t("Unlock Your Potential with Our Comprehensive Recruiter Portal Services")}
                        </div>
                    </div>
                    <p style={{ color: "#190905", fontWeight: "600", fontSize: "medium" }}>
                        {t("Our Recruiter portal connects you with top talent and streamlines you hiring process.Experience enhanced efficiency and access to a diverse pool of Candidates")}
                    </p>
                </div>
            </div>

            <div class="rowtext" style={{ marginTop: "60px", marginBottom: "60px" }}>

                <div class="columnstext">
                    <img src={Key_Recruiter_Icon} alt='Key_Recruiter_Icon' />
                    <h3 style={{ color: "#2E475D", fontWeight: "800", fontSize: "30px" }}>Talent Access</h3>
                    <p>Gain immediate access to a vast network of qualified candidates ready to work.</p>
                </div>
                <div class="columnstext">
                    <img src={Hiring_Recruiter_Icon} alt='Key_Recruiter_Icon' />
                    <h3 style={{ color: "#2E475D", fontWeight: "800", fontSize: "30px" }}>Streamlined Hiring</h3>
                    <p>Simplify your recruitment process with our user-friendly tools and resources  at your fingertips.</p>
                </div>
                <div class="columnstext">
                    <img src={Carousel_Recruiter_Icon} alt='Key_Recruiter_Icon' />
                    <h3 style={{ color: "#2E475D", fontWeight: "800", fontSize: "30px" }}>User Friendly Interface For Recruiter Efficiency</h3>
                    <p>Our intuitive design ensures a seamless experience from registration to hiring.</p>
                </div>

            </div>


        </Layout>
    )
}

export default RecruiterSales    