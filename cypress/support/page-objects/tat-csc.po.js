class MainPage {
    fillFirstName(text){
        cy.get('#firstName').type(text);
    }

    fillLastName(text){
        cy.get('#lastName').type(text);
    }

    fillEmail(text){
        cy.get('#email').type(text);
    }

    fillPhone(phonenum){
        cy.get('#phone').type(`${phonenum}`);
    }

    fillFeedbackBox(text){
        cy.get('#open-text-area').type(text);
    }

    clickSendButton(){
        cy.contains('[type="submit"]', 'Send').click()
    }

    getSuccessToast(){
        return cy.get('.success')
    }
}

export default MainPage;