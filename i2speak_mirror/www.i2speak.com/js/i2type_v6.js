/* (c) Sciweavers.org - http://www.sciweavers.org/i2type */
var _isMobile = isMobile();

var _IE = 0;
var _active_language = '';
var _font_size = 33;
var _font_family = '';
var extName = '';

var _level = 1;
var _caps = 0;
var _shift_left = 0;
var _shift_right = 0;
var _alt_left = 0;
var _alt_right = 0;
var _ctrl_left = 0;
var _ctrl_right = 0;
var download_url = '';
var simulate_mouse_click = 0;
var ctrl_btn = 0;
var alt_btn = 0;
var shift_btn = 0;
var SHIFT_KEY   = 16;
var CTRL_KEY    = 17;
var ALT_KEY     = 18;
var TAB_KEY     = 9;
var ENTER_KEY   = 13;
var BKSPACE_KEY = 8;
var CAPS_KEY    = 20;
var DEL_KEY    = 46;
var ESC_KEY    = 27;
var SPACE  = ' ';

var PGUP_KEY    = 33;
var PGDN_KEY    = 34;
var UP_KEY      = 38;
var DN_KEY      = 40;
var SPACE_KEY   = 32;

var _activeWord = 1;
var _totalWords = 3;
var _autoComp = 0;
var exit = 0;
var _hide = 1;

// chrome differs than all browsers in 3 key codes (-, =, ;)
var _kSemiColon = 59;
var _kEqual = 107;
var _kMinus = 109;
 if ($.browser.webkit) 
 {
	_kSemiColon = 186;
	_kEqual = 187;
	_kMinus = 189;
 }

// all browsers have the same key codes except chrome
var alphanumeric_ids = [223, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, _kMinus, _kEqual, -1, 
						-1, 81, 87, 69, 82,84,89,85,73,79,80,219,221,222,
						-1,65,83,68,70,71,72,74,75,76,_kSemiColon,192,-1, 
						-1,90,88,67,86,66,78,77,188,190,191,-1,
						-1, -1, 32, -1, -1];
 

var x = new Array();
x["a"] = new Array("&#x0251;","&#x0252;","&#x0250;","&aelig;","&alpha;");
x["b"] = new Array("&#x0299;","&beta;","&#x0253;","&#x025E;");
x["c"] = new Array("&#x0254;","&ccedil;","&#x0276;","&#x0255;","&#x010D;");
x["d"] = new Array("&#x0256;","&#x0257;","&#x1E0D;","&#x00F0;","d&#x032A;","ʤ");
x["e"] = new Array("&#x0259;","&#x025A;","&#x0258;","&#x1EB9;","&#x025B;","&#x025C;","&epsilon;","ɝ");
x["f"] = new Array("&#x0278;","&#x0284;","&#x025F;");
x["g"] = new Array("&#x0260;", "&#x0261;", "&#x0262;", "&#x029B;","&#x0263;", "ˠ");
x["h"] = new Array("&#x0127;","&#x0266;","&#x0265;","&#x029C;","&#x0267;", "ʰ");
x["i"] = new Array("&#x026A;","&#x0268;");
x["j"] = new Array("&#x025F;","&#x029D;","&#x01F0;", "ʲ");
x["l"] = new Array("&#x029F;","&#x026D;","&#x026E;","&#x026B;","&#x026C;");
x["m"] = new Array("&#x0271;","&#x026F;","&#x0270;","ʍ");
x["n"] = new Array("ɴ", "&#x014B;","&#x0272;","&#x0273;", "ⁿ");
x["o"] = new Array("ʘ","ø","ɵ","ɸ","θ","œ");
x["p"] = new Array("&#x0278;");
x["r"] = new Array("ʀ","ʁ","ɾ","ɹ","ɺ","ɻ","ɽ");
x["s"] = new Array("&#x0282;","&#x0283;","&#x0284;");
x["t"] = new Array("&#x0288;","ʧ", "&theta;","&#x00F0;");
x["u"] = new Array("&#x028A;","&#x0289;");
x["v"] = new Array("&#x028B;", "ⱱ", "&#x028C;");
x["w"] = new Array("<sup>w</sup>","&#x026F;","&#x0270;","ʷ");
x["x"] = new Array("χ");
x["y"] = new Array("&#x028F;","&#x028E;","&#x0177;");
x["z"] = new Array("&#x0292;","&#x0290;","&#x0291;");
x["0"] = new Array("&oslash;","&#x0298;","&#x0275;");
x["1"] = new Array("|", "&#x01C0;", "&#x2016;","&#x01C1;","&#x01C2;");
x["2"] = new Array("&#x0294;","&#x0295;","&#x02A1;","&#x02A2;");
x["3"] = new Array("&#x025B;","&#x025C;","&#x0292;","&#x025D;","&#x025E;");
x["="] = new Array("&#x2016;","&#x01C1;","&#x01C2;");
x[":"] = new Array("&#x02D0;");
x["'"] = new Array("&#x02D1;","&#x02c8;");
x["/"] = new Array("&#x030B;","&#x0301;");
x["\\"] = new Array("&#x030F;","&#x0300;");
x["_"] = new Array("&#x0325;","&#x032F;","&#x032C;","&#x0339;","&#x031C;","&#x031F;","&#x035C;");
x["^"] = new Array("&#x030A;","&#x02DE;","&#x0303;","&#x0308;","&#x033D;","&#x0361;");
x["?"] = new Array("ʔ","ʡ","ʕ","ʢ","ˤ");
x["|"] = new Array("1");
						

// New Caret Pos Detection 
//-------------------------------------------------------------------------------
	var _caretLeftPos = 0;
	var _caretTopPos = 0;

	var element = document.querySelector("#preview");
	["keyup", "click", "scroll"].forEach(function (event) {
	 element.addEventListener(event, update_caret_pos);
	});

	// initialize the replica div
    var fontSize = getComputedStyle(element).getPropertyValue("font-size");
	var rect = document.createElement("div");
	document.body.appendChild(rect);
	rect.style.position = "absolute";
	rect.style.backgroundColor = "red";
	rect.style.height = fontSize;
	rect.style.width = "1px";

	// call every textArea event. later to be called if button is clicked
	function update_caret_pos() {
		var coordinates = getCaretCoordinates(element, element.selectionEnd);	
		_caretLeftPos = element.offsetLeft - element.scrollLeft + coordinates.left;			
		_caretTopPos = element.offsetTop - element.scrollTop + coordinates.top;		
		// enable for debug
		//rect.style.top = _caretTopPos + "px";
		//rect.style.left = _caretLeftPos + "px";
		//console.log("(left, top) = (%s, %s)", _caretLeftPos, _caretTopPos);
	}

//-------------------------------------------------------------------------------											


function save_as(uri)
{
	window.location = uri;	
}

function init(ext_name)
{
	check_IE_browser();	
	full_screen();
	//hideBanner();
	load_cached_txt();
	$("#preview").css({"font-size":_font_size});	
	load_keyboard(_active_language);
	updateCharCount();	
	extName = ext_name;
	$('#extName').val(extName);	
}

function full_screen()
{
	if(_isMobile)
	{
		var width = $(window).width();		
		$(".iTextArea").width(width);
		$(".iTextArea").css({"width":width});
		$(".iTextArea").css({"max-width":0.9*width});
		$("#ikeybrd").width(width);
		$("#ikeybrd2").width(0.99*width);
	}
}

function reset_ctrl_keys()
{	
	_shift_left = 0;
	_shift_right = 0;
	_alt_left = 0;
	_alt_right = 0;
	_ctrl_left = 0;
	_ctrl_right = 0;
}


function reset_tabs()
{
	$("ul.tabs li").removeClass("active"); //Remove any "active" class	
	//
	// update the tab control if the user hit listbox
	//
	$("ul.tabs li").each(function(index) {	
		if($(this).text() == "ipa keyboards")
		{
			$(this).addClass("active"); //Add "active" class to selected tab
			$(this).click();
		}
	});
}

function changeKeyboardLayout(name)
{
	var uri = decodeURIComponent(name);
	uri = uri.replace(" ", "-") + "-phonetic-keyboard";
	window.location.href = uri;
}

function load_keyboard(language)
{

	
	var language_options = '';
	if(language != _active_language)
	{
		//hideBanner();
	}
	
	update_key_logic();
	_active_language = language;
	
	$("#preview").focus();
	
	switch(language)
	{
		case "smart ipa":
			language_options = Smart_IPA();
			break;			
		case "ipa english":
			language_options = IPA_English();
			break;
		case "unicode":
			language_options = Unicode_Phonetic_Keyboard();
			break;			
		case "sampa english":
			language_options = Sampa_English();
			break;			
		case "superscript symbols":
			language_options = Superscript();
			break;
		case "subscript symbols":
			language_options = Subscript();
			break;
		case "flipped symbols":
			language_options = Flipped();
			break;
		case "retroflex symbols":
			language_options = Retroflex();
			break;
		case "extended symbols":
			language_options = Extended();
			break;
		case "barred symbols":
			language_options = Barred();
			break;
	}
	$("#keyboard").html(language_options);	
	update_highlight();	
}

function update_key_logic()
{	
	var alt   = _alt_left   || _alt_right;
	var ctrl  = _ctrl_left  || _ctrl_right;
	var shift = _shift_left || _shift_right;
	if((ctrl && alt && shift) || (_alt_right && shift))
	{
		_level = 4;
	}
	else if((ctrl && alt) || _alt_right)
	{
		_level = 3;
	}	
	else if(shift)
	{
		if(_caps)
			_level = 1;		// load small letters if caps is set
		else
			_level = 2;		// otherwise, load L2
	}		
	else if(_caps)
	{
		_level = 5;
	}
	else
	{
		_level = 1;
	}
	
}

function update_highlight()
{		
	if(_caps == 1)
	{		
		$("#caps").css({"background":"#0097DD"});								
	}
	if(_shift_left == 1)
	{
		$("#shift_left").css({"background":"#FE0E5D"});															
	}
	if(_shift_right == 1)
	{
		$("#shift_right").css({"background":"#FE0E5D"});	
	}
	if(_alt_left == 1)
	{
		$("#alt_left").css({"background":"#FE0E5D"});	
	}
	if(_alt_right == 1)
	{
		$("#alt_right").css({"background":"#FE0E5D"});	
	}
	if(_ctrl_left == 1)
	{
		$("#ctrl_left").css({"background":"#FE0E5D"});	
	}	
	if(_ctrl_right == 1)
	{
		$("#ctrl_right").css({"background":"#FE0E5D"});	
	}
}

function updateCharCount()
{
	setCookie("i2speak", document.getElementById("preview").value);
	var count = $('#preview').val().length;
	$("#iChar").val(count);
	if(count > 140)
		$("#iChar").css({"color":"#FF0054"});
	else
		$("#iChar").css({"color":"#444"});	
}

/* Detect IE Version */
function check_IE_browser() {
	var Browser = {
	  Version: function() {
		var version = 999; // we assume a sane browser
		if (navigator.appVersion.indexOf("MSIE") != -1)
		  version = parseFloat(navigator.appVersion.split("MSIE")[1]);
		return version;
	  }
	}
	if (Browser.Version() < 9) {
        _IE = 1;
		//$("#IE_Msg").css({"background":"#e60861", "color":"#fff", "font":"normal 39px verdana, Helvetica, Tahoma", "margin":"10px auto", "width":"800px", "padding":"20px"});
		//$("#IE_Msg").html("Some advanced features of i2Speak is not supported by your current version of Internet Explorer. We highly recommend you to install Google Chrome, Firefox, or Safari to enjoy full functionality and great user experience.");
	}	
}

function update_fonts(font)
{
	_font_family = font;
	$("#preview").css({"font-family":font});
	$("#autoComplete").hide();
}

function get_active_language()
{
	var selObj = document.getElementById('ListBox_Languages');
	var selIndex = selObj.selectedIndex;
	var language = selObj.options[selIndex].value;
	return language;
}

function get_next_pane()
{
	var selObj = document.getElementById('ListBox_Types_fonts');
	var size = selObj.length;
	var selIndex = selObj.selectedIndex;
	if(selIndex < size - 1)
		selIndex += 1;
	else
		selIndex = 0;
	selObj.selectedIndex = selIndex;
	var font = selObj.options[selIndex].value;
	update_fonts(font);
}

function get_back_pane()
{
	var selObj = document.getElementById('ListBox_Types_fonts');
	var size = selObj.length;
	var selIndex = selObj.selectedIndex;
	if(selIndex > 0)
		selIndex -= 1;
	else
		selIndex = size-1;
	selObj.selectedIndex = selIndex;
	var font = selObj.options[selIndex].value;
	update_fonts(font);
}

function get_next_keyboard()
{
	var selObj = document.getElementById('ListBox_Languages');
	var size = selObj.length;
	var selIndex = selObj.selectedIndex;
	if(selIndex < size - 1)
		selIndex += 1;
	else
		selIndex = 0;
	selObj.selectedIndex = selIndex;
	var service = selObj.options[selIndex].value;
	_active_language = service;
	load_keyboard(_active_language);
}


function get_back_keyboard()
{
	var selObj = document.getElementById('ListBox_Languages');
	var size = selObj.length;
	var selIndex = selObj.selectedIndex;
	if(selIndex > 0)
		selIndex -= 1;
	else
		selIndex = size-1;
	selObj.selectedIndex = selIndex;
	var service = selObj.options[selIndex].value;
	_active_language = service;
	load_keyboard(_active_language);
}

function hideBanner()
{	
	$("#iBanner").slideUp("slow");
	goPageTop();
	$("#hide_banner").text("Show Top Banner");
}

function goPageTop()
{
	$("html, body").animate( { scrollTop: 0 }, 500 );
}

function updateUI(id, option_val) {	
	$("#" + id + " option:selected").removeAttr("selected");
	$("#" + id + " option[value="+option_val+"]").attr("selected","selected");
	load_keyboard(option_val);	
}									

function getCaretTopLeftPos()
{
	var previewWidth = $("#preview").width();
	var previewHeight = $("#preview").height();
	var txt = $("#preview").val();
	var textarea = document.getElementById("preview");
	var pos = getCaret(textarea);
	
	//
	// extract the text from 0:caret position
	// replace space with &nbsp and \n with <br />
	//
	var div = $("#divClonePreview");
	div.css({"font-family":_font_family});
	div.css({"font-size":_font_size});
	
	//
	// compute the dimension of the virtual marker
	//
	var stopLtr = '_';
	var span = $("#spanClonePreview");
	span.css({"font-family":_font_family});
	span.css({"font-size":_font_size});		
	span.html(stopLtr);
	var stopLtrHeight = span.height();
	var stopLtrWidth = span.width();
			
	// replace the \n with <br />
	var txtDiv = '';
	for(var i = 0; i < pos; ++i)
	{
		if(txt[i] == "\n")
			txtDiv += '<br />';
		else if(txt[i] == SPACE)
			txtDiv += "&nbsp";
		else
			txtDiv += txt[i];
	}
	
	//
	// compute the position of the virtual marker
	//	
	//div.show();
	div.html(txtDiv + "<span id='marker' style='position:absolute;'>"+ stopLtr +"</span>");		
	var position = $('#marker').position();
	//div.hide();

	
	var h = position.top + stopLtrHeight;	
	var Top = h - textarea.scrollTop;
	var Left = position.left-stopLtrWidth;
	
	var lastLetter = '';
	if(pos > 0)
		lastLetter = txt[pos-1];	
	return Array(Top, Left, lastLetter);
}

function inarray(arr, v) {
	for (i=0; i < arr.length; i++)
	{
		if (arr[i]==v) 
		return true;
	}
	return false;
}

function getCaretCharacter()
{
	var lastLetter = "";
	var txt = $("#preview").val();
	var textarea = document.getElementById("preview");
	var pos = getCaret(textarea);
	if(pos > 0)
		lastLetter = txt[pos-1];

	return lastLetter;
}

function recommend()
{
	if($('#smart_check').is(':checked') /*&& (_active_language == "smart ipa")*/) // allow smart menu in all keyboards
	{
		_activeWord = 1;
		_autoComp = 1;

		var xOffset = 2 * ($("#autoComplete").outerWidth(true) - $("#autoComplete").width());
		
		var Left, Top, lastLetter;

		// old method of computing coordinate of recommend menu
		/*var TopLeft = getCaretTopLeftPos();	

		if(_isMobile)
		{
			Top   = TopLeft[0] + 320;  // +7
			Left = TopLeft[1] + xOffset + 50;	
		}
		else
		{
			Top   = TopLeft[0] + 290;  // +7
			Left = TopLeft[1] + xOffset + 20;	
		}
		
		lastLetter = TopLeft[2];*/

		// override the top/left using new .js method.
		// however, you still need to read the last character using old method
		Top = _caretTopPos + _font_size + 10; // 30 should be row height given font size
		Left = _caretLeftPos;
		lastLetter = getCaretCharacter();


		if((lastLetter == SPACE) || (lastLetter == ""))
		{
			$("#autoComplete").hide();
			_autoComp = 0;
		}	
		else
		{
			if(lastLetter != "undefined")
			{
				var out = getContent(lastLetter.toLowerCase());
				if(out != '')
				{
					$("#autoComplete").html(out);
					$("#autoComplete").show();
					$("#autoComplete").css({position:"absolute",left:Left+"px",top:Top+"px"});					
				}
				else
				{
					$("#autoComplete").hide();
					_autoComp = 0;
				}
			}
		}
	}
}

//
// the dropdown menu
//
function getContent(key)
{	
	var id;
	var selected;
	var index = inComplexArray(key, x);
	var hints = '';
	if(index != -1)
	{
		_totalWords = x[index].length;
		for(var i = 0; i < _totalWords; ++i)
		{
			id = i + 1;
			if(i == 0)
				selected = 'selected';
			else
				selected = '';
			if(key == '/' || key == '\\' || key == '_' || key == '^')
				hints += '<a class="choice silver tone '+ selected +'" style="padding:0 10px 0 25px;" id="'+ id +'" href="#_">'+x[index][i]+'</a>';
			else
				hints += '<a class="choice dfont '+ selected +'" id="'+ id +'" href="#_">'+x[index][i]+'</a>';
		}
	}
	return hints;
}

//
// click mouse inside textarea to move caret to different location
//
$("#preview").live("click" , function() {		
	update_caret_pos();
	recommend();
});							

$("#backspace").live("click" , function() {		
	var textarea = document.getElementById("preview");
	var pos = getCaret(textarea);
	var str = $("#preview").val();
	val = str.substring(0,pos-1) + str.substring(pos, str.length);
	$("#preview").val("");
	$("#preview").insertAtCaret(val);
	$("#preview").trigger("change");
	setCaretToPos(textarea, pos-1);	
});							

$(".choice").live("click" , function() {
	$("#"+_activeWord).removeClass("selected").addClass("deselected");
	var id = $(this).attr("id");
	_activeWord = id;
	$("#"+_activeWord).removeClass("deselected").addClass("selected");
	$("#backspace").click();
	var val = $(this).text();
	$("#preview").insertAtCaret(val);
	$("#autoComplete").hide();
	_autoComp = 0;
});

function resetChoices()
{
	for(var id = 1; id <= _totalWords; ++id)
		$("#"+id).removeClass("selected").addClass("deselected");
}

$(".choice").live("hover" , function() {
	resetChoices();
	var id = $(this).attr("id");
	$("#"+id).removeClass("deselected").addClass("selected");
	var val = $(this).text();
});

$("#enter").live("click" , function() {	
	if(!_autoComp)
	{
		val = "\r";
		$("#preview").insertAtCaret(val);
		$("#preview").trigger("change");
	}
	else
	{
		$("#backspace").click();
		var val = $("#"+_activeWord).text();
		$("#preview").insertAtCaret(val);
		$("#autoComplete").hide();
		_autoComp = 0;
	}
});


// called by IE browser
function IE_keydown (event){

    if(_IE)
    {
        var key = ('which' in event) ? event.which : event.keyCode;
        process_keydown(key, event);
    }
}    

// called by non IE browsers
// Keydown is called only when user types using keyboard
//
// When user type on screen using mouse...he either clicks 
// a silver or dark grey button.
// Silver button activates $(".button.silver.key").click()
// Dark button activates specific handler related to the button function such as $("#tab").click()
//
$("#preview").keydown(function(e) {
	if(!_IE)
    {
        key = (e.keyCode) ? e.keyCode : e.which;    
        process_keydown(key, e);
    }
});

//
// Keydown is called only when user types using keyboard
//
// When user type on screen using mouse...he either clicks 
// a silver or dark grey button.
// Silver button activates $(".button.silver.key").click()
// Dark button activates specific handler related to the button function such as $("#tab").click()
//
function process_keydown(key, e)
{	
	//alert(key);
	if(key == DN_KEY)
	{
		if(_autoComp)
		{
			i2preventDefault(e);
			$("#"+_activeWord).removeClass("selected").addClass("deselected");
			++_activeWord;		
			if(_activeWord > _totalWords)
				_activeWord = 1;
			$("#"+_activeWord).removeClass("deselected").addClass("selected");
		}
	}
	else if(key == UP_KEY)
	{
		if(_autoComp)
		{
			i2preventDefault(e);
			$("#"+_activeWord).removeClass("selected").addClass("deselected");
			--_activeWord;
			if(_activeWord < 1)
				_activeWord = _totalWords;
			$("#"+_activeWord).removeClass("deselected").addClass("selected");
		}
	}
	else
	{
	
        if(key == SHIFT_KEY)
        {
            shift_btn = 1;
        }
        else if(key == CTRL_KEY)
        {
            ctrl_btn = 1;
        }
        else if(key == ALT_KEY)
        {
            alt_btn = 1;
        }

        //
        // simulate pressed button
        //
        $("."+key).addClass("shadow");
        $("."+key).addClass("cyan");							
        
        if((key == SHIFT_KEY)||
           (key == CTRL_KEY) ||
           (key == ALT_KEY)	 ||
           (key == CAPS_KEY) ||		
           (key == TAB_KEY)  		// ENTER_KEY & BKSPACE_KEY are default behaviour of textarea
           )
        {							
            //
            // simulate the click
            //		
            simulate_mouse_click = 1;		// distinguish if the button is clicked from the physical keyboard or on screen
            $("."+key).click();		// load the caps keyboard
            simulate_mouse_click = 0;		
        }
        
        if(key == ENTER_KEY)
        {							
            if(_autoComp)
            {
                i2preventDefault(e);
                //
                // simulate the click
                //		
                simulate_mouse_click = 1;		// distinguish if the button is clicked from the physical keyboard or on screen
                $("."+key).click();		// load the caps keyboard
                simulate_mouse_click = 0;		
            }
        }
        
        var alphaNum = inStringArray(key, alphanumeric_ids);
        
        if(((alphaNum > -1) && (!ctrl_btn)) 				|| // if alphanumeric i.e., silver key & ctrl is not pressed to enable default textarea functions such as ctrl+A, ctrl+C, etc
           ((alphaNum > -1) && (ctrl_btn) && (alt_btn))  ||
           ((alphaNum > -1) && (shift_btn) && (alt_btn))  ||
           ((alphaNum > -1) && (alt_btn))  ||
           ((alphaNum > -1) && (ctrl_btn) && (alt_btn) && (shift_btn))
        )							   
        {		
            //							
            // when cursor is inside textarea ignore the default behaviour of showing typed character because
            // it always reports English and we need to report our own language depending on the current layout
            //

            // If keyboard is enabled, you can't type inside textarea using keyboard
            // i mean, you type but the script will map your letters to programmed letters
            if(_active_language != "pulmonic-consonants" && 
               _active_language != "non-pulmonic-consonants" && 
               _active_language != "vowels" && 
               _active_language != "diphthongs" &&
			   _active_language != "diacritics" &&
			   _active_language != "tones" &&
			   _active_language != "suprasegmental" &&
			   _active_language != "affricates" &&
			   _active_language != "others")
            {
	            i2preventDefault(e);
	    
	            //
	            // simulate the click
	            //
	            simulate_mouse_click = 1;		// distinguish if the button is clicked from the physical keyboard or on screen
	            $("."+key).click();				// if NUM_SELECTOR is 0, then any number click will correspond to a letter
	            simulate_mouse_click = 0;		// otherwise, a number. This is handled in .silver function
        	}
        	else
        	{
        		// allow typed characters on pysical keyboard to pass
        	}
        }	
	}
}

function get_active_language()
{
	var selObj = document.getElementById('ListBox_Languages');
	var selIndex = selObj.selectedIndex;
	var language = selObj.options[selIndex].value;
	return language;
}


// called by IE bvrowser
function IE_keyup (event){

    if(_IE)
    {
        var key = ('which' in event) ? event.which : event.keyCode;
        process_keyup(key, event);
    }
}    

// called by non IE bvrowser
$("#preview").keyup(function(e) {
	if(!_IE)
    {
        key = (e.keyCode) ? e.keyCode : e.which;    
        process_keyup(key, e);
    }
});

function process_keyup(key, e)
{    
    if(key == ESC_KEY)
    {			
        $("#autoComplete").hide();
        _autoComp = 0;
        return;
    }
     
    if((key != ENTER_KEY) && (key != SPACE_KEY) && (key != UP_KEY) && (key != DN_KEY))
    {
        /* show recommendation menu*/
        recommend();		
    }
    
    var alphaNum = inStringArray(key, alphanumeric_ids);
    if(alphaNum > -1)	// if alphanumeric i.e., silver key
    {							
        $("."+key).removeClass("shadow");
        $("."+key).removeClass("cyan");		
    }
    
    if(key == SHIFT_KEY)
    {
        shift_btn = 0;
        _shift_left = 0;
        _shift_right = 0;
        load_keyboard(_active_language);
    }							
    else if(key == CTRL_KEY)
    {
        ctrl_btn = 0;
        _ctrl_left = 0;
        _ctrl_right = 0;
        load_keyboard(_active_language);
    }					
    else if(key == ALT_KEY)
    {
        alt_btn = 0;
        _alt_left = 0;
        _alt_right = 0;
        load_keyboard(_active_language);
    }		
    
    if((key == TAB_KEY) || (key == ENTER_KEY) || (!_caps) || (key == BKSPACE_KEY))
    {	
        $("#preview").focus();
        $("."+key).removeClass("shadow");
        $("."+key).removeClass("cyan");							
    }		
}


$("#tab").live("click" , function() {	
	// Tab mouse click does not work							
	val = "\t";
	$("#preview").insertAtCaret(val);
	$("#preview").trigger("change");
});

$("#caps").live("click" , function() {
	_caps = !_caps;
	load_keyboard(_active_language);
});							

$("#shift_left").live("click" , function() {
	if(simulate_mouse_click)
	{
		_shift_left = 1;	// always map to left shift								
	}
	else
	{
		_shift_left = !_shift_left;	// always map to left shift
		if(!_shift_left)
		{
			ctrl_btn = 0;
		}
	}
	_shift_right = 0;	// no two shifts								
	load_keyboard(_active_language);							
});

$("#ctrl_left").live("click" , function() {
	if(simulate_mouse_click)
	{
		_ctrl_left = 1;	    // always map to left shift								
	}
	else
	{
		_ctrl_left = !_ctrl_left;	    // always map to left shift								
		if(!_ctrl_left)
		{
			ctrl_btn = 0;
		}								
	}
	_ctrl_right = 0;	// no two ctrls
	load_keyboard(_active_language);
});	

$("#shift_right").live("click" , function() {
	if(simulate_mouse_click)
	{
		_shift_right = 1;	// always map to left shift								
	}
	else
	{
		_shift_right = !_shift_right;	// always map to left shift
		if(!_shift_right)
		{
			ctrl_btn = 0;
		}								
	}
	_shift_left = 0;	// no two shifts								
	load_keyboard(_active_language);							
});

$("#ctrl_right").live("click" , function() {
	if(simulate_mouse_click)
	{
		_ctrl_right = 1;	    // always map to left shift								
	}
	else
	{
		_ctrl_right = !_ctrl_right;	    // always map to left shift								
		if(!_ctrl_right)
		{
			ctrl_btn = 0;
		}								
	}
	_ctrl_left = 0;	// no two ctrls
	load_keyboard(_active_language);
});	


$("#alt_right").live("click" , function() {
	if(simulate_mouse_click)
	{
		_alt_right = 1;	    // always map to left shift								
	}
	else
	{
		_alt_right = !_alt_right;	    // always map to left shift								
		if(!_alt_right)
		{
			alt_btn = 0;
		}								
	}
	_alt_left = 0;	// no two alts
	load_keyboard(_active_language);
});	

$("#alt_left").live("click" , function() {

	if(simulate_mouse_click)
	{
		_alt_left = 1;	    // always map to left shift								
	}
	else
	{
		_alt_left = !_alt_left;	    // always map to left shift								
		if(!_alt_left)
		{
			alt_btn = 0;
		}								
	}
	_alt_right = 0;	// no two alts
	load_keyboard(_active_language);
});	


//
// click button by mouse
//
$(".button.silver.key, .button.silver.keytone").live("click" , function() {

	// update coordinates of caret
	update_caret_pos();

	var val = $(this).val();	
	if(val == SPACE)
	{
		if(_autoComp)
		{		
			//$("#backspace").click();
			//var val = $("#"+_activeWord).text();
			//$("#preview").insertAtCaret(val);
		}
		else
		{
			//$("#preview").insertAtCaret(SPACE);
		}
		$("#autoComplete").hide();
		_autoComp = 0;		
	}
	/*if(_active_language == "Sampa English")
	{
		//val = i2sampa(val);
	}*/
	$("#preview").insertAtCaret(val);

	_editor = $("#preview").val();
	$("#preview").trigger("change");					

	if(!simulate_mouse_click)
	{
		recommend();
	}	
});


function inComplexArray(str, arry)
{
	for(var i in arry)
	{
		//var regexp = new RegExp(i);		
		//if(regexp.test(str))
		if(i == str)
		{
			return i;
		}
	}
	return -1;
}

function getKey(value)
{
	var ids = ["223", "49", "50", "51", "52", "53", "54", "55", "56", "57", "48", "189", "187", "8", 
			   "9", "81", "87", "69", "82","84","89","85","73","79","80","219","221","222",
			   "20","65","83","68","70","71","72","74","75","76","186","192","13", 
			   "16","90","88","67","86","66","78","77","188","190","191","1016",
			   "17", "1018", "32", "18", "1017"];
			   
	for(var i = 0; i < ids.length; ++i)
	{
		var key = ids[i];
		var val = $("."+key).val();
		if(escape(val) == value)
		{
			return key;
		}
	}
	return -1;
}

function inStringArray(str, arry)
{
	for(var i = 0; i < arry.length; ++i)
	{
		var regexp = new RegExp(arry[i]);
		if(regexp.test(str))
		{
			return i;
		}
	}
	return -1;
}

$("#font_plus").live("click" , function() {
	if(_font_size <= 60)
	{
		_font_size += 2;
		$("#preview").css({"font-size":_font_size});
		$("#autoComplete").hide();
	}
});

$("#font_minus").live("click" , function() {
	if(_font_size >= 13)
	{
		_font_size -= 2;
		$("#preview").css({"font-size":_font_size});
		$("#autoComplete").hide();
	}
});

$("#clear_btn").live("click" , function() {
	_editor = "";							
	$("#preview").val("");
	updateCharCount();
});			

function getCaret(el) {
  if (el.selectionStart) { 
	return el.selectionStart; 
  } else if (document.selection) { 
	el.focus(); 

	var r = document.selection.createRange(); 
	if (r == null) { 
	  return 0; 
	} 

	var re = el.createTextRange(), 
	rc = re.duplicate(); 
	re.moveToBookmark(r.getBookmark()); 
	rc.setEndPoint("EndToStart", re); 

	var add_newlines = 0;
	for (var i=0; i<rc.text.length; i++) {
	  if (rc.text.substr(i, 2) == "\r\n") {
		add_newlines += 2;
		i++;
	  }
	}

	return rc.text.length + add_newlines; 
  }  
  return 0; 
}				

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
	input.focus();
	input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
	var range = input.createTextRange();
	range.collapse(true);
	range.moveEnd("character", selectionEnd);
	range.moveStart("character", selectionStart);
	range.select();
  }
}

function setCaretToPos (input, pos) {
	setSelectionRange(input, pos, pos);
}

function updateListBox(id, option_val) {
	$("#" + id + " option:selected").removeAttr("selected");
	$("#" + id + " option[value="+option_val+"]").attr("selected","selected");	
}

function i2preventDefault(e)
{        
    if(e.preventDefault)
        e.preventDefault();
    else
        e.returnValue = false; 
}

function getCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
    }
    return null;
}

function setCookie(name,value,days)
{
    value = encodeURIComponent(value);
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
    //alert(document.cookie);
    //deleteCookies("i2edit");
}

function eraseCookie(name) {
    setCookie(name,"",-1);
}

function load_cached_txt()
{
    var txt = getCookie("i2speak");
    if(txt != "" && txt != null)
    {
        $("#preview").val(txt);
        textarea = document.getElementById("preview");                
        setCaretToPos (textarea, txt.length);
    }
} 

function isMobile(){
  var ios = navigator.userAgent.match(/(iPad|iPhone|iPod|smartphone|android|samsung|galaxy|s3|netfront)/g) ? true : false;
  //var ios = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
  var ua = navigator.userAgent.toLowerCase();
  var isAndroid = ua.indexOf("android") > -1;
  return ios || isAndroid;
}