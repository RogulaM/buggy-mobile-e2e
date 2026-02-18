/**
 * OffersPage represents the Job Offers screen.
 * 
 * It contains:
 * - actions for applying to job offers
 * - handling multi-location popup
 * - navigation to Profile
 * - snackbar validation after applying
 */
export class OffersPage {

  /**
   * Profile button (top-right corner).
   * Used to navigate to user profile screen.
   */
  get profileButton() {
    return $('android=new UiSelector().className("android.widget.Button").instance(1)');
  }

  /**
   * Apply button for the first job card.
   * 
   * Instance(0) ensures we always interact with the first visible offer.
   */
  get firstApplyButton() {
    return $('android=new UiSelector().description("Apply").instance(0)');
  }

  /**
   * Snackbar shown after successful application.
   * Contains job title and selected location.
   */
  get appliedSnackbar() {
    return $('//android.view.View[contains(@content-desc,"Applied to")]');
  }

  /**
   * Returns all location options in multi-location popup.
   * Used when offer has multiple possible locations.
   */
  get locationOptions() {
    return $$('android=new UiSelector().descriptionStartsWith("Location option:")');
  }

  /**
   * Waits until Job Offers screen is visible.
   * Profile button is used as stable screen indicator.
   */
  async waitForLoaded() {
    await this.profileButton.waitForDisplayed({ timeout: 15000 });
  }

  /**
   * Clicks Apply on the first offer.
   */
  async clickApplyOnFirstCard() {
    await this.firstApplyButton.waitForDisplayed({ timeout: 15000 });
    await this.firstApplyButton.click();
  }

  /**
   * Handles multi-location popup if it appears.
   * 
   * If location options are visible,
   * selects the first available location.
   * 
   * If popup does not appear, method exits silently.
   */
  async selectFirstLocationIfPopupVisible() {
    const options = await this.locationOptions;

    if (await options.length > 0) {
      await options[0].waitForDisplayed({ timeout: 5000 });
      await options[0].click();
    }
  }

  /**
   * Waits for snackbar confirmation after applying.
   */
  async waitForSnackbar() {
    await this.appliedSnackbar.waitForDisplayed({ timeout: 15000 });
  }

  /**
   * Returns snackbar text (content-desc).
   * Always returns string (never null).
   */
  async getSnackbarText(): Promise<string> {
    await this.appliedSnackbar.waitForDisplayed({ timeout: 15000 });
    return (await this.appliedSnackbar.getAttribute('content-desc')) ?? '';
  }

  /**
   * Opens user profile screen.
   */
  async openProfile() {
    await this.profileButton.waitForDisplayed({ timeout: 15000 });
    await this.profileButton.click();
  }
}

export default new OffersPage();
