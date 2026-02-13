import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly errorMessage: Locator;
    readonly completionMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCode = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.finishButton = page.getByTestId('finish');
        this.errorMessage = page.getByTestId('error');
        this.completionMessage = page.getByRole('heading', { name: /thank you for your order/i });
    }

    async fillInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async continue() {
        await this.continueButton.click();
    }

    async finish() {
        await this.finishButton.click();
    }

}