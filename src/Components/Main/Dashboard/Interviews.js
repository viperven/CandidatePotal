import React, { useState, useEffect } from 'react';
import noData from '../../../assets/imgs/no-data.svg'
import { useTranslation } from 'react-i18next';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DataTable from 'react-data-table-component';
import { ProfileDashboardService } from '../../../Services/ProfileDashboardservice';

function Interviews() {
    const { t } = useTranslation();
    const [openLoader, setopenLoader] = React.useState(false);
    const [interviewDetails, setinterviewDetails] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [totalRecord, setTotalRecord] = useState(0);
    const [pages, setPage] = React.useState(1);
    const countPerPage = 10;
    const [searchText, setsearchText] = useState("");

    const columns = [
        {
            name: 'Title',
            selector: row => (
                <a className="title" style={{ cursor: "pointer", textDecoration: "none" }} onClick={() => handleGetJobDetailClick(row.JobPostingID, row.JobPostingTitle)} >
                    {row.JobPostingTitle}
                </a>
            ),

        },
        {
            name: 'Location',
            selector: row => `${row.InterviewLocation}`,

        },
        {
            name: 'IVR No',
            selector: row => (<a href={`tel:${row.IvrNo}`}>{row.IvrNo}</a>),

        },
        {
            name: 'Date-Time',
            selector: row => `${row.InterviewDate}`,
        },
        {
            name: 'Mode',
            selector: row => `${row.InterviewMode}`,
        },
        {
            name: 'Address/Link',
            selector: row => (
                <>
                    {row.InterviewMode === "Offline" ? <span>{row.InterviewAddressLink}</span> : row.InterviewMode === "Telephonic" ? <a href={`tel:${row.InterviewAddressLink}`} style={{ textDecoration: "none" }}>{row.InterviewAddressLink}</a> : <a href={row.InterviewAddressLink} target='blank'>{row.InterviewAddressLink}</a>}
                </>
            ),
        },
    ];
    const handleGetJobDetailClick = async (jpID, title) => {
        let jobtitle = title.replace(/\s+/g, '-');
        var href = "/jobdetails" + "?jobs=" + jobtitle + "/" + jpID;
        window.open(href, "_blank", "noreferrer");
    }
    const initinterviewDetails = async () => {
        setopenLoader(true);
        try {
            const res = await ProfileDashboardService.getInterviewDetails(searchText, pages, countPerPage);
            setinterviewDetails(res.apiData ? JSON.parse(res.apiData) : []);
            setpageCount(Math.ceil(res.recordCount / countPerPage));
            setTotalRecord(res.recordCount);
        } catch (error) {

        }
        setopenLoader(false);
    }
    useEffect(() => {
        initinterviewDetails();
    }, [pages, searchText])

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
                    {
                        interviewDetails.length > 0 ?
                            <div div className="container">
                                <div className="table-filter">
                                    <div className="filter-start col-md-4">
                                        <div className="input-group input-group-search">
                                            <span className="input-group-text" id="inputGroup-sizing-default"><i className="bx bx-search"></i></span>
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Search"
                                                onChange={(e) => setsearchText(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div> : ""
                    }
                    <div className="container-fluid">
                        <div className="table-responsive">
                            {/* Table goes here */}
                            <DataTable
                                columns={columns}
                                data={interviewDetails}
                                noDataComponent="No interviews details found !"
                                highlightOnHover
                                pagination
                                paginationServer
                                paginationTotalRows={totalRecord}
                                paginationPerPage={countPerPage}
                                paginationComponentOptions={{
                                    noRowsPerPage: true
                                }}
                                onChangePage={page => setPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Interviews