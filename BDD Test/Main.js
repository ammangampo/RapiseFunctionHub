function Test(params) {
    // Define the path to your feature file
    var featureFilePath = "features/login.feature";

    // Run only the login scenario
//    Cucumber.Run(featureFilePath + " --tags @login");

    // If you want to run only the logout scenario, you can use:
    // Cucumber.Run(featureFilePath + " --tags @logout");
    
    Cucumber.Run(features/login.feature);
}

g_load_libraries = ["Web"];
