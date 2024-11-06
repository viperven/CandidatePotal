

const handleApiError = (statusCode) => {
    let returnError = {
        StatusCode: statusCode,
        Message: "",
    }
    switch (statusCode) {
        case 400:
            returnError.Message = "Bad Request";
            break;
        case 401:
            returnError.Message = "Unauthorized";
            break;
        case 403:
            returnError.Message = "Unauthorized request";
            break;
        case 404:
            returnError.Message = "Not Found";
            break;
        case 405:
            returnError.Message = "Method Not Allowed";
            break;
        case 408:
            returnError.Message = "Request Timeout";
            break;
        case 415:
            returnError.Message = "Unsupported Media Type";
            break;
    }
    return returnError;
}

export const HandleErrorService = {
    handleApiError
}