// path: src/pages/LoginPage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the SauceDemo Login page.
 *
 * All interactions with login-specific UI are encapsulated here.
 * Selectors use only `getByRole`, `getByLabel`, or `getByTestId`.
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  /** Navigate to the login page and wait for it to fully load. */
  async goto(): Promise<void> {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  /** Asserts that the login form is visible before interacting with the page. */
  async waitForPageLoad(): Promise<void> {
    await expect(this.getLoginForm()).toBeVisible();
  }

  // ── Locators ─────────────────────────────────────────────────────────────────

  /** The login form container. */
  getLoginForm(): Locator {
    return this.page.getByTestId('login-container');
  }

  /** The Swag Labs logo/heading. */
  getSwagLabsLogo(): Locator {
    return this.page.getByText('Swag Labs', { exact: true });
  }

  /** The username input field. */
  getUsernameInput(): Locator {
    return this.page.getByTestId('username');
  }

  /** The password input field. */
  getPasswordInput(): Locator {
    return this.page.getByTestId('password');
  }

  /** The login submit button. */
  getLoginButton(): Locator {
    return this.page.getByTestId('login-button');
  }

  /** Error message container for failed login attempts. */
  getErrorMessage(): Locator {
    return this.page.getByTestId('error');
  }

  /** Close button for error messages. */
  getErrorCloseButton(): Locator {
    return this.page.getByTestId('error-button');
  }

  // ── Actions ──────────────────────────────────────────────────────────────────

  /** Fill the username field with the provided value. */
  async fillUsername(username: string): Promise<void> {
    this.logger.debug(`Filling username: ${username}`);
    await this.getUsernameInput().fill(username);
  }

  /** Fill the password field with the provided value. */
  async fillPassword(password: string): Promise<void> {
    await this.getPasswordInput().fill(password);
  }

  /** Click the login submit button. */
  async submit(): Promise<void> {
    this.logger.info('Submitting login form');
    await this.getLoginButton().click();
  }

  /** Clear any error messages by clicking the X button. */
  async clearErrorMessage(): Promise<void> {
    if (await this.getErrorCloseButton().isVisible()) {
      await this.getErrorCloseButton().click();
    }
  }

  /**
   * Convenience method: fills credentials and submits the login form.
   *
   * @param username - SauceDemo username.
   * @param password - SauceDemo password.
   */
  async login(username: string, password: string): Promise<void> {
    this.logger.info(`Logging in as: ${username}`);
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }

  /** Returns the current error message text, if any. */
  async getErrorText(): Promise<string> {
    const text = await this.getErrorMessage().textContent();
    return text ?? '';
  }
}
