# Playwright SauceDemo Test Project

Playwright TypeScript test suite for [SauceDemo](https://www.saucedemo.com/) using the Page Object Model (POM). Includes cross-browser UI tests and API tests agains FakeStore API.

## Setup

```bash
npm install
```

## Running Tests

- **All tests (Chromium, Firefox, WebKit):**
    ```bash
    npx playwright test
    ```

- **Headed mode (see browser):**
    ```bash
    npx playwright test --headed
    ```

- **Single browser project:**
    ```bash
    npx playwright test --project=chromium
    npx playwright test --project=firefox
    npx playwright test --project=webkit
    ```

- **UI or API only:**
    ```bash
    npx playwright test tests/ui.spec.ts
    npx playwright test tests/api.spec.ts

- **Report:**
    ```bash
    npx playwright show-report
    ```
    (after a run; report is also generated in `playwright-report/`)

## Project Structure

- `playwright.config.ts` - baseURL, testIdAttribute, Chromium/Firefox/WebKit projects
- `pages/` - Page Object Model
    - `BasePage.ts` - base with `goto()`
    - `LoginPage.ts` - `login(username, password)`
    - `ProductPage.ts` - `addToCartByName()`, `goToCart()`, `checkCartEmpty()`
    - `CartPage.ts` - `assertItemVisible()`, `removeItemByName()`, `goToCheckout()`
    - `CheckoutPage.ts` - `fillInInformation()`, `continue()`, `finish()`, error/completion assertions
- `tests/`
    - `ui.spec.ts` - Login happy path, add to cart + cart content, checkout (validation + completion)
    - `api.spec.ts` - FakeStore API: GET `/products`, GET `/carts/1`
- `utils/`
    - `testData.ts` - baseURL, credentials, checkout user, product names

## Test Scenarios

### UI (SauceDemo)

1. **Login** - Standard user login -> products page with inventory list visible.
2. **Cart** - Add "Sauce Labs Backpack" -> cart badge shows 1 -> open cart -> item visible.
3. **Checkout** - 
    - Click Continue with empty form -> error message visible.
    - Fill first/last/postal code -> continue -> "thank you for your order" visible.

## API (FakeStore API)
    - `GET /products` - 200, response is array with at elast one object having `id`, `title`, `price`.
    - `GET /carts/1` - 200, response has `products` array; items have `productId` and `quantity` (when non-empty).

## Assumptions & Limitations

- **SauceDemo** has no public cart/checkout API; UI tests only. Credentials: `standard_user` / `secret_sauce`.
- **API tests** use [FakeStore API](https://fakestoreapi.com/) (separate from sauceDemo) to demonstrate Playwright `request` context.
- **Locators** use `data-test` attributes where available; `testIdAttribute: 'data-test'` is set in config so `getByTestId()` works.
- **Test isolation** - Cart tests use `checkCartEmpty()` before adding the backpack so the badge and cart state are predictable.
- **No hard sleeps** - Tests rely on Playwright auto-wait and `expect()`.
