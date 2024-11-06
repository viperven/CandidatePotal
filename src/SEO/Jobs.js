import React, { useEffect, useState } from "react";
import { json, useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthService } from "../Services/AuthService";
import { AdvanceSearchService } from "../Services/AdvanceSearchService";
import { ProfileService } from "../Services/Profile/ProfileService";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { ProfileDashboardService } from '../Services/ProfileDashboardservice';
import ApplyJobModal from '../Components/Main/Jobs/ApplyJobModal';
import { Modal, ModalBody } from 'react-bootstrap';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import noData from '../assets/imgs/no-data.svg';
import LoginModal from '../Components/LogIn/LoginModal';
import Layout from '../Layout/Layout';
import Pagination from '@mui/material/Pagination';
import { GetjobPostingsOnAssignmentIDService } from '../Services/GetjobPostingsOnAssignmentIDService';
import { useTranslation } from 'react-i18next';
import { PausePresentation } from "@mui/icons-material";
import { CommonService } from "../Services/CommonService";
import { Helmet } from "react-helmet";

function Jobs() {
    const { t } = useTranslation();
    const [keywordseo, setkeyword] = useState("");
    const searchParms = useParams();
    const search = useLocation().search;
    const loc = useLocation();
    const navigate = useNavigate();
    const [startIndex, setstartIndex] = useState(1);
    const [pageCount, setpageCount] = useState(0);
    const [recordcount, setrecordcount] = useState(0);
    const [openLoader, setopenLoader] = React.useState(false);
    const [searchResult, setsearchResult] = useState([]);
    const [resultByAssignmentId, setResultByAssignmentId] = useState([]);
    const [SearchResultLoc, setSearchResultLoc] = useState([]);
    const [SearchResultExp, setSearchResultExp] = useState([]);
    const [SearchResultSalary, setSearchResultSalary] = useState([]);
    const [searchResultText, setsearchResultText] = useState("");
    const [filterlocation, setfilterLocation] = useState("");
    const [filterExperienceFrom, setfilterExperienceFrom] = useState(0);
    const [filterExperienceTo, setfilterExperienceTo] = useState(0);
    const [href, sethref] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLoginClose = () => setloginShow(false);
    const handleLoginShow = () => setloginShow(true);
    const [loginShow, setloginShow] = useState(false);
    const [orderBy, setOrderBy] = useState("");
    const [iKeyWord, setiKeyWord] = useState("");
    const [selected, setSelected] = useState([]);
    const [iLastClientClickValue, setiLastClientClickValue] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isMobile2, setIsMobile2] = useState(window.innerWidth <= 992);

    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',

        boxShadow: 24,
        p: 4,
    };
    const itemsPerPage = 10;
    const isNullOrEmpty = (v) => {
        if (v === "" || v === null || v === undefined) {
            return true;
        } else {
            return false;
        }
    }
    const hasWhiteSpace = (v) => {
        return v.indexOf(' ') >= 0;
    }
    const handleChange = (e, p) => {
        setstartIndex(p);
        handleCheckClick(false);
    };
    const handleGetJobDetailClick = async (jpID, title) => {
        let jobtitle = title.replace(/\s+/g, '-');
        var href = "/jobdetails" + "?jobs=" + jobtitle + "/" + jpID;
        sethref(href);
    }
    const handleCheckClick = (isCheckAllRequest) => {
        let checkboxes = document.getElementsByClassName('jckeckbox');
        let newSelected = [];
        if (isCheckAllRequest) {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
                newSelected.push(checkboxes[i].value);
                setSelected(newSelected);
                let getClass = document.getElementsByClassName("form-check");
                for (let j = 0; j < getClass.length; j++) {
                    getClass[j].classList.add("selected");
                }
            }
        }
        else {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
                newSelected.push(checkboxes[i].value);
                setSelected(newSelected);
                let getClass = document.getElementsByClassName("form-check");
                for (let j = 0; j < getClass.length; j++) {
                    getClass[j].classList.remove("selected");
                }
            }
        }
    }
    const handleCheckBoxClick = async (jpID, htmlID) => {
        const selectedIndex = selected.indexOf(jpID);
        if (document.getElementById(htmlID).parentElement.classList.contains('selected')) {
            document.getElementById(htmlID).parentElement.classList.remove("selected");
        } else {
            document.getElementById(htmlID).parentElement.classList.add("selected");
        }
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, jpID);

        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);

    }
    const handleFilterLocationClick = () => {
        setstartIndex(1);
        let checkboxes = document.getElementsByClassName('locchekcbox');
        let locids = "";
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                locids += checkboxes[i].value + ",";
            }
        }
        locids = locids.substring(0, locids.length - 1);
        setfilterLocation(locids);
        if (locids) {
            document.getElementById("locbtn").disabled = true;
            document.getElementById("locbtn").style.cursor = "not-allowed";
            filterLocationOrExperience(locids, null);
            let locCheckBoxes = document.getElementsByClassName('locchekcbox');
            for (let i = 0; i < locCheckBoxes.length; i++) {
                locCheckBoxes[i].disabled = true;
                locCheckBoxes[i].checked = true;
            }
        } else {
            document.getElementById("locbtn").disabled = false;
            document.getElementById("locbtn").style.cursor = "pointer";
        }
    }
    const handleSearhFilterResetClick = (IsLoc, IsExp, IsSal) => {
        // let searchParms = [];//getSearchParms();
        // searchParms.Location = "";
        // searchParms.ExperienceFrom = 0;
        // searchParms.ExperienceTo = 0;
        // searchParms.StartIndex = 1;
        // searchParms["IsLoc"] = IsLoc;
        // searchParms["IsExp"] = IsExp;
        // setfilterLocation("");
        // setfilterExperienceFrom(0);
        // setfilterExperienceTo(0);
        // setstartIndex(1);
        // document.getElementById("locbtn").disabled = false;
        // document.getElementById("locbtn").style.cursor = "pointer";
        // let checkBoxes = document.getElementsByClassName("resetCheckBox");
        // for (let i = 0; i < checkBoxes.length; i++) {
        //     checkBoxes[i].checked = false;
        //     checkBoxes[i].disabled = false;
        // }
        const locCheckBoxes = document.getElementsByClassName('locchekcbox');
        for (let i = 0; i < locCheckBoxes.length; i++) {
            locCheckBoxes[i].disabled = false;
            locCheckBoxes[i].checked = false;
        }
        const expCheckBoxes = document.getElementsByClassName('expchechbox');
        for (let i = 0; i < expCheckBoxes.length; i++) {
            expCheckBoxes[i].disabled = false;
            expCheckBoxes[i].checked = false;
        }
        initSearchResult();

    }
    const handleFilterExpClick = () => {
        setstartIndex(1);
        let expCheckBoxes = document.getElementsByClassName('expchechbox');
        let selectedSal = [];
        for (let i = 0; i < expCheckBoxes.length; i++) {
            if (expCheckBoxes[i].checked) {
                let splitSalArray = expCheckBoxes[i].value.split("-");
                for (let j = 0; j < splitSalArray.length; j++) {
                    selectedSal.push(splitSalArray[j])
                }
            }
        }
        let IsCustomOrSplExperience = false;
        if (selectedSal.length > 0) {
            selectedSal.filter(function (d, i) {
                if (d.includes("more than")) {
                    selectedSal.push(selectedSal[i].replace("more than", "").trim())
                    selectedSal.splice(i, 1);
                    IsCustomOrSplExperience = true;
                }
            })
            const uniqueExp = selectedSal.filter(onlyUnique);
            const minExp = uniqueExp.min();
            const maxExp = uniqueExp.max();
            if (IsCustomOrSplExperience) {
                searchParms["ExperienceFrom"] = minExp;
                searchParms["ExperienceTo"] = 0;
                setfilterExperienceFrom(minExp);
                setfilterExperienceTo(0);
            } else {
                searchParms["ExperienceFrom"] = minExp;
                searchParms["ExperienceTo"] = maxExp;
                setfilterExperienceFrom(minExp);
                setfilterExperienceTo(maxExp);
            }
            searchParms.IsCustomOrSplExperience = IsCustomOrSplExperience;
            let expCheckBoxes = document.getElementsByClassName('expchechbox');
            for (let i = 0; i < expCheckBoxes.length; i++) {
                expCheckBoxes[i].disabled = true;
                expCheckBoxes[i].checked = true;
            }
            filterLocationOrExperience(null, minExp);
        }
    }
    const handleFilterSalClick = () => {
        let salCheckBoxes = document.getElementsByClassName('salchechbox');
        let searchParms = [];// getSearchParms();
        let selectedSal = [];
        for (let i = 0; i < salCheckBoxes.length; i++) {
            if (salCheckBoxes[i].checked) {
                let splitSalArray = salCheckBoxes[i].value.split("-");
                for (let j = 0; j < splitSalArray.length; j++) {
                    selectedSal.push(splitSalArray[j])
                }
            }
        }
        let IsCustomOrSplSal = false;
        if (selectedSal.length > 0) {
            selectedSal.filter(function (d, i) {
                if (d.includes("more than")) {
                    selectedSal.push(selectedSal[i].replace("more than", "").trim())
                    selectedSal.splice(i, 1);
                    IsCustomOrSplSal = true;
                }
            })
            const uniqueSal = selectedSal.filter(onlyUnique);
            const minSal = uniqueSal.min();
            const maxSal = uniqueSal.max();
            searchParms.IsCustomOrSplSalary = IsCustomOrSplSal;
            searchParms["YearlySalary"] = maxSal;
            if (IsCustomOrSplSal) {
                searchParms[""] = 0;
            }
            initSearchResult(searchParms);
            let expCheckBoxes = document.getElementsByClassName('salchechbox');
            for (let i = 0; i < expCheckBoxes.length; i++) {
                expCheckBoxes[i].disabled = true;
                expCheckBoxes[i].checked = true;
            }
        }
    }
    const OrderbyClick = (order) => {

        initSearchResult(iLastClientClickValue, order);
    }
    const handleFilterClientClick = (clientID) => {
        // const searchParms = "";//getSearchParms();
        // if (searchParms && clientID) {
        //     searchParms.ClientID = clientID;
        //     searchParms.StartIndex = 1;
        //     initSearchResult(searchParms);
        // }
        setiLastClientClickValue(clientID);
        initSearchResult(clientID);
    }
    const handleApplyJOBClick = async () => {
        if (AuthService.isAuthenticatedUser()) {
            let checkboxes = document.getElementsByClassName('jckeckbox');
            let jobIDs = [];
            let selectedJobCount = 0;
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedJobCount += 1;
                    jobIDs.push(checkboxes[i].value);
                }
            }
            if (jobIDs.length > 0) {
                setSelected(jobIDs);
                handleOpen();
            } else {
                ShowAlert(0, "Please select one job");
            }
            initSearchResult(null, null);
        } else {
            handleLoginShow();
            navigate({
                pathname: "/jobs/" + window.location.href.split("/")[4],
            })
        }
    }

    const handleSaveJobClick = async () => {
        if (AuthService.isAuthenticatedUser()) {
            let checkboxes = document.getElementsByClassName('jckeckbox');
            let jobIDs = [];
            let selectedJobCount = 0;
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedJobCount += 1;
                    jobIDs.push(checkboxes[i].value);
                }
            }
            if (jobIDs.length > 0) {
                const res = await ProfileDashboardService.saveSelectJob(jobIDs);
                if (res.isSuccess) {
                    ShowAlert(1, res.message);
                } else {
                    ShowAlert(0, res.message);
                }
                initSearchResult(null, null);
            } else {
                ShowAlert(0, "Please select one job");
            }
        } else {
            handleLoginShow();
            // navigate({
            //     pathname: "/advancesearchresult",
            //     search: "?jobs=" + qs,
            // })


        }

    }
    const handleSaveSearchClick = async () => {
        if (AuthService.isAuthenticatedUser()) {
            const inputText = document.getElementById('searchID').value;
            if (inputText !== null && inputText !== "" && inputText !== undefined) {
                let searchQueryParms = "";// getSearchParms();
                searchQueryParms["SearchName"] = inputText;
                searchQueryParms["ReferenceID"] = AuthService.getCurrentUser().referenceID;
                const res = await AdvanceSearchService.saveSearch(searchQueryParms);
                if (res.isSuccess) {
                    ShowAlert(1, res.message);
                } else {
                    ShowAlert(0, res.message);
                }
            } else {
                ShowAlert(0, "Please enter a valid name");
            }
        } else {
            const qs = new URLSearchParams(search).get('qs');
            if (qs) {
                navigate({
                    pathname: '/login',
                    search: "?ReturnUrl=/search/AdvanceSearchResult?qs=" + qs,
                })
            } else {
                navigate('/login');
            }
        }
    }
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    Array.prototype.max = function () {
        return Math.max.apply(null, this);
    };
    Array.prototype.min = function () {
        return Math.min.apply(null, this);
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
    const CloseCandidateModal = (value) => {
        if (value === 1) {
            setopenLoader(false);
            handleClose();
            let checkboxes = document.getElementsByClassName('jckeckbox');
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checkboxes[i].checked = false;
                }
            }
        }
    }
    const CloseChildModal = (value, isRefreshList) => {
        if (value === 1) {
            handleClose()
        }
        if (isRefreshList) {
            handleClose();
        }
    }
    const buildSearchResultTest = () => {
        let obj = "";
        try {
            var url = window.location.search;
            let queryObj = JSON.parse('{"' + url.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
            if (queryObj.Keywords) {
                obj += queryObj.Keywords.replace(/%20/g, " ").replace(/%E2%80%93/g, " ") + ",";
            } else {
                obj += "";
            }
            if (queryObj.IndName) {
                obj += queryObj.IndName.replace(/%20/g, " ") + ",";
            } else {
                obj += "";
            }
            if (queryObj.JobCode) {
                obj += queryObj.JobCode.replace(/%20/g, "") + ",";
            } else {
                obj += "";
            }
            if (queryObj.locName) {
                obj += queryObj.locName.replace(/%20/g, " ") + ",";
            } else {
                obj += "";
            }
            if (queryObj.keyAny === "0") {
                obj += "(Any Words),";
            } else {
                obj += "(All Words),";
            }
            // if (queryObj.YearlySalary) {
            //     obj += queryObj.YearlySalary;
            // } else {
            //     obj += "";
            // }
            // let exp1 = queryObj.ExperienceFrom;
            // let exp2 = queryObj.ExperienceTo;
            // let experience = exp1 + "to" + exp2 + "In Year";
            // if (experience) {
            //     obj += experience;
            // } else {
            //     obj += "";
            // }
        } catch (error) {

        }
        obj = obj.substring(0, obj.length - 1)
        setsearchResultText(obj);
    }
    const CloseModal = () => {
        handleLoginClose()
    }

    const initFilterLocation = async (locNames) => {
        let locIDs = "";
        const loc = await ProfileService.getLocationList();
        if (locNames !== "" && locNames !== null && locNames !== undefined) {
            const splitLoc = locNames.split(",");
            loc.filter(function (l) {
                for (let i = 0; i < splitLoc.length; i++) {
                    if (l.label.trim().toLocaleLowerCase() === splitLoc[i].toLocaleLowerCase()) {
                        locIDs += l.value + ",";
                    }
                }
            });
            locIDs = locIDs.substring(0, locIDs.length - 1);
            locIDs = Array.from(new Set(locIDs.split(','))).toString();
        }
        return locIDs;
    }
    const replaceSpecialCharFromUrl = (v) => {
        v.replace(/ /g, '').replace("%20", "-").replace(" ", '-').replace("%21", "")
            .replace("%22",).replace("%23", "")
            .replace("%24",).replace("%25", "")
            .replace("%26",).replace("%27", "")
            .replace("%28",).replace("%29", "")
            .replace("%2A", "").replace("%2B", "")
            .replace("%2C", "").replace("%2E", "")
            .replace("$", "").replace("%30", "")
            .replace("%31", "").replace("%32", "")
            .replace("%33", "").replace("%34", "")
            .replace("%35", "").replace("%36", "")
            .replace("%37", "").replace("%38", "")
            .replace("%37", "").replace("%38", "").replace("%39", "")
            .replace("0", "").replace("1", "").replace("2", "").replace("3", "")
            .replace("4", "").replace("5", "").replace("6", "")
            .replace("7", "").replace("8", "").replace("9", "");
        return v.toLocaleLowerCase();
    }
    const getUrlParms = (url, parmName) => {
        try {
            if (isNullOrEmpty(parmName)) {
                return "";
            }
            return new URLSearchParams(url).get(parmName);
        } catch (error) {
            return "";
        }
    }
    const initSearchResult = async (clientID, order) => {
        try {
            setopenLoader(true);
            let qs = "";
            try {
                qs = window.location.href.split("/")[4].split('?')[1];
            } catch (error) {
                qs = "";
            }
            if (isNullOrEmpty(qs)) {
                qs = "";
            }
            let searchQuery = decodeURIComponent(window.location.href.split("/")[4].split('?')[0]);
            searchQuery = replaceSpecialCharFromUrl(searchQuery);
            searchQuery = searchQuery.replace(/[/]+/g, '-').replace(/[ ]+/g, '');
            let spaceReplaceUrl = searchQuery.replace(/ /g, '-');
            spaceReplaceUrl = spaceReplaceUrl.replace(/[ ]+/g, '');
            const commaFilterUrl = Array.from(new Set(spaceReplaceUrl.split(','))).toString();
            let finalUrl = commaFilterUrl.split(",").join('-').trim();
            finalUrl = finalUrl.replace(/[-]+/g, '-');
            navigate("/jobs/" + finalUrl + "?" + qs, { replace: true });
            let url = window.location.href.split("/")[4].split('?')[0];
            url = url.replace(/[/]+/g, '-').replace(/[ ]+/g, '');
            url = replaceSpecialCharFromUrl(url);
            var splitQuery = url.split("-");
            const inIndex = splitQuery.indexOf("in", 0);
            const keyWordsArray = splitQuery.slice(0, inIndex);
            const removeFilters = ["in", "jobs", "job"];
            let keyword = "";
            const locSplitQuery = splitQuery.slice(inIndex + 1, splitQuery.length);
            splitQuery = keyWordsArray.filter(item => !removeFilters.includes(item.toLocaleLowerCase()));
            for (let i = 0; i < splitQuery.length; i++) {
                keyword += " " + splitQuery[i];
            }
            let matchLocs = await initFilterLocation(locSplitQuery.toString());
            const cUrl = window.location.href.split("/")[4].split("?")[1];
            const filterQueryLocations = getUrlParms(cUrl, "filterLocationIDs");
            if (!isNullOrEmpty(filterQueryLocations)) {
                if (!isNullOrEmpty(matchLocs)) {
                    matchLocs += "," + filterQueryLocations;
                } else {
                    matchLocs = filterQueryLocations;
                }
            }
            let expFrom = "";
            let expTo = "";
            if (!isNullOrEmpty(getUrlParms(cUrl, "filterExpFrom"))) {
                expFrom = getUrlParms(cUrl, "filterExpFrom");
            } else {
                expFrom = getUrlParms(cUrl, "expFrom");
            }
            if (!isNullOrEmpty(getUrlParms(cUrl, "filterExpTo"))) {
                expTo = getUrlParms(cUrl, "filterExpTo");
            }
            const reqData = {
                IsAdvanceSearch: false,
                Keywords: keyword,
                AllOrAnyKeywords: "true",
                Location: matchLocs,
                Searchin: "",
                JobsPostedWithin: "",
                JobCode: isNullOrEmpty(getUrlParms(cUrl, "jobCode")) ? "" : getUrlParms(cUrl, "jobCode"),
                Industry: isNullOrEmpty(getUrlParms(cUrl, "industryId")) ? "" : getUrlParms(cUrl, "industryId"),
                FunctionalArea: "",
                Specialization: "",
                Qualification: "",
                QualificationSpecialization: "",
                YearlySalary: "",
                ExperienceFrom: isNullOrEmpty(expFrom) ? 0 : parseInt(expFrom),
                ExperienceTo: isNullOrEmpty(expTo) ? 0 : parseInt(expTo),
                userId: AuthService.isAuthenticatedUser() ? AuthService.getCurrentUser().userId : "",
                OrderbyOption: !isNullOrEmpty(order) ? order : "",
                StartIndex: startIndex,
                ClientID: isNullOrEmpty(clientID) ? 0 : parseInt(clientID),
                Counytry: ""
            }
            console.log(reqData)
            const result = await AdvanceSearchService.JobSearch(reqData);
            setpageCount(Math.ceil(result.recordsTotal / itemsPerPage));
            setrecordcount(Math.ceil(result.recordsTotal));
            result.searchResultsString ? setsearchResult(JSON.parse(result.searchResultsString)) : setsearchResult([]);
            result.searchResultLoc ? setSearchResultLoc(JSON.parse(result.searchResultLoc)) : setSearchResultLoc([]);
            result.searchResultExp ? setSearchResultExp(JSON.parse(result.searchResultExp)) : setSearchResultExp([]);
            result.searchResultSalary ? setSearchResultSalary(JSON.parse(result.searchResultSalary)) : setSearchResultSalary([]);
            setsearchResultText(keyword);
            setTimeout(() => {
                const locEl = document.getElementsByClassName("locchekcbox");
                if (!isNullOrEmpty(filterQueryLocations)) {
                    const splitQueryLoc = filterQueryLocations.split(",");
                    for (let i = 0; i < splitQueryLoc.length; i++) {
                        for (let j = 0; j < locEl.length; j++) {
                            if (splitQueryLoc[i] === locEl[j].value) {
                                locEl[j].checked = true;
                            }
                        }
                    }
                }
            }, 200);
            setopenLoader(false);
        } catch (error) {
            setopenLoader(false);
            console.log(error)
        }
    }
    const filterLocationOrExperience = async (loc, exp) => {
        try {
            const cUrl = window.location.href.split("/")[4];
            const reqData = {
                IsAdvanceSearch: false,
                Keywords: iKeyWord,
                AllOrAnyKeywords: "true",
                Location: loc ? loc : "",
                Searchin: "",
                JobsPostedWithin: "",
                JobCode: isNullOrEmpty(getUrlParms(cUrl, "jobCode")) ? "" : getUrlParms(cUrl, "jobCode"),
                Industry: isNullOrEmpty(getUrlParms(cUrl, "industryId")) ? "" : getUrlParms(cUrl, "industryId"),
                FunctionalArea: "",
                Specialization: "",
                Qualification: "",
                QualificationSpecialization: "",
                YearlySalary: "",
                ExperienceFrom: exp ? exp : 0,
                ExperienceTo: 0,
                userId: "",
                StartIndex: startIndex,
                ClientID: 0,
            }
            // if (searchResult.length === 0) {
            //     document.getElementById("noRecord").style.display = "none";
            // } else {
            //     document.getElementById("noRecord").style.display = "flex";
            // }
            const result = await AdvanceSearchService.JobSearch(reqData);
            setpageCount(Math.ceil(result.recordsTotal / itemsPerPage));
            setrecordcount(Math.ceil(result.recordsTotal));
            result.searchResultsString ? setsearchResult(JSON.parse(result.searchResultsString)) : setsearchResult([]);
            result.searchResultLoc ? setSearchResultLoc(JSON.parse(result.searchResultLoc)) : setSearchResultLoc([]);
            result.searchResultExp ? setSearchResultExp(JSON.parse(result.searchResultExp)) : setSearchResultExp([]);
            result.searchResultSalary ? setSearchResultSalary(JSON.parse(result.searchResultSalary)) : setSearchResultSalary([]);
            setsearchResultText(iKeyWord)
            setopenLoader(false);
        } catch (error) {
            setopenLoader(false);
            console.log(error)
        }
    }
    const handleFilterLocationCheckBoxClick = () => {
        
        const locEl = document.getElementsByClassName("locchekcbox");
        let checkedLoc = "";
        for (let i = 0; i < locEl.length; i++) {
            if (locEl[i].checked) {

                checkedLoc += locEl[i].value + ",";
            }
        }
        checkedLoc = checkedLoc.substring(checkedLoc.length - 1, 0);
        let expFromTo = "";
        const expFrom = getUrlParms(window.location.href.split("/")[4].split("?")[1], "filterExpFrom");
        const expTo = getUrlParms(window.location.href.split("/")[4].split("?")[1], "filterExpTo");
        if (!isNullOrEmpty(expFrom)) {
            if (!isNullOrEmpty(expTo)) {
                expFromTo = expFrom + "-" + expTo;
            } else {
                expFromTo = expFrom;
            }
        }
        if (!isNullOrEmpty(expFromTo)) {
            if (!isNullOrEmpty(checkedLoc)) {
                const splitExp = expFromTo.split("-");
                const url = window.location.href.split("/")[4].split("?")[0] + get_ExtraParms_Except_CurrentFilters() + "filterLocationIDs=" + checkedLoc + "&filterExpFrom=" + (splitExp.length > 0 ? splitExp[0] : 0) + "&filterExpTo=" + (splitExp.length > 1 ? splitExp[1] : 0);
                navigate("/jobs/" + url, { replace: true });
            } else {
                const splitExp = expFromTo.split("-");
                const url = window.location.href.split("/")[4].split("?")[0] + get_ExtraParms_Except_CurrentFilters() + "filterExpFrom=" + (splitExp.length > 0 ? splitExp[0] : 0) + "&filterExpTo=" + (splitExp.length > 1 ? splitExp[1] : 0);
                navigate("/jobs/" + url, { replace: true });
            }
        } else {
            if (!isNullOrEmpty(checkedLoc)) {
                const url = window.location.href.split("/")[4].split("?")[0] + get_ExtraParms_Except_CurrentFilters() + "filterLocationIDs=" + checkedLoc;
                navigate("/jobs/" + url, { replace: true });
            } else {
                const url = window.location.href.split("/")[4].split("?")[0] + get_ExtraParms_Except_CurrentFilters();
                navigate("/jobs/" + url, { replace: true });
            }
        }
        initSearchResult(null, null);
        if (isMobile2) {
            closeNav();
        }
        setstartIndex(1);
    }
    const handleResetFilterLocationButtonClick = () => {
        let expFromTo = "";
        const expFrom = getUrlParms(window.location.href.split("/")[4].split("?")[1], "filterExpFrom");
        const expTo = getUrlParms(window.location.href.split("/")[4].split("?")[1], "filterExpTo");
        if (!isNullOrEmpty(expFrom)) {
            if (!isNullOrEmpty(expTo)) {
                expFromTo = expFrom + "-" + expTo;
            } else {
                expFromTo = expFrom;
            }
        }
        const splitExp = expFromTo.split("-");
        if (!isNullOrEmpty(expFromTo) && splitExp.length > 0) {
            const url = window.location.href.split("/")[4].split("?")[0] + get_ExtraParms_Except_CurrentFilters() + "filterExpFrom=" + (splitExp.length > 0 ? splitExp[0] : 0) + "&filterExpTo=" + (splitExp.length > 1 ? splitExp[1] : 0);
            navigate("/jobs/" + url, { replace: true });
        } else {
            const url = window.location.href.split("/")[4].split("?")[0] + get_ExtraParms_Except_CurrentFilters().replace("&", "");
            navigate("/jobs/" + url, { replace: true });
        }
        initSearchResult(null, null);
        const locEl = document.getElementsByClassName("locchekcbox");
        for (let i = 0; i < locEl.length; i++) {
            locEl[i].checked = false;
        }
        if (isMobile2) {
            closeNav();
        }
    }
    const handleFilterExperienceBoxClick = () => {

        const expEl = document.getElementsByClassName("expchechbox");
        let checkedExp = "";
        for (let i = 0; i < expEl.length; i++) {
            if (expEl[i].checked) {
                const v = expEl[i].value.replace("more than", "").trim();
                checkedExp += v + ",";
            }
        }
        checkedExp = checkedExp.substring(checkedExp.length - 1, 0);
        const filterLocationIDs = getUrlParms(window.location.href.split("/")[4].split("?")[1], "filterLocationIDs");
        if (!isNullOrEmpty(filterLocationIDs)) {
            if (!isNullOrEmpty(checkedExp)) {
                const splitExp = checkedExp.split("-");
                const url = window.location.href.split("/")[4].split("?")[0] + get_ExtraParms_Except_CurrentFilters() + "filterLocationIDs=" + filterLocationIDs + "&filterExpFrom=" + (splitExp.length > 0 ? splitExp[0] : 0) + "&filterExpTo=" + (splitExp.length > 1 ? splitExp[1] : 0);
                navigate("/jobs/" + url, { replace: true });
            } else {
                const url = window.location.href.split("/")[4].split("?")[0] + get_ExtraParms_Except_CurrentFilters() + "filterLocationIDs=" + filterLocationIDs;
                navigate("/jobs/" + url, { replace: true });
            }
        } else {
            if (!isNullOrEmpty(checkedExp)) {
                const splitExp = checkedExp.split("-");
                const url = window.location.href.split("/")[4].split("?")[0] + get_ExtraParms_Except_CurrentFilters() + "filterExpFrom=" + (splitExp.length > 0 ? splitExp[0] : 0) + "&filterExpTo=" + (splitExp.length > 1 ? splitExp[1] : 0);
                navigate("/jobs/" + url, { replace: true });
            } else {
                const url = window.location.href.split("/")[4].split("?")[0] + get_ExtraParms_Except_CurrentFilters().replace("&", "");
                navigate("/jobs/" + url, { replace: true });
            }
        }
        initSearchResult(null, null);
        const expEl1 = document.getElementsByClassName("expchechbox");
        for (let i = 0; i < expEl1.length; i++) {
            expEl1[i].disabled = true;
        }
        if (isMobile2) {
            closeNav();
        }
        setstartIndex(1);

    }
    const handleResetFilterExpButtonClick = () => {
        const filterLocationIDs = getUrlParms(window.location.href.split("/")[4].split("?")[1], "filterLocationIDs");
        if (!isNullOrEmpty(filterLocationIDs)) {
            const url = window.location.href.split("/")[4].split("?")[0] + get_ExtraParms_Except_CurrentFilters() + "filterLocationIDs=" + filterLocationIDs;
            navigate("/jobs/" + url, { replace: true });
        } else {
            const url = window.location.href.split("/")[4].split("?")[0] + get_ExtraParms_Except_CurrentFilters().replace("&", "");
            navigate("/jobs/" + url, { replace: true });
        }
        initSearchResult(null, null);
        const expEl = document.getElementsByClassName("expchechbox");
        for (let i = 0; i < expEl.length; i++) {
            expEl[i].checked = false;
            expEl[i].disabled = false;
        }
        if (isMobile2) {
            closeNav();
        }
    }
    const get_ExtraParms_Except_CurrentFilters = () => {
        let qs = "";
        setiLastClientClickValue("");
        try {
            const url = window.location.href.split("/")[4].split("?")[1];
            const jobCode = getUrlParms(url, "jobCode");
            const industryId = getUrlParms(url, "industryId");
            const expFrom = getUrlParms(url, "expFrom");
            if (!isNullOrEmpty(jobCode)) {
                qs += "?jobCode=" + jobCode;
                if (!isNullOrEmpty(industryId)) {
                    qs += "&industryId=" + industryId;
                }
                if (!isNullOrEmpty(expFrom)) {
                    qs += "&expFrom=" + expFrom;
                }
                qs += "&";
            }
            else if (!isNullOrEmpty(industryId)) {
                qs = "";
                qs += "?industryId=" + industryId;
                if (!isNullOrEmpty(jobCode)) {
                    qs += "&jobCode=" + jobCode;
                }
                if (!isNullOrEmpty(expFrom)) {
                    qs += "&expFrom=" + expFrom;
                }
                qs += "&";
            } else if (!isNullOrEmpty(expFrom)) {
                qs = "";
                qs += "?expFrom=" + expFrom;
                if (!isNullOrEmpty(jobCode)) {
                    qs += "&jobCode=" + jobCode;
                }
                if (!isNullOrEmpty(industryId)) {
                    qs += "&industryId=" + industryId;
                }
                qs += "&";
            }
        } catch (error) {
            qs = "";
        }
        if (isNullOrEmpty(qs)) {
            qs += "?";
        }
        return qs;
    }
    console.log(searchResult)
    useEffect(() => {
        initSearchResult(null, null);
        window.scrollTo(0, 0);
    }, [startIndex, itemsPerPage, loc.pathname])
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile2(window.innerWidth <= 992);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    function closeNav() {
        document.getElementById("myNav").style.width = "0%";
        document.getElementById("myNav").style.left = "-25px";
    }
    function openNav() {
        console.log("clicks");

        document.getElementById("myNav").style.width = "100%";
        document.getElementById("myNav").style.left = "0%";
    }
    const [jobPathTitle, setjobPathTitle] = useState('');
    useEffect(() => {
        const path = window.location.pathname;
        const pathParts = path.split('/');
        if (pathParts.length > 2) {
            setjobPathTitle(pathParts[2]);
        }
    }, []);


    return (
        <>
            <Helmet>
                <title>HuntsJob - Jobs - {jobPathTitle}</title>
                <meta name="description" content={jobPathTitle + " Apply Jobs - Save Jobs"} />
            </Helmet>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Modal
                show={loginShow}
                size='lg'
                onHide={handleLoginClose}
                animation={true}
            >
                <LoginModal CallbackRes={CloseModal} />
            </Modal>
            <Modal
                show={open}
                size='lg'
                onHide={handleClose}
                animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("Details_For_Apply")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ApplyJobModal
                        jobPostingID={selected}
                        TriggerModalClose={CloseChildModal}
                        TriggerCloseModal={CloseCandidateModal}
                        IsApplied={true}
                    /></Modal.Body>

            </Modal>
            <Layout>

                <section style={{ padding: "0.5rem" }}>
                    <div className="container">
                        <div className="row">
                            {/* <div className="col-lg-4 mb-3">
                                <div className="card card-filter shadow-sm">
                                    
                                    <div className="card-body">
                                        <div className="card-body-header">
                                            <span style={{ fontSize: "1.125rem", color: "#82919E" }} className="flex-fill"> {t("By_Location")} <i className="bx bx-down-arrow-alt"></i></span>
                                            <span style={{ fontSize: "1.125rem", color: "#82919E" }} >No of jobs <i className="bx bx-down-arrow-alt"></i></span>
                                        </div>
                                        <ul className="check-list">
                                            {
                                                SearchResultLoc.map((item, i) => (
                                                    <li key={i}>
                                                        <div className="form-check">
                                                            <input className="form-check-input locchekcbox resetCheckBox"
                                                                type="checkbox"
                                                                id="flexCheckDefault"
                                                                name={item.LocationName}
                                                                value={item.LocationID}
                                                                onClick={() => handleFilterLocationCheckBoxClick()}
                                                            />
                                                            <label className="form-check-label" htmlFor="" >
                                                                {item.LocationName}
                                                            </label>
                                                        </div>
                                                        <span>{item.jobs}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        <div className="buttons">
                                            <button className="btn btn-sm btn-primary " id='Btn2' onClick={() => handleResetFilterLocationButtonClick()}>Reset</button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="card-body-header">
                                            <span style={{ fontSize: "1.125rem", color: "#82919E" }} className="flex-fill"> {t("Jobs_By_Experience")} <i className="bx bx-down-arrow-alt"></i> </span>
                                            <span style={{ fontSize: "1.125rem", color: "#82919E" }} >No of jobs <i className="bx bx-down-arrow-alt"></i></span>
                                        </div>
                                        <ul className="check-list">
                                            {
                                                SearchResultExp.map((item, i) => (
                                                    <li key={i}>
                                                        <div className="form-check">
                                                            <input className="form-check-input expchechbox resetCheckBox"
                                                                type="checkbox"
                                                                value={item.exprange}
                                                                id="flexCheckDefault"
                                                                onClick={() => handleFilterExperienceBoxClick()}
                                                            />
                                                            <label className="form-check-label" htmlFor="">
                                                                {item.exprange} years
                                                            </label>
                                                        </div>
                                                        <span>{item.jobs}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        <div className="buttons">
                                            <button id='Btn2' className="btn btn-sm btn-primary" onClick={() => handleResetFilterExpButtonClick()}>Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {isMobile2 ? (
                                <>
                                    <div className="d-flex justify-content-end">
                                        <p
                                            style={{
                                                fontSize: "1.05rem",
                                                fontWeight: "700",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "end",
                                                border: "1px solid #FF5C35",
                                                borderRadius: "10px",
                                                padding: "0 3px",
                                                backgroundColor: "#FF5C35",
                                                color: "white",
                                            }}
                                            onClick={() => openNav()}
                                        >
                                            Filter
                                            <i
                                                class="bx bx-filter-alt"
                                                style={{ color: "white" }}
                                            ></i>{" "}
                                        </p>
                                    </div>
                                    <div id="myNav" class="overlay">
                                        <a
                                            href="javascript:void(0)"
                                            class="closebtn"
                                            onClick={() => closeNav()}
                                        >
                                            &times;
                                        </a>
                                        <div class="overlay-content">
                                            <div className="searchFilter">
                                                <div className="card card-filter shadow-sm">
                                                    <div className="card-body">
                                                        <div className="card-body-header">
                                                            <span
                                                                style={{
                                                                    fontSize: isMobile ? "1rem" : "1.125rem",
                                                                    color: "#82919E",
                                                                    textAlign: "justify",
                                                                    width: "50%",
                                                                }}
                                                                className="flex-fill"
                                                            >
                                                                {" "}
                                                                {t("By_Location")}{" "}
                                                                <i className="bx bx-down-arrow-alt"></i>
                                                            </span>
                                                            <span
                                                                style={{
                                                                    fontSize: isMobile ? "1rem" : "1.125rem",
                                                                    color: "#82919E",
                                                                }}
                                                            >
                                                                {t("No of job")}{" "}
                                                                <i className="bx bx-down-arrow-alt"></i>
                                                            </span>
                                                        </div>
                                                        <ul className="check-list">
                                                            {SearchResultLoc.map((item, i) => (
                                                                <li key={i} style={{ textAlign: "justify" }}>
                                                                    <div className="form-check">
                                                                        <input
                                                                            className="form-check-input locchekcbox resetCheckBox"
                                                                            type="checkbox"
                                                                            id="flexCheckDefault"
                                                                            name={item.LocationName}
                                                                            value={item.LocationID}
                                                                            onClick={() =>
                                                                                handleFilterLocationCheckBoxClick()
                                                                            }
                                                                        />
                                                                        <label
                                                                            className="form-check-label"
                                                                            htmlFor=""
                                                                        >
                                                                            {item.LocationName}
                                                                        </label>
                                                                    </div>
                                                                    <span>{item.jobs}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <div className="buttons">
                                                            <button
                                                                className="btn btn-sm btn-primary "
                                                                id="Btn2"
                                                                onClick={() =>
                                                                    handleResetFilterLocationButtonClick()
                                                                }
                                                            >
                                                                {t("Reset")}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="card-body-header">
                                                            <span
                                                                style={{
                                                                    fontSize: isMobile ? "1rem" : "1.125rem",
                                                                    color: "#82919E",
                                                                    textAlign: "justify",
                                                                    width: "50%",
                                                                }}
                                                                className="flex-fill"
                                                            >
                                                                {" "}
                                                                {t("Jobs_By_Experience")}{" "}
                                                                <i className="bx bx-down-arrow-alt"></i>{" "}
                                                            </span>
                                                            <span
                                                                style={{
                                                                    fontSize: isMobile ? "1rem" : "1.125rem",
                                                                    color: "#82919E",
                                                                }}
                                                            >
                                                                {t("No of job")}{" "}
                                                                <i className="bx bx-down-arrow-alt"></i>
                                                            </span>
                                                        </div>
                                                        <ul className="check-list">
                                                            {SearchResultExp.map((item, i) => (
                                                                <li key={i} style={{ textAlign: "justify" }}>
                                                                    <div className="form-check">
                                                                        <input
                                                                            className="form-check-input expchechbox resetCheckBox"
                                                                            type="checkbox"
                                                                            value={item.exprange}
                                                                            id="flexCheckDefault"
                                                                            onClick={() =>
                                                                                handleFilterExperienceBoxClick()
                                                                            }
                                                                        />
                                                                        <label
                                                                            className="form-check-label"
                                                                            htmlFor=""
                                                                        >
                                                                            {item.exprange} years
                                                                        </label>
                                                                    </div>
                                                                    <span>{item.jobs}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <div className="buttons">
                                                            <button
                                                                id="Btn2"
                                                                className="btn btn-sm btn-primary"
                                                                onClick={() =>
                                                                    handleResetFilterExpButtonClick()
                                                                }
                                                            >
                                                                {t("Reset")}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="col-lg-4 mb-3 searchFilterHide">
                                    <div className="card card-filter shadow-sm">
                                        <div className="card-body">
                                            <div className="card-body-header">
                                                <span
                                                    style={{ fontSize: "1.125rem", color: "#82919E" }}
                                                    className="flex-fill"
                                                >
                                                    {" "}
                                                    {t("By_Location")}{" "}
                                                    <i className="bx bx-down-arrow-alt"></i>
                                                </span>
                                                <span
                                                    style={{ fontSize: "1.125rem", color: "#82919E" }}
                                                >
                                                    {t("No of job")}{" "}
                                                    <i className="bx bx-down-arrow-alt"></i>
                                                </span>
                                            </div>
                                            <ul className="check-list">
                                                {SearchResultLoc.map((item, i) => (
                                                    <li key={i}>
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input locchekcbox resetCheckBox"
                                                                type="checkbox"
                                                                id="flexCheckDefault"
                                                                name={item.LocationName}
                                                                value={item.LocationID}
                                                                onClick={() =>
                                                                    handleFilterLocationCheckBoxClick()
                                                                }
                                                            />
                                                            <label className="form-check-label" htmlFor="">
                                                                {item.LocationName}
                                                            </label>
                                                        </div>
                                                        <span>{item.jobs}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="buttons">
                                                <button
                                                    className="btn btn-sm btn-primary "
                                                    id="Btn2"
                                                    onClick={() => handleResetFilterLocationButtonClick()}
                                                >
                                                    {t("Reset")}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="card-body-header">
                                                <span
                                                    style={{ fontSize: "1.125rem", color: "#82919E" }}
                                                    className="flex-fill"
                                                >
                                                    {" "}
                                                    {t("Jobs_By_Experience")}{" "}
                                                    <i className="bx bx-down-arrow-alt"></i>{" "}
                                                </span>
                                                <span
                                                    style={{ fontSize: "1.125rem", color: "#82919E" }}
                                                >
                                                    {t("No of job")}{" "}
                                                    <i className="bx bx-down-arrow-alt"></i>
                                                </span>
                                            </div>
                                            <ul className="check-list">
                                                {SearchResultExp.map((item, i) => (
                                                    <li key={i}>
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input expchechbox resetCheckBox"
                                                                type="checkbox"
                                                                value={item.exprange}
                                                                id="flexCheckDefault"
                                                                onClick={() => handleFilterExperienceBoxClick()}
                                                            />
                                                            <label className="form-check-label" htmlFor="">
                                                                {item.exprange} years
                                                            </label>
                                                        </div>
                                                        <span>{item.jobs}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="buttons">
                                                <button
                                                    id="Btn2"
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => handleResetFilterExpButtonClick()}
                                                >
                                                    {t("Reset")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="col-lg-8 mb-3">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="card-body-header">
                                            <span className="card-title flex-fill">
                                                {
                                                    resultByAssignmentId.length > 0 ?
                                                        <span>{t("Result_For")} : <span style={{ fontSize: "0.9rem" }}>Assignment wise jobs.</span></span>
                                                        :
                                                        <>
                                                            {t("Result_For")} : {searchResultText ? <span style={{ fontSize: "1rem", textTransform: "capitalize" }}>{searchResultText}</span> :
                                                                <span style={{ fontSize: "1.20rem" }}>NA</span>
                                                            }
                                                        </>
                                                }
                                            </span>
                                            <span style={{ color: "#82919E" }}>{t("Records_Total")}: <span style={{ color: "#FF5C35" }}>{recordcount}</span></span>
                                        </div>

                                        {/* <div className="search-filter">
                                            {
                                                recordcount ?
                                                    <div className="filter-start">
                                                        <div className="label">{t("Sort_By")}:</div>
                                                        <a className="btn btn-link" onClick={() => OrderbyClick("Date")}>{t("Date")}<i className='icon bx bx-sort-alt-2'></i></a>
                                                        <a className="btn btn-link" onClick={() => OrderbyClick("Relevance")}>{t("Relevance")}<i className='icon bx bx-sort-alt-2'></i></a>
                                                    </div> : ""
                                            }
                                            <div className="filter-end">
                                                <a href="" className="btn btn-link">Modify Search</a>
                                                <a href="" className="btn btn-link">Refine Search</a>

                                            </div>
                                        </div> */}
                                        {
                                            recordcount ?
                                                <div className="search-action">
                                                    <div className="action-start">
                                                        <button className="btn btn-sm btn-outline-primary gray-outline-primary" onClick={() => handleCheckClick(true)}>{t("Check_All")}</button>
                                                        <button className="btn btn-sm btn-outline-primary gray-outline-primary" onClick={() => handleCheckClick(false)}>{t("Uncheck_All")}</button>
                                                    </div>
                                                    <div className="action-end">
                                                        <button className="btn btn-primary btn-sm" onClick={() => handleApplyJOBClick(selected)}>{t("Apply_Job")} <i className='icon bx bx-right-arrow-alt'></i></button>
                                                        <button className="btn btn-primary btn-sm" onClick={() => handleSaveJobClick(selected)}><i className='icon bx bx-save'></i>{t("Save_Job")}</button>
                                                        {/* <button className="btn btn-primary btn-sm" onClick={() => setOpen(true)}><i className='icon bx bx-save'></i>Save Search</button> */}
                                                    </div>
                                                </div> : ""
                                        }

                                        <div className="job-requirment-items">
                                            {
                                                recordcount > 0 ?
                                                    <>
                                                        {
                                                            searchResult.length > 0 ?
                                                                searchResult.map((item, i) =>
                                                                    <div className="form-check" id='myID' key={i} style={{ padding: "0.5rem", marginTop: "0.5rem" }}>
                                                                        <input style={{ cursor: "pointer" }} className="form-check-input jckeckbox" type="checkbox" value={item.JobPostingID} id={"joblist" + i} onClick={() => handleCheckBoxClick(item.JobPostingID, "joblist" + i)} />
                                                                        <label className="form-check-label" htmlFor="">
                                                                            <div className="heading">
                                                                                <a href={href} target='_blank' className="title" title={item.Title + " Jobs"} onClick={() => handleGetJobDetailClick(item.JobPostingID, item.Title)} style={{ cursor: "pointer" }}>{item.Title}</a>
                                                                                <span className="info">{item.Locations}</span>
                                                                                {item.IsAppled === 1 ? <span className="info text-info">You have applied for this job </span> : ""}
                                                                                {item.IsSaved === 1 ? <span className="info text-info">You have saved this job </span> : ""}
                                                                            </div>
                                                                            <div className="heading">
                                                                                <span>{t("Job_Experience")}: ({item.ExperienceFrom} - {item.ExperienceTo}) years</span>
                                                                                <span className="info has-dot">{t("Salary")}: <span>{item.Salary ? item.Salary : "Negotiable"} {item.Currency ? ("IN (" + item.Currency + ")") : ""}</span></span>
                                                                            </div>
                                                                            <div className="heading" >
                                                                                <span>{t("employer")}:</span> <span className="text-success" style={{ cursor: "pointer" }} onClick={() => handleFilterClientClick(item.ClientID)}><b>{item.ClientName}</b> <small > ({t("View_all_jobs_of_this_employer")})</small></span>
                                                                                <span style={{ float: "right" }}><span className="info">Date of job posting: </span>{item.StartDate}</span>
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                ) :
                                                                resultByAssignmentId.map((item, i) =>
                                                                    <div className="form-check" id='myID' key={i}>
                                                                        <input style={{ cursor: "pointer" }} className="form-check-input jckeckbox" type="checkbox" value={item.JobPostingID} id={"joblist" + i} onClick={() => handleCheckBoxClick(item.JobPostingID, "joblist" + i)} />
                                                                        <label className="form-check-label" htmlFor="">
                                                                            <div className="heading">
                                                                                <a href={href} target='_blank' className="title" onClick={() => handleGetJobDetailClick(item.JobPostingID, item.JobPostingTitle)} style={{ cursor: "pointer" }}>{item.JobPostingTitle}</a> <span className="info has-dot">{item.LocationName}({item.JobPostingExperienceFrom} - {item.JobPostingExperienceTo}) years</span>
                                                                            </div>
                                                                            <p className="text-success company" ><span style={{ cursor: "pointer" }} onClick={() => handleFilterClientClick(item.ClientID)}><b>{item.ClientName}</b> <br /><small > ({t("View_all_jobs_of_this_employer")})</small></span></p>
                                                                            <p className="salary">{t("Job_Experience")}: {item.JobExperience ? item.JobExperience : "NA"}</p>
                                                                            <p className="salary">{t("Salary")}: <span>{item.JobPostingSalaryTo !== 0 ? item.JobPostingSalaryFrom + "-" + item.JobPostingSalaryTo : "Negotiable"}{item.Currency ? +"IN" + ((item.Currency)) : " " + "(NA)"}</span></p>
                                                                            <p>{item.JobPostingSummary}</p>
                                                                        </label>
                                                                    </div>
                                                                )
                                                        }

                                                    </> :
                                                    <div className="no-data-found" id='noRecord'>
                                                        <img src={noData} alt="" />
                                                        <p>Jobs Not Available</p>
                                                    </div>
                                            }
                                        </div>

                                        <div className='tabel-footer'>
                                            {
                                                pageCount > 1 ?
                                                    <nav aria-label="Page navigation example" className="d-flex justify-content-end mt-4">
                                                        <Pagination
                                                            count={pageCount}
                                                            defaultPage={1}
                                                            shape="rounded"
                                                            size="small"
                                                            page={startIndex}
                                                            onChange={handleChange}
                                                            showFirstButton
                                                            showLastButton
                                                            siblingCount={0}
                                                        />
                                                    </nav> : null
                                            }
                                            <div className='no-of-rows mt-4' style={{ alignItems: "center", color: "#82919E" }}> {t("Records_Total")}: <span style={{ color: "#FF5C35" }}>{recordcount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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
                {/* <button type="button" onClick={() => test()} >test</button> */}
            </Layout >

        </>
    )
}
export default Jobs;