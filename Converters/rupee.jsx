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
        myText.appliedFont = app.fonts.item("SakalBharati");
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
    app.changeTextPreferences.appliedFont = "SakalBharati";
    app.activeDocument.changeText();
  }
}
})();

function matches(fontName) {
  return fontName.indexOf("Rupee") == 0;
}

function convert_to_unicode(legacy_txt) {
  return legacy_txt.replace('`','\u20b9');
} // end of convert_to_unicode function