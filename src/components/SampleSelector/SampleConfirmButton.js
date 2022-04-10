import styles from "./SampleConfirmButton.module.css";
const SampleConfirmButton = (props) => {
  const confirmSample = () => {
    props.getSelectedSample(props.confirmed);
    props.globalPause();
    props.changeStage("loading");
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={confirmSample}>
        Confirm
      </button>
    </div>
  );
};
export default SampleConfirmButton;
