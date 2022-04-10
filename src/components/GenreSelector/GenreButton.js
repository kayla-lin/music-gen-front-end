import styles from "./Genre.module.css";
const GenreButton = (props) => {
  const onSelectedGenreHandler = () => {
    props.getSelectedGenre(props.name);
    props.changeStage("sample");
  };

  return (
    <button className={`${styles.square} ${props.class}`} onClick={onSelectedGenreHandler} onTouchMove={onSelectedGenreHandler}>
      <div className={styles.bottomRight}>{props.name}</div>
    </button>
  );
};
export default GenreButton;
