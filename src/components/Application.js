import React, { useState, useEffect } from "react";
import axios from "axios";
// Styles
import "components/Application.scss";
// Components
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
// Helpers
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

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

  console.log("STATES AT APP.JS\n\n\n", state);

  //
  // ----- Axios & Side Effects-----
  //

  // Axios GET to /api/days ONLY once on initial render (dep: [])
  useEffect(() => {
    // Using Promise.all([array of async axios calls]).then(resolve ALL).catch(ANY error)
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
      .then((response) => {
        // Making variables here that match the state variables up top
        const days = response[0].data;
        const appointments = response[1].data;
        const interviewers = response[2].data;
        // Setting state simultaneously, when ALL the promises resolved, to new days/apts
        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      })
      .catch((error) => {
        console.log("There is an error: \n", error);
      });
  }, []);

  //
  // ----- setState Functions -----
  //

  // Update the state.day property to the day argument passed in this fn
  const setDay = (day) => setState({ ...state, day });

  // takes the current state object (which is updated with our axios requests) and for the current state.day (which is selected in DayList), format the appointments objects
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log(dailyAppointments);

  // interviewers for day to select from in <Form />
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // 
  // ----- State Update w/ PUT to API server -----
  // 

  // bookInterview - UPDATING appointment info with new interview object from <Form /> onSave()
  const bookInterview = (id, interview) => {
    // Start updating the STATE object from the lowest level upwards (since it's a nested object)
    const appointment = {
      ...state.appointments[id],
      // Lowest level is the new interview object from <Form /> onSave()
      interview: { ...interview },
    };

    // Moving up a level from appointment is the appointment(s) key for the state object
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };


    // Ultimately want to setState() here to update the overall STATE object but AFTER a PUT req
    // !! REMEMBER !! must wrap the data body in the form you need, in this case an object with key "interview" so we can just encapsulate it with {...} like this
    axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({...state, appointments})
      })
      .catch(e => console.log("error at line100 application.js", e));

  };

  // Mapping each <Appointment /> from dailyAppointments array of appointment objects returned by our selector helper
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
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
