import React from "react";

const AlphaBanner = () => {
  return (
    <div
      role="alert"
      className="sticky top-0 w-f h-8 bg-secondary  text-center align-middle py-1"
    >
      <p className=" font-medium text-white">
        ⚠ this is <em className=" text-sm">V0.0.1</em> -{" "}
        <span className=" underline decoration-double decoration-red-500">
          not
        </span>{" "}
        to to be used in production
      </p>
    </div>
  );
};

export default AlphaBanner;
