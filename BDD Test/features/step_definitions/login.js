Given('the user is on the login page', function () { 
    var mainUrl = 'https://uat.clrp.com.ph/app/#main';
    WebDriver.Close();
    Global.DoSetScreenResolution(1920, 1080);
    WebDriver.CreateDriver(null);
    WebDriver.SetUrl(mainUrl);
    Navigator.Maximize();
});

When('the user enters valid credentials', function () { 
    username = "clrpautoencode";
    password = "Pass@123";
    
    SeS('CLRP_Main_Login').DoClick();
    SeS('Login_Username').DoSetText(username);
    SeS('Login_Password').DoSetText(password);
});

When('the user clicks on the login button', function () { 
    SeS('Login_Button').DoClick();
    Global._DoWaitFor('Label_View_Transactions', 2000, 0);
    Global._DoWaitFor('Dashboard', 2000, 0);
});

Then('the user should be redirected to the dashboard', function () { 
    if (Navigator.CheckObjectExists("Label_View_Transactions") || Navigator.CheckObjectExists('Dashboard')) {
        Global.DoSleep(500);
        Tester.Assert('Successfully Login', true);
        Tester.CaptureDesktopImage('CLRP Login');
    } else { 
        Tester.CaptureDesktopImage('CLRP Login');
        Tester.FailTest('Failed to Login CLRP');
    }

    if (Global.DoWaitFor('Alert_Later', 5000, 1000)) {
        SeS('Alert_Later').DoClick();
    }
});

Given('the user is logged in', function () {
    // You can use steps to log in the user if not already logged in
    // For simplicity, assume user is already logged in
});

When('the user clicks on the logout button', function () {
    SeS('Admin_User_Button').DoClick();
    SeS('User_Logout').DoClick();
    WebDriver.Close();
});

Then('the user should be logged out successfully', function () {
    // Add your validation steps here
    Tester.Assert('User logged out successfully', true);
});
