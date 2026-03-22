// path: src/pages/BasePage.ts

import { Page } from '@playwright/test';
import { createLogger } from '../utils/logger';

/**
 * Abstract base class for all Page Objects.
 *
 * Centralises navigation helpers and enforces a `waitForPageLoad` contract
 * that every concrete page must implement to confirm it is fully rendered.
 */
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly logger = createLogger(this.constructor.name);

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a path relative to the configured `baseURL`.
   *
   * @param path - URL path, e.g. `/login` or `/dashboard`.
   */
  async navigate(path: string): Promise<void> {
    this.logger.info(`Navigating to: ${path}`);
    await this.page.goto(path);
  }

  /** Wait for the page to reach a network-idle state. */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /** Returns the document title of the current page. */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /** Returns the current full URL. */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Each page must implement this method to assert that it has fully loaded
   * (e.g. wait for a heading or key element to become visible).
   */
  abstract waitForPageLoad(): Promise<void>;
}
