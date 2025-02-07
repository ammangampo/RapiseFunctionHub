/**
 * Check speicified mailbox for a new mail message. We only check unread messages and
 * found messages are marked as read.
 * Please, note that for Gmail mailbox you need to set "Allow less secure apps: ON"
 */
function CheckForMail(
	/**string*/imapSvr, 
	/**string*/port, 
	/**string*/emailAddr, 
	/**string*/pwd,
	/**string*/folder,
	/**string*/subjectPattern,
	/**number*/timeout) {
	
	timeout=timeout||1000000;
	var start = new Date();
	
	var wsh = new ActiveXObject("WScript.Shell");
	
	imapSvr = imapSvr || "imap.gmail.com";
	port = port || 993;

	var cmd = 
	 '\"%WORKDIR%RapiseImapClient\\RapiseImapClient.exe\" '
	+'/imap:'+imapSvr+' '
	+'/port:'+port+' '
	+'/user:'+emailAddr+' '
	+'/password:'+pwd+' '
	+'/folder:'+folder+' '
	+'/command:list '
	+'/unread '
	+'/mark '
	+'/output:mailcheck.json '
	+'/days:1'
	
	var msElapsed = (new Date())-start;
	while(msElapsed<timeout)
	{
		Log("Checking mailbox: "+emailAddr);
		var errCode = wsh.Run(cmd, 10, true);
		if(errCode==0)
		{
			var mails = JSON.parse(File.Read('mailcheck.json'));
			for(var i=0;i<mails.items.length;i++)
			{
				var msg = mails.items[i];
				if( SeSCheckString(subjectPattern, msg.subject) )
				{
					Log('Found: '+msg.subject);
					return msg.body;
				}
			}
		}
		var msElapsed = (new Date())-start;
		Global.DoSleep(5000);
	} 
	
	Log('Nothing found in mailbox: '+emailAddr);
	
	return null;
}




function CheckForOTP(imapSvr, port, emailAddr, pwd, folder, subjectPattern, timeout) {
    timeout = timeout || 1000000;
    var start = new Date();

    var wsh = new ActiveXObject("WScript.Shell");

    imapSvr = imapSvr || "imap.gmail.com";
    port = port || 993;

    var cmd = 
        '\"%WORKDIR%RapiseImapClient\\RapiseImapClient.exe\" '
        + '/imap:' + imapSvr + ' '
        + '/port:' + port + ' '
        + '/user:' + emailAddr + ' '
        + '/password:' + pwd + ' '
        + '/folder:' + folder + ' '
        + '/command:list '
        + '/output:mailcheck.json '
        +'/unread '
        +'/mark '
        + '/days:1';

    var msElapsed = (new Date()) - start;
    while (msElapsed < timeout) {
        Log("Checking mailbox: " + emailAddr);
        var errCode = wsh.Run(cmd, 10, true);
        if (errCode == 0) {
            var mails = JSON.parse(File.Read('mailcheck.json'));
            if (mails.items.length > 0) {
                Log('Number of emails found: ' + mails.items.length);
                for (var i = 0; i < mails.items.length; i++) {
                    var msg = mails.items[i];
                    Log('Email ' + (i + 1) + ':');
                    Log('Subject: ' + msg.subject);
                    Log('From: ' + msg.from);
                    Log('To: ' + msg.to);
                    Log('Date: ' + msg.date);
                    Log('Body:\n' + msg.body);

                    // Extract OTP from the email body
                    var otpPattern = new RegExp(subjectPattern + "\\s*(\\d+)", "i");
                    //var otpPattern = /CLRP OTP:\s*(\d+)/i;
                    var match = msg.body.match(otpPattern);
                    if (match) {
                        var otp = match[1];
                        Log('Extracted OTP: ' + otp);
                        return otp;
                        // Perform further actions with OTP as needed
                    } else {
                        Log('No OTP found in email.');
                        return null;
                    }

                    Log('------------------------------------');
                }
            } else {
                Log('No emails found in mailbox: ' + emailAddr);
                return null;
                
            }
        } else {
            Log('Error accessing mailbox: ' + emailAddr + ', Error Code: ' + errCode);
            return null;
            // Handle error condition, perhaps retry or log specific errors
        }
        msElapsed = (new Date()) - start;
        Global.DoSleep(5000);
    }

    Log('Mailbox check complete for: ' + emailAddr);
}


function CheckForTempPassword(imapSvr, port, emailAddr, pwd, folder, subjectPattern, timeout) {
    timeout = timeout || 1000000; // Default timeout if not specified
    var start = new Date();
    var wsh = new ActiveXObject("WScript.Shell");

    imapSvr = imapSvr || "imap.gmail.com";
    port = port || 993;

    var cmd = 
        '\"%WORKDIR%RapiseImapClient\\RapiseImapClient.exe\" '
        + '/imap:' + imapSvr + ' '
        + '/port:' + port + ' '
        + '/user:' + emailAddr + ' '
        + '/password:' + pwd + ' '
        + '/folder:' + folder + ' '
        + '/command:list '
        + '/output:mailcheck.json '
        + '/unread '
        + '/mark '
        + '/days:1';

    var msElapsed = (new Date()) - start;

    while (msElapsed < timeout) {
        Log("Checking mailbox: " + emailAddr);
        var errCode = wsh.Run(cmd, 10, true);

        if (errCode === 0) {
            try {
                var mails = JSON.parse(File.Read('mailcheck.json'));
                if (mails.items && mails.items.length > 0) {
                    Log('Number of emails found: ' + mails.items.length);
                    for (var i = 0; i < mails.items.length; i++) {
                        var msg = mails.items[i];
                        Log(`Email ${i + 1}: Subject: ${msg.subject}, From: ${msg.from}`);

                        // Build Regex Dynamically Using subjectPattern
                        var tempPwdPattern = new RegExp(subjectPattern + '\\s*([^\s]+)\\.', 'i');
                        var match = msg.body.match(tempPwdPattern);

                        if (match) {
                            var tempPwd = match[1];
                            Log('Extracted Temporary Password: ' + tempPwd);
                            return tempPwd; // Return Temp Password immediately if found
                        } else {
                            Log('No Temporary Password found in email body.');
                        }
                    }
                } else {
                    Log('No emails found in mailbox: ' + emailAddr);
                }
            } catch (e) {
                Log('Error parsing mailcheck.json: ' + e.message);
            }
        } else {
            Log('Error accessing mailbox: ' + emailAddr + ', Error Code: ' + errCode);
            return null;
        }

        msElapsed = (new Date()) - start;
        Global.DoSleep(5000); // Wait before retrying
    }

    Log('Timeout reached. Mailbox check complete for: ' + emailAddr);
    return null;
}





/**
 * Check 'body' text and extract all links starting form http:// or https:// and return
 * the first one having 'linkText' as a substring. Return the whole link. Otherwise null is returned.
 *
 * Example Usage:
 *  var link = FindLinkHaving(emailBody, 'https://mysite.com/welcome/');
 *  
 */
function FindLinkHaving(/**string*/body, /**string*/linkText)
{
	var urlRegex = /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/g;
	var m = null;
	while(m = urlRegex.exec(body))
	{
		// Match found!
		var res = m[0]; // get first match
		if(res.indexOf(linkText)>=0)
		{
			Log('Found URL: '+res);
			return res;
		}
	}
	
	return null;
}
