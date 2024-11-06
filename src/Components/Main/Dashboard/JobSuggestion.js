import React, { useState, useEffect } from 'react';
import noData from '../../../assets/imgs/no-data.svg';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ProfileDashboardService } from '../../../Services/ProfileDashboardservice';
import { AuthService } from '../../../Services/AuthService';
import Pagination from '@mui/material/Pagination';
import { Backdrop, CircularProgress } from '@mui/material';
import ApplyJobModal from '../Jobs/ApplyJobModal';
import { Modal, ModalBody } from 'react-bootstrap';
import LoginModal from '../../LogIn/LoginModal';
import '../../../assets/css/styles.css';
import '../../../assets/css/developer.css';
import { useTranslation } from 'react-i18next';
import { CommonService } from '../../../Services/CommonService';


function JobSuggestion() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [pageCount, setpageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(10);
    const [itemsPerPage, setitemsPerPage] = useState(5);
    const [startIndex, setstartIndex] = useState(0);
    const [totalRecord, setTotalRecord] = useState(0);
    const [jobSuggestions, setjobSuggestions] = useState([]);
    const [openLoader, setopenLoader] = React.useState(false);
    const [selected, setSelected] = useState([]);
    const [Savejob, setSavejob] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [applyJobModal, setapplyJobModal] = useState(false);
    const handleLoginClose = () => setloginShow(false);
    const handleLoginShow = () => setloginShow(true);
    const [loginShow, setloginShow] = useState(false);
    const [href, sethref] = useState("");
    const [pages, setPage] = React.useState(1);


    const handleChange = (e, p) => {
        setPage(p);
        handleCheckClick(false);
    }
    const handleRecordPerPageChange = (value) => {
        let recordPage = parseInt(value);
        if (recordPage !== 0 && recordPage !== undefined) {
            setitemsPerPage(recordPage);
            initJobSuggestions(0, recordPage);
            setPage(1);
        } else {

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
    // const handleApplyJob = async () => {
    //     let checkboxes = document.getElementsByClassName('jobId');
    //     let jobIDs = [];
    //     for (let i = 0; i < checkboxes.length; i++) {
    //         if (checkboxes[i].checked) {
    //             jobIDs.push(checkboxes[i].value);
    //         }
    //     }
    //     if (jobIDs.length > 0) {
    //         setSelected(jobIDs);
    //         try {
    //             setopenLoader(true);
    //             try {
    //                 const res = await ProfileDashboardService.ApplySelectedJob(jobIDs);
    //                 if (res.isSuccess) {
    //                     ShowAlert(1, res.message);
    //                 } else {
    //                     ShowAlert(0, res.message);
    //                 }
    //             } catch (error) { }
    //             setopenLoader(false);
    //         } catch (error) {

    //         }
    //     } else {
    //         ShowAlert(0, "Please select atleast one job");
    //     }
    // }
    const handleApplyJob = () => {
        let checkboxes = document.getElementsByClassName('jobId');
        let newSelected = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                newSelected.push(checkboxes[i].value);
            }
        }
        if (newSelected.length > 0) {
            setSelected(newSelected);
            handleShow();
        } else {
            ShowAlert(0, "Please select atleast one job");
        }
    }
    const CloseCandidateModal = (value) => {
        if (value === 1) {
            initJobSuggestions();
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
            initJobSuggestions();
        }
        if (isRefreshList) {
            handleClose();
            initJobSuggestions();
        }
    }
    const initJobSuggestions = async () => {
        setopenLoader(true);
        try {
            if (jobSuggestions.length === 0) {
                document.getElementById("noRecord").style.display = "none";
            }

            const jobSuggestionsList = await ProfileDashboardService.getJobSuggestions(pages, itemsPerPage);
            if (jobSuggestionsList.isSuccess) {
                setjobSuggestions(JSON.parse(jobSuggestionsList.apiData));
                setpageCount(Math.ceil(jobSuggestionsList.recordCount / itemsPerPage));
                setTotalRecord(jobSuggestionsList.recordCount);
            } else {
                setjobSuggestions([]);
            }
            document.getElementById("noRecord").style.display = "flex";
            const endOffset = itemOffset + itemsPerPage;
        } catch (error) {
            setopenLoader(false);
            document.getElementById("noRecord").style.display = "flex";
        }
        setopenLoader(false);
    }
    const handleSaveJob = async () => {
        let checkboxes = document.getElementsByClassName('jobId');
        let selectedBorder = document.getElementsByClassName("form-check");
        let newSelected = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                newSelected.push(checkboxes[i].value);
            }
        }
        if (newSelected.length > 0) {
            setopenLoader(true);
            const res = await ProfileDashboardService.saveSelectJob(newSelected);
            setSavejob(res);
            if (res.isSuccess) {
                for (let i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked = true) {
                        checkboxes[i].checked = false;
                    }
                    setSelected([]);
                }
                ShowAlert(1, res.message);
                handleClose();
                initJobSuggestions();
                for (let j = 0; j < selectedBorder.length; j++) {
                    selectedBorder[j].classList.remove("selected");
                }
            } else {
                for (let i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked = true) {
                        checkboxes[i].checked = false;
                    }
                }
                ShowAlert(0, res.message);
            }
        } else {
            ShowAlert(0, "Please select one job");
        }

        setopenLoader(false);
    }
    const handleCheckBoxClick = async (jpID, htmlID) => {
        const selectedIndex = selected.indexOf(jpID);
        if (document.getElementById(htmlID).parentElement.classList.contains('selected')) {
            document.getElementById(htmlID).parentElement.classList.remove("selected");
        } else {
            document.getElementById(htmlID).parentElement.classList.add("selected");
        }
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, jpID);

        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);

    }
    const handleCheckClick = (isCheckAllRequest) => {
        let checkboxes = document.getElementsByClassName('jobId');
        let newSelected = [];
        if (isCheckAllRequest) {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
                newSelected.push(checkboxes[i].value);
                setSelected(newSelected);
                let getClass = document.getElementsByClassName("form-check");
                for (let j = 0; j < getClass.length; j++) {
                    getClass[j].classList.add("selected");
                }
            }
        } else {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
                newSelected.push(checkboxes[i].value);
                setSelected(newSelected);
                let getClass = document.getElementsByClassName("form-check");
                for (let j = 0; j < getClass.length; j++) {
                    getClass[j].classList.remove("selected");
                }
            }
        }
    }
    const CloseModal = (res) => {
        if (res === 1) {
            initJobSuggestions();
            handleLoginClose();
        } else {
            navigate(
                {
                    pathname: "/"
                }
            )
        }
    }
    const handleGetJobDetailClick = async (jpID, title) => {
        let jobtitle = title.replace(/\s+/g, '-');
        var href = "/jobdetails" + "?jobs=" + jobtitle + "/" + jpID;
        sethref(href);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (AuthService.isAuthenticatedUser()) {
            initJobSuggestions();
        } else {
            handleLoginShow();
            navigate({
                pathname: "/profiledashboard",
            })
        }

    }, [pages, itemsPerPage])
    return (
        <>
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
                        jobPostingID={selected}
                        TriggerModalClose={CloseChildModal}
                        TriggerCloseModal={CloseCandidateModal}
                        IsApplied={true}
                    /></Modal.Body>

            </Modal>

            <div className="card shadow-sm mt-4">
                <div className="card-body">
                    {
                        totalRecord != 0 ?
                            <div className="button-actions mb-4">
                                <div className="buttons">
                                    <button className="btn btn-outline-primary btn-sm gray-outline-primary" onClick={() => handleCheckClick(true)}>{t("Check_All")}</button>
                                    <button className="btn btn-outline-primary btn-sm gray-outline-primary" onClick={() => handleCheckClick(false)}>{t("Uncheck_All")}</button>
                                </div>
                                <div className="buttons">
                                    <button className="btn btn-primary btn-sm" onClick={() => handleApplyJob(selected)}>{t("Apply_Job")} <i
                                        className='bx bx-right-arrow-alt'></i></button>
                                    <button className="btn btn-primary btn-sm" onClick={() => handleSaveJob(selected)}><i className='bx bx-save'></i>{t("Save_Job")}</button>
                                </div>
                            </div> : null
                    }

                    <div className="job-requirment-items">
                        {
                            totalRecord > 0 ?
                                <>
                                    {
                                        jobSuggestions.map((item, i) =>
                                            <div key={i}>
                                                <div className="form-check">
                                                    <input className="form-check-input jobId"
                                                        type="checkbox"
                                                        style={{ cursor: "pointer" }}
                                                        value={item.jobpostingid} id={"joblist" + i}
                                                        onClick={() => handleCheckBoxClick(item.jobpostingid, "joblist" + i)}
                                                    // disabled={item.IsApplied === 1}
                                                    />
                                                    <label className="form-check-label" htmlFor="">
                                                        <div className="heading">
                                                            <a className="title"
                                                                title={item.IsApplied === 1 ? "You have applied for this job" : item.JobPostingTitle}
                                                                href={href}
                                                                target='_blank'
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => handleGetJobDetailClick(item.jobpostingid, item.JobPostingTitle)} >
                                                                {item.JobPostingTitle.length <= 75 ? item.JobPostingTitle : item.JobPostingTitle.substring(0, 72) + "..."}
                                                            </a>
                                                            <span className="info has-dot">{item.LocationName}</span>
                                                            {item.IsApplied === 1 ? <span className="d-flex " style={{color:"#00BA00"}}><i class='bx bxs-check-circle' style={{ color: "#00BA00", fontSize: "20px" }}></i>Applied </span> : ""}
                                                            {item.IsSavedJob === 1 ? <span className=" d-flex" style={{color:"#00BA00"}}><i class='bx bxs-check-circle' style={{ color: "#00BA00", fontSize: "20px" }}></i>Saved </span> : ""}
                                                        </div>
                                                        <div className='heading'>
                                                            <span>{t("Job_Experience")}: ({item.JobPostingExperienceFrom} - {item.JobPostingExperienceTo}) years</span>
                                                            <span className="info has-dot">Salary: <span>{item.Salary != "0 - 0" ? item.Salary : "Negotiable "} {item.CurrencyCode ? ("in (" + item.CurrencyCode) + ")" : ""}</span></span>
                                                        </div>
                                                        <div className="heading" >
                                                            <span>{t("employer")}:  <span className="text-success"><b>{item.ClientDisplayName ? item.ClientDisplayName : item.ClientName}</b></span></span>
                                                            <span className="info has-dot"><span>Date of job posting: </span>{item.JobPostingCreatedON ? item.JobPostingCreatedON : "NA"}</span>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="tabel-footer  mt-4">
                                        <div className="no-of-rows mt-4" style={{ alignItems: "center" }}>
                                            {t("Page_Size")}:
                                            <select name="" className="form-select form-select-sm" id='pageDDId' onChange={(e) => handleRecordPerPageChange(e.target.value)}>
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="30">30</option>
                                                <option value="40">40</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
                                        </div>

                                        {
                                            pageCount > 1 ?
                                                <nav aria-label="Page navigation example" className="d-flex justify-content-end mt-4">
                                                    <Pagination
                                                        count={pageCount}
                                                        defaultPage={1}
                                                        shape="rounded"
                                                        size="small"
                                                        page={pages}
                                                        onChange={handleChange}
                                                        showFirstButton
                                                        showLastButton
                                                        siblingCount={0}
                                                    />
                                                </nav> : null
                                        }
                                        <div className="no-of-rows mt-4" style={{ alignItems: "center" }}>
                                            {t("Records_Total")}: {totalRecord}
                                        </div>
                                    </div>
                                </>
                                :
                                <div className="no-data-found" id='noRecord' >
                                    <img src={noData} alt="" />
                                    <p>{t("Job_Suggestion_Msg")}</p>
                                </div>
                        }
                    </div>
                </div>

            </div>
            {/* <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> */}
        </>
    )
}

export default JobSuggestion