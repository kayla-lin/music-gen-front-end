import styles from "./MainSelectionNav.module.css";
import { Fragment } from "react/cjs/react.production.min";
import MainSelectionNavBack from "./MainSelectionNavBack";
import { useSpring, animated, config } from "react-spring";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

const MainSelectionNav = (props) => {
  const isSample = props.stage === "sample" ? styles.current : styles.content;
  const isGenre = props.stage === "genre" ? styles.current : styles.content;
  const isLoading = props.stage === "loading" ? styles.current : styles.content;
  const isPlay =
    props.stage === "play" ? styles.downloadReady : styles.download;

  const [toggleView, setToggleView] = useState(false);

  const toggleViewHandler = () => {
    console.log("view toggled! " + toggleView);
    setToggleView(!toggleView);
  };

  const slideInStyles = useSpring({
    config: { ...config.stiff },

    to: {
      opacity: toggleView ? 1 : 0.6,
      height: toggleView ? 1 : 0.6,
      transform: toggleView
        ? "translate3d(0px, 0px, 0px)"
        : "translate3d(150px, 0px, 0px)",
    },
  });

  const fadeStyles = useSpring({
    config: { ...config.stiff },
    to: {
      opacity: toggleView ? 1 : 0,
    },
  });

  /* Navigation for sample selector */
  const sideNavigation = (
    <div className={styles.selection}>
      {toggleView ? (
        <IoClose className={styles.close} onClick={toggleViewHandler} />
      ) : (
        <BiDotsVerticalRounded
          className={styles.close}
          onClick={toggleViewHandler}
        />
      )}
      <animated.div style={fadeStyles}>
        <div className={`${isGenre}`}>
          <div className={styles.title}>
            <p>Genre</p>
          </div>
          {props.userInput.genre.length > 0 && (
            <div className={styles.input}>
              <p>{props.userInput.genre}</p>
            </div>
          )}
        </div>

        <div className={`${isSample}`}>
          <div className={styles.title}>
            <p>Sample</p>
          </div>
          {props.userInput.name.length > 0 && (
            <div className={styles.input}>
              <p>{props.userInput.name}</p>
            </div>
          )}
        </div>
        <div className={`${isLoading}`}>
          <div className={styles.title}>
            <p>Creating</p>
          </div>
        </div>
        <div className={styles.downloadWrapper}>
          <span className={`${isPlay}`}>Download</span>
        </div>
      </animated.div>
    </div>
  );

  const navigation = (
    <nav>
      {props.stage !== "landing" ? (
        <Fragment>
          <div className={styles.navItems}>{sideNavigation}</div>
        </Fragment>
      ) : (
        ""
      )}
    </nav>
  );


  return (
    <Fragment>
      {props.stage !== "landing" ? (
        <Fragment>
          {props.usedMidi === false && <MainSelectionNavBack
            changeStage={props.changeStage}
            stage={props.stage}
            audioData={props.audioData}
          />}
          <animated.div
            style={{
              ...slideInStyles,
              position: "fixed",
              right: "0",
              top: "33%",
              zIndex: "1000",
            }}
          >
            {navigation}
          </animated.div>
          
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};
export default MainSelectionNav;
