import Landing from "../Landing/Landing";
import Genre from "../GenreSelector/Genre";
import Sample from "../SampleSelector/Sample";
import Loading from "../Loading/Loading";
import Visualizer from "../MusicPlayer/Visualizer";
import Wrapper from "../UI/Wrapper";
import { Fragment } from "react";
/* Changes main page to different components based on stage */
const MainSelector = (props) => {
  return (
    <Fragment>
      {props.stage === "landing" ? (
        <Wrapper>
          <Landing
            clearInput={props.clearInput}
            changeStage={props.changeStage}
            setUsedMidi={props.setUsedMidi}
          />
        </Wrapper>
      ) : (
        ""
      )}

      {props.stage === "genre" ? (
        <Wrapper>
          <Genre
            changeStage={props.changeStage}
            getSelectedGenre={props.onGenreSelection}
          />
        </Wrapper>
      ) : (
        ""
      )}
      {props.stage === "sample" ? (
        <Wrapper>
          <Sample
            changeStage={props.changeStage}
            getSelectedSample={props.onSampleSelection}
            userInput={props.userInput}
            pauseAllHandler={props.pauseAllHandler}
          />
        </Wrapper>
      ) : (
        ""
      )}
      {props.stage === "loading" ? (
        <Wrapper>
          <Loading
            changeStage={props.changeStage}
            userInput={props.userInput}
          />
        </Wrapper>
      ) : (
        ""
      )}
      {props.stage === "play" ? <Visualizer changeStage={props.changeStage} /> : ""}
    </Fragment>
  );
};
export default MainSelector;
