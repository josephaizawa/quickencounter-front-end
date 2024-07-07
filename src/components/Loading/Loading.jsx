import React from "react";
import ReactLoading from "react-loading";
import "../Loading/Loading.scss";

const Loading = ({ bubbles, red }) => (
  <ReactLoading
    className="loading-animation"
    type={"bubbles"}
    color={"#6f1d1b"}
    height={100}
    width={100}
  />
);

export default Loading;
