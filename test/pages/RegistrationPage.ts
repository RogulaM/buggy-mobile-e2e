/**
 * RegistrationPage represents the Registration screen.
 * 
 * It provides:
 * - selectors for registration form fields
 * - form submission logic
 * - screen load validation
 * 
 * This page is used to:
 * - register new users
 * - test validation scenarios
 */
export class RegistrationPage {

  /**
   * Email input field.
   */
  get emailInput() {
    return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
  }

  /**
   * Password input field.
   */
  get passwordInput() {
    return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
  }

  /**
   * Confirm password input field.
   */
  get confirmPasswordInput() {
    return $('android=new UiSelector().className("android.widget.EditText").instance(2)');
  }

  /**
   * Register button.
   * Located using accessibility id for stability.
   */
  get registerButton() {
    return $('~Register');
  }

  /**
   * Waits until Registration screen is fully loaded.
   * 
   * Register button is used as screen readiness indicator.
   */
  async waitForLoaded() {
    await this.registerButton.waitForDisplayed({ timeout: 10000 });
  }

  /**
   * Fills registration form with provided data.
   * 
   * Values are cleared before typing to avoid
   * unexpected value concatenation.
   */
  async fill(email: string, password: string, confirmPassword: string) {
    await this.emailInput.click();
    try { await this.emailInput.clearValue(); } catch (e) {}
    await this.emailInput.setValue(email);

    await this.passwordInput.click();
    try { await this.passwordInput.clearValue(); } catch (e) {}
    await this.passwordInput.setValue(password);

    await this.confirmPasswordInput.click();
    try { await this.confirmPasswordInput.clearValue(); } catch (e) {}
    await this.confirmPasswordInput.setValue(confirmPassword);

    try { await driver.hideKeyboard(); } catch (e) {}
  }

  /**
   * Submits registration form.
   */
  async submit() {
    await this.registerButton.click();
  }
}

export default new RegistrationPage();
