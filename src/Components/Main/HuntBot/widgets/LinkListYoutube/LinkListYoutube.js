import React, { useEffect, useState } from "react";

import "./LinkListYoutube.css";
import { SocialService } from "../../Services/SocialService";

const LinkListYoutube = () => {
  const [data, setData] = useState([]);
  console.log("y data",data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await SocialService.GetYouTubeLinksForHuntBoat();
        const resData = JSON.parse(res.apiData);
        // Map each item in resData to a data object
        if (resData !== null) {
          const mappedData = resData.map((item) => ({
            text:
              "Y" +
              item.ID +
              "  ||  " +
              item.PositionName +
              "  ||   " +
              item.CountryName,
            url: item.YoutubeLink,
            id: item.ID,
          }));

          setData(mappedData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const linkMarkup = data.map((link) => (
    <li key={link.id} className="link-list-item">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-list-item-url"
      >
        {link.text}
      </a>
    </li>
  ));

  return data.length === 0 ? (
    <div className="nodata"><div className="Shimmer-card">
    <p></p>
  </div></div>
  ) : (
    <div className="yt-height" key="123">
      <ul className="link-list">{linkMarkup}</ul>
    </div>
  );

  // <ul className="link-list">{linkMarkup}</ul>
};
export default LinkListYoutube;
