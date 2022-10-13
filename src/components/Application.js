import React from "react";
// Styles
import "components/Application.scss";
// Components
import DayList from "./DayList";
import Appointment from "components/Appointment";
// Helpers
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";
// Custom Hooks
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  //
  // ----- States and State Functions -----
  //
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // Maps each <Appointment /> components
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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Renders list of <Appointment /> */}
        {schedule}
        {/* Hard code last appointment slot, always unavailable */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
