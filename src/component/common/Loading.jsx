// Loading.js
import React from "react";
import { Oval } from "react-loader-spinner";
import "../../style/loading.css";

function Loading() {
  return (
    <div className="loading">
      <Oval color="#ff0000" height={200} width={200} />
    </div>
  );
}

export default Loading;
