class HomeScreen {
  /**
   * @param {import('webdriverio').Browser} driver
   */
  constructor(driver) {
    this.driver = driver;
  }

  get productsTitle() {
    return this.driver.$('~test-Cart Content');
  }

  async assertLoggedIn() {
    const title = await this.productsTitle;
    await title.waitForDisplayed({ timeout: 15000 });
  }
}

module.exports = { HomeScreen };

