import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import { CommonService } from '../../../Services/CommonService';
import { CandidateRegService } from '../../../Services/CanRegistration/CandidateRegService';
import { ProfileService } from '../../../Services/Profile/ProfileService';
import { CandidateAppliedDetailsService } from '../../../Services/CandidateAppliedDetailsService';
import { useForm } from 'react-hook-form';
import { AuthService } from '../../../Services/AuthService';
import { ProfileDashboardService } from '../../../Services/ProfileDashboardservice';
import { useTranslation } from 'react-i18next';

function ApplyJobModal(props) {
    const { t } = useTranslation();
    const [openLoader, setopenLoader] = useState(false);
    const { setValue, handleSubmit } = useForm();

    //setdropdown for form
    const [qualification, setQualification] = useState([]);
    const [noticePeriod, setNoticePeriodList] = useState([]);
    const [location, setLocation] = useState([]);
    const [currency, setcurrency] = useState([]);
    //setdropdown for form end

    //set Value in form
    const [electedOptionForQualification, setSelectedOptionForQualification] = useState([]);
    const [indianExpYear, setIndianExpYear] = useState("");
    const [indianExpMonth, setIndianExpMonth] = useState("");
    const [overseaseExpYear, setOverseaseExpYear] = useState("");
    const [overseaseExpMonth, setOverseaseExpMonth] = useState("");
    const [totalExperienceYear, settotalExperienceYear] = useState("");
    const [totalExperienceMonth, settotalExperienceMonth] = useState("");
    const [passportnumber, setPassportNumber] = useState("");
    const [selectedOptionForCurrentSalaryCurrency, SetSelectedOptionForCurrentSalaryCurrency] = useState([]);
    const [curentSalary, setCurentSalary] = useState("");
    const [selectedOptionForExpectedSalaryCurrency, SetSelectedOptionForExpectedSalaryCurrency] = useState([]);
    const [expectedSalary, setExpectedSalary] = useState("");
    const [selectedOptionForNoticePeriod, setSelectedOptionForNoticePeriod] = useState([]);
    const [selectedOptionForLocation, setSelectedOptionForLocation] = useState([]);
    const [otherDetails, setOtherDetails] = useState("");
    //set Value in form end

    //Error message form validation
    const [qualificationShowError, setQualificationShowError] = useState(false);
    const [qualificationShowErrorforsubmit, setQualificationShowErrorforsubmit] = useState(false);
    const [indianExpYearShowError, setIndianExpYearShowError] = useState(false);
    const [overseaseExpYearShowError, setOverseaseExpYearShowError] = useState(false);
    const [noticeperiodFieldShowError, setnoticeperiodFieldShowError] = useState(false);
    const [locationFieldShowError, setLocationFieldShowError] = useState(false);
    const [currentSalaryError, setCurrentSalaryError] = useState(false);
    const [expectedSalaryError, setExpectedSalaryError] = useState(false);
    const [errorMesageforPassport, setErrorMesageforPassport] = useState(false);
    const [errorCurrentSalaryCurrency, setErrorCurrentSalaryCurrency] = useState(false);
    const [errorexpectedSalaryCurrency, seterrorexpectedSalaryCurrency] = useState(false);
    const [passportAvailableMessage, setPassportAvailableMessage] = useState("");
    const [isShowPassportError, setisShowPassportError] = useState(false);
    const [passporteAVColor, setPassporteAVColor] = useState("#1bc23f");
    const [passportErrorCount, setPassportErrorCount] = useState(0);
    //Error message form validation end

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
    const CloseModal = (isRefresh) => {
        if (isRefresh) {
            props.TriggerModalClose(1, true);
        } else {
            props.TriggerModalClose(1, false);
        }
    }

    //onchange event
    const handleQualificationList = (selectedOption) => {
        if (selectedOption.length > 0) {
            setSelectedOptionForQualification(selectedOption);
            setQualificationShowError(false);
            setQualificationShowErrorforsubmit(false);
        } else {
            setSelectedOptionForQualification([]);
            setQualificationShowError(true);
        }
    };
    const handleIndianExpYear = (v) => {
        if (v) {
            v = v.replace(/[^0-9]/g, '');
            if (parseInt(v) > 35) {
                v = 35;
            }
            if (parseInt(v) <= 0) {
                v = 0;
            }
            setIndianExpYear(v);
            setIndianExpYearShowError(false);
            handletotalExp();
        } else {
            setIndianExpYear(0);
            // setIndianExpYearShowError(true);
            handletotalExp();
        }
    }
    const handleIndianExpMonth = (v) => {
        if (!IsNullOrEmpty(v)) {
            v = v.replace(/[^0-9]/g, '');
            if (parseInt(v) > 11) {
                v = 11;
            }
            if (parseInt(v) <= 0) {
                v = "";
            }
            setIndianExpMonth(v);
            handletotalExp();
        }
        else {
            setIndianExpMonth(0);
            handletotalExp();
        }
    }
    const handleOverSeaseExpYear = (v) => {
        if (v) {
            v = v.replace(/[^0-9]/g, '');
            if (parseInt(v) > 35) {
                v = 35;
            }
            if (parseInt(v) <= 0) {
                v = 0;
            }
            setOverseaseExpYear(v);
            setOverseaseExpYearShowError(false);
            handletotalExp();
        } else {
            setOverseaseExpYear(0);
            // setOverseaseExpYearShowError(true);
            handletotalExp();
        }
    }
    const handleOverseaseExpMonth = (v) => {
        if (!IsNullOrEmpty(v)) {
            v = v.replace(/[^0-9]/g, '');
            if (parseInt(v) > 11) {
                v = 11;
            }
            if (parseInt(v) <= 0) {
                v = "";
            }
            setOverseaseExpMonth(v);
            handletotalExp();
        }
        else {
            setOverseaseExpMonth(0);
            handletotalExp();
        }
    }
    const handletotalExp = () => {
        let indExpyear = document.getElementById("iyear").value === "" ? 0 : parseInt(document.getElementById("iyear").value) * 12;
        if (indExpyear > 420) {
            indExpyear = 420
        }
        let indExpMonth = document.getElementById("imonth").value === "" ? 0 : parseInt(document.getElementById("imonth").value);
        if (indExpMonth >= 11) {
            indExpMonth = 11;
        }
        let ovExpYear = document.getElementById("oyear").value === "" ? 0 : parseInt(document.getElementById("oyear").value) * 12;
        if (ovExpYear > 420) {
            ovExpYear = 420
        }
        let ovExpmonth = document.getElementById("omonth").value === "" ? 0 : parseInt(document.getElementById("omonth").value);
        if (ovExpmonth >= 11) {
            ovExpmonth = 11;
        }
        let totalexpinmonth = indExpyear + indExpMonth + ovExpYear + ovExpmonth;
        let m = totalexpinmonth % 12;
        let y = Math.floor(totalexpinmonth / 12);
        settotalExperienceYear(y);
        settotalExperienceMonth(m);
    }
    const handleCurrentSalaryCurrency = (e) => {
        if (e) {
            SetSelectedOptionForCurrentSalaryCurrency(e);
            setErrorCurrentSalaryCurrency(false);
            if (curentSalary) {
                setCurrentSalaryError(false);
            } else {
                setCurrentSalaryError(true);
            }
        }
        else {
            setCurrentSalaryError(false);
            SetSelectedOptionForCurrentSalaryCurrency([]);
            setErrorCurrentSalaryCurrency(true);
        }
    }
    const handleCurentSalary = (v) => {
        if (!IsNullOrEmpty(v)) {
            v = v.replace(/[^0-9]/g, '');
            setCurentSalary(v);
            setCurrentSalaryError(false);
            if (selectedOptionForCurrentSalaryCurrency.value) {
                setErrorCurrentSalaryCurrency(false);
            }
            else {
                setErrorCurrentSalaryCurrency(true);
            }
        } else {
            setErrorCurrentSalaryCurrency(false);
            setCurentSalary(null);
            setCurrentSalaryError(true);
        }
    }
    const handleExpectedSalaryCurrency = (e) => {
        if (e) {
            SetSelectedOptionForExpectedSalaryCurrency(e);
            seterrorexpectedSalaryCurrency(false);
            if (expectedSalary) {
                setExpectedSalaryError(false);
            } else {
                setExpectedSalaryError(true);
            }
        }
        else {
            setExpectedSalaryError(false);
            SetSelectedOptionForExpectedSalaryCurrency([]);
            seterrorexpectedSalaryCurrency(true);
        }
    }
    const handleExpectedSalary = (v) => {
        if (!IsNullOrEmpty(v)) {
            v = v.replace(/[^0-9]/g, '');
            setExpectedSalary(v);
            setExpectedSalaryError(false);
            if (selectedOptionForExpectedSalaryCurrency.value) {
                seterrorexpectedSalaryCurrency(false);
            } else {
                seterrorexpectedSalaryCurrency(true);
            }
        } else {
            seterrorexpectedSalaryCurrency(false);
            setExpectedSalary(null);
            setExpectedSalaryError(true);
        }
    }
    const handleNoticeperiod = (selectedOption) => {
        if (!IsNullOrEmpty(selectedOption)) {
            setSelectedOptionForNoticePeriod(selectedOption);
            setnoticeperiodFieldShowError(false);
        } else {
            setSelectedOptionForNoticePeriod([]);
            setnoticeperiodFieldShowError(true);
        }
    }
    const handleCurrentLocation = (selectedOption) => {
        if (!IsNullOrEmpty(selectedOption)) {
            setSelectedOptionForLocation(selectedOption);
            setLocationFieldShowError(false);
        } else {
            setSelectedOptionForLocation([]);
            setLocationFieldShowError(true);
        }
    }
    const handlepassportNumber = (v) => {
        if (!IsNullOrEmpty(v)) {
            v = v.replace(/[^A-Z0-9]/g, '');
            //var regex = /[A-Z]{1}[0-9]{7}/;regex.test(v)
            if (true) {
                setPassportNumber(v);
                setErrorMesageforPassport(false);
                if (v.length > 3) {
                    isPassportAvailable(v);
                }
                else {
                    setPassportAvailableMessage("");
                }
            }
            // else {
            //     setPassportNumber(v);
            //     setErrorMesageforPassport(true);
            // }
        }
        else {
            setPassportNumber("");
        }
    }

    const isPassportAvailable = async (passportNo) => {
        let errCount = 0;
        if (!IsNullOrEmpty(passportNo)) {
            const res = await CandidateRegService.checkIsEmailOrMobileExist(0, passportNo, "3");
            if (res.isSuccess) {
                errCount = 0;
                setPassportAvailableMessage(res.message);
                setPassporteAVColor("#1bc23f");
            } else {
                errCount = 1;
                setPassportAvailableMessage(res.message);
                setPassporteAVColor("#ff0000");
            }
            if (passportnumber === passportNo) {
                setPassportAvailableMessage("");
            }
        }
        setPassportErrorCount(errCount);
    }
    const handleOtherDetails = (e) => {
        if (e) {
            setOtherDetails(e)
        } else {
            setOtherDetails(null)
        }

    }
    //onchange event end

    const initCandidateAppliedDEtails = async () => {
        setopenLoader(true);
        const cu = await CommonService.getCurrencyDropdown();
        var currency = (JSON.parse(cu.apiData));
        try {
            const res = await CandidateAppliedDetailsService.getCandidateAppliedDetails();

            if (res.data) {
                const applyDetails = JSON.parse(res.data)[0];

                if (applyDetails) {
                    const education = applyDetails.Education;
                    let ed = null

                    if (education) {
                        ed = education.split(",");
                        initEducation(ed);
                    } else {
                        initEducation([]);
                    }
                    // if (ed) {
                    //     initEducation(ed);
                    // } else {
                    //     initEducation([]);
                    // }
                    const splitindianExp = parseFloat(applyDetails.IndianExp).toFixed(2).split(".");
                    if (splitindianExp) {
                        setIndianExpYear(parseInt(splitindianExp[0]));
                        setIndianExpMonth(parseInt(splitindianExp[1]));
                    } else {
                        setIndianExpYear([]);
                        setIndianExpMonth([]);
                    }
                    const splitOverseasExp = parseFloat(applyDetails.OverseasExp).toFixed(2).split(".");
                    if (splitOverseasExp) {
                        setOverseaseExpYear(parseInt(splitOverseasExp[0]));
                        setOverseaseExpMonth(parseInt(splitOverseasExp[1]));
                    } else {
                        setOverseaseExpYear([]);
                        setOverseaseExpMonth([]);
                    }
                    const splitTotalExp = parseFloat(applyDetails.TotalExp).toFixed(2).split(".");
                    if (splitTotalExp) {
                        settotalExperienceYear(parseInt(splitTotalExp[0]));
                        settotalExperienceMonth(parseInt(splitTotalExp[1]));
                    } else {
                        settotalExperienceYear([]);
                        settotalExperienceMonth([]);
                    }
                    currency.filter(function (f) {
                        if (parseInt(f.value) === applyDetails.CurrentSalaryCurrencyID) {
                            var currencies = { label: f.label, value: f.value };
                            SetSelectedOptionForCurrentSalaryCurrency(currencies);
                        }
                        if (parseInt(f.value) === applyDetails.CurrentSalaryCurrencyID) {
                            var expcurrencies = { label: f.label, value: f.value };
                            SetSelectedOptionForCurrentSalaryCurrency(expcurrencies);
                        }
                    })
                    if (applyDetails.CurrentSalary) {
                        setCurentSalary(applyDetails?.CurrentSalary);
                    } else {
                        setCurentSalary("");
                    }
                    currency.filter(function (f) {
                        if (parseInt(f.value) === applyDetails.ExpectedSalaryCurrencyID) {
                            var currencies = { label: f.label, value: f.value };
                            SetSelectedOptionForExpectedSalaryCurrency(currencies);
                        }
                        if (parseInt(f.value) === applyDetails.ExpectedSalaryCurrencyID) {
                            var expcurrencies = { label: f.label, value: f.value };
                            SetSelectedOptionForExpectedSalaryCurrency(expcurrencies);
                        }
                    })
                    if (applyDetails.ExpectedSalary) {
                        setExpectedSalary(applyDetails.ExpectedSalary);
                    } else {
                        setExpectedSalary("");
                    }
                    if (applyDetails.NoticePeriod) {
                        initnoticePeriod(applyDetails.NoticePeriod);
                    } else {
                        initnoticePeriod(applyDetails.NoticePeriod);
                    }

                    if (applyDetails.CurrentLocation) {
                        initlocation(applyDetails.CurrentLocation);
                    } else {
                        initlocation(applyDetails.CurrentLocation);
                    }
                    if (applyDetails.PassportNo) {
                        setPassportNumber(applyDetails.PassportNo);
                    } else {
                        setPassportNumber("");

                    }
                    if (applyDetails.OtherDetails) {
                        setOtherDetails(applyDetails.OtherDetails);
                    } else {
                        setOtherDetails("");
                    }
                }
            }
        } catch (error) {

        }
        setopenLoader(false);
    }
    const initEducation = async (edId) => {
        try {
            const education = await CommonService.getQualificationList();
            setQualification(education);
            if (edId && education) {
                let qual = [];
                education.filter(function (f) {
                    for (let i = 0; i < edId.length; i++) {
                        if (parseInt(f.value) === parseInt(edId[i])) {
                            qual.push({ label: f.label, value: f.value });
                            setSelectedOptionForQualification(qual);
                        }
                    }
                })
            }
        } catch (error) {

        }
    }
    const initnoticePeriod = async (nId) => {
        const noticePeriod = await CandidateRegService.get_NoticePeriod_DropdownList();
        let notice = JSON.parse(noticePeriod.data);
        notice ? setNoticePeriodList(notice) : setNoticePeriodList([]);
        if (nId && notice) {
            notice.filter(function (f) {
                if (f.value === nId) {
                    var npl = { label: f.label, value: f.value };
                    setSelectedOptionForNoticePeriod(npl);
                }
            })
        }
    }
    const initCurrency = async () => {
        try {
            const currency = await CommonService.getCurrencyDropdown();
            setcurrency(JSON.parse(currency.apiData));
        } catch (error) {

        }
    }
    const initlocation = async (locId) => {
        try {
            const location = await ProfileService.getLocationList();
            location ? setLocation(location) : setLocation([]);
            if (locId && location) {
                location.filter(function (f) {
                    if (parseInt(f.value) === locId) {
                        var loc = { label: f.label, value: f.value };
                        setSelectedOptionForLocation(loc);
                    }
                })
            }
        } catch (error) {

        }
    }
    const IsNullOrEmpty = (v) => {
        if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
            return true;
        } else {
            return false;
        }
    };

    const handleApplyJobSubmit = async () => {
        let errCount = 0;
        let education = "";
        if (electedOptionForQualification.length === 1) {
            setQualificationShowErrorforsubmit(false);
            education = electedOptionForQualification[0].value;
            errCount += 0;
        }
        else {
            errCount += 1;
            setQualificationShowErrorforsubmit(true);
        }
        let indianExperience = "";
        if (!IsNullOrEmpty(indianExpMonth)) {
            if (indianExpMonth.toString().length === 1) {
                let indexp = indianExpYear + "." + "0" + indianExpMonth;
                indianExperience = indexp;
            }
            else {
                indianExperience = indianExpYear + "." + indianExpMonth;
            }
        } else {
            indianExperience = indianExpYear + "." + "0";
        }

        if (indianExperience) {
            errCount += 0;
        } else {
            errCount += 1;
        }

        let overseasExperience = "";
        if (!IsNullOrEmpty(overseaseExpMonth)) {
            if (overseaseExpMonth.toString().length === 1) {
                let ovexp = overseaseExpYear + "." + "0" + overseaseExpMonth;
                overseasExperience = ovexp;
            } else {
                overseasExperience = overseaseExpYear + "." + overseaseExpMonth;
            }
        } else {
            overseasExperience = overseaseExpYear + "." + "0";
        }

        if (overseasExperience) {
            errCount += 0;
        } else {
            errCount += 1;
        }
        let totalexp = "";
        if (!IsNullOrEmpty(totalExperienceMonth)) {
            if (totalExperienceMonth.toString().length === 1) {
                totalexp = totalExperienceYear + "." + "0" + totalExperienceMonth;
            } else {
                totalexp = totalExperienceYear + "." + totalExperienceMonth;
            }
        } else {
            totalexp = totalExperienceYear + "." + "0";
        }
        const totalLocalExperienceMonths = (parseInt(indianExpYear) * 12) + parseInt(indianExpMonth);
        const totalOverseasExperienceMonths = (parseInt(overseaseExpYear) * 12) + parseInt(overseaseExpMonth);
        const totalExperienceMonths = totalLocalExperienceMonths + totalOverseasExperienceMonths;
        if (totalExperienceMonths > 35 * 12) {
            alert("Total experience cannot exceed 35 years.");
            setopenLoader(false);
            return;
        }
        let passno = "";
        if (passportnumber) {
            passno = passportnumber;
        } else {
            errCount += 1
            passno = "";
        }

        if (errorMesageforPassport) {
            errCount += 1
        }
        if (passportErrorCount) {
            ShowAlert(0, "Passport Number Already exists")
            return false;
        }
        const data = {
            CandidateID: AuthService.getCurrentUser().referenceID,
            JobpostingID: props.jobPostingID.toString(),
            Education: education,
            IndianExperience: parseFloat(indianExperience),
            OverseasExperience: parseFloat(overseasExperience),
            TotalExperience: parseFloat(totalexp),
            ReferenceID: AuthService.getCurrentUser().referenceID,
            MdifiedBy: AuthService.getCurrentUser().referenceID,
            UserTypeId: AuthService.getCurrentUser().userTypeId,
            PassportNo: passno,
            ApplyType: "W",
        }
        setopenLoader(true);
        if (errCount === 0) {
            const res = await ProfileDashboardService.ApplySelectedJob(data);

            if (res.isSuccess) {
                ShowAlert(1, res.message);
                CloseModal(true);
            } else {
                ShowAlert(0, res.message);
                CloseModal(true);
            }
        } else {

        }
        setopenLoader(false);
    }

    //form submit
    // const handleApplyJobSubmit = async () => {
    //     let errCount = 0;
    //     let education = "";
    //     if (electedOptionForQualification.length === 1) {
    //         setQualificationShowErrorforsubmit(false);
    //         education = electedOptionForQualification[0].value;
    //         errCount += 0;
    //     }
    //     else {
    //         errCount += 1;
    //         setQualificationShowErrorforsubmit(true);
    //     }
    //     let indianExperience = "";
    //     if (!IsNullOrEmpty(indianExpMonth)) {
    //         if (indianExpMonth.toString().length === 1) {
    //             let indexp = indianExpYear + "." + "0" + indianExpMonth;
    //             indianExperience = indexp;
    //         }
    //         else {
    //             indianExperience = indianExpYear + "." + indianExpMonth;
    //         }
    //     } else {
    //         indianExperience = indianExpYear + "." + "0";
    //     }

    //     if (indianExperience) {
    //         errCount += 0;
    //     } else {
    //         errCount += 1;
    //     }

    //     let overseasExperience = "";
    //     if (!IsNullOrEmpty(overseaseExpMonth)) {
    //         if (overseaseExpMonth.toString().length === 1) {
    //             let ovexp = overseaseExpYear + "." + "0" + overseaseExpMonth;
    //             overseasExperience = ovexp;
    //         } else {
    //             overseasExperience = overseaseExpYear + "." + overseaseExpMonth;
    //         }
    //     } else {
    //         overseasExperience = overseaseExpYear + "." + "0";
    //     }

    //     if (overseasExperience) {
    //         errCount += 0;
    //     } else {
    //         errCount += 1;
    //     }
    //     let totalexp = "";
    //     if (!IsNullOrEmpty(totalExperienceMonth)) {
    //         if (totalExperienceMonth.toString().length === 1) {
    //             totalexp = totalExperienceYear + "." + "0" + totalExperienceMonth;
    //         } else {
    //             totalexp = totalExperienceYear + "." + totalExperienceMonth;
    //         }
    //     } else {
    //         totalexp = totalExperienceYear + "." + "0";
    //     }
    //     const totalLocalExperienceMonths = (parseInt(indianExpYear) * 12) + parseInt(indianExpMonth);
    //     const totalOverseasExperienceMonths = (parseInt(overseaseExpYear) * 12) + parseInt(overseaseExpMonth);
    //     const totalExperienceMonths = totalLocalExperienceMonths + totalOverseasExperienceMonths;
    //     if (totalExperienceMonths > 35 * 12) {
    //         alert("Total experience cannot exceed 35 years.");
    //         setopenLoader(false);
    //         return;
    //     }

    //     let cuSalCurency = 0;
    //     if (selectedOptionForCurrentSalaryCurrency.length != 0) {
    //         cuSalCurency = selectedOptionForCurrentSalaryCurrency.value;
    //         errCount += 0;
    //     }
    //     else {
    //         errCount += 1;
    //         cuSalCurency = 0;
    //     }
    //     let cuSalary = "";
    //     if (curentSalary) {
    //         cuSalary = curentSalary.toString();
    //         errCount += 0;
    //     }
    //     else {
    //         curentSalary = "";
    //         errCount += 1;
    //     }

    //     let exSalaryCurrency = 0;
    //     if (selectedOptionForExpectedSalaryCurrency.length != 0) {
    //         exSalaryCurrency = selectedOptionForExpectedSalaryCurrency.value;
    //         errCount += 0;
    //     }
    //     else {
    //         exSalaryCurrency = 0;
    //         errCount += 1;
    //     }
    //     let epectedSalary = "";
    //     if (expectedSalary) {
    //         errCount += 0;
    //         epectedSalary = expectedSalary.toString();
    //     }
    //     else {
    //         errCount += 1;
    //         epectedSalary = "";
    //     }
    //     let noticeperiod = 0;
    //     if (selectedOptionForNoticePeriod.length != 0) {
    //         errCount += 0;
    //         noticeperiod = selectedOptionForNoticePeriod.value;
    //     } else {
    //         errCount += 1;
    //         noticeperiod = 0;
    //     }
    //     let cuLoc = 0;
    //     if (selectedOptionForLocation.length != 0) {
    //         errCount += 0;
    //         cuLoc = selectedOptionForLocation.value;
    //     } else {
    //         errCount += 1;
    //         cuLoc = 0;
    //     }
    //     let passno = "";
    //     if (passportnumber) {
    //         passno = passportnumber;
    //     } else {
    //         passno = "";
    //     }
    //     let others = "";
    //     if (otherDetails) {
    //         others = otherDetails;
    //     } else {
    //         others = "";
    //     }
    //     const data = {
    //         CandidateID: AuthService.getCurrentUser().referenceID,
    //         JobpostingID: props.jobPostingID.toString(),
    //         Education: education,
    //         IndianExperience: parseFloat(indianExperience),
    //         OverseasExperience: parseFloat(overseasExperience),
    //         TotalExperience: parseFloat(totalexp),
    //         CurrentSalary: cuSalary,
    //         ExpectSalary: epectedSalary,
    //         CurrentSalaryCurID: parseInt(cuSalCurency),
    //         ExpectedSalaryCurID: parseInt(exSalaryCurrency),
    //         NoticePeriod: parseInt(noticeperiod),
    //         CurrentLocation: parseInt(cuLoc),
    //         OtherDetails: others,
    //         ReferenceID: AuthService.getCurrentUser().referenceID,
    //         MdifiedBy: AuthService.getCurrentUser().referenceID,
    //         UserTypeId: AuthService.getCurrentUser().userTypeId,
    //         PassportNo: passno,
    //     }
    //     setopenLoader(true);
    //     if (errCount === 0) {
    //         const res = await ProfileDashboardService.ApplySelectedJob(data);

    //         if (res.isSuccess) {
    //             ShowAlert(1, res.message);
    //             CloseModal(true);
    //         } else {
    //             ShowAlert(0, res.message);
    //             CloseModal(true);
    //         }
    //         console.log(data);
    //     } else {

    //     }
    //     setopenLoader(false);
    // }
    //form submit end

    useEffect(() => {
        initCandidateAppliedDEtails();
        initEducation();
        initnoticePeriod();
        initlocation();
        initCurrency();
    }, [])

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <form onSubmit={handleSubmit(handleApplyJobSubmit)}>
                <div className="row">
                    <div className="col-lg-12 form-group">
                        <label htmlFor="" className="form-label">{t("Highest_Education")}<span className="text-danger ">*</span> </label>
                        <Select
                            placeholder={t("Select_Highest_Education")}
                            onChange={handleQualificationList}
                            value={electedOptionForQualification}
                            options={qualification}
                            isClearable
                            isMulti
                            required
                        />
                        <div id="fileHelpId" className="form-text">* {t("Highest_Education_Msg")}</div>
                        {qualificationShowError ? <p className='text-danger small' style={{ fontStyle: "italic" }}>Please select Highest Qualification</p> : null}
                        {qualificationShowErrorforsubmit ? <p className='text-danger small' style={{ fontStyle: "italic" }}>Maximum one selection allow</p> : null}
                    </div>
                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Domestic_Local_Exp")}<span className="text-danger ">*</span></label>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <input type='number' className="form-control" name='indianExpYear' placeholder='Year' maxLength={2} id='iyear' min={0}
                                    value={indianExpYear}
                                    onChange={(e) => handleIndianExpYear(e.target.value)}
                                    required
                                />
                                {indianExpYearShowError ? <p className='text-danger mt-1 small' style={{ fontStyle: "italic" }}>Please input</p> : null}
                            </div>
                            <div className='col-lg-6'>
                                <input type='number' className="form-control" name='indianExpMonth' placeholder='Month' max={11} maxLength={2} id='imonth'
                                    value={indianExpMonth}
                                    onChange={(e) => handleIndianExpMonth(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Overseas_Abroad_Exp")}<span className="text-danger ">*</span></label>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <input type='number' className="form-control" name='overseasExpYear' placeholder='Year' min={0} max={35} id='oyear'
                                    value={overseaseExpYear}
                                    onChange={(e) => handleOverSeaseExpYear(e.target.value)}
                                    required
                                />
                                {overseaseExpYearShowError ? <p className='text-danger mt-1 small' style={{ fontStyle: "italic" }}>Please input</p> : null}
                            </div>
                            <div className='col-lg-6'>
                                <input type='number' className="form-control" name='overseasExpMonth' placeholder='Month' min={0} max={11} id='omonth'
                                    value={overseaseExpMonth}
                                    onChange={(e) => handleOverseaseExpMonth(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 form-group">
                        <label htmlFor="" className="form-label">{t("Total_Experience")}</label>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <input type="number" className="form-control" name='totalExpYear' placeholder="Year" min={0} max={35} readOnly
                                    title='Total experience Year Must Be below or equal to 40 years'
                                    value={totalExperienceYear}
                                    required
                                />
                            </div>
                            <div className='col-lg-6'>
                                <input type='number' className="form-control" name='totalExpMonth' placeholder='Month' min={0} max={11} readOnly
                                    value={totalExperienceMonth}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Current_Salary")}<span className="text-danger ">*</span></label>
                        <div className='row'>
                            <div className="col-lg-6 ">
                                <Select
                                    placeholder={t("Select")}
                                    onChange={handleCurrentSalaryCurrency}
                                    value={selectedOptionForCurrentSalaryCurrency}
                                    options={currency}
                                    isClearable
                                />
                                {errorCurrentSalaryCurrency ? <p className='text-danger small mt-1' style={{ fontStyle: "italic" }}>please select currency</p> : null}
                            </div>
                            <div className="col-lg-6 ">
                                <input type="text" className='form-control' min={0.00} data-type="currency"
                                    allowDecimals groupSeparator=',' decimalSeparator="." name='currentSalary' placeholder="1,000,000"
                                    value={curentSalary}
                                    onChange={(e) => handleCurentSalary(e.target.value)}
                                />
                                {currentSalaryError ? <p className='text-danger small mt-1' style={{ fontStyle: "italic" }}>please provide current salary</p> : null}
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Expected_Salary")}<span className="text-danger ">*</span></label>
                        <div className='row'>
                            <div className="col-lg-6">
                                <Select
                                    placeholder={t("Select")}
                                    onChange={handleExpectedSalaryCurrency}
                                    value={selectedOptionForExpectedSalaryCurrency}
                                    options={currency}
                                    isClearable
                                />
                                {errorexpectedSalaryCurrency ? <p className='text-danger small mt-1' style={{ fontStyle: "italic" }}>please select currency</p> : null}
                            </div>
                            <div className="col-lg-6">
                                <input type="text" className='form-control' min={0.00} data-type="currency"
                                    allowDecimals groupSeparator=',' decimalSeparator="." name='expectedSalary' placeholder="1,000,000"
                                    value={expectedSalary}
                                    onChange={(e) => handleExpectedSalary(e.target.value)}
                                />
                                {expectedSalaryError ? <p className='text-danger small' style={{ fontStyle: "italic" }}>please  provide expected salary</p> : null}
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Notice_Period")}<span className="text-danger ">*</span></label>
                        <Select
                            placeholder={t("Select")}
                            onChange={handleNoticeperiod}
                            value={selectedOptionForNoticePeriod}
                            options={noticePeriod}
                            isClearable
                        />
                        {noticeperiodFieldShowError ? <p className='text-danger mt-1 small' style={{ fontStyle: "italic" }}>Please select notice Period</p> : null}
                    </div> */}
                    {/* <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Current_Location")}<span className="text-danger ">*</span></label>
                        <Select
                            placeholder={t("Select")}
                            onChange={handleCurrentLocation}
                            value={selectedOptionForLocation}
                            options={location}
                            isClearable
                        />
                        {locationFieldShowError ? <p className='text-danger mt-1 small' style={{ fontStyle: "italic" }}>Please select current location</p> : null}
                    </div> */}
                    <div className="col-lg-12 form-group">
                        <label htmlFor="" className="form-label">{t("Passport_No")}</label>
                        <input type="text" className="form-control" placeholder={t("Passport_No")} name='passportNo'
                            value={passportnumber}
                            onChange={(e) => handlepassportNumber(e.target.value)}
                            required
                            maxLength={15}
                        />
                        {passportAvailableMessage === "" ? null : <span className="f13" style={{ color: passporteAVColor }} >{passportAvailableMessage}<br /></span>}
                        {errorMesageforPassport ? <p className='text-danger mt-1 small' style={{ fontStyle: "italic" }}>Please enter valid passport number</p> : null}
                    </div>
                    {/* <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Other_Details")}</label>
                        <input type="text" className="form-control" placeholder={t("Other_Details")} name='otherDetails'
                            value={otherDetails}
                            onChange={(e) => handleOtherDetails(e.target.value)}

                        />
                    </div> */}
                </div>
                <button type="submit" className="btn btn-primary" style={{ float: "right" }}>{t("Apply")}</button>
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

export default ApplyJobModal