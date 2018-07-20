(function() {
  var stories = app.activeDocument.stories.everyItem().getElements();
  //Load mappings from file--------------------------------------------------------------------------
  var targetFont = "Kokila";
  var targetFontScalingFactor = 1.07;
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
  convert_to_unicode(); 
})();
function convertFont(sourceText, targetText) {
  var styleFor = {
    'Chanakya 905 Normal'     : 'Regular',
    'Chanakya 905 Bold'       : 'Bold',
    'Chanakya 905 Italic'     : 'Italic',
    'Chanakya 905 BoldItalic' : 'Bold Italic'
  };
  for (style in styleFor) {
    if (typeof styleFor[style] != 'function') {
      app.findTextPreferences.appliedFont = "Walkman-Chanakya-905";
      app.findTextPreferences.findWhat = sourceText;
      app.findChangeTextOptions.caseSensitive = true;
      app.findTextPreferences.fontStyle = style;

      app.changeTextPreferences.changeTo = targetText;
      app.changeTextPreferences.composer = "Adobe World-Ready Paragraph Composer";
      app.changeTextPreferences.appliedFont = "Kokila";
      app.changeTextPreferences.fontStyle = styleFor[style];
      
      app.activeDocument.changeText();
    }
  }
}
function convertParagraphStyles(targetFont, targetFontScalingFactor) {
	var paraStyles = app.activeDocument.paragraphStyles.everyItem().getElements();
  // go upto 1 as 0 is the root style and has no properties
  for (var i = paraStyles.length-1; i > 0; i--) {
    convertStyle(paraStyles[i], targetFont, targetFontScalingFactor);
  }
}
function convertStyle(style, targetFont, scalingFactor) {
  if (!matches(style.appliedFont.fontFamily))
    return;
  
  // change font AFTER checking style name. Otherwise style name will change too soon
  if (style.fontStyle.indexOf("Bold") >= 0 && style.fontStyle.indexOf("Italic") >= 0) {
      style.appliedFont = app.fonts.item(targetFont);
      style.fontStyle = "Bold Italic";
  } else if (style.fontStyle.indexOf("Bold") >= 0) {
      style.appliedFont = app.fonts.item(targetFont);
      style.fontStyle = "Bold";
  } else if (style.fontStyle.indexOf("Italic") >= 0) {
      style.appliedFont = app.fonts.item(targetFont);
      style.fontStyle = "Italic";
  } else if (style.fontStyle.indexOf("Normal") >= 0) {
      style.appliedFont = app.fonts.item(targetFont);
      style.fontStyle = "Regular";
  } else {
    style.appliedFont = app.fonts.item(targetFont);
  }
  if (!isNaN(style.pointSize)) {
    style.pointSize = Math.round(style.pointSize*scalingFactor);
  }
  style.composer  = "Adobe World-Ready Paragraph Composer";
}
                        
function clear_log(text) {
  var file = new File("~/Desktop/ID-converters.log");
  file.encoding = "UTF-8";
  if (file.exists) {
    file.open("w");
    file.seek(0, 2);
    file.close();
  }  
}

function write_to_file(text) {
  var file = new File("~/Desktop/ID-converters.log");
  file.encoding = "UTF-8";
  if (file.exists) {
    file.open("e");
    file.seek(0, 2);
  }
  else {
    file.open("w");
  }
  var d = new Date();  
  file.write(d.toString() + ": " + File($.fileName).name + ": " + text + "\n");
  file.close();
}
function matches(fontName) {
  return fontName.indexOf("Walkman-Chanakya-") == 0;
}  
function convert_to_unicode() {
  var array_one = new Array(
    " ", " ", // otherwise spaces remain in the source font
    "I+kQ", "फ़" ,
    "OkQa", "क़",
    "jQ", "रु",
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
    "\”k" , "ज़" ,
    "\”" , "ज़्" ,
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
    "-" , "." , // placed above the & conversion below to prevent '&' -> '-' -> '.'
    "&" , "-" ,
    "µ" , "-" ,
    "¿" , "{" ,
    "À" , "}" ,
    "A" , "।" ,
    
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
  
  for ( input_symbol_idx = 0;   input_symbol_idx < array_one_length-1;    input_symbol_idx = input_symbol_idx + 2 ) {
    convertFont(array_one[input_symbol_idx], array_one[input_symbol_idx+1]);
  }   
  return;
 } // end of convert_to_unicode function