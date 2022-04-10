import styles from "./AudioPlayer.module.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { HiVolumeUp } from "react-icons/hi";
import React, { Component } from "react";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 0,
      curTime: 0,
      curVol: 0.5,
      isLoop: true,
    };
    this.playPause = this.playPause.bind(this);
  }
  
  componentDidMount() {
    // Sets up audio player
    this.slider.value = 0;
    this.currentTimeInterval = null;

    this.props.audio.current.onloadedmetadata = function () {
      // Sets duration
      this.setDuration();

      // Sets volume
      this.props.audio.current.volume = this.state.curVol;
      this.Vslider.style.setProperty(
        "--seek-before-width",
        `${(this.Vslider.value / 1) * 100}%`
      );
    }.bind(this);

    // Sync slider position
    if (this.props.audio.current.readyState === 4) {
      this.props.audio.current.onplay = () => {
        this.currentTimeInterval = setInterval(() => {
          this.slider.value = this.props.audio.current.currentTime;
          this.setState({ curTime: this.props.audio.current.currentTime });

          this.slider.style.setProperty(
            "--seek-before-width",
            `${(this.slider.value / this.state.duration) * 100}%`
          );
        }, 500);
      };

      this.props.audio.current.onpause = () => {
        clearInterval(this.currentTimeInterval);
      };

      this.Vslider.onchange = (e) => {
        this.props.audio.current.volume = e.target.value;
        this.Vslider.style.setProperty(
          "--seek-before-width",
          `${(this.Vslider.value / 1) * 100}%`
        );
      };

      this.slider.onchange = (e) => {
        clearInterval(this.currentTimeInterval);
        this.props.audio.current.currentTime = e.target.value;

        this.setState({ curTime: this.props.audio.current.currentTime });

        this.slider.style.setProperty(
          "--seek-before-width",
          `${(this.slider.value / this.state.duration) * 100}%`
        );
      };
    }
  }

  changeRange = () => {
    this.props.audio.current.currentTime = this.slider.value;
    this.slider.style.setProperty(
      "--seek-before-width",
      `${(this.slider.value / this.state.duration) * 100}%`
    );
  };

  // Round time to match minutes:seconds
  calcTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  // Helper functions
  setDuration = () => {
    this.setState({ duration: this.props.audio.current.duration });
  };

  setCurTime = () => {
    this.setState({ curTime: this.props.audio.current.currentTime });
  };

  changeVolume = () => {
    this.props.audio.current.volume = this.Vslider.value;
    this.Vslider.style.setProperty(
      "--seek-before-width",
      `${(this.Vslider.value / 1) * 100}%`
    );
  };

  changeProgressBar = () => {
    this.props.audio.current.currentTime = this.slider.value;
    this.setState({ curTime: this.props.audio.current.currentTime });

    if (this.props.audio.current.currentTime === 0) {
      this.slider.style.setProperty(
        "--knobby-width",
        `${5}px`
      );
    }

    // Change current time text & slider CSS every 0.5s
    this.currentTimeInterval = setInterval(() => {
      if (this.props.audio.current != null) {
        this.slider.value = this.props.audio.current.currentTime;
        this.slider.style.setProperty(
          "--seek-before-width",
          `${(this.slider.value / this.state.duration) * 100}%`
        );
        this.setCurTime();
        if (this.props.audio.current.currentTime === this.state.duration && this.props.audio.current.loop === false) {
          this.slider.style.setProperty(
            "--seek-before-width",
            `${(100)}%`
          );
          if (this.props.isPlaying === true) {
            this.props.audio.current.pause();
          } else {
            this.slider.value = 0;
            this.props.audio.current.currentTime = 0;
            this.setState({ curTime: this.props.audio.current.currentTime });
          }
        }
      }
      if (this.props.audio.current === null) {
      
      }
    }, 500);
  };

  toggleLoop = () => {
    this.setState({ isLoop: !this.state.isLoop });
    if (this.state.isLoop) {
      this.props.audio.current.loop = false;
    } else {
      this.props.audio.current.loop = true;
    }
  };

  playPause() {
      this.props.playSound();
      if (!this.props.isPlaying) {
        this.changeProgressBar();
      }
  }

  render() {
    return (
      <div>

        <div className={styles.wrapper}>
          <div className={styles.audioPlayer}>
            {/* Controls */}
            <div className={styles.controls}>
              {/* Mid Controls */}
              <div className={styles.midcontrols}>
                {/* Loop Button */}
                <button onClick={this.toggleLoop} className={styles.loop}>
                  {this.state.isLoop ? (
                    <FaRedoAlt />
                  ) : (
                    <FaRedoAlt className={styles.notLoop} />
                  )}
                </button>
                {/* Play/Pause Button */}
                <button onClick={this.playPause} className={styles.playPause}>
                  {this.props.isPlaying ? (
                    <FaPause className={styles.pause} />
                  ) : (
                    <FaPlay className={styles.play} />
                  )}
                </button>
              </div>
              {/* Change volume */}
              <div className={styles.volume}>
                <HiVolumeUp className={styles.volIcon} />
                <input
                  type="range"
                  defaultValue="0.5"
                  step="0.1"
                  max="1"
                  min="0"
                  className={styles.progressBar}
                  ref={(Vslider) => {
                    this.Vslider = Vslider;
                  }}
                  onChange={this.changeVolume}
                ></input>
              </div>
            </div>

            <div className={styles.audioVisual}>
              <div className={styles.currentTime}>
                {this.calcTime(this.state.curTime)}
              </div>

              <input
                type="range"
                className={styles.progressBar}
                min="0"
                max={this.state.duration}
                ref={(slider) => {
                  this.slider = slider;
                }}
                onChange={this.changeProgressBar}
              ></input>

              <div className={styles.duration}>
                {this.calcTime(this.state.duration)}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AudioPlayer;
