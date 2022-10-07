export const getAppointmentsForDay = (state, dayArg) => {
  // Refactored with help from Gary Jipp
  const results = [];
  // 1. find the day obj
  const day = state.days.find(d => d.name === dayArg)
  if (!day) return [];

  // 2. iterate thru that day's appointment ids (day.appoinments)
  for (const id of day.appointments) {
    // 3. for each id, get the ACTUAL appointment object
    const appointment = state.appointments[id]
    // 4. add to our list (array of appointment objects)
    results.push(appointment);
  }
  return results;

};

export const getInterview = (state, interview) => {
  // Edge: if no interview object, return null
  if (!interview) return null;
  // Interview is an object, {student: "string", interviewer: number (id)}
  // 1. look at interviewer id
  const id = interview.interviewer;
  // 2. find the interviewer object at that id
  const interviewerObj = state.interviewers[id]
  // 3. return an object with student and interviewer
  return {
    student: interview.student,
    interviewer: {...interviewerObj}
  }

};
