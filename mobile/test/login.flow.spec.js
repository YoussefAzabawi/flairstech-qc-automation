const { remote } = require('webdriverio');
const { expect } = require('chai');
const { LoginScreen } = require('../pageobjects/LoginScreen');
const { HomeScreen } = require('../pageobjects/HomeScreen');

describe('Mobile App - Login Flow (Sauce Labs)', function () {
  this.timeout(900000);

  let driver;

  beforeEach(async () => {
    driver = await remote({
      protocol: 'https',
      hostname: 'ondemand.eu-central-1.saucelabs.com',
      port: 443,
      path: '/wd/hub',

      user: 'oauth-youssef-172e2',
      key: '9f6472e4-b670-45d8-b4af-b4d7cdd946b0',

      capabilities: {
        platformName: 'Android',
        'appium:app': 'storage:filename=Android.SauceLabs.Mobile.Sample.app.2.7.1.apk',
        'appium:deviceName': 'Android GoogleAPI Emulator',
        'appium:platformVersion': '12.0',
        'appium:automationName': 'UiAutomator2',
        'appium:autoGrantPermissions': true,
        'sauce:options': {
          build: 'appium-build-U8L23',
          name: 'Mobile App Login Flow',
        }
      }
    });

    // ⏳ IMPORTANT for cloud stability
    await driver.pause(5000);

    // Force native context
    await driver.switchContext('NATIVE_APP');
  });

  afterEach(async () => {
    if (driver) {
      await driver.execute('sauce:job-result=passed');
      await driver.deleteSession();
    }
  });

  it('logs in and shows home screen', async () => {
    const login = new LoginScreen(driver);
    const home = new HomeScreen(driver);

    await login.login('standard_user', 'secret_sauce');
    await home.assertLoggedIn();

    const activity = await driver.getCurrentActivity();
    expect(activity).to.exist;
  });
});
