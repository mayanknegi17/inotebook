import React from "react";

function PaddingTop({ length = 0 }) {
  return (
    <div
      style={{
        paddingTop: length,
        width: "100%",
      }}
    ></div>
  );
}

export default PaddingTop;
