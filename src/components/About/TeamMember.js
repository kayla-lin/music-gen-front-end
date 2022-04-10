import styles from "./TeamMember.module.css";
import demoImage from "../../assets/images/team/demoimage.png";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";

const TeamMember = (props) => {
  return (
    <div>
      <div className={styles.member}>
        <div className={styles.imgGradient}>
          <img src={require('../../assets/images/team/' + `${props.info.img}`).default} className={styles.image}></img>
        </div>
      </div>
      <div className={styles.desc}>
        <h3 className={styles.person}>
          {props.info.name}
          <div className={styles.links}>
            <AiFillLinkedin onClick={()=> window.open(props.info.linkedin, "_blank")}/>
            <AiFillGithub onClick={()=> window.open(props.info.github, "_blank")}/>
          </div>
        </h3>
        <p>{props.info.role}</p>
      </div>
    </div>
  );
};
export default TeamMember;
