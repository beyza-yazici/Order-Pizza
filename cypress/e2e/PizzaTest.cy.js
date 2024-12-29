describe('OrderPizza - Input Texting Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should write a text order note input', () => {
    cy.get('input#ad').type('Beyza').should('have.value', 'Beyza');
  });

  it('should show an error if the name is too short', () => {
    cy.get('input#ad').type('Su').blur();
    cy.get('p').should('contain', 'İsim en az 3 karakter olmalıdır.');
  });
});

describe('OrderPizza - Extras Selection Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should allow selecting between 4 and 10 extras', () => {
    cy.get('input[type="checkbox"]').eq(0).check();
    cy.get('input[type="checkbox"]').eq(1).check();
    cy.get('input[type="checkbox"]').eq(2).check();
    cy.get('input[type="checkbox"]').eq(3).check();
  
    cy.get('input[type="checkbox"]').eq(0).should('be.checked');
    cy.get('input[type="checkbox"]').eq(1).should('be.checked');
    cy.get('input[type="checkbox"]').eq(2).should('be.checked');
    cy.get('input[type="checkbox"]').eq(3).should('be.checked');
  
    
    cy.get('input[type="checkbox"]').eq(4).check({ force: true });
    cy.get('input[type="checkbox"]').eq(4).should('not.be.checked');
  
    cy.get('input[type="checkbox"]').each(($checkbox, index) => {
      if (index < 4) {
        cy.wrap($checkbox).check();
      }
    });
  
    cy.get('input[type="checkbox"]').eq(9).check();
    cy.get('input[type="checkbox"]').eq(9).should('be.checked');
  
    cy.get('input[type="checkbox"]').eq(10).check({ force: true });
    cy.get('input[type="checkbox"]').eq(10).should('not.be.checked');
    });
  });

  describe('OrderPizza - Form Submission Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173//');
    });
  
  it('should submit the form successfully when valid data is entered', () => {
    cy.get('input#ad').type('Beyza');
    cy.get('input[type="radio"][value="small"]').check();
    cy.get('select').select('İnce');
    cy.get('input[type="checkbox"]').first().check();
    cy.get('input[type="checkbox"]').eq(1).check();
    cy.get('button[type="submit"]').click();
  
    cy.contains('TEBRİKLER!').should('be.visible');
    cy.contains('SİPARİŞİNİZ ALINDI!').should('be.visible');
    });
  
  it('should show an error if the form is invalid', () => {
    cy.get('button[type="submit"]').click();
  
    cy.contains('İsim en az 3 karakter olmalıdır.').should('be.visible');
    });
  });
  
  



