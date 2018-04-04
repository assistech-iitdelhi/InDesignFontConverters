//------------------------------------------------------------------------------------------------------------------------------
//derived from similar function in Kasyan's Batch Processor
function getAllPMDFiles(folder) {
	var files = [],
	fileList = folder.getFiles(),
	i, file;
	
	for (i = 0; i < fileList.length; i++) {
		file = fileList[i];
		if (file instanceof Folder) {
			files = files.concat(getAllPMDFiles(file));
		}
		else if (file instanceof File && file.name.match(/\.pmd$/i)) {
			files.push(file);
		}
	}

	return files;
}
//--------------------------------------------------------------------------------------------------------------------------------
// check version
var myInDesignVersion = Number(String(app.version).split(".")[0]);  
if (myInDesignVersion < 5 || myInDesignVersion > 8) {  
    alert("This script is for InDesign CS3 - CS6.", "Batch resave PageMaker files script");  
    exit();  
}  

// select pmd files  
var myFolder = Folder.selectDialog("Select a folder with PageMaker files to resave");  
if (myFolder == null) exit();  
var myFilelist = getAllPMDFiles(myFolder);
if (myFilelist.length == 0) {  
    alert("No files to open.", "Batch resave PageMaker files script");  
    exit();  
}  
 
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;  
  
// Progress bar -----------------------------------------------------------------------------------  
var myProgressWin = new Window ( "window", "Batch resave PageMaker files script" );  
var myProgressBar = myProgressWin.add ("progressbar", [12, 12, 350, 24], 0, myFilelist.length);  
var myProgressTxt = myProgressWin.add("statictext", undefined, "Starting resaving files");  
myProgressTxt.bounds = [0, 0, 340, 20];  
myProgressTxt.alignment = "left";  
myProgressWin.show();  
// Progress bar -----------------------------------------------------------------------------------  
  
for (var i = myFilelist.length-1; i >= 0; i--) {  
    var myCurrentFile = myFilelist[i];  
    
    try {  
        // Progress bar -----------------------------------------------------------------------------------  
        myProgressBar.value = myFilelist.length-i;  
        myProgressTxt.text = String("Resaving file - " + myCurrentFile + " (" + myProgressBar.value + " of " + myFilelist.length + ")");  
        // Progress bar -----------------------------------------------------------------------------------  
        
        var myDocName = myCurrentFile.name.replace(/pmd$/i, "indd");  
        var myDocFilePath = new File(myCurrentFile.path + "/" + myDocName);  
        if (myDocFilePath.exists) 
          continue;
        
        var myDoc = app.open(myCurrentFile, false);
        myDoc = myDoc.save(myDocFilePath);  
        myDoc.close();  
    }  
    catch(e) {}  
}  
// Progress bar -----------------------------------------------------------------------------------  
myProgressWin.close();  
// Progress bar -----------------------------------------------------------------------------------  
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;  
alert("Done.", "Batch resave PageMaker files script");   