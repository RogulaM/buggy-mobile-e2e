/**
 * ProfilePage represents the User Profile screen.
 * 
 * It contains:
 * - logout functionality
 * - access to application history entries
 * 
 * The page is used mainly to:
 * - verify logout behavior
 * - validate job application history
 */
export class ProfilePage {

  /**
   * Logout button.
   * 
   * Located using accessibility id for stability.
   */
  get logoutButton() {
    return $('~Logout');
  }

  /**
   * First history entry displayed in profile.
   * 
   * Used to verify that a job application
   * appears in user history.
   */
  get firstHistoryItem() {
    return $('//android.view.View[contains(@content-desc,"Applied to")]');
  }

  /**
   * Waits until Profile screen is fully loaded.
   * 
   * Logout button is used as screen indicator.
   */
  async waitForLoaded() {
    await this.logoutButton.waitForDisplayed({ timeout: 10000 });
  }

  /**
   * Performs logout action.
   */
  async logout() {
    await this.logoutButton.waitForDisplayed({ timeout: 10000 });
    await this.logoutButton.click();
  }

  /**
   * Waits until at least one history entry is visible.
   */
  async waitForHistory() {
    await this.firstHistoryItem.waitForDisplayed({ timeout: 15000 });
  }

  /**
   * Returns text of the first history entry.
   * 
   * Usually contains job title and location.
   */
  async getFirstHistoryText(): Promise<string> {
    return (await this.firstHistoryItem.getAttribute('content-desc')) ?? '';
  }
}

export default new ProfilePage();
