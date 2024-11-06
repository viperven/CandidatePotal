import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { AuthService } from '../../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import { ProfileService } from '../../../Services/Profile/ProfileService';
import { CandidateRegService } from "../../../Services/CanRegistration/CandidateRegService";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function EditProfession({ triggerClick }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const TodayDate = new Date().toISOString().split('T')[0];
    const [year, month, day] = TodayDate.split('-');
    let mindate = ""
    if (day<=10){
        mindate = `${parseInt(year)}-${month}-0${parseInt(day)-1}`;
    } else {
        mindate = `${parseInt(year)}-${month}-${parseInt(day)-1}`;
    }
    const { register, setValue, setError, clearErrors, watch, formState: { errors }, handleSubmit } = useForm();
    const [open, setOpen] = React.useState(false);
    const [selectedOptionForTitle, setSelectedOptionForTitle] = useState([]);
    const [selectedOptionForLocation, setSelectedOptionForLocation] = useState([]);
    const [iJobLocationList, setiJobLocationList] = useState([]);
    const [iCurrentPOSList, setiCurrentPOSList] = useState([]);
    const [openLoader, setopenLoader] = React.useState(false);
    const [hasTitleShowError, sethasTitleShowError] = useState(false);
    const [hasLocationShowError, sethasLocationShowError] = useState(false);
    const handleLoaderClose = () => {
        setOpen(false);
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
    const handleSelectTitle = (selectedOption) => {
        if (!IsNullOrEmpty(selectedOption)) {
            setSelectedOptionForTitle(selectedOption);
            document.getElementById("idxTitleError").innerHTML = "";
        }
        else {
            setSelectedOptionForTitle([]);
            document.getElementById("idxTitleError").innerHTML = "Please select title";
        }
    }
    const handleSelectLocation = (selectedOption) => {
        if (!IsNullOrEmpty(selectedOption)) {
            setSelectedOptionForLocation(selectedOption);
            document.getElementById("idxLocationError").innerHTML = "";
        }
        else {
            setSelectedOptionForLocation([]);
            document.getElementById("idxLocationError").innerHTML = "Please select location";
        }
    }
    const checkDDValidation = () => {
        let errCount = 0;
        if (selectedOptionForTitle && selectedOptionForTitle.value) {
            document.getElementById("idxTitleError").innerHTML = "";
        } else {
            document.getElementById("idxTitleError").innerHTML = "Please select title";
            errCount += 1;
        }
        if (selectedOptionForLocation && selectedOptionForLocation.value) {
            document.getElementById("idxLocationError").innerHTML = "";
        } else {
            document.getElementById("idxLocationError").innerHTML = "Please select location";
            errCount += 1;
        }
        return errCount;
    }
    const submitClick = () => {
        checkDDValidation();
    }
    const handleprofessionSubmit = async (data) => {
        if (!IsNullOrEmpty(data.endDate)) {
            if (new Date(data.startDate) > new Date(data.endDate)) {
                ShowAlert(0, "End date must be greater than start date");
                return false;
            }
        }
        setopenLoader(true);
        const ddErrorCount = checkDDValidation();
        setResponse({
            IsShowMsg: false,
        });
        let XML = [];
        XML += "<Exp>";
        XML += "<ExpDetails>";
        XML += "<Company>";
        XML += data.company;
        XML += "</Company>";
        XML += "<LocationID>";
        XML += parseInt(selectedOptionForLocation.value);
        XML += "</LocationID>";
        XML += "<PositionID>";
        XML += parseInt(selectedOptionForTitle.value);
        XML += "</PositionID>";
        XML += "<StartDate>";
        XML += data.startDate;
        XML += "</StartDate>";
        XML += "<EndDate>";
        XML += data.endDate;
        XML += "</EndDate>";
        XML += "</ExpDetails>"
        XML += "</Exp>";
        const formData = {
            ReferenceID: AuthService.getCurrentUser().referenceID,
            ExperienceXML: XML,
        }
        if (ddErrorCount === 0) {
            try {
                const res = await ProfileService.saveProfessionalDetails(formData);
                if (res.isSuccess) {
                    ShowAlert(1, res.message);
                    triggerClick(1);
                } else {
                    ShowAlert(0, res.message);
                }
            } catch (error) {
                ShowAlert(0, error.message);
            }
        }
        setopenLoader(false);
    }
    const initJobLocationList = async () => {
        const loc = await ProfileService.getLocationList();
        loc ? setiJobLocationList(loc) : setiJobLocationList([]);
    }
    const initCurrentPositionList = async () => {
        const pos = await CandidateRegService.get_FAS_DropdownList();
        if (pos.isSuccess) {
            setiCurrentPOSList(JSON.parse(pos.data));
        }
    }

    useEffect(() => {
        initJobLocationList();
        initCurrentPositionList();
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
            <form method="POST" onSubmit={handleSubmit(handleprofessionSubmit)}>
                <h1 className="modal-title fs-5" id="professionalDetailsModalLabel">{t("Add_Professional_Dtails")}</h1><br />
                <button type="button" className="btn-close" onClick={() => cancelClick()} data-bs-dismiss="modal" aria-label="Close"></button>
                <div className="row">
                    <div className="col-12 form-group">
                        <label htmlFor="" className="form-label">{t("Title")}</label>
                        <Select
                            placeholder={t("Select")}
                            onChange={handleSelectTitle}
                            value={selectedOptionForTitle}
                            options={iCurrentPOSList}
                            isClearable
                        />
                        <span className="text-danger f13" id="idxTitleError"></span>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="" className="form-label">{t("Company")}</label>
                        <input type="text" className="form-control" placeholder={t("Company_Placeholder")} name="company" maxLength={100}
                            {...register("company",
                                {
                                    required: true,
                                })
                            }
                        />
                        {errors.company?.type === 'required' && <p className='text-danger mt-1'>Please enter company</p>}
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="" className="form-label">{t("Location")}</label>
                        <Select
                            placeholder={t("Select")}
                            onChange={handleSelectLocation}
                            value={selectedOptionForLocation}
                            options={iJobLocationList}
                            isClearable
                        />
                        <span className="text-danger f13" id="idxLocationError"></span>
                    </div>
                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Joining Date of above Company")}</label>
                        <div className="input-group input-group-date datepicker date">
                            <input type="date" className="form-control" name="startDate" max={mindate}

                                {...register("startDate",
                                    {
                                        // required: true,
                                    })
                                }
                            />
                        </div>
                        {errors.startDate?.type === 'required' && <p className='text-danger mt-1'>Please select start date</p>}

                    </div>
                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Working Till")}</label>
                        <div className="input-group input-group-date datepicker date">
                            <input type="date" className="form-control" name="endDate" max={TodayDate}

                                {...register("endDate",
                                    {
                                    })
                                }
                            />
                        </div>
                    </div>


                </div>

                <button type="button" className="btn btn-link" onClick={() => cancelClick()}>{t("Cancel")}</button>
                <button type="submit" style={{ float: "right" }} onClick={() => submitClick()} className="btn btn-primary">{t("Submit")}</button>
            </form >
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

export default EditProfession