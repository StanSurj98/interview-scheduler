import {useState, useEffect} from "react";
import axios from "axios";

// 
// ----- Custom Hook for Managing State -----
// 
const useApplicationData = () => {
  // Managing multiple states inside an object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });


  //
  // ----- Axios & API useEffect-----
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
        console.log("There was an error fetching days, apts or interviewers: \n", error);
      });
  }, []);


  //
  // ----- Functions for Updating or Setting States -----
  //

  // Update the state.day property to the selected day in <DayList />
  const setDay = (day) => setState({ ...state, day });


  // Updates appointment info with new interview object from <Form /> entry
  const bookInterview = (id, interview) => {
    // spread syntax for nested objs require updating each sub level 1 by 1
    const appointment = {
      ...state.appointments[id],
      // lowest level to update first is the brand new interview obj created
      interview: { ...interview },
    };

    // up a level, need to update the appointments to include new appointment
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // But FIRST => request the DB to update the data via PUT/POST/PATCH, etc.
    return axios
      // !! REMEMBER !! must { encapsulate } the data body we are updating here
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        // ON SUCCESS => then setState our appointments with the changes above
        setState({ ...state, appointments });
      })
      // ALSO => purposefully left out the .catch() here for <Appointment /> level to render the correct <Error /> if there was one
  };

  // Deletes interview appointment, gets its interview object from <Appointment />
  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      // same as bookInterview, but we're nullifying the interview object
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`, { interview })
      .then(() => {
        console.log("Axios.delete is successful for this interview");
        // similarly, only on success we update the appointments with new null
        setState({ ...state, appointments });
      })
      // left out .catch() for <Appointment /> to handle if <Error /> needs shown
  };


  // ULTIMATELY => This hook returns all state management logic for App.js
  return {
    state, 
    setDay, 
    bookInterview, 
    cancelInterview
  }
};

export default useApplicationData;