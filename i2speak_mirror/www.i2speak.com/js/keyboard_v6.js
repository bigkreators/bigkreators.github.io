/* (c) Sciweavers.org - http://www.sciweavers.org/i2type */
var _isMobile = isMobile();

var _kSemiColon = "59";
var _kEqual = "107";
var _kMinus = "109";
if ($.browser.webkit) 
{
	_kSemiColon = "186";
	_kEqual = "187";
	_kMinus = "189";
}		   

// 14
// 14
// 13
// 12
// 5
var ids = ["223", "49", "50", "51", "52", "53", "54", "55", "56", "57", "48", _kMinus, _kEqual, "8", 
		   "9", "81", "87", "69", "82","84","89","85","73","79","80","219","221","222",
		   "20","65","83","68","70","71","72","74","75","76",_kSemiColon,"192","13", 
		   "16","90","88","67","86","66","78","77","188","190","191","1016",
		   "17", "1018", "32", "18", "1017"];

		   
var sup = ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "", 
			"", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P","[","]","\\",
			"", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'","", 
			"", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "",
			"", "", "", "", ""];

function Smart_IPA()
{	
	var L1 = ["&#x0060;","&#x0031;","&#x0032;","&#x0033;","&#x0034;","&#x0035;","&#x0036;","&#x0037;","&#x0038;","&#x0039;","&#x0030;","&#x002D;","&#x003D;","","","&#x0071;","&#x0077;","&#x0065;","&#x0072;","&#x0074;","&#x0079;","&#x0075;","&#x0069;","&#x006F;","&#x0070;","&#x005B;","&#x005D;","&#x005C;","","&#x0061;","&#x0073;","&#x0064;","&#x0066;","&#x0067;","&#x0068;","&#x006A;","&#x006B;","&#x006C;","&#x003B;","&#x0027;","","","","&#x007A;","&#x0078;","&#x0063;","&#x0076;","&#x0062;","&#x006E;","&#x006D;","&#x002C;","&#x002E;","&#x002F;","","",""];
	var L2 = ["&#x007E;","&#x0021;","&#x0040;","&#x0023;","&#x0024;","&#x0025;","&#x005E;","&#x0026;","&#x002A;","&#x0028;","&#x0029;","&#x005F;","&#x002B;","","","&#x0051;","&#x0057;","&#x0045;","&#x0052;","&#x0054;","&#x0059;","&#x0055;","&#x0049;","&#x004F;","&#x0050;","&#x007B;","&#x007D;","&#x007C;","","&#x0041;","&#x0053;","&#x0044;","&#x0046;","&#x0047;","&#x0048;","&#x004A;","&#x004B;","&#x004C;","&#x003A;","&#x0022;","","","","&#x005A;","&#x0058;","&#x0043;","&#x0056;","&#x0042;","&#x004E;","&#x004D;","&#x003C;","&#x003E;","&#x003F;","","",""];
	var L3 = [];
	var L4 = [];
	var L5 = ["&#x0060;","&#x0031;","&#x0032;","&#x0033;","&#x0034;","&#x0035;","&#x0036;","&#x0037;","&#x0038;","&#x0039;","&#x0030;","&#x002D;","&#x003D;","","","&#x0051;","&#x0057;","&#x0045;","&#x0052;","&#x0054;","&#x0059;","&#x0055;","&#x0049;","&#x004F;","&#x0050;","&#x005B;","&#x005D;","&#x005C;","","&#x0041;","&#x0053;","&#x0044;","&#x0046;","&#x0047;","&#x0048;","&#x004A;","&#x004B;","&#x004C;","&#x003B;","&#x0027;","","","","&#x005A;","&#x0058;","&#x0043;","&#x0056;","&#x0042;","&#x004E;","&#x004D;","&#x002C;","&#x002E;","&#x002F;","","",""];	
	return load_n_level_chooser(L1, L2, L3, L4, L5);
}

function Sampa_English()
{	
	var L1 = ["`", "&#x0259;", "&#x00F8;", "&#x025C;", "", "&#x02CC;", "&#x0250;", "&#x0276;", "", "&#x0153;", "", "-", "=", "",
			  "", "&#x0252;", "", "&#x025B;", "&#x0281;", "&#x03B8;", "&#x028F;", "&#x028A;", "&#x026A;", "&#x0254;", "", "&#x00E6;", "&#x0289;", "\\",
			  "", "&#x0251;", "&#x0283;", "&#x00F0;", "", "&#x0263;", "&#x0265;", "&#x0272;", "", "&#x028E;", "&#x02D0;", "&#x02C8;", "", "",
			  "", "&#x0292;", "", "&#x0231;", "&#x028C;", "&#x03B2;", "&#x014B;", "", "", "", "&#x0294;", "", "", ""];

	var L2 = ["`", "", "&#x0259;", "", "", "&#x02CC;", "", "&#x0276;", "", "", "", "", "", "",
			  "", "", "", "", "", "", "", "", "", "", "", "", "", "",
 			  "", "", "", "", "", "", "", "", "", "", "&#x02D0;", "&#x02C8;", "", "",
			  "", "", "", "", "", "", "", "", "", "", "&#x0294;", "", "", ""];

	var L3 = [];
	var L4 = [];
	var L5 = ["&#x0060;","&#x0031;","&#x0032;","&#x0033;","&#x0034;","&#x0035;","&#x0036;","&#x0037;","&#x0038;","&#x0039;","&#x0030;","&#x002D;","&#x003D;","","","&#x0051;","&#x0057;","&#x0045;","&#x0052;","&#x0054;","&#x0059;","&#x0055;","&#x0049;","&#x004F;","&#x0050;","&#x005B;","&#x005D;","&#x005C;","","&#x0041;","&#x0053;","&#x0044;","&#x0046;","&#x0047;","&#x0048;","&#x004A;","&#x004B;","&#x004C;","&#x003B;","&#x0027;","","","","&#x005A;","&#x0058;","&#x0043;","&#x0056;","&#x0042;","&#x004E;","&#x004D;","&#x002C;","&#x002E;","&#x002F;","","",""];	
	return load_n_level_chooser(L1, L2, L3, L4, L5);
}

function IPA_English()
{	
	var L1 = ["&#x01C0;","&#x02E9;","&#x02E8;","&#x02E7;","&#x02E6;","&#x02E5;","&#x2197;","&#x2198;","&#x2191;","&#x2193;","&#x2192;", "&#x01C1;","&#x2016;","",
	          "","&#x0259;","&#x0264;","&#x025B;","&#x0280;","&#x03B8;","&#x028F;","&#x028A;","&#x026A;","&#x0254;","&#x03B2;","{","}","&#x00E6;",
			  "","&#x0251;","&#x0283;","&#x00F0;", "&#x0278;","&#x0262;","&#x029C;","&#x02A1;","&#x0263;","&#x029F;","&#x02D0;","@","","",
			  "","&#x0292;","&#x03C7;","&#x0295;","&#x028B;","&#x0299;","&#x0274;","&#x014B;","&#x0272;","&#x0273;","&#x0294;","","",""];
	var L2 = ["&#x01C3;","&#x01C2;","&#x0298;","&#x02BC;","&#x02B3;","&#x02B0;","&#x02B7;","&#x02B2;","&#x02E0;","&#x02E4;","&#x207F;","&#x02E1;","&#x02B1;","&#x033D;",
	          "","","","&#x025C;","","","","","","","","","","&#x00C6;",
			  "","&#x00E6;","","","","","","","","","","","","",
			  "","","","","&#x028C;","","","","","","","","",""];
	var L3 = L2;
	var L4 = L2;
	var L5 = L2;
	return load_n_level_chooser(L1, L2, L3, L4, L5);
}

function Unicode_Phonetic_Keyboard()
{	
	var L1 = ["&#x02DE;","&#x0268;","ø","&#x025C;","&#x027E;","&#x026B;","&#x0250;","&#x0263;","&#x03B8;","&#x0153;","&#x0325;","&#x0320;","&#x0329;","",
			  "","&#x0071;","&#x0077;","&#x0065;","&#x0072;","&#x0074;","&#x0079;","&#x0075;","&#x0069;","&#x006F;","&#x0070;","&#x005B;","&#x005D;","#",
			  "","&#x0061;","&#x0073;","&#x0064;","&#x0066;","&#x0067;","&#x0068;","&#x006A;","&#x006B;","&#x006C;","&#x003B;","&#x0027;","","",
			  "","&#x007A;","&#x0078;","&#x0063;","&#x0076;","&#x0062;","&#x006E;","&#x006D;","&#x002C;","&#x002E;","&#x002F;","","",""];

	var L2 = ["&#x031A;","!","&#x02E1;","&#x0279;","$","&#x0329;","&#x032F;","&#x0276;","*","(", ")","&#x032C;","+","",
	          "","&#x0252;","&#x028D;","&#x025B;","&#x0281;","&#x03B8;","&#x028F;","&#x028A;","&#x026A;","&#x0254;","&#x028B;","&#x00E6;","&#x0289;","&#x00E6;",
			  "","&#x0251;","&#x0283;","&#x00F0;","&#x0271;","&#x0263;","&#x0265;","&#x0272;","&#x026C;","&#x028E;","&#x02D0;","&#x0259;","","",
			  "","&#x0292;","&#x03C7;","&#x00C7;","&#x028C;","&#x03B2;","&#x014B;","&#x026F;","&#x0272;","&#x0306;","&#x0294;","","",""];



	var L3 = ["|","&#x0274;","&#x2016;","&#x027B;","&#x027D;","&#x029F;","&#x0253;","&#x02E0;","&#x025E;","&#x0260;","&#x030A;","&#x0361;","&#x01C2;","",
	          "","&#x031D;","&#x02B7;","&#x0258;","&#x0280;","&#x0288;","&#x031E;","&#x0267;","&#x031F;","&#x0298;","&#x0278;","&#x0257;","&#x032A;","&#x0320;",
			  "","&#x0320;","&#x0282;","&#x0256;","&#x025F;","&#x0262;","&#x02B0;","&#x029D;","&#x026E;","&#x026D;","&#x0308;","&#x025A;","&#x0334;","",
			  "","&#x0290;","&#x0127;","&#x0255;","&#x0291;","&#x0299;","&#x0273;","&#x0270;","&#x02C8;","&#x0324;","&#x0295;","","",""];



	
	var L4 = L2;
	var L5 = L3;
	return load_n_level_chooser(L1, L2, L3, L4, L5);
}


function Superscript()
{	
	var L1 = ["","&#x30F;","&#x0300;","&#x0304;","&#x0301;","&#x030B;","&#x030C;","&#x0302;","","","","","&#x0361;","",
	          "","","&#x02B7;","","&#x02DE;","","","","","&#x030A;","","","","",
			  "","","","","","","&#x02B0;","&#x02B2;","","&#x02E1;","&#x0306;","&#x0313;","","",
			  "","","&#x033D;","","","","&#x207F;","","","","","","",""];
			  
	var L2 = ["","","","","","","","","","","","","","",
	          "","","","","","","","","","","","","","",
			  "","","","","","&#x0303;","","&#x031A;","&#x02E0;","","&#x0308;","","&#x0303;","",
			  "","","&#x033D;","&#x02E4;","","","","","","","&#x031A;","","",""];
	var L3 = L2;
	var L4 = L2;
	var L5 = L2;
	return load_n_level_chooser(L1, L2, L3, L4, L5);
}

function Subscript()
{	
	var L1 = ["","","","","","","","","","","","","&#x0320;","",
	          "","","","","&#x031D;","","","&#x033A;","","&#x0325;","","","","",
			  "","&#x0318;","","","&#x031E;","&#x0330;","","","","&#x033B;","&#x032F;","&#x0329;","","",
			  "","","","","&#x032C;","&#x0319;","&#x0318;","&#x033C;","","","","","",""];
			  
	var L2 = ["","","","","","","","","","&#x0339;","&#x031C;","","&#x031F;","",
	          "","","","","","","","","","","","","","",
			  "","","","","","&#x0330;","","","","","&#x0324;","","","",
			  "","","","","","","","","","","","","",""];
	var L3 = L2;
	var L4 = L2;
	var L5 = L2;
	return load_n_level_chooser(L1, L2, L3, L4, L5);
}

function Flipped()
{	
	var L1 = ["","","","","","","","","","","","","","",
	          "","","&#x028D;","&#x0259;","&#x0279;","","&#x028E;","","","","","","","",
			  "","&#x0250;","","","","","&#x0265;","","","","","","","",
			  "","","","","&#x028C;","","","&#x026F;","","","","","",""];
			  
	var L2 = ["","","","","","","","","","","","","","",
	          "","","","&#x025C;","&#x0281;","","","","","","","","","",
			  "","&#x0251;","","","","","","&#x02A2;","","","","","","",
			  "","","","&#x02A1;","","","","","","","&#x02A2;","","",""];

	var L3 = L2;
	var L4 = L2;
	var L5 = L2
	return load_n_level_chooser(L1, L2, L3, L4, L5);
}

function Retroflex()
{	
	var L1 = ["","","","","","","","","","","","","","",
	          "","","","","&#x027D;","&#x0288;","","","","","","","","",
			  "","","&#x0282;","&#x0256;","","","&#x0267;","","","&#x026D;","","","","",
			  "","&#x0290;","","&#x00E7;","","","&#x0272;","&#x0271;","","","","","",""];
			  
	var L2 = ["","","","","","","","","","","","","","",
	          "","","","","&#x027B;","","","","","","","","","",
			  "","","","","","","","","","","","","","",
			  "","","","","","","&#x0273;","","","","","","",""];
			  
	var L3 = L2;
	var L4 = L2;
	var L5 = L2;
	return load_n_level_chooser(L1, L2, L3, L4, L5);
}

function Extended()
{	
	var L1 = ["","","","","","","","","","","","","","",
	          "","","","","&#x027E;","","","","","&#x0153;","","","","",
			  "","&#x00E6;","","","","&#x0260;","&#x0266;","&#x029D;","","&#x026C;","","","","",
			  "","&#x0291;","","&#x0255;","","&#x0253;","","&#x0270;","","","","","",""];
			  
	var L2 = ["","","","","","","","","","","","","","",
	          "","&#x025A;","","&#x025E;","&#x0279;","","","","","&#x0276;","","","","",
			  "","","","","","&#x029B;","&#x0267;","","","&#x026E;","","","","",
			  "","","","","","","","","","","","","",""];
			  
	var L3 = L2;
	var L4 = L2;
	var L5 = L2;
	return load_n_level_chooser(L1, L2, L3, L4, L5);
}

function Barred()
{	
	var L1 = ["","","","","","","","","","","","","","",
	          "","","","","","","","&#x0289;","&#x0268;","&#x0275;","","","","",
			  "","","","","","","&#x0127;","&#x025F;","","&#x026B;","","","","",
			  "","","","","","","","","","","","","",""];
			  
	var L2 = ["","","","","","","","","","","","","","",
	          "","","","","","","","","&#x0284;","&#x00F8;","","","","",
			  "","","","","","","","&#x02A1;","","","","","","",
			  "","","","&#x02A2;","","","","","","","&#x02A1;","","",""];
	var L3 = L2;
	var L4 = L2;
	var L5 = L2;
	return load_n_level_chooser(L1, L2, L3, L4, L5);
}

function isMobile(){
  var ios = navigator.userAgent.match(/(iPhone|iPod)/g) ? true : false;
  var ua = navigator.userAgent.toLowerCase();
  var isAndroid = ua.indexOf("android") > -1;
  return ios || isAndroid;
}

function load_n_level_chooser(L1, L2, L3, L4, L5)
{
	if(_isMobile)
		return load_n_level_mobile(L1, L2, L3, L4, L5);
	else
		return load_n_level_desktop(L1, L2, L3, L4, L5);
}

function load_n_level_desktop(L1, L2, L3, L4, L5)
{				
	var L;
	if(_level == 1)
		L = L1;
	else if(_level == 2)
		L = L2;
	else if(_level == 3)
		L = L3;
	else if(_level == 4)
		L = L4;
	else if(_level == 5)
		L = L5;

	if(L.length == 0)
	{
		L = L1;
	}

 
 var diacritics = '';
 if((_active_language == "Subscript") || (_active_language == "Superscript"))
 {
	diacritics = 'tashkeel';
}
				
	var keyboard = '<div id="keypad">'; 
	
	var enableSuperScript = 1;

			
	for(var i = 0; i <= 12; ++i)
	{
		var key = '<input type="button" class="button silver key '+ diacritics + ' ' + ids[i] + '" value="' + L[i] + '" />';		
		if(_active_language == 'Zhuyin')
		{
			keyboard += '<div class="frm"><div class="sups">'+ sup[i] +'</div>' + key + '</div>';
		}
		else
		{
			if(enableSuperScript)
			{
				keyboard += '<div class="frm"><div class="sups">'+ sup[i] +'</div>' + key + '</div>';
			}
			else
			{			
				keyboard += key;
			}
		}
	}
		
	keyboard += '<input type="button" class="button dark '+ ids[13] + '" id="backspace" value="Backspace" />';
			
	keyboard += '<div style="clear:both;"></div>';

	keyboard += '<input type="button" class="button dark '+ ids[14] + '" id="tab" value="Tab" />';
	for(var i = 15; i <= 27; ++i)
	{
		var key = '<input type="button" class="button silver key '+ diacritics + ' ' + ids[i] + '" value="' + L[i] + '" />';
		if(_active_language == 'Zhuyin')
		{
			keyboard += '<div class="frm"><div class="sups">'+ sup[i] +'</div>' + key + '</div>';
		}
		else
		{
			if(enableSuperScript)
			{
				keyboard += '<div class="frm"><div class="sups">'+ sup[i] +'</div>' + key + '</div>';
			}
			else
			{			
				keyboard += key;
			}
		}
	}
			
	keyboard += '<div style="clear:both;"></div>';
			
	//keyboard += '<input type="button" class="button dark" id="caps" value="Caps Lock" /><b style="position:relative"></b>';
	keyboard += '<input type="button" class="button dark '+ ids[28] + '" id="caps" value="Caps Lock" />';
	for(var i = 29; i <= 39; ++i)
	{
		var key = '<input type="button" class="button silver key '+ diacritics + ' ' + ids[i] + '" value="' + L[i] + '" />';
		if(_active_language == 'Zhuyin')
		{
			keyboard += '<div class="frm"><div class="sups">'+ sup[i] +'</div>' + key + '</div>';			
		}
		else
		{
			if(enableSuperScript)
			{
				keyboard += '<div class="frm"><div class="sups">'+ sup[i] +'</div>' + key + '</div>';
			}
			else
			{			
				keyboard += key;
			}
		}
	}
	keyboard += '<input type="button"  class="button dark '+ ids[40] + '" id="enter" value="Enter" />';
			
	keyboard += '<div style="clear:both;"></div>';

	keyboard += '<input type="button" class="button dark '+ ids[41] + '" id="shift_left" value="Shift" />';
	for(var i = 43; i <= 52; ++i)
	{
		var key = '<input type="button" class="button silver key '+ diacritics + ' ' + ids[i-1] + '" value="' + L[i] + '" />';
		if(_active_language == 'Zhuyin')
		{
			keyboard += '<div class="frm"><div class="sups">'+ sup[i-1] +'</div>' + key + '</div>';			
		}
		else
		{
			if(enableSuperScript)
			{
				keyboard += '<div class="frm"><div class="sups">'+ sup[i-1] +'</div>' + key + '</div>';
			}
			else
			{			
				keyboard += key;
			}
		}
	}
		
	keyboard += '<input type="button" class="button dark '+ ids[52] + '" id="shift_right" value="Shift" />';
			
	keyboard += '<div style="clear:both;"></div>';
			
	keyboard += '<input type="button" class="button dark '+ ids[53] + '" id="ctrl_left" value="Ctrl" />';
	keyboard += '<input type="button" class="button dark '+ ids[54] + '" id="alt_left" value="Alt" />';
	keyboard += '<input type="button" class="button silver key '+ ids[55] + '" id="spacebar" value=" " />';
	keyboard += '<input type="button" class="button dark '+ ids[56] + '" id="alt_right" value="Alt" />';
	keyboard += '<input type="button" class="button dark '+ ids[57] + '" id="ctrl_right" value="Ctrl" />';
	keyboard += '</div>';			
	keyboard += '<div style="clear:both;"></div>';

	// add tashkeel
	keyboard += '<div style="margin-left:138px; margin-top:5px;">';		
		keyboard += '<a target="_blank" class="button dark darkColor" style="background:#3458CF;" href="http://www.google.com" id="Google">Google</a>';		
		keyboard += '<a target="_blank" class="button dark darkColor" style="background:#CE2A2B;" href="http://www.youtube.com" id="YouTube">YouTube</a>';
		keyboard += '<a target="_blank" class="button dark darkColor" style="background:#28ACEA;" href="http://www.twitter.com" id="Twitter">Twitter</a>';		
		keyboard += '<a target="_blank" class="button dark darkColor" style="background:#3887F6;" href="http://www.bing.com" id="Bing">Bing</a>';
		keyboard += '<a target="_blank" class="button dark darkColor" style="background:#333333;" href="http://www.wikipedia.com" id="Wikipedia">Wikipedia</a>';
	keyboard += '</div>';			
	keyboard += '<div style="clear:both;"></div>';				
	keyboard += '</div>';	

	//keyboard += '<a target="_blank" class="button dark darkColor" style="background:#3B5999;" href="http://www.facebook.com" id="Facebook">Facebook</a>';
	return keyboard;
}

function load_n_level_mobile(L1, L2, L3, L4, L5)
{		
	var width = $(window).width();		
	$nBtns = 13;
	$margin = 1 * $nBtns + 2;
	btnW = Math.ceil((width - $margin) / ($nBtns + 1));
	btnH = btnW;

	var L;
	if(_level == 1)
		L = L1;
	else if(_level == 2)
		L = L2;
	else if(_level == 3)
		L = L3;
	else if(_level == 4)
		L = L4;
	else if(_level == 5)
		L = L5;

	if(L.length == 0)
	{
		L = L1;
	}

 
 var diacritics = '';
 if((_active_language == "Subscript") || (_active_language == "Superscript"))
 {
	diacritics = 'tashkeel';
}
	

	// Update keyboard width to use full screen
	$(".iTextArea").width(width);
	$(".iTextArea").css({"width":width});
	$(".iTextArea").css({"max-width":0.9*width});
	$("#ikeybrd").width(width);
	$("#ikeybrd2").width(0.99*width);
	
	var drkBtnW = 2 * btnW;
	var drkBtnH = btnH;
	var spaceBtnW = 5.5 * btnW;
	var key_dim = 'style="width: '+btnW+'px; height:'+btnH+'px;"';
	var dark_key_dim = 'style="width: '+drkBtnW+'px; height:'+drkBtnH+'px;"';
	var space_key_dim = 'style="width: '+spaceBtnW+'px; height:'+drkBtnH+'px;"';

	var keyboard = '<div id="keypad">'; 
	
	var enableSuperScript = 0;
			
	for(var i = 0; i <= 12; ++i)
	{
		var key = '<input type="button" '+key_dim+' class="button silver key '+ diacritics + ' ' + ids[i] + '" value="' + L[i] + '" />';		
		if(_active_language == 'Zhuyin')
		{
			if(_isMobile)
				keyboard += key;
			else
				keyboard += '<div class="frm"><div class="sups">'+ sup[i] +'</div>' + key + '</div>';
		}
		else
		{
			if(enableSuperScript)
			{
				keyboard += '<div class="frm"><div class="sups">'+ sup[i] +'</div>' + key + '</div>';
			}
			else
			{			
				keyboard += key;
			}
		}
	}
		
	
			
	keyboard += '<div style="clear:both;"></div>';

	
	for(var i = 15; i <= 27; ++i)
	{
		var key = '<input type="button" '+key_dim+' class="button silver key '+ diacritics + ' ' + ids[i] + '" value="' + L[i] + '" />';
		if(_active_language == 'Zhuyin')
		{
			if(_isMobile)
				keyboard += key;
			else
				keyboard += '<div class="frm"><div class="sups">'+ sup[i] +'</div>' + key + '</div>';
		}
		else
		{
			if(enableSuperScript)
			{
				keyboard += '<div class="frm"><div class="sups">'+ sup[i] +'</div>' + key + '</div>';
			}
			else
			{			
				keyboard += key;
			}
		}
	}
			
	keyboard += '<div style="clear:both;"></div>';
			
	//keyboard += '<input type="button" '+dark_key_dim+' class="button dark" id="caps" value="Caps Lock" /><b style="position:relative"></b>';
	keyboard += '<input type="button" '+dark_key_dim+' class="button dark '+ ids[28] + '" id="caps" value="Caps" />';
	for(var i = 29; i <= 39; ++i)
	{
		var key = '<input type="button" '+key_dim+' class="button silver key '+ diacritics + ' ' + ids[i] + '" value="' + L[i] + '" />';
		if(_active_language == 'Zhuyin')
		{
			if(_isMobile)
				keyboard += key;
			else
				keyboard += '<div class="frm"><div class="sups">'+ sup[i] +'</div>' + key + '</div>';
		}
		else
		{
			if(enableSuperScript)
			{
				keyboard += '<div class="frm"><div class="sups">'+ sup[i] +'</div>' + key + '</div>';
			}
			else
			{			
				keyboard += key;
			}
		}
	}
	
			
	keyboard += '<div style="clear:both;"></div>';

	keyboard += '<input type="button" '+dark_key_dim+' class="button dark '+ ids[41] + '" id="shift_left" value="Shift" />';
	for(var i = 43; i <= 52; ++i)
	{
		var key = '<input type="button" '+key_dim+' class="button silver key '+ diacritics + ' ' + ids[i-1] + '" value="' + L[i] + '" />';
		if(_active_language == 'Zhuyin')
		{
			if(_isMobile)
				keyboard += key;
			else
				keyboard += '<div class="frm"><div class="sups">'+ sup[i-1] +'</div>' + key + '</div>';
		}
		else
		{
			if(enableSuperScript)
			{
				keyboard += '<div class="frm"><div class="sups">'+ sup[i-1] +'</div>' + key + '</div>';
			}
			else
			{			
				keyboard += key;
			}
		}
	}
	keyboard += '<input type="button" '+key_dim+' class="button dark '+ ids[14] + '" id="tab" value="T" />';	
		
			
	keyboard += '<div style="clear:both;"></div>';
			
	keyboard += '<input type="button" '+dark_key_dim+' class="button dark '+ ids[53] + '" id="ctrl_left" value="Ctrl" />';
	keyboard += '<input type="button" '+dark_key_dim+' class="button dark '+ ids[54] + '" id="alt_left" value="Alt" />';
	keyboard += '<input type="button" '+space_key_dim+' class="button silver key '+ ids[55] + '" id="spacebar" value=" " />';	
	keyboard += '<input type="button" '+dark_key_dim+' class="button dark '+ ids[13] + '" id="backspace" value="Bkspace" />';
	keyboard += '<input type="button"  '+dark_key_dim+' class="button dark '+ ids[40] + '" id="enter" value="Enter" />';
	
	keyboard += '<div style="clear:both;"></div>';

	// search services
	keyboard += '<div style="margin-top:5px; margin-left:40px;">';		
		keyboard += '<a target="_blank"  class="button dark darkColor" style="background:#3458CF;" href="http://www.google.com" id="Google">Google</a>';		
		keyboard += '<a target="_blank"  class="button dark darkColor" style="background:#CE2A2B;" href="http://www.youtube.com" id="YouTube">YouTube</a>';
		keyboard += '<a target="_blank"  class="button dark darkColor" style="background:#28ACEA;" href="http://www.twitter.com" id="Twitter">Twitter</a>';		
		keyboard += '<a target="_blank"  class="button dark darkColor" style="background:#3887F6;" href="http://www.bing.com" id="Bing">Bing</a>';
		keyboard += '<a target="_blank"  class="button dark darkColor" style="background:#333333;" href="http://www.wikipedia.com" id="Wikipedia">Wikipedia</a>';
	keyboard += '</div>';			
	keyboard += '<div style="clear:both;"></div>';		
	keyboard += '</div>';			

	//keyboard += '<a target="_blank" class="button dark darkColor" style="background:#3B5999;" href="http://www.facebook.com" id="Facebook">Facebook</a>';
	return keyboard;
}