import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import { useTranslation } from 'react-i18next';

function SearchGuidelines() {
    const { t } = useTranslation();
    return (
        <>
            <Layout>
                <section className="hero-headerr">
                    <div className="container">
                        <div className="text-content">
                            <h1>{t("S")}</h1>
                        </div>

                    </div>
                </section>
                <section className="bg-white section-about">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-lg-0 mb-3">
                                <div className="section-header">
                                    <h6 className="section-subtitle">{t("S_QS")}</h6>
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}><b>{t("S_QS_h1")}</b></div>
                                <br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }}>{t("S_QS_h1_p")}
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }} > <b>{t("S_QS_h2")}</b> </div>
                                <br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }}> {t("S_QS_h2_p")}
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}>  <b>{t("S_QS_h3")}</b></div><br></br>
                                <div style={{ textAlign: "left", marginBottom: "1%" }} >{t("S_QS_h3_p")}</div>

                                <div style={{ textAlign: "left", marginBottom: "-2%" }}> <b>{t("S_QS_h4")}</b></div> <br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }}>
                                    {t("S_QS_h4_p")}
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}><b>{t("S_QS_h5")} </b> 
                                </div ><br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }}>
                                    {t("S_QS_h5_p")}
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}> <b>{t("S_QS_h6")}</b></div><br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }}>
                                    {t("S_QS_h6_p")}
                                </div>
                                <div className="section-header">
                                    <h6 className="section-subtitle"> {t("S_AS")}</h6>
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "1%" }}>
                                    {t("S_AS_p")}
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}> <b>{t("S_QS_h1")}</b></div><br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }}>
                                    {t("S_QS_h1_p")}
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}>  <b>{t("S_QS_h4")}</b></div><br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }}>
                                    {t("S_QS_h4_p")}<br />
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}><b>{t("S_QS_h5")} </b></div><br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }} >{t("S_QS_h5_p")}
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}>   <b>{t("S_AS_h4")}</b></div><br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }} > {t("S_AS_h4_p")}
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}> <b>{t("S_AS_h5")}</b></div><br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }}> {t("S_AS_h5_p")}</div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}>  <b>{t("S_QS_h2")}</b></div><br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }}>
                                    {t("S_QS_h2_p")}
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}>   <b>{t("S_QS_h3")}</b></div> <br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }}>
                                    {t("S_AS_h7_p")}
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}> <b>{t("S_AS_h8")}</b></div><br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }}>
                                    {t("S_AS_h8_p")}
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}>   <b>{t("S_AS_h9")}</b></div><br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }}>
                                    {t("S_AS_h9_p")}
                                </div>
                                <div style={{ textAlign: "left", marginBottom: "-2%" }}> <b>{t("S_QS_h6")}</b></div><br />
                                <div style={{ textAlign: "left", marginBottom: "1%" }}>
                                    {t("S_QS_h6_p")}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default SearchGuidelines