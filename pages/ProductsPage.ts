import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {

    readonly inventoryList: Locator;
    readonly inventoryItem: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;


    constructor(page: Page) {
        super(page);
        this.inventoryList = page.getByTestId('inventory-list');
        this.inventoryItem = page.locator('.inventory_item');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link');
    }

    async expectInventoryListVisible() {
        await this.inventoryList.waitFor({ state: 'visible' });
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async addToCartByName(productName: string) {
        const item = this.inventoryItem.filter({ hasText: productName });
        await item.getByRole('button', { name: /add to cart/i }).click();
    }

    async removeFromCartByName(productName: string) {
        const item = this.inventoryItem.filter({ hasText: productName });
        await item.getByRole('button', { name: /remove/i }).click();
    }

    async checkCartEmpty() {
        const badge = this.cartBadge;
        if (await badge.isVisible()) {
            const count = await badge.textContent();
            const n = parseInt(count ?? '0', 10);
            for (let i = 0; i < n; i++) {
                await this.page.getByRole('button', { name: /remove/i }).first().click();
            }
        }
    }
}