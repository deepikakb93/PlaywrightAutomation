Feature: Ecommerce Validation

    Scenario: Placing the order

        Given  Login to the application with "deepikakb93@gmail.com" and "Password@1234"
        When   Add a product "Zara Coat 4" into the cart
        Then   "Zara Coat 4" is displayed in the cart
        When   Enter valid details and place the order
        Then verify the order in order history page
        