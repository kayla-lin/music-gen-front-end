import LoadingAnimation from "./LoadingAnimation";
import styles from "./Loading.module.css";
import React, { useEffect } from "react";

/* Time for loading screen */
const TIME = 3000;

const Loading = (props) => {
    useEffect(()=>{
        const handler = setTimeout(()=> {
            props.changeStage("play");
        }, TIME);

        return () => {
            clearTimeout(handler);
        };
    }, []);
  return (    
    <div className={styles.wrapper}>
        <LoadingAnimation className={styles.animation}/>
    </div>
  );
};
export default Loading;
