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
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    
    // Note => queries imported outside this scope, must define WHICH container
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // testIDs, returns array of <Appointment /> <articles>
    const appointments = getAllByTestId(container, "appointment")

    // access specific node in array, check prev commit for other ways
    const appointment = appointments[0];

    
    // Next, the events to add and book an appointment
    
    // 1. click plus button, target alt text, in scope of first appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // 2. fill student form, target placeholder, !remember! { target { value: } }
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i),
    { target: { value: "Lydia Miller-Jones" } });

    // 3. click interviewer
    fireEvent.click(getByAltText(appointment, /sylvia palmer/i));

    // 4. submit the form to save
    fireEvent.click(getByText(appointment, /save/i));

    // 5. expect <Appointment /> shows SAVING mode, "Booking interview..."
    expect(getByText(appointment, /booking interview.../i)).toBeInTheDocument();

    // 6. on success, transitions to SHOW mode
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 7. in mock, monday has 1 spot, on success need to check that "Monday" <DayListItem /> shows 0 spots left
    
    // !! Note !! use queryBy..., because it's looping through the array
    const day = getAllByTestId(container, "day").find(day =>
      // don't want error if can't find on first iteration, need to keep looping
      queryByText(day, "Monday")
    );
    expect(queryByText(day, /no spots remaining/i)).toBeInTheDocument();


  });
});
