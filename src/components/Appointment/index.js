import React from "react";
import "components/Appointment/styles.scss";

// We wrote this component inside the Appointment/ directory because it will have lots of child components later, and index.js is used to import easily as a default path
export default function Appointment(props) {
  
  return (
    <article className="appointment"></article>
  );
};