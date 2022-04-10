import React, { useState } from "react";
import styles from "./SampleElement.module.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import Visuals from "./Visuals";

const SampleElement = (props) => {
  const audioPlayPauseHandler = () => {
    if (!props.data.play) {
      props.globalPlay(props.index);
      props.setConfirm(props.name);
    } else {
      props.globalPause(props.index);
      props.setConfirm("");
    }
  };

  const playPauseIcon =
    !props.data.play ? (
      <FaPlay className={styles.play} />
    ) : (
      <FaPause className={styles.pause} />
    );
  //
  return (
    <div
      style={{
        color: props.data.play === true ? "#d45cff" : "white",
      }}
    >
      <div className={styles.wrapper}>
        <h1 className={styles.button}>{props.name}</h1>
        <div className={styles.audio}>
          <Visuals audioelement={props.audioElement} name={props.name} />
        </div>
        <div className={styles.audioControl} onClick={audioPlayPauseHandler}>
          {playPauseIcon}
        </div>
      </div>
    </div>
  );
};
export default SampleElement;
