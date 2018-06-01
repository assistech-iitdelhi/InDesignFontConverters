(function() {
var stories = app.activeDocument.stories.everyItem().getElements();
//Load mappings from file--------------------------------------------------------------------------
var targetFont = "Kokila";
var targetFontScalingFactor = 1.0;
try {
    var fileName = File(app.activeScript.fullName).parent.fsName + "\\mappings.csv";
    var file = new File(fileName)
    file.open("r");
    while(!file.eof){
        row=file.readln();
        cols = row.split(",");
        if (matches(cols[0])) {
          targetFont = cols[1];
          targetFontScalingFactor = cols[2];
          break;
        }
    }
    file.close();
} catch (err) {
    alert(err);
}
//Mappings loaded----------------------------------------------------------------------------------
// Progress bar -----------------------------------------------------------------------------------
var myProgressWin = new Window ( "window", "Unicode Script "+app.activeDocument.name );
var myProgressBar = myProgressWin.add ("progressbar", [12, 12, 350, 24], 0, stories.length);
var myProgressTxt = myProgressWin.add("statictext", undefined, "Starting Conversion");
myProgressTxt.bounds = [0, 0, 340, 200];
myProgressTxt.alignment = "left";
myProgressWin.show();
// Progress bar -----------------------------------------------------------------------------------
if (textSelected()) {
  convert(app.selection[0], targetFont, targetFontScalingFactor);
} else {
  for (var i = 0; i < stories.length; i++) {
    var textStyleRanges = stories[i].textStyleRanges.everyItem().getElements();
    for (var j = textStyleRanges.length-1; j >= 0; j--) {
      var myText = textStyleRanges[j];
      write_to_file(myText.appliedFont.fontFamily + ", " + myText.fontStyle + "\n");
      if (matches(myText.appliedFont.fontFamily)) {
        convert(myText, targetFont, targetFontScalingFactor);
      }
      // Progress bar -----------------------------------------------------------------------------------
      myProgressBar.value = i;
      myProgressTxt.text = String("Converted story " + (myProgressBar.value+1) + " of " + stories.length + "(" + textStyleRanges.length + " textStyleRanges): " + myText.contents);
      // Progress bar -----------------------------------------------------------------------------------
    }
  }
  // Progress bar -----------------------------------------------------------------------------------
  myProgressWin.close();
  // Progress bar -----------------------------------------------------------------------------------
  }
})();
function textSelected() {
  if (app.selection.length == 1) {
    switch (app.selection[0].constructor.name) {
      case "InsertionPoint":
      case "Character":
      case "Word":
      case "TextStyleRange":
      case "Line":
      case "Paragraph":
      case "TextColumn":
      case "Text":
      case "Story":
        if (app.selection[0].contents.length > 0)
          return true;
        else
          return false;
        break;
      default:
        return false;
    }
  } else {
      return false;
  }
}
function convert(txt, font, scalingFactor) {
  var converted = convert_to_unicode(txt.contents);
  if (converted != undefined) {
    txt.composer = "Adobe World-Ready Paragraph Composer";
    txt.appliedFont = app.fonts.item(font);
    txt.pointSize = txt.pointSize*scalingFactor;
    txt.contents = converted;
  }
}
function matches(fontName) {
  return fontName.indexOf("Walkman-Chanakya-") == 0;
}
function write_to_file(text) {
  var file = new File("~/Desktop/walkman_chanakya.log");
  file.encoding = "UTF-8";
  if (file.exists) {
    file.open("e");
    file.seek(0, 2);
  }
  else {
    file.open("w");
  }
  file.write(text);
  file.close();
}
function convert_to_unicode(legacy_txt) {
  var array_one = new Array(
    "I+kQ", "फ़" ,
    "ñ" , "॰" ,
    "Q\+Z" , "QZ\+" ,
    "sas" , "sa" ,
    "aa" , "a" ,
    "¼Z" , "र्द्ध" ,
    "ZZ" , "Z" ,
    "å" , "०" ,
    "ƒ" , "१" ,
    "\„" , "२" ,
    "…" , "३" ,
    "†" , "४" ,
    "‡" , "५" ,
    "\ˆ" , "६" ,
    "‰" , "७" ,
    "Š" , "८" ,
    "\‹" , "९" ,
    "¶+" , "फ़्" ,
    "d+" , "क़" ,
    "[+k" , "ख़" ,
    "[+" , "ख़्" ,
    "x+" , "ग़" ,
    "T+" , "ज़्" ,
    "t+" , "ज़" ,
    "M+" , "ड़" ,
    "\<+" , "ढ़" ,
    "Q+" , "फ़" ,
    "\;+" , "य़" ,
    "j+" , "ऱ" ,
    "u+" , "ऩ" ,
    "Ùk" , "त्त" ,
    "Ù" , "त्त्" ,
    "ä" , "क्त" ,
    "–" , "दृ" ,
    "—" , "कृ" ,
    "é" , "न्न" ,
    "™" , "न्न्" ,
    "\=kk" , "\=k" ,
    "f\=k" , "f\=" ,
    "à" , "ह्न" ,
    "á" , "ह्य" ,
    "â" , "हृ" ,
    "ã" , "ह्म" ,
    "ºz" , "ह्र" ,
    "º" , "ह्" ,
    "í" , "द्द" ,
    "\{k" , "क्ष" ,
    "\{" , "क्ष्" ,
    "f\=" , "त्रि" ,
    "\=k" , "त्र" ,
    "\«" , "त्र्" ,
    "Nî" , "छ्य" ,
    "Vî" , "ट्य" ,
    "Bî" , "ठ्य" ,
    "Mî" , "ड्य" ,
    "\<î" , "ढ्य" ,
    "|" , "द्य" ,
    "K" , "ज्ञ" ,
    "}" , "द्व" ,
    "J" , "श्र" ,
    "Vª" , "ट्र" ,
    "Mª" , "ड्र" ,
    "\>ª" , "ढ्र" ,
    "Nª" , "छ्र" ,
    "Ø" , "क्र" ,
    "Ý" , "फ्र" ,
    "nzZ" , "र्द्र" ,
    "æ" , "द्र" ,
    "ç" , "प्र" ,
    "Á" , "प्र" ,
    "xz" , "ग्र" ,
    "#" , "रु" ,
    ":" , "रू" ,
    "v‚" , "ऑ" ,
    "vks" , "ओ" ,
    "vkS" , "औ" ,
    "vk" , "आ" ,
    "v" , "अ" ,
    "b±" , "ईं" ,
    "Ã" , "ई" ,
    "bZ" , "ई" ,
    "b" , "इ" ,
    "mQ" , "ऊ" ,
    "m" , "उ" ,
    "Å" , "ऊ" ,
    "\,s" , "ऐ" ,
    "\," , "ए" ,
    "½" , "ऋ" ,
    "ô" , "क्क" ,
    "d" , "क" ,
    "Dk" , "क" ,
    "D" , "क्" ,
    "£" , "र्f" ,
    "[k" , "ख" ,
    "[" , "ख्" ,
    "x" , "ग" ,
    "Xk" , "ग" ,
    "X" , "ग्" ,
    "Ä" , "घ" ,
    "?k" , "घ" ,
    "?" , "घ्" ,
    "³" , "ङ" ,
    "p" , "च" ,
    "Pk" , "च" ,
    "P" , "च्" ,
    "N" , "छ" ,
    "\”k" , "ज" ,
    "\”" , "ज्" ,
    "t" , "ज" ,
    "Tk" , "ज" ,
    "T" , "ज्" ,
    "\>" , "झ" ,
    "÷" , "झ्" ,
    "¥" , "ञ" ,
    "ê" , "ट्ट" ,
    "ë" , "ट्ठ" ,
    "V" , "ट" ,
    "B" , "ठ" ,
    "ì" , "ड्ड" ,
    "ï" , "ड्ढ" ,
    "M+" , "ड़" ,
    "\<+" , "ढ़" ,
    "M" , "ड" ,
    "\<" , "ढ" ,
    "\.k" , "ण" ,
    "\." , "ण्" ,
    "r" , "त" ,
    "Rk" , "त" ,
    "R" , "त्" ,
    "Fk" , "थ" ,
    "F" , "थ्" ,
    "n" , "द" ,
    "\/" , "ध" ,
    "èk" , "ध" ,
    "è" , "ध्" ,
    "Ë  " , "ध्" ,
    "u" , "न" ,
    "Uk" , "न" ,
    "U" , "न्" ,
    "iQ" , "फ" ,
    "i" , "प" ,
    "Ik" , "प" ,
    "I" , "प्" ,
    "c" , "ब" ,
    "Ck" , "ब" ,
    "C" , "ब्" ,
    "Hk" , "भ" ,
    "H" , "भ्" ,
    "e" , "म" ,
    "Ek" , "म" ,
    "E" , "म्" ,
    "\;" , "य" ,
    "j" , "र" ,
    "y" , "ल" ,
    "Yk" , "ल" ,
    "Y" , "ल्" ,
    "G" , "ळ" ,
    "oQ" , "क" ,
    "o" , "व" ,
    "Ok" , "व" ,
    "O" , "व्" ,
    "\'k" , "श" ,
    "\'" , "श्" ,
    "Ük" , "श" ,
    "Ü" , "श्" ,
    "\"k" , "ष" ,
    "\"" , "ष्" ,
    "\xb6", '"',
    "\xb8", '"',
    "l" , "स" ,
    "Lk" , "स" ,
    "L" , "स्" ,
    "g" , "ह" ,
    "È" , "ीं" ,
    "z" , "्र" ,
    "Ì" , "द्द" ,
    "Í" , "ऋ" ,
    "Î" , "ट्ठ" ,
    "Ï" , "ड्ड" ,
    "Ñ" , "कृ" ,
    "Ò" , "भ" ,
    "Ó" , "्य" ,
    "Ô" , "ड्ढ" ,
    "Ö" , "झ्" ,
    "Ø" , "क्र" ,
    "Ù" , "त्त्" ,
    "¼" , "द्ध" ,
    "Ú" , "फ्र" ,
    "É" , "ह्न" ,
    // following block added on 19-3-2011
    "Ů" , "त्त्" ,
    "Ľ" , "द्ध" ,
    "˝" , "ऋ" ,
    "Ř" , "क्र" ,
    "Ń" , "कृ" ,
    "Q" , "फ़" ,
    "č" , "ध्" ,
    "Ş" , "्र" ,
    "I+k", "",
    "\‚" , "ॉ" ,
    "¨" , "ो" ,
    "ks" , "ो" ,
    "©" , "ौ" ,
    "kS" , "ौ" ,
    "k" , "ा" ,
    "h" , "ी" ,
    "q" , "ु" ,
    "w" , "ू" ,
    "\`" , "ृ" ,
    "s" , "े" ,
    "¢" , "े" ,
    "S" , "ै" ,
    "a" , "ं" ,
    "¡" , "ँ" ,
    "ˇ" , "ँ" ,
    "%" , "ः" ,
    "W" , "ॅ" ,
    "•" , "ऽ" ,
    "·" , "ऽ" ,
    "∙" , "ऽ" ,
    "·" , "ऽ" ,
    "+" , "़" ,
    "\\" , "?" ,
    "\‘" , "\"" ,
    "\’" , "\"" ,
    "\“" , "\'" ,
    // "\”" , "\'" ,
    "^" , "\‘" ,
    "*" , "\’" ,
    "Þ" , "\“" ,
    "ß" , "\”" ,
    "¾" , "=" ,
    "&" , "-" ,
    "µ" , "-" ,
    "¿" , "{" ,
    "À" , "}" ,
    "A" , "।" ,
    // "-" , "." ,
    "Œ" , "॰" ,
    "]" , "\," ,
    "@" , "\/" ,
    " ः" , ":" ,
    "~" , "्" ,
    "्ा" ,    "" ,
    "ाे" , "ो" ,
    "ाॅ" , "ॉ" ,
    "अौ" , "औ" ,
    "अो" , "ओ" ,
    "आॅ" , "ऑ");
  var array_one_length = array_one.length ;
  //  Break the long text into small bunches of chunk_size  characters each.
  var text_size = legacy_txt.length ;
  var processed_text = '' ;  //blank
  var sthiti1 = 0 ;  var sthiti2 = 0 ;  var chale_chalo = 1 ;
  var chunk_size = 6000; // this charecter long text will be processed in one go.
  while ( chale_chalo == 1 )
  {
    sthiti1 = sthiti2 ;
    if ( sthiti2 < ( text_size - chunk_size ) )
    {
      sthiti2 +=  chunk_size ;
    }
    else  { sthiti2 = text_size  ;  chale_chalo = 0 }
    //alert(legacy_txt);
    processed_text = processed_text + Replace_Symbols(legacy_txt);
  }
  return processed_text;
  function Replace_Symbols(modified_substring)
  {
    //substitute array_two elements in place of corresponding array_one elements
    if ( modified_substring == "" )  // if stringto be converted is non-blank then no need of any processing.
      return;
    modified_substring = modified_substring.replace( /([ZzsSqwa¡`]+)Q/g , "Q$1" )
    for ( input_symbol_idx = 0;   input_symbol_idx < array_one_length-1;    input_symbol_idx = input_symbol_idx + 2 )
    {
      idx = 0  ;  // index of the symbol being searched for replacement
      while (idx != -1 ) { //while-00
        modified_substring = modified_substring.replace( array_one[ input_symbol_idx ] , array_one[input_symbol_idx+1] )
        idx = modified_substring.indexOf( array_one[input_symbol_idx] )
      } // end of while-00 loop
    } // end of for loop
    modified_substring = modified_substring.replace( /([ेैुूं]+)्र/g , "्र$1" ) ;
    modified_substring = modified_substring.replace( /ं([ाेैुू]+)/g , "$1ं" ) ;
    modified_substring = modified_substring.replace( /([ \n])ा/g , "$1श" ) ;
    modified_substring = modified_substring.replace( /¯/g , "f") ;
    modified_substring = modified_substring.replace( /Ł/g , "र्f") ;
    modified_substring = modified_substring.replace( /([fŻ])([कखगघङचछजझञटठडड़ढढ़णतथदधनपफबभमयरलवशषसहक्ष])/g , "$2$1" ) ;
    modified_substring = modified_substring.replace( /([fŻ])(्)([कखगघङचछजझञटठडड़ढढ़णतथदधनपफबभमयरलवशषसहक्ष])/g , "$2$3$1" ) ;
    modified_substring = modified_substring.replace( /([fŻ])(्)([कखगघङचछजझञटठडड़ढढ़णतथदधनपफबभमयरलवशषसहक्ष])/g , "$2$3$1" ) ;
    modified_substring = modified_substring.replace( /f/g , "ि") ;
    modified_substring = modified_substring.replace( /Ż/g , "िं") ;
    //following three statement for adjusting position of reph ie, half r .
    modified_substring = modified_substring.replace( /±/g , "Zं" ) ;
    modified_substring = modified_substring.replace( /([कखगघचछजझटठडड़ढढ़णतथदधनपफबभमयरलळवशषसहक्षज्ञ])([ािीुूृेैोौंँ]*)([Z])/g , "$3$1$2" ) ;
    modified_substring = modified_substring.replace( /([कखगघचछजझटठडड़ढढ़णतथदधनपफबभमयरलळवशषसहक्षज्ञ])([्])([Z])/g , "$3$1$2" ) ;
    modified_substring = modified_substring.replace( /Z/g , "र्" ) ;
    return modified_substring;
  } // end of the function  Replace_Symbols
} // end of convert_to_unicode function