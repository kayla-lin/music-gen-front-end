import React, { useEffect, useRef, useState } from "react";
import songFile from "../../assets/music/samples/sample1.mp3";
import styles from "./Visualizer.module.css";
import AudioPlayer from "./AudioPlayer";
import { useSpring, animated, config } from "react-spring";

const Visualizer = () => {
  const [play, setPlay] = useState(false);
  const [createdAC, setAC] = useState(false);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  let audioSource;
  let analyser;
  let ctx;
  let bufferLength;
  let dataArray;
  let barWidth;
  let barHeight;
  let x;
  let audioCtx = null;
  let rafId;

  const fadeStyles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
  });

  useEffect(() => {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    ctx = canvasRef.current.getContext("2d");

    return () => {
      cancelAnimationFrame(rafId);
      if (createdAC) {
        // analyser.disconnect();
        // audioSource.disconnect();
      }
    };
  }, []);

  const animate = () => {
    if (canvasRef.current != null && ctx != null) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      analyser.getByteFrequencyData(dataArray);
      x = 0;
      drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
      rafId = requestAnimationFrame(animate);
    }
  };

  const createAudioContext = () => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioRef.current.src = songFile;

    audioSource = audioCtx.createMediaElementSource(audioRef.current);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 2048;
    bufferLength = analyser.frequencyBinCount; // Always half of fftSize
    dataArray = new Uint8Array(bufferLength);
    barWidth = 5;
    x = 0;
  };

  const playSound = () => {
    if (!createdAC) {
      createAudioContext();
      //rafId = requestAnimationFrame(animate);
      audioRef.current.pause();
      setAC(true);
    }
    if (!play) {
      audioRef.current.play();
      rafId = requestAnimationFrame(animate);
    } else if (play) {
      audioRef.current.pause();
      cancelAnimationFrame(rafId);
    }
    setPlay(!play);
  };

  const drawVisualizer = (bufferLength, x, barWidth, barHeight, dataArray) => {
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 0.5;
      ctx.save();
      ctx.translate(canvasRef.current.width / 2, canvasRef.current.height / 2);
      ctx.rotate(i * 5);
      
      const red = 212 + barHeight;
      const green = 92 + barHeight;
      const blue = 255 + barHeight;
      ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + ")";

      ctx.beginPath();
      // ctx.arc(1, barHeight / 2, 10, 0, Math.PI * 2);
      ctx.arc(barHeight * 2, barHeight * 1.5, barHeight / 30, 0, Math.PI * 2);
      //ctx.fillRect(0, barHeight * 1.5, 1, barHeight * 1.5);
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(212, 92, 255, 1)";
      ctx.fill();

      //ctx.fillRect(0, 0, barWidth, barHeight);
      x += barWidth;
      ctx.restore();
    }
  };

  return (
    <animated.div style={fadeStyles}>
      <audio className={styles.play} ref={audioRef} src={songFile} />
      <div className={styles.container}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
      <AudioPlayer audio={audioRef} playSound={playSound} isPlaying={play} />
    </animated.div>
  );
};

export default Visualizer;
