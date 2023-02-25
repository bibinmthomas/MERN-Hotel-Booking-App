import React from "react";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

const Loading = ({ size = 100 }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Button variant="primary" disabled>
          <CircularProgress />
          Loading...
        </Button>
      </div>
    </>
  );
};

export default Loading;
