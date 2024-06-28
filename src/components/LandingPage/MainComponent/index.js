import React from 'react';
import "./styles.css";
import Button from "../../Common/Button";
import iphone from "../../../assets/iphone.png";
import gradient from "../../../assets/gradient.png";
import { motion } from "framer-motion";
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
          <Button text={"Dashboard"} />
          <Button text={"Share"} outlined={true} />

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