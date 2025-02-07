Feature: Login functionality

	@login
  Scenario: Successful login
    Given the user is on the login page
    When the user enters valid credentials
    And the user clicks on the login button
    Then the user should be redirected to the dashboard
    
    @logout
  Scenario: Logout
    Given the user is logged in
    When the user clicks on the logout button
    Then the user should be logged out successfully