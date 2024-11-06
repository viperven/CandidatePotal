import { DomainService } from './DomainService';
const baseUrl = DomainService.GetBaseUrl() + "JobPostingsOnAssignmentID/";
const getjobPostingsOnAssignmentIDList = async (formData) => {
    try {
        const res = await fetch(baseUrl + "GetjobPostingsOnAssignmentID", {
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
export const GetjobPostingsOnAssignmentIDService = {
    getjobPostingsOnAssignmentIDList
}