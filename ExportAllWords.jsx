function setupEssentials() {
  if (typeof Array.prototype.indexOf != "function") {
    Array.prototype.indexOf = function (el) {
    for(var i = 0; i < this.length; i++) if(el === this[i]) return i;
      return -1;
    }
  }
}
(function (){  
  var fileName =  "~/Desktop/words.txt";
  var all_words = [];
  var contents;
  var file = new File(fileName);  
  file.encoding = 'UTF-8';
  
  setupEssentials();
  if(file.exists) {
    file.open("r");
    while (!file.eof) {
      all_words.push(file.readln());      
    }
    file.close();
  }
  if(file.open("w") == true) {
    for(var i = 0; i < app.activeDocument.stories.length; i++) {      
      contents = app.activeDocument.stories.item(i).contents.match(/([\u0900-\u097f])([\u0900-\u097f])*/g);
      if (contents) {
        for (var j = 0; j < contents.length; j++) {
          if (all_words.indexOf(contents[j]) < 0) {
            all_words.push(contents[j]);
            gEventLog.push(contents[j] + ": " + app.activeDocument.name);
          }
        }
      }              
    }    
    all_words.sort();
    for(var i = 0; i < all_words.length; i++) {      
      file.writeln(all_words[i]);
    }
    file.close();
  } else {
    alert("Could not open " + fileName + " for writing.");
  }
})();