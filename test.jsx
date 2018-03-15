var myTextFrames = app.activeDocument.textFrames;  
var myTextFramesNo = myTextFrames.length; 
var i = 0;

while (i < myTextFramesNo) {
    var paras=myTextFrames[i].parentStory.paragraphs;
    var j = -1;
    while (j < paras.count() && (i==0 ||myTextFrames[i].parentStory!= myTextFrames[i-1].parentStory)) {
        var myText = paras.item(j);
        myText.contents = C2Unic(myText.contents, myText.appliedFont.fontFamily);
        myText.appliedFont =app.fonts.item("Siddhanta");
        myText.pointSize=myText.pointSize*0.878;
        //myText.composer="Adobe World-Ready Paragraph Composer";
        j++;
    }
    i++;
}
var i = 0;

while (i < myTextFramesNo) {
  //alert('Frame:'+i);
    var paras=myTextFrames[i].parentStory.paragraphs;
    var j = 0;
    while (j < paras.count()) {
        var myText = paras.item(j);
        if(myText.appliedFont.fontFamily!="Siddhanta"){
         //myText.appliedFont =app.fonts.item("Siddhanta");
          //myText.pointSize=myText.pointSize*0.878;
        }
        myText.composer="Adobe World-Ready Paragraph Composer";
        j++;
    }
    i++;
}
function C2Unic(text, font) {
    //convert text from font to unicode
    //alert("Converter Called"+font);
    if (font=="Chanakya"){
        text = Chanakya2Uni(text);
        }
    else if (font=="DevLys 010"){
       text = Devlys2Uni(text);
        }
    return text;
}


function Chanakya2Uni(text){
		var str = getUnicode(text);
                  text = str;
				  doSearchReplace("्ा", "");
				  doSearchReplace("इ(rf)", "ई");
				  doSearchReplace("़्", "़्");
				  /*doSearchReplace("(\(in\))([ક-હ](્[ક-હ])?(્[ક-હ])?)", "$2િ");
				  doSearchReplace("([ક-હ](્[ક-હ])?(્[ક-હ])?)(?=\(rf\))", "ર્$1");
				  doSearchReplace("(\(in\))(.્.)(?!્)", "$2િ");*/
		return text;
}

function doSearchReplace(findStr, repStr){
	//Clear the find/change text preferences.
	app.findTextPreferences = NothingEnum.nothing;
	app.changeTextPreferences = NothingEnum.nothing;
	
	app.findTextPreferences.findWhat = findStr; 
	app.changeTextPreferences.changeTo = repStr; 
	app.documents[0].changeText();
	//Clear the find/change text preferences after the search.
	app.findTextPreferences = NothingEnum.nothing;
	app.changeTextPreferences = NothingEnum.nothing;
}

function getUnicode(myString){

var myTable = {  
"9": "\t",
"10": "\n",
"13": "\r", 
"32": " ",  
"33": "!",
"35": "प्त",
"36": ".",
"37": "त्न",
"40": "(",
"41": ")",
"43": "+",
"44": ",",
"45": "-",
"46": ".",
"48": "0",
"49": "1",
"50": "2",
"51": "3",
"52": "4",
"53": "5",
"54": "6",
"55": "7",
"56": "8",
"57": "9",
"58": ":",
"59": ";",
"60": "‚",
"61": "²",
"62": "(62)",
"63": "?",
"67": "ष्ट",
"68": "ष्ठ",
"69": "श्व",
"70": "स्न",
"71": "त्र",
"72": "।।",
"73": "ढ्ढ",
"74": "छ्व",
"75": "्य",
"76": "रु",
"77": "रू",
"78": "हृ",
"80": "क्क",
"82": "त्र्क",
"83": "स्",
"90": "(rf)ं",
"92": "झ्र",
"94": "ट्ट",
"95": "ट्ठ",
"97": "ड्ड",
"98": "ड्ढ",
"99": "ष्",
"100": "स्र",
"101": "द्ग",
"102": "द्ध",
"103": "द्द",
"104": "द्ध",
"105": "द्ब",
"106": "द्भ",
"107": "द्म",
"108": "द्य",
"109": "द्व",
"110": "ठ्ठ",
"112": "श्च",
"113": "ह्न",
"114": "ह्म",
"115": "ह्य",
"117": "ह्व",
"128": "क्",
"129": "ख्",
"130": "ग्",
"131": "घ्",
"132": "ल्ल",
"133": "ज्",
"134": "ञ्",
"135": "ण्",
"136": "त्",
"137": "थ्",
"138": "ध्",
"139": "न्",
"140": "प्",
"141": "फ्",
"381": "ब्",
"143": "भ्",
"144": "म्",
"145": "च्",
"146": "ज्",
"147": "च्च",
"151": "—",
"152": "त्र्",
"153": "ज्ञ्",
"157": "स्त्र",
"158": "त्त्",
"159": "श्र्",
"161": "ँ",
"162": "ं",
"165": "अ",
"167": "इ",
"168": "(inn)",
"169": "उ",
"170": "ऊ",
"171": "ऋ",
"173": "लृ",
"175": "ख्र",
"178": "दृ",
"180": "ं",
"182": "ल",
"183": "क",
"185": "ख",
"186": "ख्र",
"187": "ग",
"188": "द",
"189": "ड्ट",
"190": "ङ",
"191": "च",
"192": "छ",
"193": "ज",
"194": "प",
"195": "व्",
"196": "य्",
"197": "ट",
"198": "ठ",
"199": "ड",
"200": "फ",
"201": "ढ",
"203": "ल्",
"204": "त",
"205": "थ",
"206": "द",
"207": "ध",
"208": "।",
"213": "ब",
"214": "भ",
"215": "म",
"216": "य",
"217": "न",
"218": "र",
"219": "झ्",
"220": "ल",
"221": "ळ",
"223": "व",
"224": "श्",
"225": "ष्",
"226": "स",
"227": "ह",
"228": "ु",
"229": "ू",
"230": "ा",
"231": "(in)",
"232": "ी",
"233": "ु",
"234": "ू",
"235": "ृ",
"240": "े",
"241": "ै",
"243": "न्न्",
"244": "ो",
"245": "ौ",
"247": "्",
"249": "ढ्ढ",
"250": "ॐ",
"252": "(rf)",
"253": "्र",
"254": "्र",
"255": "क्ष्",
"65279": "",
"85": "",
"164": "",
"8225": "ण्",
"338": "प्",
"118": "1",
"119": "2",
"120": "3",
"121": "4",
"122": "5",
"123": "6",
"124": "7",
"125": "8",
"126": "9",
"174": "0",
"184": "़",
"8249": "न्",
"710": "त्",
"202": "ज़्",
"176": "ए",
"352": "ध्",
"8212": "—",
"210": "‘",
"211": "’",
"239": "",
"402": "घ्",
"376": "श्र्",
"8482": "ज्ञ्",
"732": "त्र्",
"8440": "थ्",
"8364": "क्",
"8216": "च्",
"209": "ः",
"8218": "ग्",
"8240": "थ्",
"8230": "ज्",
"242": "ॅ",




     };
    
    
    var newStr = "";
    
    for(var i = 0; i < myString.length; i++)
    { 
        var c = myString.charCodeAt(i); 
        //alert(c);
        if(c in myTable)
        {
            newStr += myTable[c];
        }
        else
        {
            newStr += "(" + c + ")";
        }
    }
return newStr;
}

function Devlys2Uni(text)
{

var array_one = new Array( 
// "(",")", 
"ñ","Q+Z","sas","aa",")Z","ZZ","‘","’","“","”",

"å",  "ƒ",  "„",   "…",   "†",   "‡",   "ˆ",   "‰",   "Š",   "‹", 

"¶+",   "d+", "[+k","[+", "x+",  "T+",  "t+", "M+", "<+", "Q+", ";+", "j+", "u+",
"Ùk", "Ù", "ä", "–", "—","é","™","=kk","f=k",  

"à",   "á",    "â",   "ã",   "ºz",  "º",   "í", "{k", "{", "=",  "«",   
"Nî",   "Vî",    "Bî",   "Mî",   "<î", "|", "K", "}",
"J",   "Vª",   "Mª",  "<ªª",  "Nª",   "Ø",  "Ý", "nzZ",  "æ", "ç", "Á", "xz", "#", ":",

"v‚","vks",  "vkS",  "vk",    "v",  "b±", "Ã",  "bZ",  "b",  "m",  "Å",  ",s",  ",",   "_",

"ô",  "d", "Dk", "D", "[k", "[", "x","Xk", "X", "Ä", "?k", "?",   "³", 
"pkS",  "p", "Pk", "P",  "N",  "t", "Tk", "T",  ">", "÷", "¥",

"ê",  "ë",   "V",  "B",   "ì",   "ï", "M+", "<+", "M",  "<", ".k", ".",    
"r",  "Rk", "R",   "Fk", "F",  ")", "n", "/k", "èk",  "/", "Ë", "è", "u", "Uk", "U",   

"i",  "Ik", "I",   "Q",    "¶",  "c", "Ck",  "C",  "Hk",  "H", "e", "Ek",  "E",
";",  "¸",   "j",    "y", "Yk",  "Y",  "G",  "o", "Ok", "O",
 "\"k", "\"",   "'k",  "'",  "l", "Lk",  "L",   "g", 

"È", "z", 
"Ì", "Í", "Î",  "Ï",  "Ñ",  "Ò",  "Ó",  "Ô",   "Ö",  "Ø",  "Ù","Ük", "Ü",

"‚",    "ks",   "kS",   "k",  "h",    "q",   "w",   "`",    "s",    "S",
"a",    "¡",    "%",     "W",  "•", "·", "∙", "·", "~j",  "~", "\\","+"," ः",
"^", "*",  "Þ", "ß", "(", "¼", "½", "¿", "À", "¾", "A", "-", "&", "&", "Œ", "]","~ ","@")

var array_two = new Array(
//"¼","½", 
"॰","QZ+","sa","a","र्द्ध","Z","\"","\"","'","'",

"०",  "१",  "२",  "३",     "४",   "५",  "६",   "७",   "८",   "९",   

"फ़्",  "क़",  "ख़", "ख़्",  "ग़", "ज़्", "ज़",  "ड़",  "ढ़",   "फ़",  "य़",  "ऱ",  "ऩ",    // one-byte nukta varNas
"त्त", "त्त्", "क्त",  "दृ",  "कृ","न्न","न्न्","=k","f=",

"ह्न",  "ह्य",  "हृ",  "ह्म",  "ह्र",  "ह्",   "द्द",  "क्ष", "क्ष्", "त्र", "त्र्", 
"छ्य",  "ट्य",  "ठ्य",  "ड्य",  "ढ्य", "द्य", "ज्ञ", "द्व",
"श्र",  "ट्र",    "ड्र",    "ढ्र",    "छ्र",   "क्र",  "फ्र", "र्द्र",  "द्र",   "प्र", "प्र",  "ग्र", "रु",  "रू",

"ऑ",   "ओ",  "औ",  "आ",   "अ", "ईं", "ई",  "ई",   "इ",  "उ",   "ऊ",  "ऐ",  "ए", "ऋ",

"क्क", "क", "क", "क्", "ख", "ख्", "ग", "ग", "ग्", "घ", "घ", "घ्", "ङ",
"चै",  "च", "च", "च्", "छ", "ज", "ज", "ज्",  "झ",  "झ्", "ञ",

"ट्ट",   "ट्ठ",   "ट",   "ठ",   "ड्ड",   "ड्ढ",  "ड़", "ढ़", "ड",   "ढ", "ण", "ण्",   
"त", "त", "त्", "थ", "थ्",  "द्ध",  "द", "ध", "ध", "ध्", "ध्", "ध्", "न", "न", "न्",    

"प", "प", "प्",  "फ", "फ्",  "ब", "ब", "ब्",  "भ", "भ्",  "म",  "म", "म्",  
"य", "य्",  "र", "ल", "ल", "ल्",  "ळ",  "व", "व", "व्",   
"ष", "ष्", "श", "श्", "स", "स", "स्", "ह", 

"ीं", "्र",    
"द्द", "ट्ट","ट्ठ","ड्ड","कृ","भ","्य","ड्ढ","झ्","क्र","त्त्","श","श्",

"ॉ",  "ो",   "ौ",   "ा",   "ी",   "ु",   "ू",   "ृ",   "े",   "ै",
"ं",   "ँ",   "ः",   "ॅ",  "ऽ", "ऽ", "ऽ", "ऽ", "्र",  "्", "?", "़",":",
"‘",   "’",   "“",   "”",  ";",  "(",    ")",   "{",    "}",   "=", "।", ".", "-",  "µ", "॰", ",","् ","/")

//Corrections for Spelling mistakes (see above under the first Array):
// "sas","aa","ZZ","=kk","f=k",
//
// The following two characters are to be replaced through proper checking of locations:
// "Z" )
// "र्" (reph) 

// "f" )
// "ि"  


var array_one_length = array_one.length ;

var modified_substring = text  ;

//****************************************************************************************
//  Break the long text into small bunches of max. max_text_size  characters each.
//****************************************************************************************
    var text_size = text.length ;

    var processed_text = '' ;  //blank

    var sthiti1 = 0 ;  var sthiti2 = 0 ;  var chale_chalo = 1 ;
 
    var max_text_size = 6000;

    while ( chale_chalo == 1 ) 
    {
     sthiti1 = sthiti2 ;

     if ( sthiti2 < ( text_size - max_text_size ) )  
     { 
      sthiti2 +=  max_text_size ;
      while (text.charAt ( sthiti2 ) != ' ') {sthiti2--;}
     } 
     else  { sthiti2 = text_size  ;  chale_chalo = 0 }

     var modified_substring = text.substring ( sthiti1, sthiti2 )  ;

    Replace_Symbols( ) ;

    processed_text += modified_substring ;

//****************************************************************************************
//  Breaking part code over
//****************************************************************************************
//  processed_text = processed_text.replace( /mangal/g , "Krutidev010" ) ;   

    text = processed_text  ;
    return text;
   }


// --------------------------------------------------


function Replace_Symbols( )

{

//substitute array_two elements in place of corresponding array_one elements

if ( modified_substring != "" )  // if stringto be converted is non-blank then no need of any processing.
{
for ( input_symbol_idx = 0;   input_symbol_idx < array_one_length;    input_symbol_idx++ )

{

idx = 0  ;  // index of the symbol being searched for replacement

while (idx != -1 ) //whie-00
{

modified_substring = modified_substring.replace( array_one[ input_symbol_idx ] , array_two[input_symbol_idx] )
idx = modified_substring.indexOf( array_one[input_symbol_idx] )

} // end of while-00 loop
} // end of for loop

//**********************************************************************************
// Code for Replacing five Special glyphs
//**********************************************************************************

//**********************************************************************************
// Code for Glyph1 : ± (reph+anusvAr)
//**********************************************************************************
   modified_substring = modified_substring.replace( /±/g , "Zं" ) ; // at some places  ì  is  used eg  in "कर्कंधु,पूर्णांक".
//
//**********************************************************************************
// Glyp2: Æ
// code for replacing "f" with "ि" and correcting its position too. (moving it one position forward)
//**********************************************************************************

modified_substring = modified_substring.replace( /Æ/g , "र्f" ) ;  // at some places  Æ  is  used eg  in "धार्मिक".

var position_of_i = modified_substring.indexOf( "f" )

while ( position_of_i != -1 )  //while-02
{
var charecter_next_to_i = modified_substring.charAt( position_of_i + 1 )
var charecter_to_be_replaced = "f" + charecter_next_to_i
modified_substring = modified_substring.replace( charecter_to_be_replaced , charecter_next_to_i + "ि" ) 
position_of_i = modified_substring.search( /f/ , position_of_i + 1 ) // search for i ahead of the current position.

} // end of while-02 loop

//**********************************************************************************
// Glyph3 & Glyph4: Ç  É
// code for replacing "fa" with "िं"  and correcting its position too.(moving it two positions forward)
//**********************************************************************************

modified_substring = modified_substring.replace( /Ç/g , "fa" ) ; // at some places  Ç  is  used eg  in "किंकर".
modified_substring = modified_substring.replace( /É/g , "र्fa" ) ; // at some places  É  is  used eg  in "शर्मिंदा"

var position_of_i = modified_substring.indexOf( "fa" )

while ( position_of_i != -1 )  //while-02
{
var charecter_next_to_ip2 = modified_substring.charAt( position_of_i + 2 )
var charecter_to_be_replaced = "fa" + charecter_next_to_ip2
modified_substring = modified_substring.replace( charecter_to_be_replaced , charecter_next_to_ip2 + "िं" ) 
position_of_i = modified_substring.search( /fa/ , position_of_i + 2 ) // search for i ahead of the current position.

} // end of while-02 loop

//**********************************************************************************
// Glyph5: Ê
// code for replacing "h" with "ी"  and correcting its position too.(moving it one positions forward)
//**********************************************************************************

modified_substring = modified_substring.replace( /Ê/g , "ीZ" ) ; // at some places  Ê  is  used eg  in "किंकर".


/*
var position_of_i = modified_substring.indexOf( "h" )

while ( position_of_i != -1 )  //while-02
{
var charecter_next_to_i = modified_substring.charAt( position_of_i + 1 )
var charecter_to_be_replaced = "h" + charecter_next_to_i
modified_substring = modified_substring.replace( charecter_to_be_replaced , charecter_next_to_i + "ी" ) 
position_of_i = modified_substring.search( /h/ , position_of_i + 1 ) // search for i ahead of the current position.

} // end of while-02 loop
*/


//**********************************************************************************
// End of Code for Replacing four Special glyphs
//**********************************************************************************

// following loop to eliminate 'chhotee ee kee maatraa' on half-letters as a result of above transformation.

var position_of_wrong_ee = modified_substring.indexOf( "ि्" ) 

while ( position_of_wrong_ee != -1 )  //while-03

{
var consonent_next_to_wrong_ee = modified_substring.charAt( position_of_wrong_ee + 2 )
var charecter_to_be_replaced = "ि्" + consonent_next_to_wrong_ee 
modified_substring = modified_substring.replace( charecter_to_be_replaced , "्" + consonent_next_to_wrong_ee + "ि" ) 
position_of_wrong_ee = modified_substring.search( /ि्/ , position_of_wrong_ee + 2 ) // search for 'wrong ee' ahead of the current position. 

} // end of while-03 loop

//**************************************
// 
//**************************************
//   alert(modified_substring);
//**************************************

// Eliminating reph "Z" and putting 'half - r' at proper position for this.
set_of_matras = "अ आ इ ई उ ऊ ए ऐ ओ औ ा ि ी ु ू ृ े ै ो ौ ं : ँ ॅ" 
var position_of_R = modified_substring.indexOf( "Z" )

while ( position_of_R > 0 )  // while-04
{
probable_position_of_half_r = position_of_R - 1 ;
var charecter_at_probable_position_of_half_r = modified_substring.charAt( probable_position_of_half_r )


// trying to find non-maatra position left to current O (ie, half -r).

while ( set_of_matras.match( charecter_at_probable_position_of_half_r ) != null )  // while-05

{
probable_position_of_half_r = probable_position_of_half_r - 1 ;
charecter_at_probable_position_of_half_r = modified_substring.charAt( probable_position_of_half_r ) ;

} // end of while-05


charecter_to_be_replaced = modified_substring.substr ( probable_position_of_half_r , ( position_of_R - probable_position_of_half_r ) ) ;
new_replacement_string = "र्" + charecter_to_be_replaced ; 
charecter_to_be_replaced = charecter_to_be_replaced + "Z" ;
modified_substring = modified_substring.replace( charecter_to_be_replaced , new_replacement_string ) ;
position_of_R = modified_substring.indexOf( "Z" ) ;

} // end of while-04

} // end of IF  statement  meant to  supress processing of  blank  string.

//**************************************
//   alert(modified_substring);
//**************************************


} // end of the function  Replace_Symbols


} // end of Kritidev_to_unicode function



