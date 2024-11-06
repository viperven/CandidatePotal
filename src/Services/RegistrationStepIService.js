import { AuthService } from '../Services/AuthService';
import { DomainService } from './DomainService';
import axios from 'axios';
const baseUrl = DomainService.GetBaseUrl()+"Registration/";

const getCountryList = async () => {
    const res = await fetch(baseUrl + "GetCountrDDLList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const getLocationList = async () => {
    const res = await fetch(baseUrl + "GetLocationDDLList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const getNotificationTypes = async () => {
    const res = await fetch(baseUrl + "GetAllNotificationTypes", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           // 'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}

const getLoginAvStatus = async (loginid) => {
    const res = await fetch(baseUrl + "GetLoginAVStatus?loginID="+loginid, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}

const saveCandidateRegistration = async (regData) => {
    try {

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const res = await axios.post(baseUrl + "SaveCandidate", regData, config).then((response) => {
            return response;
        });
       return res;
    } catch (error) {
        console.log(error);
    }


}

export const RegistrationStepIService = {
    getCountryList,
    getLocationList,
    getNotificationTypes,
    getLoginAvStatus,
    saveCandidateRegistration
}