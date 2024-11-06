import jwt from 'jwt-decode';
import { UserService } from './UserService';
import { CookieService } from './CookieService';
import { CryptoService } from './CryptoService';
import { useNavigate } from 'react-router-dom';
const cookieName = "auth-token";
const cookieUserName = "usr-name";
const cookieUserPic = 'user-pic';
const cookieExpairy = 7;
const CookiePolicyAcceptedExpairy = 365;
const CookiePolicyCheckName = "_CookiePolicyCheckName";
const isAuthenticatedUser = () => {
    try {
        if (isExpairyToken()) {
            CookieService.clearCookie(cookieName);
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }

}
const logout = () => {
    CookieService.clearCookie(cookieName);
    localStorage.removeItem(cookieUserPic);
    CookieService.clearCookie(cookieUserName);
}

const isExpairyToken = () => {
    let token = CookieService.getCookie(cookieName);

    if (token) {
        const decode = jwt(CryptoService.CryptoJSDecrypt(token));
        if (!decode) {
            return true;
        }
        if (new Date().getTime() < decode.exp) {
            CookieService.clearCookie(cookieName);
            return true;
        } else {
            return false;
        }

    } else {
        return true;
    }


}
const getCurrentUser = () => {
    const token = CookieService.getCookie(cookieName);
    const currentUser = {
        loginId: null,
        userId: null,
        roleId: null,
        roleName: null,
        userName: null,
        userTypeCode: null,
        userTypeId: null,
        userTypeName: null,
        referenceID: null
    };
    if (token) {
        let decode = jwt(CryptoService.CryptoJSDecrypt(token));
        if (!isExpairyToken()) {
            currentUser.loginId = decode.LoginId;
            currentUser.roleId = decode.RoleId;
            currentUser.userId = decode.UserId;
            currentUser.roleName = decode.RoleName;
            currentUser.userName = decode.UserName;
            currentUser.userTypeCode = decode.UserTypeCode;
            currentUser.userTypeId = decode.UserTypeId;
            currentUser.userTypeName = decode.UserTypeName;
            currentUser.referenceID = decode.ReferenceID;
        } else {
            currentUser.loginId = null;
            currentUser.userId = null;
            currentUser.roleId = null;
            currentUser.roleName = null;
            currentUser.userName = null;
            currentUser.userTypeCode = null;
            currentUser.userTypeCode = null;
            currentUser.userTypeName = null;
            currentUser.referenceID = null;
        }
    } else {
        currentUser.loginId = null;
        currentUser.userId = null;
        currentUser.roleId = null;
        currentUser.roleName = null;
        currentUser.userName = null;
        currentUser.userTypeCode = null;
        currentUser.userTypeCode = null;
        currentUser.userTypeName = null;
        currentUser.referenceID = null;

    }
    return currentUser;
}

const LoginUser = async (emailOrMobile, countryid, password, socialID) => {
    const res = await UserService.Login(emailOrMobile, countryid, password, socialID);
    if (res.isSuccess) {
        CookieService.setCookie(cookieName, CryptoService.CryptoJSEncrypt(res.token), cookieExpairy);
        let img = "";
        try {
            img = atob(res.userImage);
        } catch (error) {
            img = "";
        }
        set_userImage_And_pic(res.userName, img);
    }
    return res;
}

const getApiAuthorizationConfig = () => {
    let config = "";
    if (CryptoService.CryptoJSDecrypt(CookieService.getCookie(cookieName))) {
        config = 'Bearer ' + CryptoService.CryptoJSDecrypt(CookieService.getCookie(cookieName))
    }
    return config;
}

const replaceSplChar = (value) => {
    if (value === null || value === "" || value === undefined) {
        return value;
    }
    return value.trim().replace(/[^a-zA-Z0-9- ]/g, '');
}

const set_userImage_And_pic = (name, pic) => {
    if (isNullOrEmpty(name)) {
        CookieService.clearCookie(cookieUserName);
    } else {
        CookieService.setCookie(cookieUserName, JSON.stringify(name), cookieExpairy);
    }
    if (isNullOrEmpty(pic)) {
        localStorage.removeItem(cookieUserPic);
    } else {
        localStorage.setItem(cookieUserPic, JSON.stringify(pic));
    }
}
const get_userImage_Or_pic = (type) => {
    let v = "";
    try {
        switch (parseInt(type)) {
            case 1:
                v = isNullOrEmpty(CookieService.getCookie(cookieUserName)) ? "" : JSON.parse(CookieService.getCookie(cookieUserName));
                break;
            case 2:
                v = isNullOrEmpty(localStorage.getItem(cookieUserPic)) ? "" : JSON.parse(localStorage.getItem(cookieUserPic));
                break;
            default:
                v = "";
                break;
        }
    } catch (error) {

    }
    return v;
}

const isCookieDisabled = () => {
    return !navigator.cookieEnabled;
}
const encryptPlainText = (v) => {
    return CryptoService.AesEncryptForApi(v);
}
const isNullOrEmpty = (v) => {
    if (v === null || v === "" || v === undefined || v === 0 || v === "0") {
        return true;
    } else {
        return false;
    }
}
const isCookiePolicyAcceptedForCurrentBrowser = (isAccept) => {
    if (isAccept) {
        CookieService.setCookie(CookiePolicyCheckName, CryptoService.CryptoJSEncrypt("1"), CookiePolicyAcceptedExpairy);
        return true;
    }
    let isAccepted = false;
    try {
        if (!isNullOrEmpty(CookieService.getCookie(CookiePolicyCheckName))) {
            isAccepted = CryptoService.CryptoJSDecrypt(CookieService.getCookie(CookiePolicyCheckName)) === "1";
        } else {
            isAccepted = false;
        }
    } catch (error) {
        isAccepted = false;
    }
    return isAccepted;
}
const download_file_from_s3 = async (pUrl) => {
    const res = await fetch(pUrl, {
        method: "GET",
    });
    const data = await res.text();
    return data;
}
export const AuthService = {
    isAuthenticatedUser,
    isExpairyToken,
    getCurrentUser,
    getApiAuthorizationConfig,
    LoginUser,
    logout,
    replaceSplChar,
    isCookieDisabled,
    encryptPlainText,
    set_userImage_And_pic,
    get_userImage_Or_pic,
    isCookiePolicyAcceptedForCurrentBrowser,
    download_file_from_s3
}