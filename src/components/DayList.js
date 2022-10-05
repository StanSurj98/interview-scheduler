import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // props.days will be an array containing all the info we need to fill in a <DayListItem />
  // We must map the array, creating a <DayListItem /> component for each day
  const dayListItems = props.days.map((day) => {
    return(
      <DayListItem 
        // When doing this we MUST supply a unique "key" to each item, must be named "key"
        key={day.id}
        // Keep in mind each "day.something" is the day object from days array
        name={day.name}
        spots={day.spots}
        // Just changed the names below from previous git commit, to value and onChange
        selected={day.name === props.value}
        setDay={props.onChange} 
      />
    );
  });



  return (
    <ul>
      {dayListItems}
    </ul>
  );
}