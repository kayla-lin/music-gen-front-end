import React, { Component } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = { clicked: false };

  handleHome = () => {
    this.props.changeStage("", "landing");
  };

  // Set click to opposite for hamburger menu
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  // Other menu items code still here, hidden with CSS, if remove might mess up CSS rn
  render() {
    return (
      <div>
        <nav className={styles.NavbarItems}>
          <Link to="/music-gen-front-end">
            <h1
              onClick={this.handleHome}
              href="/"
              className={`${styles.navbarLogo} ${styles.hoverUnderlineAnimation}`}
            >
              Music Gen
            </h1>
          </Link>
          <Link to="/music-gen-front-end/about">
            <button className={styles.about}>About</button>
          </Link>
        </nav>
      </div>
    );
  }
}

export default Navbar;
