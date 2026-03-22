# SauceDemo Login Test Plan

## Application Overview

Test plan for the SauceDemo login page (https://www.saucedemo.com). Covers UI element validation, valid login flows for multiple user types, invalid login error handling, error message dismissal, and logout functionality.

## Test Scenarios

### 1. UI Elements

**Seed:** `tests/e2e/seed.spec.ts`

#### 1.1. should display login form elements

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
    - expect: Swag Labs logo is visible
    - expect: Username input field is visible
    - expect: Password input field is visible
    - expect: Login button is visible

#### 1.2. should have correct placeholder text

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Inspect placeholder attributes on username and password inputs
    - expect: Username field has placeholder 'Username'
    - expect: Password field has placeholder 'Password'

### 2. Valid Login

**Seed:** `tests/e2e/seed.spec.ts`

#### 2.1. should login with standard user and redirect to inventory

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Enter username 'standard_user' and password 'secret_sauce'
  3. Click the Login button
    - expect: User is redirected to /inventory.html
    - expect: Products page title is visible

#### 2.2. should show products after successful login

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login as standard_user / secret_sauce
  2. Observe the inventory page
    - expect: At least one product item is displayed on the page

### 3. Invalid Login

**Seed:** `tests/e2e/seed.spec.ts`

#### 3.1. should show error for locked out user

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Enter username 'locked_out_user' and password 'secret_sauce', then click Login
    - expect: Error message is visible
    - expect: Error text contains 'Sorry, this user has been locked out'

#### 3.2. should show error for invalid credentials

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Enter username 'invalid_user' and password 'wrong_password', then click Login
    - expect: Error message is visible
    - expect: Error text contains 'Username and password do not match'

#### 3.3. should show error for empty username

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Leave username empty, enter password 'secret_sauce', then click Login
    - expect: Error message is visible
    - expect: Error text contains 'Username is required'

#### 3.4. should show error for empty password

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Enter username 'standard_user', leave password empty, then click Login
    - expect: Error message is visible
    - expect: Error text contains 'Password is required'

#### 3.5. should allow clearing error messages

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Attempt login with invalid credentials to trigger error message
    - expect: Error message is visible
  3. Click the X (close) button on the error message
    - expect: Error message is no longer visible

### 4. Different User Types

**Seed:** `tests/e2e/seed.spec.ts`

#### 4.1. should login with problem user (UI bugs expected)

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
  2. Enter username 'problem_user' and password 'secret_sauce', then click Login
    - expect: Login succeeds and user is redirected to /inventory.html
    - expect: Note: product images and interactions may display incorrectly due to known UI bugs

### 5. Logout Flow

**Seed:** `tests/e2e/seed.spec.ts`

#### 5.1. should logout successfully and return to login page

**File:** `tests/e2e/login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com and login as standard_user / secret_sauce
  2. Click the burger menu (☰) in the top-left of the inventory page
    - expect: Sidebar menu opens
  3. Click 'Logout' in the sidebar
    - expect: User is redirected back to the login page
    - expect: Login form is visible
    - expect: URL does not contain /inventory.html
