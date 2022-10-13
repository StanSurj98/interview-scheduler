export const getAppointmentsForDay = (state, dayArg) => {
  const results = [];

  // 1. find matching day
  const day = state.days.find((d) => d.name === dayArg);
  if (!day) return [];

  // 2. iterate through day's appointment id's
  for (const id of day.appointments) {
    // 3. for each id, get appointment object
    const appointment = state.appointments[id];
    // 4. add to our array of appointments
    results.push(appointment);
  }
  return results;
};

export const getInterview = (state, interview) => {
  if (!interview) return null;

  // 1. look at interviewer id
  const id = interview.interviewer;
  // 2. find the interviewer with id
  const interviewerObj = state.interviewers[id];
  // 3. return an object with student and interviewer
  return {
    student: interview.student,
    interviewer: { ...interviewerObj },
  };
};

export const getInterviewersForDay = (state, dayArg) => {
  const result = [];

  const day = state.days.find((d) => d.name === dayArg);
  if (!day) return [];

  // 1. Loop through interviewer id's for day
  for (const id of day.interviewers) {
    // 2. Add to array of interviewers
    result.push(state.interviewers[id]);
  }

  return result;
};