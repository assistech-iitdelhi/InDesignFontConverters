(function() {
  var startTime = new Date();
  setupEssentials();  
  var matchFn = function(fontName) { return fontName.indexOf("Walkman-Chanakya-") == 0; };
  var target = loadApplicableMappings(matchFn);
  var styles = getFontStylesUsedInDoc(matchFn);

  convertToUnicode(walkman_chanakya(), styles, target.fontName);
  
  matchFn = function(fontName) { return fontName.indexOf("Chanaky2") == 0; };
  target = loadApplicableMappings(matchFn);
  styles = getFontStylesUsedInDoc(matchFn);

  convertToUnicode(chanaky2(), styles, target.fontName);

  reorderChars();
  scaleText(target.fontName, target.scalingFactor);
  
  var endTime = new Date();
  log("Time Elapsed: " + (endTime.getTime() - startTime.getTime()) + "ms");
})();

function setupEssentials() {
  if (typeof Array.prototype.indexOf != "function") {
    Array.prototype.indexOf = function (el) {
    for(var i = 0; i < this.length; i++) if(el === this[i]) return i;
      return -1;
    }
  }
}

function loadApplicableMappings(matchFn) {
  try {
      var fileName = File(app.activeScript.fullName).parent.fsName + "\\mappings.csv";
      var file = new File(fileName)
      file.open("r");
      while(!file.eof){
          row=file.readln();
          cols = row.split(",");
          if (matchFn(cols[0])) {
            return {  fontName: cols[1], 
                      scalingFactor: cols[2]};
          }
      }
      file.close();
  } catch (err) {
      alert(err);
  }
  return {fontName: "Kokila", scalingFactor: 1.07};
}

function getFontStylesUsedInDoc(matchFn) {
  var styles = [];
  var stories = app.activeDocument.stories.everyItem().getElements();
  for (var i = 0; i < stories.length; i++) {
    var textStyleRanges = stories[i].textStyleRanges.everyItem().getElements();
    for (var j = 0; j < textStyleRanges.length; j++) {
      var styleRange = textStyleRanges[j];
      if (matchFn(styleRange.appliedFont.fontFamily)) {
        var str = [styleRange.appliedFont.fontFamily, styleRange.fontStyle, styleRange.pointSize].join(",");
        if (styles.indexOf(str) < 0) {
          styles.push(str);
        }
      }
    }
  }
  return styles;
}

function convertToUnicode(glyphToCharMap, styles, targetFont) {  
  var styleFor = function(style) {
    // Smart Delhi font has a different target style, Normal
    if (style.indexOf("Bold") >= 0 && style.indexOf("Italic") >= 0) {
        return "Bold Italic";
    } else if (style.indexOf("Bold") >= 0) {
        return "Bold";
    } else if (style.indexOf("Italic") >= 0) {
        return "Italic";
    } else {
        return "Normal";
    }
  };
  app.findChangeGrepOptions.includeMasterPages = true;
  app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
  for (var i = 0; i < styles.length; i++) {
    for (var j = 0; j < glyphToCharMap.length; j += 2) {
      var attrs = styles[i].split(",");
      app.findGrepPreferences.appliedFont = attrs[0];
      app.findGrepPreferences.findWhat = glyphToCharMap[j];
      app.findGrepPreferences.fontStyle = attrs[1];
      app.changeGrepPreferences.changeTo = glyphToCharMap[j+1];
      app.changeGrepPreferences.composer = "Adobe World-Ready Paragraph Composer";
      app.changeGrepPreferences.appliedFont = targetFont;
      app.changeGrepPreferences.fontStyle = styleFor(attrs[1]);
      app.activeDocument.changeGrep();
    }
  }
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
    'ं([्ाुूेैोौॊॉीृ]+)' , '$1ं' ,
    
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
  ];
  app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
  app.findChangeGrepOptions.includeMasterPages = true;
  for (var i = 0; i < changeTo.length; i += 2) {    
    app.findGrepPreferences.findWhat = changeTo[i];
    app.changeGrepPreferences.changeTo = changeTo[i+1];
    app.activeDocument.changeGrep();
  }
}

function scaleText(targetFont, targetFontScalingFactor) {
  app.findChangeTextOptions.includeMasterPages = true;
  app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
  var scaleFn = function(style, pointSize) {
    app.findTextPreferences.appliedFont = targetFont;
    app.findTextPreferences.pointSize = pointSize;
    app.findTextPreferences.fontStyle = style;
    app.changeTextPreferences.appliedFont = targetFont;
    app.changeTextPreferences.pointSize = Math.round(pointSize*targetFontScalingFactor);
    app.changeTextPreferences.fontStyle = style;
    app.activeDocument.changeText();
  };
  var styles = ['Regular', 'Bold', 'Italic', 'Bold Italic'];
  if (targetFontScalingFactor > 1) {
    for (var i = 0; i < styles.length; i++) {    
      for (var j = 72; j > 5; j--) {
        scaleFn(styles[i], j);
      }
    }
  } else {
    for (var i = 0; i < styles.length; i++) {    
      for (var j = 6; j < 73; j++) {
        scaleFn(styles[i], j);
      }
    }
  }
}

function walkman_chanakya() {
  return new Array(
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
    '\t', '\t',
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
    "sas" , "sa" ,
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
    "£" , "र्f" ,
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
    "¯" , "ε",
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
    "&" , "-" ,					//hyphen
    "µ" , "\\x{2013}" , //en-dash
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
    "आॆ", "ऒ");
 }

 function chanaky2() {
   return new Array('\\x{00EC}', 'ड्ड',
   "\\x{00EA}", "ट्ट",
  "\\x{00EB}", "ट्ठ",   );// otherwise spaces remain in the source font);
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

function log(text) {
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
