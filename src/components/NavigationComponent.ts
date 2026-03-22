// path: src/components/NavigationComponent.ts

import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

/**
 * Component Object for the main application navigation bar.
 *
 * Scoped to the `<nav>` landmark role. All interactions are relative
 * to that root element, preventing accidental cross-component coupling.
 */
export class NavigationComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, page.getByRole('navigation'));
  }

  // ── Locators ─────────────────────────────────────────────────────────────────

  /** Returns the link for the given visible label within the nav. */
  getNavLink(label: string): Locator {
    return this.root.getByRole('link', { name: label });
  }

  /** Returns the user account menu button. */
  getUserMenuButton(): Locator {
    return this.root.getByRole('button', { name: 'Account menu' });
  }

  // ── Actions ──────────────────────────────────────────────────────────────────

  /** Click the Home / logo link to navigate to the root of the application. */
  async clickHome(): Promise<void> {
    this.logger.info('Clicking Home link');
    await this.getNavLink('Home').click();
  }

  /**
   * Click a navigation link identified by its visible label.
   *
   * @param label - Accessible text of the navigation link.
   */
  async clickNavItem(label: string): Promise<void> {
    this.logger.info(`Clicking nav item: "${label}"`);
    await this.getNavLink(label).click();
  }

  /** Open the user account dropdown menu. */
  async openUserMenu(): Promise<void> {
    this.logger.info('Opening user account menu');
    await this.getUserMenuButton().click();
  }

  /**
   * Sign out by opening the user menu and clicking the Sign out option.
   * Requires the user menu to be present (i.e. user must be authenticated).
   */
  async signOut(): Promise<void> {
    await this.openUserMenu();
    await this.root.getByRole('menuitem', { name: 'Sign out' }).click();
  }

  /** Returns the total count of top-level navigation list items. */
  async getNavItemCount(): Promise<number> {
    return this.root.getByRole('listitem').count();
  }
}
