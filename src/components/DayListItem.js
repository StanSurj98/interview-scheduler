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

  // Helper func => allows for unique text at 0, 1 or N spot(s) remaining
  const formatSpots = () => {
    if (props.spots === 0) return "no spots remaining";
    if (props.spots === 1) return "1 spot remaining";
    return `${props.spots} spots remaining`
  }

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
      <h3 className="text--light" >{formatSpots()}</h3>
      {/* props.spots === 0 && <h3 className="text--light" >no spots remaining</h3> */}
      {/* props.spots === 1 && <h3 className="text--light" >1 spot remaining</h3> */}
      {/* props.spots > 1 && <h3 className="text--light" >{props.spots} spots remaining</h3> */}
    </li>
  );
}