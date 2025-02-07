// Spreadsheet Functions in Rapise



function setDataToSpreadsheet(value, columnId) {

/**
	Purpose: function to set data in spreadsheet
	Sample Usage:
	
	setDataToSpreadsheet(clrpReferenceNumber, "CLRP Reference Number");

**/

    // Attach to the spreadsheet located in the %WORKDIR% directory
    var success = Spreadsheet.DoAttach('%WORKDIR%/Data.xlsx', 'PDF Download Details');

    Tester.Assert('Open Spreadsheet', success);

    // Get the current TCID
    var TCID = Tester.GetTestName();
    
    // Get the row ID for the TCID
    var rowId = getRowIdByTCID(TCID);

    if (rowId != -1) {
        // Set the value in the specified cell using column ID and found row ID
        
        Spreadsheet.SetCell(value, columnId, rowId);
        // Save the spreadsheet after modification
        Spreadsheet.DoSave();
        // Output the action to the Tester log
        Tester.Message('Set value: ' + value + ' in column: ' + columnId + ', row: ' + rowId + ', for TCID: ' + TCID);
    } else {
        // If TCID is not found, log an error message
        Tester.Message('Error: TCID ' + TCID + ' not found in the spreadsheet.');
    }
}


function getDataFromSpreadsheet(columnName, tabName) {
    /**
        Purpose: Function to retrieve data from a specific column in the spreadsheet
        based on the provided TCID.
        
        Sample Usage:
        
        var value = getDataFromSpreadsheet("CLRP Reference Number", "PDF Download Details");
        
        - columnName: The name of the column to fetch the value from.
        - tabName: The name of the tab in the spreadsheet where the data is located.
    **/

    // Get the current TCID
    var TCID = Tester.GetTestName();
    
    // Open the spreadsheet located in the specified directory and tab
    var success = Spreadsheet.DoAttach('C:\\Users\\Public\\CLRP\\Data.xlsx', tabName);
    
    // Assert that the spreadsheet was opened successfully
    Tester.Assert('Open Spreadsheet', success);

    var value = '';
    var found = false;

    // Loop through each row to find the TCID and retrieve the value from the specified column
    while (Spreadsheet.DoSequential()) {
        if (Spreadsheet.GetCell(0) == TCID) {
            // Fetch the value from the specified column using its name
            value = Spreadsheet.GetCell(Spreadsheet.GetColumnIndexByName(columnName));
            found = true;
            break; // Exit the loop once the value is found
        }
    }

    // Log the retrieved value or an error if the TCID is not found
    if (found) {
        Tester.Message('The Value is : ' + value);
    } else {
        Tester.Message('Error: TCID ' + TCID + ' not found in the spreadsheet.');
    }

    // Return the retrieved value (or empty string if not found)
    return value;
}
