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
        // and the "props.day" is the day STATE passed from App.js in our props 
        selected={day.name === props.day} // it is selected when the props.day is its name
        setDay={props.setDay} 
      />
    );
  });



  return (
    <ul>
      {dayListItems}
    </ul>
  );
}