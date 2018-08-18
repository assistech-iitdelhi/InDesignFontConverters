function main() {
  setupEssentials(); 
	for (var i = 0; i < iitd.fonts.length; i++) {
		convertToUnicode.apply(null, iitd.fonts[i]);
		reorderChars();
	}
}

function setupEssentials() {
  if (typeof Array.prototype.indexOf != "function") {
    Array.prototype.indexOf = function (el) {
    for(var i = 0; i < this.length; i++) if(el === this[i]) return i;
      return -1;
    }
  }
}

function convertToUnicode(srcFont, srcStyle, glyphToCharMap, tgtFont, tgtStyle, scalingFactor) {  
	function change(ptSize) {
		app.findGrepPreferences.appliedFont = srcFont;      
		app.findGrepPreferences.fontStyle = srcStyle;
		app.findGrepPreferences.findWhat = glyphToCharMap[j];
		//app.findGrepPreferences.pointSize = ptSize;
		app.changeGrepPreferences.appliedFont = tgtFont;
		app.changeGrepPreferences.fontStyle = tgtStyle;
		app.changeGrepPreferences.changeTo = glyphToCharMap[j+1];
		app.changeGrepPreferences.appliedLanguage = 'Hindi (India)';
		//app.changeGrepPreferences.pointSize = Math.round(ptSize*scalingFactor);
		app.changeGrepPreferences.composer = "Adobe World-Ready Paragraph Composer";
		app.activeDocument.changeGrep();
	};
  app.findChangeGrepOptions.includeMasterPages = true;
  app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
	//if (scalingFactor < 1.0) {
	//	for (var pt = 6; pt <= 72; pt++) {
	for (var j = 0; j < glyphToCharMap.length; j += 2) {
		change(0);
	}
	//	}
	//} else {
	//	for (var pt = 72; pt >= 6; pt--) {
	//		for (var j = 0; j < glyphToCharMap.length; j += 2) {
	//			change(pt);
	//		}
	//	}
	//}
  // clear settings so the last lookup doesn't interfere with fut'ure searches
  app.findTextPreferences = NothingEnum.NOTHING;
  app.changeTextPreferences = NothingEnum.NOTHING;  
} // end of convertToUnicode function

function reorderChars() {
  var changeTo = [
    // indesign find/change text treats ' and ` as equals
    // nothing irrelevant separates parts of क, फ
    'व([Ρρ़ाुूेैोौॊॉीृंँ]*)η', 'क$1',
    'व़([Ρρाुूेैोौॊॉीृंँ]*)η', 'क़$1',
    'प([Ρρाुूेैोौॊॉींँ]*)η', 'फ$1',
    'प़([Ρρाुूेैोौॊॉींँ]*)η', 'फ़$1',
    'उ([Ρρ़ाुूेैोौॊॉींँ]*)η', 'ऊ$1',
    
    // vowel signs and vowel modifiers go to end
    '([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)([ाुूेैोौॊॉीृंँ]*)Ρ' , '$1्र$2' ,
    
    // vowel modifiers after vowel signs
    '[(ंँ])([्ाुूेैोौॊॉीृ]+)' , '$2$1' ,
    
    // nukta before vowel signs
    '([्ाुूेैोौॊॉीृ]+)़' , '़$1' ,
    
    'ε(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)ρμ' , 'र्$1िं',
    'ερμ(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)' , 'र्$1िं',
    'ερ(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)' , 'र्$1ि',
    'ε(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)ρ' , 'र्$1ि',
    'εμ(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)' , '$1िं',
    'ε(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)' , '$1ि',
    '(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?[ाुूेैोौॊॉीृ]?)ρ[μं]' , 'र्$1ं',
    '(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?[ाुूेैोौॊॉीृ]?)[μं]ρ' , 'र्$1ं',
    '(([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?्)*[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?[ाुूेैोौॊॉीृ]?)ρ' , 'र्$1' ,
    'इρ[μं]' , 'ईं',
    'इρ', 'ई',
		// replace by nukta containing counterparts as the font handles them better
		'क़',	'\\x{0958}',
		'ख़',	'\\x{0959}',
		'ग़',	'\\x{095A}',
		'ज़',	'\\x{095B}',
		'ड़',	'\\x{095C}',
		'ढ़',	'\\x{095D}',
		'फ़',	'\\x{095E}',
		'य़',	'\\x{095F}',
  ];
  app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
  app.findChangeGrepOptions.includeMasterPages = true;
  for (var i = 0; i < changeTo.length; i += 2) {    
    app.findGrepPreferences.findWhat = changeTo[i];
    app.changeGrepPreferences.changeTo = changeTo[i+1];
    app.activeDocument.changeGrep();
  }
}

var iitd = {
	'walkman': [
		'0', '0',
		'1', '1',
		'2', '2',
		'3', '3',
		'4', '4',
		'5', '5',
		'6', '6',
		'7', '7',
		'8', '8',
		'9', '9',
		'\\x{0021}', '!',
		'\\x{0028}', '(',
		'\\x{0029}', ')',
		'\\s', '$0',
		'Q', 'η',
		" ", " ", // otherwise spaces remain in the source font
		"I\\x{002B}k", "प़" ,
		"I\\x{002B}", "प़्" ,
		"OkQa", "क़",
		"jQ", "रु",
		"ñ" , "॰" ,
		'\\x{0060}', 'ृ',
		'\\x{0027}k', 'श',
		'\\x{0027}', 'श्',
		"Q\\x{002B}Z" , "QZ\\x{002B}" ,
		"\\x{005F}", ";",
		"¼Z" , "र्द्ध" ,
		"ZZ" , "Z" ,
		"Z", 'ρ',
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
		"¶\\x{002B}" , "फ़्" ,
		"d\\x{002B}" , "क़" ,
		"\\x{005B}\\x{002B}k" , "ख़" ,
		"\\x{005B}\\x{002B}" , "ख़्" ,
		"x\\x{002B}" , "ग़" ,
		"T\\x{002B}" , "ज़्" ,
		"t\\x{002B}" , "ज़" ,
		"M\\x{002B}" , "ड़" ,
		"<\\x{002B}" , "ढ़" ,
		";\\x{002B}" , "य़" ,
		"j\\x{002B}" , "ऱ" ,
		"u\\x{002B}" , "ऩ" ,
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
		"\\x{007B}k" , "क्ष" ,
		"\\x{007B}" , "क्ष्" ,
		"f\=" , "त्रि" ,
		"\=k" , "त्र" ,
		"\«" , "त्र्" ,
		"Nî" , "छ्य" ,
		"Vî" , "ट्य" ,
		"Bî" , "ठ्य" ,
		"Mî" , "ड्य" ,
		"\<î" , "ढ्य" ,
		"\\x{007C}" , "द्य" ,
		"K" , "ज्ञ" ,
		"\\x{007D}" , "द्व" ,
		"J" , "श्र" ,
		"Vª" , "ट्र" ,
		"Mª" , "ड्र" ,
		"\>ª" , "ढ्र" ,
		"Nª" , "छ्र" ,
		"Ø" , "क्र" ,
		"Ý" , "फ्" ,
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
		"±", "ρं",
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
		"£" , "εर्" ,
		"\\x{005B}k" , "ख" ,
		"\\x{005B}" , "ख्" ,
		"x" , "ग" ,
		"Xk" , "ग" ,
		"X" , "ग्" ,
		"Ä" , "घ" ,
		"\\x{003F}k" , "घ" ,
		"\\x{003F}" , "घ्" ,
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
		"M\\x{002B}" , "ड़" ,
		"<\\x{002B}" , "ढ़" ,
		"M" , "ड" ,
		"<" , "ढ" ,
		"\\x{002E}k" , "ण" ,
		"\\x{002E}" , "ण्" ,
		"r" , "त" ,
		"Rk" , "त" ,
		"R" , "त्" ,
		"Fk" , "थ" ,
		"F" , "थ्" ,
		"f" , "ε",
		"¯" , "εμ",
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
		"z" , "Ρ" ,
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
		"\\x{00AA}" , "Ρ" ,
		"\‚" , "ॉ" ,
		"¨" , "ो" ,
		"ks" , "ो" ,
		"©" , "ौ" ,
		"kS" , "ौ" ,
		"k" , "ा" ,
		"h" , "ी" ,
		"q" , "ु" ,
		"w" , "ू" ,
		//"`" , "ृ" , use grep find/change
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
		"\\x{002B}" , "़" ,
		"\\" , "?" ,
		"\‘" , "\"" ,
		"\’" , "\"" ,
		"\“" , "\'" ,
		// "\”" , "\'" ,
		"\\x{005E}" , "\‘" ,
		"\\x{002A}" , "\’" ,
		"Þ" , "\“" ,
		"ß" , "\”" ,
		"¾" , "=" ,
		"-" , "." , // placed above the & conversion below to prevent '&' -> '-' -> '.'
		"&" , "-" ,	// hyphen
		"µ" , "\\x{2013}" , // en-dash
		"¿" , "{" ,
		"À" , "}" ,
		"A" , "।" ,
		"Œ" , "॰" ,
		"]" , "\," ,
		"@" , "\/" ,
		" ः" , ":" ,
		"~" , "्" ,
		"्ा" ,    "" ,
		"़्ा" ,    "़" ,
		"़्ो" ,    "़े" ,
		"्ौ" ,    "़ै" ,
		"ाे" , "ो" ,
		"ाॆ", "ॆ",
		"ाॅ" , "ॉ" ,
		"अौ" , "औ" ,
		"अो" , "ओ" ,
		"आॅ" , "ऑ",
		"आॆ", "ऒ"],
	'chanakya': [
		'\\x{00EC}', 'ड्ड',
		"\\x{00EA}", "ट्ट",
		"\\x{00EB}", "ट्ठ"],
	'rupee': [
		'`','\u20b9']
};
 
iitd.fonts = [
	['Chanaky2', 							'Bold Italic', 	iitd.chanakya, 	'Smart Delhi Hindi', 'Bold Italic', 1.0],
	['Chanaky2', 							'Bold', 				iitd.chanakya,	'Smart Delhi Hindi', 'Bold Italic', 1.0],
	['Chanaky2', 							'Italic', 			iitd.chanakya, 	'Smart Delhi Hindi', 'Bold Italic', 1.0],
	['Chanaky2', 							'Normal', 			iitd.chanakya, 	'Smart Delhi Hindi', 'Normal', 			1.0],
	['Walkman-Chanakya-905', 	'Bold Italic', 	iitd.walkman, 	'Smart Delhi Hindi', 'Bold Italic', 1.0],
	['Walkman-Chanakya-905', 	'Bold', 				iitd.walkman,		'Smart Delhi Hindi', 'Bold Italic', 1.0],
	['Walkman-Chanakya-905', 	'Italic', 			iitd.walkman, 	'Smart Delhi Hindi', 'Bold Italic', 1.0],
	['Walkman-Chanakya-905', 	'Normal', 			iitd.walkman, 	'Smart Delhi Hindi', 'Normal', 			1.0],
	['Rupee', 								'Bold Italic', 	iitd.rupee, 		'Smart Delhi Hindi', 'Bold Italic', 1.0],
	['Rupee', 								'Bold', 				iitd.rupee, 		'Smart Delhi Hindi', 'Bold', 				1.0],
	['Rupee', 								'Italic', 			iitd.rupee,			'Smart Delhi Hindi', 'Italic', 			1.0],
	['Rupee', 								'Normal', 			iitd.rupee,			'Smart Delhi Hindi', 'Normal', 			1.0],
];

main();