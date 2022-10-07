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
    interviewers: {},
  });

  
  // 
  // ----- Axios & Side Effects-----
  // 

  // Axios GET to /api/days ONLY once on initial render (dep: [])
  useEffect(() => {
    // Using Promise.all([array of async axios calls]).then(resolve ALL).catch(ANY error)
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
    .then(response => {
      // console.log(response);
      // console.log("Days api response data: ", response[0].data);
      // console.log("Appointments api response data: ", response[1].data);
      // console.log("Interviewers data: ", response[2].data);


      // Making variables here that match the state variables up top
      const days = response[0].data;
      const appointments = response[1].data;
      const interviewers = response[2].data;
      // Setting state simultaneously, when ALL the promises resolved, to new days/apts 
      setState(prev => ({...prev, days, appointments, interviewers}));
    })
    .catch(error => {console.log("There is an error: \n", error)});
  }, [])


  // 
  // ----- setState Functions -----
  // 
  
  // Creating new setDay function for the object above
  // This says, update the state.day property to the day argument passed in this fn
  const setDay = day => setState({ ...state, day });


  


  // takes the current state object (which is updated with our axios requests) and for the current state.day (which is selected in DayList), format the appointments objects
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log(dailyAppointments);

  // mapping <Appointment /> from dailyAppointments array of appointment objects returned by our selector helper
  const schedule =  dailyAppointments.map((appointment) => {
    // const interview = getInterview(state, appointment.interview)

    return (
      <Appointment 
        key={appointment.id}
        {...appointment}
      />
    );
  });


  // 
  // ----- JSX Template -----
  // 

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
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
