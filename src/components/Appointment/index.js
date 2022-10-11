import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

// Constants for Modes that we will need
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";
const CREATE = "CREATE";

// We wrote this component inside the Appointment/ directory because it will have lots of child components later, and index.js is used to import easily as a default path
export default function Appointment(props) {
  // Using our useVisualMode custom hook - remember, mode is a state, on change we render
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY // determines the initial mode based on if props.interview truthy
  );


  // 
  // ----- Functions -----
  // 

  const save = (name, interviewer) => {
    
    const interview ={
      student: name,
      interviewer,
    };

    // Using the saving loader before the AXIOS req gets sent and returned ("Pessimistic" update)
    transition(SAVING);

    // Once our Axios PUT req finishes, we transition mode to SHOW and re-render 
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  }



  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* Conditional render on modes with useVisualMode */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      {mode === SAVING && <Status message={"Booking interview..."} />}
      {/* SHOW */} 
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer} 
        /> 
      )}
      {/* CREATE */}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onSave={save}
          onCancel={back}  
        />
      )}

    </article>
  );
};