import React, { useState, useEffect } from 'react';
import { ProfileDashboardService } from '../../../Services/ProfileDashboardservice';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../../Services/AuthService';
import noData from '../../../assets/imgs/no-data.svg'
import Pagination from '@mui/material/Pagination';
import { Backdrop, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';


function AppliedJob() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [openLoader, setopenLoader] = useState(false);
    const [applyJobList, setapplyJobList] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(5);
    const [startIndex, setstartIndex] = useState(0);
    const [itemsPerPage, setitemsPerPage] = useState(5);
    const [totalRecord, setTotalRecord] = useState(0);
    const [href, sethref] = useState("");

    const [pages, setPage] = useState(1);
    const handleChange = (e, p) => {
        setPage(p);
    };
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % 10;
        setstartIndex(event.selected);
        setItemOffset(newOffset);
        initApplyJobs(startIndex + 1, itemsPerPage);
    }
    const handleRecordPerPageChange = (value) => {
        let recordPage = parseInt(value);
        if (recordPage !== 0 && recordPage !== undefined) {
            setitemsPerPage(recordPage);
            initApplyJobs(0, recordPage);
            setPage(1);
        } else {

        }
    }

    const initApplyJobs = async () => {
        setopenLoader(true);
        try {
            if (applyJobList.length === 0) {
                document.getElementById("noRecord").style.display = "none";
            }
            const applyedJob = await ProfileDashboardService.getApplyedJobs(pages, itemsPerPage);
            applyedJob.apiData ? setapplyJobList(JSON.parse(applyedJob.apiData)) : setapplyJobList([]);
            setpageCount(Math.ceil(applyedJob.recordCount / itemsPerPage));
            setTotalRecord(applyedJob.recordCount);
            document.getElementById("noRecord").style.display = "flex";
        } catch (error) {

        }
        setopenLoader(false);
    }
    const handleGetJobDetailClick = async (jpID, title) => {
        let jobtitle = title.replace(/\s+/g, '-');
        var href = "/jobdetails" + "?jobs=" + jobtitle + "/" + jpID;
        sethref(href);
    }
    useEffect(() => {
        window.scrollTo(0, 0);

        if (AuthService.isAuthenticatedUser()) {
            initApplyJobs();
        } else {
            navigate("/401");
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
            <div className="card shadow-sm mt-4">
                <div className="card-body">
                    <div className="job-requirment-items">

                        {
                            totalRecord > 0 ?
                                <>
                                    {
                                        applyJobList.map((item, i) =>
                                            <div className="form-check" key={i}>
                                                <label className="form-check-label" htmlFor="">
                                                    <div className="heading">
                                                        <a href={href} target='_blank' className="title" style={{ cursor: "pointer" }} onClick={() => handleGetJobDetailClick(item.JobPostingID, item.JobPostingTitle)} >
                                                            {item.JobPostingTitle ? item.JobPostingTitle : item.JobPostingTitle + "..."}
                                                        </a>
                                                        <span className="info">{item.LocationName}</span>

                                                    </div>
                                                    <div className="heading">
                                                        <span>{t("Job_Experience")}: ({item.JobPostingExperienceFrom} - {item.JobPostingExperienceTo}) years</span>
                                                        <span className="info has-dot">Salary: <span>{item.Salary ? item.Salary : "Negotiable"} {item.Currency ? ("IN (" + item.Currency + ")") : ""}</span></span>
                                                    </div>
                                                    <div className="heading" >
                                                        <span>{t("employer")}:</span> <span className="text-success" ><b>{item.ClientName}</b></span>
                                                        <span style={{ float: "right" }}><span className="info">Date of job posting: </span>{item.AppliedJobPostingCreatedOn != "" ? item.AppliedJobPostingCreatedOn : "NA"}</span>
                                                    </div>
                                                    <div className="heading" >
                                                        <span>Status: {item.ResumeStatusName}</span>
                                                        <span className="info has-dot">JobCode: {item.JobPostingCode}</span>
                                                        <span className="info has-dot">Applied On: {item.AppliedOn != "" ? item.AppliedOn : "NA"}</span>
                                                    </div>
                                                </label>
                                            </div>
                                        )
                                    }
                                    <div className="tabel-footer  mt-4">
                                        <div className="no-of-rows mt-4" style={{ alignItems: "center" }}>
                                            Page Size:
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
                                            Record(s) Total: {totalRecord}
                                        </div>
                                    </div>
                                </>
                                :
                                <div className="no-data-found" id='noRecord'>
                                    <img src={noData} alt="" />
                                    <p>You are not applied any jobs yet.</p>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default AppliedJob