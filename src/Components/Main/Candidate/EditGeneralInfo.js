import React, { useEffect, useState } from 'react'
import { AuthService } from '../../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ProfileService } from '../../../Services/Profile/ProfileService';
import Select from 'react-select';
import { CandidateRegService } from '../../../Services/CanRegistration/CandidateRegService';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function EditGeneralInfo({ generalData, triggerClick }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setValue, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    //set list Of Data  For Form
    const [openLoader, setopenLoader] = useState(false);
    const [specAreaList, setSpecAreaList] = useState([]);
    const [nationalityList, setnationalityList] = useState([]);
    const [locationsList, setLocationsList] = useState([]);
    //set list Of Data  For Form end
    // ----------------------------------------------------------------------------------------------------------------
    //set Value in form
    const [canName, setcanName] = useState("");
    const [selectedOptionForSpecAreaList, setSelectedOptionForSpecAreaList] = useState([]);
    const [locExpinYear, setlocExpinYear] = useState("");
    const [locExpinMonth, setlocExpinMonth] = useState("");
    const [overExpinYear, setoverExpinYear] = useState("");
    const [overExpinMonth, setoverExpinMonth] = useState("");
    const [selectedOptionForNationalityList, setSelectedOptionForNationalityList] = useState([]);
    const [selectedOptionForLocationsList, setSelectedOptionForLocationsList] = useState([]);
    //set Value in form end
    // -----------------------------------------------------------------------------------------------------------------
    //errormessage form validation
    const [nameFieldShowError, sethNameFieldShowError] = useState(false);
    const [positionFieldShowError, setPositionFieldShowError] = useState(false);
    const [locExpYrFieldShowError, setLocExpYrFieldShowError] = useState(false);
    const [locExpMoFieldShowError, setLocExpMoFieldShowError] = useState(false);
    const [oveExpYrFieldShowError, setOveExpYrFieldShowError] = useState(false);
    const [oveExpMoFieldShowError, setOveExpMoFieldShowError] = useState(false);
    const [nationalityFieldShowError, setNationalityFieldShowError] = useState(false);
    const [cuLocFieldShowError, setCuLocFieldShowError] = useState(false);
    //errormessage form validation End
    const handleLoaderClose = () => {
        setOpen(false);
    };
    const cancelClick = () => {
        triggerClick(0);
    };
    const IsNullOrEmpty = (v) => {
        if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
            return true;
        } else {
            return false;
        }
    };
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
    //get List Function
    const iniGeneralInfo = async () => {
        setopenLoader(true);
        const formData = JSON.parse(generalData);
        setopenLoader(false);
        try {
            if (formData) {
                if (formData.CandidateFirstName) {
                    setcanName(formData.CandidateFirstName);
                }
                else {
                    setcanName("");
                }
                if (formData.CandidateCurrentPosition) {
                    initSpecArea(formData.CandidateCurrentPosition);
                } else {
                    initSpecArea(0);
                }
                if (formData.CandidateDomExperienceYearsFrom) {
                    setlocExpinYear(parseInt(formData.CandidateDomExperienceYearsFrom));
                }
                else {
                    setlocExpinYear(0);
                }
                if (formData.CandidateDomExperienceMonths) {
                    setlocExpinMonth(parseInt(formData.CandidateDomExperienceMonths));
                }
                else {
                    setlocExpinMonth(0);
                }
                if (formData.CandidateExperienceYearsFrom) {
                    setoverExpinYear(parseInt(formData.CandidateExperienceYearsFrom))
                }
                else {
                    setoverExpinYear(0)
                }
                if (formData.CandidateExperienceMonths) {
                    setoverExpinMonth((parseInt(formData.CandidateExperienceMonths)))
                }
                else {
                    setoverExpinMonth(0)
                }
                if (parseInt(formData.CandidateNationality) > 0) {
                    initNationality(parseInt(formData.CandidateNationality));
                } else {
                    initNationality(0);
                }
                if (formData.LocationName > 0) {
                    initLocations(formData.LocationName);
                } else {
                    initLocations(0);
                }
            }
        }
        catch (error) {
        }
    };
    const initSpecArea = async (posName) => {
        try {
            const specArea = await CandidateRegService.get_FAS_DropdownList()
            let specAreaLists = JSON.parse(specArea.data);
            specAreaLists ? setSpecAreaList(specAreaLists) : setSpecAreaList([]);
            if (posName && specAreaLists) {
                specAreaLists.filter(function (f) {
                    if (f.label === posName) {
                        var position = { label: f.label, value: f.value };
                        setSelectedOptionForSpecAreaList(position);
                    }
                })
            }
        } catch (error) {

        }
    };
    const initNationality = async (nantionalID) => {
        try {
            const nationality = await ProfileService.getNationalityDropDownList();
            nationality ? setnationalityList(nationality) : setnationalityList([]);
            if (nantionalID > 0 && nationality) {
                nationality.filter(function (f) {
                    if (parseInt(f.value) === nantionalID) {
                        var national = { label: f.label, value: f.value };
                        setSelectedOptionForNationalityList(national);
                    }
                })
            }
        } catch (error) {

        }
    };
    const initLocations = async (locID) => {
        try {
            const loc = await ProfileService.getLocationList();
            loc ? setLocationsList(loc) : setLocationsList();
            if (locID > 0 && loc) {
                loc.filter(function (f) {
                    if (parseInt(f.value) === locID) {
                        var location = { label: f.label, value: f.value };
                        setSelectedOptionForLocationsList(location);
                    }
                })
            }
        } catch (error) {

        }
    };
    //get List Function end
    // -----------------------------------------------------------------------------------------------------------------
    // Onchange Event
    const handleNameChange = (val) => {
        if (!IsNullOrEmpty(val)) {
            val = val.replace(/[^a-zA-Z ]/g, "");
            // val = val.replace(/[^a-zA-Z_. ]/g, "");
            setcanName(val);
            sethNameFieldShowError(false);
        }
        else {
            setcanName("");
            sethNameFieldShowError(true);
        }
    };
    const handleSelectSpecAreaList = (selectedOption) => {
        if (!IsNullOrEmpty(selectedOption)) {
            setSelectedOptionForSpecAreaList(selectedOption);
            setPositionFieldShowError(false);
        } else {
            setSelectedOptionForSpecAreaList([]);
            setPositionFieldShowError(true);
        }
    };
    const handlelocExpinYearChange = (e) => {
        if (e.target.value) {
            let v = e.target.value.replace(/[^0-9]/g, '');
            v = v.replace(/[^0-9]/g, '');
            if (parseInt(v) > 35) {
                v = 35;
            }
            if (parseInt(v) <= 0) {
                v = 0;
            } 
            setlocExpinYear(v);
            setLocExpYrFieldShowError(false);
            // Calculate total months for local experience
            const totalLocalExperienceMonths = parseInt(v) * 12 + (locExpinMonth ? parseInt(locExpinMonth) : 0);
            if (totalLocalExperienceMonths > 35 * 12) {
                setlocExpinMonth(0);
                ShowAlert(0, "Local experience cannot exceed 35 years.");
            }
        }
        else {
            setlocExpinYear("");
            setLocExpYrFieldShowError(true);
        }
    };
    const handlelocExpinmonthChange = (e) => {
        if (!IsNullOrEmpty(e.target.value)) {
            let v = e.target.value.replace(/[^0-9]/g, '');
            v = v.replace(/[^0-9]/g, '');
            if (parseInt(v) > 11) {
                v = 11;
            }
            if (parseInt(v) <= 0) {
                v = "";
            }
            setlocExpinMonth(v);
        }
        else {
            setlocExpinMonth(0);
        }
    };
    const handleOverExpinYearChange = (e) => {
        if (e.target.value) {
            let v = e.target.value.replace(/[^0-9]/g, '');
            v = v.replace(/[^0-9]/g, '');
            if (parseInt(v) > 35) {
                v = 35;
            }
            if (parseInt(v) <= 0) {
                v = 0;
            }
            setoverExpinYear(v);
            setOveExpYrFieldShowError(false);
            // Calculate total months for local experience
            const totalLocalExperienceMonths = parseInt(v) * 12 + (overExpinMonth ? parseInt(overExpinMonth) : 0);
            if (totalLocalExperienceMonths > 35 * 12) {
                setoverExpinMonth(0);
                ShowAlert(0, "Overseas experience years cannot exceed 35.");
            }
        }
        else {
            setoverExpinYear("");
            setOveExpYrFieldShowError(true);
        }
    };
    const handleOverExpinmonthChange = (e) => {
        if (!IsNullOrEmpty(e.target.value)) {
            let v = e.target.value.replace(/[^0-9]/g, '');
            v = v.replace(/[^0-9]/g, '');
            if (parseInt(v) > 11) {
                v = 11;
            }
            if (parseInt(v) <= 0) {
                v = "";
            }
            setoverExpinMonth(v);
        }
        else {
            setoverExpinMonth(0);
        }
    };
    const handleSelectNationalityList = (selectedOption) => {
        if (!IsNullOrEmpty(selectedOption)) {
            setSelectedOptionForNationalityList(selectedOption);
            setNationalityFieldShowError(false);
        } else {
            setSelectedOptionForNationalityList([]);
            setNationalityFieldShowError(true);
        }
    };
    const handleSelectLocationsList = (selectedOption) => {
        if (!IsNullOrEmpty(selectedOption)) {
            setSelectedOptionForLocationsList(selectedOption);
            setCuLocFieldShowError(false);
        } else {
            setSelectedOptionForLocationsList([]);
            setCuLocFieldShowError(true);
        }
    };
    // Onchange Event end
    // -----------------------------------------------------------------------------------------------------------------
    //form Submit
    const handleSubmitGeneralInfo = async () => {
        setopenLoader(true);
        //set error count and validation
        let errCount = 0;
        if (canName === "" || canName === null || canName === undefined) {
            sethNameFieldShowError(true);
            errCount += 1;
        }
        else {
            sethNameFieldShowError(false);
            errCount += 0;
        }
        if (selectedOptionForSpecAreaList.label === "" || selectedOptionForSpecAreaList.label === null || selectedOptionForSpecAreaList.label === undefined) {
            setPositionFieldShowError(true);
            errCount += 1;
        }
        else {
            setPositionFieldShowError(false);
            errCount += 0;
        }
        if (locExpinYear === "" || locExpinYear === null || locExpinYear === undefined) {
            setLocExpYrFieldShowError(true);
            errCount += 1;
        }
        else {
            setLocExpYrFieldShowError(false);
            errCount += 0;
        }
        if (selectedOptionForNationalityList.value === "" || selectedOptionForNationalityList.value === null || selectedOptionForNationalityList.value === undefined || selectedOptionForNationalityList.value === 0) {
            setNationalityFieldShowError(true);
            errCount += 1;
        }
        else {
            setNationalityFieldShowError(false);
            errCount += 0;
        }
        if (selectedOptionForLocationsList.value === "" || selectedOptionForLocationsList.value === null || selectedOptionForLocationsList.value === undefined || selectedOptionForLocationsList.value === 0) {
            setCuLocFieldShowError(true);
            errCount += 1;
        }
        else {
            setCuLocFieldShowError(false);
            errCount += 0;
        }
        //set error count and validation end
        //Set Value For Submit
        let DomExpMonth = 0;
        if (locExpinMonth === "" || locExpinMonth === null || locExpinMonth === undefined) {
            DomExpMonth = 0;
        }
        else {
            DomExpMonth = locExpinMonth;
        }
        let overExpinYears = 0;
        if (overExpinYear === "" || overExpinYear === null || overExpinYear === undefined) {
            overExpinYears = 0;
        }
        else {
            overExpinYears = overExpinYear;
        }
        let overExpinMonths = 0;
        if (overExpinMonth === "" || overExpinMonth === null || overExpinMonth === undefined) {
            overExpinMonths = 0;
        }
        else {
            overExpinMonths = overExpinMonth;
        }
        let nationality = 0;
        if (selectedOptionForNationalityList) {
            if (selectedOptionForNationalityList.value === "" || selectedOptionForNationalityList.value === null || selectedOptionForNationalityList.value === undefined) {
                nationality = 0;
            }
            else {
                nationality = selectedOptionForNationalityList.value;
            }
        }
        let locations = 0;
        if (selectedOptionForLocationsList) {
            if (selectedOptionForLocationsList.value === "" || selectedOptionForLocationsList.value === null || selectedOptionForLocationsList.value === undefined) {
                locations = 0;
            }
            else {
                locations = selectedOptionForLocationsList.value;
            }
        }
        const totalLocalExperienceMonths = (parseInt(locExpinYear) * 12) + parseInt(locExpinMonth);
        const totalOverseasExperienceMonths = (parseInt(overExpinYear) * 12) + parseInt(overExpinMonth);
        const totalExperienceMonths = totalLocalExperienceMonths + totalOverseasExperienceMonths;
        if (totalExperienceMonths > 35 * 12) {
            ShowAlert(0, "Total experience cannot exceed 35 years.");
            setopenLoader(false);
            return; // Don't proceed with submission
        }
        //Set Value For Submit end
        const generalinfodata = {
            ReferenceID: AuthService.getCurrentUser().referenceID,
            Name: canName,
            Position: selectedOptionForSpecAreaList.label,
            DomExpYears: parseInt(locExpinYear),
            DomExpMonths: parseInt(DomExpMonth),
            OvsExpYears: parseInt(overExpinYears),
            OvsExpMonths: parseInt(overExpinMonths),
            Nationality: parseInt(nationality),
            Location: parseInt(locations),
        }
        try {
            setopenLoader(true);
            if (errCount === 0) {
                const res = await ProfileService.UpdateGeneralInfo(generalinfodata);
                if (res.isSuccess) {
                    ShowAlert(1, res.message);
                    triggerClick(1);
                } else {
                    ShowAlert(0, res.message);
                }
            }
            setopenLoader(false);
        } catch (error) {

        }
    }
    //form Submit end

    useEffect(() => {
        iniGeneralInfo();
        if (AuthService.isAuthenticatedUser()) {
            //iniGeneralInfo();
            setValue("loginID", AuthService.getCurrentUser().loginId)
        } else {
            navigate({
                pathname: '/login',
                search: "?ReturnUrl=/myprofile?type=editLogin",
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
            <form method="POST" onSubmit={handleSubmit(handleSubmitGeneralInfo)}>
                <h1 className="modal-title fs-5" id="generalInfoModalLabel">{t("Edit_General_Info")}</h1>
                <button type="button" className="btn-close" onClick={() => cancelClick()} aria-label="Close"></button>
                <br />

                <div className="row">
                    <div className="col-12 form-group">
                        <label htmlFor="" className="form-label">{t("Name")} </label>
                        <input type="text" className="form-control" placeholder={t("Full_Name")} maxLength={30} value={canName} onChange={(e) => handleNameChange(e.target.value)} />
                        {nameFieldShowError ? <p className='text-danger mt-1 small' style={{ fontStyle: "italic" }}>Please enter your name</p> : null}
                        {nameFieldShowError ? <p className='text-danger mt-1 small' style={{ fontStyle: "italic" }}>Enter alphabets only</p> : null}
                    </div>

                    <div className="col-12 form-group">
                        <label htmlFor="" className="form-label">{t("Position")}</label>
                        <Select
                            placeholder={t("Select")}
                            onChange={handleSelectSpecAreaList}
                            value={selectedOptionForSpecAreaList}
                            options={specAreaList}
                            isClearable
                        />
                        {positionFieldShowError ? <p className='text-danger mt-1 small' style={{ fontStyle: "italic" }}>Please select position</p> : null}
                    </div>
                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Domestic_Local_Exp")}</label>
                        <div className='row g-2'>
                            <div className='col-lg-6'>
                                <input type="text" className="form-control" placeholder="Year" value={locExpinYear}
                                    onChange={handlelocExpinYearChange} />
                            </div>
                            <div className='col-lg-6'>
                                <input type="text" className="form-control" placeholder="Month" value={locExpinMonth}
                                    onChange={handlelocExpinmonthChange} />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Overseas_Abroad_Exp")}</label>
                        <div className='row g-2'>
                            <div className='col-lg-6'>
                                <input type="text" className="form-control" placeholder="Year" value={overExpinYear}
                                    onChange={handleOverExpinYearChange} />
                            </div>
                            <div className='col-lg-6'>
                                <input type="text" className="form-control" placeholder="Month" value={overExpinMonth}
                                    onChange={handleOverExpinmonthChange} />
                            </div>
                        </div>
                        {/* <textarea name="" id="" className="form-control" placeholder="Overseas/Abroad Experience"></textarea> */}
                    </div>
                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Nationality")}</label>
                        <Select
                            className=""
                            placeholder={t("Select")}
                            onChange={handleSelectNationalityList}
                            value={selectedOptionForNationalityList}
                            options={nationalityList}
                            isClearable
                        />
                        {nationalityFieldShowError ? <p className='text-danger mt-1 small' style={{ fontStyle: "italic" }}>Please select nationality</p> : null}
                    </div>
                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Current_Location")}</label>
                        <Select
                            placeholder={t("Select")}
                            onChange={handleSelectLocationsList}
                            value={selectedOptionForLocationsList}
                            options={locationsList}
                            isClearable
                        />
                        {cuLocFieldShowError ? <p className='text-danger mt-1 small' style={{ fontStyle: "italic" }}>Please select location</p> : null}
                    </div>
                    <div >
                        <button type="button" className="btn btn-link" onClick={() => cancelClick()} >{t("Close")}</button>
                        <button type="submit" className="btn btn-primary" style={{ float: "right" }} >{t("Submit")}</button>
                    </div>

                </div>
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

export default EditGeneralInfo;