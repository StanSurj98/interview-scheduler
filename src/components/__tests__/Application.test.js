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
  queryAllByTestId,
  queryByAltText,
} from "@testing-library/react";

import axios from "axios";

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


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    // wait for init render until the archie appointment appears on screen
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // access this specific appointment <Show /> component
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen"
    ));

    // click on delete for that particular appointment
    fireEvent.click(queryByAltText(appointment, "Delete"));
    
    // expect that the confim box shows up
    expect(getByText(appointment, /do you want to delete*/i)).toBeInTheDocument();

    // click confirm button which will trigger axios, update our mock for delete
    fireEvent.click(queryByText(appointment, "Confirm"));

    // we should now see a DELETING mode, checking for "Deleting interview..."
    expect(getByText(appointment, /deleting interview.../i)).toBeInTheDocument();

    // await that delete is successful, see our plus button / empty apt
    await waitForElement(() => getByAltText(appointment, "Add"));
    
    // need to now look to see for 2 spots remaining in <DayList /> for "Monday"
    const day = getAllByTestId(container, "day").find( day => queryByText(day, "Monday"));
    expect(queryByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const {container, debug} = render(<Application />);
    // wait for interview appointment to show
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // click edit button
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));
    // expect the form to show up 
    expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();
    // update form value
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i),
    { target: { value: "Lydia Miller-Jones" } });
    // click save
    fireEvent.click(getByText(appointment, /save/i));
    // check for saving mode pop up
    expect(queryByText(appointment, /booking interview.../i)).toBeInTheDocument();
    // check to see appointment is still there with new name
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    // check that monday still has same spots remaining
    const monday = getAllByTestId(container, "day").find(
      day => queryByText(day, "Monday")
    );
    expect(getByText(monday, /1 spot remaining/i)).toBeInTheDocument();
    // debug()
  });


  it("shows the save error when failing to save an appointment", async () => {

    // same as prev tests, except axios fails once here
    const {container, debug} = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // empty first slot
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(
      getByPlaceholderText(appointment, /enter student name/i),
      { target: { value: "Lydia Miller-Jones" } }
    );

    fireEvent.click(getByAltText(appointment, /sylvia palmer/i));

    // this just reverses the resolved promise form our mock to a reject once
    axios.put.mockRejectedValueOnce();
    // try to submit save, but should error out
    fireEvent.click(getByText(appointment, /save/i));
    
    // await the error promise as usual
    await waitForElement(() => getByText(appointment, "Error"))

    // check the x button goes back to appointment form 
    fireEvent.click(queryByAltText(container, "Close"));

    // check that we see the empty form again
    expect(
      getByPlaceholderText(appointment, /enter student name/i)
    ).toBeInTheDocument();
  });


  it("shows the delete error when failing to delete an existing appointment", async () => {
    const {container, debug} = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, /do you want to delete*/i)).toBeInTheDocument();
    
    // mock delete error
    axios.delete.mockRejectedValueOnce();
 
    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, /deleting interview.../i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Error"))
    fireEvent.click(queryByAltText(container, "Close"));

    expect(appointment).toBeInTheDocument();
  });

});
