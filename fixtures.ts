import { Page, test as base, chromium } from '@playwright/test';
// ensures all window objects we interact with in our spec have fin tyepdefs
export * from './openfinGlobal';

// this port is hardcoded in the app.json
const RUNTIME_ADDRESS = 'http://localhost:9090';

// Define custom fixture interface
interface IPlaywrightFixtures {
    appWindow: Page;
}

export const test = base.extend<IPlaywrightFixtures>({
    // in this case, our browser is OpenFin. Rather than DL and run a binary,
    // we connect to a running OpenFin session here. Start/Stop of OpenFin is left
    // to the developer to implement.
    browser: async ({}, use) => {
        const runtimeConnection = await chromium.connectOverCDP(RUNTIME_ADDRESS);
        await use(runtimeConnection);
    },
    context: async ({ browser }, use) => {
        const contexts = await browser.contexts();
        if (contexts.length !== 1) {
            throw Error(
                `Unexepcted Context(s): Expected 1, Found ${contexts.length}`
            );
        }
        await use(contexts[0]);
    },
    appWindow: async ({ context }, use) => {
        const pages = await context.pages()
        const mainWindowPage = pages.find(page => page.url() === 'http://localhost:5173/');
        if (!mainWindowPage) throw Error('Main Window not found at url!');
        await use(mainWindowPage);
    },
})