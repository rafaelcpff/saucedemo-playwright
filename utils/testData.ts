export const FAKE_STORE_API_BASE = 'https://fakestoreapi.com';

export const credentials = {
    standardUser: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
} as const;

export const checkoutUser = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '80000-000',
} as const;

export const productNames = {
    sauceLabsBackpack: 'Sauce Labs Backpack',
} as const;