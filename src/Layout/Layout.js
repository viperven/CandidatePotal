import React, { useEffect, useState } from 'react'
import Header2 from './Header2';
import Footer from './Footer'
import { HomePageService } from '../Services/HomePageService';
import CookiesPolicyAcceptContainer from '../Components/CookiesPolicyAcceptContainer';

function Layout({ children, showFooter = true }) {

    const [countryDetails, setiCountryDetails] = useState("");

    const convert_ip_to_int = (ip) => {
        let int_IP = 0;
        try {
            int_IP = ip.split(".").reduce((int, v) => int * 256 + +v);
        } catch (error) {
            int_IP = 0;
        }
        return int_IP;
    }

    const init_userIpAddress = async () => {
        try {
            const res = await HomePageService.initIP();
            if (res.isSuccess) {
                const IP = res.data;
                if (IP !== "" && IP !== undefined && IP !== null) {
                    const convertedIP = convert_ip_to_int(IP);
                    const res1 = await HomePageService.getCountryDetails(IP, convertedIP);
                    if (res1.isSuccess) {
                        const countryDetails = JSON.parse(res1.data);
                        countryDetails ? setiCountryDetails(countryDetails[0]) : setiCountryDetails([]);
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        init_userIpAddress();
    }, [])

    return (
        <>
            {/* <Header /> */}
            <Header2 />
            <main>
                {/* <span style={{ left: "calc(50% - 137.5545px)", fontSize: "19px", marginTop: "15px", position: "absolute", color: "#FF5C35" }}>Hello <span style={{ fontWeight: "bold" }}>{countryDetails.CountryName}</span> , &nbsp;Have a Nice Time !!</span> */}
                {children}
                <CookiesPolicyAcceptContainer />
            </main>
            {showFooter ? <Footer /> : null}
            {/* <Footer2 /> */}
        </>
    )
}

export default Layout