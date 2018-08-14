(function (){
  var fileName = app.activeDocument.filePath.absoluteURI + "/" + app.activeDocument.name + ".txt";
  var file = new File(fileName);
  file.encoding = 'UTF-8';
  if(file.open("w", undefined, undefined) == true) {
    for(var i = 0; i < app.activeDocument.stories.length; i++){      
      file.writeln(app.activeDocument.stories.item(i).contents);
    }    
    file.close();
  } else {
    alert("Could not open " + fileName + " for writing.");
  }
})();