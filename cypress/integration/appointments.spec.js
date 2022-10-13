describe("Appointments Tests", () => {
  beforeEach(() => {
    // Keeping it DRY, reset DB, visit site & wait for render each time
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  xit("should book an interview", () => {
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

  xit("should edit an interview", () => {
    // The edit and delete buttons are both hidden unless hovered, use force click
    cy.get("[alt='Edit']")
      .first()
      .click({ force: true });

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");

    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt='Delete']")
      .first()
      .click({ force: true });

    cy.contains("Confirm").click();

    // Let's make sure the status elm shows
    cy.get("[alt='Loading']").should("exist");
    cy.get("[alt='Loading']").should("not.exist");

    // Lastly, check that the appointment card that shows Archie doesn't exist
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});
