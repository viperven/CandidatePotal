import { DomainService } from '../DomainService';
import { AuthService } from '../AuthService';
import axios from 'axios';
const baseUrl = DomainService.GetBaseUrl() + "Profile/";

// * ----- edit profile ----------- *//
const getLocationList = async () => {
    const res = await fetch(baseUrl + "GetLocations", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}
const getCountryList = async () => {
    const res = await fetch(baseUrl + "Countries", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}
const getProfileDetails = async () => {
    const res = await fetch(baseUrl + "GetProfileDetails?referenceID=" + AuthService.getCurrentUser().referenceID, {
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
const getProfileByID = async () => {
    const res = await fetch(baseUrl + "GetProfileByID?referenceID=" + AuthService.getCurrentUser().referenceID, {
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
const saveProfile = async (data) => {
    try {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': AuthService.getApiAuthorizationConfig()
            },
        };
        const res = await axios.post(baseUrl + "SaveProfile", data, config).then((response) => {
            return response;
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
// * -----  end edit profile ----------- *//

// * ----- save Basic Details ----------- *//
const saveBasicDetails = async (formData) => {
    const res = await fetch(baseUrl + "UpdateBasicDetails", {
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
// * -----  end save Basic Details ----------- *//
// * -----  UpdateGeneralInfo ----------- *//
const UpdateGeneralInfo = async (reqData) => {
    const res = await fetch(baseUrl + "UpdateGeneralInfo", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(reqData)
    });
    const data = await res.json();
    return data;
}
// * -----  end UpdateGeneralInfo ----------- *//
// * ----- edit login ----------- *//
const updateLogin = async (loginID, Password) => {
    const reqData = {
        LoginId: loginID,
        Password: Password,
        ReferenceID: AuthService.getCurrentUser().referenceID
    }
    const res = await fetch(baseUrl + "UpdateLogin", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(reqData)
    });
    const data = await res.json();
    return data;
}
// * -----  end edit login ----------- *//

// * ----- edit profession ----------- *//

const getProfessionDetails = async () => {
    const res = await fetch(baseUrl + "GetProfession?referenceID=" + AuthService.getCurrentUser().referenceID, {
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
const updateProfession = async (formData) => {
    const res = await fetch(baseUrl + "UpdateProfession", {
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
// * ----- end edit profession ----------- *//

// * ------Qualification ------- *//
const getQualification = async () => {
    const res = await fetch(baseUrl + "GetQualification?referenceID=" + AuthService.getCurrentUser().referenceID, {
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
const getQualificationDDList = async () => {
    const res = await fetch(baseUrl + "GetQualificationDDList", {
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
const GetKeyskills = async (inputText) => {
    if (inputText === "" || inputText === undefined || inputText === null) {
        inputText = "";
    }
    const res = await fetch(baseUrl + "GetKeyskillsList?inputText=" + inputText, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        }
    });
    const data = await res.json();
    return data;
}
const getQualificationSpecializationDDList = async (qualificationID) => {
    const res = await fetch(baseUrl + "GetQualificationSpecializationList?qualificationID=" + qualificationID, {
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
const getInstituteDDList = async () => {
    const res = await fetch(baseUrl + "GetInsitituteList", {
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
const saveOrUpdateQualification = async (formData) => {
    const res = await fetch(baseUrl + "SaveOrUpdateQualification", {
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
const updateKeySkills = async (encRefId, keySkills) => {
    const res = await fetch(baseUrl + "SaveOrUpdateCandidateKeySkills?encReferenceId=" + encRefId + "&keySkills=" + keySkills, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const deleteQualification = async (canResumeQualificationID) => {
    const res = await fetch(baseUrl + "DeleteQualification?referenceID=" + AuthService.getCurrentUser().referenceID + "&canResumeQualificationID=" + canResumeQualificationID, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
// * ------End Qualification ------- *//

// * ------Edit Personal ------- *//

const getMaritalStatusDropDownList = async () => {
    const res = await fetch(baseUrl + "GetMaritalStatusDropDownList", {
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
const getNationalityDropDownList = async () => {
    const res = await fetch(baseUrl + "GetNationalityDropDownList", {
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
const getReligionDropDownList = async () => {
    const res = await fetch(baseUrl + "GetReligionDropDownList", {
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
const getPersonalDetails = async () => {
    const res = await fetch(baseUrl + "GetPersonalDetails?referenceID=" + AuthService.getCurrentUser().referenceID, {
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
const updatePersonalDetails = async (formData) => {
    const res = await fetch(baseUrl + "UpdatePersonalDetails", {
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
// * ------End Edit Personal ------- *//
// * ------Edit Others ------- *//
const getOtherDetails = async () => {
    const res = await fetch(baseUrl + "GetOtherDetails?referenceID=" + AuthService.getCurrentUser().referenceID, {
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

const getFunctionalAreaDropDownList = async () => {
    const res = await fetch(baseUrl + "GetFunctionalAreaDropDownList", {
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
const getSpecializations = async (functionalAreaIds) => {
    const res = await fetch(baseUrl + "GetSpecializations?functionalIDs=" + functionalAreaIds, {
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
const getIndustryList = async (functionalAreaIds) => {
    const res = await fetch(baseUrl + "GetInsudstryDropDownList", {
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
const updateOthers = async (formData) => {
    const res = await fetch(baseUrl + "UpdateOthers", {
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
// edit documents
const getDocuments = async () => {
    const res = await fetch(baseUrl + "GetDocuments?referenceID=" + AuthService.getCurrentUser().referenceID, {
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
const uploadDocuments = async (formData) => {
    try {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const res = await axios.post(baseUrl + "UpdateDocuments", formData, config).then((response) => {
            return response;
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}
const updateOrDeleteDocs = async (EncDocumentID, IsDelete) => {
    const res = await fetch(baseUrl + "UpdateOrDeleteDocs?EncDocumentID=" + EncDocumentID + "&IsDelete=" + IsDelete, {
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
const getDocumentData = async (EncDocumentID) => {
    const res = await fetch(baseUrl + "GetDocumentData?EncDocumentID=" + EncDocumentID, {
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
/// end edit document

/// edit preference

const getPreferenceDetails = async () => {
    const res = await fetch(baseUrl + "GetPreferenceDetails?referenceID=" + AuthService.getCurrentUser().referenceID, {
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
const updatePreference = async (reqData) => {
    const res = await fetch(baseUrl + "UpdatePreferences", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(reqData)
    });
    const data = await res.json();
    return data;
}
/// end edit preference

const saveProfessionalDetails = async (formdata) => {
    try {
        const res = await fetch(baseUrl + "UpdateProfessionalDetails", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': AuthService.getApiAuthorizationConfig()
            },
            body: JSON.stringify(formdata)
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
const deleteProfessionaldetail = async (professionalId) => {
    const res = await fetch(baseUrl + "DeleteProfessionaldetail?professionaID=" + professionalId, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}
const updatePhotoOrResume = async (reqData) => {
    const res = await fetch(baseUrl + "UpdatePhotoOrResume", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(reqData)
    });
    const data = await res.json();
    return data;
}
const UploadCandidateDocuments = async (reqData) => {
    const res = await fetch(baseUrl + "UploadCandidateDocuments", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(reqData)
    });
    const data = await res.json();
    return data;
}
const UpdateCandidateEmailOrMobile = async (data) => {
    try {
        const res = await fetch(baseUrl + "UpdateCandidateEmailOrMobile", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': AuthService.getApiAuthorizationConfig()
            },
            body: JSON.stringify(data)
        });
        const dt = await res.json();
        return dt;
    } catch (error) {
        console.log(error);
    }
}
const getProfileByIDGetCandidateProfilePercentageCaculation = async () => {
    const res = await fetch(baseUrl + "GetCandidateProfilePercentageCaculation?canID=" + AuthService.getCurrentUser().referenceID, {
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
const getNotificationPermissionsByID = async () => {
    const res = await fetch(baseUrl + "GetNotificationPermission?canID=" + AuthService.getCurrentUser().referenceID, {
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

const setNotificationPermissionsByID = async (data) => {
    const res = await fetch(baseUrl + "SetNotificationPermission", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AuthService.getApiAuthorizationConfig()
        },
        body: JSON.stringify(data)
    });
    const dt = await res.json();
    return dt;
}
export const ProfileService = {
    getLocationList,
    getCountryList,
    getProfileDetails,
    getProfileByID,
    saveBasicDetails,
    saveProfile,
    updateLogin,
    getProfessionDetails,
    updateProfession,
    getQualification,
    GetKeyskills,
    getQualificationDDList,
    getQualificationSpecializationDDList,
    getInstituteDDList,
    saveOrUpdateQualification,
    updateKeySkills,
    deleteQualification,
    getMaritalStatusDropDownList,
    getNationalityDropDownList,
    getReligionDropDownList,
    getPersonalDetails,
    updatePersonalDetails,
    getOtherDetails,
    getFunctionalAreaDropDownList,
    getSpecializations,
    getIndustryList,
    updateOthers,
    getDocuments,
    uploadDocuments,
    updateOrDeleteDocs,
    getDocumentData,
    getPreferenceDetails,
    updatePreference,
    saveProfessionalDetails,
    deleteProfessionaldetail,
    UpdateGeneralInfo,
    updatePhotoOrResume,
    UploadCandidateDocuments,
    UpdateCandidateEmailOrMobile,
    getProfileByIDGetCandidateProfilePercentageCaculation,
    getNotificationPermissionsByID,
    setNotificationPermissionsByID
}
