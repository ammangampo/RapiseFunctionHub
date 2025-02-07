//Use 'Record/Learn' button to begin test recording

function Test(params)
{
	
	
    var imapServer = "imap.gmail.com";
    var port = 993;
//    var emailAddr = "alwinqatesting123@gmail.com";
//    var pwd = "ybyfajgtotwywpmd";
    
//    var emailAddr = "mangampoalwin.clrp@gmail.com";
//    var pwd = "ayeqkcvdqmfweitz";
//    var folder = "INBOX";
//    var subjectPattern = "Your temporary password is";
//    var timeout = 10000; // 1 minute
//
////   var OTP = CheckForOTP(imapServer, port, emailAddr, pwd, folder, subjectPattern, timeout);
//    
//    var tempPass = CheckForTempPassword(imapServer, port, emailAddr, pwd, folder, subjectPattern, timeout);
//	Tester.Message("temporary password: " + tempPass);


    pwd = "EAAAAERYW/odzdJYpqtrI/FxhNQ6vHfhFmMy1F6cTD2/fh7f";
	
	
	dc = Global.DoDecrypt(pwd);
	
	Navigator.Navigate('https://google.com');
	Navigator.Maximize();
	Tester.SuppressReport(true);
	Navigator.SeSFind("//textarea[@title='Search']").DoSetText(dc);
	Tester.SuppressReport(false);

	

}


g_load_libraries=["Web"]

