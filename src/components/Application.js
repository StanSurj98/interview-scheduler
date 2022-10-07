import React, { useState, useEffect } from "react";
import axios from "axios";
// Styles
import "components/Application.scss";
// Components
import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment";



// Temp interview data
const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};


export default function Application(props) {
  const [day, setDay] = useState("Monday")
  const [days, setDays] = useState([]);


  // Axios GET to /api/days ONLY once on initial render (dep: [])
  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`)
      .then(response => {
        console.log(response);
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
        {aptComponents}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
