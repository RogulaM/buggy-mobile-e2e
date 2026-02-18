# Buggy App – Mobile E2E Test Suite

This repository contains automated end-to-end (E2E) tests for the Android application located at:

```
app/buggy.apk
```

The tests are written using:

- TypeScript
- WebdriverIO
- Appium (UiAutomator2)
- Mocha framework
- expect-webdriverio

The project follows the **Page Object Model (POM)** pattern.

---

## Project Structure

```bash
buggy-e2e/
│
├── app/
│   └── buggy.apk
│
├── test/
│   ├── pages/        # Page Object classes
│   ├── specs/        # E2E test scenarios
│   └── data/         # Test data
│
├── wdio.conf.ts
├── package.json
└── README.md
```

---

## Automated Scenarios

The suite covers at least 5 E2E scenarios:

### 1. Navigation to Registration
- User can navigate from Login screen to Registration screen.

### 2. Registration (happy path)
- User can register successfully.
- After registration, user lands on **Job Offers** screen.

### 3. Registration validations
- Invalid email format → registration should fail.
- Password shorter than required → registration should fail.
- Password and confirm password mismatch → registration should fail.

### 4. Login / Logout
- User can log out.
- User can log in again using valid credentials.

### 5. Apply to a multi-location job offer
- User clicks **Apply**.
- If the offer has multiple locations, user selects one.
- Snackbar confirmation appears.

### 6. History in Profile
- After applying, the job appears in **Profile > History**.

> Note: The app under test may not persist login session after closing the app.  
> Each test is independent and does not rely on session persistence.

---

## Requirements

### System Requirements

- Node.js >= 18
- Java (JDK 11+ recommended)
- Android SDK
- Android Emulator or physical Android device
- Appium 2.x

---

## Setup

### 1. Install dependencies

From project root:

```bash
npm install
```

### 2. Install Appium (if not installed)

```bash
npm install -g appium
```

Install UiAutomator2 driver:

```bash
appium driver install uiautomator2
```

---

## Running Tests

This project runs tests sequentially (`maxInstances: 1` in wdio config).

### Run all tests

```bash
npm run wdio
```

### Run a single test file

```bash
npx wdio run ./wdio.conf.ts --spec test/specs/registration.e2e.ts
```

---

## Device Preparation

Before running tests:

1. Start Android Emulator
2. Verify device is visible:

```bash
adb devices
```

3. Make sure the emulator is fully booted

---

## Author

Michał Rogula  
QA Engineer – Mobile Test Automation
