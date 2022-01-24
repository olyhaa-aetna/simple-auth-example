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

### Session Storage Workaround - Custom Gatherer and Audit

Lighthouse supports adding [custom audits](https://github.com/GoogleChrome/lighthouse/tree/468d92ff7bfca51499787feb56ad9838db7631f8/docs/recipes/custom-audit).
These custom audits are added to the generated Lighthouse reports and can be based on custom
metrics gathered from the page via a **gatherer**. These custom gatherers have some lifecycle
hooks that can be used to read or modify the session/tab where the Lighthouse audit is running.

The one of particular use to us is the `beforePass` hook, which will run **after** the new
Cypress window is created, but **before** the URL is visited. It is at this point where we can
modify the `sessionStorage` values before the app is loaded!

See `cypress/support/lighthouse-session-gatherer.js` for the custom gatherer code where we add
the session storage values. See `cypress/support/lighthouse-session-audit.js` for the custom
audit that depends on this gatherer.

**Important Implementation Note**: The custom gatherer will **not** be run unless the following
conditions are met:

1. The gatherer is listed as a `requiredArtifact` in the custom audit file
2. The gatherer is listed in the lighthouse config
3. The audit is listed in the lighthouse config
4. The audit is listed in the lighthouse config categories

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
