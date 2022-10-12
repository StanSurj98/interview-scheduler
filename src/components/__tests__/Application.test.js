import React from "react";

import {
  getByText,
  getAllByTestId,
  getByAltText,
  getByRole,
  queryByText,
  prettyDOM,
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByPlaceholderText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application Tests", () => {


  it("Changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    // Using Async Await to do this function test now
    await waitForElement(() => getByText("Monday"));
    // Notice how we don't need a .then() anymore
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    // Accomplishes the same thing still, wait for a DOM Node with "Monday", then execute click event on DOM node with "Tuesday" and then expect the name to show up somewhere on the page
  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Using Scoped queries for this test, we imported getBy... up there instead
    const { container, debug } = render(<Application />);
    
    // Notice our queries are imported out of scope, must define WHICH container
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // testIDs, get ALL appointments in container, returns array of <articles>
    const appointments = getAllByTestId(container, "appointment")

    // access a specific node in that array, check prev commit for other ways
    const appointment = appointments[0];

    // Next, the events to add and book an appointment
    
    // 1. click plus button, target alt text, in scope of first appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // 2. fill student form, target placeholder, remember { target { value: } }
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i),
    { target: { value: "Lydia Miller-Jones" } });

    // 3. click interviewer
    fireEvent.click(getByAltText(appointment, /sylvia palmer/i));

    // 4. submit the form to save
    fireEvent.click(getByText(appointment, /save/i));

    // 5. expect <Appointment /> shows our SAVING mode, "Booking interview..."
    expect(getByText(appointment, /booking interview.../i)).toBeInTheDocument();

    // 6. next check SHOW mode after saving done, ideally axios works
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // debug();

    // 7. in mock axios, monday has 1 spot, once we create the above, need to check the nav bar, that "Monday" <DayListItem /> shows 0 spots left
    
    // Remember => getAllByTestId returns array of all day items, .find(the day that has "Monday" as a text on the screen)
    const day = getAllByTestId(container, "day").find(day =>
      // !! MUST !! use queryBy... here, since it's looping through the array
      queryByText(day, "Monday")
      // if it doesn't find "Monday" on the first try, say it was "Tuesday", we don't want to just error the test, we want to keep going
    );
    expect(queryByText(day, /no spots remaining/i)).toBeInTheDocument();


  });
});
