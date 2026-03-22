I'll create a comprehensive test automation framework update plan document for the test-generator agent. 

Create File

Since I can't create files directly, here's the comprehensive test automation framework update plan that you can save to `specs/tafUpdate.md`:

```markdown
# Test Automation Framework Update Plan for SauceDemo.com

## Overview
This document outlines the adaptation of the existing TypeScript + Playwright TAF skeleton to work with SauceDemo.com, including comprehensive login test scenarios.

## Target Application: SauceDemo.com
- **URL**: https://www.saucedemo.com
- **Type**: Demo e-commerce application for testing automation tools
- **Key Features**: Login system, product catalog, shopping cart, checkout process

## Framework Updates Required

### 1. Environment Configuration (.env.example)

```bash
BASE_URL=https://www.saucedemo.com
TEST_ENV=saucedemo
HEADLESS=true
TIMEOUT_MS=30000

# SauceDemo Test Users
TEST_USER_USERNAME=standard_user
TEST_USER_PASSWORD=secret_sauce
LOCKED_OUT_USER=locked_out_user
PROBLEM_USER=problem_user
PERFORMANCE_USER=performance_glitch_user
ERROR_USER=error_user
```

### 2. Page Objects Updates

#### LoginPage.ts Adaptations
- **URL Path**: `/` (root page)
- **Key Selectors**:
  - Login container: `[data-test="login-container"]`
  - Username input: `[data-test="username"]`
  - Password input: `[data-test="password"]`
  - Login button: `[data-test="login-button"]`
  - Error message: `[data-test="error"]`
  - Error close button: `[data-test="error-button"]`

#### New Page: InventoryPage.ts
- **URL Path**: `/inventory.html`
- **Purpose**: Post-login product catalog page
- **Key Selectors**:
  - Inventory container: `[data-test="inventory-container"]`
  - Page title: `.title` (contains "Products")
  - Shopping cart: `[data-test="shopping-cart-link"]`
  - Cart badge: `[data-test="shopping-cart-badge"]`
  - Burger menu: Button with "Open Menu"
  - Product items: `[data-test="inventory-item"]`
  - Add to cart buttons: Buttons with "add to cart" text

### 3. Utility Functions Enhancement

#### envHelper.ts Updates
- Add `SauceDemoCredentials` interface
- Add helper functions:
  - `getStandardUser()` - Returns standard_user credentials
  - `getLockedOutUser()` - Returns locked_out_user credentials  
  - `getProblemUser()` - Returns problem_user credentials
- Update `getConfig()` with SauceDemo defaults

### 4. Test Fixtures Updates

#### BaseTest.ts Enhancements
- Add `inventoryPage` fixture
- Maintain existing `loginPage` and `nav` fixtures
- Keep global setup/teardown hooks

## Comprehensive Login Test Scenarios

### Test Structure: login.spec.ts

#### 1. UI Elements Validation
- ✅ Login form visibility
- ✅ Swag Labs logo display
- ✅ Input field placeholder text
- ✅ Button accessibility

#### 2. Valid Login Scenarios
- ✅ Standard user successful login
- ✅ Redirect to inventory page verification
- ✅ Products loading confirmation
- ✅ URL change validation

#### 3. Invalid Login Scenarios
- ✅ Locked out user error handling
- ✅ Invalid credentials error messages
- ✅ Empty username field validation
- ✅ Empty password field validation
- ✅ Error message dismissal functionality

#### 4. Different User Types Testing
- ✅ Problem user login (UI bugs expected)
- ✅ Performance user scenarios
- ✅ Error user edge cases

#### 5. Logout Flow Testing
- ✅ Successful logout process
- ✅ Return to login page verification
- ✅ Session termination validation

## Implementation Priority

### Phase 1: Core Framework Updates
1. Update environment configuration
2. Adapt LoginPage.ts for SauceDemo selectors
3. Create InventoryPage.ts for post-login state
4. Update envHelper.ts with credential functions

### Phase 2: Test Implementation
1. Update BaseTest.ts fixtures
2. Implement comprehensive login test suite
3. Add negative testing scenarios
4. Include user type variations

### Phase 3: Enhancement & Validation
1. Run full test suite validation
2. Add performance and accessibility checks
3. Implement visual regression testing
4. Create CI/CD integration guidelines

## Test Data Management

### Built-in SauceDemo Users
| Username | Password | Expected Behavior |
|----------|----------|-------------------|
| `standard_user` | `secret_sauce` | Normal functionality |
| `locked_out_user` | `secret_sauce` | Login blocked with error |
| `problem_user` | `secret_sauce` | UI/UX issues present |
| `performance_glitch_user` | `secret_sauce` | Slow performance |
| `error_user` | `secret_sauce` | Error scenarios |

### Error Messages to Test
- "Sorry, this user has been locked out."
- "Username and password do not match any user in this service"
- "Username is required"
- "Password is required"

## Success Criteria

### Functional Requirements
- ✅ All login scenarios pass consistently
- ✅ Error handling works properly
- ✅ Page transitions are validated
- ✅ User session management functions correctly

### Technical Requirements
- ✅ TypeScript compilation without errors
- ✅ Playwright test execution stability
- ✅ Page Object Model pattern compliance
- ✅ Component Object Model implementation
- ✅ Proper logging and reporting

### Quality Metrics
- **Test Coverage**: 100% of login functionality
- **Test Reliability**: <2% flakiness rate
- **Execution Time**: <30s for full login suite
- **Maintainability**: Clear separation of concerns

## Future Enhancements

### Potential Expansions
1. **Shopping Cart Tests**: Add to cart, remove items, quantity updates
2. **Checkout Process**: Complete purchase flow testing
3. **Product Management**: Sorting, filtering, product details
4. **Visual Testing**: Screenshot comparisons for UI consistency
5. **API Testing**: Backend integration validation
6. **Mobile Testing**: Responsive design verification

### Framework Improvements
1. **Data-Driven Testing**: CSV/JSON test data integration
2. **Parallel Execution**: Multi-browser testing optimization
3. **Reporting Enhancement**: Allure or custom HTML reports
4. **CI Integration**: GitHub Actions or Jenkins pipeline setup

## Notes for Test-Generator Agent

### Key Patterns to Follow
- Always use `getByTestId`, `getByRole`, or `getByLabel` selectors
- Implement fluent page object methods
- Include comprehensive JSDoc comments
- Follow PascalCase for classes, camelCase for methods
- Use structured logging via `createLogger()`

### Common Pitfalls to Avoid
- Don't use CSS selectors or XPath
- Avoid hard-coded waits (use `waitFor` methods)
- Don't skip error handling in page objects
- Avoid test interdependencies
- Don't commit sensitive data in version control

### Testing Best Practices
- Test one thing at a time
- Use descriptive test names
- Include both positive and negative scenarios
- Validate both UI state and URL changes
- Clean up test state between runs
```

Copy this content and save it to [specs/tafUpdate.md](specs/tafUpdate.md) for future reference by your test-generator agent. This comprehensive plan includes all the framework adaptations, test scenarios, implementation priorities, and best practices needed to successfully update the TAF for SauceDemo.com testing.Copy this content and save it to [specs/tafUpdate.md](specs/tafUpdate.md) for future reference by your test-generator agent. This comprehensive plan includes all the framework adaptations, test scenarios, implementation priorities, and best practices needed to successfully update the TAF for SauceDemo.com testing.