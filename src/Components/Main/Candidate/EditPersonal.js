import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { AuthService } from '../../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import { ProfileService } from '../../../Services/Profile/ProfileService';
import Select from 'react-select';
import { CandidateRegService } from '../../../Services/CanRegistration/CandidateRegService';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Modal from "react-bootstrap/Modal";

function EditPersonal({ triggerClick, personalData }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { register, setValue, setError, clearErrors, watch, formState: { errors }, handleSubmit } = useForm();
    const [dob, setdob] = useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [openLoader, setopenLoader] = React.useState(true);
    const [materialStatusList, setmaterialStatusList] = useState([]);
    const [locationList, setLocationsList] = useState([]);
    const [religionList, setreligionList] = useState([]);
    //const [personalData, setpersonalData] = useState({});
    const [HasDoBError, setHasDoBError] = useState(false);
    const [DoBErrorMsg, setDoBErrorMsg] = useState("");
    const [selectedOptionFormaterialStatusList, setSelectedOptionFormaterialStatusList] = useState([]);
    const [selectedOptionForReligionList, setSelectedOptionForReligionList] = useState([]);
    const [selectedOptionForLocationList, setselectedOptionForLocationList] = useState([]);
    const [iTempLangAndProf, setiTempLangAndProf] = useState([]);
    const [iLanguageList, setiLanguageList] = useState([]);
    const [iLangProficiencyList, setiLangProficiencyList] = useState([]);
    const TodayDate = new Date().toISOString().split('T')[0];
    const [year, month, day] = TodayDate.split('-');
    const DOBdate = `${parseInt(year) - 60}-${month}-${day}`;
    const date = `${parseInt(year) - 18}-${month}-${day}`;
    let PassportEndDate = "";
    if (day < 10){
         PassportEndDate = `${parseInt(year) - 8}-${month}-0${parseInt(day)+1}`;
    }else {
         PassportEndDate = `${parseInt(year) - 8}-${month}-${day}`;
    }
    //const PassportEndDate = `${parseInt(year) - 8}-${month}-${day}`;
    const [selectdOptionForPPIssuePlace, setselectdOptionForPPIssuePlace] = useState([]);
    const [selectState,setSelectState] = useState(true);
    const [passportMinStartDate, setpassportMinStartDate] = useState("");
    const [passportMinExpDate, setpassportMinExpDate] = useState("");
    const [passportAvailableMessage, setPassportAvailableMessage] = useState("");
    const [isShowPassportError, setisShowPassportError] = useState(false);
    const [passporteAVColor, setPassporteAVColor] = useState("#1bc23f");
    const [minPassportEndDate, setMinPassportEndDate] = useState("");
    const [maxPassportEndDate, setMaxPassportEndDate] = useState("");
    const [passportErrorCount, setPassportErrorCount] = useState(0);
    const [candidatePassportNo, setCandidatePassportNo] = useState("");
    const [languageSelectedValue, setlanguageSelectedValue] = useState([]);
    const [langProficiencySelectedValue, setlangProficiencySelectedValue] = useState([]);
    const [hasDateOfBirthErrMsg, sethasDateOfBirthErrMsg] = useState("");
    const [isshowDateOFBirthErr, setIsshowDateOFBirthErr] = useState(false);
    const [isShowLanguageErr, setisShowLanguageErr] = useState(false);
    const [isShowLangProficiencyErr, setisShowLangProficiencyErr] = useState(false);
    const [languageData, setLanguageData] = useState([]);
    const [show, setshow] = useState(false);
    const [pIssueDate, setpIssueDate] = useState("");
    const [pExpiryDate, setpExpiryDate] = useState("");

    const [hasPassportIssueError, sethasPassportIssueError] = useState(false);
    const [hasPassportExpairyError, sethasPassportExpairyError] = useState(false);

    const [hasOverridePassportIssueError, sethasOverridePassportIssueError] = useState(false);

    const handleClose = () => {
        setshow(false);
        clearFieldErrors();
    }
    const clearFieldErrors = () => {
        setValue("ID", 0);
        setlangProficiencySelectedValue([]);
        setlanguageSelectedValue([]);
        setisShowLangProficiencyErr(false);
        setisShowLanguageErr(false);
    }
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
    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + (d.getDate() + 1),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('/');
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
    const initPersonalDetails = async () => {
        setopenLoader(true);
        const formData = JSON.parse(personalData);
        setopenLoader(false);
        if (formData) {
            if (!IsNullOrEmpty(formData?.CandidateDateOfBirth)) {
                try {
                    const [day, month, year] = formData?.CandidateDateOfBirth.split('/');
                    setpassportMinStartDate(`${parseInt(year) + 18}-${month}-${day}`)
                    // if (day<10){
                    //     setpassportMinExpDate(`${parseInt(year) + 28}-${month}-0${parseInt(day)-1}`)
                        
                    // }else{
                    //     setpassportMinExpDate(`${parseInt(year) + 28}-${month}-${parseInt(day)-1}`)
                    //     console.log(passportMinExpDate)
                    // }
                    const issueDate = new Date(`${parseInt(year) + 18}-${month}-${day}`);
                    const expiryDate = new Date(issueDate);
                    expiryDate.setFullYear(issueDate.getFullYear() + 10);
                    expiryDate.setDate(expiryDate.getDate() - 1); // Set to the last day of the month
                    const formattedExpiryDate = expiryDate.toISOString().split('T')[0];
                    setpassportMinExpDate(formattedExpiryDate)
                    
                    setValue("dob", setDate(formData.CandidateDateOfBirth));
                } catch {

                }
            }
            if (formData.CandidateGender) {
                formData.CandidateGender === "M" ? setValue("gender", "M") : setValue("gender", "F");
            }
            if (IsNullOrEmpty(formData.CandidatePassportNo)) {
                document.getElementById("idxppIStartDate").disabled = true;
                document.getElementById("idxPEndDate").disabled = true;
            } else {
                setValue("passportNo", formData.CandidatePassportNo);
                setCandidatePassportNo(formData.CandidatePassportNo);
                setSelectState(false);
            }
            if (formData.MaritalStatusID > 0) {
                initMaterialStatus(formData.MaritalStatusID);
            } else {
                initMaterialStatus(0);
            }
            if (formData.ReligionID > 0) {
                initReligion(formData.ReligionID);
            } else {
                initReligion(0);
            }
            if (formData.CandidatePassportIssuePlace > 0) {
                initLocations(formData.CandidatePassportIssuePlace);
            } else {
                initLocations(0);
            }
            if (!IsNullOrEmpty(formData.CandidatePassportIssueDate)) {
                try {
                    setValue("ppIStartDate", setDate(formData.CandidatePassportIssueDate));
                    setpIssueDate(setDate(formData.CandidatePassportIssueDate))
                } catch {

                }
            }
            if (!IsNullOrEmpty(formData.CandidatePassportExpiryDate)) {
                try {
                    setValue("ppExpDate", setDate(formData.CandidatePassportExpiryDate));
                    setpExpiryDate(setDate(formData.CandidatePassportExpiryDate))
                } catch {

                }
            }
            if (!IsNullOrEmpty(formData.Lang)) {
                const l = JSON.parse(formData.Lang);
                let langData = [];
                for (let i = 0; i < l.length; i++) {
                    langData.push({
                        id: i === 0 ? 1 : i + 1,
                        langName: l[i].Language,
                        langID: l[i].CandidateLanguageID,
                        profieciencyName: l[i].LanguageProficiency,
                        profieciencyID: l[i].CandidateLanguageProficiencyID
                    })
                }
                setLanguageData(langData);
            }

        }

    }
    const setDate = (dt) => {
        const splitDT = dt.split("/");
        const day = splitDT[0];
        const mon = splitDT[1];
        const year = splitDT[2];
        const fDate = year + "-" + mon + "-" + day;
        return fDate;
    }
    const IsNullOrEmpty = (v) => {
        if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
            return true;
        } else {
            return false;
        }
    }
    const initMaterialStatus = async (matID) => {
        try {
            const materialStatus = await ProfileService.getMaritalStatusDropDownList();
            materialStatus ? setmaterialStatusList(materialStatus) : setmaterialStatusList([]);
            if (matID > 0 && materialStatus) {
                materialStatus.filter(function (f) {
                    if (parseInt(f.value) === matID) {
                        var marital = { label: f.label, value: f.value };
                        setSelectedOptionFormaterialStatusList(marital);
                    }
                })
            }
        } catch (error) {

        }
    }
    const initReligion = async (regId) => {
        const religion = await ProfileService.getReligionDropDownList();
        religion ? setreligionList(religion) : setreligionList([]);
        if (regId > 0 && religion) {
            religion.filter(function (f) {
                if (parseInt(f.value) === regId) {
                    var reg = { label: f.label, value: f.value };
                    setSelectedOptionForReligionList(reg);
                }
            })
        }
    }
    const initLocations = async (locId) => {
        const loc = await ProfileService.getLocationList();
        loc ? setLocationsList(loc) : setLocationsList();
        if (locId > 0 && loc) {
            loc.filter(function (f) {
                if (parseInt(f.value) === locId) {
                    let location = { label: f.label, value: f.value };
                    setselectdOptionForPPIssuePlace(location);
                }
            })
        }
    }
    const handleSelectmaterialStatusList = (selectedOption) => {
        if (selectedOption) {

            setSelectedOptionFormaterialStatusList(selectedOption);
        } else {
            setSelectedOptionFormaterialStatusList([]);
        }
    }
    const handleDateChange = (dt) => {
        // const formatDate = new Date(dt).toISOString().split('T')[0];
        if (!IsNullOrEmpty(dt)) {
            var today = new Date();
            var nowyear = today.getFullYear();
            var nowmonth = today.getMonth();
            var nowday = today.getDate();
            var birth = new Date(dt);

            var birthyear = birth.getFullYear();
            var birthmonth = birth.getMonth();
            var birthday = birth.getDate();

            var age = nowyear - birthyear;
            var age_month = nowmonth - birthmonth;
            var age_day = nowday - birthday;
            const [year, month, day] = date.split('-');
            const newDate = `${day}-${month}-${year}`;
            if (age > 60) {
                setIsshowDateOFBirthErr(true);
                sethasDateOfBirthErrMsg("Age cannot be more than 60 Years.Please enter correct age")
                return false;
            }
            if (age_month < 0 || (age_month == 0 && age_day < 0)) {
                age = parseInt(age) - 1;
            }

            if ((age == 17 && age_month <= 0 && age_day <= 0) || age < 18) {
                setIsshowDateOFBirthErr(true);
                sethasDateOfBirthErrMsg(`Age Should be greater than 18 years / Date of birth should be ${newDate} for 18 years`);
                return false;
            } else {

                //setdateofBirth(dt.target.value);
                setIsshowDateOFBirthErr(false);
            }
        } else {
            //setdateofBirth("");
            setIsshowDateOFBirthErr(true);
        }
    }
    const handleSelectreligionList = (selectedOption) => {
        if (selectedOption) {

            setSelectedOptionForReligionList(selectedOption);
        } else {
            setSelectedOptionForReligionList([]);
        }
    }
    const handleSelectLocationList = (selectedOption) => {
        if (!IsNullOrEmpty(selectedOption)) {
            setselectedOptionForLocationList(selectedOption);
        } else {
            setselectedOptionForLocationList([]);
        }
    }
    const handleSelecPPissueList = (selectedOption) => {
        if (selectedOption) {

            setselectdOptionForPPIssuePlace(selectedOption);
        } else {
            setselectdOptionForPPIssuePlace([]);
        }
    }
    const handlePassportNoChange = (val) => {
        console.log(!IsNullOrEmpty(val))
        if (!IsNullOrEmpty(val)) {
            val = val.replace(/[^A-Z0-9]/g, '');
            setValue("passportNo", val);
            //var regex = /[A-Z]{1}[0-9]{7}/;
            if (true) {
                document.getElementById("idxppIStartDate").disabled = false;
                document.getElementById("idxPEndDate").disabled = false;
                setSelectState(false);
                setisShowPassportError(false);
                if (val.length > 3) {
                    isPassportAvailable(val);
                }
            }
            // else {

            //     document.getElementById("idxppIStartDate").value = null;
            //     document.getElementById("idxPEndDate").value = null;
            //     document.getElementById("idxppIStartDate").disabled = true;
            //     document.getElementById("idxPEndDate").disabled = true;
            //     //setselectdOptionForPPIssuePlace([])
            //     setSelectState(true);
            //     setisShowPassportError(true);
            // }
        } else {
            setValue("ppExpDate", null);
            setValue("ppIStartDate", null);
            setPassportAvailableMessage("");
            setisShowPassportError(false);
            setSelectState(true);
            document.getElementById("idxppIStartDate").value = null;
            document.getElementById("idxPEndDate").value = null;
            document.getElementById("idxppIStartDate").disabled = true;
            document.getElementById("idxPEndDate").disabled = true;
            setselectdOptionForPPIssuePlace([]);
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
            if (candidatePassportNo === passportNo) {
                setPassportAvailableMessage("");
            }
        }
        setPassportErrorCount(errCount);
    }
    const handlePassportIssueDateChange = (e) => {
        if (!IsNullOrEmpty(e)) {
            sethasPassportIssueError(false);
            setMinPassportEndDate(e);

            // const [year, month, day] = e.split('-');
            // const date = `${parseInt(year) + 10}-${month}-${day}`;
            const issueDate = new Date(e);
            const expiryDate = new Date(issueDate);
            expiryDate.setFullYear(issueDate.getFullYear() + 10);
            expiryDate.setDate(expiryDate.getDate() - 1); // Set to the last day of the month
            const formattedExpiryDate = expiryDate.toISOString().split('T')[0];
 

            document.getElementById("idxPEndDate").readOnly = false;
            //document.getElementById("idxPEndDate").value = formattedExpiryDate;
            setpIssueDate(issueDate.toISOString().split('T')[0])
            setpExpiryDate(formattedExpiryDate)
            setValue("ppExpDate",formattedExpiryDate)
            if (!IsNullOrEmpty(document.getElementById("idxDob").value)) {
                const dobAge = getAge(document.getElementById("idxDob").value);
                const ppIssueAge = getAge(e);
                if (dobAge <= ppIssueAge) {
                    sethasOverridePassportIssueError(true);
                } else {
                    sethasOverridePassportIssueError(false);
                }
            } else {
                sethasOverridePassportIssueError(false);
            }
            setMaxPassportEndDate(formattedExpiryDate);
            if (IsNullOrEmpty(document.getElementById("idxPEndDate").value)) {
                sethasPassportExpairyError(true);
            } else {
                sethasPassportExpairyError(false);
            }
        } else {
            setMinPassportEndDate(DOBdate);
            sethasPassportExpairyError(false);
            //document.getElementById("idxPEndDate").value = "";
            //setpExpiryDate("")
            document.getElementById("idxPEndDate").readOnly = false;
        }
    }
    const handlePassporExpairyDateChange = (e) => {
        if (IsNullOrEmpty(e)) {
            sethasPassportExpairyError(true);
            if (IsNullOrEmpty(document.getElementById("idxppIStartDate").value)) {
                sethasPassportIssueError(true);
            } else {
                sethasPassportIssueError(false);          
            }
            
            //document.getElementById("idxppIStartDate").value = "";
            //setpIssueDate("")
            document.getElementById("idxppIStartDate").readOnly = false;
        } else {
            const expiryDate = new Date(e);
            const issueDate = new Date(expiryDate);
            issueDate.setFullYear(expiryDate.getFullYear() - 10);
            issueDate.setDate(expiryDate.getDate() + 1); // Set to the last day of the month
            const formattedIssueDate = issueDate.toISOString().split('T')[0];
 
            document.getElementById("idxppIStartDate").readOnly = false;
            //document.getElementById("idxppIStartDate").value = formattedIssueDate;
            setpExpiryDate(expiryDate.toISOString().split('T')[0])
            setpIssueDate(formattedIssueDate)
            setValue("ppIStartDate",formattedIssueDate)
            sethasPassportExpairyError(false);
        }
    }
    const getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    const handleUploadImage = (event) => {
        var image = document.getElementById("output");
        image.src = URL.createObjectURL(event.target.files[0]);
    }
    const handlePersonalSubmit = async (d) => {
        let langXml = "";
        if (languageData.length >= 0) {
            langXml += "<Lang>";
            for (let i = 0; i < languageData.length; i++) {
                langXml += "<LangDetails>";
                langXml += "<LangID>" + parseInt(languageData[i].langID) + "</LangID>";
                langXml += "<LangProfID>" + parseInt(languageData[i].profieciencyID) + "</LangProfID>";
                langXml += "</LangDetails>";
            }
            langXml += "</Lang>";
        }
        //var regex = /[A-Z]{1}[0-9]{7}/;
        if (!IsNullOrEmpty(d.passportNo)) {
            // if (!regex.test(d.passportNo)) {
            //     setisShowPassportError(true);
            //     return false;
            // }
            if (IsNullOrEmpty(d.ppIStartDate) && !IsNullOrEmpty(d.ppExpDate)) {
                console.log("1",pExpiryDate)
                console.log("2",pIssueDate)
                ShowAlert(0, "Please enter passport issue date ");
                return false;
            }
            console.log(IsNullOrEmpty(d.ppExpDate))
            if (!IsNullOrEmpty(d.ppIStartDate) && IsNullOrEmpty(d.ppExpDate)) {
                console.log("1",pExpiryDate)
                console.log("2",pIssueDate)
                ShowAlert(0, "Please enter passport expiry date ");
                return false;
            }
            if (!IsNullOrEmpty(d.ppIStartDate) && !IsNullOrEmpty(d.ppExpDate)) {
                if (new Date(d.ppIStartDate) > new Date(d.ppExpDate)) {
                    ShowAlert(0, "Passport expiry date must be  greater then passport issue date ");
                    return false;
                }
            }
            if (IsNullOrEmpty(d.ppIStartDate) && IsNullOrEmpty(document.getElementById("idxDob").value)) {
                const dobAge = getAge(document.getElementById("idxDob").value);
                const ppIssueAge = getAge(d.ppIStartDate);
                if (new Date(dobAge) <= new Date(d.ppIStartDate)) {
                    sethasOverridePassportIssueError(true);
                    ShowAlert(0, "Passport issue date must be greater than date of birth");
                    return false;
                } else {
                    sethasOverridePassportIssueError(false);
                }
            } else {
                sethasOverridePassportIssueError(false);
            }
        } else {
            setValue("ppExpDate", null);
            setValue("ppIStartDate", null);
        }
        let invalidDate = false;
        try {
            if (!IsNullOrEmpty(d.dob)) {
                const date = new Date(d.dob);
            }
        } catch (error) {
            invalidDate = true;
        }
        if (invalidDate) {
            ShowAlert(0, "Please select valid date");
            return false;
        }
        if (!IsNullOrEmpty(d.dob)) {
            const user_current_age = getAge(d.dob);
            if (user_current_age <= 17 || user_current_age > 60) {
                if (user_current_age <= 17) {
                    ShowAlert(0, "Age Should be greater than 18 years / Date of birth should be min date of current date for 18 years");
                    return false;
                }
                if (user_current_age > 60) {
                    ShowAlert(0, "Age cannot be more than 60 Years.Please enter correct age");
                    return false;
                }
            }
        }
        let invalidPPI = false;
        let invalidPPEx = false;
        try {
            if (!IsNullOrEmpty(d.ppIStartDate)) {
                const date = new Date(d.ppIStartDate);
            }
        } catch (error) {
            invalidPPI = true;
        }
        try {
            if (!IsNullOrEmpty(d.ppExpDate)) {
                const date = new Date(d.ppExpDate);
            }
        } catch (error) {
            invalidPPEx = true;
        }

        if (invalidPPI) {
            ShowAlert(0, "Please select a valid  passport issue date")
            return false;
        }
        if (invalidPPEx) {
            ShowAlert(0, "Please select a valid  passport expairy date")
            return false;
        }

        if (passportErrorCount) {
            ShowAlert(0, "Passport Number Already exists")
            return false;
        }


        setopenLoader(true);
        try {
            let materialStatusID = 0;
            let religionID = 0;
            let ppiPlace = 0;
            if (selectedOptionFormaterialStatusList && selectedOptionFormaterialStatusList.value) {
                materialStatusID = parseInt(selectedOptionFormaterialStatusList.value);
            }
            if (selectedOptionForReligionList && selectedOptionForReligionList.value) {
                religionID = parseInt(selectedOptionForReligionList.value);
            }
            if (selectdOptionForPPIssuePlace && selectdOptionForPPIssuePlace.value) {
                ppiPlace = parseInt(selectdOptionForPPIssuePlace.value);
            }

            const reqData = {
                ReferenceID: AuthService.getCurrentUser().referenceID,
                DOB: IsNullOrEmpty(d.dob) ? "" : d.dob,
                ReligionID: religionID,
                Gender: IsNullOrEmpty(d.gender) ? "" : d.gender,
                MaterialStatusID: materialStatusID,
                languageXML: langXml,
                PassportNo: IsNullOrEmpty(d.passportNo) ? "" : d.passportNo,
                PassportIssuePlace: ppiPlace,
                PassportIssueDate: IsNullOrEmpty(d.ppIStartDate) ? "" : d.ppIStartDate,
                PassportExpiryDate: IsNullOrEmpty(d.ppExpDate) ? "" : d.ppExpDate
            };
            setopenLoader(true);
            const res = await ProfileService.updatePersonalDetails(reqData);
            if (res.isSuccess) {
                ShowAlert(1, res.message);
                triggerClick(1);
            } else {
                ShowAlert(0, res.message);
            }
        } catch (error) {
        }
        setopenLoader(false);

    }
    const AddNewLanguages = async () => {
        let errCount = 0;
        if (languageSelectedValue.value === "" || languageSelectedValue.value === 0 || languageSelectedValue.value === "Select" || languageSelectedValue.value === undefined) {
            setisShowLanguageErr(true);
            errCount += 1;
        } else {
            setisShowLanguageErr(false);
            errCount += 0;
        }
        if (langProficiencySelectedValue.value === "" || langProficiencySelectedValue.value === 0 || langProficiencySelectedValue.value === "Select" || langProficiencySelectedValue.value === undefined) {
            setisShowLangProficiencyErr(true);
            errCount += 1;
        } else {
            setisShowLangProficiencyErr(false);
            errCount += 0;
        }
        if (errCount === 0) {
            let maxID = 0;
            if (languageData.length > 0) {
                const ids = languageData.map(obj => {
                    return obj.id;
                });
                maxID = Math.max(...ids);
            }
            let langData = [];
            //check if qual  exist
            let exist = false;
            let msg = "";

            if (languageData.length > 0) {
                languageData.filter(function (q) {
                    if (q.langID === parseInt(languageSelectedValue.value)) {
                        msg = "Language already exist";
                        exist = true;
                        return false;
                    }

                });
            }
            if (exist) {
                ShowAlert(0, 'Language already exist');
                return false;
            }

            langData.push({
                id: maxID === 0 ? 1 : maxID + 1,
                langName: languageSelectedValue.label,
                langID: parseInt(languageSelectedValue.value),
                profieciencyID: parseInt(langProficiencySelectedValue.value),
                profieciencyName: langProficiencySelectedValue.label,
            })
            const pData = languageData;

            pData.filter(function (data) {
                if (data.id !== langData[0].id) {
                    langData.push({
                        id: data.id,
                        langName: data.langName,
                        langID: data.langID,
                        profieciencyName: data.profieciencyName,
                        profieciencyID: data.profieciencyID
                    })
                }
            })
            setLanguageData([]);
            setlangProficiencySelectedValue([]);
            setlanguageSelectedValue([]);
            setLanguageData(langData.reverse());
            handleClose();
        } else {
            ShowAlert(0, "Please select language and Proficiency");
        }
    }
    const handleLanguageChange = (selectedOption) => {
        if (selectedOption) {
            setlanguageSelectedValue(selectedOption);
            setisShowLanguageErr(false);
            if (langProficiencySelectedValue.value) {
                setisShowLangProficiencyErr(false);
            } else {
                setisShowLangProficiencyErr(true);
            }
        } else {
            setlanguageSelectedValue([]);
        }
    }
    const handleProficiencyChange = (selectedOption) => {
        if (selectedOption) {
            setlangProficiencySelectedValue(selectedOption);
            setisShowLangProficiencyErr(false);
            if (languageSelectedValue.value) {
                setisShowLanguageErr(false);
            } else {
                setisShowLanguageErr(true);
            }
        } else {
            setlangProficiencySelectedValue([]);
        }
    }
    const handleDeleteLanguage = (id) => {
        setopenLoader(true);
        let tmpData = [];
        for (let i = 0; i < languageData.length; i++) {
            if (languageData[i].id !== id) {
                tmpData.push(languageData[i]);
            }
        }
        setLanguageData(tmpData);
        setopenLoader(false);
    }

    const initLanguageList = async () => {
        const lang = await CandidateRegService.get_Language_DropdownList();
        const lp = await CandidateRegService.get_Lang_Proficiency_DropdownList();
        if (lp.isSuccess) {
            setiLangProficiencyList(JSON.parse(lp.data));
        }
        if (lang.isSuccess) {
            setiLanguageList(JSON.parse(lang.data));
        }


    }

    useEffect(() => {
        initLanguageList();
        if (AuthService.isAuthenticatedUser()) {
            initPersonalDetails();
        } else {
            navigate({
                pathname: '/login',
                search: "?ReturnUrl=/editmyprofile?type=editPersonal",
            });
        }
    }, []);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>
                        {t("Add_Language")}
                    </Modal.Title>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => handleClose()}></button>
                </Modal.Header>
                <Modal.Body>
                    <form method="POST" onSubmit={handleSubmit(AddNewLanguages)}>
                        <input type="hidden" name="ID" id="ID"
                            {...register("ID", {
                            })}
                        />
                        <div className="row">
                            <div className="col-12 form-group">
                                <label htmlFor="" className="form-label">{t("language")}<span className="text-danger ">*</span></label>
                                <Select
                                    placeholder={t("Select_Language")}
                                    onChange={handleLanguageChange}
                                    value={languageSelectedValue}
                                    options={iLanguageList}
                                    isSearchable
                                />
                                {isShowLanguageErr ? <p className='text-danger mt-1 f13' >Please select language</p> : null}
                            </div>
                            <div className="col-12 form-group">
                                <label htmlFor="" className="form-label">{t("Language_Proficiency")}<span className="text-danger ">*</span></label>
                                <Select
                                    placeholder={t("Select_Language_Proficiency")}
                                    onChange={handleProficiencyChange}
                                    value={langProficiencySelectedValue}
                                    options={iLangProficiencyList}
                                    isSearchable
                                />
                                {isShowLangProficiencyErr ? <p className='text-danger mt-1 f13' >Please select proficiency</p> : null}

                            </div>


                        </div>
                        <div className="mt-2">
                            <button type="button" className="btn btn-link" onClick={() => handleClose()}>{t("Close")}</button>
                            <button type="submit" className="btn-primary btn" style={{ float: "right" }}>{t("Submit")}</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
                onClick={handleLoaderClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <form method="POST" onSubmit={handleSubmit(handlePersonalSubmit)}>
                <h1 className="modal-title fs-5" id="personalDetailsModalLabel">{t("Edit_Personal_Details")}</h1><br />
                <button type="button" className="btn-close" onClick={() => cancelClick()} aria-label="Close"></button>


                <div className="row">
                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("DOB")}</label>
                        <div className="input-group input-group-date datepicker date">
                            <input type='date' name='dob' className='form-control' id='idxDob' min = {DOBdate} max={date ? date : TodayDate}
                                {...register("dob", {
                                    onChange: (e) => { handleDateChange(e.target.value) }
                                })}
                            />
                        </div>
                        {isshowDateOFBirthErr ? <p className='text-danger mt-1 f13'>{hasDateOfBirthErrMsg}</p> : null}
                    </div>

                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Religion")}</label>
                        <Select
                            name='religion'
                            placeholder={t("Select")}
                            onChange={handleSelectreligionList}
                            value={selectedOptionForReligionList}
                            options={religionList}
                            isClearable
                        />
                    </div>


                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Gender")}</label>
                        <div className="radio-buttons">
                            <div className="form-check " >
                                <input type="radio" value={"M"} name='gender' style={{ cursor: "pointer" }}
                                    {...register("gender", {
                                    })}
                                />&nbsp;Male &nbsp;&nbsp;
                                <input type="radio" value={"F"} name='gender' style={{ cursor: "pointer" }}
                                    {...register("gender", {
                                    })}
                                />&nbsp;Female
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Marital_Status")}</label>
                        <Select
                            name='MaritalStatus'
                            placeholder={t("Select")}
                            onChange={handleSelectmaterialStatusList}
                            value={selectedOptionFormaterialStatusList}
                            options={materialStatusList}
                            isClearable
                        />
                    </div>



                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Passport_No")}</label>
                        <input type="text" className='form-control' name='passportNo' maxLength={15}

                            {...register("passportNo",
                                {
                                    onChange: (e) => { handlePassportNoChange(e.target.value) },
                                    onBlur: (e) => { handlePassportNoChange(e.target.value) }
                                })
                            }
                        />
                        {passportAvailableMessage === "" ? null : <span className="f13" style={{ color: passporteAVColor }} >{passportAvailableMessage}<br /></span>}
                        {isShowPassportError ? <p className='text-danger f13'>Please enter valid passport no</p> : null}
                    </div>
                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Passport_Issue_place")}</label>
                        <Select
                            placeholder={t("Select")}
                            onChange={handleSelecPPissueList}
                            value={selectdOptionForPPIssuePlace}
                            options={locationList}
                            isClearable
                            isDisabled={selectState}
                            required={true}
                        />
                    </div>



                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Passport_Issue_Date")}</label>
                        <div className="input-group input-group-date datepicker date">
                        <input type="date" className='form-control' name='ppIStartDate' id='idxppIStartDate' min={passportMinStartDate? passportMinStartDate : DOBdate} max={TodayDate} value={pIssueDate}
    
                                {...register("ppIStartDate",
                                    {
                                        onChange: (e) => { handlePassportIssueDateChange(e.target.value) }
                                    })
                                }
                                required={true}
                            />
                        </div>
                        {hasPassportIssueError ? <span className='text-danger'>Please enter passport issue date</span> : null}
                        {hasOverridePassportIssueError ? <span className='text-danger'>Passport issue date must be greater than date of birth</span> : null}

                    </div>

                    <div className="col-lg-6 form-group">
                        <label htmlFor="" className="form-label">{t("Passport_Expiry_Date")}</label>
                        <div className="input-group input-group-date datepicker date">
                            <input type="date" className='form-control' name='ppExpDate' min={passportMinExpDate? passportMinExpDate : DOBdate} max={maxPassportEndDate} value={pExpiryDate}
                                id='idxPEndDate'
                                {...register("ppExpDate",
                                    {
                                        onChange: (e) => { handlePassporExpairyDateChange(e.target.value) },
                                    })
                                }
                                required={true}
                            />
                        </div>
                        {hasPassportExpairyError ? <span className='text-danger'>Please enter passport expiry date</span> : null}
                    </div>
                    <div className="col-12 form-group">
                        <div className="header-label-action">
                            <label htmlFor="" className="form-label">{t("Add_Language_Multiple_Language")}</label>
                            <button type="button" className='btn btn-sm btn-primary' onClick={() => setshow(true)} style={{ fontSize: "1rem" }}><i className="bx bx-plus"  ></i>{t("Add")}</button>

                        </div>


                        <div className="col-lg-12 form-group">
                            {
                                languageData.length > 0 ?
                                    <table className='table table-striped' style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}>
                                        <thead>
                                            <tr>

                                                <th>{t("language")}</th>
                                                <th>{t("Language_Proficiency")}</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {languageData.map((lang, i) =>

                                                <tr key={i} >

                                                    <td>{lang.langName}</td>
                                                    <td>{lang.profieciencyName}</td>
                                                    <td>
                                                        <button type='button' className='btn btn-link'
                                                            onClick={() => handleDeleteLanguage(lang.id)}><i className="bx bxs-trash" ></i>
                                                        </button>
                                                    </td>

                                                </tr>
                                            )}


                                        </tbody>
                                    </table> : null
                            }

                        </div>

                    </div>
                </div>

                <button type="button" className="btn btn-link" onClick={() => cancelClick()}>{t("Cancel")}</button>
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

export default EditPersonal