// path: src/components/BaseComponent.ts

import { Page, Locator } from '@playwright/test';
import { createLogger } from '../utils/logger';

/**
 * Abstract base class for all Component Objects.
 *
 * A component is a reusable, scoped UI unit (e.g. navigation bar, modal,
 * data table). It receives a `root` locator that acts as the scope boundary —
 * all child element queries must be chained from `this.root`.
 */
export abstract class BaseComponent {
  protected readonly page: Page;
  /** The root locator that scopes all child queries within this component. */
  protected readonly root: Locator;
  protected readonly logger = createLogger(this.constructor.name);

  constructor(page: Page, root: Locator) {
    this.page = page;
    this.root = root;
  }

  /** Returns `true` if the component's root element is currently visible. */
  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }

  /** Waits until the component's root element becomes visible in the DOM. */
  async waitForVisible(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
  }

  /** Waits until the component's root element is detached or hidden. */
  async waitForHidden(): Promise<void> {
    await this.root.waitFor({ state: 'hidden' });
  }
}
