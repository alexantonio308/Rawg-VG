import React from "react";
import Header from "../header";

export default function Home() {
  return (

    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      />
    </div>
  );
}