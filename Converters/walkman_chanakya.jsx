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
		// TODO: log remaining unconverted text in known fonts
	function change(ptSize) {
		app.findGrepPreferences.appliedFont = srcFont;      
		app.findGrepPreferences.fontStyle = srcStyle;
		app.findGrepPreferences.findWhat = glyphToCharMap[j][0];
		//app.findGrepPreferences.pointSize = ptSize;
		app.changeGrepPreferences.appliedFont = tgtFont;
		app.changeGrepPreferences.fontStyle = tgtStyle;
		app.changeGrepPreferences.changeTo = glyphToCharMap[j][1];
		app.changeGrepPreferences.appliedLanguage = 'Hindi (India)';
		//app.changeGrepPreferences.pointSize = Math.round(ptSize*scalingFactor);
		app.changeGrepPreferences.composer = "Adobe World-Ready Paragraph Composer";
		app.activeDocument.changeGrep();
	};
  app.findChangeGrepOptions.includeMasterPages = true;
  app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
	for (var j = 0; j < glyphToCharMap.length; j++) {
		change(0);
	}
  // clear settings so the last lookup doesn't interfere with fut'ure searches
  app.findTextPreferences = NothingEnum.NOTHING;
  app.changeTextPreferences = NothingEnum.NOTHING;  
} // end of convertToUnicode function

function reorderChars() {
  var changeTo = [
    // indesign find/change text treats ' and ` as equals
		"्ा" ,   "" ,
		"़्ा" ,   "़" ,
		"़्ो" ,   "़े" ,
		"्ौ" ,    "़ै" ,
		"ाै" , "ौ" ,
		"ाे" , "ो" ,
		"ाॆ", "ॆ",
		"ाॅ" , "ॉ" ,
		"अा", "आ",
		"अौ" , "औ" ,
		"अो" , "ओ" ,
		"आॅ" , "ऑ",
		"आॆ", "ऒ",
		
    // nothing irrelevant separates parts of क, फ
    'व([Ρρ़्ाुूेैोौॊॉीृंँ]*)η', 'क$1',
    'व़([Ρρ्ाुूेैोौॊॉीृंँ]*)η', 'क़$1',
    'प([Ρρ्ाुूेैोौॊॉींँ]*)η', 'फ$1',
    'प़([Ρρ्ाुूेैोौॊॉींँ]*)η', 'फ़$1',
    'उ([Ρρ़ाुूेैोौॊॉींँ]*)η', 'ऊ$1',
    
    // vowel signs and vowel modifiers go to end
    '([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]़?)([ाुूेैोौॊॉीृंँ]*)Ρ' , '$1्र$2' ,
    
    // vowel modifiers after vowel signs
    '([ंँ])([्ाुूेैोौॊॉीृ]+)' , '$2$1' ,
    
    // nukta before vowel signs
    '([्ाुूेैोौॊॉीृ]+)़' , '़$1' ,
		
		// remove duplicate vowel modifiers
		'ंं*' , 'ं' ,
    
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
		'ऩ',	'\\x{0929}',
		'ऱ',	'\\x{0931}',
		'ऴ',	'\\x{0934}',
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

function read_tsv(filepath) {
	var ifile = new File(filepath);    
  ifile.encoding = 'UTF-8';
	var a = [];
  if(ifile.exists) {
    ifile.open("r");
    while (!ifile.eof) {
			var words = ifile.readln().split("\t");
			a.push(words);
    }
    ifile.close();
	} else {
		alert("Could not open " + filepath + " for reading");
	}
	return a;
}
// TODO: convert each word to greek letter and back to remove tracked chars	
// TODO: check NCERT google spreadsheet to ensure all covered, log remaining intermediate chars
// TODO: filter fonts not used in document
var iitd = {};
iitd.fonts = read_tsv(app.activeScript.path + "/fonts.tsv");
for (var i = 0; i < iitd.fonts.length; i++) {
	var filename = iitd.fonts[i][2];
	var firstname = iitd.fonts[i][2].split('.')[0];
	iitd[firstname] = read_tsv(app.activeScript.path + "/" + filename);
    iitd.fonts[i][2] = iitd[firstname];
}
main();