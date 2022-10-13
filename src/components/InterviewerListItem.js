import React from "react";
import "components/InterviewerListItem.scss";
// Library for managing class names
import classNames from "classnames"; 

export default function InterviewerListItem(props) {
  // Conditionally adds classes if interviewer was selected
  const interviewerClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected,
  });

  return (
    <li 
    className={interviewerClass}
    onClick={props.setInterviewer}>
      <img 
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
      />
      {/* Only display full name when selected */}
      {props.selected && props.name}
    </li>
  );
};