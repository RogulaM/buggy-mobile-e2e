/**
 * History scenario
 *
 * This test verifies that:
 * - user can apply to a job offer
 * - applied job appears in Profile history
 *
 * Business requirement covered:
 * After applying to an offer, it should be visible
 * in the user's application history.
 */

import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import OffersPage from '../pages/OffersPage';
import { generateUser } from '../utils/testData';

/**
 * Helper function to extract job title and location
 * from snackbar message.
 *
 * Example snackbar:
 * "Applied to Senior QA Engineer - Warsaw"
 */
function parseSnackbar(snackbar: string) {
  const prefix = 'Applied to ';
  const dash = ' - ';

  const cleaned = snackbar.startsWith(prefix)
    ? snackbar.slice(prefix.length)
    : snackbar;

  const parts = cleaned.split(dash);

  const title = parts[0]?.trim() ?? '';
  const location = parts[1]?.trim() ?? '';

  return { title, location };
}

describe('History', () => {

  it('should show applied job in profile history', async () => {

    // Generate unique user for isolated test execution
    const user = generateUser();

    // 1. Navigate to Registration
    await LoginPage.waitForLoaded();
    await LoginPage.goToRegister();

    // 2. Register user
    await RegistrationPage.waitForLoaded();
    await RegistrationPage.fill(user.email, user.password, user.password);
    await RegistrationPage.submit();

    // 3. Apply to first offer
    await OffersPage.clickApplyOnFirstCard();
    await OffersPage.selectFirstLocationIfPopupVisible();
    await OffersPage.waitForSnackbar();

    const snackbar = await OffersPage.getSnackbarText();

    // Ensure snackbar exists
    expect(snackbar.length).toBeGreaterThan(0);

    // Extract job title from snackbar
    const { title } = parseSnackbar(snackbar);
    expect(title.length).toBeGreaterThan(0);

    // 4. Navigate to Profile
    await OffersPage.openProfile();

    /**
     * 5. Verify that history contains applied job.
     * 
     * Instead of relying on fragile XPath,
     * we search by business value (job title).
     */
    const byDesc = $(`//*[contains(@content-desc,"${title}")]`);
    const byText = $(`//*[contains(@text,"${title}")]`);

    await driver.waitUntil(
      async () =>
        (await byDesc.isDisplayed().catch(() => false)) ||
        (await byText.isDisplayed().catch(() => false)),
      {
        timeout: 15000,
        timeoutMsg: `History entry with title "${title}" not found`
      }
    );

  });

});
