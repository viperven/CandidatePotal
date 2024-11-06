import React, { useEffect } from 'react'
import { AuthService } from '../../../Services/AuthService';
import { JobDetailsService } from '../../../Services/JobDetailsService';
import { useNavigate } from 'react-router-dom';

function Jd() {

    const navigate = useNavigate();
    const getSearchParms = () => {
        try {
            var url = window.location.href;
            const codeMatch = url.match(/jd\/(\w+)/);
            const jPCode = codeMatch[1];
            return jPCode;
        } catch (error) {}
    }
    const initJobIdAndJobTitle = async () => {
        try {
            const jpcode = getSearchParms();
            const response = await JobDetailsService.GetJobIdAndTitleByJobCode(jpcode);
            const res = JSON.parse(response.apiData);
            const jpid = res.Table[0].JobPostingID;
            const title = res.Table[0].JobPostingTitle;
            let jobtitle = title.replace(/\s+/g, '-');
            var href = "/jobdetails" + "?jobs=" + jobtitle + "/" + parseInt(jpid);
            navigate(href);
        } catch (error) {}
    }
    useEffect(() => {
        initJobIdAndJobTitle();
    }, [])

    return (
        <>

        </>
    )
}

export default Jd