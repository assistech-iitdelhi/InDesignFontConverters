(function() {
  var stories = app.activeDocument.stories.everyItem().getElements();
  //Load mappings from file--------------------------------------------------------------------------
  var targetFont = "Smart Delhi Hindi";
  var targetFontScalingFactor = 1;
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
        
        if (matches(myText.appliedFont.fontFamily)) {
          convert(myText, targetFont, targetFontScalingFactor);          
          //if (myText.appliedParagraphStyle.name == "[No Paragraph Style]") {
            convertStyle(myText, targetFont, targetFontScalingFactor);
          //}
        } else {
          write_to_file("Skipping textStyleRange of " + myText.appliedFont.fontFamily + ", " + myText.fontStyle + "\n");
        }
        // Progress bar -----------------------------------------------------------------------------------
        myProgressBar.value = i;
        myProgressTxt.text = String("Converted story " + (myProgressBar.value+1) + " of " + stories.length + "(" + textStyleRanges.length + " textStyleRanges): " + myText.contents);
        // Progress bar -----------------------------------------------------------------------------------
      }         
    }
    convertParagraphStyles(targetFont, targetFontScalingFactor);
    convertFont(targetFont);
    // Progress bar -----------------------------------------------------------------------------------
    myProgressWin.close();
    // Progress bar -----------------------------------------------------------------------------------  
  }  
})();
function convertFont(targetFont) {
  for (var i = 0; i < app.activeDocument.fonts.length; i++) {
    var fontFamily = app.activeDocument.fonts[i].fontFamily;
    if (matches(fontFamily))     {
      app.findTextPreferences = NothingEnum.nothing;
      app.changeTextPreferences = NothingEnum.nothing;
      app.findTextPreferences.appliedFont = fontFamily;
      app.changeTextPreferences.appliedFont = targetFont;
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
function convert(txt, font, scalingFactor) {
  var converted = convert_to_unicode(txt.contents);
  if (converted != undefined) {
    //txt.pointSize = Math.round(txt.pointSize*scalingFactor);
    txt.contents = converted;
  }
  return converted;
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
  return fontName.indexOf("DevLys") == 0 || fontName.indexOf("Kruti Dev") == 0;
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

function convert_to_unicode(text) {
  var array_one = new Array( 
  // "(",")", 
  "ñ","Q+Z","sas","aa",")Z","ZZ","‘","’","“","”",

  "å",  "ƒ",  "„",   "…",   "†",   "‡",   "ˆ",   "‰",   "Š",   "‹", 

  "¶+",   "d+", "[+k","[+", "x+",  "T+",  "t+", "M+", "<+", "Q+", ";+", "j+", "u+",
  "\xd9\x6b", "Ù", "ä", "–", "—","é","™","=kk","f=k",  

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

  "‚",    "kas",   "kaS", "ks",   "kS",  "k",  "h",    "q",   "w",   "`", "as", "aS",    "s",    "S",
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

  "ॉ",  "ों", "ौं", "ो",   "ौ",   "ा",   "ी",   "ु",   "ू",   "ृ",  "ें", "ैं", "े",   "ै", 
  "ं",   "ँ",   "ः",   "ॅ",  "ऽ", "ऽ", "ऽ", "ऽ", "्र",  "्", "?", "़", ":",
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

  //  Break the long text into small bunches of max. max_text_size  characters each.
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
    
  }
  return processed_text;

  function Replace_Symbols( )
  {
    //substitute array_two elements in place of corresponding array_one elements
    if ( modified_substring != "" )  // if stringto be converted is non-blank then no need of any processing.
    {
      for ( input_symbol_idx = 0; input_symbol_idx < array_one_length; input_symbol_idx++ )
      {
        idx = 0  ;  // index of the symbol being searched for replacement
        while (idx != -1 ) //whie-00
        {
          modified_substring = modified_substring.replace( array_one[ input_symbol_idx ] , array_two[input_symbol_idx] );
          idx = modified_substring.indexOf( array_one[input_symbol_idx] );
        } // end of while-00 loop
      } // end of for loop
      // Code for Replacing five Special glyphs


      // Code for Glyph1 : ± (reph+anusvAr)
      modified_substring = modified_substring.replace( /±/g , "Zं" ) ; // at some places  ì  is  used eg  in "कर्कंधु,पूर्णांक".

      // Glyp2: Æ
      // code for replacing "f" with "ि" and correcting its position too. (moving it one position forward)
      modified_substring = modified_substring.replace( /Æ/g , "र्f" ) ;  // at some places  Æ  is  used eg  in "धार्मिक".
      var position_of_i = modified_substring.indexOf( "f" );

      while ( position_of_i != -1 )  //while-02
      {
        var charecter_next_to_i = modified_substring.charAt( position_of_i + 1 )
        var charecter_to_be_replaced = "f" + charecter_next_to_i
        modified_substring = modified_substring.replace( charecter_to_be_replaced , charecter_next_to_i + "ि" ) 
        position_of_i = modified_substring.search( /f/ , position_of_i + 1 ) // search for i ahead of the current position.
      } // end of while-02 loop

      // Glyph3 & Glyph4: Ç  É
      // code for replacing "fa" with "िं"  and correcting its position too.(moving it two positions forward)

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

      // Glyph5: Ê
      // code for replacing "h" with "ी"  and correcting its position too.(moving it one positions forward)

      modified_substring = modified_substring.replace( /Ê/g , "ीZ" ) ; // at some places  Ê  is  used eg  in "किंकर".
      // End of Code for Replacing four Special glyphs

      // following loop to eliminate 'chhotee ee kee maatraa' on half-letters as a result of above transformation.

      var position_of_wrong_ee = modified_substring.indexOf( "ि्" ) ;
      while ( position_of_wrong_ee != -1 )  //while-03
      {
        var consonent_next_to_wrong_ee = modified_substring.charAt( position_of_wrong_ee + 2 )
        var charecter_to_be_replaced = "ि्" + consonent_next_to_wrong_ee 
        modified_substring = modified_substring.replace( charecter_to_be_replaced , "्" + consonent_next_to_wrong_ee + "ि" ) 
        position_of_wrong_ee = modified_substring.search( /ि्/ , position_of_wrong_ee + 2 ) // search for 'wrong ee' ahead of the current position. 
      } // end of while-03 loop

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
  } // end of the function  Replace_Symbols
} // end of Kritidev_to_unicode function