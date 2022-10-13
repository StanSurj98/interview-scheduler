import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
// Library for Props type assertion
import PropTypes from "prop-types";


const InterviewerList = (props) => {
  // From array of interviewers, map each interviewer component
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
      key={interviewer.id} 
      name={interviewer.name} 
      avatar={interviewer.avatar}
      selected={props.value === interviewer.id}
      setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      {/* Renders list of interviewers */}
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
};

// Creating a type check for the props.interviewers passed to <InterviewerList />
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};


export default InterviewerList;