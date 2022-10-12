import React from "react";

import {
  getByText,
  getAllByTestId,
  prettyDOM,
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application Tests", () => {
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Using Scoped queries for this test, we imported getBy... up there instead
    const { container } = render(<Application />);
    
    // Notice our queries are imported out of scope, must define WHICH container
    // Well, the container that is returned when we render <Application />
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));

    // Using testID to get ALL the appointments in the container
    const appointments = getAllByTestId(container, "appointment")
    // log will show us an ARRAY of appointment <articles> now
    // console.log(prettyDOM(appointments));

    // lets try to access ONE appointment in this array now
    // const appointment = getAllByTestId(container, "appointment")[0];
    const appointment = appointments[0];
    console.log(prettyDOM(appointment));





  });

  it("Changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    // Using Async Await to do this function test now
    await waitForElement(() => getByText("Monday"));
    // Notice how we don't need a .then() anymore
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    // Accomplishes the same thing still, wait for a DOM Node with "Monday", then execute click event on DOM node with "Tuesday" and then expect the name to show up somewhere on the page
  });
});
