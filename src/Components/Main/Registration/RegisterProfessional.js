import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { CommonService } from "../../../Services/CommonService";
import { ProfileService } from "../../../Services/Profile/ProfileService";
import { CandidateRegService } from "../../../Services/CanRegistration/CandidateRegService";
import moment from 'moment';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import '../../../assets/css/styles.css';
import { useTranslation } from 'react-i18next';
import noData from "../../../assets/imgs/professional.jpg";


function RegisterProfessional({ candidateID, TriggerCallBackResponse, LoginProcess }) {
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
  const navigate = useNavigate();
  const search = useLocation().search;
  const { register, setValue, clearErrors, watch, formState: { errors }, handleSubmit } = useForm();
  const [show, setshow] = useState(false);
  const [iProfessionalData, setiProfessionalData] = useState([]);
  const [selectedOptionForLocation, setSelectedOptionForLocation] = useState([]);
  const [selectedOptionForPosition, setSelectedOptionForPosition] = useState([]);
  const TodayDate = new Date().toISOString().split('T')[0];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const handleClose = () => {
    setshow(false);
    clearFieldErrors();
  }
  const clearFieldErrors = () => {
    clearErrors("company");
    clearErrors("location");
    clearErrors("position");
    clearErrors("startDate");
  }
  const openModal = () => {
    setshow(true);
    setValue("company", "");
    setSelectedOptionForLocation([]);
    setSelectedOptionForPosition([]);
    setValue("startDate", "");
    setValue("endDate", "");
    clearFieldErrors();
    setTimeout(() => {
      document.getElementById("idxID").value = "";
    }, 300);
  }
  const [openLoader, setopenLoader] = useState(false);
  const [iJobLocationList, setiJobLocationList] = useState([]);
  const [iCurrentPOSList, setiCurrentPOSList] = useState([]);

  const initJobLocationList = async () => {
    const loc = await ProfileService.getLocationList();
    loc ? setiJobLocationList(loc) : setiJobLocationList([]);
  }
  const initCurrentPositionList = async () => {
    const pos = await CandidateRegService.get_FAS_DropdownList();
    if (pos.isSuccess) {
      setiCurrentPOSList(JSON.parse(pos.data));
    }
  }
  const handleStep3Submit = async (d) => {
    try {
      let errCount = checkDDValidation();
      if (errCount > 0) {
        return false;
      }
    } catch (error) {

    }
    const sDate = new Date(d.startDate);
    const eDate = IsNullOrEmpty(d.endDate) ? new Date() : new Date(d.endDate);
    const sMonth = monthNames[sDate.getMonth()];
    const eMonth = monthNames[eDate.getMonth()];;
    const sYear = sDate.getFullYear();
    const eYear = eDate.getFullYear();
    if (Date.parse(sDate) > Date.parse(eDate)) {
      alert("start date must be less than end date")
      return false;
    }
    const startDate = new Date(d.startDate);
    const endDate = IsNullOrEmpty(d.endDate) ? new Date() : new Date(d.endDate);
    const dDiff = Date.getFormattedDateDiff(startDate, endDate);
    let posText = "";
    iCurrentPOSList.filter(function (v) {
      if (v.value === parseInt(d.position)) {
        posText = v.label;
      }
    });
    let maxID = 0;
    let ID = parseInt(document.getElementById("idxID").value === "" ? 0 : document.getElementById("idxID").value);
    if (iProfessionalData.length > 0) {
      const ids = iProfessionalData.map(obj => {
        return obj.ID;
      });
      maxID = Math.max(...ids);
    }
    let profData = [];
    //check if company or position exist
    let exist = false;
    let msg = "";
    if (iProfessionalData.length > 0) {
      iProfessionalData.filter(function (fd) {
        if (ID !== parseInt(fd.ID)) {
          if (fd.Company.toLowerCase() === d.company.toLowerCase()) {
            msg = "company already exist";
            exist = true;
            return false;
          }
        }
      });
    }
    if (exist) {
      alert(msg);
      return false;
    }
    profData.push({
      ID: ID === 0 ? maxID + 1 : ID,
      Company: d.company,
      Location: parseInt(selectedOptionForLocation.value),
      LocationText: selectedOptionForLocation.label,
      positionID: parseInt(selectedOptionForPosition.value),
      PositionText: selectedOptionForPosition.label,
      StartDate: d.startDate,
      EndDate: d.endDate,
      DayDiffText: sMonth ? sMonth : 0 + " " + sYear + "-" + eMonth + " " + eYear + " . " + dDiff
    })

    const pData = iProfessionalData;
    pData.filter(function (data) {
      if (data.ID !== profData[0].ID) {
        profData.push({
          ID: data.ID,
          Company: data.Company,
          Location: parseInt(data.Location),
          LocationText: data.LocationText,
          positionID: parseInt(data.positionID),
          PositionText: data.PositionText,
          StartDate: data.StartDate,
          EndDate: data.EndDate,
          DayDiffText: data.DayDiffText
        })
      }
    })
    setiProfessionalData([]);
    handleClose();
    setiProfessionalData(profData);
  }
  const formatDateToDdMmYy = (inputDate) => {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    const formattedDate = day + "/" + month + "/" + year;
    return formattedDate;
  }
  const editPerfClick = (id, isDelete) => {
    if (!isDelete) {
      iProfessionalData.filter(function (v) {
        if (id === v.ID) {
          setshow(true);
          setTimeout(() => {
            document.getElementById("idxID").value = v.ID;
            setSelectedOptionForLocation({ value: v.Location, label: v.LocationText });
            document.getElementById("idxCompany").value = v.Company;
            setSelectedOptionForPosition({ value: v.positionID, label: v.PositionText });
            document.getElementById("idxStartDate").value = v.StartDate;
            document.getElementById("idxEndDate").value = v.EndDate;
          }, 300);
        }
      });
    }
    if (isDelete) {
      let temp = [];
      iProfessionalData.filter(function (d) {
        if (id !== d.ID) {
          temp.push(d);
        }
      });
      setiProfessionalData(temp);
    }
  }
  Date.getFormattedDateDiff = function (date1, date2) {
    var b = moment(date1),
      a = moment(date2),
      intervals = ['years', 'months'],
      out = [];

    for (var i = 0; i < intervals.length; i++) {
      var diff = a.diff(b, intervals[i]);
      b.add(diff, intervals[i]);
      out.push(diff + ' ' + intervals[i]);
    }
    return out.join(' ');
  };
  const IsNullOrEmpty = (v) => {
    if (v === "" || v === null || v === undefined || v === 0 || v === "0") {
      return true;
    } else {
      return false;
    }
  }
  const handleSelectPosition = (selectedOption) => {
    if (!IsNullOrEmpty(selectedOption)) {
      setSelectedOptionForPosition(selectedOption);
      document.getElementById("idxPositionError").innerHTML = "";
    }
    else {
      setSelectedOptionForPosition([]);
      document.getElementById("idxPositionError").innerHTML = "Please select position";
    }
  }
  const handleSelectLocation = (selectedOption) => {
    if (!IsNullOrEmpty(selectedOption)) {
      setSelectedOptionForLocation(selectedOption);
      document.getElementById("idxLocationError").innerHTML = "";
    }
    else {
      setSelectedOptionForLocation([]);
      document.getElementById("idxLocationError").innerHTML = "Please select location";
    }
  }
  const checkDDValidation = () => {
    let errCount = 0;
    let companyname = document.getElementById("idxCompany").value;
    if (companyname === "" || companyname === undefined || companyname === null) {
      errCount += 1;
    } else {

    }
    if (selectedOptionForPosition && selectedOptionForPosition.value) {
      document.getElementById("idxPositionError").innerHTML = "";
    } else {
      document.getElementById("idxPositionError").innerHTML = "Please select position";
      errCount += 1;
    }
    if (selectedOptionForLocation && selectedOptionForLocation.value) {
      document.getElementById("idxLocationError").innerHTML = "";
    } else {
      document.getElementById("idxLocationError").innerHTML = "Please select location";
      errCount += 1;
    }
    return errCount;
  }
  const submitClick = () => {
    checkDDValidation();
  }
  const handleFinalStep3Submit = async () => {
    try {
      if (iProfessionalData.length > 0) {
        const reqData = {
          EncCandidateID: candidateID,
          Exp: iProfessionalData
        }
        setopenLoader(true);
        const res = await CandidateRegService.save_Registration_Step3(reqData);
        setopenLoader(false);
        if (res.isSuccess) {
          TriggerCallBackResponse(4, candidateID, LoginProcess)
        } else {
          ShowAlert(res.message);
        }
      } else {
        ShowAlert(0, "Please add professional data");
      }
    } catch (error) {
      setopenLoader(false);
    }
  }
  const handleProfessionalSkipClick = () => {
    TriggerCallBackResponse(4, candidateID, LoginProcess);
  }
  useEffect(() => {
    // const qsCanID = new URLSearchParams(search).get('qs');
    // if (qsCanID) {
    //   setcandidateID(qsCanID);
    // } else {
    //   navigate("/404");
    // }
    initJobLocationList();
    initCurrentPositionList();
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
            {t("Add_Professional_Dtails")}
          </Modal.Title>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => handleClose()}></button>
        </Modal.Header>
        <Modal.Body>
          <form method="POST" onSubmit={handleSubmit(handleStep3Submit)}>
            <input type="hidden" id="idxID" name="idxID"
              {...register("idxID",
                {
                })
              }
            />
            <div className="row">
              {/* <div className="col-12 form-group">
                <label htmlFor="" className="form-label">Title</label>
                <input type="text" className="form-control" placeholder="Title" />
              </div> */}
              <div className="col-12 form-group">
                <label htmlFor="" className="form-label">{t("Company")} <span className="text-danger ">*</span></label>
                <input type="text"
                  className="form-control"
                  placeholder={t("Company_Placeholder")}
                  id="idxCompany"
                  name="company"
                  maxLength={30}
                  {...register("company",
                    {
                      required: true,
                    })
                  }
                />
                {errors.company?.type === 'required' && <p className='text-danger mt-1 f13' >Please enter company name</p>}

              </div>
              <div className="col-12 form-group">
                <label htmlFor="" className="form-label">{t("Location")} <span className="text-danger ">*</span></label>
                <Select
                  placeholder={t("Select")}
                  onChange={handleSelectLocation}
                  value={selectedOptionForLocation}
                  options={iJobLocationList}
                  isClearable
                />
                <span className="text-danger f13" id="idxLocationError"></span>
              </div>
              <div className="col-12 form-group">
                <label htmlFor="" className="form-label">{t("Position")} <span className="text-danger ">*</span></label>
                <Select
                  placeholder={t("Select")}
                  onChange={handleSelectPosition}
                  value={selectedOptionForPosition}
                  options={iCurrentPOSList}
                  isClearable
                />
                <span className="text-danger f13" id="idxPositionError"></span>
                <span className="text-danger f13" id="idxLocationError"></span>
              </div>

              <div className="col-lg-6 form-group">
                <label htmlFor="" className="form-label">{t("Joining Date of above Company")}</label>
                <div className="input-group input-group-date datepicker date">
                  <input type="date"
                    className="form-control"
                    id="idxStartDate"
                    name="startDate"
                    max={TodayDate}
                    {...register("startDate",
                      {
                        //required: true,
                      })
                    }
                  />
                </div>
                {errors.startDate?.type === 'required' && <p className='text-danger mt-1 f13' >Please select startDate</p>}
              </div>

              <div className="col-lg-6 form-group">
                <label htmlFor="" className="form-label">{t("Working Till")}</label>
                <div className="input-group input-group-date datepicker date">
                  <input type="date"
                    max="2099-12-31"
                    className="form-control"
                    id="idxEndDate"
                    name="endDate"
                    {...register("endDate",
                      {
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-2">
                <button type="button" className="btn btn-link" onClick={() => handleClose()}>{t("Close")}</button>
                <button type="submit" className="btn-primary btn" style={{ float: "right" }} onClick={() => submitClick()}  >{t("Submit")}</button>
              </div>
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
        <li className="active"><a href="#"><i className='bx bx-circle'></i>{t("Professional")}</a></li>
        <li><a href="#"><i className='bx bx-circle'></i>{t("Education")}</a></li>
        <li><a href="#"><i className='bx bx-circle'></i>{t("Personal")}</a></li>
      </ul>

      <div className="subtitle-container">
        <h5 className="card-sub-title">{t("Professional_Details")}</h5>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => openModal()}><i className='icon bx bx-plus'></i> {t("Add")}</button>
      </div>
      {/* <div className="professional-items">
        {
          iProfessionalData.map((d, i) =>
            <div className="professional-item" key={i}>
              <div className="header">
                <h5 className="title">{d.PositionText}</h5>
                <div className="actions">
                  <button className="btn btn-link" onClick={() => editPerfClick(d.ID, false)}><i className='bx bxs-edit-alt'></i></button>
                  <button className="btn btn-link" onClick={() => editPerfClick(d.ID, true)} ><i className='bx bx-trash-alt'></i></button>
                </div>
              </div>
              <h6>{d.Company}</h6>
              <p><span>{d.StartDate ? formatDateToDdMmYy(d.StartDate) : ""}</span>  {d.StartDate ? <span>- {d.EndDate ? formatDateToDdMmYy(d.EndDate) : "Currently Working"}</span> : ""}</p>
            </div>
          )
        }

      </div> */}
      {
        iProfessionalData.length > 0 ?
          <table className='table table-striped' style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Location</th>
                <th>Position</th>
                <th>Joining Date</th>
                <th>Working Till</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {iProfessionalData.map((d, i) =>

                <tr key={i} >
                  <td>{d.Company}</td>
                  <td>{d.LocationText}</td>
                  <td>{d.PositionText}</td>
                  <td>{d.StartDate ? formatDateToDdMmYy(d.StartDate) : ""}</td>
                  <td>{d.StartDate ? <span> {d.EndDate ? formatDateToDdMmYy(d.EndDate) : "Currently Working"}</span> : ""}</td>
                  <td>
                    {/* <button className="btn btn-link" onClick={() => editPerfClick(d.ID, false)}><i className='bx bxs-edit-alt'></i></button> */}
                    <button className="btn btn-link" onClick={() => editPerfClick(d.ID, true)} ><i className='bx bx-trash-alt'></i></button>
                  </td>
                </tr>
              )}


            </tbody>
          </table>
          : <div className="no-data-found" id="noRecord"  style={{cursor:"pointer"}} onClick={() => openModal()}>
            <img src={noData} alt="" />
            <p>Click On Add To Enter Your Professional Details</p>
          </div>
      }
      <div className="form-bottom-actions">
        <button type="button" className="btn-outline-primary btn" onClick={() => handleProfessionalSkipClick()}>{t("Skip")}</button>
        <button type="submit" className="btn-primary btn" onClick={() => handleFinalStep3Submit()}>{t("Next")}</button>
      </div>
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

export default RegisterProfessional