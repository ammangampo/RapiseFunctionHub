Feature: Validate if DAR Users can Input 500 Alphanumeric Characters

  @login
  Scenario Outline: Successful login
    Given the user is on the login page
    When the user enters the username "<username>" and the password "<password>"
    And the user clicks on the login button
    Then the user should be redirected to the dashboard

    Examples:
      | username        | password  |
      | clrpautoencode  | Pass@123  |
      | testuser        | Test123!  |
      | admin           | Admin123! |

   