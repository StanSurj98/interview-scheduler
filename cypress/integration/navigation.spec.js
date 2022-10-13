describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });


  it("should navigate to Tuesday", () => {
    cy.visit("/");
    
    // updating this to use the data-testid="day"
    cy.contains('[data-testid=day]', "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  })
  




});

