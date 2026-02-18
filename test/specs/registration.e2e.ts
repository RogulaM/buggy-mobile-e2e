/**
 * Registration - happy path scenario
 *
 * This test verifies that:
 * - user can successfully register
 * - after registration user is automatically logged in
 * - Job Offers screen is displayed
 *
 * Business requirement covered:
 * Valid user registration should create an account
 * and redirect user to main offers screen.
 */

import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import OffersPage from '../pages/OffersPage';
import { generateUser } from '../utils/testData';

describe('Registration', () => {

  it('should register successfully and auto login user', async () => {

    // Generate unique user to prevent duplication issues
    const user = generateUser();

    // 1. Navigate to Registration screen
    await LoginPage.waitForLoaded();
    await LoginPage.goToRegister();

    // 2. Fill registration form with valid data
    await RegistrationPage.waitForLoaded();
    await RegistrationPage.fill(user.email, user.password, user.password);

    // 3. Submit registration form
    await RegistrationPage.submit();

    // 4. Validate successful redirection to Job Offers
    await OffersPage.waitForLoaded();
  });

});
