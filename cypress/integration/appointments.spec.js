describe("Appointments Tests", () => {
  it("should book an interview", () => {
    // 2. right here we send a request to the DB reset endpoint of our server
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");
    // make sure everything loads and can see monday
    cy.contains("Monday");

    // click on the + button with alt=Add for the second appointment
    cy.get("[alt='Add']")
      .first() // because there are multiple Add buttons on the page
      .click();

    // select input field, type name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // select photo with alt of interviewer name
    cy.get("[alt='Sylvia Palmer']").click();
    // take a look at where an element contains "Save"
    cy.contains("Save").click();

    // 1. Once we get here, the server state has changed and DB updates, we need to run a db reset request, that's why it's inserted up there

    // Next we verify that SHOW works, that we see a student & interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    // saying, the elm that has this class, should contain... name && interviewer
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
});
