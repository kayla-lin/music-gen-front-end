import MainSelector from "./MainSelector";
import MainSelectionNav from "./MainSelectionNav";
import { Fragment } from "react/cjs/react.production.min";
import { useState } from "react";

/*
 * Main page's component switches out based on the questionarie
 * User input life cycle stages: landing -> genre -> sample -> loading -> play
 */

const MainSelection = (props) => {
  /* Holds the audio objects from sample page to pause */
  const [data, setData] = useState([]);

  const pauseAllHandler = (audios) => {
    setData(audios);
    console.log("FROM HERE");
    console.log(data);
  };

  return (
    <Fragment>
      <MainSelectionNav
        stage={props.stage}
        changeStage={props.changeStage}
        userInput={props.userInput}
        setInput={props.setInput}
        audioData={data}
        usedMidi={props.usedMidi}
        setUsedMidi={props.setUsedMidi}
      />

      <MainSelector
        pauseAllHandler={pauseAllHandler}
        stage={props.stage}
        changeStage={props.changeStage}
        userInput={props.userInput}
        setInput={props.setInput}
        onGenreSelection={props.onGenreSelection}
        onSampleSelection={props.onSampleSelection}
        clearInput={props.clearInput}
        setUsedMidi={props.setUsedMidi}
      />
    </Fragment>
  );
};
export default MainSelection;
