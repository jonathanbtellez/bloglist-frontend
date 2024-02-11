describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/v1/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/v1/users', user)

    const user2 = {
      name: 'Luukkainen',
      username: 'pedro',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/v1/users', user2)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login').click()
      cy.get('.success')
        .should('contain', 'Welcome Matti Luukkainen')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('contain', 'Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login').click()
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('Create blog').click()
      cy.get('#title').type('A blog from cypress')
      cy.get('#author').type('mluukkai')
      cy.get('#url').type('http://mluukkai')
      cy.get('#createBottom').click()

      cy.get('.success')
        .should('contain', 'Welcome Matti Luukkainen')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('contain', 'The blog: A blog from cypress written by mluukkai was saved')
    })

    describe('Blog actions', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Other blog from cypress', author: 'Charles B.', url: 'http://charlesb' })
      })

      it('A blog can receive a like', function () {
        cy.get('#isBlogVisible').click()
        cy.get('#like').click()
        cy.contains('Likes').parent().should('contain', '1')
      })

      it('A blog can be deleted', function () {
        cy.get('#isBlogVisible').click()
        cy.get('#delete').click()
        cy.visit('')
        cy.get('html').should('not.contain', 'Other blog from cypress')
      })
    })

    describe('Blog actions with out permissions', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Other blog from cypress using other user', author: 'Martin W.', url: 'http://charlesb' })
      })

      it('A blog can be deleted', function () {
        cy.get('#logout').click()
        cy.login({ username: 'pedro', password: 'salainen' })
        cy.get('#isBlogVisible').click()
        cy.get('#delete').click()
        cy.visit('')
        cy.get('html').should('contain', 'Other blog from cypress using other user')
      })
    })

    describe('Sort blogs', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Blog from cypress', author: 'Martin W.', likes: 1, url: 'http://charlesb' })
        cy.createBlog({ title: 'Other blog from cypress', author: 'Martin W.', likes: 20, url: 'http://charlesb' })
      })

      it.only('Blogs are sort by likes', function () {
        cy.get('.blog-container').eq(0).should('contain', 'Other blog from cypress')
        cy.get('.blog-container').eq(1).should('contain', 'Blog from cypress')
      })
    })
  })
})