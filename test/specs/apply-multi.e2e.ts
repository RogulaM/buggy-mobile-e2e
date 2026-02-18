/**
 * Apply - multi location scenario
 * 
 * This test verifies that:
 * - user can apply to a job offer
 * - multi-location popup (if present) is handled correctly
 * - confirmation snackbar is displayed
 * 
 * The test is written to support both:
 * - single-location offers
 * - multi-location offers
 */

import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import OffersPage from '../pages/OffersPage';
import { generateUser } from '../utils/testData';

describe('Apply - multi location', () => {

  it('should apply to multi-location offer by choosing a location and show snackbar', async () => {

    // Generate unique user to avoid conflicts
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

    // 4. Click Apply on first offer
    await OffersPage.clickApplyOnFirstCard();

    /**
     * 5. Handle multi-location popup.
     * 
     * If popup appears → select first location.
     * If not → offer has single location and flow continues automatically.
     */
    await OffersPage.selectFirstLocationIfPopupVisible();

    // 6. Validate that confirmation snackbar appears
    await OffersPage.waitForSnackbar();

    const snackbarText = await OffersPage.getSnackbarText();

    // Basic business validation
    expect(snackbarText.length).toBeGreaterThan(0);
    expect(snackbarText).toContain('Applied to');
  });

});
