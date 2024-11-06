import { DomainService } from "./DomainService";

const baseUrl = DomainService.GetBaseUrl() + "ContactUs/";
const SaveContactUs = async (formData) => {
    try {
        const res = await fetch(baseUrl + "SaveContactUs", {
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
const SaveSubScription = async (email) => {
    try {
        const res = await fetch(baseUrl + "SaveSubScription?emailID="+email, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {

    }
}
export const Contactservice = {
    SaveContactUs,
    SaveSubScription
}