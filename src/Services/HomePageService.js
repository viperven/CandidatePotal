import { AuthService } from './AuthService';
import { DomainService } from './DomainService';
const baseUrl = DomainService.GetBaseUrl() + "HomePage/";

const GetIndustryForFooter = async () => {
    const res = await fetch(baseUrl + "GetIndustriesForFooter", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}
const GetCountriesForFooter = async () => {
    const res = await fetch(baseUrl + "GetCountriesForFooter", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        }
    });
    const data = await res.json();
    return data;
}
const ClientImages = async () => {
    const res = await fetch(baseUrl + "ClientImages", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}
const GetDailyAndMonthlyJobs = async () => {
    const res = await fetch(baseUrl + "GetDailyAndMonthlyJobs?userID="+AuthService.getCurrentUser().referenceID, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        }
    });
    const data = await res.json();
    return data;
}
const GetHotJobs = async () => {
    const res = await fetch(baseUrl + "GetHotJobs?userID="+AuthService.getCurrentUser().referenceID, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}

const initIP = async () => {
    const url = "https://f1e5iub70l.execute-api.ap-south-1.amazonaws.com/Prod/api/auth/getcurrentip";
    const res = await fetch(url, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const data = await res.json();
    return data;
}
const getCountryDetails = async (ip, convertedIP) => {
    const url = `https://f1e5iub70l.execute-api.ap-south-1.amazonaws.com/Prod/api/auth/GetCountrydetailsByIp?ip=${ip}&ipLongConverted=${convertedIP}`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const data = await res.json();
    return data;
}

const getUpcomingEvent=async()=>{
    const url = `https://f0xz180b38.execute-api.ap-south-1.amazonaws.com/Prod/api/Event/GetUpcomingActiveEvents?type=2`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const data = await res.json();
    return data;
}
const getNotification=async()=>{
    const res = await fetch(baseUrl + "GetmsgNotification", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}
export const HomePageService = {
    GetIndustryForFooter,
    GetCountriesForFooter,
    GetHotJobs,
    ClientImages,
    GetDailyAndMonthlyJobs,
    initIP,
    getCountryDetails,
    getUpcomingEvent,
    getNotification
}