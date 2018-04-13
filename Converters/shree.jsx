(function() {
  var stories = app.activeDocument.stories.everyItem().getElements();
// Progress bar -----------------------------------------------------------------------------------  
var myProgressWin = new Window ( "window", "Unicode Script "+app.activeDocument.name );  
var myProgressBar = myProgressWin.add ("progressbar", [12, 12, 350, 24], 0, stories.length);  
var myProgressTxt = myProgressWin.add("statictext", undefined, "Starting Conversion");  
myProgressTxt.bounds = [0, 0, 340, 200];  
myProgressTxt.alignment = "left";  
myProgressWin.show();  
// Progress bar ----------------------------------------------------------------------------------- 
for (var i = 0; i < stories.length; i++) {
  var textStyleRanges = stories[i].textStyleRanges.everyItem().getElements();
  for (var j = textStyleRanges.length-1; j >= 0; j--) {
    var myText = textStyleRanges[j];
    if (matches(myText.appliedFont.fontFamily)) {
      var converted = convert_to_unicode(myText.contents);
      if (converted != undefined) {
        myText.contents = converted;                 
        myText.appliedFont = app.fonts.item("Utsaah");
        myText.composer = "Adobe World-Ready Paragraph Composer";
      } 
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
for (var i = 0; i < app.activeDocument.fonts.length; i++) {
  var fontFamily = app.activeDocument.fonts[i].fontFamily;
  if (matches(fontFamily))     {
    app.findTextPreferences = NothingEnum.nothing;
    app.changeTextPreferences = NothingEnum.nothing;
    app.findTextPreferences.appliedFont = fontFamily;
    app.changeTextPreferences.appliedFont = "Utsaah";
    app.activeDocument.changeText();
  }
}
})();
function matches(fontName) {
  return fontName.indexOf("SH") == 0;
}

function convert_to_unicode(legacy_text)
{
var array_one = new Array( 
 
 'T' ,		   '',
 '\>' , 		 '' ,
 'µµµ' ,		 '' ,
 '\x54',		 '' ,
 'Ü' ,		   'ऋ' ,
 'Àb¼' ,		 'औ' ,
 'ÀbC' ,		 'ओ' ,
 'yC' ,		   'ऐ' ,
 'y' ,		   'ए' ,
 '\u0111',   'ऊ' ,
 'ð' ,		   'ऊ' ,
 '¦' ,		   'उ' , 
 '\u0118\xb6' ,		   'ई' ,
 '\u0118',  'इ',
 'Ê' ,		   'इ' ,
 'Àb' ,		   'आ' ,
 'À' ,		   'अ' ,
 '\u0154',	 'अ' ,	

 'ï' ,		   'क्ष्' ,
 '\[' ,		   'क्ष' ,
 '_' ,		   'त्र' ,
 '§' ,		   'ज्ञ' ,
 'Ì' ,		   'ह्म' ,
 '´' ,		   'हृ' ,
 '¤' ,		   'ह्' ,
 '«' ,		   'ह' ,
 'h' ,		   'स्' ,
 'P' ,		   'स' ,
 'á' ,		   'ष' ,
 '÷' ,		   'ष्' ,
 'g' ,		   'श्र' ,
 '\x57\x62',     'श',
 'A' ,		   'श्' ,
 '~' ,		   'श' ,
 'Ñ' ,		   'व्' ,
 '\u0143',   'व्' ,
 'ë' ,		   'व' ,
 'e' ,		   'ल्' ,
 'J',		     'ल' ,
 'U' ,		   'ल' ,
 'õ' ,		   'रू' ,
 '\x69' ,	   'रू' ,
 'õ' ,		   'रु' ,
 '\u0151' ,		   'रु' ,
 'Ù' ,		   'र' ,
 '\u016e',	 'र' ,	
 'à' ,		   'य ' ,
 '\u0155',	 'य ' ,	
 'î' ,		   'म' ,
 '|' ,		   'म्' ,
 'B' ,		   'भ' ,
 '\xa8',    'भ्',
 'm' ,		   'ब्' ,
 'k' ,		   'ब' ,
 'V' ,		   'फ' ,
 '±' ,		   'प' ,
 'í' ,		   'प्' ,
 'E' ,		   'न्' ,
 'D' ,		   'न' ,
 '\u0170' ,		   'न्न' ,
 'Ç' ,		   'ध्' ,
 'µ' ,		   'ध' ,
 'V' ,		   'ध' ,
 'Ó' ,		   'द्द' ,
 'X' ,		   'द्ध' ,
 'ô' ,		   'द्व' ,
 'Ë' ,		   'द्य' ,
 '¾' ,		   'द्र' ,
 '£' ,		   'द' ,
 '\u0141',  'द',
 '»' ,		   'थ्' ,
 'ñ' ,		   'थ' ,
 '\u0144' ,	 'थ' ,
 'Ï' ,		   'त्' ,
 '\u010e' ,		   'त्' ,
 'c' ,		   'त्त' ,
 '\x7b',    'त्त्',
 'È' ,		   'त' ,
 '\u010c',	 'त' ,	
 'L' ,		   'ण' ,
 
 '\xb7',    'ण्',
 'Ý' ,		   'ढ़' ,
 'ú' ,		   'ढ़' ,
 'Ý' ,		   'ढ' ,
 '\u016f',  'ड़',
 'ù' ,		   'ड़' ,
 'r' ,		   'डड्' ,
 'Ô' ,		   'ड' ,
 'q' ,		   'ठ' ,
 '\xe4',    'ठ्य',
 '^' ,		   'ट' ,
 '\u02dd',	 'झ' ,	
 '½' ,		   'झ' ,
 '¢' ,		   'ज्' ,
 '\u02d8',  'ज्',
 '\xa9',  'ज्',  
 '®' ,		   'ज' ,
 '\u0119',  '\u095b',
 'n' ,		   'छ' ,
 '\u0158',  'च्',
 'Ø' ,		   'च्' ,
 'ª' ,		   'च ' ,
 '\u015e' ,		   'च ' ,
 '\u015a',  '\u0919',
 'ì' ,		   'घ्' ,
 '\u011b',   'घ्' ,
 'ß' ,		   'घ' ,
 '³Ð' ,		   'ग्र' ,
 'Â' ,		   'ग्' ,
 '³' ,		   'ग' ,
 '\u0142',	 'ग',	
 'v' ,		   'ख्' ,
 'Ú' ,		   'ख' ,
 'ã' ,		   'क्' ,
 '¥',		     'क' ,
 '\x73',		 'क्' , 
 '\u0104',	 'क' ,	
 '\u0160', '\u0919्क',
 '\™' ,		   '9',
 '\˜' ,		   '8',
 '\—' ,		   '7',
 '\–' ,		   '6',
 '•' ,		   '5',
 '\”' ,		   '4',
 '\“' ,		   '3',
 '\’' ,		   '2',
 '\‘',		   '1',
 ' ा',		     'ा',
 '\u0148',	 'ी',	
 ' ु',		     'ु',
 '\u017b',		     'ू',
 ' ृ',		     'ृ',
 ' े',		     'े',
 ' ै',		     'ै',
 ' ो',		     'ो',
 ' ं',		     'ं',
 ' ँ',		     'ँ',
 ' ः',		     'ः',
 'ँा',		     'ाँ',
 'ँू',		     'ूँ',
 'ंे',		     'ंे',
 'ंै',		     'ैं',
 'ंो',		     'ों',
 'ंो',		     'ों' ,
 'अा',     'आ',
 'è' ,		   '्' ,
 '\u010d' ,  '्' ,
 'Ð' ,		   '्र',
 '\xac',    '्र',
 '\u0110',	 '्र',	
 '¶' ,		   'ρ' ,
 '\x59',    'ρं',
 '*' ,		   'ं' ,
 '}' ,		   'ं' ,
 'w' ,		   'ं' ,
 'M' ,		   'ँ' ,
 'H' ,		   'ँ' ,
 'b¼' ,		   'ौ' ,
 'bC' ,		   'ो' ,
 'É' ,		   'ृ' ,
 '¼',		     'ै',
 '\u013d' ,	 'ै'  ,	
 'C' ,		   'े' ,
 '¯' ,		   'ू' ,
 'R' ,		   'ू' ,
 'é' ,		   'ु' ,
 'N' ,		   'ु' ,
 '\x47',    'Ι',
 '\x3c',    'Ι',
 '\u0103',  'Ι',
 'a' ,		   'ी' ,
 'ò' ,		   'ी' ,
 'b' ,		   'ा' ,
 '#' ,		   'ः' ,
 '$' ,		   '।' , );

//**********************************************
  var array_one_length = array_one.length ;
  var modified_substring = legacy_text;

  //  Break the long text into small bunches of chunk_size  characters each.
  var text_size = modified_substring.length ;
  var processed_text = '' ;  //blank
  var sthiti1 = 0 ;  var sthiti2 = 0 ;  var chale_chalo = 1 ;
  var chunk_size = 6000; // this charecter long text will be processed in one go.
  while ( chale_chalo == 1 )
  {
    sthiti1 = sthiti2 ;
    if ( sthiti2 < ( text_size - chunk_size ) ) { 
      sthiti2 +=  chunk_size;
    } else { 
      sthiti2 = text_size;  
      chale_chalo = 0;
    }
    var modified_substring = legacy_text.substring ( sthiti1, sthiti2 )  ;
    Replace_Symbols( ) ;
    processed_text = processed_text + modified_substring ;
  }
  return processed_text  ;  
  function Replace_Symbols( )
  {
    //substitute array_two elements in place of corresponding array_one elements
    if ( modified_substring != "" )  // if stringto be converted is non-blank then no need of any processing.
    {
for ( input_symbol_idx = 0;   input_symbol_idx < array_one_length;    input_symbol_idx += 2 )
      { 
        idx = 0  ;  // index of the symbol being searched for replacement
        while (idx != -1 ) //while-00
        {
modified_substring = modified_substring.replace( array_one[ input_symbol_idx ] ,
 array_one[input_symbol_idx+1] )
          idx = modified_substring.indexOf( array_one[input_symbol_idx] )
        } // end of while-00 loop
      } // end of for loop
// alert(" end of for loop")
// alert(" modified substring2 = "+modified_substring)
//*******************************************************

var position_of_i = modified_substring.indexOf( "Ι" )
      while ( position_of_i != -1 )  //while-02
      {
        var charecter_next_to_i = modified_substring.charAt( position_of_i + 1 )
var charecter_to_be_replaced = "Ι" + charecter_next_to_i
modified_substring = modified_substring.replace( charecter_to_be_replaced ,
 charecter_next_to_i + "ि" ) 
position_of_i = modified_substring.search( /Ι/ ,
 position_of_i + 1 ) // search for i ahead of the current position.
      } // end of while-02 loop
      // End of Code for Replacing four Special glyphs
      // following loop to eliminate 'chhotee ee kee maatraa' on half-letters as a result of above transformation.
      var position_of_wrong_ee = modified_substring.indexOf( "ि्" ) 
      while ( position_of_wrong_ee != -1 )  //while-03
      {
        var consonent_next_to_wrong_ee = modified_substring.charAt( position_of_wrong_ee + 2 )
        var charecter_to_be_replaced = "ि्" + consonent_next_to_wrong_ee 
modified_substring = modified_substring.replace( charecter_to_be_replaced ,
 "्" + consonent_next_to_wrong_ee + "ि" ) 
position_of_wrong_ee = modified_substring.search( /ि्/ ,
 position_of_wrong_ee + 2 ) // search for 'wrong ee' ahead of the current position. 
      } // end of while-03 loop
      // following loop to eliminate 'chhotee ee kee maatraa' on half-letters as a result of above transformation.
      var position_of_wrong_ee = modified_substring.indexOf( "िं्" ) 
      while ( position_of_wrong_ee != -1 )  //while-03
      {
        var consonent_next_to_wrong_ee = modified_substring.charAt( position_of_wrong_ee + 3 )
        var charecter_to_be_replaced = "िं्" + consonent_next_to_wrong_ee 
modified_substring = modified_substring.replace( charecter_to_be_replaced ,
 "्" + consonent_next_to_wrong_ee + "िं" ) 
position_of_wrong_ee = modified_substring.search( /िं्/ ,
 position_of_wrong_ee + 3 ) // search for 'wrong ee' ahead of the current position. 
      } // end of while-03 loop
      // Eliminating reph "Ô" and putting 'half - r' at proper position for this.
      set_of_matras = "ा ि ी ु ू ृ े ै ो ौ ं : ँ ॅ" 
var position_of_R = modified_substring.indexOf( "ρ" )
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
charecter_to_be_replaced = modified_substring.substr ( probable_position_of_half_r ,
 ( position_of_R - probable_position_of_half_r ) ) ;
        new_replacement_string = "र्" + charecter_to_be_replaced ; 
charecter_to_be_replaced = charecter_to_be_replaced + "ρ" ;
modified_substring = modified_substring.replace( charecter_to_be_replaced ,
 new_replacement_string ) ;
position_of_R = modified_substring.indexOf( "ρ" ) ;
      } // end of while-04
    } // end of IF  statement  meant to  supress processing of  blank  string.
  } // end of the function  Replace_Symbols
} // end of convert_to_unicode function
