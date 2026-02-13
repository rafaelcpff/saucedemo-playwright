# Project Roadmap

Improvements and suggestions for the Playwright SauceDemo framework, to be implemented in the future.

---

## 1. Test coverage & scenarios

- **Login**
    - Negative: invalid credentials, locked user (`locked_out_user`), empty fields.
    - Logout flow and redirect back to login.
- **Products**
    - Sort (A-Z, Z-A, price low-high, high-low) and assert order.
    - Multiple items: add several products, assert badge count and cart contents.
    - Remove from cart on products page and assert badge updates.
- **Cart**
    - Empty cart state (no items, appropriate message).
    - Continue shopping link back to inventory.
- **Checkout**
    - Field-level validation (e.g. postal code format, required fields).
    - Cancel from checkout steps and return to cart/products.
    - Order summary: assert items and total before finishing.
- **API**
    - More FakeStore endpoints.
    - Response schema validation (e.g. with Soz or JSON schema).
    - Error cases: 404, invalid IDs.

## 2. Framework & tooling

- **Fixtures**
    - Authenticated fixture: `test.extend()` with pre-logged-in `page` (and optional storage state) so tests that need auth don't repeat login in `beforeEach`.
    - Reuse storage state (e,g, `storageState`) for faster authenticated runs.
- **Environment config**
    - Enable `.env` (e.g. via `dotenv`) for `BASE_URL`, credentials, and API base URL so local/staging/CI can differ without code changes.
- **TypeScript**
    - Stricter `tsconfig.json` (e.g. `strict: true`) and resolve any new type issues.
- **Linting & format**
    - ESLint rules for Playwright (e.g. no `page.click` without waiting, prefer role/label/testId).
    - Pre-commit hooks (husky + lint-staged) to run lint and tests on changed specs.

## 3. Page objects & maintainability

- **Base page**
    - Shared helpers: wait for network idle, dismiss modals, common header/footer actions.
    - Optional base URL from config/env inside `BasePage.goto()`.
- **Component objects**
    - Reusable components (e.g. `Header`, `ProductCard`, `CartItem`) used inside page objects to reduce duplication and keep locators in one place.
- **Assertions in POM**
    - Add more page-level assertions helpers to keep specs readable and consistent.

## 4. CI/CD

- **Pipeline**
    - GitHub Actions to run `npm ci` and `npx playwright test` on push/PR.
    - Upload Playwright report as artifacts.
    - Optional: run only affected tests or smoke subset on PR; full suite on main.
- **Matrix**
    - Run projects (chromium, firefox, webkit) in parallel in CI.
- **Slack/Teams**
    - Notify on failure with link to report or dashboard.

## 5. Reporting & visibility

- **Reporters**
    - Add `list` or `line` reporter for CI logs; keep `html` for local and artifact review.
- **Screenshots/videos**
    - `screenshot: 'only-on-failure'` and `video: 'retain-on-failure` to debug flaky/failing tests.

