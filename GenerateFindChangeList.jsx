main();
function main() {
	try {
		var line, correctionsFile, findChangeFile, result, findChangeArray, findType, findPreferences, changePreferences, findChangeOptions, comment,
		doc = app.activeDocument;

		var scriptFile = GetActiveScript();
		var scriptFolder = scriptFile.parent;
		var scriptFolderPath = scriptFolder.absoluteURI;
		correctionsFile = new File(scriptFolderPath + "/Corrections.txt"); // look into the same folder first
	
		if (correctionsFile.exists &&  correctionsFile.open("r", undefined, undefined) == true) {
      findChangeFile = new File(scriptFolderPath + "/FindChangeList.txt");
      findChangeFile.encoding = "UTF-8";
      //findChangeFile = new File("~/Desktop/FindChangeList.txt");
      if(findChangeFile.open("w", undefined, undefined) == true) {
        //Loop through the find/change operations.
        do{
          myLine = correctionsFile.readln();
          findChangeArray = myLine.split("\t");
          //The first field in the line is the findType string.
          
          findChangeFile.writeln('text\t{findWhat:"' + findChangeArray[0] + 
          '"}\t{changeTo:"α"}\t{includeFootnotes:true,includeMasterPages:true, includeHiddenLayers:true, wholeWord:false}');
          findChangeFile.writeln('text\t{findWhat:"α"}\t{changeTo:"' + findChangeArray[1] + '"}\t{includeFootnotes:true, includeMasterPages:true, includeHiddenLayers:true, wholeWord:false}\t'+findChangeArray[1]);
        } while(correctionsFile.eof == false);
        findChangeFile.close();
        correctionsFile.close();
      } else {
        alert("Could not open FindChangeList.txt");
        //gErrorLog.push(doc.name + " - Unable to open 'FindChangeList.txt' file.");
      }
    } else {
      alert("Could not open Corrections.txt");
      //gErrorLog.push(doc.name + " - Unable to open 'Corrections.txt' file.");
		}
	}	catch(err) {
    alert(err.message);
		//gErrorLog.push(doc.name + " - " + err.message + ", line: " + err.line);
	}
}

function GetActiveScript() {
    try {
        return app.activeScript;
    } catch(err) {
        return new File(err.fileName);
    }
}