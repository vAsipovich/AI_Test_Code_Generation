# Inventory Page – Sorting Test Plan

## Application Overview

The Swag Labs (SauceDemo) inventory page displays 6 products and a sort dropdown with four options: Name (A to Z) (default), Name (Z to A), Price (low to high), Price (high to low). Products and prices: Sauce Labs Backpack $29.99, Sauce Labs Bike Light $9.99, Sauce Labs Bolt T-Shirt $15.99, Sauce Labs Fleece Jacket $49.99, Sauce Labs Onesie $7.99, Test.allTheThings() T-Shirt (Red) $15.99.

## Test Scenarios

### 1. Inventory Sorting

**Seed:** `tests/e2e/seed.spec.ts`

#### 1.1. TC-SORT-001 – Default sort order is Name (A to Z)

**File:** `tests/e2e/inventory-sorting.spec.ts`

**Steps:**
  1. Log in as standard_user and navigate to the inventory page
    - expect: The inventory page is loaded and all 6 products are visible
  2. Observe the sort dropdown label
    - expect: The dropdown displays 'Name (A to Z)'
  3. Read the names of all products in their displayed order (top-to-bottom)
    - expect: Products appear in order: 1. Sauce Labs Backpack, 2. Sauce Labs Bike Light, 3. Sauce Labs Bolt T-Shirt, 4. Sauce Labs Fleece Jacket, 5. Sauce Labs Onesie, 6. Test.allTheThings() T-Shirt (Red)

#### 1.2. TC-SORT-002 – Sort by Name (Z to A)

**File:** `tests/e2e/inventory-sorting.spec.ts`

**Steps:**
  1. Log in as standard_user and navigate to the inventory page
    - expect: The inventory page is loaded
  2. Open the sort dropdown and select 'Name (Z to A)'
    - expect: The dropdown label updates to 'Name (Z to A)'
  3. Read the names of all products in their new displayed order
    - expect: Products appear in order: 1. Test.allTheThings() T-Shirt (Red), 2. Sauce Labs Onesie, 3. Sauce Labs Fleece Jacket, 4. Sauce Labs Bolt T-Shirt, 5. Sauce Labs Bike Light, 6. Sauce Labs Backpack
    - expect: All 6 products are still visible

#### 1.3. TC-SORT-003 – Sort by Price (low to high)

**File:** `tests/e2e/inventory-sorting.spec.ts`

**Steps:**
  1. Log in as standard_user and navigate to the inventory page
    - expect: The inventory page is loaded
  2. Open the sort dropdown and select 'Price (low to high)'
    - expect: The dropdown label updates to 'Price (low to high)'
  3. Read the names and prices of all products in their new displayed order
    - expect: Products appear in order: 1. Sauce Labs Onesie $7.99, 2. Sauce Labs Bike Light $9.99, 3. Sauce Labs Bolt T-Shirt $15.99, 4. Test.allTheThings() T-Shirt (Red) $15.99, 5. Sauce Labs Backpack $29.99, 6. Sauce Labs Fleece Jacket $49.99
    - expect: All 6 products are visible
    - expect: Each product price matches its displayed label

#### 1.4. TC-SORT-004 – Sort by Price (high to low)

**File:** `tests/e2e/inventory-sorting.spec.ts`

**Steps:**
  1. Log in as standard_user and navigate to the inventory page
    - expect: The inventory page is loaded
  2. Open the sort dropdown and select 'Price (high to low)'
    - expect: The dropdown label updates to 'Price (high to low)'
  3. Read the names and prices of all products in their new displayed order
    - expect: Products appear in order: 1. Sauce Labs Fleece Jacket $49.99, 2. Sauce Labs Backpack $29.99, 3. Sauce Labs Bolt T-Shirt $15.99, 4. Test.allTheThings() T-Shirt (Red) $15.99, 5. Sauce Labs Bike Light $9.99, 6. Sauce Labs Onesie $7.99
    - expect: All 6 products are visible
    - expect: Each product price matches its displayed label

#### 1.5. TC-SORT-005 – Cycling through all four sort options

**File:** `tests/e2e/inventory-sorting.spec.ts`

**Steps:**
  1. Log in as standard_user and navigate to the inventory page
    - expect: The inventory page is loaded with default 'Name (A to Z)' order
  2. Select 'Name (Z to A)' from the sort dropdown
    - expect: Product list re-renders immediately in Z-to-A alphabetical order without a page reload
  3. Select 'Price (low to high)' from the sort dropdown
    - expect: Product list re-renders immediately in ascending price order
  4. Select 'Price (high to low)' from the sort dropdown
    - expect: Product list re-renders immediately in descending price order
  5. Select 'Name (A to Z)' from the sort dropdown
    - expect: Product list re-renders immediately in A-to-Z alphabetical order
    - expect: Order matches the original default order from TC-SORT-001

#### 1.6. TC-SORT-006 – Sort order preserved after adding an item to cart

**File:** `tests/e2e/inventory-sorting.spec.ts`

**Steps:**
  1. Log in as standard_user and navigate to the inventory page
    - expect: The inventory page is loaded
  2. Select 'Price (high to low)' from the sort dropdown
    - expect: Sauce Labs Fleece Jacket appears first in the list
  3. Click 'Add to cart' on Sauce Labs Fleece Jacket (first product)
    - expect: Cart badge shows '1'
    - expect: The button changes to 'Remove'
    - expect: The dropdown still displays 'Price (high to low)'
    - expect: Product order remains unchanged with Fleece Jacket first and Onesie last

#### 1.7. TC-SORT-007 – Sort order preserved after removing an item from cart

**File:** `tests/e2e/inventory-sorting.spec.ts`

**Steps:**
  1. Log in as standard_user and navigate to the inventory page
    - expect: The inventory page is loaded
  2. Select 'Name (Z to A)' from the sort dropdown
    - expect: Test.allTheThings() T-Shirt (Red) appears first
  3. Click 'Add to cart' on Test.allTheThings() T-Shirt (Red)
    - expect: Cart badge shows '1'
  4. Click 'Remove' on Test.allTheThings() T-Shirt (Red)
    - expect: Cart badge disappears (cart is empty)
    - expect: The dropdown still displays 'Name (Z to A)'
    - expect: Product order remains unchanged with Test.allTheThings() first

#### 1.8. TC-SORT-008 – Sort resets to default after page reload

**File:** `tests/e2e/inventory-sorting.spec.ts`

**Steps:**
  1. Log in as standard_user and navigate to the inventory page
    - expect: The inventory page loads with 'Name (A to Z)' as default sort
  2. Select 'Price (low to high)' from the sort dropdown
    - expect: Product list re-orders in ascending price order
  3. Reload the page via browser refresh
    - expect: The dropdown resets to 'Name (A to Z)'
    - expect: Products are displayed in A-to-Z alphabetical order
    - expect: Sort selection is not persisted across page reloads

#### 1.9. TC-SORT-009 – All products present under every sort option

**File:** `tests/e2e/inventory-sorting.spec.ts`

**Steps:**
  1. Log in as standard_user and navigate to the inventory page
    - expect: 6 products are visible with default sort
  2. Select 'Name (Z to A)' and count visible product items
    - expect: Exactly 6 products are displayed
  3. Select 'Price (low to high)' and count visible product items
    - expect: Exactly 6 products are displayed with no duplicates
  4. Select 'Price (high to low)' and count visible product items
    - expect: Exactly 6 products are displayed with no duplicates

#### 1.10. TC-SORT-010 – Tie-breaking consistency for equal-price items

**File:** `tests/e2e/inventory-sorting.spec.ts`

**Steps:**
  1. Log in as standard_user and navigate to the inventory page
    - expect: The inventory page is loaded
  2. Select 'Price (low to high)' and note the relative order of Sauce Labs Bolt T-Shirt and Test.allTheThings() T-Shirt (Red) (both $15.99)
    - expect: Both items appear at positions 3 and 4; note which is first
  3. Select 'Price (high to low)' and note the relative order of the same two items
    - expect: Both items appear at positions 3 and 4
  4. Select 'Price (low to high)' again and observe the relative order of the two $15.99 items
    - expect: The relative order of the two equal-price items is the same as the first 'Price (low to high)' selection
    - expect: There is no random shuffling of equal-price items between repeated selections
