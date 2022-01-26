export const LIGHTHOUSE_THRESHOLDS = {
  performance: 0,
  accessibility: 0,
  "best-practices": 0,
  // the custom audit ("session-init") needs to be referenced so that the lighthouse-session-gatherer is run
  "session-init": 100,
};

export const LIGHTHOUSE_OPTIONS = {};

export const LIGHTHOUSE_CONFIG = {
  extends: "lighthouse:default",
  passes: [
    {
      passName: "defaultPass",
      gatherers: ["cypress/support/lighthouse-session-gatherer"],
    },
  ],
  audits: ["cypress/support/lighthouse-session-audit"], // our custom (dummy) audit
  categories: {
    "session-init": {
      name: "Browser Session Init",
      title: "Session Config",
      description: "Confirm browser session initialized",
      auditRefs: [{ id: "session-audit", weight: 1 }],
    },
  },
};
