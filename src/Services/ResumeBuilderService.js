import { DomainService } from "./DomainService";
const baseUrl = DomainService.GetBaseUrl() + "ResumeDownloader/";

const SaveResume = async (resumeData) => {
    const res = await fetch(baseUrl + "ConvertHTMLToPdfBase64", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(resumeData)
    });
    const data = await res.json();
    return data;
}

const SaveResumeBuilderData = async (resumeData) => {
    const res = await fetch(baseUrl + "SaveResumeDetails", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(resumeData)
    });
    const data = await res.json();
    return data;
}


const downloadResume = async (htmlContent) => {
    debugger;
    const res = await fetch("https://x14fnxgas8.execute-api.ap-south-1.amazonaws.com/Prod/api/generate-pdf", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify({ html: htmlContent })
    });
    // const data = await res.json();
    return res;
}

export const ResumeBuilderService = {
    SaveResume,
    SaveResumeBuilderData,
    downloadResume
}