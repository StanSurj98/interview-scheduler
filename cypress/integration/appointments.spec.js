describe("Appointments Tests", () => {
  // Keeping it DRY, reset DB, visit site & wait for render each time
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt='Add']")
      .first()
      .click();

    // types input, picks interviewer and submits
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();

    // verify SHOW component, displays name && interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // Edit and Delete buttons both hidden unless hovered, use force click
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

    // Ensuring status appears then disappears on success
    cy.get("[alt='Loading']").should("exist");
    cy.get("[alt='Loading']").should("not.exist");

    // Check that the correct appointment has been deleted
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});
