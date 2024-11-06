import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { AuthService } from '../../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import { ProfileService } from '../../../Services/Profile/ProfileService';
import { useLocation } from "react-router-dom";
import Select from 'react-select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function EditQualification({ triggerClick, qualData,data }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const CurrentYear = new Date().getFullYear();
    const search = useLocation().search;
    const { register, setValue, setError, clearErrors, watch, formState: { errors }, handleSubmit } = useForm();
    const [openLoader, setopenLoader] = React.useState(false);
    const handleLoaderClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setopenLoader(!openLoader);
    };
    const [QualificationDD, setQualificationDD] = useState([]);
    const [QualificationSpDD, setQualificationSpDD] = useState([]);
    const [qualDetailsSelectedValue, setqualDetailsSelectedValue] = useState([]);
    const [qualSpecDetailsSelectedValue, setqualSpecDetailsSelectedValue] = useState([]);
    const [InsituteDD, setInsituteDD] = useState([]);
    const [selectedOptionForInstituteList, setSelectedOptionForInstituteList] = useState([]);
    const [hasQualificationShowError, sethasQualificationShowError] = React.useState(false);
    const [hasQualificationSpecializationShowError, sethasQualificationSpecializationShowError] = React.useState(false);
    const [hasInstituteShowError, sethasInstituteShowError] = React.useState(false);
    const [isEdit, setisEdit] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (_, reason) => {
        if (reason !== "backdropClick") {
            setOpen(false);
        }
        setOpen(false);
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
    const style = {
        position: 'absolute',
        top: '50%',
        left: '53%',
        transform: 'translate(-50%, -50%)',
        width: "40rem",
        bgcolor: 'background.paper',
        boxShadow: 24,
        border: "none",
        p: 4,
    };
    const [Response, setResponse] = useState({
        Message: "",
        HasError: false,
        IsShowMsg: false
    });
    const cancelClick = () => {
        triggerClick(0);
    }
    const IsNullOrEmpty = (v) => {
        if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
            return true;
        } else {
            return false;
        }
    }
    const initInstituteList = async (insiID) => {
        const initInstituteList = await ProfileService.getInstituteDDList();
        setInsituteDD(initInstituteList);
        if (insiID > 0 && initInstituteList) {
            let reg = [];
            initInstituteList.filter(function (f) {
                if (parseInt(f.value) === insiID) {
                    reg.push({ label: f.label, value: f.value });
                }
            })
            setSelectedOptionForInstituteList(reg)
        }
    }

    const initQualificationList = async () => {
        const qualificationList = await ProfileService.getQualificationDDList();
        setQualificationDD(qualificationList);
    }
    const handleonclickQualification = (selectedOption) => {
        if (selectedOption) {
            setqualDetailsSelectedValue(selectedOption);
            getQualificationSpecializationList(selectedOption.value);
            setqualSpecDetailsSelectedValue(selectedOption.value);
            sethasQualificationShowError(false);
        } else {
            setqualDetailsSelectedValue([]);
            setqualSpecDetailsSelectedValue([]);
            sethasQualificationShowError(true);
            setQualificationSpDD([]);
        }
    }
    const getQualificationSpecializationList = async (qualificationId) => {
        const getQSpecializations = await ProfileService.getQualificationSpecializationDDList(qualificationId);
        getQSpecializations ? setQualificationSpDD(getQSpecializations) : setQualificationSpDD([]);
    }
    const handleonclickQualificationSpecialization = (selectedOption) => {
        if (selectedOption) {
            setqualSpecDetailsSelectedValue(selectedOption);
            sethasQualificationSpecializationShowError(false);
        } else {
            setqualSpecDetailsSelectedValue([]);
            setqualSpecDetailsSelectedValue(undefined);
            sethasQualificationSpecializationShowError(true);
        }
    }
    const handleSelectInstituteList = (selectedOption) => {
        if (!IsNullOrEmpty(selectedOption)) {
            setSelectedOptionForInstituteList(selectedOption);
        } else {
            setSelectedOptionForInstituteList([]);
        }
    }
    const handleQualificationSubmit = async () => {
        if (qualDetailsSelectedValue.value === "" || qualDetailsSelectedValue.value === null || qualDetailsSelectedValue.value === undefined || qualDetailsSelectedValue.value === 0) {
            sethasQualificationShowError(true);
        }
        else {
            sethasQualificationShowError(false);
        }
        if (qualSpecDetailsSelectedValue.value === "" || qualSpecDetailsSelectedValue.value === null || qualSpecDetailsSelectedValue.value === undefined || qualSpecDetailsSelectedValue.value === 0) {
            sethasQualificationSpecializationShowError(true);
        }
        else {
            sethasQualificationSpecializationShowError(false);
        }
        let yearofpassing = document.getElementById("yearofpassing").value;
        let candidateQualificationID = document.getElementById("CANResumeQualificationID").value;
        const formData = {
            ReferenceID: AuthService.getCurrentUser().referenceID,
            QualificationID: parseInt(qualDetailsSelectedValue.value),
            QualificationSpecializationID: parseInt(qualSpecDetailsSelectedValue.value),
            QualificationInsituteID: selectedOptionForInstituteList.value ? parseInt(selectedOptionForInstituteList.value) : 0,
            QualificationYearOfPassing: yearofpassing === "" ? 0 : parseInt(yearofpassing),
            CANResumeQualificationID:!IsNullOrEmpty(candidateQualificationID)?candidateQualificationID:"",
            IsEdit: isEdit
        }
        setopenLoader(true);
        if (data.filter(item => item.QualificationID == qualDetailsSelectedValue.value).length === 0) {
            try {
                const res = await ProfileService.saveOrUpdateQualification(formData);
                if (res.isSuccess) {
                    ShowAlert(1, res.message);
                    triggerClick(1);
                } else {
                    ShowAlert(0, res.message);
                }
            } catch (error) {
                ShowAlert(0, error.message)
                triggerClick(1);
            }
        } else {
            ShowAlert(0, "qualification already exist")
            triggerClick(1);
        }
        setopenLoader(false);
    }
    useEffect(() => {
        if (AuthService.isAuthenticatedUser()) {
            // initQualificationModalBind(qualData);
            initQualificationList();
            initInstituteList();
        } else {
            navigate({
                pathname: '/login',
                search: "?ReturnUrl=/editmyprofile?type=editqualification",
            });
        }

    }, []);
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
                onClick={handleLoaderClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <form method="POST" onSubmit={handleSubmit(handleQualificationSubmit)}>
                <input type="hidden" name="CANResumeQualificationID" id='CANResumeQualificationID' />
                <h1 className="modal-title fs-5" id="educationDetailsModalLabel">{t("Add_Education_Details")}</h1><br />
                <button type="button" className="btn-close" onClick={() => cancelClick()} aria-label="Close"></button>

                <div className="row">
                    <div className="col-12 form-group">
                        <label htmlFor="" className="form-label">{t("Qualification")}</label>
                        <Select
                            placeholder={t("Select")}
                            onChange={handleonclickQualification}
                            value={qualDetailsSelectedValue}
                            options={QualificationDD}
                            isClearable
                        />
                        {hasQualificationShowError ? <p className='text-danger mt-1 small' style={{ fontStyle: "italic" }}>Please select qualification</p> : null}
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="" className="form-label">{t("Qualification_Specialization")}</label>
                        <Select
                            placeholder={t("Select")}
                            onChange={handleonclickQualificationSpecialization}
                            value={qualSpecDetailsSelectedValue}
                            options={QualificationSpDD}
                            isClearable
                        />
                        {hasQualificationSpecializationShowError ? <p className='text-danger mt-1 small' style={{ fontStyle: "italic" }}>Please select specialization</p> : null}
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="" className="form-label">{t("Institute_University")}</label>
                        <Select
                            name='insitute'
                            placeholder={t("Select")}
                            onChange={handleSelectInstituteList}
                            value={selectedOptionForInstituteList}
                            options={InsituteDD}
                            isClearable
                        />
                    </div>


                    <div className="col-12 form-group m-0">
                        <label htmlFor="" className="form-label">{t("Passing_Year")}</label>
                        <div className="input-group input-group-date datepicker date">
                            <input
                                type='number'
                                className='form-control'
                                id='yearofpassing'
                                min={1940}
                                max={CurrentYear}
                            />
                        </div>
                    </div>
                </div>

                <br />
                <button type="button" className="btn btn-link" onClick={() => cancelClick()} data-bs-dismiss="modal">{t("Cancel")}</button>
                <button type="submit" style={{ float: "right" }} className="btn btn-primary">{t("Submit")}</button>
            </form>
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

export default EditQualification