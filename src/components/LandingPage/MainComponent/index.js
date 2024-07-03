import React from 'react';
import "./styles.css";
import Button from "../../Common/Button";
import iphone from "../../../assets/iphone.png";
import gradient from "../../../assets/gradient.png";
import { motion } from "framer-motion";
import { RWebShare } from "react-web-share";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


function MainComponent() {
  return (
    <div className="flex-info">
      <div className="left-component">
        <motion.h1 className="track-crypto-heading"
          initial={{ opacity: 0, scale: 0, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 2 }}>
          Track Crypto
        </motion.h1>
        <motion.h1 className="real-time-heading"
          initial={{ opacity: 0, scale: 0, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 2, delay: 1 }}>
          Real Time
        </motion.h1>
        <p class="info-text">  Track crypto in real time by API</p>
        <div class="button-flex">
          <Link to="/dashboard">
            <Button text={"dashboard"}
              onClick={() => console.log("Btn Clicked")}
            />
          </Link>
          <RWebShare
            data={{
              text: "CryptoDashboard made by Avi Vashishta using React JS.",
              url: "https://crypto-dashboard-jan.netlify.app",
              title: "CryptoTracker.",
            }}
            onClick={() => toast.info("App Shared!")}
          >
            <Button text={"Share App"} outlined={true} />
          </RWebShare>
        </div>
      </div>
      <div className="phoneContainer">
        <motion.img src={iphone} className="iphone-img"
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            type: "keyframes",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,

          }} />
        <img src={gradient} className="gradient" />
      </div>

    </div>
  )
}

export default MainComponent