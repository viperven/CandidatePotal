
import logo from "./logo.svg";
import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import "./Components/Main/HuntBot/assets/css/chatbot_style.css";
import ChatbotConfig from "./Components/Main/HuntBot/Handler/config";
import validator from "./Components/Main/HuntBot/Handler/validator";
import ActionProvider from "./Components/Main/HuntBot/Handler/ActionProvider";
import MessageParser from "./Components/Main/HuntBot/Handler/MessageParser";
import Chatbot from "react-chatbot-kit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";
import Draggable from "react-draggable";
import Lottie from "react-lottie";
import animationData from "../src/assets/imgs/hand.json";
// import clear404Stats from "../src/Components/Main/Error404";

function App() {
  //<-------------CHATBOT----------------->//
  const [chatState, setChatState] = useState(false);
  const [showChat, setShowChat] = useState("");
  const [showChat2, setShowChat2] = useState("");
  const [showContent, setShowContent] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [showAfterHide, setShowAfterHide] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const handleChatState = (state) => {
    setChatState(state);
  };
  // const [showImage, setShowImage] = useState(false);
  const showChatbot = () => {
    if (!chatState) {
      setTimeout(() => {
        setShowChat("chatBotIconContainer");
        setShowChat2("afterhidechatBotIconContainer");
      }, 800);
    } else {
      setShowChat("chatBotIconContainerHide");
      setShowChat2("afterhidechatBotIconContainerHide");
    }
  };
  const chatContainerRef = useRef(null);
  useEffect(() => {
    const chatContent = chatContainerRef.current;
    if (chatState) {
      // chatContent.style.top = "calc(100% - 705px)";
      // chatContent.style.top = "calc(100% - 505px)";
      chatContent.style.top = "calc(100% - 70vh)";
    } else {
      chatContent.style.top = "calc(100%)";
    }
    showChatbot();
  }, [chatState]);

  const customStyleChatBot = {
    transform: "none",
    display: chatState ? "flex" : "none",
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // setShowImage(true);
  //   }, 2000); // 2000 milliseconds = 2 seconds

  //   return () => clearTimeout(timer);
  // }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (animateOut) {
      const hideTimer = setTimeout(() => {
        setShowContent(false);
        setShowAfterHide(true);
      });

      return () => clearTimeout(hideTimer);
    }
  }, [animateOut]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // window.addEventListener("popstate", function (event) {
  //   if (window.location.pathname === "/404") {
  //     console.log("window.location.pathname", window.location.pathname);

  //     clear404Stats();
  //   }
  // });

 
 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    const handleScroll = () => {
      const chatBotIcon = document.querySelector(".hiddenChatBotIcon");
      if (chatBotIcon) {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - 30) {
          chatBotIcon.style.bottom = "130%";
        } else {
          chatBotIcon.style.bottom = "0";
        }
      }
    };

    if (isMobile) {
      window.addEventListener("scroll", handleScroll);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (isMobile) {
        window.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);
  return (
    <>
      {/* <Draggable> */}
      <div ref={chatContainerRef} className="chatbot-container">
        <button
          style={{
            position: "absolute",
            width: "fit-content",
            zIndex: 999,
            top: "6px",
            marginLeft: "335px",
            height: "40px",
            backgroundColor: "transparent",
            borderColor: "transparent",
            fontSize: "large",
            color: "#fff",
            fontWeight: "bold",
          }}
          onClick={() => handleChatState(false)}
        >
          <RemoveCircleIcon />
        </button>

        <Chatbot
          config={ChatbotConfig()}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
          headerText="Chat with HuntBot 🤖"
          // validator={validator} //remove in test
        />
      </div>
      {/* </Draggable> */}
      {/*  <div className={showChat} title='HuntBot' onClick={() => handleChatState(true)}>
        <SmartToyTwoToneIcon fontSize="4rem" className="chatBotIcon" />
        <span style={{ color: "#ff3d0c", fontSize: "8px", fontFamily: "arial", fontWeight: "600", marginTop: "-7px" }}>HuntBot</span>
      </div>*/}

      {/* {showImage && (
        <>
          {showContent && (
            <div
              className={`${showChat} ${animateOut ? "animate-out" : ""}`}
              // className={`${showChat}`}
              title="HuntBot"
              onClick={() => handleChatState(true)}
            >
              <i class="bx bxl-telegram chatBotIcon"></i>

              <h6
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "900",
                  color: "#ff5c35",
                }}
              >
                CLICK FOR HELP
              </h6>
            </div>
          )}{" "}
        </>
      )} */}
      {showAfterHide && (
        <div
          title="HuntBot"
          onClick={() => handleChatState(true)}
          // className="afterhide"
          className={showChat2}
          style={{
            // backgroundColor: "rgb(179, 221, 255)",
            width: "55px",
            height: "55px",
            borderRadius: "20px",
            // display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <img className="chatBotIcon" src={icon} alt="" /> */}
          <div className="hiddenChatBotIcon">
            <Lottie options={defaultOptions} style={{ marginTop: "6px" }} />
            {/* <h1
              style={{
                color: "#ff5b3d",
                fontSize: "14.791px",
                fontWeight: "700",
                lineHeight: "20px",
                animation: "blinker 5s linear infinite",
                textShadow:
                  "rgb(229 85 5) 0px 0px 5px, rgb(231 67 35) 0px 0px 10px, rgb(194 71 15) 0px 0px 15px;",
              }}
            >
              HELP?
            </h1> */}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
