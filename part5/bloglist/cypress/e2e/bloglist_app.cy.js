describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      username: 'root',
      name: 'Root',
      password: 'password',
    };
    const otherUser = {
      username: 'other',
      name: 'Other',
      password: 'password',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, otherUser);
    cy.visit('');
  });

  it('should show the login form', () => {
    cy.contains('log in to application');
  });

  describe('when logging in', () => {
    it('should succeed with correct credentials', () => {
      cy.get('#username').type('root');
      cy.get('#password').type('password');
      cy.get('#login-button').click();

      cy.contains('Root logged in');
    });

    it('should fail with wrong credentials', () => {
      cy.get('#username').type('root');
      cy.get('#password').type('wrongPassword');
      cy.get('#login-button').click();

      cy.contains('invalid username or password');
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('html').should('not.contain', 'Root logged in');
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'root', password: 'password' });
    });

    it('should create a new blog when title, author and url are provided', () => {
      cy.get('#new-blog-button').click();

      cy.get('#title').type('a blog created by cypress');
      cy.get('#author').type('author');
      cy.get('#url').type('url');

      cy.get('#create-blog-button').click();
      cy.contains('a blog created by cypress');
    });

    describe('when a blog exists', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'root',
          url: 'url',
          likes: 2,
        });
      });

      it('should have title and author', () => {
        cy.contains('a blog created by cypress root');
      });

      it('should show likes, url and creator when show button is clicked', () => {
        cy.contains('show').click();

        cy.contains('likes 2');
        cy.contains('root');
      });

      it('should increment likes by one when button is clicked once', () => {
        cy.contains('show').click();

        cy.contains('like').click();
        cy.contains('likes 3');
      });

      describe('when deleting a blog', () => {
        beforeEach(() => {
          cy.contains('log out').click();

          cy.login({ username: 'other', password: 'password' });
        });

        it('should not see the delete button if user is not the creator', () => {
          cy.contains('remove').should('not.exist');
        });

        it('should succeed when user is the creator', () => {
          cy.createBlog({
            title: 'a blog created by cypress',
            author: 'other',
            url: 'url',
            likes: 4,
          });

          cy.contains('remove').click();
          cy.get('html').should(
            'not.contain',
            'a blog created by cypress other'
          );
          cy.get('html').should('contain', 'a blog created by cypress root');
        });
      });
    });

    describe('when many blogs exist', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'The title with the second most likes',
          author: 'root',
          url: 'url',
          likes: 2,
        });
        cy.createBlog({
          title: 'The title with the most likes',
          author: 'root',
          url: 'url',
          likes: 4,
        });
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'root',
          url: 'url',
          likes: 1,
        });
      });

      it('should sort blogs by number od likes', () => {
        cy.get('div>.blog')
          .eq(0)
          .should('contain', 'The title with the most likes');
        cy.get('div>.blog')
          .eq(1)
          .should('contain', 'The title with the second most likes');
      });
    });
  });
});

