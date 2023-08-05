# Integration Testing

<!-- TOC -->

-   [Integration Testing](#integration-testing)
    -   [Introduction](#introduction)
        -   [Advantages](#advantages)
        -   [Disadvantages](#disadvantages)
    -   [Testing with Jest](#testing-with-jest)
        -   [Usage](#usage)
        -   [Helpers Functions](#helpers-functions)

<!-- /TOC -->

## Introduction

> Integration used to test your app with its external dependencies

### Advantages

-   Give more Confidence

### Disadvantages

-   Take longer time

## Testing with Jest

> The same as unit test so you can quickly watch those _[files](./tests/integration/)_

### Usage

1. Rename File: Rename `./config/config.env.env` to `./config/config.env.`

2. Add Values: Open config.env and fill in:
    - NODE_ENV: Set environment mode.
    - PORT: Specify application port.
    - DATABASE_URI: Database connection URI.
    - DATABASE: Main database name.
    - DATABASE_TEST: Testing database name.
    - DATABASE_PASSWORD: Database password.

### Helpers Functions

-   beforeAll
-   afterAll
-   beforeEach
-   afterEach
