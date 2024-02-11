// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/v1/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
        cy.visit('')
    })
})

Cypress.Commands.add('createBlog', ({ title, url, author, likes = null }) => {
    cy.request({
        url: 'http://localhost:3001/api/v1/blogs',
        method: 'POST',
        body: { title, url, author, likes },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
        }
    })
    cy.visit('')
})
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })