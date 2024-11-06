
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import 'bootstrap';
import '../../../assets/css/styles.css';
import { CommonService } from "../../../Services/CommonService";
import { ProfileService } from "../../../Services/Profile/ProfileService";
import { CandidateRegService } from "../../../Services/CanRegistration/CandidateRegService";
import userpng from '../../../assets/imgs/user.png';
import { useTranslation } from 'react-i18next';
import { AuthService } from '../../../Services/AuthService';
import Modal from "react-bootstrap/Modal";

function RegisterPersonal({ candidateID, LoginProcess }) {
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
  const maxPicSize = 1024 * 1024;
  const search = useLocation().search;
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [openLoader, setopenLoader] = useState(false);
  const { register, setValue, clearErrors, watch, formState: { errors }, handleSubmit } = useForm();
  const [selectedOptionForReligion, setSelectedOptionForReligion] = useState([]);
  const [selectedOptionForPIssuePlace, setSelectedOptionForPIssuePlace] = useState([]);
  const [iReligionList, setiReligionList] = useState([]);
  const [iLanguageList, setiLanguageList] = useState([]);
  const [iLocationList, setiLocationList] = useState([]);
  const [iLangProficiencyList, setiLangProficiencyList] = useState([]);
  const TodayDate = new Date().toISOString().split('T')[0];
  const [year, month, day] = TodayDate.split('-');
  const date = `${parseInt(year) - 18}-${month}-${day}`;
  const DOBdate = `${parseInt(year) - 60}-${month}-${day}`;
  const [iTempLangAndProf, setiTempLangAndProf] = useState([]);
  const [passportAvailableMessage, setPassportAvailableMessage] = useState("");
  const [passporteAVColor, setPassporteAVColor] = useState("#1bc23f");
  const [isShowPassportError, setisShowPassportError] = useState(false);
  const [passportErrorCount, setPassportErrorCount] = useState(0);
  const [languageSelectedValue, setlanguageSelectedValue] = useState([]);
  const [langProficiencySelectedValue, setlangProficiencySelectedValue] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [isShowLanguageErr, setisShowLanguageErr] = useState(false);
  const [isShowLangProficiencyErr, setisShowLangProficiencyErr] = useState(false);
  const [hasDateOfBirthErrMsg, sethasDateOfBirthErrMsg] = useState("");
  const [minSDate, setMinSDate] = useState("");
  const [minEDate, setMinDate] = useState("");
  const [maxEdate, setMaxDate] = useState("");
  const [isshowDateOFBirthErr, setIsshowDateOFBirthErr] = useState(false);
  //const [candidateID, setcandidateID] = useState("");

  const ProccedToLogin = async () => {
    setopenLoader(true);
    try {
      const res = await AuthService.LoginUser(LoginProcess.mobileno, LoginProcess.countryid, LoginProcess.password, "");
      setopenLoader(false);
      if (res.isSuccess) {
        navigate({
          pathname: '/profiledashboard',
        });
      } else {
        navigate({
          pathname: "/profiledashboard",
          search: "?qs=login"
        })
      }
    } catch (error) {
      console.log(error)
      setopenLoader(false);
    }
    setopenLoader(false);
  }
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
  const initReligionList = async () => {
    const rl = await CommonService.getReligionList();
    rl ? setiReligionList(rl) : setiReligionList([]);
  }
  const initLanguageList = async () => {
    const lang = await CandidateRegService.get_Language_DropdownList();
    if (lang.isSuccess) {
      setiLanguageList(JSON.parse(lang.data));
    }
  }
  const initLocationList = async () => {
    const loc = await ProfileService.getLocationList();
    loc ? setiLocationList(loc) : setiLocationList([]);
  }
  const initLanguageProficiencyList = async () => {
    const lp = await CandidateRegService.get_Lang_Proficiency_DropdownList();
    if (lp.isSuccess) {
      setiLangProficiencyList(JSON.parse(lp.data));
    }
  }
  const handleDateChange = (dt) => {
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
        sethasDateOfBirthErrMsg(`Age cannot be more than 60 Years. Date of Birth should be ${DOBdate} or Later`)
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
        setMinSDate(dt);
        setIsshowDateOFBirthErr(false);
      }
    } else {
      setIsshowDateOFBirthErr(true);
    }
  }
  const handleonclickReligion = (selectedOption) => {
    if (selectedOption) {
      setSelectedOptionForReligion(selectedOption);
    } else {
      setSelectedOptionForReligion([]);
    }
  }
  const handleonclickPIssuePlace = (selectedOption) => {
    if (selectedOption) {
      setSelectedOptionForPIssuePlace(selectedOption);
    } else {
      setSelectedOptionForPIssuePlace([]);
    }
  }

  const handleStep5Submit = async (d) => {
    if (IsNullOrEmpty(d.dob) && IsNullOrEmpty(d.gender) && IsNullOrEmpty(d.langprof) && IsNullOrEmpty(d.marital) && IsNullOrEmpty(d.ppExpDate) && IsNullOrEmpty(d.ppIStartDate) && IsNullOrEmpty(selectedOptionForPIssuePlace.value) && IsNullOrEmpty(d.ppno) && IsNullOrEmpty(selectedOptionForReligion.value) && d.pic.length <= 0) {
      // navigate("/login");
      ShowAlert(0, "please provide personal details");
    } else {
      let langXml = "";
      if (languageData) {
        langXml += "<Lang>";
        for (let i = 0; i < languageData.length; i++) {
          langXml += "<LangDetails>";
          langXml += "<LangID>" + parseInt(languageData[i].langID) + "</LangID>";
          langXml += "<LangProfID>" + parseInt(languageData[i].profieciencyID) + "</LangProfID>";
          langXml += "</LangDetails>";
        }
        langXml += "</Lang>";
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
        if (getAge(d.dob) <= 17) {
          ShowAlert(0, "Dob must be greater than 18")
          return false;
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

      let base64PicString = "";
      let fileName = "";
      if (d.pic.length > 0) {
        const file = d.pic[0];
        if (file && file.size > 0) {
          if (file.size > maxPicSize) {
            ShowAlert(0, "Upload photo less than 1 MB.");
            document.getElementById("file").value = "";
            return false;
          }
        }
        fileName = file.name;
        let fileExt = fileName.split('.').pop().toLowerCase();
        if (fileExt === 'gif' || fileExt === "jpg" || fileExt === "jpeg" || fileExt === "png" || fileExt === "jfif" || fileExt === "pjpeg" || fileExt === "svg" || fileExt === "webp") {
          base64PicString = await blobToBase64DataURL(file);
        } else {
          ShowAlert(0, "pic extension should be in .gif ,.jpg,.peg,.png,.jfif,.pjpeg,.svg,.webp ");
          return false;
        }
      }
      const reqData = {
        EncCandidateID: candidateID,
        Dob: IsNullOrEmpty(d.dob) ? "" : d.dob,
        Religion: IsNullOrEmpty(selectedOptionForReligion.value) ? 0 : parseInt(selectedOptionForReligion.value),
        Gender: IsNullOrEmpty(d.gender) ? "" : d.gender,
        MaritalStatus: IsNullOrEmpty(d.marital) ? 0 : parseInt(d.marital),
        LanguageXml: langXml,
        PassportNo: IsNullOrEmpty(d.ppno) ? "" : d.ppno,
        PPIssuedPlace: IsNullOrEmpty(selectedOptionForPIssuePlace.value) ? 0 : parseInt(selectedOptionForPIssuePlace.value),
        PPIssuedDate: IsNullOrEmpty(d.ppIStartDate) ? "" : d.ppIStartDate,
        PPExpiryDate: IsNullOrEmpty(d.ppExpDate) ? "" : d.ppExpDate,
        PhotoFile: base64PicString,
        FileName: fileName
      }
      try {
        setopenLoader(true);
        const res = await CandidateRegService.save_Registration_Step5(reqData);
        setopenLoader(false);
        if (res.isSuccess) {
          ShowAlert(1, "success");
          ProccedToLogin();
        } else {
          ShowAlert(0, res.message)
        }
        setopenLoader(false);
      } catch (error) {
        console.warn(error);
        setopenLoader(false);
      }
    }
  }
  const blobToBase64DataURL = (blob) => new Promise(
    resolvePromise => {
      const reader = new FileReader();
      reader.onload = () => resolvePromise(reader.result);
      reader.readAsDataURL(blob);
    }
  )
  const removeLanguage = (id) => {
    const element = document.getElementById(id);
    element.remove();
  }
  const checkIfDuplicateExists = (arr) => {
    return arr.map(o => o.LangID);
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
      ShowAlert(0, "Please select language and proficiency");
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
  const handleIssueDateChange = (e) => {
    setMinDate(e);
    const [year, month, day] = e.split('-');
    const maxdate = `${parseInt(year) + 10}-${month}-${day}`;
    setMaxDate(maxdate)
  }
  const handlePassportNoChange = (val) => {
    if (!IsNullOrEmpty(val)) {
      val = val.replace(/[^A-Z0-9]/g, '');
      setValue("ppno", val);
      //let regex = /^[A-Za-z]\d{8}$/;regex.test(val)
      if (true) {
        setisShowPassportError(false);
        if (val.length > 5) {
          isPassportAvailable(val)
        }
      }
      // else {
      //   setisShowPassportError(true);
      //   setPassportAvailableMessage("");
      // }
    } else {
      setPassportAvailableMessage("");
      setisShowPassportError(false);
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
    }
    setPassportErrorCount(errCount);
  }
  const IsNullOrEmpty = (v) => {
    if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
      return true;
    } else {
      return false;
    }
  }
  const gotoLogin = (candidateID) => {
    ProccedToLogin()
  }
  useEffect(() => {

    // const qsCanID = new URLSearchParams(search).get('qs');
    // if (IsNullOrEmpty(qsCanID)) {
    //   navigate("/404");
    // } else {
    //   setcandidateID(qsCanID)
    // }
    initReligionList();
    initLanguageList();
    initLanguageProficiencyList();
    initLocationList();
  }, [])

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
      <div className="card-body-header">
        <h2 className="card-title flex-fill">{t("Register_Heading")}</h2>

      </div>

      <ul className="stepper">
        <li className="completed"><a href="#"><i className='bx bxs-check-circle'></i>{t("General")}</a></li>
        <li className="completed"><a href="#"><i className='bx bxs-check-circle'></i>{t("Basic")}</a></li>
        <li className="completed"><a href="#"><i className='bx bxs-check-circle'></i>{t("Professional")}</a></li>
        <li className="completed"><a href="#"><i className='bx bxs-check-circle'></i>{t("Education")}</a></li>
        <li className="active"><a href="#"><i className='bx bx-circle'></i>{t("Personal")}</a></li>
      </ul>

      <div className="subtitle-container">
        <h5 className="card-sub-title">{t("Personal_Details")}</h5>
        {/* <!-- <button className="btn btn-outline-secondary btn-sm"><i className='icon bx bx-plus'></i> Add</button> --> */}
      </div>


      <form onSubmit={handleSubmit(handleStep5Submit)}>
        <div className="professional-items">
          <div className="professional-item">
            <div className="persnoal-info">
              <div className="avatar">
                <img src={userpng} alt="" id="output" width="150" />

              </div>
              <div className="details">
                <div className="action-info">
                  <input id="file" type="file" style={{ width: "90%" }}
                    {...register("pic",
                      {
                        onChange: (e) => { handleUploadImage(e) }
                      })
                    }
                  >
                  </input>
                </div>
                <p className="guide">
                  <span>accept only .jpeg,.png,.gif,.jpg,.bmp.</span>&nbsp;&nbsp;
                  <span>Max: 1 MB</span><br /></p>
              </div>
            </div>

          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 form-group">
            <label htmlFor="" className="form-label">{t("DOB")}</label>
            <div className="input-group input-group-date datepicker date" >
              <input type="date"
                className="form-control"
                placeholder={t("DOB")}
                id="idxDOB"
                name="dob"
                min={DOBdate}
                max={date ? date : TodayDate}
                {...register("dob",
                  {
                    onChange: (e) => { handleDateChange(e.target.value) }
                  })
                }
              />
            </div>
            {isshowDateOFBirthErr ? <p className='text-danger mt-1 f13'>{hasDateOfBirthErrMsg}</p> : null}
          </div>

          <div className="col-lg-6 form-group">
            <label htmlFor="" className="form-label">{t("Religion")}</label>
            <Select
              placeholder={t("Select")}
              onChange={handleonclickReligion}
              value={selectedOptionForReligion}
              options={iReligionList}
              isClearable
            />
          </div>

          <div className="col-lg-6 orm-group">
            <label htmlFor="" className="form-label">{t("Gender")}</label>
            <div className="radio-buttons">
              <div className="form-check">
                <input className="form-check-input" type="radio" id="male" name="gender" value="M"
                  {...register("gender",
                    {
                    })
                  }
                />
                <label className="form-check-label" htmlFor="male">
                  {t("Male")}
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="female" name="gender" value="F"
                  {...register("gender",
                    {
                    })
                  }
                />
                <label className="form-check-label" htmlFor="female">
                  {t("Female")}
                </label>
              </div>
            </div>
          </div>

          <div className="col-lg-6 form-group">
            <label htmlFor="" className="form-label">{t("Marital_Status")}</label>
            <div className="radio-buttons">
              <div className="form-check">
                <input className="form-check-input" type="radio" id="single" name="marital" value="1"
                  {...register("marital",
                    {
                    })
                  }
                />
                <label className="form-check-label" htmlFor="single">
                  Single
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="married" name="marital" value="6"
                  {...register("marital",
                    {
                    })
                  }
                />
                <label className="form-check-label" htmlFor="Married">
                  Married
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="divorced" name="marital" value="2"
                  {...register("marital",
                    {
                    })
                  }
                />
                <label className="form-check-label" htmlFor="Divorced">
                  Divorced
                </label>
              </div>
            </div>
          </div>

          <div className="col-12 form-group">
            <div className="header-label-action">
              <label htmlFor="" className="form-label">{t("Add_Language_Multiple_Language")}</label>
              <a className="btn btn-sm btn-outline-primary border-0" style={{ fontSize: "1rem" }} onClick={() => setshow(true)}><i className='bx bx-plus' ></i>{t("Add")}</a>
            </div>

            <div className="language-form" >
              <div className="row" id='ParentID'></div>
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

          <div className="col-lg-6 form-group">
            <label htmlFor="" className="form-label">{t("Passport_No")}</label>
            <input type="text" className="form-control" placeholder={t("Passport_No")} name="ppno" maxLength={15}
              {...register("ppno",
                {
                  onChange: (e) => { handlePassportNoChange(e.target.value) }
                })
              }
            />
            {passportAvailableMessage === "" ? null : <span className="f13" style={{ color: passporteAVColor }} >{passportAvailableMessage}<br /></span>}
            {isShowPassportError ? <p className='text-danger f13'>Please enter valid passport number</p> : null}
          </div>
          <div className="col-lg-6 form-group">
            <label htmlFor="" className="form-label">{t("Passport_Issue_place")}</label>
            <Select
              placeholder={t("Select")}
              onChange={handleonclickPIssuePlace}
              value={selectedOptionForPIssuePlace}
              options={iLocationList}
              isClearable
            />
          </div>

          <div className="col-lg-6 form-group">
            <label htmlFor="" className="form-label">{t("Passport_Issue_Date")}</label>
            <div className="input-group input-group-date datepicker date" >
              <input type="date" className="form-control" placeholder={t("Passport_Issue_Date")} id="idxStartDate" name="ppIStartDate" max={TodayDate}
                {...register("ppIStartDate",
                  {
                    onChange: (e) => { handleIssueDateChange(e.target.value) }
                  })
                }

              />
            </div>
          </div>

          <div className="col-lg-6 form-group">
            <label htmlFor="" className="form-label">{t("Passport_Expiry_Date")}</label>
            <div className="input-group input-group-date datepicker date" >
              <input type="date" className="form-control" placeholder={t("Passport_Expiry_Date")} id="idxEndDate" name="ppExpDate" min={minEDate} max={maxEdate}
                {...register("ppExpDate",
                  {
                    validate: (value) => value >= watch('ppIStartDate') || 'Expiry date must be after issue date',
                  })
                }
              />

            </div>
          </div>

        </div>
        <div className="form-bottom-actions">
          <button type="button" className="btn-outline-primary btn" onClick={() => gotoLogin(candidateID)}>{t("Skip_Finish")}</button>
          <button type="submit" className="btn-primary btn">{t("Finish")}</button>
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

export default RegisterPersonal