import { AuthService } from '../Services/AuthService';
import { DomainService } from './DomainService';
import axios from 'axios';
const baseUrl = DomainService.GetBaseUrl() + "RegistrationStepII/";

const saveRegistrationStepII = async (reqData) => {
   
    try {

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const res = await axios.post(baseUrl + "SaveRegistrationStepII", reqData, config).then((response) => {
            return response;
        });
       return res;
    } catch (error) {
        console.log(error);
    }
}
export const RegistrationStepIIService = {
    saveRegistrationStepII,
}