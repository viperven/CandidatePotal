import React from 'react';
import { useTranslation } from 'react-i18next';

const PopularCategories = ({width, top10Industries, isMobile, handleTop5Industries, handleIndustriesiconOnload }) => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="section">
        <div className="heading">
          <span style={{ color: "#FE5C35" }}>{t("Popular")} </span>
          {t("Job Categories")}
        </div>
        <p className="subheading">{t("PopJH")}</p>

        <div className="jobs-container">
          {top10Industries.slice(0, 5).map((i, index) => (
            <div
              key={index} // Add a unique key for each element
              className="job-cat"
              title={i.IndustryName}
              onClick={() => handleTop5Industries(i.IndustryID, i.IndustryName)}
            >
              <div className="job-cat-img-container shadow-lg">
                <img
                  src={handleIndustriesiconOnload(i.IndustryID)}
                  alt={i.IndustryName}
                />
              </div>
              <div style={{ width: {width} }}>
                <div className="job-cat-footer">
                  <p
                    className="job-cat-title"
                    style={{ fontSize: "14px", fontWeight: "700" }}
                  >
                    {i.IndustryName
                      ? i.IndustryName.length <= 15
                        ? i.IndustryName
                        : `${i.IndustryName.substring(0, 15)}...`
                      : ""}
                  </p>
                  <p
                    className="job-cat-subtitle"
                    style={{
                      fontSize: "14px",
                      color: "#FF3100",
                      display: isMobile ? "flex" : "",
                      flexDirection: isMobile ? "column" : "",
                    }}
                  >
                    <span className="active-count">{i.activeCount}+</span>
                    <span className="job-text">{t("Jobs").substring(0, 12) + "..."}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="jobs-container">
          {top10Industries.slice(5, 10).map((i, index) => (
            <div
              key={index} // Add a unique key for each element
              className="job-cat"
              title={i.IndustryName}
              onClick={() => handleTop5Industries(i.IndustryID, i.IndustryName)}
            >
              <div className="job-cat-img-container shadow-lg">
                <img
                  src={handleIndustriesiconOnload(i.IndustryID)}
                  alt={i.IndustryName}
                />
              </div>
              <div style={{ width: {width} }}>
                <div className="job-cat-footer">
                  <p
                    className="job-cat-title"
                    style={{ fontSize: "0.8rem", fontWeight: "700" }}
                  >
                    {i.IndustryName
                      ? i.IndustryName.length <= 15
                        ? i.IndustryName
                        : `${i.IndustryName.substring(0, 15)}...`
                      : ""}
                  </p>
                  <p
                    className="job-cat-subtitle"
                    style={{
                      fontSize: "14px",
                      color: "#FF3100",
                      display: isMobile ? "flex" : "",
                      flexDirection: isMobile ? "column" : "",
                    }}
                  >
                    <span className="active-count">{i.activeCount}+</span>
                    <span className="job-text">{t("Jobs").substring(0, 12) + "..."}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
