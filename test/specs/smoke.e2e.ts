/**
 * Smoke test
 *
 * This test verifies that:
 * - application launches successfully
 * - Login screen is displayed
 *
 * Purpose:
 * Provide a fast sanity check before running
 * the full E2E regression suite.
 *
 * This test does not validate business logic.
 * It only confirms that the basic app flow works.
 */

import LoginPage from '../pages/LoginPage';

describe('Smoke', () => {

  it('should launch application and display Login screen', async () => {

    /**
     * Wait for Login screen to be visible.
     * 
     * If this step fails, application might:
     * - not start correctly
     * - crash during launch
     * - have broken main activity
     */
    await LoginPage.waitForLoaded();

  });

});
