var myTextFrames = app.activeDocument.textFrames;  // object model initialisations
var myTextFramesNo = myTextFrames.length; 
var i=0;
var array_all = new Array();
var myDoc = app.documents[0];
var myText;
var myTextPrev = null;
var sum = 0;
var count = 0;
var avg; // for finding average size

// two while loops iterate over all paragraphs present in the object model
while (i < myTextFramesNo) 
{
    var paras=myTextFrames[i].parentStory.paragraphs;
    var j = -1;
	myTextPrev = paras.item(0);
    while (j < paras.count() && myTextFrames[i].parentStory!= myTextFrames[i-1].parentStory)
    {
		myText = paras.item(j);
		if (myTextPrev == null || myText!=myTextPrev) // to avoid repetition
		{
			sum+=myText.pointSize; //for average size
			count++;
		}
        j++;
		myTextPrev = myText;
    }
    i++;
}
avg = sum/count; //final average font size in the document

var myTextFrames = app.activeDocument.textFrames;  //same thing repeated for another iteration over the entire document
var myTextFramesNo = myTextFrames.length; 
var i=0;
var array_all = new Array(); //this is an array that will contain all paragraph objects in the document
var myDoc = app.documents[0];
var myText;
var myTextPrev = null;
var count = 0; //count variable to count total number of paragraphs in the text
while (i < myTextFramesNo) 
{
    var paras=myTextFrames[i].parentStory.paragraphs;
    var j = -1;
	myTextPrev = paras.item(0);
    while (j < paras.count() && myTextFrames[i].parentStory!= myTextFrames[i-1].parentStory)
    {
		myText = paras.item(j); //paragraph type object
		if (myTextPrev == null || myText!=myTextPrev)
		{
			if (myText.pointSize > avg)   // distinguish between non heading and heading text by using the average size
			{
				var styname = count.toString(); // create a new style name according to the count
				// create an object having the paragraph text, its size, heading number, and a new custom style which is different for each paragraph, 
				// and given the various style parameters to maintain formatting
				var add = {text : myText , size : myText.pointSize , heading : 0 , style : myDoc.paragraphStyles.add({name : styname, 
				spaceAfter : myText.spaceAfter , appliedFont : myText.appliedFont, fontFamily : myText.appliedFont.fontFamily, spaceBefore : myText.spaceBefore , fontStyle : myText.fontStyle , pointSize : myText.pointSize , 
				fillColor : myText.fillColor , alignToBaseline : myText.alignToBaseline , digitsType : myText.digitsType , index : myText.index , 
				leftIndent : myText.leftIndent , paragraphDirection : myText.paragraphDirection , position : myText.position , parent : myText.parent , 
				properties : myText.properties , startParagraph : myText.startParagraph , underline : myText.underline , 
				underlineColor : myText.underlineColor , underlineType : myText.underlineType , underlineWeight : myText.underlineWeight , 
				justification : myText.justification})};
				
				array_all.push(add);  // the custom object is added to the array
				count++;
			}
		}
        // myText.contents will give me the text
        // mtText.pointSize gives font size
        j++;
		myTextPrev = myText;
    }

    i++;
}

// levels is a 2D array which contains 6 rows - one for eah heading level. and each row will contain the paragraph objects correspnding to that level
var levels = new Array(6);
for (var i = 0; i < 6; i++) {
  levels[i] = new Array();
}

var i = 1;

levels[0].push(array_all[0]); // assuming that the first word/text frame is the title and hence h1
array_all[0].heading=0;

while (array_all[i]!=null)
{
	if (array_all[i].size == array_all[i-1].size) //if size is equal, same heading level
	{
        // add conditions for color, bold etc.
		levels[array_all[i-1].heading].push(array_all[i]);
		array_all[i].heading = array_all[i-1].heading;
		i++;
	}
	else if (array_all[i].size > array_all[i-1].size) //if size is greater, heading level will be above the previous one
	{
		if (array_all[i-1].heading == 0) //if the previous heading level was h1, there is nothing above it, so same as before
        {
            array_all[i].heading = array_all[i-1].heading;
            levels[array_all[i-1].heading].push(array_all[i]);
            i++;
        }
        else
        {
			var k = array_all[i-1].heading;
			while(array_all[i].size>=levels[k-1][levels[k-1].length-1].size) //if size is greater, keep checking with higher heading levels until you reach a level 
																			//which has a higher fontsize, and then level is assigned
			{
				k--;
				if (k==0) break;
			}
            array_all[i].heading = k;
            levels[k].push(array_all[i]);
            i++;
         }             
	}
	else //if size is smaller, one heading level below
	{
		if (array_all[i-1].heading == 5) //if prev level is h6, then there is no lower heading level
        {
            array_all[i].heading = array_all[i-1].heading;
            levels[array_all[i-1].heading].push(array_all[i]);
            i++;
         }
        else
        {
            array_all[i].heading = array_all[i-1].heading + 1;
            levels[array_all[i-1].heading + 1].push(array_all[i]);
            i++;
         }             
	}
}

for (var i=0;i<6;i++) //iterate over the rows in levels
{
	for (var j=0; j<levels[i].length;j++) //iterate over alll elemets of one row
	{
		levels[i][j].text.appliedParagraphStyle = myDoc.paragraphStyles.item (levels[i][j].style.name); //apply the custom paragraph style created to the paragraph
        //according to the heading level of the paragraph, assign an export tag to the custom style created for each respective paragraph
		if (i==0)
		{
			var h1 = myDoc.paragraphStyles.itemByName(levels[i][j].style.name);
            h1.styleExportTagMaps.add({exportType: "EPUB", exportTag: "h1", exportClass: "", exportAttributes: ""});
            h1.styleExportTagMaps.add({exportType: "PDF", exportTag: "H1", exportClass: "", exportAttributes: ""});  
		}
		else if (i==1) 
		{
			var h2 = myDoc.paragraphStyles.itemByName(levels[i][j].style.name);
            h2.styleExportTagMaps.add({exportType: "EPUB", exportTag: "h2", exportClass: "", exportAttributes: ""});
            h2.styleExportTagMaps.add({exportType: "PDF", exportTag: "H2", exportClass: "", exportAttributes: ""});
		}
		else if (i==2) 
		{
			var h3 = myDoc.paragraphStyles.itemByName(levels[i][j].style.name);
            h3.styleExportTagMaps.add({exportType: "EPUB", exportTag: "h3", exportClass: "", exportAttributes: ""});
            h3.styleExportTagMaps.add({exportType: "PDF", exportTag: "H3", exportClass: "", exportAttributes: ""});
		}
		else if (i==3) 
		{
			var h4 = myDoc.paragraphStyles.itemByName(levels[i][j].style.name);
            h4.styleExportTagMaps.add({exportType: "EPUB", exportTag: "h4", exportClass: "", exportAttributes: ""});
            h4.styleExportTagMaps.add({exportType: "PDF", exportTag: "H4", exportClass: "", exportAttributes: ""});
		}
		else if (i==4) 
		{
			var h5 = myDoc.paragraphStyles.itemByName(levels[i][j].style.name);
            h5.styleExportTagMaps.add({exportType: "EPUB", exportTag: "h5", exportClass: "", exportAttributes: ""});
            h5.styleExportTagMaps.add({exportType: "PDF", exportTag: "H5", exportClass: "", exportAttributes: ""});
		}
		else 
		{
			var h6 = myDoc.paragraphStyles.itemByName(levels[i][j].style.name);
            h6.styleExportTagMaps.add({exportType: "EPUB", exportTag: "h6", exportClass: "", exportAttributes: ""});
            h6.styleExportTagMaps.add({exportType: "PDF", exportTag: "H6", exportClass: "", exportAttributes: ""});
		}
	}
}

alert ("done");				