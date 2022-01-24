# SessionStorage Authentication Example with Cypress + Lighthouse

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Intro

This application uses `sessionStorage` to store authentication (login) information. During the
login process, a token is stored in sessionStorage. The presence of this token indicate a user
has successfully logged into the application. The absence of this token indicates the login
screen should be presented to the user.

This simple application has two pages:

- `/welcome` - does not require authentication
- `/secondPage` - requires authentication (a token value in `sessionStorage`)

Navigating to `/secondPage` without a prior login will redirect back to the `/welcome` page.

### Lighthouse Testing with Cypress

We would like to run a Lighthouse audit on both the welcome page ad the second page of this
application. These tests can be found in `cypress/integration/test.spec.js`.

To do this, we use the [cypress-audit](https://github.com/mfrachet/cypress-audit) plugin.

After running the tests, the Lighthouse reports for each of the pages can be found in
`cypress/test-results`.

### Session Storage Issue

Adding a call to `cy.lighthouse()` directly within our tests will not run Lighthouse on the
pages behind our `sessionStorage` authentication (see [cypress-audit issue #121](https://github.com/mfrachet/cypress-audit/issues/121))
since the values in session storage are not transferred over to the new Cypress tab when
Lighthouse is run.

As a result, while running Lighthouse on the second page (the page requiring authentication),
the audit is actually run against the welcome page. This can be seen in the lighthouse report's
screenshots.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run cy:open`

To launch the Cypress test viewer.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
