# Suite Maintenance Summary

**Date:** 2026-03-22  
**Scope:** `tests/e2e/` — 4 spec files reviewed against page objects in `src/`

---

## 1. Findings by File

### `seed.spec.ts` — DELETE
- Single test with an empty body (`// generate code here.`).  
- No assertions, no steps. Pure placeholder; provides zero test value.  
- **Action:** Remove the file entirely.

---

### `login.spec.ts`

| # | Issue | Severity |
|---|-------|----------|
| 1 | `LoginPage.getSwagLabsLogo()` uses the CSS class selector `.login_logo` — fragile, not a `data-test` attribute. | Medium |
| 2 | `InventoryPage.getPageTitle()` uses `.locator('.title')` CSS class — same fragility concern. | Medium |
| 3 | `"should show products after successful login"` is redundant. It logs in, waits for the inventory page, then counts products. The preceding `"should login with standard user and redirect to inventory"` already asserts the same navigation success, and `waitForPageLoad()` already confirms the inventory container is visible. | Low |
| 4 | `"should logout successfully"` performs a full manual login instead of using the `authenticatedStandardUser` fixture. Duplicates login logic already covered by other tests. | Low |
| 5 | `"should login with problem user"` calls `loginPage.getUrl()` while already on the inventory page. Semantically misleading; should call `page.url()` or `inventoryPage.getUrl()`. | Low |

---

### `checkout-complete-single-item.spec.ts`

| # | Issue | Severity |
|---|-------|----------|
| 1 | All cart, checkout, and confirmation selectors use inline `page.getByText()` and `page.getByTestId()` calls without any page object abstraction. No `CartPage` or `CheckoutPage` PO exists. Any selector change requires editing the spec directly. | Medium |
| 2 | `page.getByText('Your Cart')`, `page.getByText('Checkout: Your Information')`, etc. are text-content selectors. Brittle if SauceDemo copy changes. | Medium |
| 3 | Tax total `'Tax: $2.40'` is hard-coded. If the backend tax rate changes, the assertion silently becomes wrong before anyone notices. | Low |
| 4 | `page.getByTestId('inventory-item-price')` is asserted twice (cart view and overview) with the same expected value, but without scoping to a container. If two price elements are present simultaneously (e.g., during a page transition), this could produce a false positive. | Low |

---

### `inventory-sorting-price-low-to-high.spec.ts`

| # | Issue | Severity |
|---|-------|----------|
| 1 | **Duplicate order verification.** The spec first runs an algorithmic loop asserting `prices[i] >= prices[i-1]`, then explicitly asserts the exact name and price of all 6 products by index. The loop check is fully implied by the explicit per-item assertions — one of them should be removed. | Low |
| 2 | Hard-coded `{ timeout: 10000 }` on one assertion rather than relying on the project-level `expect` timeout from `playwright.config.ts`. | Low |
| 3 | File name and test ID `TC-SORT-003` imply a numbered series, but `TC-SORT-001` and `TC-SORT-002` (e.g., sort A–Z, Z–A) are absent. The test file naming is misleading without companions. | Info |

---

## 2. Broken / Fragile Selectors

| Selector | File | Fix |
|----------|------|-----|
| `.login_logo` (CSS class) | `src/pages/LoginPage.ts` → `getSwagLabsLogo()` | Add `data-test="login-logo"` or use `getByRole('heading')` |
| `.title` (CSS class) | `src/pages/InventoryPage.ts` → `getPageTitle()` | Use `page.getByTestId('title')` (SauceDemo renders `data-test="title"`) |
| `page.getByText('Your Cart')` et al. | `checkout-complete-single-item.spec.ts` | Migrate to a `CartPage` / `CheckoutPage` PO using `getByTestId` |

---

## 3. Redundant / Obsolete Scenarios

| Scenario | Reason | Recommendation |
|----------|--------|----------------|
| `seed.spec.ts – "seed"` | Empty placeholder | **Delete** |
| `login.spec.ts – "should show products after successful login"` | Covered by the redirect test + `waitForPageLoad()` | **Merge** into the redirect test by adding a `getProductCount() > 0` assertion there |
| `inventory-sorting – algorithmic price loop` | Superseded by explicit per-item assertions below it | **Remove** the loop; keep only the per-item assertions |
| `login.spec.ts – "should logout…"` manual login | Uses manual login when `authenticatedStandardUser` fixture already handles it | **Refactor** to use the fixture |

---

## 4. Consolidation Plan

### Step 1 — Remove dead code
- Delete `tests/e2e/seed.spec.ts`.

### Step 2 — Merge duplicate login assertions
In `login.spec.ts`, collapse _"should login with standard user and redirect to inventory"_ and _"should show products after successful login"_ into a single test that asserts URL, page title visibility, and `productCount > 0`.

### Step 3 — Fix fragile CSS selectors
- `LoginPage.getSwagLabsLogo()` → `page.getByTestId('login-logo')` or `page.getByRole('heading', { name: /swag labs/i })`.  
- `InventoryPage.getPageTitle()` → `page.getByTestId('title')`.

### Step 4 — Introduce CartPage and CheckoutPage POs
Extract all inline selectors from `checkout-complete-single-item.spec.ts` into two new page objects:
- `src/pages/CartPage.ts` — cart heading, item list, quantity, price, checkout button.  
- `src/pages/CheckoutPage.ts` — info form fields, overview totals, finish button, confirmation text.  
Add both to `AppFixtures` in `BaseTest.ts`.

### Step 5 — Clean up sorting test
- Remove the redundant price-loop assertion in `inventory-sorting-price-low-to-high.spec.ts`.  
- Replace the hard-coded `{ timeout: 10000 }` with the project default.  
- Consider renaming the file to `inventory-sorting.spec.ts` and adding `TC-SORT-001` (A–Z) and `TC-SORT-002` (Z–A) to complete the series.

### Step 6 — Fix logout test
Refactor the logout test to start from the `authenticatedStandardUser` fixture instead of repeating a manual login.

---

## 5. Effort Estimate

| Task | Complexity |
|------|-----------|
| Delete seed.spec.ts | Trivial |
| Merge duplicate login tests | Small |
| Fix CSS selectors (2 methods) | Small |
| Refactor logout test to use fixture | Small |
| Remove sorting loop duplication | Trivial |
| Create CartPage + CheckoutPage POs | Medium |