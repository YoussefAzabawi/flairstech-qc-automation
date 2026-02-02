class LoginScreen {
  /**
   * @param {import('webdriverio').Browser} driver
   */
  constructor(driver) {
    this.driver = driver;
  }

  get usernameField() {
    return this.driver.$('~test-Username');
  }

  get passwordField() {
    return this.driver.$('~test-Password');
  }

  get loginButton() {
    return this.driver.$('~test-LOGIN');
  }

  async login(username, password) {
    await this.usernameField.setValue(username);
    await this.passwordField.setValue(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginScreen };

