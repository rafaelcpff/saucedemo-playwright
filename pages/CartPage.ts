import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

    readonly cartItem: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItem = page.locator('.cart_item');
        this.checkoutButton = page.getByTestId('checkout');
    }

    async assertItemVisible(productName: string) {
        await this.cartItem
            .filter({ hasText: productName })
            .waitFor({ state: 'visible'})
    }

    async removeItemByName(productName: string) {
        const suffix = productName.toLowerCase().replace(/\s+/g, '-');
        await this.page.getByTestId(`remove-${suffix}`).click();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

}