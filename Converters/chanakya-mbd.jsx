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
          convertStyle(myText, targetFont, targetFontScalingFactor);
        }
        // Progress bar -----------------------------------------------------------------------------------
        myProgressBar.value = i;
        myProgressTxt.text = String("Converted story " + (myProgressBar.value+1) + " of " + stories.length + "(" + textStyleRanges.length + " textStyleRanges): " + myText.contents);
        // Progress bar -----------------------------------------------------------------------------------
      }         
    }
    convertParagraphStyles(targetFont, targetFontScalingFactor);
    convertFont();
    // Progress bar -----------------------------------------------------------------------------------
    myProgressWin.close();
    // Progress bar -----------------------------------------------------------------------------------  
    
  }  
})();
function convertParagraphStyles(targetFont, targetFontScalingFactor) {
	var paraStyles = app.activeDocument.paragraphStyles.everyItem().getElements();
  // go upto 1 as 0 is the root style and has no properties
  for (var i = paraStyles.length-1; i > 0; i--) {
    try {
      paraStyles[i].composer = "Adobe World-Ready Paragraph Composer";
    } catch (err) {
      write_to_file("Failed to set world-ready for " + paraStyles[i].name);
    }
    convertStyle(paraStyles[i], targetFont, targetFontScalingFactor);
  }
}
function convert(txt, font, scalingFactor) {
  var converted = convert_to_unicode(txt.contents);
  if (converted != undefined) {
    txt.pointSize = Math.round(txt.pointSize*scalingFactor);
    txt.contents = converted;
  }
  return converted;
}

function convertFont() {
  for (var i = 0; i < app.activeDocument.fonts.length; i++) {
    var fontFamily = app.activeDocument.fonts[i].fontFamily;
    if (matches(fontFamily))     {
      app.findTextPreferences = NothingEnum.nothing;
      app.changeTextPreferences = NothingEnum.nothing;
      app.findTextPreferences.appliedFont = fontFamily;
      app.changeTextPreferences.appliedFont = "Kokila";
      app.activeDocument.changeText();
    }
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
function matches(fontName) {
  return fontName == "Chanakya";
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
  file.write(d.toString() + ":" + text + "\n");
  file.close();
}
function write_styles_to_file(textStyleRanges) {
  write_to_file("********************* BEGIN 2 *********************");
  for (var k = textStyleRanges.length-1; k >= 0; k--) {
    var tmpText = textStyleRanges[k];
    write_to_file(tmpText.appliedFont.fontFamily + ", "
                  + tmpText.appliedCharacterStyle.name + ", "
                  + tmpText.appliedParagraphStyle.name + ", "
                  + tmpText.fontStyle + ", "
                  + tmpText.contents);
  }
  write_to_file("*********************** END 2 **********************");
}
function convert_to_unicode(legacy_txt) {
  write_to_file(legacy_txt);
  write_to_file(escape(legacy_txt));
  var array_one = new Array(
    "\u0023", "प्त",
    "\u0024", "़",
    "\u0025", "त्न",
    "\u0026", "x",
    "\u0027", "%",    
    "\u0040", "ञ्च",
    "\u0041", "्न",
    "\u0042", "क्च",
    "\u0043", "ष्ट",
    "\u0044", "ष्ठ",
    "\u0045", "श्व",
    "\u0046", "स्न", 
    "\u0047", "त्र",
    "\u0048", "\u0965",
    "\u0049", "ढ्ढ",
    "\u004a", "छ्व",
    "\u004b", "्य",
    "\u004c", "रु",
    "\u004d", "रू",
    "\u004e", "हृ",
    "\u004f", "ह्र",
    "\u0050", "क्क",
    "\u0051", "क्त",
    "\u0052", "क्त्र",
    "\u0053", "स्",
    "\u0054", "ञ्ज",
    "\u0055", "",
    "\u0056", "ङ्क", 
    "\u0057", "ङ्ख",
    "\u0058", "ङ्ग",
    "\u0059", "ङ्घ",
    "\u005a", "्रं",
    "\u005c", "झ्र",
    "\u005e", "ट्ट",
    "\u005f", "ट्ठ",
    "\u0060", "क्व",
    "\u0061", "ड्ड",
    "\u0062", "ड्ढ",
    "\u0063", "ष्",
    "\u0064", "स्र",
    "\u0065", "द्ग",
    "\u0066", "द्घ", 
    "\u0067", "द्द",
    "\u0068", "द्ध",
    "\u0069", "द्ब",
    "\u006a", "द्भ",
    "\u006b", "द्म",
    "\u006c", "द्य",
    "\u006d", "द्व",
    "\u006e", "ठ्ठ",
    "\u006f", "श्",
    "\u0070", "श्च",
    "\u0071", "ह्न",
    "\u0072", "ह्म",
    "\u0073", "ह्य",
    "\u0074", "ह्ल",
    "\u0075", "ह्व",
    "\u0076", "1", 
    "\u0077", "2",
    "\u0078", "3",
    "\u0079", "4",
    "\u007a", "5",
    "\u007b", "6",
    "\u007c", "7",
    "\u007d", "8",
    "\u007e", "9",
    "\u007f", "े",
    "\u00a0", "ज़्",
    "\u00a1", "ज",
    "\u00a2", "ं",
    "\u00a4", "झ्",
    "\u00a5", "ं",
    "\u00a7", "",
    "\u00a8", "ऋ",
    "\u00a9", "उ",
    "\u00aa", "ग",
    "\u00ab", "ड",
    "\u00ac", "प",
    "\u00ae", "εμ",
    "\u00af", "\u0970",
    "\u00b0", "ँ",
    "\u00b1", "ह्",
    "\u00b3", "ॉ",
    "\u00b4", "ऋ",
    "\u00b5", "द्ब्र",
    "\u00b6", "ष्ट्व",
    "\u00b7", "ष",
    "\u00b8", "ρ",
    "\u00ba", "द",
    "\u00bb", "फ",
    "\u00bc", "ा",
    "\u00be", "औ", 
    "\u00bf", "छ",
    "\u00c0", "ल्",
    "\u00c1", "ε",
    "\u00c2", "ू",
    "\u00c3", "त",
    "\u00c4", "क्",
    "\u00c5", "ख्",
    "\u00c6", "0",
    "\u00c7", "ग्",
    "\u00c8", "ु",
    "\u00c9", "घ्",
    "\u00ca", "ा",
    "\u00cb", "ी",
    "\u00cc", "ερ",
    "\u00cd", "ू",
    "\u00ce", "ृ",
    "\u00cf", "ερμ",
    "\u00d1", "ल्ल",
    "\u00d2", "ै",
    "\u00d4", "",
    "\u00d5", "थ",
    "\u00d6", "ज्",
    "\u00d8", "ख्न",
    "\u00d9", "ो",
    "\u00da", "ॅ",
    "\u00db", "न्न्",
    "\u00dc", "ञ्",
    "\u00df", "इ",
    "\u00e0", "त्",
    "\u00e1", "ण्",
    "\u00e2", "थ्",
    "\u00e3", "न्",
    "\u00e4", "ध्",
    "\u00e5", "प्",    
    "\u00e6", "ङ",    
    "\u00e7", "फ्",
    "\u00e8", "भ्",
    "\u00e9", "ब्",
    "\u00ea", "म्",
    "\u00eb", "च्",
    "\u00ec", "च्च्",
    "\u00ed", "ज्",
    "\u00ee", "ज्ज्",
    "\u00ef", "ज़्",
    "\u00f0", "े",
    "\u00f1", "ङ्क्त",    
    "\u00f2", "त्र्",
    "\u00f3", "-",
    "\u00f4", "ज्ञ्",
    "\u00f7", "भ",
    "\u00f8", "च",
    "\u00f9", "स्त्र",
    "\u00fb", "त्त्",
    "\u00fc", "श्र्",   
    "\u00ff", "य",    
    "\u0131", "ौ",
    "\u0152", 'द',
    "\u0153", 'ध',
    "\u0178", 'न',
    "\u0192", 'य्',
    "\u2260", 'लृ',    
    "\u02c6", 'ह्ण',
    "\u02c7", 'क्ष्',
    "\u02c9", '\u0970',
    "\u02d8", '\u093d',
    "\u02d9", '\u0950',
    "\u02da", '\u0933',
    "\u02db", '्र',
    "\u02dc", '्',
    "\u02dd", '्र',
    "\u0394", 'ठ',
    "\u03a0", '़',
    "\u03a9", 'ड्ट',
    "\u03bc", 'द्ब्र',
    "\u03c0", 'ख',
    "\u2011", '-',
    "\u2013", '।',
    "\u2014", 'ः',
    "\u2018", 'े',
    "\u2019", 'ब',
    "\u201a", 'स',
    "\u201c", "'",
    "\u201d", "'",
    "\u201e", 'ह',
    "\u2020", '_',
    "\u2021", 'श्',
    "\u2022", "अ", 
    "\u2022", 'अ',
    "\u2026" , 'ढ',
    "\u2030", 'ु',
    "\u2039", 'ल',
    "\u203a", '\u0933',
    "\u2044", "र",
    "\u2102", 'ष्ट',
    "\u210a", 'द्द',
    "\u210b", '\u0965',
    "\u210c", '\u0965',
    "\u210d", '\u0965',
    "\u210e", 'द्ध',
    "\u2110", 'ढ्ढ',
    "\u2111", 'ढ्ढ',
    "\u2112", 'रु',
    "\u2113", 'द्य',
    "\u2115", 'हृ',
    "\u2119", 'क्क',
    "\u211a", 'क्त',
    "\u211b", 'क्त्र',
    "\u211c", 'क्त्र',
    "\u211d", 'क्त्र',
    "\u2122", 'ऊ',
    "\u2124", '्रं',
    "\u2126", 'ड्ट',
    "\u2128", '्रं',
    "\u212c", 'क्च',
    "\u212d", 'ष्ट',
    "\u212f", 'द्ग',
    "\u2130", 'श्व',
    "\u2131", 'स्न',
    "\u2132", 'रू',
    "\u2134", 'श्र',
    "\u2139", 'द्ब',
    "\u2140", 'क',
    "\u2145", 'ष्ठ',
    "\u2146", 'स्र',
    "\u2147", 'द्ग',
    "\u2148", 'द्ब',
    "\u2149", 'द्भ',
    "\u2202", 'ल',
    "\u2206", 'ठ',
    "\u220f", '़',
    "\u2211", 'क',
    "\u2215", 'र',
    "\u2219", 'ष',
    "\u221a", 'व्',
    "\u221e", 'ए',
    "\u222b", 'ख्र',
    "\u2248", 'ट',
    "\u2260", 'लृ',
    "\u2264", 'द्द्',
    "\u2265", 'श्',
    "\u25ca", "म",
    "\ufb02", "व",
    "\u00c0", "ल्", 
    "\ue0f0", "े",
    "\x10", "ऍ",
    "\x12", "ऑ", 
    //"\u0055", "",
    "्ो", "े", 
    "्ौ", "ै", 
    "्ा", "",
    "अा", "आ",
    "ाै", "ौ", 
    "अौ", "औ",
    "ाे", "ो",    
    "अो", "ओ",
    "एे", "ऐ",
     );


  var array_one_length = array_one.length ;
  var modified_substring = legacy_txt  ;

  //  Break the long text into small bunches of max. max_text_size  characters each.
  var text_size = legacy_txt.length ;
  var processed_text = '' ;  //blank
  var sthiti1 = 0 ;  var sthiti2 = 0 ;  var chale_chalo = 1 ;
  var max_text_size = 4000;
  while ( chale_chalo == 1 ) 
  {
    sthiti1 = sthiti2 ;
    if ( sthiti2 < ( text_size - max_text_size ) )  
    { 
      sthiti2 +=  max_text_size ;
      while (legacy_txt.charAt ( sthiti2 ) != ' ') {sthiti2--;}
    } 
    else  { sthiti2 = text_size  ;  chale_chalo = 0 }

    var modified_substring = legacy_txt;//.substring ( sthiti1, sthiti2 )  ;
    Replace_Symbols( ) ;
    processed_text += modified_substring ;
    
  }
  write_to_file(processed_text);
  return processed_text;
  function Replace_Symbols( ) 
  {
    write_to_file("Replace_Symbols(" + modified_substring + ") 1 = ");
    //substitute array_two elements in place of corresponding array_one elements
    if ( modified_substring != "" )  // if string to be converted is non-blank then no need of any processing.
    {
      for(input_symbol_idx = 0;   input_symbol_idx < array_one_length;    input_symbol_idx += 2 )
      {
        var idx = modified_substring.indexOf( array_one[input_symbol_idx] )  ;  // index of the symbol being searched for replacement
        while (idx != -1 ) { //while-00
          modified_substring = modified_substring.replace( array_one[ input_symbol_idx ] , array_one[input_symbol_idx+1] )
          idx = modified_substring.indexOf( array_one[input_symbol_idx] )
        } // end of while-00 loop
      } // end of for loop

      modified_substring = modified_substring.replace( /([ेैुूं]+)्र/g , "्र$1" ) ;
      modified_substring = modified_substring.replace( /ं([ाेैुू]+)/g , "$1ं" ) ;
      modified_substring = modified_substring.replace( /([ाेैुू]+)़/g , "़$1" ) ;
      modified_substring = modified_substring.replace( /ερμ(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)/g , "र्$1िं" );
      modified_substring = modified_substring.replace( /ε(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)ρμ/g , "र्$1िं" );
      
      modified_substring = modified_substring.replace( /ερ(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)/g , "र्$1ि" );
      modified_substring = modified_substring.replace( /ε(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)ρ/g , "र्$1ि" );
      
      modified_substring = modified_substring.replace( /εμ(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)/g , "$1िं" );
      modified_substring = modified_substring.replace( /ε(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)/g , "$1ि" );
      modified_substring = modified_substring.replace( /(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?[ाेैोौॊॉी]?)ρ[μं]/g , "र्$1ं" );   
      write_to_file("Replace_Symbols(" + modified_substring + ") 2 = ");
      modified_substring = modified_substring.replace( /(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?[ाेैोौॊॉी]?)ρ/g , "र्$1" );   
      modified_substring = modified_substring.replace( /इρ[μं]/g , "ईं");
      write_to_file("Replace_Symbols(" + modified_substring + ") 3 = ");
      modified_substring = modified_substring.replace( /इρ/g , "ई");
      write_to_file("Replace_Symbols(" + modified_substring + ") 44 = ");
      
      
    }//end of IF  statement  meant to  supress processing of  blank  string.
  } // end of the function  Replace_Symbols
  
} // end of convert_Chanakya_to_Unicode()