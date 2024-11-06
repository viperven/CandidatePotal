// import { createChatBotMessage } from 'react-chatbot-kit';

// const config = {
//   botName: "Gemini",
//   initialMessages: [createChatBotMessage("Hi, How can I help you?")],
//   customStyles: {
//     botMessageBox: {
//       backgroundColor: "#376B7E",
//     },
//     chatButton: {
//       backgroundColor: "#376B7E",
//     },
//   },
// }

// export default config

import React, { useEffect, useState } from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import FAQ from "../components/FAQ/FAQ";
import LinkList from "../components/LinkList/LinkList";
import { SocialService } from "../Services/SocialService";
import LinkListYoutube from "../widgets/LinkListYoutube/LinkListYoutube";
import LinkListYoutubeAll from "../widgets/LinkListYoutube/LinkListYoutubeAll";

const ChatbotConfig = () => {
  const config = {
    initialMessages: [
      createChatBotMessage("Hello, How can I help you?", {
        widget: "FAQ",
      }),
    ],
    widgets: [
      {
        widgetName: "FAQ",
        widgetFunc: (props) => <FAQ {...props} />,
      },
      {
        widgetName: "ApplyJobs",
        widgetFunc: (props) => <LinkList {...props} />,
        props: {
          options: [
            {
              text: "Search for your desired Job.",
              // url: 'https://www.huntsjob.com/',
              id: 1,
            },
            {
              text: "Select the Jobs you want to Apply to.",
              // url: 'https://www.huntsjob.com/',
              id: 2,
            },
            {
              text: "Click on `Apply Job` button in Top right corner.",
              // url: 'https://www.huntsjob.com/',
              id: 3,
            },
            {
              text: "Fill the required details in the Application Form and press `Apply` button.",
              // url: 'https://www.huntsjob.com/',
              id: 4,
            },
          ],
        },
      },
      {
        widgetName: "SaveJobs",
        widgetFunc: (props) => <LinkList {...props} />,
        props: {
          options: [
            {
              text: "Search for your desired Job.",
              // url: 'https://www.huntsjob.com/',
              id: 1,
            },
            {
              text: "Select the Jobs you want to Save.",
              // url: 'https://www.huntsjob.com/',
              id: 2,
            },
            {
              text: "Click on `Save Job` button in Top right corner.",
              // url: 'https://www.huntsjob.com/',
              id: 3,
            },
          ],
        },
      },
      {
        widgetName: "Register",
        widgetFunc: (props) => <LinkList {...props} />,
        props: {
          options: [
            {
              text: "Hover on Candidate in Navigation Bar",
              // url: 'https://www.huntsjob.com/',
              id: 1,
            },
            {
              text: "Click on Registration (or click here)",
              url: "https://www.huntsjob.com/register",
              id: 2,
            },
            {
              text: "Fill all the required fields marked with * and submit the form",
              // url: 'https://www.huntsjob.com/',
              id: 3,
            },
            {
              text: "Verify mobile number with OTP",
              // url: 'https://www.huntsjob.com/',
              id: 4,
            },
            {
              text: "Fill Educational, Personal and other details",
              // url: 'https://www.huntsjob.com/',
              id: 5,
            },
            {
              text: "Press Submit after completing all these steps",
              // url: 'https://www.huntsjob.com/',
              id: 6,
            },
          ],
        },
      },
      {
        widgetName: "Login",
        widgetFunc: (props) => <LinkList {...props} />,
        props: {
          options: [
            {
              text: "Hover on Candidate in Navigation Bar.",
              // url: 'https://www.huntsjob.com/',
              id: 1,
            },
            {
              text: "Click on Login.",
              // url: 'https://www.huntsjob.com/',
              id: 2,
            },
            {
              text: "Enter Mobile number and password and click on Login or login with google or facebook",
              // url: 'https://www.huntsjob.com/',
              id: 3,
            },
          ],
        },
      },
      {
        widgetName: "Reset Password",
        widgetFunc: (props) => <LinkList {...props} />,
        props: {
          options: [
            {
              text: "Hover on Candidate in Navigation Bar.",
              // url: 'https://www.huntsjob.com/',
              id: 1,
            },
            {
              text: "Click on Login.",
              // url: 'https://www.huntsjob.com/',
              id: 2,
            },
            {
              text: "Click on Forgot Password below Password field",
              // url: 'https://www.huntsjob.com/',
              id: 3,
            },
            {
              text: "Select how you want to reset your password (Mobile Number / Email)",
              // url: 'https://www.huntsjob.com/',
              id: 4,
            },
            {
              text: "Enter your Mobile Number or Email",
              // url: 'https://www.huntsjob.com/',
              id: 5,
            },
            {
              text: "Enter new password and the OTP recieved on your select Mobile or Email",
              // url: 'https://www.huntsjob.com/',
              id: 6,
            },
            {
              text: "Click on Update, your password will be updated",
              // url: 'https://www.huntsjob.com/',
              id: 7,
            },
          ],
        },
      },
      {
        widgetName: "SaveJobs",
        widgetFunc: (props) => <LinkList {...props} />,
        props: {
          options: [
            {
              text: "Search for your desired Job.",
              // url: 'https://www.huntsjob.com/',
              id: 1,
            },
            {
              text: "Select the Jobs you want to Save.",
              // url: 'https://www.huntsjob.com/',
              id: 2,
            },
            {
              text: "Click on `Save Job` button in Top right corner.",
              // url: 'https://www.huntsjob.com/',
              id: 3,
            },
          ],
        },
      },
      {
        widgetName: "YouTube",
        widgetFunc: () => <LinkListYoutube />,
      }, 
      {
        widgetName: "YouTube All",
        widgetFunc: () => <LinkListYoutubeAll />,
      },
    ],
    botName: "HuntBot",
    customStyles: {
      botMessageBox: {
        backgroundColor: "#FE5C35",
      },
      chatButton: {
        backgroundColor: "#FE5C35",
      },
    },
  };
  return config;
};

export default ChatbotConfig;
