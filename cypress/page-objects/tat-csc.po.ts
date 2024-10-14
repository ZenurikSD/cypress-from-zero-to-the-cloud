class MainPage {
    fillFirstName(text: string){
        cy.get('#firstName').type(text);
    }

    fillLastName(text: string){
        cy.get('#lastName').type(text);
    }

    fillEmail(text: string){
        cy.get('#email').type(text);
    }

    fillPhone(phonenum: number){
        cy.get('#phone').type(`${phonenum}`);
    }

    fillFeedbackBox(text: string){
        cy.get('#open-text-area').type(text);
    }

    clickSendButton(){
        cy.contains('[type="submit"]', 'Send').click()
    }
}