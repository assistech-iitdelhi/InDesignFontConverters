(function() {
var stories = app.activeDocument.stories.everyItem().getElements();

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
  }  
}

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
  return fontName == "Chanakya";
}

function convert_to_unicode(legacy_txt) {
  var array_one = new Array(
    '\xf8',
    '\xd2\xd2',
    '\xd2',
    '\xd3\xd3',
    '\xd3',
    '\xef',
    '\xa4',
    '\x55',
    '$',
    "¤","U",

    // correct anusvAr+ekAr, ekAr+nuqta to the reverse order
    "¢ð","´ð","ð¸",
       
    "Ò","¥æò","¸",
    "¸•", "¸¹", "¸»", "¸Á","¸Ç", "¸É", "¸È","¸Ø","¸Ú","¸Ù",
     
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","T","V","W","X","Y",
    "`","a","b","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u",

    "žæ","ž","#","%","@",
    "„","¦","¨","¯","µ","º",

    "Cþ","q","Ê","u","g",    
    "Ÿæ","Åþ","Çþ","Éþ", 
    "^","h","Ð","ý","þ",

    "¥ô","¥æð","¥õ","¥æñ","¥æ","¥","§Z","§ü","§","©","ª","«","¬","­","°ð","°",

    "€", "·", "",  "¹", "‚", "»", "ƒæ", "ƒ", "¾", 
    "“","‘","¿","À","”","…","’","Á",'\x95','\x95\xe6',"Ûæ","Û","†æ","†",

    "Å","Æ","Ç","É","‡æ","‡",
    "ˆ","Ì","‰","Í","Î","¼","Š","Ï","óæ","ó","‹æ","Ù","‹",

    "Œ","Â","","È","Ž","Õ","","Ö","","×",
    "Ä","Ø","Ú","Ë","Ü","¶","Ý","Ã","ß",
    "àæ","³æ","o","³","à","c","á","S","â","ã","±",
    "ÿæ","ÿ","˜æ","˜","™æ","™","üð´",
     
    "æò","æñ","æ","è","é","ê","ä","å","ë","ì","í","Ô","ñ","ô","õ",
    "¢","´","¡","Ñ","¸","ò","ù","÷","ð",

    "0","1","2","3","4","5","6","7","8","9",
    "®","v","w","x","y","z","{","|","}","~",
    "्ो","्ौ","्ाे", "्ाा","ाे","ाे","ाै","्ा","ंु","ओे","ोे","ाे","ईंं" );

  var array_two = new Array(
    '\u0970',
    '"',
    "'",
    '"',
    "'",
	  '',
    '',
    '',
    '', // TODO फ
    "","",

    // correct anusvAr+ekAr, ekAr+nuqta to the reverse order
    "ð¢","ð´","¸ð",

    "'","ऑ","फ़्", 
    "क़","ख़","ग़","ज़","ड़","ढ़","फ़","य़","ऱ","ऩ",

    "्र","क्च","ष्ट","ष्ठ","श्व","स्न","त्र","॥","ढ्ढ","छ्व","्य","रु","रू",
    "हृ","ह्र","क्क","क्त","क्र","ञ्ज","ङ्क","ङ्ख","ङ्ग","ङ्घ",
    "क्व","ड्ड","ड्ढ","स्र","द्ग","द्घ","द्द","द्ध","द्ब","द्भ","द्म","द्य","द्व","ठ्ठ","श्च","ह्न","ह्म्","ह्य","ह्ल","ह्व",
     
    "त्त","त्त्","प्त","त्न","ञ्च",
    "ल्ल","ष्ट्व","ङ्क्ष","ख्न","द्ब्र","ख्र",

    "ष्ट्र","ह्न","ज़्","ह्व","द्द",  
    "श्र","ट्र","ड्र","ढ्र",
    "ट्ट","द्ध","।","्र","्र",
     
    "ओ","ओ","औ","औ","आ","अ","ईं","ई","इ","उ","ऊ","ऋ","ॠ","ऌ","ऐ","ए",

    "क्", "क","ख्","ख","ग्","ग","घ","घ्","ङ",
    "च्च्","च्","च","छ","ज्ज्","ज्","ज्","ज","\u095B\u094D","\u095B","झ","झ्","ञ","ञ्",
     
    "ट","ठ","ड","ढ","ण","ण्",
    "त्","त","थ्","थ","द","द","ध्","ध","न्न","न्न्","न","न","न्",

    "प्","प","फ्","फ","ब्","ब","भ्","भ","म्","म",
    "य्","य","र","ल्","ल","ल","ळ","व्","व",
    "श","श","श","श्","श्","ष्","ष","स्","स","ह","ह्",
    "क्ष","क्ष्","त्र","त्र्","ज्ञ","ज्ञ्","ðZ",

    "ॉ","ौ","ा","ी","ु","ू","ु","ू","ृ","ॄ","ॢ","े","ै","ो","ौ",
    "ं","ं","ँ",":","़", "ॅ","ऽ","्","े",

    "०","१","२","३","४","५","६","७","८","९",
    "0","1","2","3","4","5","6","7","8","9",

    "े", "ै", "े","ा","ो","ो","ौ","","ुं","ओ","ो","ो","ईं"); 

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
  return processed_text;
  function Replace_Symbols( )
  {
    //substitute array_two elements in place of corresponding array_one elements
    if ( modified_substring != "" )  // if string to be converted is non-blank then no need of any processing.
    {
      // first replace the two-byte nukta_varNa with corresponding one-byte nukta varNas.
      modified_substring = modified_substring.replace ( /क़/ , "क़" )  ; 
      modified_substring = modified_substring.replace ( /ख़‌/g , "ख़" )  ;
      modified_substring = modified_substring.replace ( /ग़/g , "ग़" )  ;
      modified_substring = modified_substring.replace ( /ज़/g , "ज़" )  ;
      modified_substring = modified_substring.replace ( /ड़/g , "ड़" )  ;
      modified_substring = modified_substring.replace ( /ढ़/g , "ढ़" )  ;
      modified_substring = modified_substring.replace ( /ऩ/g , "ऩ" )  ;
      modified_substring = modified_substring.replace ( /फ़/g , "फ़" )  ;
      modified_substring = modified_substring.replace ( /य़/g , "य़" )  ;
      modified_substring = modified_substring.replace ( /ऱ/g , "ऱ" )  ;

      for(input_symbol_idx = 0;   input_symbol_idx < array_one_length;    input_symbol_idx++ )
      {
        idx = 0  ;  // index of the symbol being searched for replacement
        while (idx != -1 ) //whie-00
        {
          modified_substring = modified_substring.replace( array_one[ input_symbol_idx ] , array_two[input_symbol_idx] )
          idx = modified_substring.indexOf( array_one[input_symbol_idx] )
        } // end of while-00 loop
      } // end of for loop
      
      // Code for Replacing Special glyph : Z (reph+anusvAr)
      modified_substring = modified_substring.replace( /Z/g , "üं" ) ; // at some places  ì  is  used eg  in "कर्कंधु,पूर्णांक".

      // code for replacing  "ç"   with "ि" (chhotee ee kii maatraa) and correcting its position too.
      var position_of_f = modified_substring.indexOf( "ç" )  ;

      while ( position_of_f != -1 )  //while-02
      {
        var charecter_right_to_f = modified_substring.charAt( position_of_f + 1 )  ;
        modified_substring = modified_substring.replace( "ç" + charecter_right_to_f  ,  charecter_right_to_f + "ि" )  ;
        position_of_f = position_of_f + 1  ;
        while ( ( modified_substring.charAt( position_of_f + 1 ) == "्" ) & ( position_of_f < modified_substring.length - 1 ) )
        {
          var string_to_be_replaced = modified_substring.charAt( position_of_f + 1 ) + modified_substring.charAt( position_of_f + 2 )  ;
          modified_substring = modified_substring.replace( "ि" + string_to_be_replaced , string_to_be_replaced + "ि" )  ;
          position_of_f = position_of_f + 2  ;
        }

        position_of_f = modified_substring.search( /ç/ , position_of_f + 1 ) ; // search for ç ahead of the current position.
      } // end of while-02 loop

      //Eliminating "ü"(reph) and putting 'half - r' at proper position for this.
      set_of_matras = "ा ि ी ु ू ृ े ै ो ौ ं ः ँ ॅ" 
      var position_of_Z = modified_substring.indexOf( "ü" )

      while( position_of_Z > 0 )  // while-04
      {
        probable_position_of_half_r = position_of_Z - 1 ;
        var charecter_at_probable_position_of_half_r = modified_substring.charAt( probable_position_of_half_r )

        // trying to find non-maatra position left to current ü (ie, half -r).
        while( set_of_matras.match( charecter_at_probable_position_of_half_r ) != null )  // while-05
        {
          probable_position_of_half_r = probable_position_of_half_r - 1 ;
          charecter_at_probable_position_of_half_r = modified_substring.charAt( probable_position_of_half_r ) ;
        }// end of while-05
        charecter_to_be_replaced = modified_substring.substr ( probable_position_of_half_r , ( position_of_Z - probable_position_of_half_r ) ) ;
        new_replacement_string = "र्" + charecter_to_be_replaced ; 
        charecter_to_be_replaced = charecter_to_be_replaced + "ü" ;
        modified_substring = modified_substring.replace( charecter_to_be_replaced , new_replacement_string ) ;
        position_of_Z = modified_substring.indexOf( "ü" ) ;
      }// end of while-04
    }//end of IF  statement  meant to  supress processing of  blank  string.
  } // end of the function  Replace_Symbols
} // end of convert_Chanakya_to_Unicode()