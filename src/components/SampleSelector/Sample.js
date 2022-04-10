import React, { useState, useEffect } from "react";
import SampleElement from "./SampleElement";
import SampleConfirmButton from "./SampleConfirmButton";
import styles from "./Sample.module.css";
import { useTransition, useSpring, animated, config } from "react-spring";

/* Song imports, perhaps, overwrite these songs depending on the genre? */
import sample1 from "../../assets/music/samples/sample1.mp3";
import sample2 from "../../assets/music/samples/sample2.mp3";
import sample3 from "../../assets/music/samples/sample3.mp3";

/* Object holding the names of the sample & location */
var names = [
  "Jelly",
  "Melon",
  "Noodle",
  "Brownie",
  "Pie",
  "Cupcake",
  "Pudding",
  "Strawberry",
];

/* Helper function get random names to each sample song */
const getRandomFood = () => {
  var random = parseInt(Math.random() * parseInt(names.length));
  var food = names[random];
  names.splice(random, 1);
  return food;
};

/* Object holding the name of the sample and id */
const samples = [
  { name: getRandomFood(), id: 0 },
  { name: getRandomFood(), id: 1 },
  { name: getRandomFood(), id: 2 },
];

function Sample(props) {
  /* Creates the audio objects */
  var musicData = null;
  /* Holds the audio sources */
  const [musicArray] = useState([sample1, sample2, sample3]);
  /* Holds the audio objects & play infomation */
  const [data, setData] = useState([]);
  /* Keeps track is the audio is loaded */
  const [loaded, setLoaded] = useState(false);
  /* Keeps track of the currently selected audio */
  const [confirm, setConfirm] = useState("");

  const [samplesArray] = useState(samples);
  const listTransitions = useTransition(samplesArray, {
    config: config.default,
    from: { opacity: 0, transform: "translate3d(0px, 25%, 0px)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    leave: { opacity: 0, height: 0, transform: "translate3d(0px, -25%, 0px)" },
    trail: 50,
    keys: samplesArray.map((item, index) => index),
  });

  useEffect(() => {
    musicData = musicArray.map((sound) => {
      return { audio: new Audio(sound), play: false };
    });

    setData(musicData);
    setLoaded(true);
  }, [musicArray]);

  const playSound = (index) => {
    setData((arr) =>
      arr.map((sound, i) => {
        if (i === index) {
          sound.audio.play();
          return { ...sound, play: true };
        }
        sound.audio.pause();
        return { ...sound, play: false };
      })
    );
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const stopSound = (index) => {
    setData((arr) =>
      arr.map((sound, i) => {
        if (i === index) {
          sound.audio.pause();
          return { ...sound, play: false };
        }
        return { ...sound, play: false };
      })
    );
  };

  /* Global audio control, one audio will only play/pause at a time */
  const play = (index) => {
    props.pauseAllHandler(data);
    playSound(index);
    data[index].audio.currentTime = 0;
    data[index].audio.loop = true;
  };
  const pause = (index) => {
    stopSound(index);
  };

  /* Pause all audio playing */
  const allPause = () => {
    data.map((sample) => {
      sample.audio.pause();
    });
  };

  const fadeStyles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
  });

  return (
    <animated.div style={fadeStyles}>
      <section className={styles.intro}>
        <h1 className={styles.header}>Samples</h1>
        <p>We are almost ready. Choose a sample to base your song on.</p>
      </section>
      <section className={styles.sampleElements}>
        {loaded
          ? listTransitions((styles, item, i) => (
              <animated.div style={styles}>
                <SampleElement
                  name={item.name}
                  key={item.name}
                  globalPlay={play}
                  globalPause={pause}
                  audioElement={data[item.id].audio}
                  data={data[item.id]}
                  index={item.id}
                  setConfirm={setConfirm}
                />
              </animated.div>
            ))
          : null}
      </section>

      {confirm.length > 0 && (
        <SampleConfirmButton
          globalPause={allPause}
          getSelectedSample={props.getSelectedSample}
          changeStage={props.changeStage}
          data={data}
          confirmed={confirm}
        />
      )}
    </animated.div>
  );
}
export default Sample;
