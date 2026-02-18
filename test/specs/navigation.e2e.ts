/**
 * Navigation scenario
 *
 * This test verifies basic navigation flow:
 * - user can move from Login screen to Registration screen
 * - Registration screen loads correctly
 *
 * Business requirement covered:
 * User should be able to access registration from login.
 */

import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';

describe('Navigation', () => {

  it('should navigate from Login to Registration screen', async () => {

    // 1. Wait for Login screen
    await LoginPage.waitForLoaded();

    // 2. Click "Don't have an account? Register"
    await LoginPage.goToRegister();

    // 3. Validate Registration screen is displayed
    await RegistrationPage.waitForLoaded();
  });

});
