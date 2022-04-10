import React, { useState, useReducer } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainSelection from "./components/MainSelection/MainSelection";

const initialState = { stage: "landing" };
const stageReducer = (state, action) => {
  switch (action) {
    case "landing":
      return { stage: "landing" };
    case "genre":
      /* Genre -> landing */
      if (state.stage === "genre") {
        return initialState;
      } else {
        /* Landing -> genre */
        return { stage: "genre" };
      }
    case "sample":
      /* Genre -> sample */
      if (state.stage === "genre") {
        return { stage: "sample" };
      }
      /* Sample -> genre */
      if (state.stage === "sample") {
        return { stage: "genre" };
      }
      break;
    case "loading":
      /* Sample -> loading */
      if (state.stage === "sample") {
        return { stage: "loading" };
      }
      /* Landing -> loading */
      if (state.stage === "landing") {
        return { stage: "loading" };
      }
      /* Loading -> sample */
      if (state.stage === "loading") {
        return { stage: "sample" };
      }
      break;
    case "play":
      /* Loading -> play  */
      if (state.stage === "loading") {
        return { stage: "play" };
      }
      /* Play -> sample */
      if (state.stage === "play") {
        return { stage: "sample" };
      }
      break;
    default:
      return { stage: "landing" };
  }
};

const App = () => {
  const [stage, dispatchStage] = useReducer(stageReducer, initialState);

  const [input, setInput] = useState({ genre: "", name: "" });
  const [usedMidi, setUsedMidi] = useState(false);

  const clearInputHandler = () => {
    console.log("Clear!");
    setInput({
      genre: "",
      name: ""
    });
    console.log(input);
  };

  const onGenreSelection = (user) => {
    console.log("GENRE SELECTED");
    setInput({
      ...input,
      genre: user,
    });
    console.log(input);
  };

  const onSampleSelection = (user) => {
    console.log("SAMPLE SELECTED");
    setInput({
      ...input,
      name: user,
    });
    console.log(input);
  };

  return (
    <Router>
      <div className="App">
        <Navbar changeStage={dispatchStage} stage={stage.stage}/>
        <Switch>
          <Route path="/" exact>
            <MainSelection
              userInput={input}
              setInput={setInput}
              onGenreSelection={onGenreSelection}
              onSampleSelection={onSampleSelection}
              clearInput={clearInputHandler} 
              changeStage={dispatchStage}
              stage={stage.stage}
              setUsedMidi={setUsedMidi}
              usedMidi={usedMidi}
            />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
