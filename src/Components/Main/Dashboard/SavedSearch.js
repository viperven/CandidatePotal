import React, { useState, useEffect } from 'react';
import noData from '../../../assets/imgs/no-data.svg';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../../Services/AuthService';
import { ProfileDashboardService } from '../../../Services/ProfileDashboardservice';
import Pagination from '@mui/material/Pagination';
import { Backdrop, CircularProgress } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";

function SavedSearch() {
    const navigate = useNavigate();
    const [pageCount, setpageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(10);
    const [itemsPerPage, setitemsPerPage] = useState(5);
    const [startIndex, setstartIndex] = useState(0);
    const [recordsTotal, setrecordTotal] = useState(0);
    const [openLoader, setopenLoader] = React.useState(false);
    const [SavedSearchJobs, setSavedSearchJobs] = useState([]);
    const [searchRuleID, setsearchRuleID] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const { setValue, handleSubmit } = useForm();

    const [pages, setPage] = React.useState(1);
    const handleChange = (e, p) => {
        setPage(p);
    }
    const handleRecordPerPageChange = (value) => {
        let recordPage = parseInt(value);
        if (recordPage !== 0 && recordPage !== undefined) {
            setitemsPerPage(recordPage);
            initSavedSearchJob(0, recordPage);
            setPage(1);
        } else {

        }
    }
    const handleRenameSearch = (searchRuleID, searchName) => {
        parseInt(searchRuleID) ? setsearchRuleID(parseInt(searchRuleID)) : setsearchRuleID(0)
        handleShow();
        setTimeout(() => {
            document.getElementById("renameSearch").value = searchName;
        }, 200);
    }
    const handleRenameSearchSubmit = async () => {
        setopenLoader(true);
        let searchname = document.getElementById('renameSearch').value;
        const res = await ProfileDashboardService.renameSearch(searchRuleID, searchname);
        if (res.isSuccess) {
            handleClose();
            initSavedSearchJob();
            document.getElementById('renameSearch').value = "";
            ShowAlert(1, res.message);
            setopenLoader(false);
        } else {
            handleClose();
            ShowAlert(0, res.message);
            setopenLoader(false);
            document.getElementById('renameSearch').value = "";
        }
        setopenLoader(false);
    }
    const initSavedSearchJob = async () => {
        setopenLoader(true);
        try {
            if (SavedSearchJobs.length === 0) {
                document.getElementById("noRecord").style.display = "none";
            }
            const searchJobList = await ProfileDashboardService.getSearchJobs(pages, itemsPerPage);
            if (searchJobList.isSuccess) {
                setrecordTotal(searchJobList.recordCount);
                setpageCount(Math.ceil(searchJobList.recordCount / itemsPerPage));
                setSavedSearchJobs(JSON.parse(searchJobList.apiData));
            }
            setopenLoader(false);
            document.getElementById("noRecord").style.display = "flex";
        } catch (error) {
            setopenLoader(false);
        }
        setopenLoader(false);
    }
    const handleDeleteSearch = async (searchRuleID) => {
        if (parseInt(searchRuleID) !== 0) {
            setopenLoader(true);
            const res = await ProfileDashboardService.deleteCanSavedSearchJob(searchRuleID);
            if (res.isSuccess) {
                initSavedSearchJob();
                ShowAlert(1, res.message);
                setopenLoader(false);
            } else {
                ShowAlert(0, res.message);
                setopenLoader(false);
            }
        }
        setopenLoader(false);
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
    useEffect(() => {
        window.scrollTo(0, 0);
        if (AuthService.isAuthenticatedUser()) {
            initSavedSearchJob();
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
            <Modal
                show={show}
                centered
                onHide={handleClose}
                animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Rename Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(handleRenameSearchSubmit)}>
                        <div className="row">
                            <div className="col-12 form-group m-0">
                                <label for="" className="form-label">Search Name</label>
                                <input type="text" className="form-control" placeholder="Rename" id='renameSearch' name='searchName' />
                            </div>
                        </div><br />
                        <button type="submit" className="btn btn-primary" style={{ float: "right" }} >Submit</button>
                    </form>
                </Modal.Body>


            </Modal>
            <div className="card card-table shadow-sm mt-4">
                {
                    recordsTotal != 0 ?
                        <div className="card-header">
                            <h4 className="card-title">Search Keywords</h4>
                        </div> : null
                }
                <div className="card-body p-0 ">
                    {
                        recordsTotal > 0 ? <>
                            <div className="table-responsive">
                                <table className="table m-0">

                                    <tbody>
                                        {SavedSearchJobs.map((row, i) =>
                                            <tr className="" key={i} value={row.CandidateSearchRuleID}>
                                                <td width="40%">{row.CandidateSearchRuleName}</td>
                                                <td width="40%"><a onClick={() => handleRenameSearch(row.CandidateSearchRuleID, row.CandidateSearchRuleName)} style={{ cursor: "pointer", color: "#FF5C35" }}>Rename Keyword</a></td>
                                                <td><div className="buttons">
                                                    <button className="btn btn-link"><i className='bx bx-edit' ></i></button>
                                                    <button className="btn btn-link text-success"><i className='bx bxs-search' ></i></button>
                                                    <button className="btn btn-link" onClick={() => handleDeleteSearch(row.CandidateSearchRuleID)}><i className='bx bxs-trash-alt' ></i></button>
                                                </div></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
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
                                    Record(s) Total: {recordsTotal}
                                </div>
                            </div>
                        </>
                            :
                            <div className="no-data-found" id='noRecord'>
                                <img src={noData} alt="" />
                                <p>You don't have saved any job search.</p>
                            </div>
                    }

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

export default SavedSearch