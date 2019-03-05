import React, { useEffect, useState } from "react";
import Clip from "./Clip.jsx";
import { Icon } from "react-materialize";

function Gallery({clips}) {
  return (
    <React.Fragment>
      <div className="gallery-title">
        <Icon small>video_library</Icon>
        <span>Most Viewed Clips</span>
      </div>
      <div className="gallery">
        {clips && clips.map((clip, index) => {
          return (
            <Clip clipEmbedURL={clip.embed_url} key={clip.id} index={index} />
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default Gallery;
