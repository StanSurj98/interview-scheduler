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
    // whereas interview.student is a string primitive, so this is ref by VALUE already
    student: interview.student,
    // Passing interviewer OBJECT by VALUE, that's why we use spread to make copy
    interviewer: {...interviewerObj}
  }

};

export const getInterviewersForDay = (state, dayArg) => {
  // Find the correct day
  const day = state.days.find(d => d.name === dayArg)
  if (!day) return [];
  
  const result = [];

  // In the correct day, loop through the ids of interviewers array
  // console.log(day.interviewers);
  for (const id of day.interviewers) {
    // for each id, push into our array the interviewer object
    result.push(state.interviewers[id]);
  }

  return result;

};