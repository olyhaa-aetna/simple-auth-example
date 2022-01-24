/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const fs = require("fs");
const path = require("path");
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const ReportGenerator = require("lighthouse/report/generator/report-generator");

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  let fileCount = 0;
  on("task", {
    lighthouse: lighthouse((lighthouseReport) => {
      // Save the Lighthouse report to cypress/test-results
      const outputPath = path.resolve(".", "cypress/test-results");
      // the fileName should be the name of the page we're auditing
      const fileName = lighthouseReport.artifacts.URL.requestedUrl.substring(
        "http://localhost:3000/".length
      );

      const htmlReport = ReportGenerator.generateReport(
        lighthouseReport.lhr,
        "html"
      );
      fs.writeFileSync(
        `${outputPath}/${++fileCount}-${fileName}.html`,
        htmlReport
      );
    }),
  });
  // `config` is the resolved Cypress config
};
