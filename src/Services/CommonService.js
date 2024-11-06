import { DomainService } from "./DomainService";
import { AuthService } from '../Services/AuthService';
const baseUrl = DomainService.GetBaseUrl() + "Common/";


const getNationalityList = async () => {
    const res = await fetch(baseUrl + "GetCountryList", {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const getMaritalStatusList = async () => {
    const res = await fetch(baseUrl + "GetMaritalList", {
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
const getIndustryList = async () => {
    const res = await fetch(baseUrl + "GetIndustryList", {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const getReligionList = async () => {
    const res = await fetch(baseUrl + "GetReligionList", {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const getInstituteList = async () => {
    const res = await fetch(baseUrl + "GetInstituteList", {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const getQualificationList = async () => {
    const res = await fetch(baseUrl + "GetQualificationList", {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const getQualificationSpecializationList = async (qualificationID) => {
    const res = await fetch(baseUrl + "GetQualificationSpecializationList?qualificationID=" + qualificationID, {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const getFunctionalAreaList = async () => {
    const res = await fetch(baseUrl + "GetFunctionalAreaList", {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}

const getFunctionalSpecializationList = async (functionalAreaId) => {
    const res = await fetch(baseUrl + "GetFunctionalSpecializationList?functionalAreaIds=" + functionalAreaId, {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const getCurrencyDropdown = async () => {
    const res = await fetch(baseUrl + "GetCurrencyDropdown", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}
const updateEmailClick = async (encID) => {
    const res = await fetch(DomainService.GetBaseUrl() + "Auth/" + "TrackEmailClick?encCandidateID=" + encID, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}
const getDocTypes = async () => {
    const res = await fetch(baseUrl + "GetDocTypes", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const data = await res.json();
    return data;
}
export const CommonService = {
    getNationalityList,
    getMaritalStatusList,
    getIndustryList,
    getReligionList,
    getInstituteList,
    getQualificationList,
    getQualificationSpecializationList,
    getFunctionalAreaList,
    getFunctionalSpecializationList,
    getCurrencyDropdown,
    updateEmailClick,
    getDocTypes
}