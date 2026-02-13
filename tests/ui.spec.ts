import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { credentials, checkoutUser, productNames } from '../utils/testData';


test.describe('Login', () => {
    test('happy path -> products page visible with inventory list', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        await loginPage.login(
            credentials.standardUser.username,
            credentials.standardUser.password
        );
        await productsPage.expectInventoryListVisible();
    })
});

test.describe('Cart', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(
            credentials.standardUser.username,
            credentials.standardUser.password
        );
    });

    test('add Sauce Labs Backpack -> badge shows 1 -> cart contains item', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.checkCartEmpty();
        await productsPage.addToCartByName(productNames.sauceLabsBackpack);
        await expect(productsPage.cartBadge).toHaveText('1');

        await productsPage.goToCart();
        await cartPage.assertItemVisible(productNames.sauceLabsBackpack);
    });
});

test.describe('Checkout', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        await loginPage.login(
            credentials.standardUser.username,
            credentials.standardUser.password
        );
        await productsPage.checkCartEmpty();
        await productsPage.addToCartByName(productNames.sauceLabsBackpack);
        await productsPage.goToCart();
    });

    test('continue with empty form -> error shown', async ({ page }) => {
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await cartPage.goToCheckout();
        await checkoutPage.continue();
        await expect(checkoutPage.errorMessage).toBeVisible();
    });

    test('fill form and complete -> confirmation message', async ({ page }) => {
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await cartPage.goToCheckout();
        await checkoutPage.fillInformation(
            checkoutUser.firstName,
            checkoutUser.lastName,
            checkoutUser.postalCode
        );
        await checkoutPage.continue();
        await checkoutPage.finish();
        await expect(checkoutPage.completionMessage).toBeVisible();
    });
})