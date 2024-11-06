import React, { useState, useEffect } from 'react';
import noData from '../../../assets/imgs/no-data.svg'
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ProfileDashboardService } from '../../../Services/ProfileDashboardservice';
import { AuthService } from '../../../Services/AuthService';
import Pagination from '@mui/material/Pagination';

function Feeds() {
    const navigate = useNavigate();
    const [myFeed, setmyFeed] = useState([]);
    const [openLoader, setopenLoader] = React.useState(false);
    const [startIndex, setstartIndex] = useState(0);
    const [pageCount, setpageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(10);
    const [itemsPerPage, setitemsPerPage] = useState(5);
    const [totalRecord, setTotalRecord] = useState(0);
    const [htmlFeed, sethtmlFeed] = useState([]);
    console.log("htmlfeed", htmlFeed);

    const [href, sethref] = useState("");
    const [pages, setPage] = React.useState(1);
    const handleChange = (e, p) => {
        setPage(p);
    };

    const initMyFeeds = async () => {
        setopenLoader(true);
        try {
            if (htmlFeed.length === 0) {
                document.getElementById("noRecord").style.display = "none";
            }
            const feeds = await ProfileDashboardService.getMyFeed(pages, itemsPerPage);
            sethtmlFeed(JSON.parse(feeds.apiData));
            setmyFeed(feeds);
            setpageCount(Math.ceil(feeds.recordCount / itemsPerPage));
            setTotalRecord(feeds.recordCount);
            document.getElementById("noRecord").style.display = "flex";
        } catch (error) {

        }
        setopenLoader(false);
    }
    const handleRecordPerPageChange = (value) => {
        let recordPage = parseInt(value);
        if (recordPage !== 0 && recordPage !== undefined) {
            setitemsPerPage(recordPage);
            initMyFeeds(0, recordPage);
            setPage(1);
        } else {

        }
    }
    const handleGetJobDetailClick = async (jpID, title) => {
        let jobtitle = title.replace(/\s+/g, '-');
        var href = "/jobdetails" + "?jobs=" + jobtitle + "/" + jpID;
        sethref(href);
    }
    useEffect(() => {
        initMyFeeds();
    }, [pages, itemsPerPage])

    const statusStyles = {
        'Applied': { backgroundColor: '#F18F23', borderLeftColor: '#F18F23',textColor:"#F18F23" },
        "Shortlisted": { backgroundColor: '#029adb', borderLeftColor: '#029adb',textColor:"#029adb" },
        'Selected': { backgroundColor: '#00BA00', borderLeftColor: '#00BA00',textColor:"#00BA00" },
        "Rejected": { backgroundColor: '#FF0000', borderLeftColor: '#FF0000',textColor:"#FF0000" }
    }; 
    
    const defaultStyle = {
        backgroundColor: '#DBDBDB', 
        borderLeftColor: '#9E9E9E'  
    };

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

                    <div>
                        {
                            totalRecord > 0 ?
                                <>
                                    {htmlFeed.map((item, i) => {
                // Get the style based on ResumeStatusName or use defaultStyle
                const statusStyle = statusStyles[item.ResumeStatusName] || defaultStyle;

                return (
                    <div key={i}>
                        {
                            AuthService.getCurrentUser().referenceID === item.EncAppliedJobPostingStatusModifiedBy ?
                                <div className="message mb-4" style={{
                                    backgroundColor: "white",
                                    borderRadius: "4px",
                                    border: "1px #EAF0F6",
                                    boxShadow:  `4px 4px 6.3px 0px ${statusStyle.backgroundColor}`,
                                    borderLeft: `8px solid ${statusStyle.borderLeftColor}`,
                                    minHeight: "53px"
                                }}>
                                    <span style={{ color: "#82919e" }}> You have applied for</span> 
                                    <span>
                                        <a href={href} target='_blank' style={{ color: "#374151", textDecoration: "none", cursor: "pointer" }} onClick={() => handleGetJobDetailClick(item.JobPostingID, item.JobPostingTitle)}>
                                            &nbsp;{item.JobPostingTitle} &nbsp;({item.JobPostingCode})
                                        </a>
                                    
                                        <span style={{ color: "#82919e", fontSize: "smaller" }}> On &nbsp; {item.AppliedJobPostingStatusModifiedOn} </span>
                                    </span>
                                </div>
                                :
                                <div className="message mb-4" style={{ backgroundColor: "white",
                                    borderRadius: "4px",
                                    border: "1px #EAF0F6",
                                    boxShadow:  `4px 4px 6.3px 0px ${statusStyle.backgroundColor}`,
                                    borderLeft: `8px solid ${statusStyle.borderLeftColor}`,
                                    minHeight: "53px" }}>
                                    <span style={{ color: "#82919e" }}>Your Status for</span> 
                                    <span>
                                        <a href={href} target='_blank' style={{ color: "#374151", textDecoration: "none" }} onClick={() => handleGetJobDetailClick(item.JobPostingID, item.JobPostingTitle)}>
                                            &nbsp;{item.JobPostingTitle} &nbsp;({item.JobPostingCode})
                                        </a>
                                       
                                        <span style={{ color: "#82919e" }}>has been changed to</span> <span style={{color:statusStyle.textColor}}>{item.ResumeStatusName}</span>
                                    </span>
                                    <span style={{ color: "#82919e", fontSize: "smaller" }}> On {item.AppliedJobPostingStatusModifiedOn}</span>
                                </div>
                        }
                    </div>
                );
            })}
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
                                        {/* <div className="row" style={{ alignItems: "center" }}>
                                        <div className='col-6'>Page Size: </div>
                                        <div className='col-6'>
                                            <select name="" className="form-select form-select-sm" id='pageDDId' onChange={(e) => handleRecordPerPageChange(e.target.value)}>
                                                <option value="5" selected="selected">5</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="30">30</option>
                                                <option value="40">40</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
                                        </div>
                                    </div> */}
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
                                </> :
                                <div className="no-data-found" id='noRecord'>
                                    <img src={noData} alt="" />
                                    <p>No feeds found.</p>
                                </div>
                        }
                    </div>

                </div>
            </div >
        </>
    )
}

export default Feeds