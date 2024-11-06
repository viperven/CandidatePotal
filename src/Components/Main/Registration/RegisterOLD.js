import React, { useEffect, useState } from 'react'
import Layout from '../../../Layout/Layout'
import auth from '../../../assets/imgs/auth.png'
import RegisterGeneral from './RegisterGeneral'
import RegisterBasic from './RegisterBasic';
import RegisterProfessional from './RegisterProfessional';
import RegisterEducation from './RegisterEducation';
import RegisterPersonal from './RegisterPersonal';
import { useNavigate } from "react-router-dom";
import '../../../assets/css/styles.css';
import { AuthService } from '../../../Services/AuthService';
import { useLocation } from "react-router-dom";
import { CommonService } from '../../../Services/CommonService';
import { useTranslation } from 'react-i18next';

function Register() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const search = useLocation().search;
    const [returnCandidateID, setReturnCandidateID] = useState("");
    const [loginProcessValue, setloginProcessValue] = useState([]);
    const [isShowRegStep1, setIsShowRegStep1] = useState(false);
    const [isShowRegStep2, setIsShowRegStep2] = useState(false);
    const [isShowRegStep3, setIsShowRegStep3] = useState(false);
    const [isShowRegStep4, setIsShowRegStep4] = useState(false);
    const [isShowRegStep5, setIsShowRegStep5] = useState(false);
    const CallBackResponse = (value, canID, loginValue) => {
        setReturnCandidateID(canID);
        setloginProcessValue(loginValue);
        switch (value) {
            case 2:
                // setisPhoneOrEmail(true);
                setIsShowRegStep1(false);
                setIsShowRegStep2(true);
                setIsShowRegStep3(false);
                setIsShowRegStep4(false);
                setIsShowRegStep5(false);
                break;
            case 3:
                setIsShowRegStep1(false);
                setIsShowRegStep2(false);
                setIsShowRegStep3(true);
                setIsShowRegStep4(false);
                setIsShowRegStep5(false);
                break;
            case 4:
                setIsShowRegStep1(false);
                setIsShowRegStep2(false);
                setIsShowRegStep3(false);
                setIsShowRegStep4(true);
                setIsShowRegStep5(false);
                break;
            case 5:
                setIsShowRegStep1(false);
                setIsShowRegStep2(false);
                setIsShowRegStep3(false);
                setIsShowRegStep4(false);
                setIsShowRegStep5(true);
                break;

            default:
                break;
        }

    }
    useEffect(() => {
        const emailClickCanID = new URLSearchParams(search).get('ecid');
        if (emailClickCanID) {
            CommonService.updateEmailClick(emailClickCanID).then(res => console.log(res));
        }
        let isInProgress = false;
        try {
            const pv = new URLSearchParams(search).get('isp');
            isInProgress = parseInt(pv) === 1 ? true : false;
        } catch (error) {
            isInProgress = false;
        }
        if (AuthService.isAuthenticatedUser()) {
            if (isInProgress) {
                setIsShowRegStep1(false);
                setIsShowRegStep2(true);
                setIsShowRegStep3(false);
                setIsShowRegStep4(false);
                setIsShowRegStep5(false);
            } else {
                navigate({
                    pathname: '/profiledashboard',
                });
            }
        } else {
            setIsShowRegStep1(true);
            setIsShowRegStep2(false);
            setIsShowRegStep3(false);
            setIsShowRegStep4(false);
            setIsShowRegStep5(false);
        }
    }, [])

    const [triggerFileInput, setTriggerFileInput] = useState(false);

    useEffect(() => {
        const trigger = localStorage.getItem("triggerFileInput");
        if (trigger === "true") {
            setTriggerFileInput(true);
            localStorage.removeItem("triggerFileInput");
        }
    }, []);
    useEffect(() => {
        document.title = 'HuntsJob - Register';
    }, []);

    return (
        <>
            <Layout>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 mb-3">
                                <div className="card card-guide shadow-sm">
                                    <div className="img-icon">
                                        <img src={auth} alt="" />
                                    </div>
                                    <div className="card-body">
                                        <h3 className="title">{t("New_Here")}?</h3>
                                        <ul className="list-check">
                                            <li>{t("Register_Page_P1")}</li>
                                            <li>{t("Register_Page_P2")}</li>
                                            <li>{t("Register_Page_P3")}</li>
                                            <li>{t("Register_Page_P4")}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 mb-3">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        {
                                            isShowRegStep1 ? <>
                                                <RegisterGeneral
                                                    TriggerCallBackResponse={CallBackResponse}
                                                    triggerFileInput={triggerFileInput}
                                                />
                                            </>
                                                : null
                                        }
                                        {
                                            isShowRegStep2 ?
                                                <RegisterBasic candidateID={returnCandidateID} LoginProcess={loginProcessValue} TriggerCallBackResponse={CallBackResponse} />

                                                : null
                                        }
                                        {
                                            isShowRegStep3 ? <>
                                                <RegisterProfessional candidateID={returnCandidateID} LoginProcess={loginProcessValue} TriggerCallBackResponse={CallBackResponse} />
                                            </>
                                                : null
                                        }
                                        {
                                            isShowRegStep4 ? <>
                                                <RegisterEducation candidateID={returnCandidateID} LoginProcess={loginProcessValue} TriggerCallBackResponse={CallBackResponse} />
                                            </>
                                                : null
                                        }
                                        {
                                            isShowRegStep5 ? <>
                                                <RegisterPersonal candidateID={returnCandidateID} LoginProcess={loginProcessValue} TriggerCallBackResponse={CallBackResponse} />
                                            </>
                                                : null
                                        }

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

export default Register