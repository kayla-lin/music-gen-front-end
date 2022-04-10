import React from "react";
import styles from "./Landing.module.css";
import { FaPlay } from "react-icons/fa";
import { useEffect } from "react";

function Landing(props) {
  const header = "Create AI Music";
  const tagLine = "Give us your instructions and we'll create your song.";

  const toGenreHandler = () => {
    props.changeStage("genre");
    props.clearInput();
  };

  const toLoadingHandler = () => {
    props.changeStage("loading");
    props.setUsedMidi(true);
  };

  useEffect(()=>{
    props.setUsedMidi(false);
  },[]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.intro}>
        <section className={styles.text}>
          <h1>{header}</h1>
          <p className={styles.tagLine}>{tagLine}</p>
        </section>

        <section className={styles.buttons}>
          <button className={styles[`start-button`]} onClick={toGenreHandler}>
            Customize our options
            <FaPlay className={styles.playIcon} />
          </button>

          <label className={styles.customFileUpload}>
            <input
              id="file-upload"
              className={styles.upload}
              type="file"
              accept="audio/midi"
              title=" "
              onChange={toLoadingHandler}
            />
            Upload a midi file
          </label>
        </section>
      </div>
    </div>
  );
}

export default Landing;
