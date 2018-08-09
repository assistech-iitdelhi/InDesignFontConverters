main();

function main() {
	try {
		var line, findChangeFile, result, findChangeArray, findType, findPreferences, changePreferences, findChangeOptions, comment,
		doc = app.activeDocument;

		var scriptFile = GetActiveScript();
		var scriptFolder = scriptFile.parent;
		var scriptFolderPath = scriptFolder.absoluteURI;
		findChangeFile = new File(scriptFolderPath + "/FindChangeList.txt"); // look into the same folder first
		
		if (!findChangeFile.exists) { // then look into the 'FindChangeSupport' folder located the same folder as the script
			findChangeFile = new File(scriptFolderPath + "/FindChangeSupport/FindChangeList.txt");			
		}
	
		if (!findChangeFile.exists) { // finally look into the default location of the 'samples' scripts
			findChangeFile = new File(app.filePath.absoluteURI + "/Scripts/Scripts Panel/Samples/JavaScript/FindChangeSupport/FindChangeList.txt");
		}		
			
		if (findChangeFile.exists) {
			result = findChangeFile.open("r", undefined, undefined);
			if (result == true) {
				//Loop through the find/change operations.
				do {
					line = findChangeFile.readln();
					//Ignore comment lines and blank lines.
					if ((line.substring(0, 4) == "text") || (line.substring(0, 4) == "grep") || (line.substring(0, 5) == "glyph")) {
						comment = "";
						findChangeArray = line.split("\t");
						//The first field in the line is the findType string.
						findType = findChangeArray[0];
						//The second field in the line is the FindPreferences string.
						findPreferences = findChangeArray[1];
						//The second field in the line is the ChangePreferences string.
						changePreferences = findChangeArray[2];
						//The fourth field is the range--used only by text find/change.
						findChangeOptions = findChangeArray[3];
						//The fifth field is the comment
						if (findChangeArray.length > 4) comment = findChangeArray[4];
						
						switch (findType) {
							case "text":
								FindText(doc, findPreferences, changePreferences, findChangeOptions, comment);
								break;
							case "grep":
								FindGrep(doc, findPreferences, changePreferences, findChangeOptions, comment);
								break;
							case "glyph":
								FindGlyph(doc, findPreferences, changePreferences, findChangeOptions, comment);
								break;
						}
					}
				} while (findChangeFile.eof == false);
				findChangeFile.close();
			}
		}
		else {
			//$.writeln(doc.name + " - Unable to find 'FindChangeList.txt' file.");
			gErrorLog.push(doc.name + " - Unable to find 'FindChangeList.txt' file.");
		}
	}
	catch(err) {
		gErrorLog.push(doc.name + " - " + err.message + ", line: " + err.line);
	}
}

function FindText(doc, findPreferences, changePreferences, findChangeOptions, comment) {
	app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
	var str = "app.findTextPreferences.properties = "+ findPreferences + ";";
	str += "app.changeTextPreferences.properties = " + changePreferences + ";";
	str += "app.findChangeTextOptions.properties = " + findChangeOptions + ";";
	app.doScript(str, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT);
	foundItems = doc.changeText();
	if (foundItems.length > 0) {
		gEventLog.push("Changed " + foundItems.length + " text item" + ((foundItems.length > 1) ? "s" : "") + ((comment != "") ?  " - " + comment : ""));
	}
	app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
}

function FindGrep(doc, findPreferences, changePreferences, findChangeOptions, comment) {
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
	var str = "app.findGrepPreferences.properties = "+ findPreferences + ";";
	str += "app.changeGrepPreferences.properties = " + changePreferences + ";";
	str += "app.findChangeGrepOptions.properties = " + findChangeOptions + ";";
	app.doScript(str, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT);
	var foundItems = doc.changeGrep();
		if (foundItems.length > 0) {
		gEventLog.push("Changed " + foundItems.length + " GREP item" + ((foundItems.length > 1) ? "s" : "") + ((comment != "") ?  " - " + comment : ""));
	}
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
}

function FindGlyph(doc, findPreferences, changePreferences, findChangeOptions, comment) {
	app.changeGlyphPreferences = app.findGlyphPreferences = NothingEnum.nothing;
	var str = "app.findGlyphPreferences.properties = "+ findPreferences + ";";
	str += "app.changeGlyphPreferences.properties = " + changePreferences + ";";
	str += "app.findChangeGlyphOptions.properties = " + findChangeOptions + ";";
	app.doScript(str, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT);
	var foundItems = doc.changeGlyph();
		if (foundItems.length > 0) {
		gEventLog.push("Changed " + foundItems.length + " Glyph item" + ((foundItems.length > 1) ? "s" : "") + ((comment != "") ?  " - " + comment : ""));
	}
	app.changeGlyphPreferences = app.findGlyphPreferences = NothingEnum.NOTHING;
}

function FindFile(filePath) {
	var scriptFile = GetActiveScript();
	var scriptFile = new File(scriptFile);
	var scriptFolder = scriptFile.path;
	var file = new File(scriptFolder + filePath);

	if (file.exists) {
		return file;
	}
	else {
		return null;
	}
}

function GetActiveScript() {
    try {
        return app.activeScript;
    }
    catch(err) {
        return new File(err.fileName);
    }
}
