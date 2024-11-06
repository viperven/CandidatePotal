import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { CommonService } from "../../../Services/CommonService";
import { ProfileService } from "../../../Services/Profile/ProfileService";
import { CandidateRegService } from "../../../Services/CanRegistration/CandidateRegService";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import '../../../assets/css/styles.css';
import { useTranslation } from 'react-i18next';

function RegisterBasic({ candidateID, TriggerCallBackResponse, LoginProcess }) {
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
    const handleRegistrationStepSubmit = async () => {
        TriggerCallBackResponse(3, 123);
    }
    const search = useLocation().search;
    const navigate = useNavigate();
    const { register, setValue, clearErrors, watch, formState: { errors }, handleSubmit } = useForm();
    const [iNoticePeriodList, setiNoticePeriodList] = useState([]);
    const [iIndustryList, setiIndustryList] = useState([]);
    const [iJobLocationList, setiJobLocationList] = useState([]);
    // const [CandidateID, setcandidateID] = useState("");
    const [openLoader, setopenLoader] = useState(false);
    const [iJobLocationSelectedValue, setiJobLocationSelectedValue] = useState([]);
    const [iNoticePeriodValue, setiNoticePeriodValue] = useState([]);
    const [iIndustryValue, setiIndustryValue] = useState([]);
    const [iCurrentCurrencyValue, setiCurrentCurrencyValue] = useState([]);
    const [iExpectedCurrencyValue, setiExpectedCurrencyValue] = useState([]);
    const [iCurrencyList, setiCurrencyList] = useState([]);
    const [currentSalaryError, setCurrentSalaryError] = useState(false);
    const [expectedSalaryError, setExpectedSalaryError] = useState(false);
    const [errorCurrentSalaryCurrency, setErrorCurrentSalaryCurrency] = useState(true);
    const [errorexpectedSalaryCurrency, seterrorexpectedSalaryCurrency] = useState(false);

    const handleJobLocationChange = (opt) => {
        if (opt.length > 0) {
            if (opt.length <= 5) {
                setiJobLocationSelectedValue(opt);
            }
        } else {
            setiJobLocationSelectedValue([]);
        }
    }
    const handleNoticePreriodChange = (opt) => {
        if (!IsNullOrEmpty(opt)) {
            setiNoticePeriodValue(opt);
        } else {
            setiNoticePeriodValue([]);
        }
    }
    const handleIndustryChange = (opt) => {
        if (!IsNullOrEmpty(opt)) {
            setiIndustryValue(opt);
        } else {
            setiIndustryValue([]);
        }
    }
    const handleCurrentCurrencyChange = (opt) => {
        // if (!IsNullOrEmpty(opt)) {
        //     setiCurrentCurrencyValue(opt);
        // } else {
        //     setiCurrentCurrencyValue([]);
        // }
        if (opt) {
            setiCurrentCurrencyValue(opt);
            setErrorCurrentSalaryCurrency(false);
            let val = document.getElementById("idxCurrentSalary").value;
            if (!IsNullOrEmpty(val)) {
                setCurrentSalaryError(false);
            } else {
                setCurrentSalaryError(true);
            }
        }
        else {
            setiCurrentCurrencyValue([]);
            let val = document.getElementById("idxCurrentSalary").value;
            if (!IsNullOrEmpty(val)) {
                setErrorCurrentSalaryCurrency(true);
            } else {
                setErrorCurrentSalaryCurrency(false);
                setCurrentSalaryError(false);
            }
        }
    }
    const handleExpectedCurrencyChange = (opt) => {
        // if (!IsNullOrEmpty(opt)) {
        //     setiExpectedCurrencyValue(opt);
        // } else {
        //     setiExpectedCurrencyValue([]);
        // }
        if (opt) {
            setiExpectedCurrencyValue(opt);
            seterrorexpectedSalaryCurrency(false);
            let val = document.getElementById("idxCurrentSalary").value;
            if (!IsNullOrEmpty(val)) {
                setExpectedSalaryError(false);
            } else {
                setExpectedSalaryError(true);
            }
        }
        else {
            setiExpectedCurrencyValue([]);
            let val = document.getElementById("idxCurrentSalary").value;
            if (!IsNullOrEmpty(val)) {
                seterrorexpectedSalaryCurrency(true);
            } else {
                seterrorexpectedSalaryCurrency(false);
                setExpectedSalaryError(false);
            }
        }
    }
    const initNoticePeriodList = async () => {
        const np = await CandidateRegService.get_NoticePeriod_DropdownList();
        np.isSuccess ? setiNoticePeriodList(JSON.parse(np.data)) : setiNoticePeriodList([]);
    }
    const initIndustryList = async () => {
        const il = await CommonService.getIndustryList();
        il ? setiIndustryList(il) : setiIndustryList([]);
    }
    const initJobLocationList = async () => {
        const loc = await ProfileService.getCountryList();
        loc ? setiJobLocationList(loc) : setiJobLocationList([]);
    }
    const initCurrencyList = async () => {
        const currency = await CommonService.getCurrencyDropdown();
        currency ? setiCurrencyList(JSON.parse(currency.apiData)) : setiCurrencyList([]);
    }

    const handleStep2Submit = async (d) => {
        let jobXml = "";
        if (iJobLocationSelectedValue) {
            if (iJobLocationSelectedValue.length > 0) {
                jobXml += "<Loc>";
                for (let i = 0; i < iJobLocationSelectedValue.length; i++) {
                    jobXml += "<LocDetails>";
                    jobXml += "<LocID>";
                    jobXml += parseInt(iJobLocationSelectedValue[i].value);
                    jobXml += "</LocID>";
                    jobXml += "</LocDetails>"
                }
                jobXml += "</Loc>";
            }
        }
        let noticePeriod = 0, industry = 0, cCurrencyId = 0, eCurrencyId = 0;
        if (iNoticePeriodValue && iNoticePeriodValue.value) {
            noticePeriod = parseInt(iNoticePeriodValue.value);
        }
        if (iIndustryValue && iIndustryValue.value) {
            industry = parseInt(iIndustryValue.value);
        }
        if (iCurrentCurrencyValue && iCurrentCurrencyValue.value) {
            cCurrencyId = parseInt(iCurrentCurrencyValue.value);
        }
        if (iExpectedCurrencyValue && iExpectedCurrencyValue.value) {
            eCurrencyId = parseInt(iExpectedCurrencyValue.value);
        }
        if (iCurrentCurrencyValue) {

        }
        if (iExpectedCurrencyValue) {

        }
        const step2Data = {
            EncCandidateID: candidateID,
            CurrentSalary: IsNullOrEmpty(d.currentSal) ? 0 : parseFloat(d.currentSal),
            CurrentCurrencyID: cCurrencyId,
            ExpectedSalary: IsNullOrEmpty(d.expSal) ? 0 : parseFloat(d.expSal),
            ExpectedCurrencyID: eCurrencyId,
            NoticePeriod: noticePeriod,
            Industry: industry,
            PreferredLocationXML: jobXml
        }
        

        try {
            if ((currentSalaryError || expectedSalaryError || errorCurrentSalaryCurrency || errorexpectedSalaryCurrency)){
                ShowAlert(0, "Please fill the required fields");
            } else {
                if ((step2Data.CurrentSalary === 0 || step2Data.ExpectedSalary === 0) && (step2Data.NoticePeriod === 0 || step2Data.Industry === 0) && step2Data.PreferredLocationXML === "") {
                    ShowAlert(0, "Please provide basic details");
                }
                 else {
                    setopenLoader(true);
                    const res = await CandidateRegService.save_Registration_Step2(step2Data);
                    setopenLoader(false);
                    if (res.isSuccess) {
                        TriggerCallBackResponse(3, candidateID, LoginProcess);
                    } else {
                        ShowAlert(1, res.message)
                    }
                }
            }
            
        } catch (error) {
            setopenLoader(false);
        }
    }
    const handlebasicSkipClick = () => {
        TriggerCallBackResponse(3, candidateID, LoginProcess);
    }
    const IsNullOrEmpty = (v) => {
        if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
            return true;
        } else {
            return false;
        }
    }
    const handleCurrentSalaryChange = (val) => {
        // if (!IsNullOrEmpty(v)) {
        //     v = v.replace(/[^0-9]/g, '');
        //     setValue("currentSal", v);
        // }
        if (!IsNullOrEmpty(val)) {
            val = val.replace(/[^0-9]/g, '');
            document.getElementById("idxCurrentSalary").value = val;
            setCurrentSalaryError(false);
            if (iCurrentCurrencyValue.value) {
                setErrorCurrentSalaryCurrency(false);
            } else {
                setErrorCurrentSalaryCurrency(true);
            }
        } else {
            if (iCurrentCurrencyValue.value) {
                setCurrentSalaryError(true);
            } else {
                setErrorCurrentSalaryCurrency(false);
                setCurrentSalaryError(false);
            }
        }
    }
    const handleExpSalaryChange = (val) => {
        // if (!IsNullOrEmpty(v)) {
        //     v = v.replace(/[^0-9]/g, '');
        //     setValue("expSal", v);
        // }
        // if (selectedOption) {
        //     setSelectedOptionForExpectedSalaryList(selectedOption);
        //     seterrorexpectedSalaryCurrency(false);
        //     let val = document.getElementById("expectedSalary").value;
        //     if (!IsNullOrEmpty(val)) {
        //         setExpectedSalaryError(false);
        //     } else {
        //         setExpectedSalaryError(true);
        //     }
        // }
        // else {
        //     setSelectedOptionForExpectedSalaryList([]);
        //     let val = document.getElementById("expectedSalary").value;
        //     if (!IsNullOrEmpty(val)) {
        //         seterrorexpectedSalaryCurrency(true);
        //     } else {
        //         seterrorexpectedSalaryCurrency(false);
        //         setExpectedSalaryError(false);
        //     }
        // }

        if (!IsNullOrEmpty(val)) {
            val = val.replace(/[^0-9]/g, '');
            document.getElementById("idxExpectedSalary").value = val;
            setExpectedSalaryError(false);
            if (iExpectedCurrencyValue.value) {
                seterrorexpectedSalaryCurrency(false);
            } else {
                seterrorexpectedSalaryCurrency(true);
            }
        } else {
            if (iExpectedCurrencyValue.value) {
                setExpectedSalaryError(true);
            } else {
                seterrorexpectedSalaryCurrency(false);
                setExpectedSalaryError(false);
            }
        }
    }
    useEffect(() => {
        // const qsCanID = new URLSearchParams(search).get('qs');
        // if (qsCanID) {
        //     setcandidateID(qsCanID);
        // } else {
        //     navigate("/404");
        // }
        initNoticePeriodList();
        initIndustryList();
        initJobLocationList();
        initCurrencyList();
    }, [])
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="card-body-header">
                <h2 className="card-title flex-fill">{t("Register_Heading")}</h2>
            </div>

            <ul className="stepper">
                <li className="completed"><a href="#"><i className='bx bxs-check-circle'></i>{t("General")}</a></li>
                <li className="active"><a href="#"><i className='bx bx-circle'></i>{t("Basic")}</a></li>
                <li><a href="#"><i className='bx bx-circle'></i>{t("Professional")}</a></li>
                <li><a href="#"><i className='bx bx-circle'></i>{t("Education")}</a></li>
                <li><a href="#"><i className='bx bx-circle'></i>{t("Personal")}</a></li>
            </ul>

            <h5 className="card-sub-title">{t("Basic_Details")}</h5>
            <form method="POST" onSubmit={handleSubmit(handleStep2Submit)}>
                <div className="row">


                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Current_Salary")}</label>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <input type="text"
                                    className="form-control"
                                    placeholder={t("Salary")}
                                    id="idxCurrentSalary"
                                    name="currentSal"
                                    maxLength={7}
                                    {...register("currentSal",
                                        {
                                            onChange: (e) => { handleCurrentSalaryChange(e.target.value) }
                                        })
                                    }
                                />
                                {currentSalaryError ? <p className='text-danger small mt-1' style={{ fontStyle: "italic" }}>please provide current salary</p> : null}
                            </div>
                            <div className='col-lg-6'>
                                <Select
                                    placeholder={t("Select")}
                                    onChange={handleCurrentCurrencyChange}
                                    value={iCurrentCurrencyValue}
                                    options={iCurrencyList}
                                    isClearable
                                />
                                {errorCurrentSalaryCurrency ? <p className='text-danger small mt-1' style={{ fontStyle: "italic" }}>please select currency</p> : null}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Expected_Salary")}</label>
                        <div className="row">
                            <div className='col-lg-6'>
                                <input type="text"
                                    className="form-control"
                                    placeholder={t("Salary")}
                                    id="idxExpectedSalary"
                                    name="expSal"
                                    maxLength={7}
                                    {...register("expSal",
                                        {
                                            onChange: (e) => { handleExpSalaryChange(e.target.value) }
                                        })
                                    }
                                />
                                {expectedSalaryError ? <p className='text-danger small' style={{ fontStyle: "italic" }}>please  provide expected salary</p> : null}
                            </div>
                            <div className='col-lg-6'>
                                <Select
                                    placeholder={t("Select")}
                                    onChange={handleExpectedCurrencyChange}
                                    value={iExpectedCurrencyValue}
                                    options={iCurrencyList}
                                    isClearable
                                />
                                {errorexpectedSalaryCurrency ? <p className='text-danger small mt-1' style={{ fontStyle: "italic" }}>please select currency</p> : null}
                            </div>
                        </div>
                    </div>

                    <div className="col-12 form-group">
                        <label htmlFor="" className="form-label">{t("Notice_Period")}</label>
                        <Select
                            placeholder={t("Select")}
                            onChange={handleNoticePreriodChange}
                            value={iNoticePeriodValue}
                            options={iNoticePeriodList}
                            isClearable
                        />
                        <div id="fileHelpId" className="form-text">{t("Notice_Period_Msg")}?</div>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="" className="form-label">{t("Industry")}</label>
                        <Select
                            placeholder={t("Select")}
                            onChange={handleIndustryChange}
                            value={iIndustryValue}
                            options={iIndustryList}
                            isClearable
                        />
                    </div>

                    <div className="col-12 form-group">
                        <label htmlFor="" className="form-label">{t("Preferred_Job_Location")}</label>
                        <Select
                            placeholder={"Ex: Hyderabad, Telangana, India"}
                            onChange={handleJobLocationChange}
                            value={iJobLocationSelectedValue}
                            isMulti={true}
                            options={iJobLocationList}
                        />
                    </div>

                    <div className="form-bottom-actions">
                        <button type="button" className="btn-outline-primary btn" onClick={() => handlebasicSkipClick()}>Skip</button>
                        <button type="submit" className="btn-primary btn">{t("Next")}</button>
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

export default RegisterBasic