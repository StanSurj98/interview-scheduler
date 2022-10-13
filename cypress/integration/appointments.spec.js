describe("Appointments Tests", () => {
  beforeEach(() => {
    // Keeping it DRY, reset DB, visit site & wait for render each time
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // click on the + button with alt=Add
    cy.get("[alt='Add']")
      .first()
      .click();

    // types input, picks interviewer and submits
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();


    // verify that SHOW mode, displays name && interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
});
