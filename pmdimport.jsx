var myInDesignVersion = Number(String(app.version).split(".")[0]);  
  
var myFolder = Folder.selectDialog("Select a folder with PageMaker files to resave");  
if (myFolder == null) exit();  
var myFilelist = [];  
var myAllFilesList = myFolder.getFiles();  
  
for (var f = 0; f < myAllFilesList.length; f++) {  
    var myFile = myAllFilesList[f];  
    if (myFile instanceof File && myFile.name.match(/\.pmd$/i)) {  
        myFilelist.push(myFile);  
    }  
}  
if (myInDesignVersion < 5 || myInDesignVersion > 8) {  
    alert("This script is for InDesign CS3 - CS6.", "Batch resave PageMaker files script");  
    exit();  
}  
  
if (myFilelist.length == 0) {  
    alert("No files to open.", "Batch resave PageMaker files script");  
    exit();  
}  
  
var myResavedFolder = new Folder( myFolder.fsName + "/Resaved Files/" );  
VerifyFolder(myResavedFolder);  
  
var myCounter = 1;  
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
        var myDoc = app.open(myCurrentFile, false);  
        var myDocName = myCurrentFile.name.replace(/pmd$/i, "indd");  
        var myDocFilePath = new File(myResavedFolder.fsName + "/" + myDocName);  
  
        // Progress bar -----------------------------------------------------------------------------------  
        myProgressBar.value = myCounter;  
        myProgressTxt.text = String("Resaving file - " + myDocName + " (" + myCounter + " of " + myFilelist.length + ")");  
        // Progress bar -----------------------------------------------------------------------------------  
  
        myDoc = myDoc.save(myDocFilePath);  
        myDoc.close();  
        myCounter++;  
    }  
    catch(e) {}  
}  
  
    // Progress bar -----------------------------------------------------------------------------------  
    myProgressWin.close();  
    // Progress bar -----------------------------------------------------------------------------------  
  
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;  
  
alert("Done.", "Batch resave PageMaker files script");  
  
//--------------------------------------------------------------------------------------------------------------  
function VerifyFolder(myFolder) {  
    if (!myFolder.exists) {  
        var myFolder = new Folder(myFolder.absoluteURI);  
        var myArray1 = new Array();  
        while (!myFolder.exists) {  
            myArray1.push(myFolder);  
            myFolder = new Folder(myFolder.path);  
        }  
        myArray2 = new Array();  
        while (myArray1.length > 0) {  
            myFolder = myArray1.pop();  
            if (myFolder.create()) {  
                myArray2.push(myFolder);  
            } else {  
                while (myArray2.length > 0) {  
                    myArray2.pop.remove();  
                }  
                throw "Folder creation failed";  
            }   
        }  
    }  
}  
