import { AuthService } from './AuthService';
import { DomainService } from './DomainService';
const baseUrl = DomainService.GetBaseUrl() + "CandidateApplied/";

const getCandidateAppliedDetails = async () => {
    const res = await fetch(baseUrl + "CandidateAppliedDetails?candidateID=" + AuthService.getCurrentUser().referenceID  , {
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
const updateCandidateJobDetails = async (formData) => {
    const res = await fetch(baseUrl + "SaveCandidateAppliedDetails", {
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
export const CandidateAppliedDetailsService={
    getCandidateAppliedDetails,
    updateCandidateJobDetails
}