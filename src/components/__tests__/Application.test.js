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

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Returns array of <Appointment /> <articles>, access first one
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // 1. click plus button, target alt text, in scope of first appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // 2. fill student form, target placeholder, update { target { value: } }
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // 3. pick an interviewer & submit form
    fireEvent.click(getByAltText(appointment, /sylvia palmer/i));
    fireEvent.click(getByText(appointment, /save/i));

    // 4. expect SAVING status indicator, on success shows interview appointment
    expect(getByText(appointment, /booking interview.../i)).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 5. Check that Monday has correct # of spots
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(queryByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 1. Finds correct appointment to delete
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 2. Expect confirmation component & confirms mock axios request
    expect(
      getByText(appointment, /do you want to delete*/i)
    ).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, "Confirm"));

    // 3. Status indicator, on success see empty slot with + button
    expect(
      getByText(appointment, /deleting interview.../i)
    ).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    // 4. Check for correct # of spots
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(queryByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 1. Find correct appointment to edit
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));
    
    // 2. Expect form, update values & save
    expect(
      getByPlaceholderText(appointment, /enter student name/i)
    ).toBeInTheDocument();
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    
    fireEvent.click(getByText(appointment, /save/i));
    
    // 3. Status indicator & on success check for correct appointment
    expect(
      queryByText(appointment, /booking interview.../i)
    ).toBeInTheDocument();
    
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    
    // 4. Check # of spots remain unchanged
    const monday = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(monday, /1 spot remaining/i)).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 1. Find the empty appointment slot and create a new one
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, /sylvia palmer/i));

    // 2. Ensures that mock axios replies with rejected promise, then try saving
    axios.put.mockRejectedValueOnce();

    fireEvent.click(getByText(appointment, /save/i));

    // 3. Check for error component and exit out to see empty slot again
    await waitForElement(() => getByText(appointment, "Error"));

    fireEvent.click(queryByAltText(container, "Close"));

    expect(
      getByPlaceholderText(appointment, /enter student name/i)
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(
      getByText(appointment, /do you want to delete*/i)
    ).toBeInTheDocument();

    axios.delete.mockRejectedValueOnce();

    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(
      getByText(appointment, /deleting interview.../i)
    ).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Error"));
    fireEvent.click(queryByAltText(container, "Close"));

    expect(appointment).toBeInTheDocument();
  });
});
