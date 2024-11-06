import { AuthService } from '../Services/AuthService';
import { DomainService } from './DomainService';
const baseUrl = DomainService.GetBaseUrl() + "Dashboard/";

const checkStepIIRegistrationCompleted = async () => {
    const res = await fetch(baseUrl + "CheckStepIIRegistrationCompleted?referenceID=" + AuthService.getCurrentUser().referenceID, {
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

export const DashboardService = {
    checkStepIIRegistrationCompleted
}