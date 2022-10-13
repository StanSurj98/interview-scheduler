import { useState, useEffect } from "react";
import axios from "axios";

//
// ----- Custom Hook for Managing State -----
//
const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //
  // ----- Axios & API useEffect-----
  //

  // Axios GET's for initial render
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
      .then((response) => {
        const days = response[0].data;
        const appointments = response[1].data;
        const interviewers = response[2].data;
        // Updates states with DB response
        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      })
      .catch((error) => {
        console.log(
          "There was an error fetching days, apts or interviewers: \n",
          error
        );
      });
  }, []);

  //
  // ----- Functions for Updating or Setting States -----
  //

  // Updates to the selected day in <DayList />
  const setDay = (day) => setState({ ...state, day });

  // Accepts the updated appointments during booking/cancelling interviews
  const updateSpots = (stateAppointments) => {
    const currentDay = state.days.find((day) => day.name === state.day);

    // Finds all null interview slots for day, updates spots remaining
    const nullInterviews = currentDay.appointments.filter((id) => {
      return stateAppointments[id].interview === null;
    });
    currentDay.spots = nullInterviews.length;

    // Update the entire days state to reflect new spots
    const days = [...state.days].map((day) => {
      if (day.name === state.day) {
        return currentDay;
      } else {
        return day;
      }
    });

    setState((prev) => ({ ...prev, days }));
  };

  // Updates an appointment with new interview object from <Form /> entry
  const bookInterview = (id, interview) => {
    // Updating nested objects must be incremental from lowest sublevel interview
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Axios DB request for booking interview, on success updates appointments
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments });
      })
      .then(() => {
        updateSpots(appointments);
      });
    // Purposefully no .catch() here to allow <Appointment /> to render appropriate <Error /> if needed
  };


  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Axios DB request to delete appointments
    return axios
      .delete(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments });
      })
      .then(() => {
        updateSpots(appointments);
      });
  };

  // This hook returns all state management logic for App.js
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
