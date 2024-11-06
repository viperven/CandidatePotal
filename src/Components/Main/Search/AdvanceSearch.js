import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import authimg from '../../../assets/imgs/auth.png'
import Layout from '../../../Layout/Layout'
import '../../../assets/css/styles.css';
import { AdvanceSearchService } from '../../../Services/AdvanceSearchService';
import { useTranslation } from 'react-i18next';

function AdvanceSearch() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loc = useLocation();
  const qs = loc.state ? loc.state.qs : null;
  const { handleSubmit } = useForm();
  const [errormessage, seterrormessage] = useState("");
  //set value in usestate for dropdown
  const [value, setValue] = useState("");
  const [KeyWordsList, setKeyWordsList] = useState([]);
  const [KeyWordsAnyList, setKeyWordsAnyList] = useState([]);
  const [LocationList, setLocationList] = useState([]);
  const [SearchInList, SetSearchInList] = useState([]);
  const [JobsPostedwithinList, setJobsPostedwithinList] = useState([]);
  const [IndustryList, setIndustryList] = useState([]);
  const [QualificationList, setQualificationList] = useState([]);
  //set value in usestate for dropdown end

  //For dropdown-selected state constants
  const [FormSelectedAllOrAnyKeywords, setFormSelectedAllOrAnyKeywords] = useState("");
  const [selectedOptionForLocation, setSelectedOptionForLocation] = useState([]);
  const [selectedOptionForSearchIn, setselectedOptionForSearchIn] = useState("");
  const [selectedOptionForJobPostedWithin, setselectedOptionForJobPostedWithin] = useState("");
  const [FormSelectedJobCode, setFormSelectedJobCode] = useState("");
  const [selectedOptionForIndustry, setselectedOptionForIndustry] = useState([]);
  const [selectedOptionForQualification, setselectedOptionForQualification] = useState("");
  const [FormSelectedYearlySalary, setFormSelectedYearlySalary] = useState("");
  const [FormSelectedExperienceFrom, setFormSelectedExperienceFrom] = useState(0);
  const [FormSelectedExperienceTo, setFormSelectedExperienceTo] = useState(0);
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
    if (inputText) {
      seterrormessage("");
      initKeyWordsList(inputText);
    } else {
      setKeyWordsList([]);
    }
  }
  const handleSelectLocation = (selectedOption) => {
    if (selectedOption.length > 0) {
      if (selectedOption.length <= 5) {
        setSelectedOptionForLocation(selectedOption);
      }
      seterrormessage("");
    } else {
      setSelectedOptionForLocation(undefined);
    }
  }
  const handleSelectSearchIn = (data) => {
    if (data.target.value) {
      setselectedOptionForSearchIn(data.target.value);
      seterrormessage("");
    } else {
      setselectedOptionForSearchIn("");
    }
  }
  const handleSelectJobPostedWithin = (data) => {
    if (data.target.value) {
      setselectedOptionForJobPostedWithin(data.target.value);
      seterrormessage("");
    } else {
      setselectedOptionForJobPostedWithin(undefined);
    }
  }
  const handleJobCode = (data) => {
    if (data.target.value) {
      setFormSelectedJobCode(data.target.value);
      seterrormessage("");
    } else {
      setFormSelectedJobCode(undefined);
    }
  }
  const handleSelectIndustry = (selectedOption) => {
    if (selectedOption.length > 0) {
      if (selectedOption.length <= 6) {
        setselectedOptionForIndustry(selectedOption);
        seterrormessage("");
      }
    } else {
      setselectedOptionForIndustry(undefined);
    }
  }
  const handleSelectQualification = (selectedOption) => {
    if (selectedOption) {
      setselectedOptionForQualification(selectedOption);
      seterrormessage("");
    }
    else {
      setselectedOptionForQualification(undefined);
    }
  }
  const handleYearlySalary = (data) => {
    if (data.target.value) {
      setFormSelectedYearlySalary(data.target.value);
      seterrormessage("");
    } else {
      setFormSelectedYearlySalary(undefined);
    }
  }
  const handleExperienceFrom = (data) => {
    if (data.target.value) {
      setFormSelectedExperienceFrom(data.target.value);
      seterrormessage("");
    } else {
      setFormSelectedExperienceFrom(undefined);
    }
  }
  const handleExperienceTo = (data) => {
    if (data.target.value) {
      setFormSelectedExperienceTo(data.target.value);
      seterrormessage("");
    } else {
      setFormSelectedExperienceTo(undefined);
    }
  }

  //get All Fields List

  const initKeyWordsList = async (inputText) => {
    try {
      if (inputText !== "" || inputText !== undefined || inputText !== null) {
        const keyWords = await AdvanceSearchService.GetKeyWords(inputText);
        console.log(keyWords);
        if (keyWords.isSuccess) {
          const res = JSON.parse(keyWords.apiData);
          const keywordsuggesstion = [];
          res.forEach(element => {
            keywordsuggesstion.push(element.KeyWord)
          });
          keywordsuggesstion ? setKeyWordsList(keywordsuggesstion) : setKeyWordsList([]);
        }
        else {
          setKeyWordsList([]);
        }
      }
    } catch (error) {

    }

  }
  const initKeyWordsAnyList = async () => {
    const keyWords = await AdvanceSearchService.getKeywordsAnyDropDownList();
    keyWords ? setKeyWordsAnyList(keyWords) : setKeyWordsAnyList({});
  }
  const initLocationList = async () => {
    const location = await AdvanceSearchService.getLocationDropDownList();
    location ? setLocationList(location) : setLocationList({});
  }
  const GetSearchInList = async () => {
    const search = await AdvanceSearchService.GetSearchIn();
    search ? SetSearchInList(search) : SetSearchInList({});
  }
  const initJobsPostedwithinList = async () => {
    const JobsPostedwithin = await AdvanceSearchService.getJobsPostedwithin();
    JobsPostedwithin ? setJobsPostedwithinList(JobsPostedwithin) : setJobsPostedwithinList({});
  }
  const initIndustryList = async () => {
    const industry = await AdvanceSearchService.getIndustryDropDownList();
    industry ? setIndustryList(industry) : setIndustryList({});
  }
  const initQualificationList = async () => {
    const qualificationlist = await AdvanceSearchService.getQualificationDropDownList();
    qualificationlist ? setQualificationList(qualificationlist) : setQualificationList({});
  }
  //get All Fields List End

  //form submit
  const bindFieldsForReturnQS = (parmQS) => {
    if (parmQS.Keywords !== null && parmQS.Keywords !== "" && parmQS.Keywords !== undefined) {
      document.getElementById('myInput').value = parmQS.Keywords;
    }
    if (parmQS.AllOrAnyKeywords) {
      setFormSelectedAllOrAnyKeywords(parmQS.AllOrAnyKeywords);
    }
    if (parmQS.Location.length > 0) {
      setSelectedOptionForLocation(parmQS.Location);
    }
    if (parmQS.Searchin !== null && parmQS.Searchin !== "" && parmQS.Searchin !== undefined) {
      setselectedOptionForSearchIn(parmQS.Searchin);
    }
    if (parmQS.JobsPostedWithin !== null && parmQS.JobsPostedWithin !== "" && parmQS.JobsPostedWithin !== undefined) {
      setselectedOptionForJobPostedWithin(parmQS.JobsPostedWithin);
    }
    if (parmQS.JobCode !== null && parmQS.JobCode !== "" && parmQS.JobCode !== undefined) {
      setFormSelectedJobCode(parmQS.JobCode);
    }
    if (parmQS.Industry.length > 0) {
      setselectedOptionForIndustry(parmQS.Industry);
    }
    if (parmQS.Qualification !== null && parmQS.Qualification !== "" && parmQS.Qualification !== undefined) {
      setselectedOptionForQualification(parmQS.Qualification);
    }
    if (parmQS.YearlySalary !== null && parmQS.YearlySalary !== "" && parmQS.YearlySalary !== undefined) {
      setFormSelectedYearlySalary(parmQS.YearlySalary);
    }
    if (parmQS.ExperienceFrom > 0) {
      setFormSelectedExperienceFrom(parmQS.ExperienceFrom);
    }
    if (parmQS.ExperienceTo > 0) {
      setFormSelectedExperienceTo(parmQS.ExperienceTo);
    }
  }
  const isFormValid = () => {
    setValue(document.getElementById('myInput').value);
    let keywordValue = document.getElementById('myInput').value;
    let errCount = 0;
    errCount += (keywordValue === "" || keywordValue === undefined || keywordValue === null) ? 1 : 0;
    errCount += (FormSelectedJobCode === "" || FormSelectedJobCode === undefined || FormSelectedJobCode === null) ? 1 : 0;
    errCount += (FormSelectedYearlySalary === "" || FormSelectedYearlySalary === 0 || FormSelectedYearlySalary === undefined || FormSelectedYearlySalary === null) ? 1 : 0;
    errCount += (FormSelectedExperienceFrom === 0 || FormSelectedExperienceFrom === undefined || FormSelectedExperienceFrom === null) ? 1 : 0;
    errCount += (FormSelectedExperienceTo === 0 || FormSelectedExperienceTo === undefined || FormSelectedExperienceTo === null) ? 1 : 0;
    errCount += (FormSelectedAllOrAnyKeywords === "" || FormSelectedAllOrAnyKeywords === null || FormSelectedAllOrAnyKeywords === undefined) ? 1 : 0;
    errCount += (selectedOptionForLocation.length === 0 || selectedOptionForLocation.length === undefined) ? 1 : 0;
    errCount += (selectedOptionForSearchIn === "" || selectedOptionForSearchIn === 0 || selectedOptionForSearchIn === undefined) ? 1 : 0;
    errCount += (selectedOptionForJobPostedWithin === 0 || selectedOptionForJobPostedWithin === undefined) ? 1 : 0;
    errCount += (selectedOptionForIndustry.length === 0 || selectedOptionForIndustry.length === undefined) ? 1 : 0;
    errCount += (selectedOptionForQualification === "" || selectedOptionForQualification === 0 || selectedOptionForQualification === undefined) ? 1 : 0;
    return errCount <= 9 ? true : false;
  }
  const handleAdvanceSearchSubmit = async () => {
    setValue(document.getElementById('myInput').value);
    let keywordValue = document.getElementById('myInput').value;
    let keyWord = "";
    if (keywordValue) {
      if (keywordValue !== "" || keywordValue !== null || keywordValue !== undefined) {
        keyWord = keywordValue;
      }
    }
    let allOrAnyKeywords = document.getElementById("keywords");
    let allOrAnyKeywordsID = allOrAnyKeywords.options[allOrAnyKeywords.selectedIndex].value;
    let searchIn = "";
    if (selectedOptionForSearchIn !== "" || selectedOptionForSearchIn !== null || selectedOptionForSearchIn !== undefined) {
      searchIn = selectedOptionForSearchIn;
    }
    let JobsPostedwithin = 0;
    if (selectedOptionForJobPostedWithin !== 0 || selectedOptionForJobPostedWithin !== null || selectedOptionForJobPostedWithin !== undefined) {
      JobsPostedwithin = selectedOptionForJobPostedWithin;
    }
    let JobCode = "";
    if (FormSelectedJobCode) {
      if (FormSelectedJobCode != "" || FormSelectedJobCode != null || FormSelectedJobCode != undefined) {
        JobCode = FormSelectedJobCode;
      }
    }

    let qualification = "";
    if (selectedOptionForQualification !== "" || selectedOptionForQualification !== null || selectedOptionForQualification !== undefined) {
      qualification = selectedOptionForQualification;
    }
    let yearlySalary = "";
    if (FormSelectedYearlySalary !== "" || FormSelectedYearlySalary !== null || FormSelectedYearlySalary !== undefined) {
      yearlySalary = FormSelectedYearlySalary;
    }
    let experienceFrom = 0;
    if (FormSelectedExperienceFrom !== "" || FormSelectedExperienceFrom !== null || FormSelectedExperienceFrom !== undefined) {
      experienceFrom = parseInt(FormSelectedExperienceFrom) || 0;
    }
    let experienceTo = 0;
    if (FormSelectedExperienceTo !== "" || FormSelectedExperienceTo !== null || FormSelectedExperienceTo !== undefined) {
      experienceTo = parseInt(FormSelectedExperienceTo) || 0;
    }
    if (isFormValid()) {
      let obj = "";
      let IsAdvanceSearch = "as_asr&qID=As";
      try {
        obj += IsAdvanceSearch;
        if (keyWord != "" && keyWord !== null && keyWord != undefined) {
          const words = encodeURIComponent(keyWord).replace(/'/g, "%27").replace(/"/g, "%22");
          obj += "&Keywords=" + words;
        }
        if (selectedOptionForLocation.length > 0 && selectedOptionForLocation != [] && selectedOptionForLocation != undefined) {
          let locid = "";
          for (let i = 0; i < selectedOptionForLocation.length; i++) {
            locid += selectedOptionForLocation[i].value + ",";
          }
          locid = locid.substring(0, locid.length - 1);
          obj += "&locId=" + locid;
          let locname = "";
          for (let i = 0; i < selectedOptionForLocation.length; i++) {

            locname += selectedOptionForLocation[i].label + ",";
          }
          locname = locname.substring(0, locname.length - 1);
          obj += "&locName=" + locname;
        }
        if (searchIn != "" && searchIn != null && searchIn != undefined) {
          obj += "&Searchin=" + searchIn;
        }
        if (JobsPostedwithin != "" && JobsPostedwithin !== null && JobsPostedwithin != undefined) {
          obj += "&JobsPostedWithin=" + JobsPostedwithin;
        }
        if (JobCode != "" && JobCode != null && JobCode != undefined) {
          obj += "&JobCode=" + JobCode;
        }
        if (selectedOptionForIndustry != "" && selectedOptionForIndustry !== null && selectedOptionForIndustry != undefined) {
          let indid = "";
          for (let i = 0; i < selectedOptionForIndustry.length; i++) {
            indid += selectedOptionForIndustry[i].value + ",";
          }
          indid = indid.substring(0, indid.length - 1);
          obj += "&IndId=" + indid;
          let indname = "";
          for (let i = 0; i < selectedOptionForIndustry.length; i++) {

            indname += selectedOptionForIndustry[i].label + ",";
          }
          indname = indname.substring(0, indname.length - 1);
          obj += "&IndName=" + indname;
        }
        if (qualification != "" && qualification != null && qualification != undefined) {
          obj += "&QualificationID=" + qualification.value;
        }
        if (yearlySalary != "" && yearlySalary != null && yearlySalary != undefined) {
          obj += "&YearlySalary=" + yearlySalary;
        }
        if (experienceFrom != "" && experienceFrom !== null && experienceFrom != undefined) {
          obj += "&ExperienceFrom=" + experienceFrom;
        }
        if (experienceTo != "" && experienceTo != null && experienceTo != undefined) {
          obj += "&ExperienceTo=" + experienceTo;
        }
        if (allOrAnyKeywordsID != "" && allOrAnyKeywordsID != null && allOrAnyKeywordsID != undefined) {
          if (allOrAnyKeywordsID === "false") {
            obj += "&keyAny=" + 1 + "";
          }
          else {
            obj += "&keyAny=" + 0 + "";
          }
        }

      } catch (error) {

      }
      navigate({
        pathname: '/advancesearchresult',
        search: "ref=" + obj,
      })

    }
    else {
      seterrormessage("Please input atleast one field...")
      // document.getElementById("errormessage").innerHTML = "Please input atleast one field..."
    }
  }
  //form submit end
  useEffect(() => {
    initKeyWordsAnyList();
    initLocationList();
    GetSearchInList();
    initJobsPostedwithinList();
    initIndustryList();
    initQualificationList();
    if (qs) {
      bindFieldsForReturnQS(JSON.parse(atob(qs)))
    }
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    document.title = 'HuntsJob - Advanced Search';
  }, []);
  
  return (
    <>
      <Layout>
        <section>
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-4 mb-3">
                <div className="card card-guide shadow-sm">
                  <div className="img-icon">
                    <img src={authimg} alt="" />
                  </div>
                  <div className="card-body">
                    <h3 className="title">{t("Advanced Search")}</h3>
                    <ul className="list-check">
                      <li>{t("Advanced_Search_Page_P1")}</li>
                      <li>{t("Advanced_Search_Page_P2")}</li>
                      <li>{t("Advanced_Search_Page_P3")}</li>
                      <li>{t("Advanced_Search_Page_P4")}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="card-body-header">
                      <h2 className="card-title flex-fill">{t("Advanced Search")}</h2>
                      {/* <!-- <a href="advanced-search.html" className="btn btn-outline-primary btn-sm">Advanced Search</a> --> */}
                    </div>
                    <form onSubmit={handleSubmit(handleAdvanceSearchSubmit)}>
                      <div className="row" >
                        <div className="col-lg-8 form-group" style={{ position: "relative" }}>
                          <label htmlFor="" className="form-label">{t("Keywords")}</label>

                          <input type="text" className="form-control" placeholder={t("Quick_Search_Placeholder")} list='KeywardSuggetions'
                            id="myInput"
                            autoComplete='off'
                            onChange={(e) => handleInputChange(e.target.value)}
                          // onBlur={()=>setKeyWordsList([])}
                          />

                          <div className={KeyWordsList.length > 0 ? "search-datalist-div" : "searchlist-hidden"}>
                            <ul className='searchlist advance-searchlist' style={{ marginLeft: '12px', }}>
                              {KeyWordsList.map((keyword, i) => {
                                return (
                                  <li onClick={(e) => onClickKeywordHandler(e)} className='datalist-list' key={keyword + "i"}>{keyword}</li>
                                )
                              })
                              }
                            </ul>
                          </div>

                          <div id="fileHelpId" className="form-text">{t("Enter Keywords to search Jobs")}</div>
                        </div>
                        <div className="col-lg-4 form-group">
                          <label htmlFor="" className="form-label">{t("Words")}</label>
                          <select name="language" className="form-select" id='keywords'>
                            {
                              KeyWordsAnyList.map((item, i) =>
                                <option key={i} value={item.value}>{item.label}</option>
                              )
                            }
                          </select>
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
                          <div id="fileHelpId" className="form-text">* {t("You can select multiple max 5 location")}</div>
                        </div>
                        <div className="col-12 form-group">
                          <label htmlFor="" className="form-label">{t("Search_in")}</label>
                          <select name="language" className="form-select"
                            value={selectedOptionForSearchIn} onChange={handleSelectSearchIn}
                          >
                            {
                              SearchInList.map((item, i) =>
                                <option key={i} value={item.value}>{item.label}</option>
                              )
                            }
                          </select>
                        </div>
                        <div className="col-12 form-group">
                          <label htmlFor="" className="form-label">{t("Job_Posted_Within")}</label>
                          <select name="language" className="form-select"
                            value={selectedOptionForJobPostedWithin} onChange={handleSelectJobPostedWithin}
                          >
                            {
                              JobsPostedwithinList.map((item, i) =>
                                item.label === "All" ?
                                  <option key={i} value="">{item.label}</option> :
                                  <option key={i} value={item.value}>{item.label}</option>
                              )
                            }
                          </select>
                        </div>
                        <div className="col-12 form-group">
                          <label htmlFor="" className="form-label">{t("Job Code")}</label>
                          <input type="text" className="form-control" placeholder={t("Job Code")}
                            value={FormSelectedJobCode} onChange={handleJobCode}
                            maxLength="20"
                          />
                        </div>
                        <div className="col-12 form-group">
                          <label htmlFor="" className="form-label">{t("Industry")}</label>
                          <Select
                            placeholder={t("Select")}
                            onChange={handleSelectIndustry}
                            value={selectedOptionForIndustry}
                            isMulti={true}
                            options={IndustryList}
                          />
                          <div id="fileHelpId" className="form-text">* {t("You can select multiple max 6 industries")}</div>
                        </div>
                        <div className="col-12 form-group">
                          <label htmlFor="" className="form-label">{t("Qualification")}</label>
                          <Select
                            placeholder={t("Select")}
                            onChange={handleSelectQualification}
                            value={selectedOptionForQualification}
                            options={QualificationList}
                            isClearable
                          />
                        </div>
                        <div className="col-12 form-group" style={{ display: "none" }}>
                          <label htmlFor="" className="form-label">{t("Salary_PA")}</label>
                          <div className="input-group">
                            <span className="input-group-text" ><i className='icon bx bx-dollar'></i></span>
                            <input type="number" min="0" className="form-control" placeholder={t("Salary_Placeholder")}
                              value={FormSelectedYearlySalary} onChange={handleYearlySalary}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 form-group">
                          <label htmlFor="" className="form-label">{t("Experience_From")}</label>
                          <input type="text" pattern="[0-9]*" maxLength={"2"}   className="form-control" placeholder={t("Experience_From")}
                            value={FormSelectedExperienceFrom} onChange={handleExperienceFrom}
                          />
                        </div>
                        <div className="col-lg-6 form-group">
                          <label htmlFor="" className="form-label">{t("Experience_To")}</label>
                          <input type="text" pattern="[0-9]*" maxLength={"2"}   className="form-control" placeholder={t("Experience_To")}
                            value={FormSelectedExperienceTo} onChange={handleExperienceTo}
                          />
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

export default AdvanceSearch