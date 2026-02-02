const { remote } = require('webdriverio');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const { LoginScreen } = require('../pageobjects/LoginScreen');
const { HomeScreen } = require('../pageobjects/HomeScreen');

function loadCapabilities() {
  const filePath = path.join(__dirname, '..', 'config', 'capabilities.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

describe('Mobile App - Login Flow', function () {
  this.timeout(600000);

  /** @type {import('webdriverio').Browser} */
  let driver;

  beforeEach(async () => {
    const caps = loadCapabilities();
    driver = await remote({
      path: '/wd/hub',
      port: 4723,
      capabilities: caps
    });
  });

  afterEach(async () => {
    if (driver) {
      await driver.deleteSession();
    }
  });

  it('logs in and shows home screen', async () => {
    const login = new LoginScreen(driver);
    const home = new HomeScreen(driver);

    await login.login('standard_user', 'secret_sauce');
    await home.assertLoggedIn();

    const currentActivity = await driver.getCurrentActivity();
    expect(currentActivity).to.contain('.');
  });
});

