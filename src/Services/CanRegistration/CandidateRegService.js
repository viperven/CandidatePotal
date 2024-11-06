import { AuthService } from '../AuthService';
import { DomainService } from '../DomainService';
const baseUrl = DomainService.GetBaseUrl() + "CandidateRegistration/";


const get_FAS_DropdownList = async () => {
    const res = await fetch(baseUrl + "GetFunctionalAreaSpecializationDropDown", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}
const checkIsEmailOrMobileExist = async (cId, emailOrMobile, type) => {
    let candidateid = "";
    if (AuthService.isAuthenticatedUser()) {
        candidateid = AuthService.getCurrentUser().referenceID;
    }
    if (candidateid === "" || candidateid === null || candidateid === undefined || candidateid === "0" || candidateid === 0 || candidateid <= 0) {
        candidateid = "";
    }
    const res = await fetch(baseUrl + "CheckIsEmailOrMobileExist?emailOrMobile=" + emailOrMobile + "&type=" + type + "&countryId=" + cId + "&encCandidateID=" + candidateid, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}
const save_Registration_Step1 = async (formData) => {
    const res = await fetch(baseUrl + "RegisterStep1Web", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    const data = await res.json();
    return data;
}
const verify_Registration_OTP = async (uOTP, encCanID, type) => {
    const res = await fetch(baseUrl + "VerifyOTP?encCanID=" + encCanID + "&otp=" + uOTP + "&type=" + type, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}
const get_NoticePeriod_DropdownList = async () => {
    const res = await fetch(baseUrl + "GetNoticePeriodList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}
const save_Registration_Step2 = async (formData) => {
    const res = await fetch(baseUrl + "RegisterStep2", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    const data = await res.json();
    return data;
}
const save_Registration_Step3 = async (formData) => {
    const res = await fetch(baseUrl + "RegisterStep3", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    const data = await res.json();
    return data;
}
const get_Language_DropdownList = async () => {
    const res = await fetch(baseUrl + "GetLanguageDropDown", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}
const get_Lang_Proficiency_DropdownList = async () => {
    const res = await fetch(baseUrl + "GetLangProficiencyDropDown", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}
const save_Registration_Step4 = async (encCanID, qualXml) => {
    const res = await fetch(baseUrl + "RegisterStep4?EncCandidateID=" + encCanID + "&qualificationXml=" + qualXml, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}
const save_Registration_Step5 = async (formData) => {
    const res = await fetch(baseUrl + "RegisterStep5", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    const data = await res.json();
    return data;
}
const getCountryList = async () => {
    const res = await fetch(baseUrl + "GetCountryWithCountryCodesList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}
const resendEmailOrMobileOTP = async (data) => {
    try {
        const res = await fetch(baseUrl + "ResendEmailOrMobileOTP", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': AuthService.getApiAuthorizationConfig()
            },
            body: JSON.stringify(data)
        });
        const dt = await res.json();
        return dt;
    } catch (error) {
        console.log(error);
    }
}

//new registration process
const verify_Registration_OTP_New = async (uOTP, encCanID, type) => {
    const res = await fetch(baseUrl + "VerifyOTPWeb?mobileOrEmail=" + uOTP + "&otp=" + encCanID + "&mobileNo=" + type, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}


export const CandidateRegService = {
    get_FAS_DropdownList,
    checkIsEmailOrMobileExist,
    save_Registration_Step1,
    verify_Registration_OTP,
    get_NoticePeriod_DropdownList,
    save_Registration_Step2,
    save_Registration_Step3,
    get_Language_DropdownList,
    get_Lang_Proficiency_DropdownList,
    save_Registration_Step5,
    save_Registration_Step4,
    getCountryList,
    resendEmailOrMobileOTP,
    verify_Registration_OTP_New
}