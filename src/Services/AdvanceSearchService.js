import { DomainService } from './DomainService';
const baseUrl = DomainService.GetBaseUrl() + "AdvancedSearch/";


const getFunctionalAreasDropDownList = async () => {
    const res = await fetch(baseUrl + "GetFunctionalAreasDropDownList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}
const getFunctionalAreasSpecializatonDropDownList = async (functionalAreaId) => {
    const res = await fetch(baseUrl + "GetFunctionalAreaSpecializationDropDownList?functionalAreaSpecializationID=" + functionalAreaId, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}
const getIndustryDropDownList = async () => {
    const res = await fetch(baseUrl + "GetIndustryDropDownList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}
const getKeywordsAnyDropDownList = async () => {
    const res = await fetch(baseUrl + "GetKeywordsAnyDropDownList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}
const getQualificationDropDownList = async () => {
    const res = await fetch(baseUrl + "GetQualificationDropDownList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    const data = await res.json();

    return data;
}
const getQualificationSpecializationDropDownList = async (qualificationID) => {
    const res = await fetch(baseUrl + "GetQualificationSpecializationDropDownList?qualificationID=" + qualificationID, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();

    return data;
}
const getLocationDropDownList = async () => {
    const res = await fetch(baseUrl + "GetLocationDropDownList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}
const getJobsPostedwithin = async () => {
    const res = await fetch(baseUrl + "GetJobsPostedwithinList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;

}
const GetSearchIn = async () => {
    const res = await fetch(baseUrl + "GetSearchInList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;

}
const GetKeyWords = async (inputText) => {
    if (inputText === "" || inputText === undefined || inputText === null) {
        inputText = "";
    }
    const res = await fetch(baseUrl + "GetKeywordsList?inputText=" + inputText, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}
const JobSearch = async (formData) => {
    try {
        const res = await fetch(baseUrl + "GetAdvanceSearchJobList", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        return data;
    } catch (error) {
    }
}

const saveSearch = async (formData) => {
    try {
        const res = await fetch(baseUrl + "SaveSearch", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const AdvanceSearchService = {
    getFunctionalAreasDropDownList,
    getFunctionalAreasSpecializatonDropDownList,
    getIndustryDropDownList,
    getKeywordsAnyDropDownList,
    getQualificationDropDownList,
    getQualificationSpecializationDropDownList,
    getLocationDropDownList,
    getJobsPostedwithin,
    GetSearchIn,
    GetKeyWords,
    JobSearch,
    saveSearch
}