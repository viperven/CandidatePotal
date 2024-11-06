import React, { useEffect } from "react";
import Layout from "../../Layout/Layout";
import { useTranslation } from "react-i18next";
function PrivacyCommitment() {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "HuntsJob || PrivacyCommitment";
  }, []);
  // useEffect(() => {
  //   document.getElementById("cookiesDiv").scrollIntoView();
  // }, []);
  return (
    <>
      <Layout>
        {/* <!-- Hero Header Section Start --> */}
        <section className="sub-hero-headerr">
                    <div className="container">
                        <div className="text-content">
                            <h1>{t("Privacy_Commitment")}</h1>
                        </div>

                    </div>
                </section>
        {/* <!-- Hero Header Section End --> */}
        {/* <!-- About Start --> */}
        <section className="bg-white section-about">
          <div className="container">
            <div className="row">
              {/* <div className="col-lg-6 mb-lg-0 mb-3"> */}
              <div className="section-header">
                {/* <h6 className="section-subtitle">Privacy Commitment Of HUNTSJOB</h6> */}
                {/* <h6 className="section-subtitle"> {t("Privacy_Commitment")}</h6> */}
              </div>
              <p>
                {" "}
                <strong style={{fontSize:"1.5rem"}}>{t("Introduction")}</strong>
              </p>
              <p>
                {t("Privacy_Commitment_1")}
                <strong>Huntsjob</strong> {t("Privacy_Commitment_2")}
              </p>
              <p>
                {" "}
                {t("Privacy_Commitment_3")}
                <strong>{t("Platform")}</strong>").
              </p>
              {/* </div> */}
              {/* <div className="col-lg-5 offset-lg-1">
                                <div className="image-container">
                                    <img src={about} className="img-fluid" alt="" />
                                </div>
                            </div> */}
              <p> {t("Privacy_Commitment_4")}</p>
              <p> {t("Privacy_Commitment_5")} </p>
              <p> {t("Privacy_Commitment_6")} </p>
              <p> {t("Privacy_Commitment_7")} </p>
              <p> {t("Privacy_Commitment_8")} </p>
              <p> {t("Privacy_Commitment_9")} </p>
            </div>
            <div className="row">
              <div className="col-lg-12 mb-lg-0 mb-3">
                <p>
                  {" "}
                  <strong> {t("TYPE OF INFORMATION WE COLLECT")}</strong>
                </p>
                <p> {t("Privacy_Commitment_10")} </p>
                <p> {t("Privacy_Commitment_11")} </p>
                <p> {t("Privacy_Commitment_12")} </p>
                <p> {t("Privacy_Commitment_13")}</p>

                <p>
                  <strong>{t("HOW WE USE YOUR PERSONAL INFORMATION")}</strong>
                </p>
                <p>{t("Privacy_Commitment_14")}</p>
                <p>{t("Privacy_Commitment_15")} </p>
                <p>{t("Privacy_Commitment_16")} </p>
                <p>{t("Privacy_Commitment_17")} </p>
                <p>
                  <strong>{t("With_whom_your")}</strong>
                </p>
                <p>
                  <strong> {t("EMPLOYEES / CONSULTANTS")}</strong>
                </p>
                <p>{t("Privacy_Commitment_18")}</p>
                <p>
                  <strong>{t("COMPANIES IN THE SAME GROUP")}</strong>
                </p>
                <p>{t("Privacy_Commitment_19")}</p>
                <p>{t("Privacy_Commitment_20")}</p>
                <p>
                  <strong>{t("POTENTIAL RECRUITERS")}</strong>
                </p>
                <p>{t("Privacy_Commitment_21")} </p>
                <p>
                  <strong>{t("DISCLOSURE OF INFORMATION")}</strong>
                </p>
                <p>{t("Privacy_Commitment_22")}</p>
                <p>{t("Privacy_Commitment_23")}</p>

                <p></p>
                <p>
                  <strong>
                    {t("BUSINESS PARTNERS and THIRD-PARTY SERVICE PROVIDERS")}
                  </strong>
                </p>
                <p>{t("Privacy_Commitment_24")}</p>
                <p>{t("Privacy_Commitment_25")}</p>
                <p>{t("Privacy_Commitment_26")}</p>
                <p>{t("Privacy_Commitment_27")}</p>
                <p>{t("Privacy_Commitment_28")}</p>
                <p>{t("Privacy_Commitment_29")}</p>
                <p>{t("Privacy_Commitment_30")}</p>
                <p>
                  <strong>{t("THIRD PARTY ADVERTISERS")}</strong>
                </p>
                <p>{t("Privacy_Commitment_31")} </p>
                <p>{t("Privacy_Commitment_32")}</p>
                <p>{t("Privacy_Commitment_33")}</p>
                <p>
                  <strong>{t("SOCIAL MEDIA")}</strong>
                </p>
                <p>{t("Privacy_Commitment_34")}</p>
                <p>{t("Privacy_Commitment_35")}</p>
                <p>
                  <strong>
                    {t("HOW LONG DO WE KEEP YOUR PERSONAL INFORMATION?")}
                  </strong>
                </p>
                <p id="cookiesDiv">{t("Privacy_Commitment_36")}</p>
                <p>{t("Privacy_Commitment_37")}</p>

                <p>
                  <strong>{t("COOKIES AND SESSION DATA")}</strong>
                </p>
                <p>
                  <strong>{t("Cookies")}</strong>
                </p>
                <p>{t("Privacy_Commitment_38")}</p>
                <p>{t("Privacy_Commitment_39")}</p>
                <p>{t("Privacy_Commitment_40")}</p>
                <p>{t("Privacy_Commitment_41")}</p>
                <p>
                  <strong>{t("Automatic Logging of Session Data")}</strong>
                </p>
                <p>{t("Privacy_Commitment_42")}</p>
                <p>
                  <strong>{t("WITHDRAWAL OF CONSENT AND PERMISSION")}</strong>
                </p>
                <p>{t("Privacy_Commitment_43")}</p>
                <p>
                  <strong>{t("YOUR RIGHTS QUA PERSONAL INFORMATION")}</strong>
                </p>
                <p>{t("Privacy_Commitment_44")}</p>
                <p>{t("Confidentiality and Security")}</p>
                <p>{t("Privacy_Commitment_45")}</p>
                <p>{t("Privacy_Commitment_46")}</p>
                <p>
                  <strong>{t("ELIGIBILITY TO TRANSACT")} </strong>
                </p>
                <p>{t("Privacy_Commitment_47")}</p>
                <p>
                  <strong>{t("DISCLAIMER")}</strong>
                </p>
                <p>{t("Privacy_Commitment_48")}</p>
                <p>{t("Privacy_Commitment_49")}</p>
                <p>
                  <strong>{t("CHANGES TO THE PRIVACY POLICY")}</strong>
                </p>
                <p>{t("Privacy_Commitment_50")}</p>
                <p>
                  <strong>{t("Privacy_Commitment_51")}</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- About End --> */}
      </Layout>
    </>
  );
}

export default PrivacyCommitment;
