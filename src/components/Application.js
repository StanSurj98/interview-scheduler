import React, { useState } from "react";
import "components/Application.scss";
import DayList from "./DayList";

// Temp Mock Data
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  // Destructuring the state and setState from useState hook, default day selected "Monday"
  const [day, setDay] = useState("Monday");
  // We declare state up here in App.js because later on other components need it as well


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            // Changed the name of this prop to make more sense WHY we passed it down
            value={day}
            // since we're passing to <ul> component, we need value and onChange anyways
            onChange={setDay}
            // !! REMEMBER !! -> these aren't the KEYWORDS "value" and "onChange" event, these are just our props name following the HTML convention!!
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
