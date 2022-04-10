import { BiArrowBack } from "react-icons/bi";
import styles from "./MainSelectionNavBack.module.css";

/* Back button for selection navigation */
const MainSelectionNavBack = (props) => {
  const changeStateBackwardsHandler = () => {
    
    if (props.stage === "sample") {
      props.audioData.map((sample) => {
        sample.audio.pause();
      });
    }
    props.changeStage(props.stage);
  };

  return (
    <BiArrowBack
      className={styles.navBack}
      onClick={changeStateBackwardsHandler}
    />
  );
};

export default MainSelectionNavBack;
