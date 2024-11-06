import React, { useState } from "react";

import "./FAQ.css";

const FAQ = (props) => {
  const [buttonPressed, setButtonPressed] = useState(null);

  const options = [
    {
      text: "Youtube Video",
      handler: () => {
        props.actionProvider.youtubeList();
        setButtonPressed(0);
      },
      id: 0,
    },
    {
      text: "All Videos",
      handler: () => {
        props.actionProvider.allYoutubeList();
        setButtonPressed(1);
      },
      id: 1,
    },
    {
      text: "How to: Apply Job",
      handler: () => {
        props.actionProvider.handleFAQ_1List();
        setButtonPressed(2);
      },
      id: 2,
    },
    {
      text: "How to: Save Job",
      handler: () => {
        props.actionProvider.handleFAQ_2List();
        setButtonPressed(3);
      },
      id: 3,
    },
    {
      text: "How to: Register",
      handler: () => {
        props.actionProvider.handleFAQ_3List();
        setButtonPressed(4);
      },
      id: 4,
    },
    {
      text: "How to: Login",
      handler: () => {
        props.actionProvider.handleFAQ_4List();
        setButtonPressed(5);
      },
      id: 5,
    },
    {
      text: "Forgot Password?",
      handler: () => {
        props.actionProvider.handleFAQ_5List();
        setButtonPressed(6);
      },
      id: 6,
    },
  ];

  const optionsMarkup = options.map((option) => {
    if (option.id === buttonPressed) {
      return (
        <button
          disabled={true}
          className="faq-option-button"
          key={option.id}
          onClick={option.handler}
        >
          {option.text}
        </button>
      );
    } else {
      return (
        <button
          disabled={false}
          className="faq-option-button"
          key={option.id}
          onClick={option.handler}
        >
          {option.text}
        </button> 
      );
    }
  });

  return <div className="faq-options-container">{optionsMarkup}</div>;
};

export default FAQ;
