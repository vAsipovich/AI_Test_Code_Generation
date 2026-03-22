# Login Fixture Plan

## Application Overview

Plan for adding login fixtures to BaseTest.ts to support authenticated sessions for different SauceDemo user types. Fixtures cover: pre-authenticated inventory page access for standard_user, problem_user, and performance_glitch_user, plus credential-only fixtures for locked_out_user and error_user to support negative testing and manual login flows.

## Test Scenarios

### 1. Authentication Fixtures

**Seed:** `tests/e2e/seed.spec.ts`

#### 1.1. authenticatedStandardUser — logs in and lands on inventory page

**File:** `tests/e2e/inventory-authenticated.spec.ts`

**Steps:**
  1. Use the authenticatedStandardUser fixture (navigates to login page, fills standard_user credentials, submits, waits for inventory page load)
    - expect: InventoryPage instance is available
    - expect: URL contains /inventory.html
    - expect: Inventory container is visible
  2. Run an inventory-level assertion or action (e.g. addProductToCart)
    - expect: Test operates directly on the authenticated inventory page without repeating login steps

#### 1.2. authenticatedProblemUser — logs in as problem_user for UI bug scenarios

**File:** `tests/e2e/inventory-authenticated.spec.ts`

**Steps:**
  1. Use the authenticatedProblemUser fixture (navigates to login page, fills problem_user credentials, submits, waits for inventory page load)
    - expect: InventoryPage instance is available
    - expect: URL contains /inventory.html
    - expect: Inventory container is visible (known UI bugs may be present)

#### 1.3. authenticatedPerformanceUser — logs in as performance_glitch_user

**File:** `tests/e2e/inventory-authenticated.spec.ts`

**Steps:**
  1. Use the authenticatedPerformanceUser fixture (navigates to login page, fills performance_glitch_user credentials, submits, waits for inventory page load)
    - expect: InventoryPage instance is available
    - expect: URL contains /inventory.html
    - expect: Inventory container is visible despite potential delays

### 2. Credential Fixtures

**Seed:** `tests/e2e/seed.spec.ts`

#### 2.1. standardUserCredentials — provides username and password for standard_user

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Destructure username and password from standardUserCredentials fixture
    - expect: username equals 'standard_user' (or TEST_USER_USERNAME env var)
    - expect: password equals 'secret_sauce' (or TEST_USER_PASSWORD env var)

#### 2.2. lockedOutUserCredentials — provides credentials for negative login tests

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Destructure username and password from lockedOutUserCredentials fixture
    - expect: username equals 'locked_out_user'
    - expect: password equals 'secret_sauce'
  2. Use credentials to attempt login via loginPage.login()
    - expect: Error message is visible
    - expect: Error text contains 'Sorry, this user has been locked out'

#### 2.3. errorUserCredentials — provides credentials for error scenario tests

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Destructure username and password from errorUserCredentials fixture
    - expect: username equals 'error_user'
    - expect: password equals 'secret_sauce'

### 3. BaseTest.ts Changes

**Seed:** `tests/e2e/seed.spec.ts`

#### 3.1. AppFixtures interface — add new fixture type declarations

**File:** `src/fixtures/BaseTest.ts`

**Steps:**
  1. Add authenticatedStandardUser, authenticatedProblemUser, authenticatedPerformanceUser typed as InventoryPage to AppFixtures
    - expect: TypeScript consumers get full autocomplete for the returned InventoryPage
  2. Add standardUserCredentials, problemUserCredentials, performanceUserCredentials, lockedOutUserCredentials, errorUserCredentials typed as SauceDemoCredentials to AppFixtures
    - expect: TypeScript consumers get full autocomplete for the returned SauceDemoCredentials

#### 3.2. Import envHelper helpers in BaseTest.ts

**File:** `src/fixtures/BaseTest.ts`

**Steps:**
  1. Add import of getStandardUser, getLockedOutUser, getProblemUser, getPerformanceUser, getErrorUser, SauceDemoCredentials from '../utils/envHelper'
    - expect: All credential helpers are available inside fixture definitions
