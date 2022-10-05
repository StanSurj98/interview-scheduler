import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {

  // <InterviewerList /> receives interviewers:array, setInterviewer:func, interviewer:num
  // interviewer:num is the currently selected interviewer (it's our state)
  const listInterviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
      key={interviewer.id} 
      name={interviewer.name} 
      avatar={interviewer.avatar}
      // I think i need to pass this twice, using it as key in array list AND just as id
      id={interviewer.id}
      // pass down "selected" prop, truthy WHEN THIS interviewer.id === props.interviewer(#)
      selected={props.interviewer === interviewer.id}
      // This func just passes down all the way to each item to be used on click
      setInterviewer={props.setInterviewer}
      />
    );
  });


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      {/* Want to render a list of <InterviewerListItem /> components */}
      <ul className="interviewers__list">{listInterviewers}</ul>
    </section>
  );
};