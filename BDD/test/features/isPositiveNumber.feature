Feature: Is Positive Number
    Check if Number is Positive or not

    Scenario: 5 is a positive number
        Given number 5
        When i ask if number 5 is positive
        Then i should receive "positive"    

    Scenario: -2 is a positive number
        Given number -2
        When i ask if number -2 is positive
        Then i should receive "negative"

    Scenario: 0 is a positive number
        Given number 0
        When i ask if number 0 is positive
        Then i should receive "zero"