import { AuthService } from './AuthService';
import { DomainService } from './DomainService';
import axios from 'axios';
const baseUrl = DomainService.GetBaseUrl() + "IroOCR/";
const ReadTextFromImage=async(file)=>{
    const filedata={
        file:file
    }
    try {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const res = await axios.post(baseUrl + "ReadTextFromImage", filedata, config).then((response) => {
            return response;
        });
       return res;
    } catch (error) {
        console.log(error);
    }
}
const ReadTextFromPdfOrImage=async(file)=>{
    const filedata={
        file:file
    }
    try {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const res = await axios.post(baseUrl + "ReadTextFromPdfOrImage", filedata, config).then((response) => {
            return response;
        });
       return res;
    } catch (error) {
        console.log(error);
    }
}
const ReadTextFromWord=async(file)=>{
    const filedata={
        file:file
    }
    try {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const res = await axios.post(baseUrl + "ReadTextFromWord", filedata, config).then((response) => {
            return response;
        });
       return res;
    } catch (error) {
        console.log(error);
    }
}

export  const IronOCRService={
    ReadTextFromImage,
    ReadTextFromPdfOrImage,
    ReadTextFromWord,
}