import React, { useState, useEffect } from "react";
import axios from "axios";
// Styles
import "components/Application.scss";
// Components
import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment";



// Temp interview data
// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };


export default function Application(props) {
  // Managing multiple states inside an object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, // this is going to break temporarily since we have our fake data above
  });

  const dailyAppointments = [];

  // Creating new setDay function with the object above
  const setDay = day => setState({ ...state, day });
  // What this does, uses spread operator on state object, says:
  // "Give me all the properties of state, but update the one that matches day argument in this func"

  // Same with setDays
  const setDays = (days) => { 
    setState(prev => ({...prev, days}));
  };
  // Take the array of objects in "state" obj, which is under "days":[] and replace it with the func argument


  // Axios GET to /api/days ONLY once on initial render (dep: [])
  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`)
      .then(response => {
        console.log(response);
        // setDays affected from combining states into object
        setDays(response.data)
      })
      .catch(error => {console.log("There is an error: \n", error)});
  }, [])


  // mapping into <Appointment /> components from appointments object 
  const aptComponents =  Object.values(appointments).map((appointment) => {
    return (
      <Appointment 
        key={appointment.id}
        {...appointment}
      />
    );
  });


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
            // Now that we're managing states in an object, we make sure to update it
            days={state.days}
            value={state.day}
            // Even if setDay is called on a grandchild x10 component, it'll come all the way up here, look for that state object at the top of Application component
            // And executes the changes on this top level!
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {aptComponents}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
