import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Layout from '../../../Layout/Layout'
import { Link, useLocation } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ProfileDashboardService } from '../../../Services/ProfileDashboardservice';
import { AdvanceSearchService } from '../../../Services/AdvanceSearchService';
import { AuthService } from '../../../Services/AuthService';
import ApplyJobModal from '../Jobs/ApplyJobModal';
import { Modal, ModalBody } from 'react-bootstrap';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import noData from '../../../assets/imgs/no-data.svg';
import LoginModal from '../../LogIn/LoginModal';
import { GetjobPostingsOnAssignmentIDService } from '../../../Services/GetjobPostingsOnAssignmentIDService';
import { useTranslation } from 'react-i18next';
import { HomePageService } from '../../../Services/HomePageService';
import NewLoader from '../NewLoader';

let IndustryList = []

const initIndustryList = async () => {
    const industry = await AdvanceSearchService.getIndustryDropDownList();
    industry ? IndustryList = industry : IndustryList = [];

}

initIndustryList()


function AdvanceSearchResult() {
    const { t } = useTranslation();
    const search = useLocation().search;
    const industryUrl = useLocation();
    const navigate = useNavigate();
    // const [startIndex, setstartIndex] = useState(0);
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
    const [searchResultTextAll, setsearchResultTextAll] = useState("");
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
    const [selected, setSelected] = useState([]);
    //const [IndustryList, setIndustryList] = useState([]);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isMobile2, setIsMobile2] = useState(window.innerWidth <= 992);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile2(window.innerWidth <= 992);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function openNav() {
        console.log("clicks");
        document.getElementById("myNav").style.width = "100%";
        document.getElementById("myNav").style.left = "0%";
    }

    function closeNav() {
        document.getElementById("myNav").style.width = "0%";
        document.getElementById("myNav").style.left = "-25px";
    }

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
    // const handlePageClick = (event) => {
    //     setstartIndex(event.selected);
    // }
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
        let searchParms = getSearchParms();
        searchParms["Location"] = locids;
        setfilterLocation(locids);
        if (searchParms) {
            document.getElementById("locbtn").disabled = true;
            document.getElementById("locbtn").style.cursor = "not-allowed";
            initSearchResult(searchParms);
            let locCheckBoxes = document.getElementsByClassName('locchekcbox');
            for (let i = 0; i < locCheckBoxes.length; i++) {
                locCheckBoxes[i].disabled = true;
                // locCheckBoxes[i].checked = true;
            }
        } else {
            document.getElementById("locbtn").disabled = false;
            document.getElementById("locbtn").style.cursor = "pointer";
        }
    }
    // const handleSearhFilterResetClick = (IsLoc, IsExp, IsSal) => {
    //     let searchParms = getSearchParms();
    //     searchParms.Location = "";
    //     searchParms.ExperienceFrom = 0;
    //     searchParms.ExperienceTo = 0;
    //     searchParms.StartIndex = 1;
    //     searchParms["IsLoc"] = IsLoc;
    //     searchParms["IsExp"] = IsExp;
    //     setfilterLocation("");
    //     setfilterExperienceFrom(0);
    //     setfilterExperienceTo(0);
    //     setstartIndex(1);
    //     document.getElementById("locbtn").disabled = false;
    //     document.getElementById("locbtn").style.cursor = "pointer";
    //     let checkBoxes = document.getElementsByClassName("resetCheckBox");
    //     for (let i = 0; i < checkBoxes.length; i++) {
    //         checkBoxes[i].checked = false;
    //         checkBoxes[i].disabled = false;
    //     }
    //     initSearchResult(searchParms);

    // }
    const handleLocationFilterResetClick = (IsLoc) => {
        let searchParms = getSearchParms();
        searchParms.Location = "";
        searchParms.StartIndex = 1;
        searchParms["IsLoc"] = IsLoc;

        setfilterLocation("");
        setstartIndex(1);
        document.getElementById("locbtn").disabled = false;
        document.getElementById("locbtn").style.cursor = "pointer";

        let locationCheckBoxes = document.getElementsByClassName(
            "resetLocationCheckBox"
        );
        for (let i = 0; i < locationCheckBoxes.length; i++) {
            locationCheckBoxes[i].checked = false;
            locationCheckBoxes[i].disabled = false;
        }

        initSearchResult(searchParms);
    };

    const handleExperienceFilterResetClick = (IsExp) => {
        setfilterExperienceFrom(0);
        setfilterExperienceTo(0);
        setstartIndex(1);

        let searchParms = getSearchParms();
        searchParms.ExperienceFrom = 0;
        searchParms.ExperienceTo = 0;
        searchParms.StartIndex = 1;
        searchParms["IsExp"] = IsExp;

        let experienceCheckBoxes = document.getElementsByClassName(
            "resetExperienceCheckBox"
        );
        for (let i = 0; i < experienceCheckBoxes.length; i++) {
            experienceCheckBoxes[i].checked = false;
            experienceCheckBoxes[i].disabled = false;
        }

        initSearchResult(searchParms);
    };
    const handleFilterExpClick = () => {
        setstartIndex(1);
        let expCheckBoxes = document.getElementsByClassName('expchechbox');
        let searchParms = getSearchParms();
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
            initSearchResult(searchParms);
            let expCheckBoxes = document.getElementsByClassName('expchechbox');
            for (let i = 0; i < expCheckBoxes.length; i++) {
                expCheckBoxes[i].disabled = true;
                // expCheckBoxes[i].checked = true;
            }
        }
    }
    const handleFilterSalClick = () => {
        let salCheckBoxes = document.getElementsByClassName('salchechbox');
        let searchParms = getSearchParms();
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
        const searchParms = getSearchParms();
        setOrderBy(order);
        searchParms["OrderbyOption"] = order;
        initSearchResult(searchParms);
    }
    const handleFilterClientClick = (clientID) => {
        const searchParms = getSearchParms();
        if (searchParms && clientID) {
            searchParms.ClientID = clientID;
            searchParms.StartIndex = 1;
            initSearchResult(searchParms);
        }

    }
    // const handleApplyJOBClick = async () => {
    //     if (AuthService.isAuthenticatedUser()) {
    //         let checkboxes = document.getElementsByClassName('jckeckbox');
    //         let jobIDs = [];
    //         let selectedJobCount = 0;
    //         for (let i = 0; i < checkboxes.length; i++) {
    //             if (checkboxes[i].checked) {
    //                 selectedJobCount += 1;
    //                 jobIDs.push(checkboxes[i].value);
    //             }
    //         }
    //         if (jobIDs.length > 0) {
    //             setSelected(jobIDs);
    //             try {
    //                 setopenLoader(true);
    //                 try {
    //                     const res = await ProfileDashboardService.ApplySelectedJob(jobIDs);
    //                     if (res.isSuccess) {
    //                         ShowAlert(1, res.message);
    //                     } else {
    //                         ShowAlert(0, res.message);
    //                     }
    //                 } catch (error) { }
    //                 setopenLoader(false);
    //             } catch (error) {

    //             }
    //             initSearchResult();
    //         } else {
    //             ShowAlert(0, "Please select one job");
    //         }

    //     } else {
    //         const qs = window.location.search;
    //         if (qs) {
    //             handleLoginShow();
    //             navigate({
    //                 pathname: "/advancesearchresult",
    //                 search: qs,
    //             })
    //         } else {
    //             navigate('/');
    //         }
    //     }
    // }
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
                initSearchResult(getSearchParms());
            } else {
                ShowAlert(0, "Please select one job");
            }
            getSearchParms();

        } else {
            const qs = window.location.search;
            if (qs) {
                handleLoginShow();
                navigate({
                    pathname: "/advancesearchresult",
                    search: qs,
                })
            } else {
                navigate('/');
            }
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
                initSearchResult(getSearchParms());
            } else {
                ShowAlert(0, "Please select one job");
            }

        } else {
            const qs = window.location.search;
            if (qs) {
                handleLoginShow();
                navigate({
                    pathname: "/advancesearchresult",
                    search: "?jobs=" + qs,
                })
            } else {
                navigate('/');
            }

        }

    }
    const handleSaveSearchClick = async () => {
        if (AuthService.isAuthenticatedUser()) {
            const inputText = document.getElementById('searchID').value;
            if (inputText !== null && inputText !== "" && inputText !== undefined) {
                let searchQueryParms = getSearchParms();
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
    const IsNullOrEmpty = (v) => {
        if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
            return true;
        } else {
            return false;
        }
    }
    const initSearchResult = async (data) => {
        if (data.IsLoc) {
            data.Location = "";
        } else {
            data.Location = filterlocation ? filterlocation : data.Location;
        }
        if (data.IsExp) {
            data.ExperienceFrom = 0;
            data.ExperienceTo = 0;
        } else {
            data.ExperienceFrom = filterExperienceFrom ? filterExperienceFrom : data.ExperienceFrom;
            data.ExperienceTo = filterExperienceTo ? filterExperienceTo : data.ExperienceTo;
        }

        setopenLoader(true);
        if (!IsNullOrEmpty(data.AssignmentID)) {
            try {
                if (resultByAssignmentId.length === 0) {
                    document.getElementById("noRecord").style.display = "none";
                }
                const res = await GetjobPostingsOnAssignmentIDService.getjobPostingsOnAssignmentIDList(data);
                const result = JSON.parse(res.apiData);
                if (res.isSuccess) {
                    setpageCount(Math.ceil(result.Table1[0].RecordCount / itemsPerPage));
                    setrecordcount(Math.ceil(result.Table1[0].RecordCount));
                    setResultByAssignmentId(result.Table ? result.Table : []);
                    setSearchResultLoc(result.Table2 ? result.Table2 : [])
                    setSearchResultExp(result.Table3 ? result.Table3 : []);
                } else {
                    setrecordcount(res.recordCount);
                    setResultByAssignmentId([]);
                    setSearchResultExp([]);
                }
                document.getElementById("noRecord").style.display = "flex";
            } catch (error) {
                setopenLoader(false);
            }
        } else {
            try {
                if (searchResult.length === 0) {
                    document.getElementById("noRecord").style.display = "none";
                }
                const result = await AdvanceSearchService.JobSearch(data);
                setpageCount(Math.ceil(result.recordsTotal / itemsPerPage));
                setrecordcount(Math.ceil(result.recordsTotal));
                result.searchResultsString ? setsearchResult(JSON.parse(result.searchResultsString)) : setsearchResult([]);
                result.searchResultLoc ? setSearchResultLoc(JSON.parse(result.searchResultLoc)) : setSearchResultLoc([]);
                result.searchResultExp ? setSearchResultExp(JSON.parse(result.searchResultExp)) : setSearchResultExp([]);
                result.searchResultSalary ? setSearchResultSalary(JSON.parse(result.searchResultSalary)) : setSearchResultSalary([]);
                let obj = "";
                try {
                    if (result.searchKeyword) {
                        obj += result.searchKeyword + "," + buildSearchResultTest();
                    } else if (result.searchKeyword === "") {
                        obj += ""
                    }
                    else {
                        obj += buildSearchResultTest();
                    }
                } catch (error) {
                }
                setsearchResultText(obj);
                document.getElementById("noRecord").style.display = "flex";
            } catch (error) {
                setopenLoader(false);
            }
        }
        setopenLoader(false);
    }

    // Function to extract query parameters
    const getQueryParams = (search) => {
        return new URLSearchParams(search);
    };

    const getSearchParms = () => {
        console.log(industryUrl);

        // Extract 'IndId' from query parameters
        const industryName = industryUrl.pathname.split("/")

        const queryParams = getQueryParams(industryUrl.search);
        const indId = queryParams.get('indId');


        try {
            // if (industryUrl.pathname.startsWith('/advancedsearchresult/industry/')) {
            //     console.log( "url")
            // }   
            if (new URLSearchParams(search).get('qs_aid')) {
                const qs = new URLSearchParams(search).get('qs_aid');
                if (qs) {
                    const Data = {
                        AssignmentID: qs,
                        StartIndex: parseInt(startIndex),
                        PageSize: parseInt(itemsPerPage),

                    }
                    return Data;
                } else {
                    return null;
                }
            } else {
                var url = window.location.search;
                if (url) {
                    let queryObj = JSON.parse('{"' + url.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
                    let keywords = queryObj.Keywords;
                    let isadvancesearch = false;
                    if (queryObj.qID) {
                        if (queryObj.qID === "As") {
                            isadvancesearch = true;
                        }
                        else {
                            isadvancesearch = false;
                        }
                    }
                    if (keywords) {
                        let kw = decodeURIComponent(queryObj.Keywords.replace(/\+/g, " "));
                        keywords = kw;
                    }
                    else {
                        keywords = null;
                    }
                    let AnyKeywords = queryObj.keyAny;
                    if (AnyKeywords) {
                        AnyKeywords = queryObj.keyAny;
                    }
                    else {
                        AnyKeywords = null;
                    }
                    let anykey = "";
                    if (AnyKeywords === "0") {
                        anykey = "true";
                    }
                    else {
                        anykey = "false";
                    }
                    let loc = "";
                    if (queryObj.locId) {
                        loc = queryObj.locId;
                    }
                    else {
                        loc = null;
                    }
                    let searchin = queryObj.Searchin;
                    if (searchin) {
                        searchin = queryObj.Searchin;
                    }
                    else {
                        searchin = null;
                    }
                    let postedwithin = queryObj.JobsPostedWithin;
                    if (postedwithin) {
                        postedwithin = queryObj.JobsPostedWithin;
                    }
                    else {
                        postedwithin = null;
                    }
                    let jpcode = queryObj.JobCode;
                    if (jpcode) {
                        jpcode = queryObj.JobCode;
                    }
                    else {
                        jpcode = null;
                    }
                    let industry = "";
                    if (queryObj.IndId) {
                        industry = queryObj.IndId;
                    }
                    else {
                        industry = null;
                    }
                    let qual = "";
                    if (queryObj.QualificationID) {
                        qual = queryObj.QualificationID;
                    }
                    else {
                        qual = null;
                    }
                    let qualspec = "";
                    if (qualspec) {
                        qualspec = queryObj.QualificationSpecialization;
                    }
                    else {
                        qualspec = null;
                    }
                    let sal = "";
                    if (queryObj.YearlySalary) {
                        sal = queryObj.YearlySalary;
                    }
                    else {
                        sal = null;
                    }
                    let expfrom = parseInt(queryObj.ExperienceFrom);
                    if (expfrom) {
                        expfrom = parseInt(queryObj.ExperienceFrom);
                    }
                    else {
                        expfrom = null;
                    }
                    let expto = parseInt(queryObj.ExperienceTo);
                    if (expto) {
                        expto = parseInt(queryObj.ExperienceTo);
                    }
                    else {
                        expto = null;
                    }
                    let clId = queryObj.ClientId;
                    if (clId) {
                        clId = parseInt(queryObj.ClientId);
                    } else {
                        clId = 0;
                    }

                    const Data = {
                        IsAdvanceSearch: isadvancesearch,
                        Keywords: keywords,
                        AllOrAnyKeywords: anykey,
                        Location: loc ? loc : "",
                        Searchin: searchin ? searchin : "",
                        JobsPostedWithin: postedwithin ? postedwithin : "",
                        JobCode: jpcode ? jpcode : "",
                        // Industry: industry ? industry : "",
                        Industry: indId ? indId : industry ? industry : "",
                        FunctionalArea: "",
                        Specialization: "",
                        Qualification: qual ? qual : "",
                        QualificationSpecialization: "",
                        YearlySalary: sal ? sal : "",
                        ExperienceFrom: expfrom ? expfrom : 0,
                        ExperienceTo: expto ? expto : 0,
                        userId: AuthService.getCurrentUser().userId ? AuthService.getCurrentUser().userId : "",
                        StartIndex: startIndex,
                        ClientID: clId,
                    }
                    return Data;
                }
                else {
                    return null;
                }
            }

        } catch (error) {
            console.log(error)
            return null;
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
            if (queryObj['?indId']) {
                const industryName = IndustryList?.find(option => option.value === queryObj['?indId']);
                obj += "Industry:" + " " + industryName.label.replace(/%20/g, " ") + ",";
            } else {
                obj += "";
            }
            if (queryObj.IndName) {
                obj += "Industry:" + " " + queryObj.IndName.replace(/%20/g, " ") + ",";
            } else {
                obj += "";
            }
            if (queryObj.JobCode) {
                obj += "JobCode:" + " " + queryObj.JobCode.replace(/%20/g, "") + ",";
            } else {
                obj += "";
            }
            if (queryObj.locName) {
                obj += "Location:" + " " + queryObj.locName.replace(/%20/g, " ") + ",";
            } else {
                obj += "";
            }
            // if (queryObj.keyAny === "0") {
            //     obj += "(Any Words),";
            // } else {
            //     obj += "(All Words),";
            // }
            if (queryObj.YearlySalary) {
                obj += queryObj.YearlySalary;
            } else {
                obj += "";
            }
            let exp1 = queryObj.ExperienceFrom ? queryObj.ExperienceFrom : 0;
            let exp2 = queryObj.ExperienceTo ? queryObj.ExperienceTo : "Above";
            if (exp2 != "", exp2 != undefined, exp2 != 0, exp1 != "", exp1 != undefined, exp1 != 0) {
                let experience = "Experience:" + " " + exp1 + " " + "to" + " " + exp2 + " " + "Year";
                obj += experience;
            } else {
                obj += "";
            }
            return obj;
        } catch (error) {

        }
        // obj = obj.substring(0, obj.length - 1)
    }
    const CloseModal = () => {
        handleLoginClose()
    }
    const [expanded, setExpanded] = useState(false);
    const [expandedloc, setExpandedloc] = useState(false);

    const toggleExpandLoc = () => {
        setExpandedloc(!expandedloc);
    };
    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    // const getIpaddress = async () => {
    //     setopenLoader(true);
    //     const res = await HomePageService.initIP();
    //     if (res) {
    //         setIpaddress(res.data);
    //     }
    //     setopenLoader(false);
    // }
    // useEffect(() => {
    //     getIpaddress();
    // }, [])

    useEffect(() => {
        if (getSearchParms()) {
            initSearchResult(getSearchParms());
            window.scrollTo(0, 0);
        }
    }, [startIndex, itemsPerPage]);

    return (
        <>
            {/* <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop> */}
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
            >
                <NewLoader />
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
                    />
                </Modal.Body>

            </Modal>
            <Layout>
                <section>
                    <div className="container mt-5">
                        <div className="row">
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
                                                            {
                                                                SearchResultLoc.map((item, i) => (
                                                                    <li key={i} style={{textAlign:"justify"}}>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input locchekcbox resetLocationCheckBox" type="checkbox" id="flexCheckDefault" name={item.LocationName} value={item.LocationID} />
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
                                                            <button className="btn btn-sm btn-outline-primary gray-outline-primary" id='Btn2' onClick={() => handleLocationFilterResetClick(true, false, false)}>Reset</button>
                                                            <button className="btn btn-sm btn-primary" id='locbtn' onClick={() => handleFilterLocationClick()} >Go</button>
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
                                                            {
                                                                SearchResultExp.map((item, i) => (
                                                                    <li key={i} style={{textAlign:"justify"}}>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input expchechbox resetExperienceCheckBox" type="checkbox" value={item.exprange} id="flexCheckDefault" />
                                                                            <label className="form-check-label" htmlFor="">
                                                                                {item.exprange}
                                                                            </label>
                                                                        </div>
                                                                        <span>{item.jobs}</span>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                        <div className="buttons">
                                                            <button id='Btn2' className="btn btn-sm btn-outline-primary gray-outline-primary" onClick={() => handleExperienceFilterResetClick(true, false, false)}>Reset</button>
                                                            <button id='Btn2' className="btn btn-sm btn-primary" onClick={() => handleFilterExpClick()}>Go</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="col-lg-4 mb-3">
                                    <div className="card card-filter shadow-sm">
                                        <div className="card-body">
                                            <div className="card-body-header">
                                                <span style={{ fontSize: "1.125rem", color: "#82919E" }} className="flex-fill"> {t("By_Location")}  <i className="bx bx-down-arrow-alt"></i> </span>
                                                <span style={{ fontSize: "1.125rem", color: "#82919E" }} >No of job  <i style={{ marginTop: "1%" }} className="bx bx-down-arrow-alt"></i></span>
                                            </div>
                                            <ul className="check-list">
                                                {
                                                    SearchResultLoc.map((item, i) => (
                                                        <li key={i}>
                                                            <div className="form-check">
                                                                <input className="form-check-input locchekcbox resetLocationCheckBox" type="checkbox" id="flexCheckDefault" name={item.LocationName} value={item.LocationID} />
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
                                                <button className="btn btn-sm btn-outline-primary gray-outline-primary" id='Btn2' onClick={() => handleLocationFilterResetClick(true, false, false)}>Reset</button>
                                                <button className="btn btn-sm btn-primary" id='locbtn' onClick={() => handleFilterLocationClick()} >Go</button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="card-body-header">
                                                <span style={{ fontSize: "1.125rem", color: "#82919E" }} className="flex-fill"> {t("Jobs_By_Experience")}  <i className="bx bx-down-arrow-alt"></i> </span>
                                                <span style={{ fontSize: "1.125rem", color: "#82919E" }} >No of job  <i className="bx bx-down-arrow-alt"></i></span>
                                            </div>
                                            <ul className="check-list">
                                                {
                                                    SearchResultExp.map((item, i) => (
                                                        <li key={i}>
                                                            <div className="form-check">
                                                                <input className="form-check-input expchechbox resetExperienceCheckBox" type="checkbox" value={item.exprange} id="flexCheckDefault" />
                                                                <label className="form-check-label" htmlFor="">
                                                                    {item.exprange}
                                                                </label>
                                                            </div>
                                                            <span>{item.jobs}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                            <div className="buttons">
                                                <button id='Btn2' className="btn btn-sm btn-outline-primary gray-outline-primary" onClick={() => handleExperienceFilterResetClick(true, false, false)}>Reset</button>
                                                <button id='Btn2' className="btn btn-sm btn-primary" onClick={() => handleFilterExpClick()}>Go</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* <div className="col-lg-4 mb-3">
                                <div className="card card-filter shadow-sm card-navigation">
                                    <div className="card-header">
                                        <h4 className="card-title">{t("Filter_Search_Results")}</h4>
                                        <button className="btn btn-sm btn-outline-primary gray-outline-primary">Reset All</button>
                                    </div>
                                    <div className='container'>
                                        <div className="card-body">
                                            <h4 className="card-body-subtitle mt-1"> {t("By_Location")}</h4>
                                            <ul className="check-list">
                                                {
                                                    SearchResultLoc.map((item, i) => (
                                                        <li key={i} style={{ display: expandedloc || i < 3 ? "block" : "none" }}>
                                                            <div className="form-check">
                                                                <input className="form-check-input locchekcbox resetCheckBox" type="checkbox" id="flexCheckDefault" name={item.LocationName} value={item.LocationID} />
                                                                <span className="form-check-label" htmlFor="" >
                                                                    {item.LocationName}
                                                                </span>
                                                            </div>
                                                            <span>{item.jobs}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>

                                            <div className="buttons">
                                                {SearchResultLoc.length > 3 && (
                                                    <button style={{ float: "left", marginRight: "54%" }} className="btn btn-sm btn-primary" onClick={toggleExpandLoc}>{expandedloc ? "Collapse" : "Expand"}</button>
                                                )}
                                                <button className="btn btn-sm btn-outline-primary gray-outline-primary" id='Btn2' onClick={() => handleSearhFilterResetClick(true, false, false)}>Reset</button>
                                                <button className="btn btn-sm btn-primary" id='locbtn' onClick={() => handleFilterLocationClick()} >Go</button>
                                            </div>
                                        </div>
                                        <div className="card-body mt-2 mb-2">
                                            <h4 className="card-body-subtitle mt-1"> {t("Jobs_By_Experience")}</h4>
                                            <ul className="check-list">
                                                {
                                                    SearchResultExp.map((item, i) => (
                                                        <li key={i} style={{ display: expanded || i < 3 ? "block" : "none" }}>
                                                            <div className="form-check">
                                                                <input className="form-check-input expchechbox resetCheckBox" type="checkbox" value={item.exprange} id="flexCheckDefault" />
                                                                <label className="form-check-label" htmlFor="">
                                                                    {item.exprange}
                                                                </label>
                                                            </div>
                                                            <span>{item.jobs}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>

                                            <div className="buttons">
                                                {SearchResultExp.length > 3 && (
                                                    <button style={{ float: "left", marginRight: "54%" }} className="btn btn-sm btn-primary" onClick={toggleExpand}>{expanded ? "Collapse" : "Expand"}</button>
                                                )}
                                                <button className="btn btn-sm btn-outline-primary gray-outline-primary" id='Btn2' onClick={() => handleSearhFilterResetClick(true, false, false)}>Reset</button>
                                                <button className="btn btn-sm btn-primary" id='locbtn' onClick={() => handleFilterLocationClick()} >Go</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Accordion>
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                                <span style={{ marginLeft: "3%" }} className="card-body-subtitle"> {t("By_Location")}</span>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="card-body">
                                                    <ul className="check-list">
                                                        {
                                                            SearchResultLoc.map((item, i) => (
                                                                <li key={i}>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input locchekcbox resetCheckBox" type="checkbox" id="flexCheckDefault" name={item.LocationName} value={item.LocationID} />
                                                                        <span className="form-check-label" htmlFor="" >
                                                                            {item.LocationName}
                                                                        </span>
                                                                    </div>
                                                                    <span>{item.jobs}</span>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                    <div className="buttons">
                                                        <button className="btn btn-sm btn-outline-primary gray-outline-primary" id='Btn2' onClick={() => handleSearhFilterResetClick(true, false, false)}>Reset</button>
                                                        <button className="btn btn-sm btn-primary" id='locbtn' onClick={() => handleFilterLocationClick()} >Go</button>
                                                    </div>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                    <div>
                                        <Accordion>
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                                <span style={{ marginLeft: "3%" }} className="card-body-subtitle"> {t("Jobs_By_Experience")}</span>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="card-body">
                                                    <ul className="check-list">
                                                        {
                                                            SearchResultExp.map((item, i) => (
                                                                <li key={i}>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input expchechbox resetCheckBox" type="checkbox" value={item.exprange} id="flexCheckDefault" />
                                                                        <label className="form-check-label" htmlFor="">
                                                                            {item.exprange}
                                                                        </label>
                                                                    </div>
                                                                    <span>{item.jobs}</span>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                    <div className="buttons">
                                                        <button id='Btn2' className="btn btn-sm btn-outline-primary gray-outline-primary" onClick={() => handleSearhFilterResetClick(false, true, false)}>Reset</button>
                                                        <button id='Btn2' className="btn btn-sm btn-primary" onClick={() => handleFilterExpClick()}>Go</button>
                                                    </div>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                    <div>
                                        <Accordion>
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                                <span style={{ marginLeft: "3%" }} className="card-body-subtitle">Jobs by Salary (P.A.)</span>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="card-body">
                                                    <ul className="check-list">
                                                        {
                                                            SearchResultSalary.map((item, i) => (
                                                                <li key={i}>

                                                                    <div className="form-check">
                                                                        <input className="form-check-input salchechbox resetCheckBox" type="checkbox" id="flexCheckDefault" value={item.salrange} />
                                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                            {item.salrange}
                                                                        </label>
                                                                    </div>
                                                                    <span>{item.jobs}</span>
                                                                </li>
                                                            ))
                                                        }

                                                    </ul>
                                                    <div className="buttons">
                                                        <button id='Btn2' className="btn btn-sm btn-outline-primary gray-outline-primary" onClick={() => handleSearhFilterResetClick(false, true, false)}>Reset</button>
                                                        <button id='Btn2' className="btn btn-sm btn-primary" onClick={() => handleFilterSalClick()}>Go</button>
                                                    </div>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>
                            </div> */}
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
                                                            {t("Result_For")} : {searchResultText ? <span style={{ fontSize: "0.9rem", textTransform: "capitalize" }}>{searchResultText}</span> :
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
                                        {/* {
                                            recordcount ?
                                                <div className="search-action">
                                                    <div className="action-start">
                                                        <button className="btn btn-sm btn-outline-primary gray-outline-primary" onClick={() => handleCheckClick(true)}>{t("Check_All")}</button>
                                                        <button className="btn btn-sm btn-outline-primary gray-outline-primary" onClick={() => handleCheckClick(false)}>{t("Uncheck_All")}</button>
                                                    </div>
                                                    <div className="action-end">
                                                        <button className="btn btn-primary btn-sm" onClick={() => handleApplyJOBClick(selected)}>{t("Apply_Job")} <i className='icon bx bx-right-arrow-alt'></i></button>
                                                        <button className="btn btn-primary btn-sm" onClick={() => handleSaveJobClick(selected)}><i className='icon bx bx-save'></i>{t("Save_Job")}</button>
                                                    </div>
                                                </div> : ""
                                        } */}

                                        <div className="job-requirment-items">
                                            {
                                                recordcount > 0 ?
                                                    <>
                                                        {
                                                            searchResult.length > 0 ?
                                                                searchResult.map((item, i) =>
                                                                    <div className="form-check" id='myID' key={i} style={{ padding: "0.5rem", marginTop: "0.5rem" }}>
                                                                        {/* <input style={{ cursor: "pointer" }} className="form-check-input jckeckbox" type="checkbox" value={item.JobPostingID} id={"joblist" + i} onClick={() => handleCheckBoxClick(item.JobPostingID, "joblist" + i)} /> */}
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
                                                                                <span>{t("Employer")}:</span> <span className="text-success" style={{ cursor: "pointer" }} onClick={() => handleFilterClientClick(item.ClientID)}><b>{item.ClientDisplayName ? item.ClientDisplayName : item.RADisplayName}</b> <small > ({t("View_all_jobs_of_this_employer")})</small></span>
                                                                                <span style={{ float: "right" }}><span className="info">{t("Date of Job Posting")}: </span>{item.StartDate}</span>
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                ) :
                                                                resultByAssignmentId.map((item, i) =>
                                                                    <div className="form-check" id='myID' key={i} style={{ padding: "0.5rem", marginTop: "0.5rem" }}>
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
                                            <div className='no-of-rows mt-4' style={{ alignItems: "center", color: "#82919E" }}>
                                                {t("Records_Total")}
                                                : <span style={{ color: "#FF5C35" }}>{recordcount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
            </Layout >
        </>
    )
}

export default AdvanceSearchResult