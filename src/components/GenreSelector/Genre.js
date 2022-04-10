import styles from "./Genre.module.css";
import GenreButton from "./GenreButton";
import { useState } from "react";
import { useSpring, useTransition, animated, config } from "react-spring";
import Wrapper from "../UI/Wrapper";
const data = [
  { name: "Classical", class: styles.classical },
  { name: "8-Bit", class: styles.bit },
  { name: "Lofi Hip-Hop", class: styles.lofi },
];

const Genre = (props) => {
  const [genres] = useState(data);
  const listTransitions = useTransition(genres, {
    config: config.default,
    from: { opacity: 0, transform: "translate3d(0px, 25%, 0px)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    leave: { opacity: 0, height: 0, transform: "translate3d(0px, -25%, 0px)" },
    trail: 50,
    keys: genres.map((item, index) => index),
  });

  const fadeStyles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
  });

  return (
    <Wrapper>
      <animated.div style={fadeStyles}>
        <div className={styles.pageWrapper}>
          <section className={styles.intro}>
            <h1 className={styles.header}>Genre</h1>
            <p>Let's start by choosing a genre your for song.</p>
          </section>
          <div className={styles.wrapper}>
            {listTransitions((styles, item) => (
              <animated.div style={styles}>
                <GenreButton
                  name={item.name}
                  class={item.class}
                  changeStage={props.changeStage}
                  getSelectedGenre={props.getSelectedGenre}
                />
              </animated.div>
            ))}
          </div>
        </div>
      </animated.div>
    </Wrapper>
  );
};

export default Genre;
