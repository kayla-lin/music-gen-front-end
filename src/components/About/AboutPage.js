import styles from "./AboutPage.module.css";
import TeamMember from "./TeamMember";

const aboutInfo = [
  {
    name: "First Last",
    role: "Artifical Intelligence",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    img: "demoimage.png",
  },
  {
    name: "First Last",
    role: "Front-end",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    img: "demoimage.png",
  },
  {
    name: "First Last",
    role: "Back-end",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    img: "demoimage.png",
  },
  {
    name: "First Last",
    role: "Artifical Intelligence",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    img: "demoimage.png",
  },
];

const AboutPage = () => {
  return (
    <div className={styles.background}>
      <div className={styles.pageWrapper}>
        <section className={styles.intro}>
          <h1>About</h1>
            <section className={styles.info}>
              <h2>What is Music Gen?</h2>
              <p>
                Music Gen is a 2-semester long group project by the Google
                Student Developer Club.
              </p>
            </section>
            <section className={styles.info}>
              <h2>How does it work?</h2>
              <p>
                Music Gen is built upon adjusting and finetuning existing AI
                models. Music Gen uses models built from Magenta, which is
                Google's open sourced resource project exploring AI generated
                music and art.
              </p>
            </section>
        </section>

        <section className={styles.team}>
          <section className={styles.teamTitle}>
            <h2>Team</h2>
          </section>
          <div className={styles.memberWrapper}>
            <section className={styles.members}>
              {aboutInfo.map((info) => {
                return <TeamMember key={info.name} info={info} />;
              })}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};
export default AboutPage;
