import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  // We need a blank default if no student props passed down, AKA we're entering our name into the form for the first time
  // HOWEVER - if we're EDITING our form, we want the existing value to be props.student
  const [student, setStudent] = useState(props.student || "");
  // My DEFAULT is props.{student/interviewer} if truthy or ""/null 
  const [interviewer, setInterviewer] = useState(props.interviewer || null);


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            // Value of the form input is the student state
            value={student}
            // this onChange allow us to see irl the effects of typing, re-renders each char
            onChange={(e) => setStudent(e.target.value)}
          />
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
          {/* code goes inside the <Button > */}
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
};