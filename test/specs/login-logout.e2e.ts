/**
 * Login / Logout scenario
 *
 * This test verifies that:
 * - user can register
 * - user can logout
 * - user can login again using the same credentials
 *
 * Business requirement covered:
 * Authentication flow should properly manage session state.
 */

import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import OffersPage from '../pages/OffersPage';
import ProfilePage from '../pages/ProfilePage';
import { generateUser } from '../utils/testData';

describe('Login / Logout', () => {

  it('should allow user to logout and login again with registered credentials', async () => {

    // Generate unique user to avoid data conflicts
    const user = generateUser();

    // 1. Navigate to Registration
    await LoginPage.waitForLoaded();
    await LoginPage.goToRegister();

    // 2. Register new user
    await RegistrationPage.waitForLoaded();
    await RegistrationPage.fill(user.email, user.password, user.password);
    await RegistrationPage.submit();

    // 3. Wait for Job Offers screen
    await OffersPage.waitForLoaded();

    // 4. Open profile and logout
    await OffersPage.openProfile();
    await ProfilePage.waitForLoaded();
    await ProfilePage.logout();

    // 5. Verify we are back on Login screen
    await LoginPage.waitForLoaded();
    await LoginPage.registerLink.waitForDisplayed({ timeout: 5000 });

    // 6. Login again using same credentials
    await LoginPage.login(user.email, user.password);

    // 7. Validate successful login
    await OffersPage.waitForLoaded();
  });

});
