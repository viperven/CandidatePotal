import React, { useState, useEffect } from 'react';
import Layout from '../../../Layout/Layout';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { JobDetailsService } from '../../../Services/JobDetailsService';
import { AuthService } from '../../../Services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Modal, ModalBody } from 'react-bootstrap';
import ApplyJobModal from './ApplyJobModal';
import LoginModal from '../../LogIn/LoginModal';
import { ProfileDashboardService } from '../../../Services/ProfileDashboardservice';
import { useTranslation } from 'react-i18next';
// import { RWebShare } from "react-web-share";
import { AdvanceSearchService } from '../../../Services/AdvanceSearchService';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';

function JobDetails() {
    const { t } = useTranslation();
    const search = (useLocation().search).replace(/&/g, '"-"');
    const qs = new URLSearchParams(search).get('qs');
    const navigate = useNavigate();
    const [openLoader, setopenLoader] = React.useState(false);
    const [jobDetails, setjobDetails] = useState([]);
    const [interviewDetails, setInterviewDetails] = useState([]);
    const jobid = new URLSearchParams(search).get('jobs');
    let jpID = jobid.split("/").pop();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [applyJobModal, setapplyJobModal] = useState(false);
    const handleLoginClose = () => setloginShow(false);
    const handleLoginShow = () => setloginShow(true);
    const [loginShow, setloginShow] = useState(false);
    const [searchResult, setsearchResult] = useState([]);
    const [href, sethref] = useState("");
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
    const handleApplyJOBClick = async () => {
        try {
            if (AuthService.isAuthenticatedUser()) {
                setopenLoader(true);
                const res = await ProfileDashboardService.ApplySelectedJob(jpID);
                if (res.isSuccess) {
                    ShowAlert(1, res.message);
                } else {
                    ShowAlert(0, res.message);
                }
                setopenLoader(false);
                handleShow();
                getSearchedJobDetails(jpID);
            } else {
                handleLoginShow();
                navigate({
                    pathname: "/jobdetails",
                    search: "?jobs=" + jobid,
                })
            }
        } catch (error) {

        }
    }
    const handleSaveJobClick = async () => {
        try {
            if (AuthService.isAuthenticatedUser()) {
                setopenLoader(true);
                if (jpID) {
                    const res = await ProfileDashboardService.saveSelectJob(jpID);
                    if (res.isSuccess) {
                        ShowAlert(1, res.message);
                    } else {
                        ShowAlert(0, "You have already saved this job");
                    }
                } else {

                }
                setopenLoader(false);
                getSearchedJobDetails(jpID);
            } else {
                handleLoginShow();
                navigate({
                    pathname: "/jobdetails",
                    search: "?jobs=" + jobid,
                })
            }
        } catch (error) {

        }
    }
    const CloseModal = () => {
        handleLoginClose()
    }
    const CloseCandidateModal = (value) => {
        if (value === 1) {
            setopenLoader(false);
            handleClose();
            let checkboxes = document.getElementsByClassName('jobId');
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checkboxes[i].checked = false;
                }
            }
        }
    }
    const CloseChildModal = (value, isRefreshList) => {
        if (value === 1) {
            handleClose();
        }
        if (isRefreshList) {
            handleClose();
        }
    }
    const replaceSpecialCharFromUrl = (v) => {
        v.replace(/ /g, '').replace("%20", "-").replace(" ", '-').replace("%21", "")
            .replace("%22",).replace("%23", "")
            .replace("%24",).replace("%25", "")
            .replace("%26",).replace("%27", "")
            .replace("%28",).replace("%29", "")
            .replace("%2A", "").replace("%2B", "")
            .replace("%2C", "").replace("%2E", "")
            .replace("$", "").replace("%30", "")
            .replace("%31", "").replace("%32", "")
            .replace("%33", "").replace("%34", "")
            .replace("%35", "").replace("%36", "")
            .replace("%37", "").replace("%38", "")
            .replace("%37", "").replace("%38", "").replace("%39", "")
            .replace("0", "").replace("1", "").replace("2", "").replace("3", "")
            .replace("4", "").replace("5", "").replace("6", "")
            .replace("7", "").replace("8", "").replace("9", "");
        return v;
    }
    const getSearchedJobDetails = async (jpID) => {
        try {
            if (jpID) {
                setopenLoader(true);
                const getJobDetails = await JobDetailsService.getJobDetailsByJobPostingID(jpID);
                setjobDetails(getJobDetails);
                navigate({
                    pathname: '/jobdetails',
                    search: "?jobs=" + replaceSpecialCharFromUrl(getJobDetails.title) + "/" + jpID,
                })
                setInterviewDetails(getJobDetails.interviewDetailTable ? JSON.parse(getJobDetails.interviewDetailTable) : []);
              
                setopenLoader(false);
            }
        } catch (error) {
            setopenLoader(false);
        }
        setopenLoader(false);
    }
    const getJobDetails = async (qs) => {
        if (qs) {
            setopenLoader(true);
            const getJobDetails = await JobDetailsService.getJobDetails(qs);

            setjobDetails(getJobDetails);
            navigate({
                pathname: '/jobdetails',
                search: "?jobs=" + replaceSpecialCharFromUrl(getJobDetails.title) + "/" + jpID,
            })
           
            setInterviewDetails(getJobDetails.interviewDetailTable ? JSON.parse(getJobDetails.interviewDetailTable) : []);
            setopenLoader(false);
        }
    }
    const initSearchResult = async () => {
        const keyword = jobid.split("/")[0];
        if (keyword !== "" || keyword !== undefined) {
            const data = {
                IsAdvanceSearch: true,
                Keywords: keyword,
                AllOrAnyKeywords: "true",
                Location: "",
                Searchin: "",
                JobsPostedWithin: "",
                JobCode: "",
                Industry: "",
                FunctionalArea: "",
                Specialization: "",
                Qualification: "",
                QualificationSpecialization: "",
                YearlySalary: "",
                ExperienceFrom: 0,
                ExperienceTo: 0,
                userId: AuthService.getCurrentUser().userId ? AuthService.getCurrentUser().userId : "",
                StartIndex: 1,
                ClientID: 0,
            }
            const result = await AdvanceSearchService.JobSearch(data);

            let result2 = JSON.parse(result.searchResultsString);
            result2 = result2.filter((item) => {
                return item.JobPostingID != jpID

            })

            result.searchResultsString ? setsearchResult(result2) : setsearchResult([]);
        }
    }
    const handleGetJobDetailClick = async (jpID, title) => {
        let jobtitle = title.replace(/\s+/g, '-');
        var href = "/jobdetails" + "?jobs=" + jobtitle + "/" + jpID;
        sethref(href);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        if (qs) {
            getJobDetails(qs);
        } else {
            getSearchedJobDetails(jpID);
        }
        initSearchResult();
        // setTimeout(() => {
        //     initSearchResult();
        // }, 5000)
    }, []);
    return (
        <>
            <Layout>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openLoader}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {/* login modal */}
                <Modal
                    show={loginShow}
                    size='lg'
                    onHide={handleLoginClose}
                    animation={true}
                >
                    <LoginModal CallbackRes={CloseModal} />
                </Modal>
                {/* login modal */}
                <Modal
                    show={show}
                    size='lg'
                    onHide={handleClose}
                    animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t("Details_For_Apply")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ApplyJobModal
                            jobPostingID={jpID}
                            TriggerModalClose={CloseChildModal}
                            TriggerCloseModal={CloseCandidateModal}
                            IsApplied={true}
                        />
                    </Modal.Body>

                </Modal>
                <section>
                    <div className="container mt-5 mb-5">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="card-body-header">
                                    <div className="header-start">
                                        <h2 className="card-title flex-fill">
                                            {jobDetails.title}
                                            <span style={{ fontSize: "1.02rem", color: "#ff5c35" }}> ( {t("Job Code")}: {jobDetails.code} )</span>  &nbsp;
                                            {jobDetails.isApplied === 1 ? <span className="" style={{color:"#00BA00"}}><i class='bx bxs-check-circle' style={{ color: "#00BA00", fontSize: "15px" }}></i>Applied </span> : ""}
                                            {jobDetails.isSaved === 1 ? <span className="" style={{color:"#00BA00"}}><i class='bx bxs-check-circle' style={{ color: "#00BA00", fontSize: "15px" }}></i>Saved </span> : ""}
                                        </h2>
                                        <p>{jobDetails.appliedStatus}</p>
                                        <p>{t("Posted_on")} - {jobDetails.jpStartdate}</p>
                                    </div>
                                    <div className="header-end">
                                        <div className="buttons">
                                            <button disabled={jobDetails.isApplied === 1} title={jobDetails.isApplied === 1 ? "You have applied for this job" : "Apply"} className="btn btn-sm btn-primary" onClick={() => handleApplyJOBClick()}>{t("Apply_Job")}<i className='icon bx bx-right-arrow-alt'></i></button>
                                            <button disabled={jobDetails.isSaved === 1} title={jobDetails.isSaved === 1 ? "You have saved for this job" : "Save"} className="btn btn-sm btn-primary" onClick={() => handleSaveJobClick()}><i className='icon bx bx-save'></i>{t("Save_Job")}</button>
                                            {/* <RWebShare
                                                data={{
                                                    text: "Web Share-Job Share",
                                                    url: { currentUrl },
                                                    title: "Share this job",
                                                }}
                                            >
                                                <button className="btn btn-sm btn-primary" title='Share this job' ><i className='bx bx-share-alt'></i>{t("Share")}</button>
                                            </RWebShare> */}


                                        </div>
                                    </div>
                                    {/* <!-- <a href="advanced-search.html" className="btn btn-outline-primary btn-sm">Advanced Search</a> --> */}
                                </div>

                                <div className="card card-information">
                                    <div className="card-header">
                                        <h5 className="card-title">{t("Job_Requirement")}</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="item">
                                                    <div className="label">{t("Position")}</div>
                                                    <div className="value">{jobDetails.position ? jobDetails.position : "NA"}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="item">
                                                    <div className="label">{t("Industry")}</div>
                                                    <div className="value">{jobDetails.industries ? jobDetails.industries : "NA"}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="item">
                                                    <div className="label">{t("Qualification")}</div>
                                                    <div className="value">{jobDetails.qualifications ? jobDetails.qualifications : "NA"}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="item">
                                                    <div className="label">{t("Qualification_Specialization")}</div>
                                                    <div className="value">{jobDetails.qualificationSpecialization ? jobDetails.qualificationSpecialization : "NA"}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="item">
                                                    <div className="label">{t("Location2")}</div>
                                                    <div className="value">{jobDetails.locations ? jobDetails.locations : "NA"}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="item">
                                                    <div className="label">{t("Experience")}</div>
                                                    <div className="value">{jobDetails.experienceFrom ? jobDetails.experienceFrom : "NA"} - {jobDetails.experienceTo ? jobDetails.experienceTo : "NA"} yrs</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-4 mb-4">
                                                <div className="item">
                                                    <div className="label">{t("Yearly_Salary")}</div>
                                                    <div className="value">{jobDetails.salary ? jobDetails.salary : "NA"} {jobDetails.currency ? jobDetails.currency : ""}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-information">
                                    <div className="card-header">
                                        <h5 className="card-title">{t("Job_Description")}</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-12 col-lg-12 mb-4">
                                                <div className="item">
                                                    <div className="label">{t("Job_Title")}</div>
                                                    <div className="value">{jobDetails.title ? jobDetails.title : "NA"}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-lg-12 mb-4">
                                                <div className="item">
                                                    <div className="label">{t("Description")}</div>
                                                    <div className="value" dangerouslySetInnerHTML={{ __html: jobDetails.description ? jobDetails.description.replace(/<[^>]*style=[^>]*>/g, '') : "NA" }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-information">
                                    <div className="card-header">
                                        <h5 className="card-title">{t("Interview_Details")}</h5>
                                    </div>
                                    {
                                        interviewDetails.length > 0 ?
                                            <table className='table mb-0'>
                                                <thead>
                                                    <tr>
                                                        <th>{t("Location2")}</th>
                                                        <th>{t("Date_Time")}</th>
                                                        <th>{t("Mode")}</th>
                                                        <th>{t("Address_Link")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {interviewDetails.map((d, i) =>
                                                        <tr key={i} >
                                                            <td>{d.LocationName}</td>
                                                            <td>{d.InterviewDate}</td>
                                                            <td>{d.InterviewMode}</td>
                                                            <td>{d.InterviewMode === "Offline" ? <span>{d.InterviewAddressLink}</span> : d.InterviewMode === "Telephonic" ? <a href={`tel:${d.InterviewAddressLink}`}>{d.InterviewAddressLink}</a> : <a href={d.InterviewAddressLink} target='blank'>{d.InterviewAddressLink}</a>}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table> : <div className="card-body"> <div className='label'>Not Available</div></div>
                                    }
                                </div>



                                <div className="card card-information">
                                    <div className="card-header">
                                        <h5 className="card-title">{t("Company_Profile")} : {jobDetails.clientName ? jobDetails.clientName : "NA"}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p dangerouslySetInnerHTML={{ __html: jobDetails.companyProfile ? jobDetails.companyProfile : "NA" }}></p>
                                        {/* <p>Since then A&P has successfully executed a large number of complex and landmark projects in all
                                            disciplines of Mechanical, Electrical and Plumbing works spanning an array of installations in
                                            different sectors including airports, hospitals, sports facilities, rail, hospitality, power
                                            distribution, district cooling, military, residential, commercial, industrial, educational facilities
                                            and major infrastructure projects over four decades of presence in the industry and specifically in
                                            the Middle East and North Africa regions.</p> */}
                                    </div>
                                </div>
                                <div className="card card-information">
                                    <div className="card-header">
                                        <h5 className="card-title">{t("Company Address")}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p>
                                            {jobDetails.clientAddress}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            searchResult ?
                                <div className="card shadow-sm mb-5 mt-5">

                                    <div className="card-body">
                                        <div className="header-start">
                                            <h2 className="card-title flex-fill">Similar Jobs <i className='bx bxs-hand-down'></i></h2>
                                        </div>

                                        <div class="row g-3">
                                            {
                                                searchResult.map((item, i) =>
                                                    <div class="col-sm-12 col-md-6 col-lg-6 job-requirment-items">
                                                        <div className="card card-information">
                                                            <div className="card-body">
                                                                <label className="form-check-label" htmlFor="">
                                                                    <div className="heading">
                                                                        <i className='bx bxs-box text-muted'></i>&nbsp;&nbsp;&nbsp;
                                                                        <a href={href} target='_blank' className="title"
                                                                            onClick={() => handleGetJobDetailClick(item.JobPostingID, item.Title)}
                                                                            style={{ cursor: "pointer", fontSize: "25px" }}>
                                                                                {item.Title}
                                                                        </a>
                                                                        <span className="text-muted">&nbsp;&nbsp;<FiberManualRecordSharpIcon style={{ fontSize: "60%" }} /> {item.Locations}</span> &nbsp;
                                                                        {item.IsAppled === 1 ? <span className="text-info fw-bolder">applied <i class="icon bx bx-right-arrow-alt"></i></span> : ""}
                                                                        {item.IsSaved === 1 ? <span className="text-info fw-bolder"><i class="icon bx bx-save"></i> saved</span> : ""}
                                                                    </div>
                                                                    <div className="heading">
                                                                        <i className='bx bx-caret-right'></i> <span>{t("Job_Experience")}: ({item.ExperienceFrom} - {item.ExperienceTo}) years</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    </div>
                                                                    <div className="heading">
                                                                        <i className='bx bx-caret-right'></i>  <span className="info">{t("Salary")}: <span>{item.Salary ? item.Salary : "Negotiable"} {item.Currency ? ("IN (" + item.Currency + ")") : ""}</span></span>
                                                                    </div>
                                                                    <div className="heading" >
                                                                        <i className='bx bx-caret-right'></i>  <span>{t("employer")}:</span> <span className="text-success" style={{ cursor: "pointer" }} ><b>{item.ClientDisplayName ? item.ClientDisplayName : item.RADisplayName}</b></span>
                                                                    </div>
                                                                    <div className="heading">
                                                                        <i className='bx bx-caret-right'></i> <span><span className="info">Date of job posting: </span>{item.StartDate}</span>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                </div> : ""
                        }

                    </div>
                </section>
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
            </Layout >
        </>
    )
}

export default JobDetails