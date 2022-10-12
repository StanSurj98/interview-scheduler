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
  

  it("calls onSave function when the name is defined", () => {
    /* 1. create the mock onSave fn */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers, student name and the onSave mock function passed as an onSave prop */
    const {queryByText, getByText} = render(
      <Form 
        interviewers={interviewers} 
        /* Make sure you read what the onSave func does from <Appointment /> passed to <Form />, in our case, takes the interviewer ID */
        interviewer={interviewers[0].id}
        student="Lydia Miller-Jones" 
        onSave={onSave} 
      /> 
    );

    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));

    
    // Expectations
    // We shouldn't get our error messages (at this point haven't built them)
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});
