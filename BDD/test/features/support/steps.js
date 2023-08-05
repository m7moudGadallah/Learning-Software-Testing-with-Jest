const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { isPositiveNumber } = require('../../../src/app');

Given('number {int}', function (num) {
    this.number = num;
});

When('i ask if number {int} is positive', function (num) {
    this.actualAnswer = isPositiveNumber(this.number);
});

Then('i should receive {string}', function (expectedAnswer) {
    assert.equal(this.actualAnswer, expectedAnswer);
});
