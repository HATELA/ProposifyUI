import { expect, Locator, Page } from '@playwright/test';
import testdata from "../../testdata.json";

export class LoginPage {
    private page: Page;
    username_textbox: Locator;
    password_textbox: Locator;
    login_button: Locator
    

    // Actions
    async navigateToLoginPage(): Promise<void> {
    await this.page.goto('/login');
    }

    constructor(page: Page) {
        this.page = page;
    }

    private async initialize() {
        this.username_textbox = this.page.locator('[name="email"]')
        this.password_textbox = this.page.locator('[name="password"]')
        this.login_button = this.page.getByRole('button', { name: 'Login' })
    }

    static async getInstance(page) {
        const instance = new LoginPage(page);
        await instance.initialize();
        return instance;
    }

 async loginToProposify() {
        let email: string;
        let password: string;

        // Check if we are running on github
        if (process.env.CI) {
            // Using github secrets
            email = process.env.TEST_EMAIL ?? '';
            password = process.env.TEST_PASSWORD ?? '';

            if (!email || !password) {
                throw new Error('Email/Username or Password are missing in github actions secrets');
            }
        } else {
            // Use local credentials from testdata.json
            email = testdata.email;
            password = testdata.password;
        }

        if (!email || !password) {
            throw new Error('Email/&password are missing.');
        }

        // Fill in the login form
        await expect(this.username_textbox).toBeVisible({ timeout: 20000 });
        await this.username_textbox.fill(email);
        await expect(this.password_textbox).toBeVisible({ timeout: 20000 });
        await this.password_textbox.fill(password);

        await this.login_button.click();
    }
}