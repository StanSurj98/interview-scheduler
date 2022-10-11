import React from "react";
// Styles
import "components/Application.scss";
// Components
import DayList from "./DayList";
import Appointment from "components/Appointment";
// import "components/Appointment";
// Helpers
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData"

export default function Application(props) {
  //
  // ----- States and State Functions -----
  //
  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();


  // Find all appointments for the current "day" state
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // All interviewers for day, to select pictures during <Form /> entry
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  

  // Mapping each <Appointment /> from dailyAppointments array of apt. objs.
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
        cancelInterview={cancelInterview}
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
            // Making sure we pass down the state object data
            days={state.days}
            value={state.day}
            // setDay for selecting <DayListItem /> and change day state up here
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
        {/* Populate the daily schedules with each <Appointment /> */}
        {schedule}
        {/* Hard code the last appointment slot that is always unavailable */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
