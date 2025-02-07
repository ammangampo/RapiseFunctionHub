//Use 'Record/Learn' button to begin test recording

function Test(params)
{
	
	
    var imapServer = "imap.gmail.com";
    var port = 993;

    
   var emailAddr = "mangampoalwin.clrp@gmail.com";
   var pwd = "16DIGITPASSHERE!";
   var folder = "INBOX";
   var subjectPattern = "Your temporary password is";
   var timeout = 10000; // 1 minute

//   var OTP = CheckForOTP(imapServer, port, emailAddr, pwd, folder, subjectPattern, timeout);
   
   var tempPass = CheckForTempPassword(imapServer, port, emailAddr, pwd, folder, subjectPattern, timeout);
	Tester.Message("temporary password: " + tempPass);



	

}


g_load_libraries=["Web"]

