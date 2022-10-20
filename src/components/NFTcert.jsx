import React from "react";

const NFTcert = (props) => {
  return (
    <div
      aria-label="container"
      className="bg-white flex flex-col space-y-2 rounded-2xl p-4 pt-10"
    >
      <img className="rounded-md" src={props.tokenURI} alt=" certificate" />
    </div>
  );
};

export default NFTcert;
