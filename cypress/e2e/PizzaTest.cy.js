describe('OrderPizza - Input Texting Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="home-button"]').click();
  });

  it('should disable the submit button if the name is too short', () => {
    cy.get('[data-cy="ad"]').type('Su').blur();
    cy.get('button[type="submit"]').should('be.disabled');
  });
  
});

describe('OrderPizza - Extras Selection Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="home-button"]').click();
  });

  it('should allow selecting between 4 and 10 extras', () => {

    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked');
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked');
    cy.get('input[type="checkbox"]').eq(2).check().should('be.checked');

    cy.get('input[type="checkbox"]:checked').should('have.length', 3);

    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[type="checkbox"]').eq(0).check();
    cy.get('input[type="checkbox"]').eq(1).check();
    cy.get('input[type="checkbox"]').eq(2).check();
    cy.get('input[type="checkbox"]').eq(3).check();
  
    cy.get('input[type="checkbox"]:checked').should('have.length', 4);

    cy.get('input[type="checkbox"]').eq(4).check();
    cy.get('input[type="checkbox"]').eq(5).check();
    cy.get('input[type="checkbox"]').eq(6).check();
    cy.get('input[type="checkbox"]').eq(7).check();
    cy.get('input[type="checkbox"]').eq(8).check();
    cy.get('input[type="checkbox"]').eq(9).check();
  
    cy.get('input[type="checkbox"]:checked').should('have.length', 10);

    cy.get('input[type="checkbox"]').eq(10).check();

});
});

describe('Order Pizza Form Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="home-button"]').click();
  });

  it('should display an error if the name is less than 3 characters', () => {
    cy.get('[data-cy="ad"]')
      .type('Su')
      .blur();
    cy.get('button[type="submit"]').should('be.disabled'); 
  });

  it('should enable submit button if name is 3 or more characters', () => {
    cy.get('[data-cy="ad"]')
      .clear()
      .type('Beyza')
      .blur();
  });

  it('should require a size selection to enable the submit button', () => {
    cy.get('[data-cy="ad"]').clear().type('Beyza').blur();
    cy.get('button[type="submit"]').should('be.disabled');
    
    cy.get('input[type="radio"][value="small"]').check();
  });

  it('should require a dough selection to enable the submit button', () => {
    cy.get('[data-cy="ad"]').clear().type('Beyza').blur();
    cy.get('input[type="radio"][value="small"]').check();
    cy.get('button[type="submit"]').should('be.disabled');
    
    cy.get('select').select('İnce');
  });
  
  it('should enable the submit button when 4 or more extras are selected', () => {
    cy.get('[data-cy="ad"]').clear().type('Beyza').blur();
    cy.get('input[type="radio"][value="small"]').check();
    cy.get('select').select('İnce');
    
    cy.get('input[type="checkbox"]').eq(0).check();
    cy.get('input[type="checkbox"]').eq(1).check();
    cy.get('input[type="checkbox"]').eq(2).check();
    cy.get('input[type="checkbox"]').eq(3).check();
  });

  it('should disable the submit button when 10 or more extras are selected', () => {
    cy.get('[data-cy="ad"]').clear().type('Beyza').blur();
    cy.get('input[type="radio"][value="small"]').check();
    cy.get('select').select('İnce');

    for (let i = 0; i < 10; i++) {
      cy.get('input[type="checkbox"]').eq(i).check();
    }
    cy.get('input[type="checkbox"]').eq(10).check();
  });

  it('should update the order total when extras are selected', () => {
    cy.get('[data-cy="ad"]').clear().type('Beyza').blur();
    cy.get('input[type="radio"][value="small"]').check();
    cy.get('select').select('İnce');
    cy.get('input[type="checkbox"]').eq(0).check();
    cy.get('input[type="checkbox"]').eq(1).check();
    cy.get('input[type="checkbox"]').eq(2).check();
    cy.get('input[type="checkbox"]').eq(3).check();
  });

  it('should allow incrementing and decrementing the pizza count', () => {
    cy.get('[data-cy="ad"]').clear().type('Beyza').blur();
    cy.get('input[type="radio"][value="small"]').check();
    cy.get('select').select('İnce');
    cy.get('input[type="checkbox"]').eq(0).check();
    cy.get('input[type="checkbox"]').eq(1).check();
    cy.get('input[type="checkbox"]').eq(2).check();
    cy.get('input[type="checkbox"]').eq(3).check();

    cy.get('.increment').click();
    cy.get('.count').should('contain', '2');

    cy.get('.decrement').click();
    cy.get('.count').should('contain', '1');
  });

  it('should disable the submit button when there are no extras selected', () => {
    cy.get('[data-cy="ad"]').clear().type('Beyza').blur();
    cy.get('input[type="radio"][value="small"]').check();
    cy.get('select').select('İnce');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should submit the form successfully', () => {
    cy.get('[data-cy="ad"]').clear().type('Beyza').blur();
    cy.get('input[type="radio"][value="small"]').check();
    cy.get('select').select('İnce');
    cy.get('input[type="checkbox"]').eq(0).check();
    cy.get('input[type="checkbox"]').eq(1).check();
    cy.get('input[type="checkbox"]').eq(2).check();
    cy.get('input[type="checkbox"]').eq(3).check();

    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.get('button[type="submit"]').click();

    cy.contains('TEBRİKLER!').should('be.visible');
    cy.contains('SİPARİŞİNİZ ALINDI!').should('be.visible');
  });
});

