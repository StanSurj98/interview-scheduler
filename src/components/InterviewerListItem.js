import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames"; // Library for classnames management

export default function InterviewerListItem(props) {
  // Conditionally adding classes if props.selected is truthy
  const interviewerClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected,
  });

  return (
    <li 
    className={interviewerClass}
    // with the recent change, onClick, we already have a func definition for setInterviewer
    onClick={props.setInterviewer}>
      <img 
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
      />
      {/* conditionally display name ONLY if props.selected is truthy */}
      {props.selected && props.name}
    </li>
  );
};