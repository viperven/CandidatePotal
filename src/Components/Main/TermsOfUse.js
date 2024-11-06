import React, { useEffect } from 'react';
import Layout from '../../Layout/Layout'
import { useTranslation } from 'react-i18next';
function TermsOfUse() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const { t } = useTranslation();

    return (
        <>
            <Layout>
                {/* <!-- Hero Header Section Start --> */}
                <section className="sub-hero-headerr">
                    <div className="container">
                        <div className="text-content">
                            <h1>{t("T")}</h1>
                        </div>

                    </div>
                </section>
                {/* <!-- Hero Header Section End --> */}
                {/* <!-- About Start --> */}
                <section className="bg-white section-about">
                    <div className="container mb-4">
                        <div className="row">
                            {/* <div className="col-lg-6 mb-lg-0 mb-3"> */}
                            {/* <div className="section-header">
                                <h6 className="section-subtitle">Terms & Conditions</h6>
                            </div> */}
                            <p style={{ fontSize: "1.5rem" }}> <strong>{t("T1")} :</strong></p>
                            <p>{t("T1_p1")}</p>
                            <p>{t("T1_p2")}</p>
                            {/* </div> */}
                            {/* <div className="col-lg-5 offset-lg-1">
                                <div className="image-container">
                                    <img src={about} className="img-fluid" alt="" />
                                </div>
                            </div> */}
                        </div>
                        <div className='row'>
                            <p>{t("T1_p3")}</p>
                            <p>{t("T1_p4")}</p>
                            <p>{t("T1_p5")}</p>
                            <p>{t("T1_p6")}</p>
                            <br />
                            <p style={{ fontSize: "1.5rem" }}><strong>{t("T2")}</strong></p>
                            <p>{t("T2_p1")}</p>
                            <p>{t("T2_p2")}</p>
                            <p>{t("T2_p3")}</p>
                            <p>{t("T2_p4")}</p>
                            <p>{t("T2_p5")}</p>
                            <p>{t("T2_p6")}</p>
                            <p>{t("T2_p7")}</p>
                            <p>{t("T2_p8")}</p>
                            <p>{t("T2_p9")}</p>
                            <p>{t("T2_p10")}</p>
                            <p>{t("T2_p11")}</p>
                            <p>{t("T2_p12")}</p>
                            <p>{t("T2_p13")}</p>
                            <br />
                            <p style={{ fontSize: "1.5rem" }}><strong>{t("T3")}</strong></p>
                            <p>{t("T3_h1")}</p>
                            <p>
                                1. {t("T3_p1")}
                                <ul>
                                    <p>(a) 	{t("T3_p1_a")}</p>
                                    <p>(b) 	{t("T3_p1_b")}</p>
                                    <p>(c) 	{t("T3_p1_c")}</p>
                                    <p>(d) 	{t("T3_p1_d")}</p>
                                    <p>(e) 	{t("T3_p1_e")}</p>
                                    <p>(f) 	{t("T3_p1_f")}</p>
                                    <p>(g) 	{t("T3_p1_g")}</p>
                                    <p>(h) 	{t("T3_p1_h")}</p>
                                    <p>(i) 	{t("T3_p1_i")}</p>
                                    <p>(j) 	{t("T3_p1_j")}</p>
                                    <p>(k) 	{t("T3_p1_k")}</p>
                                    <p>(l) 	{t("T3_p1_l")}</p>
                                    <p>(m) 	{t("T3_p1_m")}</p>
                                    <p>(n) 	{t("T3_p1_n")}</p>
                                    <p>(o) 	{t("T3_p1_o")}</p>
                                    <p>(p)  {t("T3_p1_p")}</p>
                                    <p>(q) 	{t("T3_p1_q")}</p>
                                    <p>(r) 	{t("T3_p1_r")}</p>
                                    <p>(s) 	{t("T3_p1_s")}</p>
                                    <p>(t) 	{t("T3_p1_t")}</p>
                                    <p>(u)  {t("T3_p1_u")}</p>
                                    <p>(v) 	{t("T3_p1_v")}</p>
                                    <p>(w) 	{t("T3_p1_w")}</p>
                                    <p>(x) 	{t("T3_p1_x")}</p>
                                    <p>(y) 	{t("T3_p1_y")}</p>
                                    <p>(z) 	{t("T3_p1_z")}</p>
                                    <p>(aa) {t("T3_p1_aa")}</p>
                                    <p>(ab)	{t("T3_p1_ab")}</p>

                                </ul>
                            </p>
                            <p>2.	{t("T3_p2")}</p>
                            <p>3.	{t("T3_p3")}</p>
                            <p>4.	{t("T3_p4")}</p>
                            <p>5.	{t("T3_p5")}</p>
                            <p>6.	{t("T3_p6")}</p>
                            <p>7.	{t("T3_p7")}</p>
                            <p>8.	{t("T3_p8")}</p>
                            <p>9.	{t("T3_p9")} </p>
                            <p>10.	{t("T3_p10")}</p>
                            <p>11.	{t("T3_p11")}</p>
                            <p>12.	{t("T3_p12")}</p>
                            <br />
                            <p id="communications" style={{ fontSize: "1.5rem" }}> <strong>{t("T4")}</strong></p>
                            <p>
                            {t("T4_p1")}
                            </p>
                            <p>{t("T4_p2")}</p>
                            <br />
                            <p style={{ fontSize: "1.5rem" }}><strong>{t("T5")}</strong></p>
                            <p>{t("T5_p1")}</p>
                            <p>{t("T5_p2")}</p>
                            <p>{t("T5_p3")}</p>
                            <p>{t("T5_p4")}</p>
                            <p>{t("T5_p5")}</p>
                            <p>{t("T5_p6")}</p>
                            <p>{t("T5_p7")}</p>
                            <p>{t("T5_p8")}</p>
                            <p>{t("T5_p9")}</p>
                            <p>{t("T5_p10")}</p>
                            <p>{t("T5_p11")}</p>
                            <p>{t("T5_p12")}</p>
                            <p>{t("T5_p13")}</p>
                            <p>{t("T5_p14")}</p>
                            <p>{t("T5_p15")}</p>
                            <p>{t("T5_p16")}</p>
                            <p>{t("T5_p17")}</p>
                            <p>{t("T5_p18")}</p>
                            <p>{t("T5_p19")}</p>
                        </div>
                    </div>
                </section>
                {/* <!-- About End --> */}
            </Layout>
        </>
    )
}

export default TermsOfUse