import { defineConfig } from 'cypress';
import { config, load } from 'dotenv-flow';
import * as fs from 'fs';

export default defineConfig({
	env: {
		
	},
	viewportWidth: 1920,
	viewportHeight: 1080,

	// Timeouts
	defaultCommandTimeout: 15000,
	execTimeout: 60000,
	taskTimeout: 60000,
	pageLoadTimeout: 60000,
	requestTimeout: 50000,
	responseTimeout: 30000,

	// Folders & Files
	downloadsFolder: './output/cypress/downloads',
	fileServerFolder: './',
	fixturesFolder: './cypress/fixtures',

	// Screenshots
	screenshotsFolder: './output/cypress/screenshots',
	screenshotOnRunFailure: true,
	trashAssetsBeforeRuns: true,

	// Videos
	videosFolder: './output/cypress/videos',

	// For APIs 
	chromeWebSecurity: false,
	videoCompression: false,
	numTestsKeptInMemory: 10,
	// experimentalMemoryManagement: true,

	reporter: "mochawesome",
	reporterOptions: {
		reportDir: 'output/cypress/results',
		charts: true,
		reportPageTitle: 'example pdf download',
		embeddedScreenshots: true,
		embeddedVideos: true,
		inlineAssets: true,
		saveAlleAttempts: false,
		overwrite: false,
		json: true,
		html: false
	},

	e2e: {
		downloadsFolder: 'cypress/downloads',
		baseUrl: 'https://www.princexml.com/samples/',
		specPattern: ['./cypress/e2e/**/*.cy.test.ts'],
		retries: {
			runMode: 0,
			openMode: 0
		},
		async setupNodeEvents(
			on: Cypress.PluginEvents,
			config: Cypress.PluginConfigOptions
		): Promise<Cypress.PluginConfigOptions> {
			on('task', {
				log(message) {
					console.log(message)
					return null
				},
				getDownloads(downloadsPath: string) {
					return fs.readdirSync(downloadsPath) as string[];
				}
			});

			on('before:browser:launch', (browser, launchOptions) => {
				if (browser.name === 'chrome') {
					launchOptions.args.push('--disable-extensions')

					return launchOptions
				}
			})

			return config;
		},
	}

});
