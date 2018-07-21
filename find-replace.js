convert_wchanakya_to_unicode();  

function convert_wchanakya_to_unicode() {
  var array_one = new Array(
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
    "¶" , "फ्" ,
    "c" , "ब" ,
    "Ck" , "ब" ,
    "C" , "ब्" ,
    "Hk" , "भ" ,
    "H" , "भ्" ,
    "e" , "म" ,
    "Ek" , "म" ,
    "E" , "म्" ,
    "\;" , "य" ,
    "\¸" , "य्" ,
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
    "l" , "स" ,
    "Lk" , "स" ,
    "L" , "स्" ,
    "g" , "ह" ,
    "È" , "ीं" ,
    "z" , "्र" ,
    "Ì" , "द्द" ,
    "Í" , "ट्ट" ,
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
    "μ" , "-" ,
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
  
  var appliedFont = 'Walkman-Chanakya-905';  
  changeGrep(appliedFont, '[ZzsSqwa¡`]+)Q' , "Q$1" )
  for ( var i = 0;   i < array_one.length; i = i+2)    
    changeText(appliedFont, array_one[i] , array_one[i+1]);

  changeGrep(appliedFont, '([ेैुूं]+)्र ', "्र$1" ) ;
  changeGrep(appliedFont, 'ं([ाेैुू]+) ', "$1ं" ) ;
  changeGrep(appliedFont, '([ \n])ा ', "$1श" ) ;
  changeGrep(appliedFont, '¯' , "f") ;
  changeGrep(appliedFont, 'Ł' , "र्f") ;	
  changeGrep(appliedFont, '([fŻ])([कखगघङचछजझञटठडड़ढढ़णतथदधनपफबभमयरलवशषसहक्ष]) ', "$2$1" ) ;
  changeGrep(appliedFont, '([fŻ])(्)([कखगघङचछजझञटठडड़ढढ़णतथदधनपफबभमयरलवशषसहक्ष]) ', "$2$3$1" ) ;
  changeGrep(appliedFont, '([fŻ])(्)([कखगघङचछजझञटठडड़ढढ़णतथदधनपफबभमयरलवशषसहक्ष]) ', "$2$3$1" ) ;
  changeGrep(appliedFont, 'f' , "ि") ;
  changeGrep(appliedFont, 'Ż' , "िं") ;    
  //following three statement for adjusting position of reph ie, half r .
  changeGrep(appliedFont, '±' , "Zं" ) ;
  changeGrep(appliedFont, '([कखगघचछजझटठडड़ढढ़णतथदधनपफबभमयरलळवशषसहक्षज्ञ])([ािीुूृेैोौंँ]*)([Z])' , "$3$1$2" ) ;
  changeGrep(appliedFont, '([कखगघचछजझटठडड़ढढ़णतथदधनपफबभमयरलळवशषसहक्षज्ञ])([्])([Z])' , "$3$1$2" ) ;
  changeGrep(appliedFont, 'Z' , "र्" ) ;    
} 

function changeText(appliedFont, findWhat, changeTo) {
  // Clear the find/change text preferences.
  app.findTextPreferences = NothingEnum.NOTHING; 
  app.changeTextPreferences = NothingEnum.NOTHING; 

  // Set the find options
  app.findChangeTextOptions.caseSensitive = false;
  app.findChangeTextOptions.includeFootnotes = false;
  app.findChangeTextOptions.includeHiddenLayers = false;
  app.findChangeTextOptions.includeLockedLayersForFind = false;
  app.findChangeTextOptions.includeLockedStoriesForFind = false;
  app.findChangeTextOptions.includeMasterPages = false;
  app.findChangeTextOptions.wholeWord = false;

  // Search the document for the string "copy"
  app.findTextPreferences.findWhat = findWhat;
  app.findTextPreferences.appliedFont = appliedFont;

  // Change it to the string "text"
  app.changeTextPreferences.changeTo = changeTo;
  app.changeTextPreferences.appliedFont = "Utsaah";

  // Perform the search-and-replace operation
  app.activeDocument.changeText();

  // Clear the preferences again
  app.findTextPreferences = NothingEnum.NOTHING;
  app.changeTextPreferences = NothingEnum.NOTHING;
}    

function changeGrep(appliedFont, findWhat, changeTo) {    
  // Clear the find/change grep preferences
  app.findGrepPreferences = NothingEnum.NOTHING; 
  app.changeGrepPreferences = NothingEnum.NOTHING; 

  // Set the find options
  app.findChangeGrepOptions.includeFootnotes = false;
  app.findChangeGrepOptions.includeHiddenLayers = false;
  app.findChangeGrepOptions.includeLockedLayersForFind = false;
  app.findChangeGrepOptions.includeLockedStoriesForFind = false;
  app.findChangeGrepOptions.includeMasterPages = false;

  // Regular expression for finding an email address
  app.findGrepPreferences.findWhat = findWhat;
  app.changeGrepPreferences.changeTo = changeTo;

  // Apply the change to 24-point text only
  app.findGrepPreferences.appliedFont = appliedFont;
  app.changeGrepPreferences.appliedFont = "Utsaah";

  // Perform the operation
  app.activeDocument.changeGrep();

  // Clear the find/change preferences after the search
  app.findGrepPreferences = NothingEnum.NOTHING;
  app.changeGrepPreferences = NothingEnum.NOTHING;
}

function convert_chanakya_to_unicode(legacy_txt) {
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

function Devlys2Uni(text) {
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

  "ट्ट",   "ट्ठ",   "ट",   "ठ",   "ड्ड",   "ड्ढ",   "ड़", "ढ़", "ड",   "ढ", "ण", "ण्",   
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
    //  Breaking part code over
    text = processed_text  ;
    return text;
  }

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