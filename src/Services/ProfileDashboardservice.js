import { AuthService } from '../Services/AuthService';
import { DomainService } from './DomainService';
const baseUrl = DomainService.GetBaseUrl() + "ProfileDashboard/";

const ApplySelectedJob = async (formData) => {
    const res = await fetch(baseUrl + "ApplySelectedJobPost", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(formData)
    });
    const data = await res.json();
    return data;
}
const saveSelectJob = async (jobIDs) => {
    const res = await fetch(baseUrl + "SavedSelectedJobPost?jobID=" + jobIDs + "&referenceID=" + AuthService.getCurrentUser().referenceID + "&userID=" + AuthService.getCurrentUser().userId, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const renameSearch = async (searchRuleID, searchname) => {
    const res = await fetch(baseUrl + "RenameSavedSearch?searchRuleID=" + searchRuleID + "&searchname=" + searchname + "&referenceID=" + AuthService.getCurrentUser().referenceID, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const getCanSavedSearchJobByID = async (searchRuleID) => {
    const res = await fetch(baseUrl + "GetCanSavedSearchJobByID?searchRuleID=" + searchRuleID, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}

const getJobSuggestions = async (StartIndex, PageSize) => {
    const paginateData = {
        StartIndex: StartIndex,
        PageSize: PageSize,
        referenceID: AuthService.getCurrentUser().referenceID
    }
    const res = await fetch(baseUrl + "GetJobSuggestions", {
        // const res = await fetch(baseUrl + "GetJobSuggestions?qs=" + qs, {
        method: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(paginateData)
    });
    const data = await res.json();
    return data;
}
const getApplyedJobs = async (StartIndex, PageSize) => {
    const paginateData = {
        StartIndex: StartIndex,
        PageSize: PageSize,
        referenceID: AuthService.getCurrentUser().referenceID
    }
    //  GetApplyedJobList
    const res = await fetch(baseUrl + "GetNewApplyedJobList", {
        // const res = await fetch(baseUrl + "GetJobSuggestions?qs=" + qs, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(paginateData)
    });

    const data = await res.json();
    return data;
}
const getSearchJobs = async (pageIndex, pageSize) => {
    const res = await fetch(baseUrl + "GetSavedSearchJob?referenceID=" + AuthService.getCurrentUser().referenceID + "&startIndex=" + pageIndex + "&pageSize=" + pageSize, {
        // const res = await fetch(baseUrl + "GetJobSuggestions?qs=" + qs, {
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
const getSavedJobList = async (StartIndex, PageSize) => {
    const paginateData = {
        StartIndex: StartIndex,
        PageSize: PageSize,
        referenceID: AuthService.getCurrentUser().referenceID
    }
    const res = await fetch(baseUrl + "GetSavedJobList", {
        // const res = await fetch(baseUrl + "GetJobSuggestions?qs=" + qs, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(paginateData)
    });
    const data = await res.json();
    return data;
}
const getMyFeed = async (pageIndex, pageSize) => {

    const res = await fetch(baseUrl + "GetMyJobFeeds?referenceID=" + AuthService.getCurrentUser().referenceID + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize, {
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
const deleteSavedJob = async (jobIDs) => {

    const res = await fetch(baseUrl + "DeleteCanSavedJob?jobID=" + jobIDs + "&referenceID=" + AuthService.getCurrentUser().referenceID, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const deleteCanSavedSearchJob = async (searchRuleID) => {

    const res = await fetch(baseUrl + "DeleteCanSavedSearchJob?searchRuleID=" + searchRuleID + "&referenceID=" + AuthService.getCurrentUser().referenceID, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const getInterviewDetails = async (filter, pageIndex, pageSize) => {
    const res = await fetch(baseUrl + "InterviewDetails?filter=" + filter + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
export const ProfileDashboardService = {
    getJobSuggestions,
    getApplyedJobs,
    getSearchJobs,
    getSavedJobList,
    ApplySelectedJob,
    saveSelectJob,
    getMyFeed,
    deleteSavedJob,
    renameSearch,
    deleteCanSavedSearchJob,
    getCanSavedSearchJobByID,
    getInterviewDetails
}