import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

// We wrote this component inside the Appointment/ directory because it will have lots of child components later, and index.js is used to import easily as a default path
export default function Appointment(props) {
  
  return (
    <Fragment>
      <Header time={props.time}/>
      {/* Conditional render if props.interview truthy */}
      {props.interview ? 
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer } 
        /> : 
        <Empty />}

    </Fragment>
  );
};