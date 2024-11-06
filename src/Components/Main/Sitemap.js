import React, { useEffect } from 'react';
import Layout from '../../Layout/Layout'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Sitemap() {
    const { t } = useTranslation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Layout>
                {/* <!-- Hero Header Section Start --> */}
                <section className="sub-hero-headerr">
                    <div className="container">
                        <div className="text-content">
                            <h1>{t("Sitemap")}</h1>
                        </div>

                    </div>
                </section>
                {/* <!-- Hero Header Section End --> */}
                {/* <!-- About Start --> */}
                <section className="bg-white section-about">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 mb-lg-0 mb-3">
                                <div className="section-header">
                                    <h6 className="section-subtitle">{t("Sitemap")}</h6>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-4 col-md-6 col-sm-6'>
                                    <h6 style={{color:"#2E475D"}}>{t("For Jobseekers")}</h6>
                                    <hr></hr>
                                    <ul className='font-12 links'>
                                        <li style={{ textAlign: "left", cursor: "pointer" }}><Link className="nav-link" aria-current="page" to="/">{t("Home")}</Link></li>
                                        <li style={{ textAlign: "left", cursor: "pointer" }}><Link className="nav-link" aria-current="page" to="/aboutus">{t("About_Us")}</Link></li>
                                        {/* <li style={{ textAlign: "left", cursor: "pointer" }}><Link className="nav-link" aria-current="page" to="/#">Our Clients</Link></li> */}
                                        <li style={{ textAlign: "left", cursor: "pointer" }}><Link className="nav-link" aria-current="page" to="/contactus">{t("Contact_Us")}</Link></li>
                                        {/* <li style={{ textAlign: "left", cursor: "pointer" }}><Link className="nav-link" aria-current="page" to="/#">Feedback</Link></li> */}
                                        <li style={{ textAlign: "left", cursor: "pointer" }}><Link className="nav-link" aria-current="page" to="/privacycommitment">{t("Privacy Commitment")}</Link></li>
                                        <li style={{ textAlign: "left", cursor: "pointer" }}><Link className="nav-link" aria-current="page" to="/searchguidelines">{t("Search Guidelines")}</Link></li>
                                        <li style={{ textAlign: "left", cursor: "pointer" }}><Link className="nav-link" aria-current="page" to="/termsofuse">{t("Terms & Conditions")}</Link></li>
                                    </ul>
                                </div>
                                <div className='col-lg-4 col-md-6 col-sm-6'>
                                    <h6 style={{color:"#2E475D"}}>{t("Search")}</h6>
                                    <hr></hr>
                                    <ul className='font-12'>
                                        <li style={{ textAlign: "left", cursor: "pointer" }}><Link className="nav-link" aria-current="page" to="/quicksearch">{t("Quick Search")}</Link></li>
                                        <li style={{ textAlign: "left", cursor: "pointer" }}><Link className="nav-link" aria-current="page" to="/advancesearch">{t("Advanced Search")}</Link></li>
                                    </ul>
                                </div>
                                <div className='col-lg-4 col-md-6 col-sm-6'>
                                    <h6 style={{color:"#2E475D"}}>{t("For Candidates")}</h6>
                                    <hr></hr>
                                    <ul className='font-12'>
                                        <li style={{ textAlign: "left", cursor: "pointer" }} ><Link className="nav-link" aria-current="page" to="/profiledashboard">{t("My HuntsJob")}</Link></li>
                                        {/* <li style={{ textAlign: "left", cursor: "pointer" }} ><Link className="nav-link" aria-current="page" to="/#">My Saved Jobs</Link></li>
                                        <li style={{ textAlign: "left", cursor: "pointer" }} ><Link className="nav-link" aria-current="page" to="/#">My Saved Searches</Link></li> */}
                                        <li style={{ textAlign: "left", cursor: "pointer" }} ><Link className="nav-link" aria-current="page" to="/myprofile">{t("My_Profile")}</Link></li>
                                        <li style={{ textAlign: "left", cursor: "pointer" }} ><Link className="nav-link" aria-current="page" to="/changepassword">{t("Change_Password")}</Link></li>
                                        {/* <li style={{ textAlign: "left", cursor: "pointer" }} ><Link className="nav-link" aria-current="page" to="/#">Notifications</Link></li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- About End --> */}
            </Layout>
        </>
    )
}

export default Sitemap