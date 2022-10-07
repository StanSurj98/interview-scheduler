const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};




export const getAppointmentsForDay = (stateObj, dayArg) => {
  // If days array is empty, return empty array
  if (stateObj.days.length === 0) return [];

  const appointmentIDs = [];

  // Need to find the object in state.days who's name matches the day argument
  for (const day of stateObj.days) {
    if (day.name !== dayArg) continue;
    if (day.name === dayArg) {
      // When the day name matches the given day, push into our empty array the array of appointment IDs for that day
      appointmentIDs.push(...day.appointments);
    }
  }


  const results = appointmentIDs.map((id) => {
    return stateObj.appointments[id];
  });

  return results;

  // Using .find() worked out with travis
  // let daysArray = state.days
  // let appointmentArray = [];
  // // if (daysArray.length === 0) return appointmentArray;

  // let dayTarget = daysArray.find((dayObject)=> {
  //   return dayObject.name === day
  // })
  // if (!dayTarget) return appointmentArray;
  // let daysAppointments = [...dayTarget.appointments]

  // appointmentArray = daysAppointments.map((appointmentID) => {
  //     return state.appointments[appointmentID];
  //   })

  //   return appointmentArray;
};

// console.log(`this is 55: `, getAppointmentsForDay(state, "Monday"));