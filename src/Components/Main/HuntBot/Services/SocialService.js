
const baseUrl = "https://f0xz180b38.execute-api.ap-south-1.amazonaws.com/Prod/api/" + "Social/";

  
const GetYouTubeLinksForHuntBoat = async () => {
    const res = await fetch(baseUrl + "GetYouTubeLinksForHuntBoat", {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}

const GetAllYouTubeLinksForHuntBoat = async () => {
    const res = await fetch(baseUrl + "GetAllYouTubeLinksForHuntBoat", {
        method: "Get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': AuthService.getApiAuthorizationConfig()
        },
    });
    const data = await res.json();
    return data;
}


export const SocialService = {
    GetYouTubeLinksForHuntBoat,GetAllYouTubeLinksForHuntBoat
}
// Get Method

// url:https://f0xz180b38.execute-api.ap-south-1.amazonaws.com/Prod

// controlername:Social
// methodname:GetYouTubeLinksForHuntBoat