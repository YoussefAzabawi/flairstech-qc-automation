# FlairsTech Senior QC Automation Assessment

**Author:** Youssef Mohamed El-Azabawi  
**Repository:** https://github.com/YoussefAzabawi/flairstech-qc-automation

This repository contains a modern automation framework for Web UI, API, and Mobile, built with **Playwright (TypeScript)** and **Appium + Mocha**. The framework follows best practices for maintainability, scalability, and CI/CD integration.

## Project Structure

- `web/` – Playwright TypeScript tests for Web UI (POM-based).
- `api/` – Playwright API tests and shared API client.
- `mobile/` – Appium + Mocha tests for Android (Sauce Labs Sample App).
- `config/` – Environment configuration (base URLs).
- `data/` – JSON/CSV test data used by Web and API tests.
- `.github/workflows/ci.yml` – GitHub Actions workflow running Web + API tests.

## Prerequisites

- Node.js 18+ and npm
- Java 8+ (for Appium server)
- Android SDK & emulator, or a real Android device
- Appium server running locally on `http://localhost:4723/wd/hub`
- Downloaded **Sauce Labs Sample App** APK and update its absolute path in `mobile/config/capabilities.json`.

## Install Dependencies

```bash
npm install
cd mobile
npm install
```

## Run Web UI Tests (Playwright)

```bash
npx playwright test web/tests
```

## Run API Tests (Playwright API Testing)

```bash
npx playwright test api/tests
```

## Run All Web + API Tests

```bash
npm test
```

## Run Mobile Tests (Appium + Mocha)

- Mobile tests use:

Appium

WebdriverIO

Mocha

Sauce Labs Android Emulator

- Configuration

Mobile capabilities are defined directly in the test setup (remote execution):

- Platform: Android

- Automation: UiAutomator2

- App: Sauce Labs Sample App (from Sauce Storage)

- Execution: Remote (Sauce Labs)

Run Mobile Tests
```bash
cd mobile
npx mocha test/login.flow.spec.js
```


- No local Appium server is required
Tests connect directly to Sauce Labs (ondemand.eu-central-1.saucelabs.com)

Sauce Labs Integration

Tests run on Android GoogleAPI Emulator

- APK is loaded using:

storage:filename=Android.SauceLabs.Mobile.Sample.app.2.7.1.apk


- Each test run is tagged with:

Build ID

Test name

Artifacts available in Sauce Labs:

Video recording

Logs

Screenshots (if enabled)

## CI/CD

GitHub Actions workflow `.github/workflows/ci.yml` runs Web + API tests on every push and pull request to `main`/`master`, and publishes the Playwright HTML report as a build artifact.

