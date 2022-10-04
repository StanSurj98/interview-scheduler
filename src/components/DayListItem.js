import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  // Using classNames lib for conditional class application
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected, // if truthy, add this modifier class
    "day-list__item--full": props.spots === 0 // if truthy, add this modifier class
  });

  return (
    <li 
    onClick={() => props.setDay(props.name)}
    className={dayClass}
    >
      <h2 
      className="text--regular" 
      >
        {props.name}
      </h2>
      <h3 className="text--light" >{props.spots} spots remaining</h3>
    </li>
  );
}