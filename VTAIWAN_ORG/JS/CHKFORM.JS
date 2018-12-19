/*
必須在 HTML 中搭配

<script language="JavaScript" src="chkform.js"></script>

<script language="JavaScript">
function CheckForm(inForm){


	if(
	CheckText(inForm.RealName,"姓名沒填!!") &&
	CheckText(inForm.Age,"年齡沒填!!") &&
	CheckText(inForm.Address,"住址沒填!!") &&
	CheckText(inForm.Email,"Email沒填!!")
	){
		return true;
	}
	else{
		return false;
	}

// 檢查 Radio
//	CheckRadio(inRadio,errMsg)
// 檢查 Text
//	CheckText(inText,errMsg)
// 檢查 Text值
//	CheckTextValue(inText,minLength,maxLength,dataType,errMsg)
// 檢查 身分證字號
//	CheckID(s,errMsg)
// 檢查 Email 格式
//  CheckEmail(z,errMsg)

}
</script>

<form method="post" action="" onSubmit="return CheckForm(this)">

*/



function CheckPWD(inText1,inText2,errMsg){
	if((inText1.value == "")||(inText1.value != inText2.value)){
		alert("\n\n" + errMsg + "\n\n");
		inText1.focus();
		return false;
	}
	return true;
}



function CheckText(inText,errMsg){
	if(inText.value == ""){
		alert("\n\n" + errMsg + "\n\n");
		inText.focus();
		return false;
	}
	return true;
}


function CheckSelect(E,errMsg){
	if(E.options[0].selected)
	{
		alert("\n\n" + errMsg + "\n\n");
		E.focus();
		return false;
	}else{
		return true;
	}
}

function CheckEmail(z,errMsg){

	if(!validEmail(z.value)){
			alert("\n\n" + errMsg + "\n\n");
			z.focus();
			return false;
	}

	return true;
}

// Check valid email format
function validEmail(sEmail){
	if(sEmail.length < 2 ) return false;
	var sArray;

	// split the email into two part : name & domain
	sArray = sEmail.split("\@");
	if(sArray.length != 2) return false;
	var namePart = sArray[0];
	var domainPart = sArray[1];
	var s,dataString;

	// check if name part is valid, dataString is the valid alphabet of namePart,
	// you can redefine this string for future use.
	dataString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-_";

	s = namePart.substring(0,1);
	if((s == "\.")||(s == "-")||(s == "_")) return false;

	for(var i=0;i<namePart.length;i++){
		s = namePart.substring(i,i+1);
		if(dataString.indexOf(s)<0) return false;
	}

	// split domain part with separator "."
	sArray = domainPart.split("\.");
	if(sArray.length < 2) return false;

	// check if domain part is valid, dataString is the valid alphabet of domainPart ,
	// you can redefine this string for future use.
	dataString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

	for(var l=0;l<sArray.length;l++){
		if(sArray[l].length == 0) return false;
		
		s = sArray[l].substring(0,1);
		if((s == "-")||(s == "_")) return false;

		for(var i=0;i<sArray[l].length;i++){
			s = sArray[l].substring(i,i+1);
			if(dataString.indexOf(s)<0) return false;
		}
	}

	return true;
}

/* 
dataType :	0: Any character
			1: Must be a numeric, include integer and float
			2: Must be a letter, not include any 0-9
			3: Include only a-z, A-Z And 0-9
			4: mail format check , a-z, A-Z , 0-9 , @ and _ , - , .
*/
function CheckTextValue(inText,minLength,maxLength,dataType,errMsg){
	if((inText.value.length < minLength)||(inText.value.length > maxLength)){
		alert("\n\n" + errMsg + "\n\n");
		inText.focus();
		return false;
	}

	if((dataType == 1) && isNaN(inText.value)){
		alert("\n\n" + errMsg + "\n\n");
		inText.focus();
		return false;
	}

	if(dataType == 2){
		var s;
		var dataString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
		for(var i=0;i<inText.value.length;i++){
			s = inText.value.substring(i,i+1);
			if(dataString.indexOf(s)<0){
				alert("\n\n" + errMsg + "\n\n");
				inText.focus();
				return false;
			}
		}
	}

	if(dataType == 3){
		var s;
		var dataString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
		for(var i=0;i<inText.value.length;i++){
			s = inText.value.substring(i,i+1);
			if(dataString.indexOf(s)<0){
				alert("\n\n" + errMsg + "\n\n");
				inText.focus();
				return false;
			}
		}
	}

	if(dataType == 4){
		var s;
		var dataString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-_@"
		if(inText.value.indexOf("\@")<1){
			alert("\n\n" + errMsg + "\n\n");
			inText.focus();
			return false;
		}else{
			for(var i=0;i<inText.value.length;i++){
				s = inText.value.substring(i,i+1);
				if(dataString.indexOf(s)<0){
					alert("\n\n" + errMsg + "\n\n");
					inText.focus();
					return false;
				}
			}
		}
	}


	if(dataType == 5){
		var s;
		var dataString = "0123456789"
		for(var i=0;i<inText.value.length;i++){
			s = inText.value.substring(i,i+1);
			if(dataString.indexOf(s)<0){
				alert("\n\n" + errMsg + "\n\n");
				inText.focus();
				return false;
			}
		}
	}


	return true;
}


function CheckRadio(inRadio,errMsg){
	for(var i=0;i<inRadio.length;i++){
		if(inRadio[i].checked){
			return true;
		}
	}
	alert("\n\n" + errMsg + "\n\n");
	return false;
}
function CheckRadio2(inRadio, errMsg) {
    
    if (inRadio.checked) {
        return true;
    } else {
        alert("\n\n" + errMsg + "\n\n");
        return false;
    }
}

function CheckID(ss,errMsg){

	var c, n, i;
	var t= "ABCDEFGHJKLMNPQRSTUVXYWZIO";
	s = ss.value;

	c= s.substring(0,1);
	c= t.indexOf(c.toUpperCase());
	if((s.length!= 10) || (c<0)){
		alert("\n\n" + errMsg + "\n\n");
		ss.focus();
		return false;
	}

	n= parseInt(c/10)+ c%10*9+ 1;
	for(i=1; i<9; i++) n= n+ parseInt(s.substring(i,i+1))* (9-i);
	n= (10- (n% 10))% 10;
	if(n!= parseInt(s.substring(9,10))){
		alert("\n\n" + errMsg + "\n\n");
		ss.focus();
		return false;
	}

	return true;
}

function CompareDate(date1,date2,errMsg){
   
    if(date2.value == "") date2.value = "2100/12/31";
    var date1_s = date1.value.split("INDEX.HTM");
    var date2_s = date2.value.split("INDEX.HTM");
    var date1_time = new Date(date1_s[0],date1_s[1],date1_s[2],0,0,0);
    var date2_time = new Date(date2_s[0],date2_s[1],date2_s[2],0,0,0);
    var result = date2_time - date1_time;
   
    if(result <= 0){
        alert("\n\n" + errMsg + "\n\n");
        date2.focus();
        return false;
    }else{
        return true;
    }
}
