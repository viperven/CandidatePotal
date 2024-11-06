import React, { useEffect, useState } from 'react'
import { AuthService } from '../../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ProfileService } from '../../../Services/Profile/ProfileService';
import Select from 'react-select';
import { CandidateRegService } from '../../../Services/CanRegistration/CandidateRegService';
import { CommonService } from '../../../Services/CommonService';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function EditBasicDetails({ basicData, triggerClick }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { register, setValue, formState: { errors }, handleSubmit } = useForm();
    const [message, setmessage] = useState("");
    const [openLoader, setopenLoader] = React.useState(false);
    const [noticePeriodList, setNoticePeriodList] = useState([]);
    const [locationList, setlocationList] = useState([]);
    const [industryList, setIndustryList] = useState([]);
    const [selectedLocations, setselectedLocations] = useState([]);
    console.log("selectedLocations",selectedLocations)
    const [selectedOptionForIndustryList, setSelectedOptionForIndustryList] = useState([]);
    const [selectedNoticePeriod, setSelectedNoticePeriod] = useState([]);
    const [selectedOptionForCurrentSalaryList, setSelectedOptionForCurrentSalaryList] = useState([]);
    const [selectedOptionForExpectedSalaryList, setSelectedOptionForExpectedSalaryList] = useState([]);
    const [currencyDD, setCurrencyDD] = useState([]);
    const [errorCurrentSalaryCurrency, setErrorCurrentSalaryCurrency] = useState(false);
    const [currentSalaryError, setCurrentSalaryError] = useState(false);
    const [errorexpectedSalaryCurrency, seterrorexpectedSalaryCurrency] = useState(false);
    const [expectedSalaryError, setExpectedSalaryError] = useState(false);
    const cancelClick = () => {
        triggerClick(0);
    }
    const handleLoaderClose = () => {
        // setOpen(false);
    };
    const [Response, setResponse] = useState({
        Message: "",
        HasError: false,
        IsShowMsg: false
    });
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
    const initCurrency = async () => {
        const cu = await CommonService.getCurrencyDropdown();
        var currency = (JSON.parse(cu.apiData));
        currency ? setCurrencyDD(currency) : setCurrencyDD([]);
    }
    const getBasicDetails = async (basicData) => {
        const loc = await ProfileService.getCountryList();
        loc ? setlocationList(loc) : setlocationList([]);
        const formData = JSON.parse(basicData);
        const cu = await CommonService.getCurrencyDropdown();
        var currency = (JSON.parse(cu.apiData));
        try {
            if (formData) {
                currency.filter(function (f) {
                    if (parseInt(f.value) === formData.CandidateCurrentAnnualSalaryCurrencyID) {
                        var currencies = { label: f.label, value: f.value };
                        setSelectedOptionForCurrentSalaryList(currencies);
                    }
                    if (parseInt(f.value) === formData.CandidateExpectedAnnualSalaryCurrencyID) {
                        var expcurrencies = { label: f.label, value: f.value };
                        setSelectedOptionForExpectedSalaryList(expcurrencies);
                    }
                })
                setValue("currentSalary", formData.CurrentSalary);
                setValue("expectedSalary", formData.ExpSalary);
                if (formData.IndustryID > 0) {
                    initIndustry(formData.IndustryID);
                } else {
                    initIndustry(0);
                }
                if (formData.NotcPeriod > 0) {
                    initNoticePeriod(formData.NotcPeriod);
                } else {
                    initNoticePeriod(0);
                }
                const location = JSON.parse(formData.Locations)
                let locSelected = [];
                if (location.length > 0) {
                    location.filter(function (filter) {
                        locSelected.push({ label: filter.LocationName, value: filter.LocationID });
                    })
                    setselectedLocations(locSelected)
                }
            }
        }
        catch (error) {
        }
    }
    const initIndustry = async (indId) => {
        const industry = await CommonService.getIndustryList();
        industry ? setIndustryList(industry) : setIndustryList([]);
        if (indId > 0 && industry) {
            industry.filter(function (f) {
                if (parseInt(f.value) === indId) {
                    var reg = { label: f.label, value: f.value };
                    setSelectedOptionForIndustryList(reg);
                }
            })
        }
    }
    const initNoticePeriod = async (notID) => {
        const noticePeriod = await CandidateRegService.get_NoticePeriod_DropdownList();
        let notice = JSON.parse(noticePeriod.data);
        notice ? setNoticePeriodList(notice) : setNoticePeriodList([]);
        if (notID > 0 && notice) {
            notice.filter(function (f) {
                if (parseInt(f.value) === notID) {
                    var notIDs = { label: f.label, value: f.value };
                    setSelectedNoticePeriod(notIDs);
                }
            })
        }
    }
    const handleLocationChange = (selectedOptions) => {
        console.log("selectedOptions",selectedOptions)
        if (selectedOptions.length <= 5) {
            setselectedLocations(selectedOptions);
        }
        // setselectedLocations(selectedOptions)
    }
    const handleSelectNoticePeriod = (selectedOption) => {
        if (!IsNullOrEmpty(selectedOption)) {
            setSelectedNoticePeriod(selectedOption);
        } else {
            setSelectedNoticePeriod([]);
        }
    }
    const handleSelectIndustryList = (selectedOption) => {
        if (!IsNullOrEmpty(selectedOption)) {
            setSelectedOptionForIndustryList(selectedOption);
        } else {
            setSelectedOptionForIndustryList([]);
        }
    }
    const handleSelectCurrentSalary = (selectedOption) => {
        if (selectedOption) {
            setSelectedOptionForCurrentSalaryList(selectedOption);
            setErrorCurrentSalaryCurrency(false);
            let val = document.getElementById("currentsalary").value;
            if (!IsNullOrEmpty(val)) {
                setCurrentSalaryError(false);
            } else {
                setCurrentSalaryError(true);
            }
        }
        else {
            setSelectedOptionForCurrentSalaryList([]);
            let val = document.getElementById("currentsalary").value;
            if (!IsNullOrEmpty(val)) {
                setErrorCurrentSalaryCurrency(true);
            } else {
                setErrorCurrentSalaryCurrency(false);
                setCurrentSalaryError(false);
            }
        }
    }

    const handleCurentSalary = (val) => {       
        if (!IsNullOrEmpty(val)) {
            val = val.replace(/[^0-9]/g, '');
            setValue("currentSalary", val)
            document.getElementById("currentsalary").value = val;
            setCurrentSalaryError(false);
            if (selectedOptionForCurrentSalaryList.value) {
                setErrorCurrentSalaryCurrency(false);
            } else {
                setErrorCurrentSalaryCurrency(true);
            }
        } else {
            if (selectedOptionForCurrentSalaryList.value) {
                setCurrentSalaryError(true);
            } else {
                setErrorCurrentSalaryCurrency(false);
                setCurrentSalaryError(false);
            }
        }
    }

    const handleSelectExpectedSalary = (selectedOption) => {
        if (selectedOption) {
            setSelectedOptionForExpectedSalaryList(selectedOption);
            seterrorexpectedSalaryCurrency(false);
            let val = document.getElementById("expectedSalary").value;
            if (!IsNullOrEmpty(val)) {
                setExpectedSalaryError(false);
            } else {
                setExpectedSalaryError(true);
            }
        }
        else {
            setSelectedOptionForExpectedSalaryList([]);
            let val = document.getElementById("expectedSalary").value;
            if (!IsNullOrEmpty(val)) {
                seterrorexpectedSalaryCurrency(true);
            } else {
                seterrorexpectedSalaryCurrency(false);
                setExpectedSalaryError(false);
            }
        }
    }
    const handleExpectedSalary = (val) => {
        if (!IsNullOrEmpty(val)) {
            val = val.replace(/[^0-9]/g, '');
            document.getElementById("expectedSalary").value = val;
            setValue("expectedSalary", val)
            setExpectedSalaryError(false);
            if (selectedOptionForExpectedSalaryList.value) {
                seterrorexpectedSalaryCurrency(false);
            } else {
                seterrorexpectedSalaryCurrency(true);
            }
        } else {
            if (selectedOptionForExpectedSalaryList.value) {
                setExpectedSalaryError(true);
            } else {
                seterrorexpectedSalaryCurrency(false);
                setExpectedSalaryError(false);
            }
        }
    }


    const handleBasicDetailsSubmit = async (data) => {
        console.log(data.currentSalary);

        let currSalary = 0;
        let currentSalarycurrencyID = 0;
        let expSalary = 0;
        let expectedSalarycurrencyID = 0;
        let notPeriod = 0;
        let ind = 0;
        let location = [];
        let locXML = "";
        if (selectedOptionForCurrentSalaryList) {
            if (selectedOptionForCurrentSalaryList.value === "" || selectedOptionForCurrentSalaryList.value === 0 || selectedOptionForCurrentSalaryList.value === undefined || selectedOptionForCurrentSalaryList.value === null) {
                currentSalarycurrencyID = 0;
            }
            else {
                currentSalarycurrencyID = selectedOptionForCurrentSalaryList.value;
            }
        }
        if (data.currentSalary) {
            currSalary = parseInt(data.currentSalary)
        }
        else {
            currSalary = 0;
        }
        if (selectedOptionForExpectedSalaryList) {
            if (selectedOptionForExpectedSalaryList.value === "" || selectedOptionForExpectedSalaryList.value === 0 || selectedOptionForExpectedSalaryList.value === undefined || selectedOptionForExpectedSalaryList.value === null) {
                expectedSalarycurrencyID = 0;
            }
            else {
                expectedSalarycurrencyID = selectedOptionForExpectedSalaryList.value;
            }
        }
        if (data.expectedSalary) {
            expSalary = parseInt(data.expectedSalary)
        }
        else {
            expSalary = 0;
        }
        //error count for expected salary
        let errCount = 0;
        if (expectedSalarycurrencyID === 0 && expSalary != 0) {
            errCount += 1
            seterrorexpectedSalaryCurrency(true);
            setExpectedSalaryError(false);
        } else if (expectedSalarycurrencyID != 0 && expSalary === 0) {
            errCount += 1
            setExpectedSalaryError(true);
            seterrorexpectedSalaryCurrency(false);
        } else {
            errCount += 0;
            setExpectedSalaryError(false);
            seterrorexpectedSalaryCurrency(false);
        }
        //error count for expected salary end
        //error count for current salary
        if (currentSalarycurrencyID === 0 && currSalary != 0) {
            errCount += 1
            setErrorCurrentSalaryCurrency(true);
            setCurrentSalaryError(false);
        } else if (currentSalarycurrencyID != 0 && currSalary === 0) {
            errCount += 1
            setCurrentSalaryError(true);
            setErrorCurrentSalaryCurrency(false);
        } else {
            errCount += 0;
            setCurrentSalaryError(false);
            setErrorCurrentSalaryCurrency(false);
        }
        //error count for current salary end
        if (selectedNoticePeriod.value === "" || selectedNoticePeriod.value === 0 || selectedNoticePeriod.value === undefined || selectedNoticePeriod.value === null) {
            notPeriod = 0;
        }
        else {
            notPeriod = selectedNoticePeriod.value;
        }

        if (selectedOptionForIndustryList.value === "" || selectedOptionForIndustryList.value === 0 || selectedOptionForIndustryList.value === undefined || selectedNoticePeriod.value === null) {
            ind = 0;
        }
        else {
            ind = selectedOptionForIndustryList.value;
        }
        if (selectedLocations) {
            for (let i = 0; i < selectedLocations.length; i++) {
                const element = selectedLocations[i].value;
                location.push(element);
            }
            if (location) {
                if (location.length > 0) {
                    locXML += "<Loc>";
                    for (let i = 0; i < location.length; i++) {
                        locXML += "<LocDetails>";
                        locXML += "<LocID>";
                        locXML += parseInt(location[i]);
                        locXML += "</LocID>";
                        locXML += "</LocDetails>"
                    }
                    locXML += "</Loc>";
                }
            }
        }
        else {
            locXML = "";
        }

        const basicDetailsData = {
            ReferenceID: AuthService.getCurrentUser().referenceID,
            CurrentSalary: parseInt(currSalary),
            CurrentSalaryCurrencyID: parseInt(currentSalarycurrencyID),
            ExpectedSalary: parseInt(expSalary),
            ExpectedSalaryCurrencyID: parseInt(expectedSalarycurrencyID),
            NoticePeriod: parseInt(notPeriod),
            Industry: parseInt(ind),
            PreferredLocationXML: locXML
        }
        if (errCount === 0) {
            try {
                setopenLoader(true);
                const res = await ProfileService.saveBasicDetails(basicDetailsData);
                if (res.isSuccess) {
                    ShowAlert(1, res.message);
                    triggerClick(1);
                }
                setopenLoader(false);
            } catch (error) {
                ShowAlert(0, error.message);
                setopenLoader(false);
            }
        } else {

        }

    }

    useEffect(() => {
        if (AuthService.isAuthenticatedUser()) {
            getBasicDetails(basicData);
            initNoticePeriod();
            initCurrency();
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
            <form method="POST" onSubmit={handleSubmit(handleBasicDetailsSubmit)}>
                <h1 className="modal-title fs-5" id="basicDetailsModalLabel">{t("Edit_Basic_Details")}</h1> <br />
                <button type="button" className="btn-close" onClick={() => cancelClick()} aria-label="Close"></button>
                <div className="row">
                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Current_Salary")}</label>
                        <div className='row g-2'>
                            <div className='col-lg-6'>
                                <Select
                                    placeholder={"---Salary in---"}
                                    onChange={handleSelectCurrentSalary}
                                    value={selectedOptionForCurrentSalaryList}
                                    options={currencyDD}
                                    isClearable
                                />
                                {errorCurrentSalaryCurrency ? <p className='text-danger small mt-1' style={{ fontStyle: "italic" }}>please select currency</p> : null}
                            </div>
                            <div className='col-lg-6'>
                                <input type="text" className="form-control" placeholder={t("Salary")} id='currentsalary' maxLength={7}
                                    {...register("currentSalary", {})}
                                    onChange={(e) => handleCurentSalary(e.target.value)}

                                />
                                {currentSalaryError ? <p className='text-danger small mt-1' style={{ fontStyle: "italic" }}>please provide current salary</p> : null}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Expected_Salary")}</label>
                        <div className='row g-2'>
                            <div className='col-lg-6'>
                                <Select
                                    placeholder={"---Salary in---"}
                                    onChange={handleSelectExpectedSalary}
                                    value={selectedOptionForExpectedSalaryList}
                                    options={currencyDD}
                                    isClearable
                                />
                                {errorexpectedSalaryCurrency ? <p className='text-danger small mt-1' style={{ fontStyle: "italic" }}>please select currency</p> : null}
                            </div>
                            <div className='col-lg-6'>
                                <input type="text" className="form-control" placeholder={t("Salary")} id='expectedSalary' maxLength={7}
                                    {...register("expectedSalary", {})}
                                    onChange={(e) => handleExpectedSalary(e.target.value)}
                                />
                                {expectedSalaryError ? <p className='text-danger small' style={{ fontStyle: "italic" }}>please  provide expected salary</p> : null}
                            </div>
                        </div>
                    </div>


                    <div className="col-12 form-group">
                        <label htmlFor="" className="form-label">{t("Notice_Period")}</label>
                        <Select
                            placeholder={t("Select")}
                            onChange={handleSelectNoticePeriod}
                            value={selectedNoticePeriod}
                            options={noticePeriodList}
                            isClearable
                        />
                        <div id="fileHelpId" className="form-text">{t("Notice_Period_Msg")}?</div>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="" className="form-label">{t("Industry")}</label>
                        <Select
                            placeholder={t("Select")}
                            onChange={handleSelectIndustryList}
                            value={selectedOptionForIndustryList}
                            options={industryList}
                            isClearable
                        />
                    </div>

                    <div className="col-12 form-group m-0">
                        <label htmlFor="" className="form-label">{t("Preferred_Job_Location")}</label>
                        <Select
                            placeholder={t("Select")}
                            options={locationList.filter(loc => {
                                const isSelected = selectedLocations.some(selected => String(selected.value) === String(loc.value));
                                return !isSelected;
                              })}
                            value={selectedLocations}
                            onChange={handleLocationChange}
                            isMulti={true}
                            isClearable
                        />
                    </div>


                </div><br />
                <button type="button" className="btn btn-link" onClick={() => cancelClick()}>{t("Close")}</button>
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

export default EditBasicDetails