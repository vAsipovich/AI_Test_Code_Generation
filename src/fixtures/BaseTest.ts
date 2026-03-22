// path: src/fixtures/BaseTest.ts

import { test as base, expect, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { NavigationComponent } from '../components/NavigationComponent';
import { createLogger } from '../utils/logger';

const logger = createLogger('BaseTest');

/**
 * Shape of all custom fixtures available in every test.
 * Extend this interface when adding new page objects or shared state.
 */
export interface AppFixtures {
  /** Pre-instantiated LoginPage object bound to the current test's page. */
  loginPage: LoginPage;
  /** Pre-instantiated InventoryPage object bound to the current test's page. */
  inventoryPage: InventoryPage;
  /** Pre-instantiated NavigationComponent bound to the current test's page. */
  nav: NavigationComponent;
}

/**
 * Extended Playwright `test` object that provides pre-wired page/component
 * fixtures and global before/after hooks (logging, screenshot on failure).
 *
 * Import `test` and `expect` from this module in all spec files instead of
 * importing directly from `@playwright/test`.
 *
 * @example
 * ```ts
 * import { test, expect } from '../../src/fixtures/BaseTest';
 *
 * test('my test', async ({ loginPage }) => { ... });
 * ```
 */
export const test = base.extend<AppFixtures>({
  // ── Page / Component fixtures ───────────────────────────────────────────────

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  nav: async ({ page }, use) => {
    await use(new NavigationComponent(page));
  },

  // ── Global setup / teardown hook via the built-in `page` fixture ───────────

  page: async ({ page }, use, testInfo: TestInfo) => {
    logger.info(`▶ START  "${testInfo.title}"`);

    await use(page);

    // ── Teardown ─────────────────────────────────────────────────────────────
    const status = testInfo.status ?? 'unknown';
    if (status === 'failed' || status === 'timedOut') {
      logger.error(`✖ FAILED "${testInfo.title}" — ${testInfo.error?.message ?? ''}`);
    } else {
      logger.info(`✔ PASSED "${testInfo.title}"`);
    }
  },
});

export { expect };
