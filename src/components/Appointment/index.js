import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import Error from "./Error";

// Constants for Modes that we will need
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

// We wrote this component inside the Appointment/ directory because it will have lots of child components later, and index.js is used to import easily as a default path
export default function Appointment(props) {
  // console.log("Props for Appointment: \n", props);


  // Using our useVisualMode custom hook - remember, mode is a state, on change we render
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY // determines the initial mode based on if props.interview truthy
  );


  // 
  // ----- Functions -----
  // 

  // Called by props.onSave in <Form />, receiving the student and interviewer
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
      .catch((e) => {
        console.log("An error occurred with Axios during saving");
        transition(ERROR_SAVE, true);
      })
  }

  const deleteInterview = () => {
    // creates the object to pass UP to our cancelInterview() in app.js with the name and interviewer for THIS appointment id
    const interview = {
      // which was made available as props to us in app.js when we rendered each appointment card
      student: props.interview.student,
      interviewer: props.interview.interviewer,
    }
    
    // For <Status /> Loading when confirming the deletion
    transition(DELETING, true);

    // Call on cancelInterview() UP in app.js parent, do an axios.delete and come back to us
    props.cancelInterview(props.id, interview)
      .then(() => {
        // if all goes well, return the mode === EMPTY
        transition(EMPTY);
      })
      .catch((e) => {
        console.log("Error at line 68 deleteInterview: ", e)
        transition(ERROR_DELETE, true)
      })
  }


  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time}/>

      {/* Conditional render on modes with useVisualMode */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }


      {/* SAVING */}
      {mode === SAVING && <Status message={"Booking interview..."} />}
      
      
      {/* SHOW */} 
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer} 
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        /> 
      )}
      
      
      {/* EDIT */}
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id} 
          onSave={save}
          onCancel={back}
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


      {/* CONFIRM DELETION */}
      {mode === CONFIRM && (
        <Confirm 
          message={"Do you want to delete your appointment?"} 
          onCancel={back} 
          onConfirm={deleteInterview} 
        />
      )}


      {/* DELETING Status */}
      {mode === DELETING && (
        <Status 
          message={"Deleting interview..."} 
        />
      )}

      {/* ERROR */}
      {mode === ERROR_SAVE && (
        <Error onClose={back} message={"There was an error during saving... sorry!"} />
      )}
      {mode === ERROR_DELETE && (
        <Error onClose={back} message={"There was an error during deletion"} />
      )}

    </article>
  );
};