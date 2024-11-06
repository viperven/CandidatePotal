import React from 'react'
import Carousel from "react-grid-carousel";
import { useTranslation } from 'react-i18next';


const PreviousActive = ({
    x,
    monthlyJobs,
    handleOnclickJobDetailsPage,
    handleSaveJobClick,
    href, }) => {
    const { t } = useTranslation();

    return (
        <div className="row">
            <Carousel cols={x} rows={1} gap={5}>
                {monthlyJobs
                    ? monthlyJobs.slice(0, 50).map((item, i) => (

                        <Carousel.Item key={i}>
                            <div
                                key={item.JobPostingID}
                                className="trendingJobs-card "

                            >
                                <div
                                    className="trendingJobs-card-body shadow-sm mb-4"
                                    style={{
                                        backgroundColor: i % 2 === 0 ? "#f5f5f5" : "#f5f5f5",
                                        cursor: "pointer",
                                        color: "black",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        textDecoration: "none",
                                        // width: "367px",
                                        // height:"436px",
                                        borderRadius: "70px",

                                    }}
                                    onClick={() =>
                                        handleOnclickJobDetailsPage(item.JobPostingID, item.JobPostingTitle)
                                    }
                                >
                                    <a
                                        href={href}
                                        target="_blank"
                                        className="bottom-bar"
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        <span
                                            title={item.JobPostingTitle}
                                            style={{
                                                fontFamily: "Nunito Sans",
                                                fontWeight: "600",
                                                fontSize: "24px",
                                                color: "#2E475D",
                                            }}
                                        >
                                            {item.JobPostingTitle
                                                ? item.JobPostingTitle.length <= 25
                                                    ? item.JobPostingTitle
                                                    : item.JobPostingTitle.substring(0, 16) + "..."
                                                : ""}
                                        </span>
                                    </a>

                                    <div className="mt-2">
                                        <p
                                            className="text-secondary"
                                            style={{
                                                color: "#5CA41F",
                                                fontFamily: "Nunito Sans",
                                                fontWeight: "300",
                                                fontSize: "18px",
                                            }}
                                        >
                                            {item.ClientName
                                                ? item.ClientName.length <= 15
                                                    ? item.ClientName
                                                    : item.ClientName.substring(0, 16) + "..."
                                                : ""}
                                        </p>

                                        <p className="text-muted" style={{
                                            fontWeight: "bolder", display: "flex",
                                            justifyContent: "flex-start", // Align items to the right
                                            gap: "5px", // Add spacing between the buttons
                                            marginTop: "10px",
                                        }}>
                                            <i className="bx bxs-map d-flex align-items-center" /> {item.LocationName}
                                        </p>
                                        <p className="text-muted" style={{
                                            display: "flex",
                                            justifyContent: "flex-start", // Align items to the right
                                            gap: "5px", // Add spacing between the buttons
                                            marginTop: "10px",
                                        }}>
                                            <i className="bx bxs-briefcase d-flex align-items-center" />
                                            {item.JobPostingExperienceFrom} - {item.JobPostingExperienceTo} Yrs of Experience
                                        </p>
                                    </div>

                                    <p className="text-muted" style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        gap: "5px",
                                        marginTop: "10px",
                                    }}>
                                        <i className="bx bxs-phone-call d-flex align-items-center" />
                                        <a href={`tel:${item.Ivr}`} style={{ textDecoration: "none", color: "inherit" }}>
                                            {item.Ivr ? item.Ivr : "N/A"}
                                        </a>
                                    </p>

                                    <div className="d-flex justify-content-between"
                                        style={{
                                            gap: "5px",
                                            marginTop: "50px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <i
                                                className="bx bxs-bookmark"
                                                style={{
                                                    background: item.IsSavedJob === 1 ? "rgb(255 173 154 / 80%)" : "#FE5C35",
                                                    color: "white",
                                                    padding: "10px",
                                                    fontSize: "24px",
                                                    borderRadius: "50%",
                                                    cursor: "pointer",
                                                }}
                                                title={
                                                    item.IsSavedJob === 1
                                                        ? "You have saved this job"
                                                        : "Save"
                                                }
                                                onClick={() => handleSaveJobClick(item.JobPostingID)}
                                            ></i>
                                        </div>

                                        <div>
                                            <a
                                                className="btn btn-outline-primary btn-sm"
                                                href={href}
                                                style={{
                                                    textDecoration: "none",
                                                    color: "inherit",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "5px",
                                                    borderRadius: "14987.681px",
                                                    transition: "background-color 0.3s ease",
                                                    padding: "10px"

                                                }}
                                            >
                                                {t("Apply_Job")}{" "}
                                                <i
                                                    className="bx bxs-right-arrow-alt"
                                                    style={{
                                                        borderRadius: "50%",
                                                        background: "#FE5C35",
                                                        color: "white",
                                                        padding: "5px",
                                                    }}
                                                />
                                            </a>
                                        </div>

                                    </div>


                                </div>
                            </div>

                        </Carousel.Item>
                    ))
                    : null}
            </Carousel>
        </div>
    )
}

export default PreviousActive