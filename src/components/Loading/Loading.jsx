import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ bubbles, black }) => (
  <ReactLoading type={bubbles} color={black} height={"70%"} width={"70%"} />
);

export default Loading;
