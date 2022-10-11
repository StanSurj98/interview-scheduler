import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
// Testing out PropTypes library
import PropTypes from "prop-types";


const InterviewerList = (props) => {
  // <InterviewerList /> receives interviewers:array, setInterviewer:func, interviewer:num
  // interviewer:num is the currently selected interviewer (it's our state)
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
      key={interviewer.id} 
      name={interviewer.name} 
      avatar={interviewer.avatar}
      // just changed name to value since last git commit
      selected={props.value === interviewer.id}
      // also changed to onChange here
      setInterviewer={() => props.onChange(interviewer.id)}
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

// Creating a type check for the props.interviewers passed to <InterviewerList />
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

// We can use prop-types as a baby TypeScript-ish library to assert types and avoid errors earlier

export default InterviewerList;