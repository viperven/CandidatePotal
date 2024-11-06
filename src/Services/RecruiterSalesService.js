
import { AuthService } from './AuthService';
import { DomainService } from './DomainService';
const baseUrl = DomainService.GetBaseUrl() + "RecruiterSales/";

const SaveRecruiterSalesLead = async (formData) => {
    const res = await fetch(baseUrl + "SaveRecruiterSalesLead", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(formData)
    });
    const data = await res.json();
    return data;
}

export const RecruiterSalesService = {
    SaveRecruiterSalesLead
}