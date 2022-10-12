import React from "react";
import { render, cleanup, prettyDOM, fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form Component", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];


  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      // remember that we will need to pass mock props still like normal code
      <Form interviewers={interviewers} />
    );

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });


  it("renders with initial student name", () => {
    const { container, getByTestId } = render(
      // remember that we're passing in the props from <Appointment /> so match those prop names that you initially passed in
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );

    // console.log(prettyDOM(container))

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });


  it("validates that the student name is not blank", () => {
    // 1. mock func
    const onSave = jest.fn();

    // 2. pass req props, this case, null interviewer && student, sim empty form
    const { getByText } = render(
      <Form 
        interviewers={interviewers} 
        onSave={onSave} 
      />
    )
    // 3, simulate the click event on the save button
    fireEvent.click(getByText("Save"));
    
    
    // Expectations
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  

  it("validates that the interviewer cannot be null", () => {
    // 1. mock func
    const onSave = jest.fn();
    
    // 2. pass req props, this case, no interviewer simulate not choosing one
    const { getByText } = render(
      <Form 
        interviewers={interviewers} 
        student="Lydia Miller-Jones" 
        onSave={onSave} 
      />
    )
    // 3, simulate the click event on the save button
    fireEvent.click(getByText("Save"));

    // Expectations
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  

  // This test replaces the two tests it overlaps with previously 
  it("can successfully save after trying to submit an empty student name", () => {
    // 1. mock func && render with appropriate props, in this case no student
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );
  
    // 2. try to click save with no student
    fireEvent.click(getByText("Save"));
    // 3. expect the correct error and that onSave doesn't go through
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    // 4. next event of onChange, adding student name to form input
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    // 5. try to click save again, this time with expected student name value
    fireEvent.click(getByText("Save"));
  
    // Expectations: no error, and the onSave goes through okay
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});
