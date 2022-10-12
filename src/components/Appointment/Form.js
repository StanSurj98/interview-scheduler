import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  // student is the name on form, initial is blank OR existing from prev entry
  const [student, setStudent] = useState(props.student || "");
  // interviewer should null on initial form, otherwise the prev chosen person
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // error state for form validation, empty at start or pop up msg
  const [error, setError] = useState("")


  // when cancelling, also reset the form fields first before props.onCancel
  const cancel = () => { 
    setStudent("");
    setInterviewer(null);
    props.onCancel();
  }

  // 
  // ----- Validate Func -----
  // 

  const validate = () => {
    // Pops error on empty name input
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer")
      return;
    }
    
    // due to new bug from testing, need to clear previous errors if there was one, before saving valid form input
    setError("");
    // THEN run our old save function, aka the props.onSave passed down
    props.onSave(student, interviewer);
  }





  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
          autoComplete="off" 
          onSubmit={(e) => {e.preventDefault()}} // this prevents default submitting when someone presses Enter or Return
        >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            // Value of the form input is the student state
            value={student}
            // this onChange allow us to see irl the effects of typing, re-renders each char
            onChange={(e) => setStudent(e.target.value)}
            // adding this for Jest Testing purposes, trying out id
            data-testid="student-name-input" 
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList 
          // pass in the interviewers array so it can render each list item
          interviewers={props.interviewers}
          // pass in props of value to be the interviewer state in this form
          value={interviewer}
          // pass in props of onChange which is NOT keyword, but the setInterviewer useState
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};