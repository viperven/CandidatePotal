import { DomainService } from './DomainService';
const baseUrl = DomainService.GetBaseUrl() + "OurClients/";

const GetCountryList = async () => {
    const res = await fetch(baseUrl + "GetCountryList", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    return data;
}
const GetClientsListOnCountry = async (CountryId) => {
        const res = await fetch(baseUrl + "GetClientsListOnCountry?CountryId="+CountryId, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    const data = await res.json();
    return data;
}
const GetClientsList = async (item) => {
    if (item == undefined) {
        item = "A";
    }
    const res = await fetch(baseUrl + "GetClientsList?clientName=" + item, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();

    return data;
}
export const OurClientsService = {
    // alphabate,
    GetCountryList,
    GetClientsList,
    GetClientsListOnCountry,
}