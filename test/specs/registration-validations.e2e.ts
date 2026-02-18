/**
 * Registration - validation scenarios
 *
 * This test suite verifies that:
 * - invalid email format is rejected
 * - password shorter than required length is rejected
 * - mismatched passwords are rejected
 *
 * Business requirement covered:
 * Registration form must validate input data
 * and prevent user creation with invalid values.
 */

import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';

describe('Registration - validations', () => {

  /**
   * Ensures that each test starts on the Registration screen.
   *
   * Why:
   * - after previous tests the app can be on different screens
   * - some flows auto-login and skip Login screen
   * - we want deterministic test setup
   */
  async function ensureOnRegisterScreen() {
    const registerBtn = $('~Register');
    const loginBtn = $('~Login');

    // 1) Already on Registration
    if (await registerBtn.isDisplayed().catch(() => false)) {
      return;
    }

    // 2) On Login -> go to Register
    if (await loginBtn.isDisplayed().catch(() => false)) {
      await LoginPage.goToRegister();
      await RegistrationPage.waitForLoaded();
      return;
    }

    /**
     * 3) Unknown screen state -> restart app (most reliable)
     * Use appPackage from capabilities if available.
     */
    const caps: any = driver.capabilities;
    const pkg =
      caps['appium:appPackage'] ||
      caps.appPackage ||
      (await driver.getCurrentPackage());

    // Restart app safely
    try { await driver.terminateApp(pkg); } catch (e) {}
    try { await driver.activateApp(pkg); } catch (e) {}

    // After restart we should land on Login -> navigate to Register
    await LoginPage.waitForLoaded();
    await LoginPage.goToRegister();
    await RegistrationPage.waitForLoaded();
  }

  beforeEach(async () => {
    await ensureOnRegisterScreen();
  });

  it('invalid email should not allow registration', async () => {
    await RegistrationPage.fill('invalid-email', 'Test12345', 'Test12345');
    await RegistrationPage.submit();

    // If validation works, user stays on Registration screen
    await $('~Register').waitForDisplayed({ timeout: 5000 });
  });

  it('short password should not allow registration', async () => {
    await RegistrationPage.fill('test@test.com', '1234567', '1234567');
    await RegistrationPage.submit();

    await $('~Register').waitForDisplayed({ timeout: 5000 });
  });

  it('different confirm password should not allow registration', async () => {
    await RegistrationPage.fill('test@test.com', 'Test12345', 'Different123');
    await RegistrationPage.submit();

    await $('~Register').waitForDisplayed({ timeout: 5000 });
  });

});
