import AudioSpectrum from "react-audio-spectrum";
const Visuals = (props) => {
  return (
    <AudioSpectrum
      id={props.name}
      height={35}
      width={250}
      audioEle={props.audioelement}
      capColor={"#d45cff"}
      capHeight={0}
      meterWidth={2}
      meterCount={1024}
      meterColor={[
        { stop: 0, color: "#d45cff" },
        { stop: 0.3, color: "#d45cff" },
        { stop: 0.5, color: "white" },
        { stop: 1, color: "white" },
      ]}
      gap={2}
    />
  );
};
export default Visuals;
