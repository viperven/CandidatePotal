import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from "react-router-dom";
import auth from '../../../assets/imgs/auth.png'
import Layout from '../../../Layout/Layout'
import '../../../assets/css/styles.css';
import 'bootstrap';
import { AdvanceSearchService } from '../../../Services/AdvanceSearchService';
import { useTranslation } from 'react-i18next';
import NewLoader from '../NewLoader';
import { Backdrop } from '@mui/material';

function QuickSearch() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const loc = useLocation();
    const qs = loc.state ? loc.state.qs : null;
    const { handleSubmit } = useForm();
    const [errormessage, seterrormessage] = useState("");

    //set value in usestate for dropdown
    const [KeyWordsList, setKeyWordsList] = useState([]);
    const [IndustryList, setIndustryList] = useState([]);
    const [LocationList, setLocationList] = useState([]);
    //set value in usestate for dropdown end

    //For dropdown-selected state constants
    const [selectedOptionForLocation, setSelectedOptionForLocation] = useState([]);
    const [FormSelectedJobCode, setFormSelectedJobCode] = useState("");
    const [selectedOptionForIndustry, setselectedOptionForIndustry] = useState([]);
    const [FormSelectedExperience, setFormSelectedExperience] = useState("");
    const [iKeyWordErrorMsg, setiKeyWordErrorMsg] = useState("");
    const [regxOnlySpecialChar, setregxOnlySpecialChar] = useState(/^[^a-zA-Z0-9]+$/);
    const [openLoader, setopenLoader] = React.useState(false);


    //For dropdown-selected state constants end
    const onClickKeywordHandler = (e) => {
        try {
            document.getElementById("myInput").value = e.target.innerHTML;
            setKeyWordsList([]);

        } catch (error) {
            console.log(error);
        }
    }
    const handleInputChange = (inputText) => {
        if (inputText.length > 0) {
            seterrormessage("");
            initKeyWordsList(inputText);
            if (regxOnlySpecialChar.test(inputText)) {
                setiKeyWordErrorMsg("Only special character(s) are  not allowed")
            } else {
                setiKeyWordErrorMsg("");
            }
        } else {
            setKeyWordsList([]);
        }

    }
    const handleJobCode = (data) => {
        if (data.target.value) {
            setFormSelectedJobCode(data.target.value);
            seterrormessage("");
        } else {
            setFormSelectedJobCode("");
        }
    }
    const handleSelectIndustry = (selectedOption) => {
        if (selectedOption.length > 0) {
            if (selectedOption.length <= 6) {
                setselectedOptionForIndustry(selectedOption);
                seterrormessage("");
            }
        } else {
            setselectedOptionForIndustry([]);
        }
    }
    const handleSelectLocation = (selectedOption) => {
        if (selectedOption.length > 0) {
            if (selectedOption.length <= 5) {
                setSelectedOptionForLocation(selectedOption);
            }
            seterrormessage("");
        } else {
            setSelectedOptionForLocation([]);
        }
    }
    // const handleExperience = (data) => {
    //     if (data.target.value) {
    //         setFormSelectedExperience(data.target.value);
    //     } else {
    //         setFormSelectedExperience("");
    //     }
    // }
    const handleExperience = (e) => {
        const value = e.target.value;
        const numericValue = value.replace(/\D/g, "");
        setFormSelectedExperience(numericValue);
      };
    const onclickhideKeyWordList = (e) => {
        //setTimeout(setKeyWordsList([]), 0);
        setKeyWordsList([])
    }
    //get All Fields List
    const initKeyWordsList = async (inputText) => {
        try {
            if (inputText !== "" || inputText !== undefined || inputText !== null) {
                const keyWords = await AdvanceSearchService.GetKeyWords(inputText);
                if (keyWords.isSuccess) {
                    const res = JSON.parse(keyWords.apiData);
                    const keywordsuggesstion = [];
                    res.forEach(element => {
                        keywordsuggesstion.push(element.KeyWord)
                    });
                    keywordsuggesstion ? setKeyWordsList(keywordsuggesstion) : setKeyWordsList([]);
                }
                else {
                    console.log("hash")
                    setKeyWordsList([]);
                }
            }
        } catch (error) {

        }
    }
    const initIndustryList = async () => {
        const industry = await AdvanceSearchService.getIndustryDropDownList();
        industry ? setIndustryList(industry) : setIndustryList({});
    }
    const initLocationList = async () => {
        const location = await AdvanceSearchService.getLocationDropDownList();
        location ? setLocationList(location) : setLocationList({});
    }
    //get All Fields List end

    //form submit
    const bindFieldsForReturnQS = (parmQS) => {
        if (parmQS.Keywords !== null && parmQS.Keywords !== "" && parmQS.Keywords !== undefined) {
            document.getElementById('myInput').value = parmQS.Keywords;
        }
        if (parmQS.Location.length > 0) {
            setSelectedOptionForLocation(parmQS.Location);
        }
        if (parmQS.JobCode !== null && parmQS.JobCode !== "" && parmQS.JobCode !== undefined) {
            setFormSelectedJobCode(parmQS.JobCode);
        }
        if (parmQS.Industry.length > 0) {
            setselectedOptionForIndustry(parmQS.Industry);
        }
        if (parmQS.ExperienceFrom > 0) {
            setFormSelectedExperience(parmQS.ExperienceFrom);
        }
    }
    const isFormValid = () => {
        let keywordValue = document.getElementById('myInput').value;
        let errCount = 0;
        errCount += (keywordValue === "" || keywordValue === undefined || keywordValue === null) ? 1 : 0;
        errCount += (FormSelectedJobCode === "" || FormSelectedJobCode === undefined || FormSelectedJobCode === null) ? 1 : 0;
        errCount += (selectedOptionForIndustry.length === 0 || selectedOptionForIndustry.length === undefined) ? 1 : 0;
        errCount += (selectedOptionForLocation.length === 0 || selectedOptionForLocation.length === undefined) ? 1 : 0;
        errCount += (FormSelectedExperience === "" || FormSelectedExperience === 0 || FormSelectedExperience === undefined || FormSelectedExperience === null) ? 1 : 0;
        return errCount <= 4 ? true : false;
    }
    const replaceSpecialCharFromUrl = (v) => {
        v.replace("$", "")
            .replace(/ /g, '').replace("%20", "-").replace(" ", '-').replace("%21", "")
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
        return v;
    }
    const handleQuickSearchSubmit = async () => {
        let keywordValue = document.getElementById('myInput').value;
        let locName = "";
        let keyWord = "";
        if (keywordValue) {
            if (keywordValue !== "" || keywordValue !== null || keywordValue !== undefined) {
                keyWord = keywordValue;
            }
        }
        let JobCode = "";
        if (FormSelectedJobCode) {
            if (FormSelectedJobCode != "" || FormSelectedJobCode != null || FormSelectedJobCode != undefined) {
                JobCode = FormSelectedJobCode;
            }
        }
        let experience = 0;
        if (FormSelectedExperience !== "" || FormSelectedExperience !== null || FormSelectedExperience !== undefined) {
            experience = parseInt(FormSelectedExperience) || 0;
        }
        if (isFormValid()) {
            let obj = "";
            try {

                if (selectedOptionForLocation.length > 0 && selectedOptionForLocation != undefined) {
                    let locid = "";
                    let locname = "";
                    for (let i = 0; i < selectedOptionForLocation.length; i++) {
                        locid += selectedOptionForLocation[i].value + ",";
                        locname += selectedOptionForLocation[i].label.trim().replace("&", "and").replace(" ", "-") + "-";
                    }
                    locid = locid.substring(0, locid.length - 1);
                    locname = locname.substring(0, locname.length - 1);
                    locName = locname;
                }
                if (JobCode != "" && JobCode != null && JobCode != undefined) {
                    obj += "jobCode=" + JobCode;
                }
                if (selectedOptionForIndustry != "" && selectedOptionForIndustry !== null && selectedOptionForIndustry != undefined) {
                    let indid = "";
                    for (let i = 0; i < selectedOptionForIndustry.length; i++) {
                        indid += selectedOptionForIndustry[i].value + ",";
                    }
                    indid = indid.substring(0, indid.length - 1);
                    obj += "&industryId=" + indid;
                    // let indname = "";
                    // for (let i = 0; i < selectedOptionForIndustry.length; i++) {

                    //     indname += selectedOptionForIndustry[i].label + ",";
                    // }
                    // indname = indname.substring(0, indname.length - 1);
                    // obj += "&indName=" + indname;
                }
                if (experience != "" && experience !== null && experience != undefined) {
                    obj += "&expFrom=" + experience;
                }

            } catch (error) {

            }
            // navigate({
            //     pathname: '/advancesearchresult',
            //     search: "ref=" + obj,
            // })
            if (regxOnlySpecialChar.test(keyWord)) {
                setiKeyWordErrorMsg("Only special character(s) are  not allowed")
                return false;
            } else {
                setiKeyWordErrorMsg("");
            }
            let seoCompatibleUrl = keyWord;
            if (seoCompatibleUrl !== "" && seoCompatibleUrl !== null && seoCompatibleUrl !== undefined) {
                seoCompatibleUrl = seoCompatibleUrl.replace("–", '-').replace(/[/]+/g, '-').replace(/[ ]+/g, '-');
            }
            if (locName !== "" && locName !== null && locName !== undefined) {

                seoCompatibleUrl = replaceSpecialCharFromUrl(seoCompatibleUrl) + "-jobs-in-" + replaceSpecialCharFromUrl(locName)
            } else {
                seoCompatibleUrl += "-jobs";
            }
            seoCompatibleUrl = replaceSpecialCharFromUrl(seoCompatibleUrl);
            navigate("/jobs/" + seoCompatibleUrl + "?" + obj)
        }
        else {
            seterrormessage("Please input atleast one field...");
        }

    }

    //form submit end
    useEffect(() => {
        initIndustryList();
        initLocationList();
        if (qs) {
            bindFieldsForReturnQS(JSON.parse(atob(qs)))
        }
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        document.title = 'HuntsJob - Quick Search';
    }, []);
    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
            >
                <NewLoader />
            </Backdrop>
            <Layout>
                <section style={{ padding: "0.5rem" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 mb-3">
                                <div className="card card-guide shadow-sm">
                                    <div className="img-icon">
                                        <img src={auth} alt="" />
                                    </div>
                                    <div className="card-body">
                                        <h3 className="title">{t("Quick Search")}</h3>
                                        <ul className="list-check">
                                            <li>{t("Quick_Search_Page_P1")}</li>
                                            <li>{t("Quick_Search_Page_P2")}</li>
                                            <li>{t("Quick_Search_Page_P3")}</li>
                                            <li>{t("Quick_Search_Page_P4")}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 mb-3">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="card-body-header">
                                            <h2 className="card-title flex-fill">{t("Quick Search")}</h2>
                                            <Link className="btn btn-outline-primary btn-sm" to="/AdvanceSearch">{t("Advanced Search")}</Link>
                                        </div>
                                        <form onSubmit={handleSubmit(handleQuickSearchSubmit)}>
                                            <div className="row">
                                                <div className="col-12 form-group" style={{ position: "relative" }}>
                                                    <label htmlFor="" className="form-label">{t("Keywords")}</label>

                                                    <input type="text" className="form-control" placeholder={t("Quick_Search_Placeholder")} list='KeywardSuggetions'
                                                        required
                                                        id="myInput"
                                                        autoComplete='off'
                                                        onChange={(e) => handleInputChange(e.target.value)}
                                                        // onBlur={() => setKeyWordsList([])}
                                                        onBlur={(e) => onclickhideKeyWordList(e.target.value)}
                                                    />
                                                    <div style={{ 'top': '80px', 'left': '10px' }} className={KeyWordsList.length > 0 ? "search-datalist-div" : "searchlist-hidden"}>
                                                        <ul className='searchlist'>
                                                            {KeyWordsList.map((keyword, i) => {
                                                                return (
                                                                    <li onMouseDown={(e) => onClickKeywordHandler(e)} className='datalist-list' key={keyword + "i"}>{keyword}</li>
                                                                )
                                                            })
                                                            }
                                                        </ul>
                                                    </div>


                                                    <div id="fileHelpId" className="form-text">{t("Enter Keywords to search Jobs")}.</div>
                                                    {iKeyWordErrorMsg === "" ? null : <span className='text-danger' style={{ fontSize: "0.875em" }} >{iKeyWordErrorMsg}</span>}
                                                </div>
                                                {/* <div className="col-12 form-group">
                                                    <label htmlFor="" className="form-label">{t("Job Code")}</label>
                                                    <input type="text" className="form-control" placeholder={t("Job Code")}
                                                        value={FormSelectedJobCode} onChange={handleJobCode}
                                                    />
                                                </div> */}
                                                <div className="col-12 form-group">
                                                    <label htmlFor="" className="form-label">{t("Industry")}</label>
                                                    <Select
                                                        placeholder={t("Select")}
                                                        onChange={handleSelectIndustry}
                                                        value={selectedOptionForIndustry}
                                                        isMulti={true}
                                                        options={IndustryList}
                                                    />
                                                    <div id="fileHelpId" className="form-text">* {t("You can select multiple max 6 industries")}.</div>
                                                </div>

                                                <div className="col-12 form-group">
                                                    <label htmlFor="" className="form-label">{t("Location2")}</label>
                                                    <Select
                                                        placeholder={t("Select")}
                                                        onChange={handleSelectLocation}
                                                        value={selectedOptionForLocation}
                                                        isMulti={true}
                                                        options={LocationList}
                                                    />
                                                    <div id="fileHelpId" className="form-text">* {t("You can select multiple max 5 location")}.</div>
                                                </div>


                                                <div className="col-12 form-group">
                                                    <label htmlFor="" className="form-label">{t("Experience")}</label>
                                                    <input type="text" placeholder={t("From")} pattern="[0-9]*" maxLength={"2"}   value={FormSelectedExperience} onChange={handleExperience} className="form-control" />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                {errormessage ? <span className='text-danger mt-1 small' style={{ fontStyle: "italic", textAlign: "center" }}>{t("Please input atleast one field")}</span> : null}
                                            </div>
                                            <div className="form-bottom-actions">
                                                <button type='submit' className="btn-primary btn">{t("Search")}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default QuickSearch