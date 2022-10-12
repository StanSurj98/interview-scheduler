import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);








it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  // Using Async Await to do this function test now
  await waitForElement(() => getByText("Monday"));
  // Notice how we don't need a .then() anymore
  fireEvent.click(getByText("Tuesday"));
  expect(getByText("Leopold Silvers")).toBeInTheDocument();
  // Accomplishes the same thing still, wait for a DOM Node with "Monday", then execute click event on DOM node with "Tuesday" and then expect the name to show up somewhere on the page
});
