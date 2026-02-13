import { test, expect } from '@playwright/test';
import { FAKE_STORE_API_BASE } from '../utils/testData';

test.describe('FakeStore API', () => {
    test('GET /products returns 200 and array contains at least one item with id, title, price', async ({ request }) => {
        const response = await request.get(`${FAKE_STORE_API_BASE}/products`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);

        const firstProduct = body[0];
        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('title');
        expect(firstProduct).toHaveProperty('price');
        expect(firstProduct).toHaveProperty('description');
        expect(firstProduct).toHaveProperty('category');
        expect(firstProduct).toHaveProperty('image');
    });

    test('GET /carts/1 returns 200 and has products with productId and quantity', async({ request }) => {
        const response = await request.get(`${FAKE_STORE_API_BASE}/carts/1`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBe(true);

        if (body.products.length > 0) {
            const firstProduct = body.products[0];
            expect(firstProduct).toHaveProperty('productId');
            expect(firstProduct).toHaveProperty('quantity');
        }
    });
});