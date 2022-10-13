# Interview Scheduler

## Setup

Install dependencies with `npm install`. 

Start the Webpack Server with `npm start`. 

The application will be served at http://localhost:8000 and the proxy for our API server is port: 8001.

## Dependencies 
- axios v0.20.0
- react-scripts v3.4.4
- react & react-dom ^16.9.0
- classnames ^2.2.6
- normalize.css ^8.0.1


# Welcome To Interview Scheduler!
!["home page screenshot"](https://github.com/StanSurj98/interview-scheduler/blob/master/docs/Interview_Scheduler-homepage.png?raw=true)

A full stack application that allow users to create, edit and delete interview appointments. Built using React and styled with the Sass library for the frontend, this application also performs HTTP requests via Axios to our API server.

On the backend, Interview Scheduler uses PostgresQL as a relational database for user appointments.

Additionally, this application tested isolated components in Storybook, utilized Jest in unit and integration testing and Cypress as the final end to end testing framework.

## Booking Appointments

!["form screenshot"](https://github.com/StanSurj98/interview-scheduler/blob/master/docs/Interview_Scheduler-form.png?raw=true)

Select which day you would like to book the appointments for, the number of available spots are present in the navigation bar under each day.

When clicking the `+` icon on an empty time-slot, users are prompted with an input form. Fill in your student name and select one of the available interviewers for the day.

!["saving screenshot"](https://github.com/StanSurj98/interview-scheduler/blob/master/docs/Interview_Scheduler-saving.png?raw=true)

Clicking on save will render a quick status indicator for creating your appointment. 


!["saved interview screenshot"](https://github.com/StanSurj98/interview-scheduler/blob/master/docs/Interview_Scheduler-saved.png?raw=true)

Following a short wait, your interview is all booked in the schedule!

## Cancelling Appointments

!["hovering saved interview"](https://github.com/StanSurj98/interview-scheduler/blob/master/docs/Interview_Scheduler-hovering.png?raw=true)

Hovering over the appointment, users are able to edit or delete their appointments, editing will render the input form again. Whereas deleting will prompt you a confirmation window.

!["deletion confirmation"](https://github.com/StanSurj98/interview-scheduler/blob/master/docs/Interview_Scheduler-confirmation.png?raw=true)

Users may still cancel at this stage and return to the previous view. However, confirming will delete the user's appointment; after a short status indicator, users then see an empty interview slot.

## Error in Booking or Deleting

!["error prompt"](https://github.com/StanSurj98/interview-scheduler/blob/master/docs/Interview_Scheduler-error.png?raw=true)

Error prompts may pop up during an axios rejection. Users may exit by clicking on the `x` icon and return to the previous view.

#### Thank you for using Interview Scheduler!

