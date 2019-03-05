import React, { Component } from "react";
import "./App.css";

const Clip = (props) => {
  const { clipEmbedURL, index } = props;
  const clipURLOptions = "&autoplay=false";

  return (
    <iframe
      title={index}
      key={index}
      className="clip-video"
      src={clipEmbedURL + clipURLOptions}
      muted={true}
      frameBorder="0"
      scrolling="no"
      allowFullScreen={true}
      autoPlay={false}
    />
  );
};

export default Clip;
