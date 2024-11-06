const baseUrlDevlopment = "https://localhost:60782/api/w/v1/";
const baseUrlLiveTest = "https://4bwp3j8vdl.execute-api.ap-south-1.amazonaws.com/Prod/api/w/v1/";
const baseUrlLive = "https://mg3kooop04.execute-api.ap-south-1.amazonaws.com/Prod/api/w/v1/";

const GetBaseUrl = () => {
    // return baseUrlDevlopment;
    //return baseUrlLiveTest;
    return baseUrlLive;
}

export const DomainService = {
    GetBaseUrl
}



