// path: tests/e2e/login.spec.ts

import { test, expect } from '../../src/fixtures/BaseTest';
import { getStandardUser, getLockedOutUser, getProblemUser } from '../../src/utils/envHelper';

test.describe('SauceDemo Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test.describe('UI Elements', () => {
    test('should display login form elements', async ({ loginPage }) => {
      await expect(loginPage.getSwagLabsLogo()).toBeVisible();
      await expect(loginPage.getUsernameInput()).toBeVisible();
      await expect(loginPage.getPasswordInput()).toBeVisible();
      await expect(loginPage.getLoginButton()).toBeVisible();
    });

    test('should have correct placeholder text', async ({ loginPage }) => {
      await expect(loginPage.getUsernameInput()).toHaveAttribute('placeholder', 'Username');
      await expect(loginPage.getPasswordInput()).toHaveAttribute('placeholder', 'Password');
    });
  });

  test.describe('Valid Login', () => {
    test('should login with standard user and redirect to inventory', async ({ loginPage, inventoryPage }) => {
      const { username, password } = getStandardUser();

      await loginPage.login(username, password);
      await inventoryPage.waitForPageLoad();

      await expect(inventoryPage.getPageTitle()).toBeVisible();
      expect(loginPage.getUrl()).toContain('/inventory.html');

      const productCount = await inventoryPage.getProductCount();
      expect(productCount).toBeGreaterThan(0);
    });
  });

  test.describe('Invalid Login', () => {
    test('should show error for locked out user', async ({ loginPage }) => {
      const { username, password } = getLockedOutUser();
      
      await loginPage.login(username, password);
      
      await expect(loginPage.getErrorMessage()).toBeVisible();
      const errorText = await loginPage.getErrorText();
      expect(errorText).toContain('Sorry, this user has been locked out');
    });

    test('should show error for invalid credentials', async ({ loginPage }) => {
      await loginPage.login('invalid_user', 'wrong_password');
      
      await expect(loginPage.getErrorMessage()).toBeVisible();
      const errorText = await loginPage.getErrorText();
      expect(errorText).toContain('Username and password do not match');
    });

    test('should show error for empty username', async ({ loginPage }) => {
      await loginPage.fillPassword('secret_sauce');
      await loginPage.submit();
      
      await expect(loginPage.getErrorMessage()).toBeVisible();
      const errorText = await loginPage.getErrorText();
      expect(errorText).toContain('Username is required');
    });

    test('should show error for empty password', async ({ loginPage }) => {
      await loginPage.fillUsername('standard_user');
      await loginPage.submit();
      
      await expect(loginPage.getErrorMessage()).toBeVisible();
      const errorText = await loginPage.getErrorText();
      expect(errorText).toContain('Password is required');
    });

    test('should allow clearing error messages', async ({ loginPage }) => {
      await loginPage.login('invalid_user', 'wrong_password');
      await expect(loginPage.getErrorMessage()).toBeVisible();
      
      await loginPage.clearErrorMessage();
      await expect(loginPage.getErrorMessage()).not.toBeVisible();
    });
  });

  test.describe('Different User Types', () => {
    test('should login with problem user (UI bugs)', async ({ loginPage, inventoryPage }) => {
      const { username, password } = getProblemUser();
      
      await loginPage.login(username, password);
      await inventoryPage.waitForPageLoad();
      
      // Problem user can login but may see UI issues
      expect(loginPage.getUrl()).toContain('/inventory.html');
    });
  });

  test.describe('Logout Flow', () => {
    test('should logout successfully and return to login page', async ({ authenticatedStandardUser, loginPage }) => {
      // Logout
      await authenticatedStandardUser.logout();
      await loginPage.waitForPageLoad();

      // Should be back on login page
      await expect(loginPage.getLoginForm()).toBeVisible();
      expect(loginPage.getUrl()).not.toContain('/inventory.html');
    });
  });
});
