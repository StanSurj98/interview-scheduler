import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {

  // <InterviewerList /> receives interviewers:array, setInterviewer:func, interviewer:num
  // interviewer:num is the currently selected interviewer (it's our state)
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
      key={interviewer.id} 
      name={interviewer.name} 
      avatar={interviewer.avatar}
      // pass down "selected" prop, truthy WHEN THIS interviewer.id === props.interviewer(#)
      selected={props.interviewer === interviewer.id}
      // Another way to pass this function down and not have to pass id twice
      // now setInterviewer prop is just a func definition, takes w/e event happens
      setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    );
  });


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      {/* Want to render a list of <InterviewerListItem /> components */}
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
};