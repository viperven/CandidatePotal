import { DomainService } from "./DomainService";
import { AuthService } from '../Services/AuthService';
const baseUrl = DomainService.GetBaseUrl() + "Auth/";

const Login = async (emailOrMobile, countryid, password, socialID) => {
    const item = {
        EmailOrMobile: emailOrMobile,
        CountryID: countryid,
        Password: password,
        SocialID: socialID
    }
    const res = await fetch(baseUrl + "Login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });
    const data = await res.json();
    return data;
}
const changeUserPassword = async (oldPassword, newConfirmPassword) => {

    const item = {
        UserID: AuthService.getCurrentUser().userId,
        OldPassword: oldPassword,
        NewPassword: newConfirmPassword
    }
    const res = await fetch(baseUrl + "Changepassword", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(item)
    });
    const data = await res.json();
    return data;
}
const getNotifiationSettings = async () => {
    const res = await fetch(baseUrl + "GetNotificationSetting?referenceID=" + AuthService.getCurrentUser().referenceID, {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const getBlockClientByCandidateid = async () => {
    const res = await fetch(baseUrl + "GetBlockClientByCandidateid?referenceID=" + AuthService.getCurrentUser().referenceID, {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const getCompanyList = async (inputText) => {
    if (inputText === "" || inputText === undefined || inputText === null) {
        inputText = "";
    }
    const res = await fetch(baseUrl + "CompanyList?inputText=" + inputText + "&referenceID=" + AuthService.getCurrentUser().referenceID, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}
const saveBlockCompany = async (clientName) => {
    const res = await fetch(baseUrl + "SaveBlockCompany?clientName=" + clientName + "&referenceID=" + AuthService.getCurrentUser().referenceID, {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const unBlockCompany = async (blockClientID) => {
    const res = await fetch(baseUrl + "UnBlockCompany?blockClientID=" + blockClientID + "&referenceID=" + AuthService.getCurrentUser().referenceID, {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const sendForgotPasswordLink = async (EmailOrMobile, countryid, type) => {
    const res = await fetch(baseUrl + "SendForgotPasswordLink?emailOrMobile=" + EmailOrMobile + "&countryid=" + countryid + "&type=" + type, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const data = await res.json();
    return data;
}
const updateForgotPassword = async (candidateID, password, otp, typeID) => {
    const res = await fetch(baseUrl + "UpdateCanPassword?candidateID=" + candidateID + "&userTypeID=" + 3 + "&password=" + password + "&otp=" + otp + "&typeID=" + typeID, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const data = await res.json();
    return data;
}
export const UserService = {
    Login,
    changeUserPassword,
    getNotifiationSettings,
    getBlockClientByCandidateid,
    getCompanyList,
    saveBlockCompany,
    unBlockCompany,
    sendForgotPasswordLink,
    updateForgotPassword
}