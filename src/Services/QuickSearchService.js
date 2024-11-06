import { DomainService } from './DomainService';
const baseUrl=DomainService.GetBaseUrl()+"QuickSearch/";

const getKeywordsDropDownList=async()=>{
    const res = await fetch(baseUrl + "GetKeywordsDropDownList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}

const getIndustryDropDownList=async()=>{
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

const getLocationDropDownList=async()=>{
    const res = await fetch(baseUrl + "GetLocationDropdownList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}
const getQuickSearchList=async()=>{
    const res=await fetch(baseUrl+"",{
        method:"GET",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}});
const data = await res.json();
    return data;
}

export const QuickSearchService={
    getKeywordsDropDownList,
    getIndustryDropDownList,
    getLocationDropDownList,
    getQuickSearchList
}