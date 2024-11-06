import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import Select from 'react-select';
import { Deblur } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from "react-router-dom";
import '../../../assets/css/styles.css';
import { CommonService } from "../../../Services/CommonService";
import { ProfileService } from "../../../Services/Profile/ProfileService";
import { CandidateRegService } from "../../../Services/CanRegistration/CandidateRegService";
import { useTranslation } from 'react-i18next';
import noData from "../../../assets/imgs/Education.jpg";

function RegisterEducation({ candidateID, TriggerCallBackResponse, LoginProcess }) {
    const { t } = useTranslation();
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
    const navigate = useNavigate();
    const search = useLocation().search;
    const { register, setValue, clearErrors, watch, formState: { errors }, handleSubmit } = useForm();
    const [show, setshow] = useState(false);
    const openModal = () => setshow(true);
    const [iEducationData, setiEducationData] = useState([]);
    const [qualificationList, setQualificationList] = useState([]);
    const [qualificationSpecializationList, setQualificationSpecializationList] = useState([]);
    const [instituteList, setInstituteList] = useState([]);
    const [selectedOptionForInstitute, setSelectedOptionForInstitute] = useState([]);
    const [selectedOptionForQualification, setSelectedOptionForQualification] = useState([]);
    const [selectedOptionForQualificationSp, setSelectedOptionForQualificationSp] = useState([]);
    const [passingYear, setPassingYear] = useState(0);
    const [editQualificationID, seteditQualificationID] = useState("");
    const [qItems, setqItems] = useState([]);
    const CurrentYear = new Date().getFullYear();
    //error constants
    const [hasQualificationShowError, sethasQualificationShowError] = useState(false);
    const [hasQualificationSpecializationShowError, sethasQualificationSpecializationShowError] = useState(false);
    const [hasPassingYearShowError, sethasPassingYearShowError] = useState(false);
    const [hasPassingYearShowErr, sethasPassingYearShowErr] = useState(false);
    const [openLoader, setopenLoader] = useState(false);

    const handleClose = () => {
        setshow(false);
        clearFieldErrors();
    }
    const clearFieldErrors = () => {
        setValue("ID", 0);
        setSelectedOptionForQualification([]);
        setSelectedOptionForQualificationSp([]);
        setSelectedOptionForInstitute([]);
        setValue("yearofpassing", "");
        sethasQualificationShowError(false);
        sethasQualificationSpecializationShowError(false);
        sethasPassingYearShowError(false);
        sethasPassingYearShowErr(false);
    }
    const addQualification = () => {
        clearFieldErrors();
        openModal();
    }
    const handleonclickQualification = (selectedOption) => {
        if (selectedOption) {
            setSelectedOptionForQualification(selectedOption);
            setSelectedOptionForQualificationSp([]);
            getQualificationSpecializationList(selectedOption.value);
            sethasQualificationShowError(false);
        } else {
            setSelectedOptionForQualification([]);
            setQualificationSpecializationList([]);
            setSelectedOptionForQualificationSp([]);
            sethasQualificationShowError(true);
        }
    }
    const getQualificationSpecializationList = async (qualificationId) => {
        const getQSpecializations = await CommonService.getQualificationSpecializationList(qualificationId);
        setQualificationSpecializationList(getQSpecializations);
    }
    const handleonclickQualificationSpecialization = (selectedOption) => {
        if (selectedOption) {
            setSelectedOptionForQualificationSp(selectedOption);
            sethasQualificationSpecializationShowError(false);
        } else {
            setSelectedOptionForQualificationSp([]);
            sethasQualificationSpecializationShowError(true);
        }
    }
    const handleStep4Submit = async () => {
        let errCount = 0;

        let qualification = selectedOptionForQualification;
        let qualificationid = qualification.value;
        let qualificationtext = qualification.label;

        let qualificationSpecialization = selectedOptionForQualificationSp;
        let qualificationSpecializationid = qualificationSpecialization.value;
        let qualificationSpecializationText = qualificationSpecialization.label;

        if (qualificationid === null || qualificationid === undefined || qualificationid === "") {
            sethasQualificationShowError(true);
            errCount += 1;
        } else {
            sethasQualificationShowError(false);
        }
        if (qualificationSpecializationid === null || qualificationSpecializationid === undefined || qualificationSpecializationid === "") {
            sethasQualificationSpecializationShowError(true);
            errCount += 1;
        } else {
            sethasQualificationSpecializationShowError(false);
        }
        if (errCount > 0) {
            return false;
        }
        let institutes = selectedOptionForInstitute;
        let institutesid = 0;
        let institutesText = "";
        if (institutes !== "" && institutes !== null && institutes !== undefined) {
            institutesid = institutes.value;
            institutesText = institutes.label;
        }
        let yearofpassingValue = document.getElementById("yearpassing").value;

        let maxID = 0;
        let ID = parseInt(document.getElementById("ID").value === "" ? 0 : document.getElementById("ID").value);
        if (qItems.length > 0) {
            const ids = qItems.map(obj => {
                return obj.id;
            });
            maxID = Math.max(...ids);
        }
        let profData = [];
        //check if qual  exist
        let exist = false;
        let msg = "";
        if (qItems.length > 0) {
            qItems.filter(function (q) {
                if (ID !== q.id) {
                    if (q.qualID === qualificationid) {
                        msg = "qualification already exist";
                        exist = true;
                        return false;
                    }
                }
            });
        }
        if (exist) {
            ShowAlert(0, msg);
            return false;
        }
        profData.push({
            id: ID === 0 ? maxID + 1 : ID,
            qual: qualificationtext,
            qualID: qualificationid,
            spec: qualificationSpecializationText,
            specID: qualificationSpecializationid,
            insti: institutesid === "" ? "" : institutesText,
            instiID: institutesid,
            year: yearofpassingValue
        })
        const pData = qItems;
        pData.filter(function (data) {
            if (data.id !== profData[0].id) {
                profData.push({
                    id: data.id,
                    qual: data.qual,
                    qualID: data.qualID,
                    spec: data.spec,
                    specID: data.specID,
                    insti: data.insti === "" ? "" : data.insti,
                    instiID: data.instiID,
                    year: data.year
                })
            }
        })
        setqItems([]);
        setshow(false);
        setqItems(profData);
    }
    const handleEditorDeleteQual = async (id, isDelete) => {
        setopenLoader(true);
        if (!isDelete) {
            seteditQualificationID(id);
            sethasQualificationShowError(false);
            sethasQualificationSpecializationShowError(false);
            for (let i = 0; i < qItems.length; i++) {
                if (qItems[i].id === id) {
                    getQualificationSpecializationList(qItems[i].qualID);
                    setTimeout(() => {
                        document.getElementById("ID").value = qItems[i].id.toString();
                        setSelectedOptionForQualification({ value: qItems[i].qualID, label: qItems[i].qual })
                        setSelectedOptionForQualificationSp({ value: qItems[i].specID, label: qItems[i].spec })
                        setSelectedOptionForInstitute({ value: qItems[i].instiID, label: qItems[i].insti })
                        document.getElementById("yearpassing").value = qItems[i].year.toString();

                    }, 700);
                }
            }
            setshow(true);
            setopenLoader(false);
        } else {
            let tmpData = [];
            for (let i = 0; i < qItems.length; i++) {
                if (qItems[i].id !== id) {
                    tmpData.push(qItems[i]);
                }
            }
            setqItems(tmpData);
            setopenLoader(false);
        }
        setopenLoader(false);
    }
    const handleSubmitContinue = async () => {
        let qualXML = "";
        if (qItems.length > 0) {
            qualXML += "<Qual>";
            for (let i = 0; i < qItems.length; i++) {
                qualXML += "<QualDetails>";
                qualXML += "<QualID>";
                qualXML += parseInt(qItems[i].qualID)
                qualXML += "</QualID>";
                qualXML += "<SpID>";
                qualXML += parseInt(qItems[i].specID)
                qualXML += "</SpID>";
                if (!IsNullOrEmpty(qItems[i].instiID)) {
                    qualXML += "<InstituteID>" + parseInt(qItems[i].instiID) + "</InstituteID>";
                } else {
                    qualXML += "<InstituteID></InstituteID>";
                }
                if (!IsNullOrEmpty(qItems[i].year)) {
                    qualXML += "<PassYear>" + parseInt(qItems[i].year) + "</PassYear>";
                } else {
                    qualXML += "<PassYear></PassYear>";
                }
                qualXML += "</QualDetails>";
            }
            qualXML += "</Qual>";
        }
        try {
            if (!IsNullOrEmpty(qualXML)) {
                setopenLoader(true);
                const res = await CandidateRegService.save_Registration_Step4(candidateID.toString(), qualXML);
                setopenLoader(false);
                if (res.isSuccess) {
                    TriggerCallBackResponse(5, candidateID, LoginProcess)
                } else {
                    TriggerCallBackResponse(5, candidateID, LoginProcess)
                }
            } else {
                ShowAlert(0, "Please add qualification data");
            }
        } catch (error) {
            setopenLoader(false);
        }
    }
    const IsNullOrEmpty = (v) => {
        if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
            return true;
        } else {
            return false;
        }
    }
    const initQualificationlist = async () => {
        const qualification = await CommonService.getQualificationList();
        qualification ? setQualificationList(qualification) : setQualificationList({});
    }
    const initInstituteList = async () => {
        const institute = await CommonService.getInstituteList();
        institute ? setInstituteList(institute) : setInstituteList({});
    }
    const handleSelectInstitute = (selectedOption) => {
        if (!IsNullOrEmpty(selectedOption)) {
            setSelectedOptionForInstitute(selectedOption);
        }
        else {
            setSelectedOptionForInstitute([]);
        }
    }
    const handleEducationSkipClick = () => {
        TriggerCallBackResponse(5, candidateID, LoginProcess);
    }
    useEffect(() => {
        initQualificationlist();
        initInstituteList();
    }, [])
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
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>
                        {t("Add_Education_Details")}
                    </Modal.Title>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => handleClose()}></button>
                </Modal.Header>
                <Modal.Body>
                    <form method="POST" onSubmit={handleSubmit(handleStep4Submit)}>
                        <input type="hidden" name="ID" id="ID"
                            {...register("ID", {
                            })}
                        />
                        <div className="row">
                            <div className="col-12 form-group">
                                <label htmlFor="" className="form-label">{t("Qualification")}<span className="text-danger ">*</span></label>
                                <Select
                                    placeholder={t("Select")}
                                    onChange={handleonclickQualification}
                                    value={selectedOptionForQualification}
                                    options={qualificationList}
                                    isClearable
                                />
                                {hasQualificationShowError ? <p className='text-danger mt-1'>Please select qualification</p> : null}
                            </div>
                            <div className="col-12 form-group">
                                <label htmlFor="" className="form-label">{t("Qualification_Specialization")}<span className="text-danger ">*</span></label>
                                <Select
                                    placeholder={t("Select")}
                                    onChange={handleonclickQualificationSpecialization}
                                    value={selectedOptionForQualificationSp}
                                    options={qualificationSpecializationList}
                                    isClearable
                                />
                                {hasQualificationSpecializationShowError ? <p className='text-danger mt-1'>Please select specialization</p> : null}
                            </div>
                            <div className="col-12 form-group">
                                <label htmlFor="" className="form-label">{t("Institute_University")}</label>
                                <Select
                                    placeholder={t("Select")}
                                    onChange={handleSelectInstitute}
                                    value={selectedOptionForInstitute}
                                    options={instituteList}
                                    isClearable
                                />
                            </div>
                            <div className="col-12 form-group m-0">
                                <label htmlFor="" className="form-label">{t("Passing_Year")}</label>
                                <div className="input-group input-group-date datepicker date">
                                    <input type="number"
                                        className="form-control"
                                        placeholder={t("Passing_Year")}
                                        id='yearpassing'
                                        min={1980}
                                        max={CurrentYear}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <button type="button" className="btn btn-link" onClick={() => handleClose()}>{t("Close")}</button>
                            <button type="submit" className="btn-primary btn" style={{ float: "right" }}>{t("Submit")}</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <div className="card-body-header">
                <h2 className="card-title flex-fill">{t("Register_Heading")}</h2>
            </div>

            <ul className="stepper">
                <li className="completed"><a href="#"><i className='bx bxs-check-circle'></i>{t("General")}</a></li>
                <li className="completed"><a href="#"><i className='bx bxs-check-circle'></i>{t("Basic")}</a></li>
                <li className="completed"><a href="#"><i className='bx bxs-check-circle'></i>{t("Professional")}</a></li>
                <li className="active"><a href="#"><i className='bx bx-circle'></i>{t("Education")}</a></li>
                <li><a href="#"><i className='bx bx-circle'></i>{t("Personal")}</a></li>
            </ul>

            <div className="subtitle-container">
                <h5 className="card-sub-title">{t("Education_Details")}</h5>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => addQualification()}><i className='icon bx bx-plus'></i> {t("Add")}</button>
            </div>

            {/* <div className="professional-items">
                {
                    qItems.map((it, i) =>
                        <div className="professional-item" key={i}>
                            <div className="header">
                                <h5 className="title">{it.qual}({it.spec})</h5>
                                <div className="actions">
                                    <button className="btn btn-link" onClick={() => handleEditorDeleteQual(it.id, false)} ><i className='bx bxs-edit-alt'></i></button>
                                    <button className="btn btn-link" onClick={() => handleEditorDeleteQual(it.id, true)}><i className='bx bx-trash-alt'></i></button>
                                </div>
                            </div>
                            <div className="multiple-info">
                                {it.insti ? <div className="info">{t("Institute")}: <span>{it.insti}</span></div> : ""}
                                {it.year ? <div className="info">{t("Passing_Year")}: <span>{it.year}</span></div> : ""}
                            </div>
                        </div>
                    )
                }
            </div> */}
            {
                qItems.length > 0 ?
                    <table className='table table-striped' style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}>
                        <thead>
                            <tr>
                                <th>Qualification</th>
                                <th>Specialization</th>
                                <th>Institute/University</th>
                                <th>Passing Year</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {qItems.map((d, i) =>

                                <tr key={i} >
                                    <td>{d.qual}</td>
                                    <td>{d.spec}</td>
                                    <td>{d.insti}</td>
                                    <td>{d.year}</td>
                                    <td>
                                        {/* <button className="btn btn-link" onClick={() => handleEditorDeleteQual(it.id, false)} ><i className='bx bxs-edit-alt'></i></button> */}
                                        <button className="btn btn-link" onClick={() => handleEditorDeleteQual(d.id, true)}><i className='bx bx-trash-alt'></i></button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    : <div className="no-data-found" id="noRecord" style={{cursor:"pointer"}} onClick={() => addQualification()}>
                        <img src={noData} alt="" />
                        <p>Click On Add To Enter Your Education Details</p>
                    </div>
            }

            <div className="form-bottom-actions">
                <button type="button" className="btn-outline-primary btn" onClick={() => handleEducationSkipClick()}>{t("Skip")}</button>
                <button type="submit" className="btn-primary btn" onClick={() => handleSubmitContinue()}>{t("Next")}</button>
            </div>
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

export default RegisterEducation