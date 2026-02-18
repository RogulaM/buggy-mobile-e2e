/**
 * LoginPage represents the Login screen of the application.
 * 
 * It follows the Page Object Model (POM) pattern:
 * - stores UI selectors
 * - provides reusable actions for login flow
 * - separates test logic from UI interaction
 */
export class LoginPage {

    /**
     * Email input field (first EditText on screen)
     */
    get emailInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    /**
     * Password input field (second EditText on screen)
     */
    get passwordInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    /**
     * Login button located by accessibility id.
     * Accessibility id is preferred because it is more stable than XPath.
     */
    get loginButton() {
        return $('~Login');
    }

    /**
     * Link that navigates to the Registration screen.
     */
    get registerLink() {
        return $('~Don\'t have an account? Register');
    }

    /**
     * Waits until the Login screen is fully loaded.
     * 
     * The Login button is used as a reliable indicator
     * that the screen is ready for interaction.
     */
    async waitForLoaded() {
        await this.loginButton.waitForDisplayed({ timeout: 10000 });
    }

    /**
     * Navigates from Login screen to Registration screen.
     */
    async goToRegister() {
        await this.registerLink.click();
    }

    /**
     * Performs login with given credentials.
     * 
     * Steps:
     * 1. Wait for email field
     * 2. Clear any previous value (prevents value concatenation)
     * 3. Type email
     * 4. Clear and type password
     * 5. Hide keyboard (if visible)
     * 6. Click login button
     * 
     * Clearing values increases test stability.
     */
    async login(email: string, password: string) {
        await this.emailInput.waitForDisplayed({ timeout: 10000 });

        await this.emailInput.click();
        try { await this.emailInput.clearValue(); } catch (e) {}
        await this.emailInput.setValue(email);

        await this.passwordInput.click();
        try { await this.passwordInput.clearValue(); } catch (e) {}
        await this.passwordInput.setValue(password);

        // Hiding keyboard prevents UI overlay issues
        try { await driver.hideKeyboard(); } catch (e) {}

        await this.loginButton.click();
    }
}

export default new LoginPage();