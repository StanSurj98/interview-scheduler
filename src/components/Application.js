import React, { useState, useEffect } from "react";
import axios from "axios";
// Styles
import "components/Application.scss";
// Components
import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment";
// Helpers
import getAppointmentsForDay from "../helpers/selectors";


export default function Application(props) {
  // 
  // ----- State and other Variables -----
  // 
  
  // Managing multiple states inside an object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, // this is going to break temporarily since we have our fake data above
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // 
  // ----- setState Functions -----
  // 

  // Creating new setDay function with the object above
  const setDay = day => setState({ ...state, day });
  // What this does, uses spread operator on state object, says:
  // "Give me all the properties of state, but update the one that matches day argument in this func"


  // 
  // ----- Axios & Side Effects-----
  // 

  // Axios GET to /api/days ONLY once on initial render (dep: [])
  useEffect(() => {
    // Using Promise.all([array of async axios calls]).then(resolve ALL).catch(ANY error)
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`)
    ])
    .then(response => {
      // console.log(response);
      // console.log("Days api response data: ", response[0].data);
      // console.log("Appointments api response data: ", response[1].data);
      // Making variables here that match the state variables up top
      const days = response[0].data;
      const appointments = response[1].data;
      // Setting state simultaneously, when ALL the promises resolved, to new days/apts 
      setState(prev => ({...prev, days, appointments}));
    })
    .catch(error => {console.log("There is an error: \n", error)});
  }, [])
  // Now with all our new appointments data, we can use our selector helper we built

  // 
  // ----- JSX -----
  // 

  // mapping <Appointment /> from dailyAppointments array of appointment objects returned by our selector helper
  const aptComponents =  dailyAppointments.map((appointment) => {
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
