import React, { useState, useEffect } from 'react'
import Layout from '../../../Layout/Layout'
import password from '../../../assets/imgs/password.png'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthService } from '../../../Services/AuthService';
import { UserService } from '../../../Services/UserService';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ChangePassword() {
    const { t } = useTranslation();
    const [openLoader, setopenLoader] = React.useState(false);
    const navigate = useNavigate();
    const [message, setmessage] = useState("");
    const [errClassName, seterrClassName] = useState("");
    const { register, setValue, watch, formState: { errors }, handleSubmit } = useForm();
    const [isPasswordmatch, setisPasswordmatch] = useState(false);

    const fieldclear = () => {
        setValue("OldPassword", "");
        setValue("NewPassword", "");
        setValue("ConfirmNewPassword", "");
    }
    const handleShowPassword = (inputID, iconID) => {
        let input = document.getElementById(inputID);
        let icon = document.getElementById(iconID);
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("bx-hide");
            icon.classList.add("bx-show");
            icon.title = "hide password";
        } else {
            input.type = "password";
            icon.classList.remove("bx-show");
            icon.classList.add("bx-hide");
            icon.title = "show password";
        }
    }
    const handlenewpasswordchange = (v) => {
        if (v === null || v === undefined || v === "") {
            document.getElementById('showConfirmPassword').readOnly = true;
        } else {
            document.getElementById('showConfirmPassword').readOnly = false;
        }
        const Confirm_Password = document.getElementById("showConfirmPassword").value;
        console.log(Confirm_Password)
        if (Confirm_Password === v) {
            setisPasswordmatch(false);
        } else {
            setisPasswordmatch(true);
        }
    }
    const handlePasswordmatch = (event) => {
        if (event) {
            let conPasword = event;
            let newpassword = document.getElementById("showNewPassword").value;
            if (conPasword.length !== newpassword.length && conPasword !== newpassword) {
                setisPasswordmatch(true);
            }
            else {
                setisPasswordmatch(false);
            }
        }
    }
    const handleNewPasswordSave = async (data) => {
        setopenLoader(true);
        try {
            if (data.NewPassword === data.ConfirmNewPassword) {
                const res = await UserService.changeUserPassword(data.OldPassword, data.ConfirmNewPassword);
                if (res.isSuccess) {
                    setmessage(res.message);
                    seterrClassName("text-success")
                    const timer = setTimeout(() => {
                        setmessage("");
                    }, 3000);
                    fieldclear();
                    setopenLoader(false);
                    return () => clearTimeout(timer);
                } else {
                    setmessage(res.message);
                    seterrClassName("text-danger")
                    setopenLoader(false);
                }
            } else {
                setmessage("New password and confirm password do not matched")
                setopenLoader(false);
            }
        } catch (error) {
            setopenLoader(false);
        }
        setopenLoader(false);
    }
    useEffect(() => {
        if (AuthService.isAuthenticatedUser()) {
        } else {
            navigate({
                pathname: '/',
                search: "?qs=login",
            });
        }

    }, []);
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Layout>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 mb-3">
                                <div className="card card-guide shadow-sm">
                                    <div className="img-icon">
                                        <img src={password} alt="" />
                                    </div>
                                    <div className="card-body">
                                        <h3 className="title">{t("Change_Password")}</h3>
                                        <ul className="list-check">
                                            <li>{t("Change_Password_P1")}</li>
                                            <li>{t("Change_Password_P2")}</li>
                                            <li>{t("Change_Password_P3")}</li>
                                            <li>{t("Change_Password_P4")}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 mt-5">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-sub-title">{t("Change_Password")}</h5>
                                        <form method='POST' onSubmit={handleSubmit(handleNewPasswordSave)}>
                                            <input type="hidden" name='ID' {...register("ID")} />
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <label htmlFor="" className="form-label">{t("Current_Password")}</label>
                                                    <div className="input-group input-group-date">
                                                        <input type="password"
                                                            autoComplete='off'
                                                            className="form-control"
                                                            placeholder={t("Current_Password")}
                                                            id="Password"
                                                            minLength={4}
                                                            maxLength={20}
                                                            name="OldPassword"
                                                            {...register("OldPassword", { required: true })}
                                                        />
                                                        <span className="input-group-text" onClick={() => handleShowPassword("Password", "cpassiconid")} style={{ cursor: "pointer" }}>
                                                            <i style={{ fontSize: "x-large" }} className="bx bx-hide" id="cpassiconid" title="show password" aria-hidden="true" ></i>
                                                        </span>
                                                    </div>
                                                    {errors.OldPassword?.type === 'required' && <p className='text-danger' style={{ borderBottom: "none" }}>Please enter current password</p>}
                                                </div>
                                                <div className="col-12 form-group">
                                                    <label htmlFor="" className="form-label">{t("New_Password")}</label>
                                                    <div className="input-group input-group-date">
                                                        <input type="password"
                                                            id='showNewPassword'
                                                            name='NewPassword'
                                                            className="form-control"
                                                            placeholder={t("New_Password")}
                                                            minLength={4}
                                                            maxLength={20}
                                                            {...register("NewPassword", {
                                                                required: true,
                                                                onChange: (e) => { handlenewpasswordchange(e.target.value) }
                                                            })
                                                            }
                                                        />
                                                        <span className="input-group-text" onClick={() => handleShowPassword("showNewPassword", "newpassiconid")} style={{ cursor: "pointer" }}>
                                                            <i style={{ fontSize: "x-large" }} className="bx bx-hide" id="newpassiconid" title="show password" aria-hidden="true" ></i>
                                                        </span>
                                                    </div>
                                                    {errors.NewPassword?.type === 'required' && <p className='text-danger ' style={{ borderBottom: "none" }}>Please enter new password</p>}
                                                </div>
                                                <div className="col-12 form-group">
                                                    <label htmlFor="" className="form-label">{t("Confirm_Password")}</label>
                                                    <div className="input-group input-group-date">
                                                        <input type="password"
                                                            readOnly
                                                            id='showConfirmPassword'
                                                            name='ConfirmNewPassword'
                                                            className="form-control"
                                                            placeholder={t("Confirm_Password")}
                                                            minLength={4}
                                                            maxLength={20}
                                                            {...register("ConfirmNewPassword",
                                                                {
                                                                    required: true,
                                                                    validate: (val) => {
                                                                        if (watch('NewPassword') != val) {
                                                                            setisPasswordmatch(true);
                                                                        } else {
                                                                            setisPasswordmatch(false);
                                                                        }
                                                                    },
                                                                    onChange: (e) => { handlePasswordmatch(e.target.value) }
                                                                })
                                                            }
                                                        />
                                                        <span className="input-group-text" onClick={() => handleShowPassword("showConfirmPassword", "conpassiconid")} style={{ cursor: "pointer" }}>
                                                            <i style={{ fontSize: "x-large" }} className="bx bx-hide" id="conpassiconid" title="show password" aria-hidden="true" ></i>
                                                        </span>
                                                    </div>
                                                    {errors.ConfirmNewPassword?.type === 'required' && <p className='text-danger ' style={{ borderBottom: "none" }}>Please enter confirm password</p>}
                                                    {isPasswordmatch ? <span className='text-danger'>New password and confirm password do not matched</span> : null}
                                                </div>
                                                {message ? <span className={errClassName} style={{ fontSize: "15px", textAlign: "center" }}>{message}</span> : null}
                                            </div>
                                            <div className="form-bottom-actions">
                                                <a> <Link className="btn-outline-primary btn" to="/">{t("Cancel")}</Link></a>
                                                <button className="btn-primary btn" type='submit'>{t("Save")}</button>
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

export default ChangePassword