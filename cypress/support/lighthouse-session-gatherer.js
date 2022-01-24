const { Gatherer } = require("lighthouse");

const SAMPLE_AUTH_TOKEN = "this-is-my-token";

function createSession(authToken) {
  // add token to session storage
  window.sessionStorage.setItem("auth_tokens", authToken);
}

class SessionGatherer extends Gatherer {
  // this runs after a new tab is opened, but before the tab visits the URL
  async beforePass({ driver }) {
    driver.executionContext.evaluateOnNewDocument(createSession, {
      args: [SAMPLE_AUTH_TOKEN],
    });
    // return an "artifact" which can be used in the custom audit
    return SAMPLE_AUTH_TOKEN;
  }
}

module.exports = SessionGatherer;
