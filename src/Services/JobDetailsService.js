import { AuthService } from '../Services/AuthService';
import { DomainService } from './DomainService';

const baseUrl = DomainService.GetBaseUrl() + "JobDetails/";

const getJobListForApplyFromSMP = async (qs) => {
    const res = await fetch(baseUrl + "GetJobListForApply?qs=" + qs, {
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

const getJobDetails = async (qs) => {
    const res = await fetch(baseUrl + "GetJobDetails?qs=" + qs, {
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
const getJobDetailsByJobPostingID = async (jpID) => {
    const res = await fetch(baseUrl + "GetJobDetailsByJobPostingID?jpID=" + jpID + "&encCanId=" + AuthService.getCurrentUser().referenceID, {
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
const applyJob = async (applyData) => {
    const res = await fetch(baseUrl + "ApplyJob", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(applyData)
    });
    const data = await res.json();
    return data;
}
const GetJobIdAndTitleByJobCode = async (jpCode) => {
    const res = await fetch(baseUrl + "GetJobIdAndTitleByJobCode?jpCode=" + jpCode, {
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
export const JobDetailsService = {
    getJobListForApplyFromSMP,
    getJobDetails,
    applyJob,
    getJobDetailsByJobPostingID,
    GetJobIdAndTitleByJobCode
}